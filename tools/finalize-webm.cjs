/* Finalize browser WebM: finite clusters, duration, keyframe cues and seek index. */
const fs = require('node:fs'),
  path = require('node:path');
function vint(buffer, offset, id = false) {
  let width = 1;
  while (width <= 8 && !(buffer[offset] & 1 << 8 - width)) width++;
  if (width > 8) throw Error('Invalid EBML');
  let value = id ? buffer[offset] : buffer[offset] & (1 << 8 - width) - 1;
  let unknown = value === (1 << 8 - width) - 1;
  for (let i = 1; i < width; i++) {
    value = value * 256 + buffer[offset + i];
    unknown = unknown && buffer[offset + i] === 255;
  }
  return {
    width,
    value,
    unknown: !id && unknown
  };
}
function elements(buffer, start, end) {
  const items = [];
  for (let offset = start; offset < end;) {
    const id = vint(buffer, offset, true),
      size = vint(buffer, offset + id.width),
      data = offset + id.width + size.width,
      finish = size.unknown ? end : data + size.value;
    if (finish > end || finish <= offset) throw Error('Invalid EBML element');
    items.push({
      id: id.value,
      offset,
      data,
      end: finish,
      size
    });
    offset = finish;
  }
  return items;
}
function sizeBytes(value) {
  let width = 1;
  while (value >= 2 ** (7 * width) - 1) width++;
  const b = Buffer.alloc(width);
  let n = value;
  for (let i = width - 1; i >= 0; i--) {
    b[i] = n % 256;
    n = Math.floor(n / 256);
  }
  b[0] |= 1 << 8 - width;
  return b;
}
function uint(buffer) {
  let n = 0;
  for (const b of buffer) n = n * 256 + b;
  return n;
}
function element(id, data) {
  let hex = id.toString(16); if (hex.length % 2) hex = '0' + hex;
  return Buffer.concat([Buffer.from(hex, 'hex'), sizeBytes(data.length), data]);
}
function numberElement(id, value) {
  const bytes = Buffer.alloc(8); bytes.writeBigUInt64BE(BigInt(value));
  return element(id, bytes);
}
function seekHead(infoPosition, trackPosition, cuePosition) {
  return element(0x114d9b74, Buffer.concat([[0x1549a966, infoPosition], [0x1654ae6b, trackPosition], [0x1c53bb6b, cuePosition]].map(([id, position]) => element(0x4dbb, Buffer.concat([element(0x53ab, Buffer.from(id.toString(16), 'hex')), numberElement(0x53ac, position)])))));
}
function finalize(file) {
  const b = fs.readFileSync(file),
    segment = elements(b, 0, b.length).find(e => e.id === 0x18538067);
  if (!segment) throw Error('Missing segment');
  const children = elements(b, segment.data, segment.end);
  const info = children.find(e => e.id === 0x1549a966),
    meta = elements(b, info.data, info.end);
  const timeScale = meta.find(e => e.id === 0x2ad7b1);
  const scale = timeScale ? uint(b.subarray(timeScale.data, timeScale.end)) : 1000000;
  let maxTime = 0;
  const normalized = [];
  const clusters = children.filter(e => e.id === 0x1f43b675);
  for (let i = 0; i < clusters.length; i++) {
    const cluster = clusters[i],
      parts = elements(b, cluster.data, cluster.end);
    clusters.push(...parts.filter(e => e.id === 0x1f43b675));
    const timestamp = parts.find(e => e.id === 0xe7);
    const base = timestamp ? uint(b.subarray(timestamp.data, timestamp.end)) : 0;
    const ownParts = parts.filter(e => e.id !== 0x1f43b675 && e.id !== 0x1c53bb6b && e.id !== 0x114d9b74);
    const cues = [];
    for (const block of ownParts.flatMap(e => {
      if (e.id === 0xa0) {const children = elements(b, e.data, e.end); return children.filter(x => x.id === 0xa1).map(x => ({...x, keyframe: !children.some(x => x.id === 0xfb)}));}
      return e.id === 0xa3 ? [{...e, keyframe: Boolean(b[e.data + vint(b, e.data).width + 2] & 0x80)}] : [];
    })) {
      const track = vint(b, block.data);
      const timestamp = base + b.readInt16BE(block.data + track.width);
      maxTime = Math.max(maxTime, timestamp);
      if (block.keyframe) cues.push({timestamp, track: track.value});
    }
    normalized.push({data: element(0x1f43b675, Buffer.concat(ownParts.map(e => b.subarray(e.offset, e.end)))), cues});
  }
  const duration = maxTime + 50000000 / scale,
    number = Buffer.alloc(8);
  number.writeDoubleBE(duration);
  const durationElement = Buffer.concat([Buffer.from([0x44, 0x89, 0x88]), number]);
  const payload = Buffer.concat([...meta.filter(e => e.id !== 0x4489).map(e => b.subarray(e.offset, e.end)), durationElement]);
  const newInfo = Buffer.concat([Buffer.from([0x15, 0x49, 0xa9, 0x66]), sizeBytes(payload.length), payload]);
  const tracks = children.find(e => e.id === 0x1654ae6b), trackData = b.subarray(tracks.offset, tracks.end);
  const indexSize = seekHead(0, 0, 0).length;
  let offset = indexSize + newInfo.length + trackData.length;
  const cueEntries = [];
  for (const cluster of normalized) {
    for (const cue of cluster.cues) cueEntries.push(element(0xbb, Buffer.concat([numberElement(0xb3, cue.timestamp), element(0xb7, Buffer.concat([numberElement(0xf7, cue.track), numberElement(0xf1, offset)]))])));
    offset += cluster.data.length;
  }
  const cues = element(0x1c53bb6b, Buffer.concat(cueEntries));
  const body = Buffer.concat([seekHead(indexSize, indexSize + newInfo.length, offset), newInfo, trackData, ...normalized.map(c => c.data), cues]);
  fs.writeFileSync(file, Buffer.concat([b.subarray(0, segment.offset), element(0x18538067, body)]));
  return {
    file: path.basename(file),
    seconds: duration * scale / 1e9
  };
}
if (require.main === module) {
  const folder = path.resolve(__dirname, '../assets/demos');
  for (const file of fs.readdirSync(folder).filter(f => f.endsWith('.webm'))) console.log(finalize(path.join(folder, file)));
}
module.exports = {
  finalize
};

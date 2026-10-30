/* Refresh the offline source viewer after modifying a demo. Run from any folder. */
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../demos');
const files = ['shared.js', 'shared.css', 'tests.cjs', 'README.md'];
for (const id of ['loan-lab', 'message-lab', 'gallery-lab']) {
  for (const name of fs.readdirSync(path.join(root, id)).filter(name => /\.(js|html)$/.test(name)).sort()) files.push(`${id}/${name}`);
}
const source = Object.fromEntries(files.map(file => [file, fs.readFileSync(path.join(root, file), 'utf8')]));
fs.writeFileSync(path.join(root, 'sources.js'), '// Generated from actual demo files. Refresh with tools/build-demo-source.cjs.\nwindow.DEMO_SOURCES = ' + JSON.stringify(source) + ';\n');
console.log(`Source viewer updated: ${files.length} files.`);

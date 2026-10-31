const fs = require('node:fs');
const path = require('node:path');
const esc = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;');
for (const lang of ['en','zh']) {
  const t=(en,zh)=>lang==='en'?en:zh;
  const title=t('Yanheng Quant · Data to validation','研衡量化 · 从数据到策略验证');
  const nodes=[
    [t('Public samples','公开数据样本'),t('Stocks · ETF · indices','股票 · ETF · 指数'),t('Source + time + hash','来源、时间与数据哈希'),t('Separate price bases','区分原始与复权价格')],
    [t('Upstream engines','复用上游引擎'),t('Normalize + compute','归一化与指标计算'),t('Strategy + trade costs','策略信号与交易成本'),t('Next-day execution','下一交易日成交')],
    [t('Compare results','结果一致性核验'),t('Direct service call','服务直接调用'),t('HTTP worker run','HTTP 子进程执行'),t('Trades + equity match','核对交易与净值序列')]
  ];
  let body='';
  nodes.forEach((lines,i)=>{
    const x=40+i*320;
    body+=`<rect x="${x}" y="153" width="280" height="260" rx="15" fill="white" stroke="#d7e3ee"/><text x="${x+24}" y="198" font-size="25" font-weight="650" fill="#246a91">${i+1}. ${esc(lines[0])}</text>`;
    lines.slice(1).forEach((line,j)=>body+=`<circle cx="${x+27}" cy="${248+j*57}" r="4" fill="#4a8996"/><text x="${x+42}" y="${255+j*57}" font-size="21" fill="#41576c">${esc(line)}</text>`);
    if(i<2)body+=`<path d="M${x+287} 283 h24 l-6 -6 m6 6 l-6 6" fill="none" stroke="#5a869e" stroke-width="3"/>`;
  });
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="640" viewBox="0 0 1000 640" role="img" aria-labelledby="title desc" lang="${lang}">
<title id="title">${esc(title)}</title><desc id="desc">${esc(t('Public sample ingestion, upstream strategy execution and reproducibility checks.','公开样本采集、上游策略引擎执行与结果复现核验。'))}</desc>
<rect width="1000" height="640" fill="#f3f7fb"/><g font-family="Segoe UI, Microsoft YaHei, sans-serif">
<rect x="40" y="31" width="5" height="30" rx="2" fill="#246a91"/><text x="59" y="56" font-size="32" font-weight="650" fill="#18354b">${esc(title)}</text>
<text x="40" y="96" font-size="22" fill="#5b7185">${esc(t('A-share / ETF research · semiconductors as the first sample sector','A 股 / ETF 研究 · 半导体为首批验证板块'))}</text>
${body}
<rect x="40" y="445" width="920" height="68" rx="12" fill="#e4f2ee"/>
<text x="63" y="488" font-size="24" fill="#267465">${esc(t('4,955 daily bars · 72 financial-table records · 2 execution paths','4,955 条日线 · 72 条财报表记录 · 两条执行路径对比'))}</text>
<text x="40" y="556" font-size="21" fill="#5b7185">${esc(t('Financial samples are collected; they are not yet strategy inputs.','财报样本已采集，尚未作为策略输入。'))}</text>
<path d="M40 590 H960" stroke="#d7e3ee"/><text x="40" y="624" font-size="20" fill="#5b7185">${esc(t('Open-source secondary development · Tick Stock Panel (MIT) · checked 2026-11-01','开源二次开发 · Tick Stock Panel（MIT）· 验证日期 2026-11-01'))}</text>
</g></svg>\n`;
  fs.writeFileSync(path.join(__dirname,'../assets/diagrams',`yanheng-quant-${lang}.svg`),svg);
}
console.log('Generated two Yanheng Quant workflow diagrams.');

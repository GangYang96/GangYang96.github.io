// Export derived validation results only; never publish provider payloads or account data.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const input=process.argv[2];
if(!input)throw Error('Usage: node tools/build-yanheng-data.cjs <local-validation-directory>');
const read=name=>JSON.parse(fs.readFileSync(path.join(input,name),'utf8'));
const manifest=read('runtime-manifest.json'),indices=read('index-data-checks.json'),sources=read('source-checks.json'),checks=read('http-checks.json');
const instruments=[...manifest.market_data,...indices.indices];
const names={'688981.SH':'SMIC','002371.SZ':'NAURA','512480.SH':'Semiconductor ETF'};
const data={verifiedDate:'2026-11-01',source:'TickFlow',upstreamCommit:manifest.upstream_commit,
 dailyBars:instruments.reduce((n,x)=>n+x.rows,0),instruments:instruments.length,
 financialRecords:sources.checks.filter(x=>x.kind==='financial'&&x.status==='ok').reduce((n,x)=>n+x.count,0),
 tests:{backend:40,frontend:3},strategies:{}};
for(const asset of ['stock','etf']){
 const result=read(`backtest-${asset}.json`),http=checks.find(x=>x.asset_type===asset&&x.path==='/api/backtest/strategy/run');
 assert(!result.error&&http.reproduces_saved_trades_and_equity);
 const series=result.equity_curve.map(x=>[x.date,Number((x.value/result.config.initial_capital).toFixed(8))]);
 assert(series.length>1&&series.every((x,i)=>Number.isFinite(x[1])&&x[1]>0&&(!i||x[0]>series[i-1][0])));
 data.strategies[asset]={start:result.config.start,end:result.config.end,return:result.stats.total_return,
  drawdown:result.stats.max_drawdown,trades:result.trades.length,executionMatches:true,series,
  samples:manifest.market_data.filter(x=>x.asset_type===asset).map(x=>({symbol:x.symbol,name:{zh:x.name,en:names[x.symbol]},rows:x.rows}))};
}
const output=path.join(__dirname,'../assets/data/yanheng-validation.js');
fs.mkdirSync(path.dirname(output),{recursive:true});
fs.writeFileSync(output,'// Derived backtest results from the 2026-11-01 local validation. Not live market data.\nwindow.YANHENG_VALIDATION = '+JSON.stringify(data)+';\n');
console.log(`Exported ${data.dailyBars} daily-bar coverage and two derived equity series.`);

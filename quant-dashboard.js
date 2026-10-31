/* A compact, bilingual view of recorded research results. No live API dependency. */
(() => {
  'use strict';
  const data=window.YANHENG_VALIDATION;
  let asset='stock', selectedDate=null;
  const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const pct=value=>(value>0?'+':'')+(value*100).toFixed(2)+'%';
  const number=value=>value.toLocaleString('en-US');
  function chartGeometry(series){
    const values=series.map(x=>x[1]),low=Math.min(1,...values),high=Math.max(1,...values);
    const pad=Math.max((high-low)*.12,.02),min=low-pad,max=high+pad;
    const x=i=>46+i/(series.length-1)*498,y=v=>16+(max-v)/(max-min)*148;
    return {min,max,x,y,path:series.map((v,i)=>(i?'L':'M')+x(i).toFixed(2)+' '+y(v[1]).toFixed(2)).join(' ')};
  }
  function render(lang){
    const t=(en,zh)=>lang==='zh'?zh:en,result=data.strategies[asset];
    const series=result.series,index=Math.max(0,selectedDate?series.findIndex(x=>x[0]===selectedDate):series.length-1);
    const geometry=chartGeometry(series),{x,y,path}=geometry;
    const row=series[index];
    const name=asset==='stock'?t('Stock strategy','股票策略'):t('ETF strategy','ETF 策略');
    const metric=(label,value,extra='')=>`<div class="quant-metric"><span>${label}</span><strong class="${extra}">${value}</strong></div>`;
    const ticks=[geometry.min,(geometry.min+geometry.max)/2,geometry.max];
    const grid=ticks.map(v=>`<path d="M46 ${y(v)}H544" class="quant-gridline"/><text x="35" y="${y(v)+4}" text-anchor="end">${v.toFixed(2)}</text>`).join('');
    return `<section id="yanheng-dashboard" class="quant-dashboard" data-language="${lang}" aria-label="${t('Yanheng Quant data dashboard','研衡量化数据看板')}">
      <div class="quant-heading"><div><span class="quant-eyebrow">YANHENG QUANT</span><h4>${t('Research dashboard','研究数据看板')}</h4></div><span class="quant-snapshot">${t('Snapshot','历史快照')}<time datetime="${data.verifiedDate}">${data.verifiedDate}</time></span></div>
      <div class="quant-totals">
        ${metric(t('Daily bars','日线数据'),number(data.dailyBars))}
        ${metric(t('Financial records','财报记录'),number(data.financialRecords))}
        ${metric(t('Checks passed','测试通过'),number(data.tests.backend+data.tests.frontend))}
      </div>
      <div class="quant-chart-heading"><h5>${t('Strategy equity','策略净值')}</h5><div class="quant-switch" role="group" aria-label="${t('Choose sample strategy','选择样例策略')}">${['stock','etf'].map(value=>`<button type="button" data-quant-asset="${value}" aria-pressed="${asset===value}">${value==='stock'?t('Stocks','股票'):'ETF'}</button>`).join('')}</div></div>
      <p class="quant-strategy-label">${t('MA20 / MA60 · next-day open','20 / 60 日均线 · 次日开盘成交')}</p>
      <div class="quant-results" aria-live="polite">
        ${metric(t('Total return','区间收益'),pct(result.return),result.return>=0?'quant-positive':'quant-negative')}
        ${metric(t('Max. drawdown','最大回撤'),pct(result.drawdown))}
        ${metric(t('Trades','交易次数'),String(result.trades))}
      </div>
      <div class="quant-chart"><svg viewBox="0 0 560 194" role="img" aria-labelledby="quant-chart-title quant-chart-desc" data-quant-chart>
        <title id="quant-chart-title">${name} · ${t('normalized equity','归一化净值')}</title>
        <desc id="quant-chart-desc">${escape(t(`Recorded backtest from ${result.start} to ${result.end}. Total return ${pct(result.return)}. Use the date slider for daily values.`,`历史回测区间 ${result.start} 至 ${result.end}，收益 ${pct(result.return)}。可用日期滑块查看每日净值。`))}</desc>
        <defs><linearGradient id="quant-fill" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#399d9a" stop-opacity=".21"/><stop offset="1" stop-color="#399d9a" stop-opacity=".015"/></linearGradient></defs>
        <g class="quant-axis">${grid}<text x="46" y="188">${series[0][0].slice(0,7).replace('-','.')}</text><text x="295" y="188" text-anchor="middle">${series[Math.floor((series.length-1)/2)][0].slice(0,7).replace('-','.')}</text><text x="544" y="188" text-anchor="end">${series.at(-1)[0].slice(0,7).replace('-','.')}</text></g>
        <path d="M46 ${y(1)}H544" class="quant-baseline"/>
        <path d="${path}L544 164L46 164Z" fill="url(#quant-fill)"/>
        <path d="${path}" fill="none" stroke="#167f83" stroke-width="2.4" stroke-linejoin="round"/>
        <path data-quant-cursor d="M${x(index)} 16V164" class="quant-cursor"/>
        <circle data-quant-dot cx="${x(index)}" cy="${y(row[1])}" r="4" fill="#167f83" stroke="white" stroke-width="2"/>
      </svg></div>
      <div class="quant-chart-control"><label class="sr-only" for="quant-date-slider">${t('Backtest date','回测日期')}</label><input id="quant-date-slider" type="range" min="0" max="${series.length-1}" value="${index}" aria-valuetext="${row[0]} · ${row[1].toFixed(4)}"/><output for="quant-date-slider" data-quant-value>${row[0]}<strong>${row[1].toFixed(4)}</strong></output></div>
      <div class="quant-samples"><div class="quant-samples-heading"><span>${t('Sample universe','样本标的')}</span><span>${t('Daily bars','日线条数')}</span></div>${result.samples.map(sample=>`<div class="quant-sample"><span>${escape(sample.name[lang])}<small>${sample.symbol}</small></span><span>${number(sample.rows)}</span></div>`).join('')}</div>
      <div class="quant-status"><span aria-hidden="true">✓</span>${t('Direct / HTTP results match','直接调用 / HTTP 回测结果一致')}</div>
      <p class="quant-note">${t('Historical validation · not live quotes or proof of strategy performance.','历史验证快照 · 非实时行情，未验证策略收益有效性。')}</p>
    </section>`;
  }
  function updateCursor(index){
    const root=document.getElementById('yanheng-dashboard');if(!root)return;
    const series=data.strategies[asset].series,row=series[index];if(!row)return;
    selectedDate=row[0];const {x,y}=chartGeometry(series);
    root.querySelector('[data-quant-cursor]').setAttribute('d',`M${x(index)} 16V164`);
    const dot=root.querySelector('[data-quant-dot]');dot.setAttribute('cx',x(index));dot.setAttribute('cy',y(row[1]));
    root.querySelector('[data-quant-value]').innerHTML=`${row[0]}<strong>${row[1].toFixed(4)}</strong>`;
    const slider=root.querySelector('input');slider.value=index;slider.setAttribute('aria-valuetext',`${row[0]} · ${row[1].toFixed(4)}`);
  }
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-quant-asset]');if(!button)return;
    const root=button.closest('.quant-dashboard');asset=button.dataset.quantAsset;
    root.outerHTML=render(root.dataset.language);
    document.querySelector(`[data-quant-asset="${asset}"]`).focus({preventScroll:true});
  });
  document.addEventListener('input',event=>{if(event.target.id==='quant-date-slider')updateCursor(Number(event.target.value));});
  document.addEventListener('pointermove',event=>{
    if(event.pointerType==='touch')return;
    const chart=event.target.closest('[data-quant-chart]');if(!chart)return;
    const point=chart.createSVGPoint();point.x=event.clientX;point.y=event.clientY;
    const position=point.matrixTransform(chart.getScreenCTM().inverse());
    const count=data.strategies[asset].series.length;
    updateCursor(Math.round(Math.max(0,Math.min(1,(position.x-46)/498))*(count-1)));
  });
  window.YanhengDashboard={render};
})();

/* Original explanatory artwork. Run: node tools/build-diagrams.cjs
   All specimens are drawn schematics, not screenshots, data or experiment outputs.
   Both translations share geometry. Public sources informing the design: README.md. */
const fs = require('fs');
const path = require('path');
const out = path.resolve(__dirname, '../assets/diagrams');
const C = {ink:'#253b53',muted:'#60758a',line:'#d7e1eb',blue:'#326ab6',teal:'#18877e',violet:'#7b67b1',gold:'#ad793a',pale:'#edf3fc',mint:'#eaf6f2',lav:'#f1eef9',sand:'#faf3e8'};
const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
function txt(x,y,s,size=24,color=C.ink,weight=500,anchor='start'){return `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-weight="${weight}" text-anchor="${anchor}">${esc(s)}</text>`;}
function lines(x,y,ss,size=24,color=C.ink,weight=500,anchor='start',gap=32){return ss.map((s,i)=>txt(x,y+i*gap,s,size,color,weight,anchor)).join('');}
function rect(x,y,w,h,fill='#fff',stroke=C.line,r=14){return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`;}
function line(d,color=C.line,width=2,dash=''){return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"${dash?` stroke-dasharray="${dash}"`:''}/>`;}
function arrow(d,color=C.blue,dash=''){return line(d,color,2.5,dash).replace('/>',' marker-end="url(#arrow)"/>');}
function dot(x,y,r,color,stroke='none'){return `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" stroke="${stroke}" stroke-width="2"/>`;}
function pill(x,y,w,s,fill=C.pale,color=C.blue){return rect(x,y,w,38,fill,'none',8)+txt(x+w/2,y+26,s,22,color,600,'middle');}
function check(x,y,color=C.teal){return dot(x,y,13,C.mint)+line(`M${x-6} ${y} l4 4 8 -9`,color,2.5);}
function sheet(x,y,w=160,h=120,color=C.blue){let s=rect(x,y,w,h,'#fff',C.line,9)+rect(x+12,y+13,w-24,22,C.pale,'none',4);for(let i=1;i<4;i++)s+=line(`M${x+13} ${y+31+i*20} H${x+w-13}`,C.line,2);s+=line(`M${x+w*.38} ${y+36} V${y+h-12} M${x+w*.7} ${y+36} V${y+h-12}`,C.line,1.5);return s;}
function doc(x,y,w=150,h=180,color=C.blue){return rect(x,y,w,h,'#fff',C.line,10)+rect(x+17,y+20,42,7,color,'none',3)+[0,1,2,3,4].map(i=>rect(x+17,y+47+i*22,w-34-(i%2)*20,5,i===2?color:C.line,'none',2)).join('');}
function stage(x,y,n,label,color=C.blue){return dot(x+14,y-8,14,color)+txt(x+14,y-1,n,18,'#fff',650,'middle')+txt(x+38,y,label,24,color,650);}
function frame(lang,title,subtitle,body,footer,accent=C.blue){
 return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="640" viewBox="0 0 1000 640" role="img" aria-labelledby="title desc" lang="${lang}">
 <title id="title">${esc(title)}</title><desc id="desc">${esc(subtitle+' '+footer)}</desc>
 <defs><marker id="arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto-start-reverse"><path d="M1 1 L6 3.5 L1 6" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#f9fbfe"/><stop offset="1" stop-color="#f0f5fa"/></linearGradient></defs>
 <rect width="1000" height="640" fill="url(#bg)"/>
 <g font-family="Segoe UI, Microsoft YaHei, PingFang SC, sans-serif">
 ${rect(40,31,5,30,accent,'none',2)}${txt(59,56,title,32,C.ink,650)}${txt(40,92,subtitle,22,C.muted)}
 ${body}${line('M40 596 H960')}${txt(40,624,footer,20,C.muted)}
 </g></svg>\n`;
}
const makers = {};
makers['db-gpt'] = lang => {
 const t=(en,zh)=>lang==='en'?en:zh;
 let b=stage(40,135,'1',t('Data + question','数据与问题'))+stage(330,135,'2',t('Parameters + tools','参数与工具'))+stage(720,135,'3',t('Results + evidence','结果与依据'));
 b+=rect(40,155,240,328)+txt(60,193,t('Tabular data','表格数据'),25,C.ink,650)+sheet(60,212,200,112);
 b+=rect(60,346,200,112,C.pale,'none',10)+lines(77,380,t(['Natural-language','question'],['自然语言问题','查询与分析需求']),24,C.blue,550)+line('M78 433 H171',C.blue,3);
 b+=rect(330,155,340,328)+txt(350,193,t('Parameter parsing','结构化参数解析'),25,C.ink,650);
 const pars=t(['Date','Filters','Group'],['日期','条件','维度']);pars.forEach((v,i)=>b+=pill(350+i*102,212,94,v));
 b+=arrow('M500 260 V281')+txt(500,309,'Python / pandas',25,C.ink,650,'middle');
 [t('Filter records','筛选记录'),t('Calculate rules','规则计算'),t('Summarize groups','分类汇总')].forEach((v,i)=>{const yy=328+i*46;b+=rect(350,yy,300,37,[C.pale,C.mint,C.lav][i],'none',8)+dot(372,yy+18,5,[C.blue,C.teal,C.violet][i])+txt(391,yy+26,v,23,[C.blue,C.teal,C.violet][i]);});
 b+=rect(720,155,240,328)+txt(740,193,t('Structured results','结构化结果'),25,C.ink,650)+sheet(740,212,200,112);
 b+=rect(753,266,174,17,C.sand,'none',3)+txt(740,357,t('Analysis explanation','分析说明'),23,C.teal,650)+lines(740,394,t(['Flagged records','Conditions + sources'],['风险名单与汇总','统计条件与来源记录']),22,C.muted,500,'start',36);
 b+=arrow('M285 298 H322')+arrow('M675 298 H712');
 b+=rect(40,516,920,60,C.mint,'none',12)+check(68,546)+txt(94,554,t('Retain conditions and source records for result verification','保留计算条件与来源记录，支持结果回溯核验'),24,C.teal,550);
 return frame(lang,t('DB-GPT · From question to evidence','DB-GPT · 从问题到可核验结果'),t('Natural language → deterministic tools → traceable analysis','自然语言需求 → 确定性工具执行 → 可追溯的分析说明'),b,t('Conceptual workflow · generic data only; no internal rules or records','技术流程示意 · 仅使用抽象数据，不含内部规则或真实记录'));
};
makers['hiagent'] = lang => {
 const t=(en,zh)=>lang==='en'?en:zh;
 let b=stage(40,137,'1',t('Messages','报文输入'))+stage(274,137,'2',t('Route by type','类型分流'))+stage(736,137,'3',t('Validate','字段校验'),C.teal);
 b+=rect(40,160,200,330)+doc(79,184,132,181)+doc(60,205,132,181)+pill(57,419,166,t('Source text','原始文本'));
 b+=rect(272,273,155,113,C.pale,'none',12)+line('M349 292 V310 M321 327 V310 H377 V327',C.blue,2.5)+dot(321,331,5,C.blue)+dot(377,331,5,C.blue)+txt(349,366,t('Identify type','识别类型'),23,C.blue,600,'middle');
 b+=arrow('M245 329 H264');
 for(let i=0;i<2;i++){let y=171+i*184,col=i?C.violet:C.blue,fill=i?C.lav:C.pale;
  b+=rect(468,y,224,133)+pill(482,y+13,83,i?'B':'A',fill,col)+txt(577,y+39,t('Schema','字段要求'),23,col,600);
  b+=lines(484,y+79,t(['Structured prompt',i?'Field set B':'Field set A'],['结构化提示',i?'B 类字段集合':'A 类字段集合']),22,C.muted,500,'start',31);
 }
 b+=arrow('M427 305 H446 V237 H460')+arrow('M427 355 H446 V421 H460',C.violet);
 b+=rect(736,160,224,330)+txt(755,201,t('Field checks','字段核对'),26,C.ink,650);
 [t('Format','格式一致性'),t('Required fields','必填完整性'),t('Source evidence','原文依据')].forEach((v,i)=>{b+=check(759,245+i*49)+txt(782,253+i*49,v,22,C.ink);});
 b+=rect(752,393,192,76,C.sand,'none',10)+lines(768,423,t(['Ambiguity →','human review'],['缺失或歧义','转人工复核']),22,C.gold,550,'start',29);
 b+=arrow('M694 237 H714 V306 H728')+arrow('M694 421 H714 V344 H728',C.violet);
 b+=rect(40,521,920,55,C.mint,'none',12)+txt(60,556,t('Output','输出'),24,C.teal,650)+txt(184,556,t('Structured fields linked to their original text evidence','结构化字段与原文依据关联'),24,C.teal)+arrow('M847 493 V513',C.teal);
 return frame(lang,t('HiAgent · Route, extract, verify','HiAgent · 分流、提取与核验'),t('Different message types follow different extraction requirements','针对不同报文类型，配置对应的提示与字段提取要求'),b,t('Conceptual workflow · A/B are abstract types; no real messages or customer data','技术流程示意 · A/B 仅表示抽象类型，不含真实报文或客户信息'),C.teal);
};

function poly(points,fill,stroke='none',width=1.5){return `<polygon points="${points}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" stroke-linejoin="round"/>`;}
function pedestal(x,y,color=C.blue){
 return poly(`${x-33},${y} ${x},${y-18} ${x+33},${y} ${x},${y+18}`,'#fff',C.line)+poly(`${x-33},${y} ${x},${y+18} ${x},${y+52} ${x-33},${y+34}`,'#d6e3ef',C.line)+poly(`${x},${y+18} ${x+33},${y} ${x+33},${y+34} ${x},${y+52}`,'#e7eef5',C.line)+poly(`${x-19},${y-31} ${x},${y-44} ${x+19},${y-31} ${x},${y-18}`,color)+poly(`${x-19},${y-31} ${x},${y-18} ${x},${y+3} ${x-19},${y-10}`,color)+poly(`${x},${y-18} ${x+19},${y-31} ${x+19},${y-10} ${x},${y+3}`,'#a9c7dd');
}
makers.xr = lang => {
 const t=(en,zh)=>lang==='en'?en:zh;
 let b=stage(40,137,'1',t('3D exhibits','三维展品展示'))+stage(665,137,'2',t('Indoor guidance','室内路径导览'),C.teal);
 // Axonometric gallery: intentionally synthetic geometry, not a system screenshot.
 b+=poly('65,338 330,198 610,338 345,478','#fff',C.line,2);
 b+=poly('65,338 65,273 330,133 330,198','#e5edf6',C.line,2)+poly('330,133 610,273 610,338 330,198','#f3f7fb',C.line,2);
 for(let i=1;i<5;i++){
  b+=line(`M${65+53*i} ${338-28*i} L${345+53*i} ${478-28*i}`,'#e9eff5',1.2);
  b+=line(`M${65+56*i} ${338+28*i} L${330+56*i} ${198+28*i}`,'#e9eff5',1.2);
 }
 b+=line('M103 359 L198 411 L281 366 L355 405 L505 326',C.teal,5,'9 8');
 b+=dot(103,359,8,C.teal)+dot(505,326,9,'#fff',C.teal)+txt(75,400,t('Start','入口'),23,C.teal,600);
 b+=pedestal(198,303,C.blue)+pedestal(356,351,C.violet)+pedestal(445,270,C.teal);
 b+=rect(91,235,63,28,C.pale,C.line,3)+rect(205,174,63,28,C.pale,C.line,3);
 b+=rect(665,160,295,330)+txt(686,199,t('Route-planning study','路径规划研究'),25,C.ink,650);
 b+=rect(686,221,253,147,'#f8fafc',C.line,6);
 for(let i=1;i<6;i++)b+=line(`M${686+i*42} 222 V367`,'#e8eef4',1);
 for(let i=1;i<4;i++)b+=line(`M687 ${221+i*36} H938`,'#e8eef4',1);
 b+=rect(727,244,42,49,'#dde6ef','none',3)+rect(814,285,42,59,'#dde6ef','none',3);
 b+=line('M704 343 H789 V246 H914',C.teal,4)+dot(704,343,6,C.teal)+dot(914,246,7,'#fff',C.teal);
 b+=line('M704 343 H714 V231 H914 V246',C.blue,2,'6 5');
 b+=txt(686,406,t('Genetic algorithm','遗传算法'),24,C.teal,650)+lines(686,442,t(['Candidate-route search'],['候选路径搜索与比较']),22,C.muted);
 b+=rect(40,520,920,56,C.mint,'none',12)+txt(60,556,t('3D model display + indoor navigation · functional illustration','三维模型展示与室内寻路相结合 · 功能示意'),24,C.teal,550);
 return frame(lang,t('XR · Explore the exhibition space','XR · 展品浏览与空间导览'),t('Model presentation and a route-planning study for indoor guidance','三维展品展示、室内寻路与遗传算法路径规划研究'),b,t('Functional schematic · imagined layout; routes are not measured results','功能示意 · 展馆布局为自绘示例，路线不代表实测优化结果'),C.teal);
};
function sampleFrame(x,y,w,h,shift=0,mask=false){
 let s=rect(x,y,w,h,mask?'#263d55':'#eef4f9',mask?'none':C.line,9);
 if(!mask){s+=poly(`${x+2},${y+h-2} ${x+2},${y+h*.65} ${x+w*.36},${y+h*.46} ${x+w*.7},${y+h*.71} ${x+w-2},${y+h*.6} ${x+w-2},${y+h-2}`,'#d9e5ed');s+=dot(x+w-24,y+23,9,'#d6e2ef');}
 const cx=x+w*.4+shift,cy=y+h*.56;
 s+=`<path d="M${cx-22} ${cy+17} Q${cx-30} ${cy-5} ${cx-10} ${cy-17} Q${cx+9} ${cy-30} ${cx+24} ${cy-7} Q${cx+34} ${cy+12} ${cx+13} ${cy+23} Z" fill="${mask?'#64c8b6':C.blue}"/>`;
 return s;
}
function tensor(x,y,w,h,color){let s='';for(let i=2;i>=0;i--)s+=rect(x+i*8,y-i*8,w,h,'#fff',color,3);for(let i=1;i<4;i++)s+=line(`M${x+i*w/4} ${y} V${y+h} M${x} ${y+i*h/4} H${x+w}`,color,1);return s;}
makers['video-segmentation'] = lang => {
 const t=(en,zh)=>lang==='en'?en:zh;
 let b=stage(40,137,'1',t('Video frames','视频帧序列'))+stage(326,137,'2',t('Feature levels','多层特征'))+stage(718,137,'3',t('Segmentation','目标分割'),C.teal);
 b+=rect(40,160,230,330)+sampleFrame(58,184,155,104,0)+sampleFrame(77,242,155,104,10)+sampleFrame(96,300,155,104,20)+txt(60,458,t('Temporal sequence','连续帧中的目标'),23,C.muted);
 b+=rect(326,160,340,330)+tensor(348,200,94,67,C.blue)+txt(479,216,t('Shallow','浅层特征'),24,C.blue,650)+txt(479,250,t('Spatial detail','空间细节'),22,C.muted);
 b+=tensor(365,330,62,49,C.violet)+txt(479,343,t('Deep','深层特征'),24,C.violet,650)+txt(479,377,t('Semantic cues','语义信息'),22,C.muted);
 b+=line('M461 238 V300 H692 M449 360 H461 V300',C.blue,2.5)+dot(692,300,22,C.mint,C.teal)+txt(692,309,'+',29,C.teal,500,'middle');
 b+=pill(346,426,300,t('Multi-level feature fusion','多层视觉特征融合'),C.pale,C.blue);
 b+=arrow('M276 320 H300 V239 H335')+arrow('M300 320 V354 H351',C.violet)+arrow('M717 300 H737',C.teal);
 b+=rect(750,160,210,330)+txt(769,201,t('Object mask','目标掩码'),25,C.ink,650)+sampleFrame(769,231,172,151,20,true)+lines(769,427,t(['Illustrated mask','not a test output'],['掩码形状示意','非真实实验输出']),22,C.muted,500,'start',30);
 b+=rect(40,520,920,56,C.pale,'none',12)+txt(60,556,t('My participation: visual feature extraction and multi-level fusion','我的参与：视觉特征提取与多层特征融合'),24,C.blue,550);
 return frame(lang,t('Video segmentation · Detail + semantics','视频目标分割 · 细节与语义融合'),t('NSFC 61802197 · research participation · multi-level visual features','国家自然科学基金 61802197 · 参与课题 · 多层视觉特征'),b,t('Research schematic · synthetic frames and masks; no benchmark results','研究内容示意 · 视频帧与掩码均为自绘示例，不展示实验指标'),C.violet);
};
makers['information-filtering'] = lang => {
 const t=(en,zh)=>lang==='en'?en:zh;
 let b=stage(40,137,'1',t('Information context','信息环境'))+stage(396,137,'2',t('Detection workflow','检测流程'))+stage(758,137,'3',t('Documentation','研究材料'),C.teal);
 b+=rect(40,160,304,330);
 const nodes=[[91,223],[175,198],[273,234],[117,320],[244,325],[184,390],[292,416],[73,428]];
 [[0,1],[1,2],[0,3],[1,3],[1,4],[2,4],[3,4],[3,5],[4,5],[4,6],[5,6],[5,7],[3,7]].forEach(([a,c])=>b+=line(`M${nodes[a][0]} ${nodes[a][1]} L${nodes[c][0]} ${nodes[c][1]}`,C.line,2));
 nodes.forEach(([x,y],i)=>b+=dot(x,y,i===3?17:11,i===2||i===4?C.gold:i===3?C.blue:'#bacdde'));
 b+=rect(201,268,104,28,C.sand,'none',7)+txt(253,288,t('Repeated','重复信息'),18,C.gold,600,'middle');
 b+=rect(62,355,90,28,C.pale,'none',7)+txt(107,375,t('Text','文本信息'),18,C.blue,600,'middle');
 b+=txt(61,471,t('False / redundant content','虚假与冗余信息'),22,C.muted);
 b+=rect(396,160,310,330)+rect(417,180,64,79)+line('M430 199 H467 M430 218 H459 M430 237 H467',C.blue,3)+txt(500,211,t('Text features','文本特征'),24,C.blue,650)+txt(500,244,t('Representation','特征表示'),22,C.muted);
 b+=arrow('M550 272 V300')+rect(417,312,268,65,C.pale,'none',10)+txt(551,352,t('Classification','分类判别流程'),25,C.blue,650,'middle');
 b+=arrow('M550 386 V409')+txt(551,449,t('Method / module analysis','方法与模块分析'),23,C.muted,500,'middle');
 b+=arrow('M349 323 H388')+arrow('M710 323 H750');
 b+=rect(758,160,202,330)+doc(803,187,124,143,C.teal)+doc(780,211,124,143,C.teal)+lines(778,402,t(['Technical notes','Study summaries'],['技术文档','研究总结与材料']),22,C.teal,600,'start',38);
 b+=rect(40,520,920,56,C.mint,'none',12)+txt(60,556,t('My participation: workflow analysis, method descriptions and documentation','我的参与：流程梳理、方法说明与研究文档整理'),24,C.teal,550);
 return frame(lang,t('Information filtering · From text to analysis','信息过滤 · 从文本表达到流程分析'),t('NSFC 61703212 · research participation · false and redundant information','国家自然科学基金 61703212 · 参与课题 · 虚假与冗余信息'),b,t('Research-context schematic · network is illustrative, not an implemented model','研究内容示意 · 网络仅表达课题背景，不代表本人实现的模型'),C.gold);
};

for(const [name,make] of Object.entries(makers))for(const lang of ['en','zh'])fs.writeFileSync(path.join(out,`${name}-${lang}.svg`),make(lang));
console.log(`Generated ${Object.keys(makers).length*2} bilingual SVG diagrams.`);

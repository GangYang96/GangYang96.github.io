(() => {
  'use strict';

  const params = new URLSearchParams(location.search),
    zh = params.get('lang') === 'zh',
    lang = zh ? 'zh' : 'en',
    t = (en, cn) => zh ? cn : en,
    esc = s => String(s).replace(/[&<>"']/g, c => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[c]);
  const entries = [['loan-lab', 'Loan analysis', '贷款表格分析'], ['message-lab', 'Message review', '报文提取与复核'], ['gallery-lab', 'Gallery guide', '三维展馆导览']];
  document.documentElement.lang = zh ? 'zh-CN' : 'en';
  const target = document.getElementById('docs');
  const alternate = new URL(location.href);
  alternate.searchParams.set('lang', zh ? 'en' : 'zh');
  target.innerHTML = `<nav><a href="../index.html#projects">← Gang Yang / ${t('Project demos', '项目演示')}</a><a href="${esc(alternate.href)}">${zh ? 'English' : '中文'}</a></nav>`;
  const download = `<a class="button primary" href="../assets/downloads/engineering-demos-source.zip" download>${t('Download all source', '下载全部源码')} ↓</a>`;
  if (document.body.dataset.page === 'source') {
    let id = params.get('project');
    if (!entries.some(e => e[0] === id)) id = 'loan-lab';
    const item = entries.find(e => e[0] === id);
    target.innerHTML += `<p class="eyebrow">SOURCE / ${esc(id)}</p><h1>${t(item[1], item[2])} · ${t('Source code', '实现源码')}</h1><p>${t('These are the actual files used by the public demo. Core logic, interface code and shared components can be inspected below.', '这里展示当前公开 Demo 实际使用的代码，可切换查看核心逻辑、界面和共用组件。')}</p><div class="links">${entries.map(e => `<a class="button" href="source.html?project=${e[0]}&lang=${lang}">${t(e[1], e[2])}</a>`).join('')}</div><div class="links" id="files"></div><span class="file-label" id="file-label"></span><pre tabindex="0" aria-label="${t('Source code', '源代码')}"><code id="code"></code></pre><div class="links"><a class="button" href="${id}/index.html?lang=${lang}">${t('Run this demo', '运行此 Demo')} ↗</a>${download}<button id="download-file">${t('Download current file', '下载当前文件')}</button><a class="button" href="README.html?lang=${lang}#${id}">${t('Scope & instructions', '范围与说明')}</a></div>`;
    const files = [...Object.keys(window.DEMO_SOURCES).filter(file => file.startsWith(id + '/')), 'shared.js', 'shared.css', 'tests.cjs'];
    let current = files[0];
    function show(file) {
      current = file;
      document.getElementById('file-label').textContent = 'demos/' + file;
      document.getElementById('code').textContent = window.DEMO_SOURCES[file] || '';
      document.querySelectorAll('[data-file]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.file === file)));
    }
    document.getElementById('files').innerHTML = files.map(file => `<button data-file="${file}">${file.replace(id + '/', '')}</button>`).join('');
    document.getElementById('files').onclick = e => {
      if (e.target.dataset.file) show(e.target.dataset.file);
    };
    document.getElementById('download-file').onclick = () => {
      const url = URL.createObjectURL(new Blob([window.DEMO_SOURCES[current]], {
        type: 'text/plain;charset=utf-8'
      }));
      const a = document.createElement('a');
      a.href = url;
      a.download = current.replaceAll('/', '-');
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 3000);
    };
    show(current);
    return;
  }
  const content = {
    'loan-lab': {
      steps: t(['Use the clean sample, or load a compatible CSV.', 'Parse the displayed question, then confirm the date, days and unit.', 'Run analysis. Select a row to inspect evidence; recheck totals or export JSON.'], ['载入正常样例，或导入相同表头的 CSV。', '点击“解析问题”，确认日期、天数、机构后“执行分析”。', '点击结果行查看来源；选择“重新核对合计”或导出 JSON。']),
      scope: t('Fixed question grammar + schema validation + local arithmetic. Amounts use integer cents. The default example matches 6 records totaling CNY 735,000.75. The error sample demonstrates duplicate, invalid-date and negative-amount isolation.', '固定句式解析 + 字段校验 + 本地计算。金额使用整数分。默认条件命中 6 条记录，合计 735,000.75 元；异常样例展示重复编号、错误日期与负金额的隔离。'),
      limit: t('No live DB-GPT or model connection, Python execution, real risk scoring, interest or fee calculation. CSV header: id,unit,due_date,balance. Up to 10,000 rows / 1 MB.', '不连接真实 DB-GPT 或模型，不执行 Python，不包含真实风险评分、利息与费用计算。CSV 表头为 id,unit,due_date,balance，最多 10,000 条 / 1 MB。')
    },
    'message-lab': {
      steps: t(['Try the missing-deadline or conflicting-reference sample.', 'Parse & validate, then click a source line beside a field.', 'Correct required fields and add a review note. Enter a reviewer to approve or return the message. Export the review JSON.'], ['选择“缺失时限”或“编号冲突”样例。', '点击“解析并校验”，通过字段旁的行号查看原文。', '补充字段和修订依据，填写复核人，确认复核或退回补充；可导出复核 JSON。']),
      scope: t('Supports COMPLIANCE_QUERY and RETURN_NOTICE in the shown key-value format. Missing, conflicting and invalid values trigger checks. Human corrections and original evidence are exported separately.', '支持所示键值格式的 COMPLIANCE_QUERY 与 RETURN_NOTICE，识别缺失、冲突和格式错误。人工修订与原始依据分别记录，并可一起导出。'),
      limit: t('No live HiAgent model or arbitrary SWIFT parsing. Session history is temporary and is not a secure audit database. Changes requiring clarification must include review notes; approved records must be reset or reparsed before editing.', '不连接 HiAgent 模型，不解析任意 SWIFT 报文。复核记录仅保留在当前会话，并非正式审计数据库。补充与歧义处理需填写依据，已复核内容需重置或重新解析后修改。')
    },
    'gallery-lab': {
      steps: t(['Drag an exhibit or use arrow keys to rotate it. Buttons A–D select objects.', 'Choose stops and plan a visit. A moving marker follows the path.', 'Close the western shortcut and plan again. Compare step counts or export the route.'], ['拖动展品或按方向键旋转，通过 A—D 按钮切换展品。', '选择参观展品，点击“规划参观”，再“沿路线参观”。', '勾选“封闭西侧快捷通道”后重新规划，比较步数或导出路线。']),
      scope: t('Software-projected polygon objects, A* between stops, and seeded genetic visit-order search (24 individuals / 45 generations). The tour begins at S and does not return to the entrance.', '软件投影的多边形展品、展品间 A* 寻路，以及固定种子的遗传算法参观排序（种群 24 / 迭代 45 代）。路线从 S 出发，不返回入口。'),
      limit: t('Fictional 15 × 11 grid. Step counts are not measured meters. Genetic search does not certify the global optimum; no headset, indoor positioning or real spatial reconstruction is connected.', '虚构的 15 × 11 网格展馆，步数不代表实测米数。遗传搜索不保证全局最优；未连接头显、室内定位或真实场景重建。')
    }
  };
  content['loan-lab'].steps.push(t('Load a previous CSV to reconcile snapshots. Search or sort the results; export all hits as CSV.', '载入前一份 CSV 进行对账，查看账龄分布；搜索或排序结果，并导出完整命中 CSV。'));
  content['loan-lab'].scope += t(' Aging covers all outstanding balances in the unit. Reconciliation requires two clean datasets and reports additions, removals and changes.', ' 账龄分布覆盖机构内全部未结清余额。对账要求两份无错误的数据，报告新增、移除和变更。');
  content['message-lab'].steps.push(t('Save the queue to this browser or export it. Reopen completed records with a reason before making further changes.', '保存待办到本机或导出，刷新后可恢复。再次修改已完成记录前，填写原因并重新复核。'));
  content['message-lab'].limit = t('No HiAgent or arbitrary SWIFT parsing. Local history is versioned and checked on import, but has no authentication or tamper-proof guarantee. Save is explicit; browser storage may be unavailable.', '不连接 HiAgent 或解析任意 SWIFT 报文。本机历史按版本保存，导入时校验，但无身份认证或防篡改保证。需显式点击保存，浏览器可能禁用存储。');
  content['gallery-lab'].steps.push(t('Import a map JSON, enable return to entrance, and compare exact, nearest-neighbor and genetic routes.', '导入地图 JSON，选择返回入口，对比精确、最近邻和遗传算法路线。'));
  content['gallery-lab'].scope = t('A* segments, Held-Karp exact ordering for up to 10 stops, nearest-neighbor and seeded genetic comparisons (32 individuals, 50 generations). Optional return to entrance and temporary cell closures.', 'A* 分段寻路，最多10站的 Held–Karp 精确排序、最近邻与固定种子遗传算法对比（32个体、50代）。支持返回入口及临时封闭网格。');
  content['gallery-lab'].limit = t('Synthetic maps up to 40 × 40. Distances are grid steps and times are configured estimates. Custom maps do not import 3D models. No headset or indoor positioning integration.', '最多40 × 40的虚构地图。距离以网格步数计，时间按设定值估算。自定义地图不导入三维模型；未连接头显或室内定位服务。');
  target.innerHTML += `<h1>${t('Demo instructions', 'Demo 使用说明')}</h1><p>${t('Three engineering demonstrations, independently implemented for this portfolio.', '为个人主页独立制作的三个工程项目演示。')}</p><div class="notice">${t('Synthetic data and fictional scenes. These are public reconstructions, not original employer code or research-paper experiments. Project roles and published authorship remain as stated on the homepage.', '使用合成数据和虚构场景。这些是公开演示实现，不是单位原系统源码或科研论文实验；个人项目职责与论文署名仍以主页说明为准。')}</div><section><h2>${t('Start here', '如何使用')}</h2><p>${t('Click a demo below. No account, API key or installation is needed. You can also extract the source ZIP and open any demo’s index.html in a browser. For the full homepage and subtitle tracks, use a local HTTP server.', '点击下方 Demo 即可体验，无需账号、API Key 或安装依赖。也可解压源码 ZIP，双击各项目的 index.html。完整主页与视频字幕建议使用本地 HTTP 服务。')}</p><code>python tools/serve-preview.py</code><p>${t('Run from the homepage folder, then open http://127.0.0.1:8767/. Save the message queue or export results before closing or switching language; loan and gallery state is temporary.', '在主页目录运行后，打开 http://127.0.0.1:8767/。关闭页面或切换语言前，保存报文待办或导出结果；贷款和展馆会话为临时状态。')}</p><div class="links">${download}<a class="button" href="README.md">${t('Detailed technical notes', '详细技术说明')}</a></div></section>`;
  for (const [id, en, cn] of entries) {
    const d = content[id];
    target.innerHTML += `<section id="${id}"><p class="eyebrow">${id.toUpperCase()}</p><h2>${t(en, cn)}</h2><ol>${d.steps.map(s => `<li>${s}</li>`).join('')}</ol><h3>${t('What is implemented', '已实现的内容')}</h3><p>${d.scope}</p><h3>${t('Demonstration boundary', '演示范围')}</h3><p>${d.limit}</p><div class="links"><a class="button primary" href="${id}/index.html?lang=${lang}">${t('Open demo', '打开 Demo')} ↗</a><a class="button" href="source.html?project=${id}&lang=${lang}">${t('View implementation', '查看代码')} &lt;/&gt;</a></div></section>`;
  }
  if (location.hash) requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView());
})();

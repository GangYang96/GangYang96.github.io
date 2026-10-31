/* Static rendering and interaction; all copy is maintained in content.js / i18n.js. */
(() => {
  'use strict';
  const data = window.SITE_CONTENT;
  const ids = ['home', 'projects', 'publications', 'experience', 'honors', 'contact'];
  let lang = 'en';
  try { if (localStorage.getItem('gang-yang-language') === 'zh') lang = 'zh'; } catch {}
  const requestedLanguage = new URLSearchParams(location.search).get('lang');
  if (requestedLanguage === 'en' || requestedLanguage === 'zh') lang = requestedLanguage;
  const filters = {publications: 'all', projects: 'practice'};
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const t = value => typeof value === 'object' && value !== null ? value[lang] ?? value.en ?? '' : value ?? '';
  const text = value => escape(t(value));
  const ui = () => window.SITE_UI[lang];
  const tags = values => `<div class="tags">${values.map(value => `<span class="tag">${text(value)}</span>`).join('')}</div>`;
  const external = (url, label) => `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${text(label)} ↗</a>`;
  const sectionHead = (num, title, subtitle) => `<div class="section-head"><h2>${text(title)}</h2>${subtitle ? `<p>${text(subtitle)}</p>` : ''}</div>`;
  function figure(src, alt, caption, className='paper-figure') {
    return `<figure class="${className}"><a class="figure-link" data-figure href="${escape(src)}" target="_blank" rel="noopener" aria-label="${escape(ui().zoom)}: ${text(alt)}"><img src="${escape(src)}" alt="${text(alt)}" loading="lazy" decoding="async"><span class="zoom-label">${escape(ui().zoom)} ↗</span></a><figcaption>${text(caption)}</figcaption></figure>`;
  }
  function details(id, rows) {
    return `<details class="details" id="details-${id}"><summary>${escape(ui().details)}</summary><div class="details-body">${rows.map(row => `<div><h4>${text(row.title)}</h4><p>${text(row.text)}</p></div>`).join('')}</div></details>`;
  }
  function publication(item) {
    const copy = ui();
    const hasFigures = item.figures?.length;
    const artwork = hasFigures ? item.figures.map(f => figure(f.src, f.alt, f.caption)).join('') : `<div class="bibliographic-cover" aria-hidden="true"><span class="cover-type">${escape(copy[item.kind])}</span><span class="cover-title">${item.id === 'bert-cn' ? '信息技术' : 'Android<br>V1.0'}</span><span class="cover-year">${item.id === 'bert-cn' ? '2024 · 06' : '2022SR0273010'}</span></div>`;
    return `<article class="publication" id="${item.id}" data-kind="${item.kind}" data-scroll-anchor>
      <div class="publication-visual ${hasFigures > 1 ? 'two-figures' : ''}">${artwork}</div>
      <div class="publication-copy"><div class="publication-meta">${item.year ? `<span class="year">${escape(item.year)}</span>` : ''}<span class="type-badge">${escape(copy[item.kind])}</span></div>
      <h3>${text(item.title)}</h3><p class="authors">${item.authors.map(name => /^(Gang Yang|杨刚)$/.test(name) ? `<strong>${escape(name)}</strong>` : escape(name)).join(', ')}</p><p class="venue">${text(item.venue)}</p>
      ${item.authorship ? `<p class="authorship-note">${text(item.authorship)}</p>` : ''}
      <p class="research-question">${text(item.question)}</p><p class="research-summary">${text(item.summary)}</p>
      <p class="contribution-line"><strong>${escape(copy.contribution)}${lang === 'zh' ? '：' : '. '}</strong>${text(item.contribution)}</p>
      ${tags(item.tags)}${item.links.length ? `<div class="pub-links">${item.links.map(link=>external(link.url,link.label)).join('')}</div>` : ''}
      ${details(item.id, item.details)}</div></article>`;
  }
  function project(item) {
    const copy = ui();
    const demo = window.SITE_DEMOS.find(d => d.project === item.id);
    const illustration = figure(`assets/diagrams/${item.diagram}-${lang}.svg?v=20261021`, copy.diagramAlt+t(item.title), item.figureCaption||copy.schematic, 'project-image');
    const more = [{title:copy.io,text:item.io},{title:copy.contribution,text:item.contribution},...item.details];
    return `<article class="project-card ${item.id === 'db-gpt' ? 'project-featured' : ''}" id="${item.id}" data-kind="${item.kind}" data-scroll-anchor>
      <div class="project-body"><div class="project-copy"><div class="project-meta"><span>${escape(copy[item.kind])}</span>${item.period?`<span>${text(item.period)}</span>`:''}</div>
      <h3>${text(demo?.title||item.title)}</h3><p class="project-role">${text(item.role)}</p><p class="project-summary">${text(demo?.summary||item.summary)}</p>
      ${demo?`<div class="project-links"><a class="project-primary" href="demos/${demo.id}/index.html?lang=${lang}">${lang==='zh'?'体验 Demo':'Try the demo'} <span aria-hidden="true">↗</span></a><a href="${escape(demo.repository)}" target="_blank" rel="noopener noreferrer">${lang==='zh'?'Demo 仓库':'Demo repository'}</a><a href="${escape(demo.repository)}/blob/main/src/core.js" target="_blank" rel="noopener noreferrer">${lang==='zh'?'核心源码':'Core code'}</a><a href="demos/README.html?lang=${lang}#${demo.id}">${lang==='zh'?'实现说明':'Implementation'}</a></div>`:''}</div>
      <div class="project-media">${demo?`<button type="button" class="project-video" data-video="${demo.id}" aria-label="${lang==='zh'?'播放演示视频：':'Play video: '}${text(demo.demoTitle)}"><img src="assets/demos/${demo.id}-preview.webp" width="1200" height="675" alt="${text(demo.demoTitle)}" loading="lazy"><span class="play-circle" aria-hidden="true">▶</span><span class="video-duration">${lang==='zh'?'观看演示':'Watch demo'} · ${demo.duration}</span></button><p class="demo-note">${text(demo.demoNote)}</p>`:illustration}</div>
      <details class="details" id="details-${item.id}"><summary>${escape(copy.details)}</summary><div class="details-body">${demo?`<ul class="project-work">${demo.work.map(line=>`<li>${text(line)}</li>`).join('')}</ul>`:''}${more.map(row=>`<div><h4>${text(row.title)}</h4><p>${text(row.text)}</p></div>`).join('')}${demo?illustration:''}</div></details>
      </div></article>`;
  }
  function filterControls(group, items) {
    const copy = ui();
    const order = group === 'publications' ? ['journal','thesis','software'] : ['agent','research','engineering'];
    const kinds = group === 'projects' ? ['practice','research','all'] : ['all', ...order.filter(kind=>items.some(item=>item.kind===kind))];
    return `<div class="filters" role="group" aria-label="${escape(copy[group === 'publications' ? 'publicationFilter' : 'projectFilter'])}">${kinds.map(kind=>`<button type="button" class="filter" data-filter-group="${group}" data-filter="${kind}" aria-pressed="${filters[group] === kind}">${escape(copy[kind])}</button>`).join('')}<span class="filter-count" id="${group}-count" role="status" aria-live="polite"></span></div>`;
  }
  function render(preservePosition=false) {
    const oldAnchor = preservePosition ? [...document.querySelectorAll('[data-scroll-anchor]')].filter(el=>!el.hidden && el.getBoundingClientRect().top <= 120).pop() : null;
    const anchor = oldAnchor && {id:oldAnchor.id, top:oldAnchor.getBoundingClientRect().top};
    const opened = [...document.querySelectorAll('details[open]')].map(el=>el.id);
    const copy = ui();
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = lang === 'zh' ? '杨刚 | 学术主页' : 'Gang Yang | Academic Homepage';
    document.querySelector('meta[name=description]').content = copy.metaDescription;
    document.querySelector('#site-header').innerHTML = `<div class="container header-inner"><a class="brand" href="#home">${escape(copy.brand)}</a><nav class="nav-links" id="main-nav" aria-label="${escape(copy.navLabel)}">${ids.map((id,i)=>`<a href="#${id}">${escape(copy.nav[i])}</a>`).join('')}</nav><div class="header-controls"><div class="lang-switch" role="group" aria-label="${escape(copy.languageLabel)}"><button type="button" data-language="en" lang="en" aria-pressed="${lang === 'en'}">EN</button><button type="button" data-language="zh" lang="zh-CN" aria-pressed="${lang === 'zh'}">中文</button></div><button type="button" class="menu-toggle" aria-controls="main-nav" aria-expanded="false" aria-label="${escape(copy.menu)}">☰</button></div></div>`;
    document.querySelector('#main').innerHTML = `
      <section class="container" id="home" data-scroll-anchor><div class="hero"><div class="hero-copy"><p class="hero-eyebrow">${escape(copy.eyebrow)}</p><h1>${escape(copy.name)}<span>${escape(copy.otherName)}</span></h1><p class="hero-focus">${escape(copy.subtitle)}</p><p class="hero-intro">${text(data.profile.intro)}</p><div class="hero-actions"><a class="button-primary" href="#projects">${escape(copy.projectsButton)} <span aria-hidden="true">↗</span></a><a href="#publications">${escape(copy.papersButton)} <span aria-hidden="true">›</span></a><a href="https://github.com/GangYang96" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a></div></div>
      <aside class="profile-card"><img class="portrait" src="assets/gang-yang.svg" width="720" height="720" alt="${escape(copy.photoAlt)}" fetchpriority="high"><div class="profile-info"><strong>${escape(copy.profileDegree)}</strong><p>${escape(copy.university)}</p><p>${escape(copy.profileAdvisor)}</p><div class="profile-links"><a href="mailto:ygnuist@163.com">ygnuist@163.com</a></div></div></aside></div><div class="research-interests"><h2 class="interest-label">${escape(copy.interests)}</h2><ul>${data.profile.interests.map(value=>`<li>${text(value)}</li>`).join('')}</ul></div></section>
      <section class="section" id="projects" data-scroll-anchor><div class="container">${sectionHead('03',copy.projectTitle,copy.projectSubtitle)}${filterControls('projects',data.projects)}<div class="project-grid">${data.projects.map(project).join('')}</div><p class="section-note">${lang==='zh'?'演示根据项目介绍独立实现，使用合成数据，不包含单位原系统源码。':'Demos are independent implementations with synthetic data; they do not contain employer source code.'} <a href="assets/downloads/engineering-demos-source.zip" download>${lang==='zh'?'下载 Demo 源码':'Download demo source'}</a></p></div></section>
      <section class="section" id="publications" data-scroll-anchor><div class="container"><span id="research"></span>${sectionHead('02',copy.pubTitle,copy.pubSubtitle)}${filterControls('publications',data.publications)}<p class="section-note" data-code-index>${lang==='zh'?'相关实现：':'Related implementations: '}${external('https://github.com/GangYang96/paper-reproductions/blob/main/docs/code-index.md',lang==='zh'?'论文与项目代码索引':'Paper and project code index')} · ${external('https://github.com/GangYang96',lang==='zh'?'GitHub 个人页':'GitHub profile')}</p><div class="publication-list">${data.publications.map(publication).join('')}</div></div></section>
      <section class="section" id="experience" data-scroll-anchor><div class="container">${sectionHead('04',copy.careerTitle,copy.careerSubtitle)}<div class="timeline">${data.timeline.map(item=>`<article class="timeline-item"><div class="timeline-date">${text(item.period)}</div><div class="timeline-content"><h3>${text(item.title)}</h3><p class="timeline-organization">${text(item.organization)}</p><p class="timeline-description">${text(item.description)}</p></div></article>`).join('')}</div></div></section>
      <section class="section soft" id="honors" data-scroll-anchor><div class="container">${sectionHead('05',copy.honorsTitle,copy.honorsSubtitle)}<div class="honors-grid"><div><h3 class="minor-heading">${escape(copy.honorsLabel)}</h3><ul class="honors-list">${data.honors.map(item=>`<li>${text(item)}</li>`).join('')}</ul></div><div><h3 class="minor-heading">${escape(copy.skillsLabel)}</h3>${data.skills.map(group=>`<div class="skill-group"><h4>${text(group.title)}</h4>${tags(group.items)}</div>`).join('')}</div></div></div></section>
      <section class="section" id="contact" data-scroll-anchor><div class="container contact-grid"><div><h2>${escape(copy.contactTitle)}</h2><p>${escape(copy.contactText)}</p></div><div class="contact-links"><div class="contact-link"><span>${escape(copy.contactEmail)}</span><a href="mailto:ygnuist@163.com">ygnuist@163.com ↗</a></div><div class="contact-link"><span>GitHub</span>${external('https://github.com/GangYang96','GangYang96')}</div></div></div></section>`;
    document.querySelector('#site-footer').innerHTML = `<div class="container footer-inner"><span>© ${new Date().getFullYear()} ${escape(copy.footer)}</span><div class="footer-links">${external('https://github.com/GangYang96/GangYang96.github.io',copy.source)}<a href="#home">${escape(copy.backTop)}</a></div></div>`;
    document.querySelector('#dialog-close').setAttribute('aria-label',copy.close);
    document.querySelector('#dialog-original').textContent = copy.original;
    opened.forEach(id=>{const el=document.getElementById(id);if(el) el.open=true;});
    Object.keys(filters).forEach(applyFilter);
    if(anchor){const el=document.getElementById(anchor.id);if(el) window.scrollBy({top:el.getBoundingClientRect().top-anchor.top,behavior:'instant'});}
    updateNav();
  }
  function applyFilter(group) {
    let count=0;
    document.querySelectorAll(`#${group} article[data-kind]`).forEach(el=>{el.hidden=filters[group]==='practice'?el.dataset.kind==='research':filters[group]!=='all'&&el.dataset.kind!==filters[group];if(!el.hidden)count++;});
    document.querySelectorAll(`[data-filter-group="${group}"]`).forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.filter===filters[group])));
    document.getElementById(`${group}-count`).textContent=`${count} ${ui().results}`;
    updateNav();
  }
  function updateNav() {
    const threshold=document.querySelector('#site-header').offsetHeight+80;
    let current='home';
    ids.forEach(id=>{if(document.getElementById(id).getBoundingClientRect().top<=threshold)current=id;});
    if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-3)current='contact';
    document.querySelectorAll('.nav-links a').forEach(a=>{if(a.hash===`#${current}`)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
  }
  function closeMenu(){document.querySelector('.nav-links').classList.remove('open');document.querySelector('.menu-toggle').setAttribute('aria-expanded','false');}
  const aliases={showcase:'projects','demo-loan-lab':'db-gpt','demo-message-lab':'hiagent','demo-gallery-lab':'xr',about:'home',research:'publications','pub-eswa':'continuous-prompts','pub-keap':'keap',directions:'home'};
  function goToHash(behavior='smooth') {
    const requested=decodeURIComponent(location.hash.slice(1));
    if(!requested)return;
    const id=aliases[requested]||requested;
    const el=document.getElementById(id);
    if(!el)return;
    for(const group of ['publications','projects'])if(el.closest(`#${group}`)&&el.hidden){filters[group]='all';applyFilter(group);}
    el.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':behavior,block:'start'});
  }
  const videoDialog=document.querySelector('#video-dialog');
  let lastVideoTrigger=null;
  function openVideo(trigger) {
    const demo=window.SITE_DEMOS.find(d=>d.id===trigger.dataset.video);
    if(!demo)return;
    lastVideoTrigger=trigger;
    document.querySelector('#video-title').textContent=t(demo.demoTitle);
    document.querySelector('#video-note').textContent=t(demo.demoNote);
    document.querySelector('#video-close').setAttribute('aria-label',lang==='zh'?'关闭视频':'Close video');
    document.querySelector('#video-download').href=`assets/demos/${demo.id}.webm`;
    document.querySelector('#video-download').textContent=lang==='zh'?'下载视频':'Download video';
    document.querySelector('#video-player').innerHTML=`<video controls playsinline preload="auto" poster="assets/demos/${demo.id}.webp"><source src="assets/demos/${demo.id}.webm" type="video/webm"><track kind="subtitles" src="assets/demos/${demo.id}-zh.vtt" srclang="zh" label="中文" ${lang==='zh'?'default':''}><track kind="subtitles" src="assets/demos/${demo.id}-en.vtt" srclang="en" label="English" ${lang==='en'?'default':''}></video>`;
    videoDialog.showModal();document.body.classList.add('modal-open');
    videoDialog.querySelector('video').play().catch(()=>{});
  }
  document.querySelector('#video-close').onclick=()=>videoDialog.close();
  videoDialog.addEventListener('close',()=>{videoDialog.querySelector('video')?.pause();document.querySelector('#video-player').innerHTML='';document.body.classList.remove('modal-open');lastVideoTrigger?.focus({preventScroll:true});});
  videoDialog.addEventListener('click',event=>{if(event.target===videoDialog){const r=videoDialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)videoDialog.close();}});
  const dialog=document.querySelector('#figure-dialog');
  let figureTrigger=null;
  document.addEventListener('click',event=>{
    const videoTrigger=event.target.closest('[data-video]');
    if(videoTrigger){openVideo(videoTrigger);return;}
    const languageButton=event.target.closest('[data-language]');
    if(languageButton){lang=languageButton.dataset.language;try{localStorage.setItem('gang-yang-language',lang);const url=new URL(location.href);if(url.searchParams.has('lang')){url.searchParams.set('lang',lang);history.replaceState(null,'',url);}}catch{}render(true);document.querySelector(`[data-language="${lang}"]`).focus({preventScroll:true});return;}
    const filter=event.target.closest('[data-filter]');
    if(filter){filters[filter.dataset.filterGroup]=filter.dataset.filter;applyFilter(filter.dataset.filterGroup);return;}
    const menu=event.target.closest('.menu-toggle');
    if(menu){const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));document.querySelector('.nav-links').classList.toggle('open',open);return;}
    const link=event.target.closest('[data-figure]');
    if(link&&!event.ctrlKey&&!event.metaKey&&!event.shiftKey){event.preventDefault();figureTrigger=link;const img=link.querySelector('img');document.querySelector('#dialog-image').src=img.src;document.querySelector('#dialog-image').alt=img.alt;document.querySelector('#figure-title').textContent=ui().zoom;document.querySelector('#dialog-caption').textContent=link.closest('figure').querySelector('figcaption').textContent;document.querySelector('#dialog-original').href=link.href;dialog.showModal();document.body.classList.add('modal-open');return;}
    const anchor=event.target.closest('a[href^="#"]');
    if(anchor){closeMenu();if(anchor.hash===location.hash){event.preventDefault();goToHash();}}
  });
  document.addEventListener('toggle',event=>{if(event.target.matches('details'))event.target.querySelector('summary').textContent=event.target.open?ui().less:ui().details;},true);
  document.querySelector('#dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');figureTrigger?.focus({preventScroll:true});});
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
  let scheduled=false;
  window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(()=>{updateNav();scheduled=false;});}},{passive:true});
  window.addEventListener('resize',()=>{if(innerWidth>900)closeMenu();updateNav();});
  window.addEventListener('hashchange',()=>goToHash());
  render();
  // Explicit sizes are not available for all original figures; wait for their decode
  // before resolving old deep links so lazy loading cannot move the target away.
  if(location.hash){const initialImages=[...document.querySelectorAll('#home img,.publication img,.project-video img')];initialImages.forEach(img=>img.loading='eager');Promise.allSettled(initialImages.map(img=>img.decode())).then(()=>goToHash('instant'));}
})();

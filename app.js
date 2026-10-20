/* Static rendering and interaction; all copy is maintained in content.js / i18n.js. */
(() => {
  'use strict';
  const data = window.SITE_CONTENT;
  const ids = ['home', 'publications', 'projects', 'experience', 'honors', 'contact'];
  let lang = 'en';
  try { if (localStorage.getItem('gang-yang-language') === 'zh') lang = 'zh'; } catch {}
  const filters = {publications: 'all', projects: 'all'};
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const t = value => typeof value === 'object' && value !== null ? value[lang] ?? value.en ?? '' : value ?? '';
  const text = value => escape(t(value));
  const ui = () => window.SITE_UI[lang];
  const tags = values => `<div class="tags">${values.map(value => `<span class="tag">${text(value)}</span>`).join('')}</div>`;
  const external = (url, label) => `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${text(label)} ↗</a>`;
  const sectionHead = (num, title, subtitle) => `<div class="section-head"><div><p class="eyebrow">${num} / ${text(title)}</p><h2>${text(title)}</h2></div><p>${text(subtitle)}</p></div>`;
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
      <p class="research-question">${text(item.question)}</p><p class="research-summary">${text(item.summary)}</p>
      <p class="contribution-line"><strong>${escape(copy.contribution)}${lang === 'zh' ? '：' : '. '}</strong>${text(item.contribution)}</p>
      ${tags(item.tags)}${item.links.length ? `<div class="pub-links">${item.links.map(link=>external(link.url,link.label)).join('')}</div>` : ''}
      ${details(item.id, item.details)}</div></article>`;
  }
  function project(item) {
    const copy = ui();
    return `<article class="project-card" id="${item.id}" data-kind="${item.kind}" data-scroll-anchor>
      ${figure(`assets/diagrams/${item.diagram}-${lang}.svg`,copy.diagramAlt+t(item.title),copy.schematic,'project-image')}
      <div class="project-body"><div class="project-meta"><span class="type-badge">${escape(copy[item.kind])}</span><span class="project-role">${text(item.role)}</span></div>
      <h3>${text(item.title)}</h3>${item.period ? `<p class="project-role">${text(item.period)}</p>` : ''}<p class="project-summary">${text(item.summary)}</p>${tags(item.tags)}
      ${details(item.id, [{title:copy.io,text:item.io},{title:copy.contribution,text:item.contribution},...item.details])}</div></article>`;
  }
  function filterControls(group, items) {
    const copy = ui();
    const order = group === 'publications' ? ['journal','thesis','software'] : ['agent','research','engineering'];
    const kinds = ['all', ...order.filter(kind=>items.some(item=>item.kind===kind))];
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
    document.querySelector('#site-header').innerHTML = `<div class="container header-inner"><a class="brand" href="#home"><span class="brand-mark" aria-hidden="true">GY</span>${escape(copy.brand)}</a><nav class="nav-links" id="main-nav" aria-label="${escape(copy.navLabel)}">${ids.map((id,i)=>`<a href="#${id}">${escape(copy.nav[i])}</a>`).join('')}</nav><div class="header-controls"><div class="lang-switch" role="group" aria-label="${escape(copy.languageLabel)}"><button type="button" data-language="en" lang="en" aria-pressed="${lang === 'en'}">EN</button><button type="button" data-language="zh" lang="zh-CN" aria-pressed="${lang === 'zh'}">中文</button></div><button type="button" class="menu-toggle" aria-controls="main-nav" aria-expanded="false" aria-label="${escape(copy.menu)}">☰</button></div></div>`;
    document.querySelector('#main').innerHTML = `
      <section class="container" id="home" data-scroll-anchor><div class="hero"><div class="hero-copy"><p class="eyebrow">${escape(copy.eyebrow)}</p><h1>${escape(copy.name)}<span>${escape(copy.otherName)}</span></h1><p class="hero-subtitle">${escape(copy.subtitle)}</p><p class="hero-intro">${text(data.profile.intro)}</p><h2 class="interest-label">${escape(copy.interests)}</h2><div class="interest-tags">${tags(data.profile.interests)}</div><p class="interest-note">${escape(copy.practice)}</p><div class="hero-actions"><a class="button primary" href="#publications">${escape(copy.papersButton)} <span aria-hidden="true">↓</span></a><a class="button" href="#projects">${escape(copy.projectsButton)} <span aria-hidden="true">↓</span></a><a class="button" href="mailto:ygnuist@163.com">${escape(copy.emailButton)} <span aria-hidden="true">↗</span></a></div></div>
      <aside class="profile-card"><img class="portrait" src="assets/gang-yang.svg" width="720" height="720" alt="${escape(copy.photoAlt)}" fetchpriority="high"><div class="profile-info"><strong>${escape(copy.profileDegree)}</strong><p>${escape(copy.university)}</p><p>${escape(copy.profileAdvisor)}</p><div class="profile-links"><a href="mailto:ygnuist@163.com">ygnuist@163.com</a>${external('https://github.com/GangYang96','GitHub')}</div></div></aside></div><div class="research-bridge"><h2>${escape(copy.bridgeTitle)}</h2><p>${text(data.profile.bridge)}</p></div></section>
      <section class="section" id="publications" data-scroll-anchor><div class="container"><span id="research"></span>${sectionHead('01',copy.pubTitle,copy.pubSubtitle)}${filterControls('publications',data.publications)}<div class="publication-list">${data.publications.map(publication).join('')}</div></div></section>
      <section class="section soft" id="projects" data-scroll-anchor><div class="container">${sectionHead('02',copy.projectTitle,copy.projectSubtitle)}${filterControls('projects',data.projects)}<div class="project-grid">${data.projects.map(project).join('')}</div><p class="section-note">${escape(copy.privacyNote)}</p></div></section>
      <section class="section" id="experience" data-scroll-anchor><div class="container">${sectionHead('03',copy.careerTitle,copy.careerSubtitle)}<div class="timeline">${data.timeline.map(item=>`<article class="timeline-item"><div class="timeline-date">${text(item.period)}</div><div class="timeline-content"><h3>${text(item.title)}</h3><p class="timeline-organization">${text(item.organization)}</p><p class="timeline-description">${text(item.description)}</p></div></article>`).join('')}</div></div></section>
      <section class="section soft" id="honors" data-scroll-anchor><div class="container">${sectionHead('04',copy.honorsTitle,copy.honorsSubtitle)}<div class="honors-grid"><div><h3 class="minor-heading">${escape(copy.honorsLabel)}</h3><ul class="honors-list">${data.honors.map(item=>`<li>${text(item)}</li>`).join('')}</ul></div><div><h3 class="minor-heading">${escape(copy.skillsLabel)}</h3>${data.skills.map(group=>`<div class="skill-group"><h4>${text(group.title)}</h4>${tags(group.items)}</div>`).join('')}</div></div></div></section>
      <section class="section" id="contact" data-scroll-anchor><div class="container contact-grid"><div><p class="eyebrow">05 / ${escape(copy.contactTitle)}</p><h2>${escape(copy.contactTitle)}</h2><p>${escape(copy.contactText)}</p></div><div class="contact-links"><div class="contact-link"><span>${escape(copy.contactEmail)}</span><a href="mailto:ygnuist@163.com">ygnuist@163.com ↗</a></div><div class="contact-link"><span>GitHub</span>${external('https://github.com/GangYang96','GangYang96')}</div></div></div></section>`;
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
    document.querySelectorAll(`#${group} article[data-kind]`).forEach(el=>{el.hidden=filters[group]!=='all'&&el.dataset.kind!==filters[group];if(!el.hidden)count++;});
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
  const aliases={about:'home',research:'publications','pub-eswa':'continuous-prompts','pub-keap':'keap',directions:'home'};
  function goToHash(behavior='smooth') {
    const requested=decodeURIComponent(location.hash.slice(1));
    if(!requested)return;
    const id=aliases[requested]||requested;
    const el=document.getElementById(id);
    if(!el)return;
    for(const group of ['publications','projects'])if(el.closest(`#${group}`)&&el.hidden){filters[group]='all';applyFilter(group);}
    el.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':behavior,block:'start'});
  }
  const dialog=document.querySelector('#figure-dialog');
  let figureTrigger=null;
  document.addEventListener('click',event=>{
    const languageButton=event.target.closest('[data-language]');
    if(languageButton){lang=languageButton.dataset.language;try{localStorage.setItem('gang-yang-language',lang);}catch{}render(true);document.querySelector(`[data-language="${lang}"]`).focus({preventScroll:true});return;}
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
  window.addEventListener('resize',()=>{if(innerWidth>860)closeMenu();updateNav();});
  window.addEventListener('hashchange',()=>goToHash());
  render();
  // Explicit sizes are not available for all original figures; wait for their decode
  // before resolving old deep links so lazy loading cannot move the target away.
  if(location.hash){document.querySelectorAll('.publication img').forEach(img=>img.loading='eager');Promise.allSettled([...document.images].map(img=>img.decode())).then(()=>goToHash('instant'));}
})();

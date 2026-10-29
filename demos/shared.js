(function (global) {
  'use strict';

  const params = new URLSearchParams(location.search);
  let language = params.get('lang') === 'zh' ? 'zh' : 'en';
  try {
    if (!params.has('lang') && localStorage.getItem('gang-yang-language') === 'zh') language = 'zh';
  } catch {}
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[c]);
  const t = (en, zh) => language === 'zh' ? zh : en;
  let toastTimer;
  global.Demo = {
    get lang() {
      return language;
    },
    t,
    esc,
    $: id => document.getElementById(id),
    mount(id, title, subtitle, content) {
      document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
      document.title = `${title} · Gang Yang`;
      document.body.innerHTML = `<div class="shell"><aside class="side"><a class="brand" href="../../index.html#projects"><span class="mark">GY</span>${t('Gang Yang · Projects', '杨刚 · 项目')}</a><small>${t('INTERACTIVE PROJECTS', '交互项目')}</small><nav>${[['loan-lab', '01', t('Data analysis', '数据分析')], ['message-lab', '02', t('Message review', '报文复核')], ['gallery-lab', '03', t('Gallery guide', '展馆导览')]].map(([path, num, name]) => `<a href="../${path}/index.html?lang=${language}" class="${id === path ? 'active' : ''}">${num} &nbsp; ${name}</a>`).join('')}</nav><div class="scope"><strong>${t('Built from project descriptions', '依据项目介绍独立实现')}</strong><br>${t('Public demonstration with synthetic data. Source and scope are included.', '公开演示使用合成数据，附源码与实现范围说明。')}<br><br>Gang Yang · 2026</div></aside><main class="main"><div class="topbar"><span class="crumb">${t('Engineering demo', '工程项目演示')}</span><div class="top-actions"><a href="../../index.html#projects">${t('Back to portfolio', '返回主页')}</a><button class="lang" id="language">${t('中文', 'EN')}</button></div></div><div class="heading"><div><h1>${title}</h1><p>${subtitle}</p></div><span class="badge">${t('Local demo · synthetic data', '本地演示 · 合成数据')}</span></div>${content}<footer class="footer"><span>${t('Independent demo · not an employer system', '独立演示 · 非单位原系统')}</span><span><a href="../README.html?lang=${language}#${id}">${t('Implementation & scope', '实现与范围')}</a> &nbsp;·&nbsp; <a href="${({'loan-lab':'https://github.com/GangYang96/loan-data-analysis','message-lab':'https://github.com/GangYang96/message-review-workflow','gallery-lab':'https://github.com/GangYang96/gallery-route-planner'})[id]}" target="_blank" rel="noopener noreferrer">${t('GitHub source', 'GitHub 源码')}</a></span></footer></main></div><div class="toast" id="toast" role="status" aria-live="polite"></div>`;
      document.getElementById('language').onclick = () => {
        const u = new URL(location.href);
        u.searchParams.set('lang', language === 'zh' ? 'en' : 'zh');
        location.href = u.href;
      };
    },
    toast(message) {
      const el = document.getElementById('toast');
      el.textContent = message;
      el.style.display = 'block';
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => el.style.display = 'none', 4000);
    },
    download(name, data, type = 'application/json') {
      const url = URL.createObjectURL(new Blob([typeof data === 'string' ? data : JSON.stringify(data, null, 2)], {
        type
      }));
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 20000);
    },
    money(cents) {
      return (cents / 100).toLocaleString(language === 'zh' ? 'zh-CN' : 'en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
  };
})(window);

/* Copy reviewed public project implementations into the portable homepage. */
const fs = require('node:fs');
const path = require('node:path');
const base = path.resolve(__dirname, '..');
const source = path.resolve(process.argv[2] || path.join(__dirname, '../../github-projects'));
const projects = [
  ['loan-data-analysis', 'loan-lab', 'reporting.js'],
  ['message-review-workflow', 'message-lab', 'workflow.js'],
  ['gallery-route-planner', 'gallery-lab', 'planner.js']
];
for (const [name, , module] of projects) {
  for (const file of ['src/core.js', 'src/' + module, 'web/app.js', 'web/styles.css']) {
    if (!fs.existsSync(path.join(source, name, file))) throw Error('Missing source: ' + path.join(source, name, file));
  }
}
for (const [name, id, module] of projects) {
  const src = path.join(source, name), dest = path.join(base, 'demos', id);
  const mappings = [['src/core.js', 'core.js'], ['src/' + module, module], ['web/app.js', 'app.js']];
  if (id === 'message-lab') mappings.push(['web/workbench.js', 'workbench.js']);
  for (const [from, to] of mappings) fs.copyFileSync(path.join(src, from), path.join(dest, to));
  fs.mkdirSync(path.join(dest, 'examples'), { recursive: true });
  for (const file of fs.readdirSync(path.join(src, 'examples'))) fs.copyFileSync(path.join(src, 'examples', file), path.join(dest, 'examples', file));
  let html = fs.readFileSync(path.join(dest, 'index.html'), 'utf8').replace(/\?v=[^"']+/g, '');
  if (!html.includes('src="' + module + '"')) html = html.replace('<script src="app.js"', '<script src="' + module + '" defer></script><script src="app.js"');
  if (id === 'message-lab' && !html.includes('src="workbench.js"')) html = html.replace('</head>', '<script src="workbench.js" defer></script></head>');
  html = html.replace(/(src|href)="([^"?]+\.(?:js|css))"/g, '$1="$2?v=1.1.0"');
  fs.writeFileSync(path.join(dest, 'index.html'), html);
}
fs.copyFileSync(path.join(source, 'loan-data-analysis/web/styles.css'), path.join(base, 'demos/shared.css'));
console.log('Synced three public projects, modules, examples and styles. Refresh the source viewer next.');

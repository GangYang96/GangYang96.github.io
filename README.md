# Gang Yang · Academic Homepage

English-first, bilingual academic profile for PhD applications. Static HTML, CSS and JavaScript; no build step, backend, external font or JavaScript dependency.

Live: https://gangyang96.github.io/

## Page and content mapping

| Section | Content |
| --- | --- |
| About | Research background, current agent practice, portrait, public contact links |
| Publications | Three second-author journal articles, two methods from the master's thesis, one software copyright |
| Projects | Yanheng Quant with source, contributions and validation; DB-GPT, HiAgent and XR with video demos; funded research through the filter |
| Education & work | NUIST degrees and financial-technology employment |
| Honors & skills | Confirmed recognitions and evidence-based technical skills |
| Contact | Email and GitHub |

The reference site informed the two-column introduction, filtered publications and illustrated project cards. All biographical content and visual assets belong to this profile, with original paper figures attributed in their captions.

## Maintain the site

### Project presentation · 2026-10-29

Projects use the content structure of the reference homepage, https://winsleo.github.io/: project title, role, short description, personal work, resource links and video preview in one card. There is one project section with a two-column desktop layout. The default filter shows four engineering projects; funded research and all projects remain selectable. Clicking a preview opens a keyboard-accessible video dialog; Escape closes it and restores focus. `showcase.js` maintains concise bilingual project copy. Original roles and research authorship are preserved. No reference-site source, identity, project assets or accomplishments were copied.

The separate promotional showcase, slogans, section numbers, browser-window decoration and repeated project descriptions have been removed. The homepage uses a restrained light palette and plain links. The old `#showcase` URL resolves to `#projects`, and former demo anchors resolve to the corresponding project.

| Demo | Try it | Public implementation |
| --- | --- | --- |
| Loan analysis | `demos/loan-lab/index.html` | Fixed query grammar, CSV validation, integer-cent calculations and exact source-row evidence |
| Message review | `demos/message-lab/index.html` | Two message schemas, evidence citations, correction validation, review and export |
| Gallery guide | `demos/gallery-lab/index.html` | Original polygon exhibits, software 3D projection, A* segments and seeded genetic visit-order search |

These are independent implementations based on supplied engineering descriptions, using synthetic data and fictional scenes. They do not expose original employer code, connect to production DB-GPT/HiAgent services, reproduce model performance, or integrate actual XR hardware. See `demos/README.html` (Chinese/English) and `demos/README.md` for supported inputs and boundaries.

`assets/demos/` contains silent WebM recordings of real interactions, WebP posters and Chinese/English VTT captions. Recordings are about 19–24 seconds each, captured with Playwright browser screenshots into a canvas recording; the title and explanatory captions are presentation overlays. `tools/finalize-webm.cjs` writes finite duration metadata, cluster sizes and a keyframe seek index. No footage or code was copied from the reference homepage.

Run `node demos/tests.cjs` for deterministic core checks. After editing code, run `node tools/build-demo-source.cjs` and rebuild `assets/downloads/engineering-demos-source.zip`; `demos/sources.js` is generated from the actual files. The public source archive is deliberately allowed by `.gitignore`; all other ZIPs remain excluded.

独立源码仓库：

- https://github.com/GangYang96/loan-data-analysis
- https://github.com/GangYang96/message-review-workflow
- https://github.com/GangYang96/gallery-route-planner

主页项目卡片的 GitHub 链接指向对应仓库；本地源码浏览器作为离线阅读功能保留。独立仓库包含 CLI、样例、测试、许可及 GitHub Actions。

中文使用顺序：主页“项目经历” → 点击视频预览放大播放 → “Demo”亲自操作 → “GitHub”阅读独立仓库源码；需要修改时下载源码。使用合成样例即可体验，无需账号或 API Key。每个 Demo 的结果需手动导出，刷新或切换语言会重新开始。

- `content.js`: all research, project and biographical content, with `en` / `zh` values. Keep original paper titles and author order unchanged.
- `i18n.js`: all interface labels, navigation, controls and contact copy.
- `styles.css`: desktop/mobile layout and visual styling.
- `app.js`: rendering, filters, navigation state, details, bilingual switching and accessible image dialog.
- `index.html`: metadata and static page shell.
- `assets/gang-yang.svg`: supplied portrait, resized with embedded metadata removed, stored as a lossless SVG container around the JPEG bytes.
- `assets/diagrams/`: five original SVG workflow illustrations, each in English and Chinese. These are explanatory diagrams, not measured outputs or internal screenshots.
- `tools/build-diagrams.cjs`: generates all ten project SVGs from shared geometry and bilingual labels. Run `node tools/build-diagrams.cjs` from this directory after editing the source.
- Root `*-framework.png` and `assets/thesis-prompt-framework.svg`: original paper/thesis figures. The Chapter 3 figure is an SVG container around unchanged PNG bytes. Retain attribution when editing captions.

Missing dates and links are omitted. Only categories with actual content are shown. `null` years/periods intentionally indicate that an independent date was not supplied.

### Content sources

Profile, contributions, projects and honors were checked against the updated CV on 20 October 2026. Paper titles and author order were checked against the supplied articles. The Chinese journal issue (2024, no. 6) is given in the updated CV; no unverified pages or DOI were added. KEAP corresponds to Chapter 3 of the thesis; Chapter 4 is the separate multimodal feature-association method. Agent work is identified as current practice and prospective research interest.

Authorship-role notes were confirmed by the author: ESWA and the Chinese BERT article have the advisor as first author and the student as second author; KEAP has the industry advisor as first author and the student as second author. These notes do not indicate equal contribution and do not alter the published author order.

### Project illustration design references

The reference homepage's two-column illustrated cards informed the layout: https://winsleo.github.io/#projects . The following public project introductions were reviewed for analogous workflows and ways of explaining technical stages:

| Reference | Aspect reviewed |
| --- | --- |
| [DB-GPT](https://github.com/eosphoros-ai/DB-GPT) | Natural-language data questions, code/tool execution, and analysis output |
| [Dify](https://github.com/langgenius/dify) | Visual workflow organization and structured processing stages |
| [Three.js Virtual Museum Tour](https://github.com/theringsofsaturn/virtual-museum-tour-threejs) | Exhibit viewing and navigation within a spatial scene |
| [XMem](https://github.com/hkchengrex/XMem) | Explaining video-frame inputs and object-mask outputs |
| [FANG](https://github.com/nguyenvanhoang7398/FANG) | Distinguishing news content, network context, and detection tasks |

All five project illustrations are original SVG artwork based on the CV's actual scope. No reference images or model architectures were copied. Reviewing these projects does not claim that they were used in the author's work. In particular, the fund-project illustrations show participation in feature/workflow analysis; they do not attribute XMem or FANG methods to this author. The XR scene is an imagined gallery, and the video frames and masks are synthetic illustrations. Enterprise diagrams show abstract tables and messages without private data, real thresholds or internal interfaces.

Source PDFs, private CVs, phone numbers, birth dates, internal messages and business rules are not included. At the author's request, the employer is described only as "Bank / 银行" in both employment and honors; branch and location identifiers are omitted. Do not reintroduce employer identifiers from private source materials. The software registration number is 2022SR0273010; an unspecified registration date is not inferred from the number. Do not add a CV download until a public version has been prepared.

## Local preview / 本地预览

From this folder, run:

```powershell
python tools/serve-preview.py
```

Open http://127.0.0.1:8767/ . Select EN / 中文; the selection is remembered in this browser. No package installation is required. The website is static; the server is only for local preview and supports byte-range requests for video seeking. Individual demos also work when their HTML files are opened directly.

## GitHub Pages deployment / 部署

1. Repository: `GangYang96/GangYang96.github.io`.
2. In **Settings → Pages**, use **Deploy from a branch**, branch **main**, folder **/(root)**.
3. Fetch and merge current remote changes before editing; inspect the diff and stage only website files.
4. Commit and push to `main`. The `.nojekyll` file keeps the site as plain static assets.
5. Wait for **pages build and deployment** to complete, then open https://gangyang96.github.io/ . Refresh if an older version is cached.

Typical update commands:

```powershell
git pull --ff-only origin main
git add index.html styles.css app.js content.js i18n.js assets .gitignore .nojekyll README.md
git commit -m "Update academic profile"
git push origin main
```

If both local and remote histories have changed, review and merge them instead of force-pushing. Existing figure images should be staged explicitly when a new one is added.

## Review checklist

- English and Chinese navigation, content, buttons and SVGs; original paper titles preserved.
- Publication and project filters; details expansion; image dialog including Escape and focus restoration.
- Mobile menu, active section, deep links (`#home`, `#publications`, `#thesis`, `#projects`) and legacy research anchors.
- Desktop, tablet and phone widths; no clipped long titles or horizontal overflow.
- Only verified DOI links; no empty download/code buttons or public full-text PDFs.
- Enterprise diagrams contain generic processes only; fund-project role remains participant.

## Figure attribution

- APT: Chen et al., *Expert Systems with Applications*, 2024, Fig. 2, p. 3. DOI: https://doi.org/10.1016/j.eswa.2023.122327
- KEAP: Che et al., *Neural Computing and Applications*, 2024, Fig. 3, p. 7729. DOI: https://doi.org/10.1007/s00521-024-09491-7
- Thesis: Gang Yang, 2023, Fig. 3-1 (printed p. 21) and Fig. 4-1 (printed p. 41). Original Chinese labels retained.

## Engineering demos v1.1.0 (2026-10-30)

Loan aging and reconciliation, persistent review queues, and custom gallery maps with solver comparisons are now mirrored from the three independent repositories. Use `node tools/sync-project-demos.cjs` to sync reviewed public sources, followed by `node tools/build-demo-source.cjs`. Existing videos document the base workflows.

## Yanheng Quant addition · 2026-11-01

The bilingual Yanheng Quant card links to its GitHub source, contribution map and validation report. It describes secondary development on MIT-licensed Tick Stock Panel, public-data collection and strategy-execution verification. The market/backtesting engines are attributed to upstream. Industry-factor research, scoring, threshold discovery and community features are marked as future work. The source repository supports local execution; there is no hosted quantitative backend on this static homepage.

`tools/build-yanheng-diagram.cjs` produces the two original workflow diagrams. The new card uses ordinary project links and a diagram; the three existing synthetic demos and videos retain their original scope.

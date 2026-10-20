# Gang Yang · Academic Homepage

English-first, bilingual academic profile for PhD applications. Static HTML, CSS and JavaScript; no build step, backend, external font or JavaScript dependency.

Live: https://gangyang96.github.io/

## Page and content mapping

| Section | Content |
| --- | --- |
| About | Research background, current agent practice, portrait, public contact links |
| Publications | Three second-author journal articles, two methods from the master's thesis, one software copyright |
| Projects | DB-GPT and HiAgent applications, XR engineering, participation in NSFC 61802197 and 61703212 |
| Education & work | NUIST degrees and financial-technology employment |
| Honors & skills | Confirmed recognitions and evidence-based technical skills |
| Contact | Email and GitHub |

The reference site informed the two-column introduction, filtered publications and illustrated project cards. All biographical content and visual assets belong to this profile, with original paper figures attributed in their captions.

## Maintain the site

- `content.js`: all research, project and biographical content, with `en` / `zh` values. Keep original paper titles and author order unchanged.
- `i18n.js`: all interface labels, navigation, controls and contact copy.
- `styles.css`: desktop/mobile layout and visual styling.
- `app.js`: rendering, filters, navigation state, details, bilingual switching and accessible image dialog.
- `index.html`: metadata and static page shell.
- `assets/gang-yang.svg`: supplied portrait, resized with embedded metadata removed, stored as a lossless SVG container around the JPEG bytes.
- `assets/diagrams/`: five original SVG workflow illustrations, each in English and Chinese. These are explanatory diagrams, not measured outputs or internal screenshots.
- Root `*-framework.png` and `assets/thesis-prompt-framework.svg`: original paper/thesis figures. The Chapter 3 figure is an SVG container around unchanged PNG bytes. Retain attribution when editing captions.

Missing dates and links are omitted. Only categories with actual content are shown. `null` years/periods intentionally indicate that an independent date was not supplied.

### Content sources

Profile, contributions, projects and honors were checked against the updated CV on 20 October 2026. Paper titles and author order were checked against the supplied articles. The Chinese journal issue (2024, no. 6) is given in the updated CV; no unverified pages or DOI were added. KEAP corresponds to Chapter 3 of the thesis; Chapter 4 is the separate multimodal feature-association method. Agent work is identified as current practice and prospective research interest.

Source PDFs, private CVs, phone numbers, birth dates, internal messages and business rules are not included. At the author's request, the employer is described only as "Bank / 银行" in both employment and honors; branch and location identifiers are omitted. Do not reintroduce employer identifiers from private source materials. The software registration number is 2022SR0273010; an unspecified registration date is not inferred from the number. Do not add a CV download until a public version has been prepared.

## Local preview / 本地预览

From this folder, run:

```powershell
python -m http.server 8766 --bind 127.0.0.1
```

Open http://127.0.0.1:8766/ . Select EN / 中文; the selection is remembered in this browser. No package installation is required. The website is static; the server is only for local preview.

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

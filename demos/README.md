# Gang Yang · Engineering demo studio

Three independent browser implementations based on the supplied CV and engineering project descriptions. These demonstrate public workflows; they do not reproduce employer source code, deployed systems, or research-paper experiments. Samples and the gallery are synthetic.

## Open and run

Open `loan-lab/index.html`, `message-lab/index.html` or `gallery-lab/index.html` directly in a recent Edge, Chrome, Firefox or Safari browser. No installation, API key, account or backend is needed. For the full homepage and video subtitle tracks, serve the homepage folder with `python tools/serve-preview.py` and visit `http://127.0.0.1:8767/`.

Use `?lang=zh` for Chinese and `?lang=en` for English. The interface language button reloads the demo. Export any results you want to retain first; sessions are temporary and do not synchronize.

## 01 · Loan analysis

`loan-lab/core.js` parses CSV, validates schema and dates, converts money into integer cents, calculates overdue days and groups matching balances. `app.js` supplies the interactive UI and independent total recheck.

- Supported question: `As of 2026-10-28 overdue 30 days or more` or `截至2026-10-28，逾期30天及以上`. This is a fixed grammar, not an LLM.
- CSV header: `id,unit,due_date,balance`; dates: YYYY-MM-DD; amounts: nonnegative CNY, at most 9 whole-number digits and 2 decimals. Up to 10,000 records, 1 MB file size.
- Positive balances with overdue days greater than or equal to the threshold are selected. Due-date day has zero overdue days. Dates use UTC calendar arithmetic. No interest, fees or real risk scores.
- Duplicate accepted IDs and malformed records are quarantined. A valid first occurrence is retained. No real customer data is bundled; compatible CSV files are processed locally without upload.
- Known synthetic result: as of 2026-10-28, threshold 30 days, all units: 6 records, CNY 735,000.75.
- The original project description concerns DB-GPT deployment, model API integration and Python/pandas tools. This public reconstruction uses JavaScript with no DB-GPT service, Python execution or model connection.

## 02 · Message review

`message-lab/core.js` parses line-based key-value messages, retains evidence line numbers, validates schemas and gates human approval. `app.js` manages revisions, review state and JSON export.

- Supported message types: `COMPLIANCE_QUERY` and `RETURN_NOTICE`. Common required fields: REFERENCE, DIRECTION, INSTITUTION. Query requires DEADLINE; return notice requires REASON.
- Direction is INBOUND or OUTBOUND. Deadline must be an actual calendar date. Missing fields, conflicting values and invalid formats require attention.
- A corrected or originally ambiguous field requires a review note. Approval needs a reviewer and no unresolved validation errors. Return needs a reviewer and reason.
- Original extraction and human corrections remain separate in exports. Approved/returned fields and reviewer notes are locked until reset or reparse. History is local to the current page session, not a secure immutable audit system.
- This key-value parser is not a general SWIFT parser or live HiAgent workflow. It makes no claim about classification accuracy on real messages.

## 03 · Gallery guide

`gallery-lab/core.js` builds a fictional 15 × 11 floor plan. A* calculates walkable segments. A seeded genetic search explores permutations of selected stops: population 24, 45 generations, 4 elites, order-preserving crossover and 0.4 swap-mutation probability. The itinerary starts at S and ends at the last exhibit, without returning to the entrance.

`app.js` projects original polygon meshes to a 2D canvas, supports drag/keyboard rotation, renders the map and animates the route. This is software-projected 3D, not a Unity/Unreal application or headset integration. Distances are grid steps, not measured meters. Genetic search is a demonstration and does not certify global optimality. The four-stop toy scene could also be solved by exhaustive search.

The original XR project role remains participation in model viewing and indoor navigation. This independent prototype does not imply sole authorship of the original project.

## Files and checks

- `shared.js`, `shared.css`: bilingual shell, navigation, downloads, common styles.
- Each demo: `index.html`, `app.js`, `core.js`.
- `source.html`, `sources.js`: offline source viewer (generated from the actual files).
- `tests.cjs`: run `node demos/tests.cjs` from the homepage folder, or `node tests.cjs` from this folder.
- `README.html`: bilingual scope and operation guide.

No third-party JavaScript or copied reference-site assets are included. The reference homepage informed the video/demo/code presentation pattern only. Videos are silent recordings of real interactions with these demo implementations, with bilingual explanatory captions. They are not footage of employer systems or measured research results.

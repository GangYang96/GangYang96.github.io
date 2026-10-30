# Engineering demos · v1.1.0

Updated 2026-10-30. Independently implemented public prototypes with synthetic data. No employer source code or live model/XR integration.

Open each index.html directly, or serve the homepage directory with `python tools/serve-preview.py`. Use ?lang=zh or ?lang=en. Message queues can be explicitly saved to browser storage; other state is temporary. Export anything you need to retain.

## Loan analysis

`loan-lab/core.js` parses and validates CSV and calculates exact integer-cent totals. `reporting.js` adds aging buckets, two-snapshot reconciliation, pagination and formula-neutralized CSV export. The previous and current datasets must both pass validation for reconciliation. Search affects the table only; exported hits are complete.

Default example: 6 hits, CNY735,000.75. CSV header: id,unit,due_date,balance; limit 1 MB and 10,000 rows. Fixed query grammar, not arbitrary natural language.

## Message review

`message-lab/core.js` parses the two supported key-value message types. `workflow.js` manages versioned revisions, approval, return and reopen transitions. `workbench.js` manages up to 100 records, local saving, restore, import/export and concurrent-tab conflict detection.

Completed records lock; reopening needs a reason. Original evidence and previous decisions stay in history. Import replays transitions and validates revisions and event contents. Browser storage has no authenticated or tamper-proof audit guarantee. Only synthetic data should be used. Single-message source limit 30,000 characters; import limit 5 MB.

## Gallery planner

`gallery-lab/core.js` provides A* and the original four-stop optimizer. `planner.js` validates custom maps and compares nearest-neighbor, seeded genetic search and Held–Karp exact ordering. Up to 10 exhibits and 40 × 40 cells. Return to entrance, temporary closures, segment tables and time estimates are supported.

Default open route is 28 steps, or 36 with the western shortcut closed. Exact optimality applies to this static grid and requested stop set. Grid steps are not meters; times are estimates. Custom maps do not add external 3D assets.

## Full source, tests and CLI

- https://github.com/GangYang96/loan-data-analysis
- https://github.com/GangYang96/message-review-workflow
- https://github.com/GangYang96/gallery-route-planner

The independent repositories contain 57 tests, CLI examples, architecture notes and version history. The portable homepage includes browser implementations and the original smoke suite, run with `node demos/tests.cjs`.

Refresh mirrored implementations with `node tools/sync-project-demos.cjs PATH_TO_GITHUB_PROJECTS`, then run `node tools/build-demo-source.cjs` to update the offline source viewer. Recorded videos show the base workflows; Demo links open the latest version.

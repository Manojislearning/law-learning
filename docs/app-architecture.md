# Stage A3 — Shared App Architecture

## Current status (release 30)

**Implemented and tested:** one in-page router, one shared learning-progress store, reusable safe text/DOM primitives, migration of active feature modules to router notifications, and removal of three unused duplicate UI scripts.

**Not yet finished:** `app.js` remains a large legacy module. The old hidden vocabulary rendering remains loaded for compatibility. We must move legacy vocabulary and quiz rendering into independently tested feature modules before declaring the full monolith dismantled. **Do not delete HTML or old handler code until a real mobile-browser smoke test verifies the replacement.**

## Script ownership and startup

```
exam-words-1..4.js      Loaded word rows
app-core.js             Core router, saved progress, UI node helpers (FIRST)
app.js                  Legacy datasets + current state + shared router start
word-experience.js      Ten-card word game, Learn, Compare, progress buttons
syllabus-flow.js        One-screen-at-a-time syllabus browsing
subjects-library.js     Subject explorer
comparison-guide.js     Comparison deep dives
past-paper-data.js      Answer source content
past-paper-view.js      Answer presentation
backup-core.js          Validated, versioned local backups
profile-local.js        Local settings, backup import/export
```

The standalone `brain-map.html` and `brain-map.js` remain a separate page and do not participate in the hash router.

## One router

`window.LawAppCore.router` handles:
- `start()`: exactly one `hashchange` listener and delegated home/back clicks
- `navigate("words")` etc.: changes routes using existing `#route` deep links
- `subscribe((route,previous) => ...)`: receives changes and returns an unsubscribe function
- `current()` and `normalize()`: safe route access, invalid hashes map to home

No active in-page feature module may install another `hashchange` listener. Internal screens (e.g. a unit detail page) may manage their own local path state, but site navigation remains the core's responsibility. Keep independent browser history and deep links operational.

## One saved learning-progress schema

`LawAppCore.progress` exposes:
- `load()`, `save(state)`, `snapshot(state)`
- `mark(state,index,isRevision,scoringOptions)`

The storage key remains **`law-learning-progress-v2`**. Its fields remain `currentWord`, `score`, `learned`, `difficult`, and `streak`. In-memory `learned` and `difficult` are Sets and are serialized as arrays. Scoring options preserve existing differences between the legacy and new game while eliminating separate state mutation implementations. Future releases should unify scoring rules as a *separate product change*, not slip them into a refactor.

**No automatic deletion or replacement of saved user data** during code architecture changes. Progress export/import is implemented by `backup-core.js` with v1→v2 backup migration support and rollback tests.

## Shared rendering foundation

`LawAppCore.ui.node(document, tag, text, className)` and `LawAppCore.ui.button(document, label, callback, className)` create elements safely using `textContent` (not arbitrary HTML). Both Syllabus and Subjects now build their text elements from this helper. Further feature extraction should progressively adopt these primitives and reusable view components.

## Regression and release expectations

- Node syntax and content checks on every push (`tests/site-smoke.test.mjs`).
- Router, local progress and UI helper unit tests (`tests/app-core.test.mjs`).
- Backup and rollback tests (`tests/backup-core.test.mjs`).
- Check that `app-core.js` loads before `app.js` and no second route listener reappears.
- Test with a narrow mobile viewport, including home/back, direct `#words`/`#syllabus`/`#papers` routes, word deep links, gesture/scroll conflicts, score preservation, browser refresh, offline use and backup restoration.
- A successful GitHub Pages deploy is **not** sufficient for browser-level correctness.

## Next technical work

1. Extract legacy hidden vocab UI and question bank from `app.js` only after tests cover it.
2. Introduce a single rendering contract for full-screen lessons and topic pages.
3. Build a stable source ledger for official KSLU content (Stage A4).
4. Then implement a unified Today lesson with spaced retrieval (Stages B5/D14), not simply another dashboard.

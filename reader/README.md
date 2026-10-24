# Law Notes (shared modules)

Law Notes now open inside the main app: **Student → Law Notes** (`#lawnotes`).
Old reader links such as `reader/?file=…` and `reader/?map=1` redirect there.

This folder keeps the shared pieces the app uses:

- `markdown.mjs` — safe, read-only Markdown (Obsidian subset). All source HTML is escaped.
- `map.mjs`, `map.css` — the topic branch map (◇ Map on a topic note).

The notes themselves are copied from the public LAW-NOTES repository into `data/law-notes.json`
by `.github/workflows/law-notes.yml` (every 3 hours, or run it by hand). Edit notes in LAW-NOTES, not here.

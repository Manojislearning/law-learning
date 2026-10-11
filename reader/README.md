# KSLU Vault Reader — private GitHub → Obsidian-style mobile reading

Hosted as a standalone Progressive Web App at the public Law Learning site's `/reader/` path.

## What it does

- Reads from `Manojislearning/LAW-NOTES`, a **private** repo, via GitHub's REST API.
- Shows the GitHub vault's Markdown files and Obsidian Canvas files by folder.
- Renders Obsidian `[[wikilinks]]`, callouts, tables, checklists, headings, code and ordinary Markdown safely.
- Provides font resizing, warm/bright paper, reading progress, bookmarks, text-to-speech, previous/next note, search by title/path, and installable PWA shell.
- Fetches one private note at a time and never publishes, mirrors, exports, or permanently caches private note bodies.
- Only the app shell is cached by the service worker; private GitHub API responses are never cached.

## Connect to the private LAW-NOTES vault

1. Open the reader's URL in Android Chrome.
2. Create a **fine-grained personal access token** at https://github.com/settings/personal-access-tokens/new and set:
   - Resource owner: `Manojislearning`
   - Repository access: **Only selected repositories** → `LAW-NOTES`
   - Repository permissions → **Contents: Read-only** (metadata is implicitly readable)
   - Expiration: choose a limited lifetime, such as 30 days.
3. Paste the token in the reader. **Never send this token to anyone or paste it into ChatGPT.**
4. In Android Chrome, use **Add to Home screen** to install the reader PWA.

Security tradeoff: The token lives **only in volatile JavaScript memory** while the reader is open. Reloading/closing the reader requires a fresh token paste. We deliberately do not save credentials in localStorage, sessionStorage, source files or caches. Browser-stored bookmarks/preferences contain file paths, never note contents.

## Hosting / deployment

This folder is plain static HTML/CSS/ES modules; there is no build step or CDN requirement. Serve the repository with GitHub Pages from the `main` branch root (`/(root)`), or copy `reader/` to an existing HTTPS static host. GitHub Pages configuration is set via repository Settings → Pages.

The repo is public **only for app code**. Do not commit `LAW-NOTES` content, tokens, generated `data/` copies or notes into this folder.

## Limitations

- Search currently searches filenames/folder paths, not full text across unloaded notes.
- Obsidian Canvas appears as a readable list of linked notes, not a draggable visual canvas.
- Embedded pictures/files are shown as attachment references instead of privately authenticated images.
- The app is read-only and does not push note edits back to GitHub.
- Offline mode caches the public app shell only. Reading new private notes requires a connection.
- For production consumer authentication without manually created tokens, build a separate audited GitHub App OAuth backend.

Run smoke tests with `node --test tests/reader.test.mjs` from the bundled source root.

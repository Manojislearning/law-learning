# Law Notes — Mobile Reader

The public reader lives at https://manojislearning.github.io/law-learning/reader/.

## Reading

- Opens `Manojislearning/LAW-NOTES` automatically in read-only mode. The repository is public. No GitHub access token is requested.
- Browse Notes → Semester → Subject → Unit → Topic, or search by note title.
- Default presentation: clean, continuous Markdown rendering.
- **Markdown** in the note toolbar shows the original source. **Preview** switches back.
- **Map** appears for individual topic notes, with rounded SVG branches, source links and touch pinch zoom.
- Home / Previous / Next / Map appear along the bottom on phones. Unit/back navigation appears in the note header.
- The landing loader uses CSS orbit animations; new notes display animated skeleton lines while they load.
- Use Android Chrome → Add to Home screen to install.

## Privacy and availability

- No credentials, note contents or private repository data are stored by the app.
- Bookmarks, text size, theme and last-opened filename are stored locally on the device.
- Only the public app shell is cached for offline use. Content requires internet and public GitHub availability.
- Read-only: edits belong in the LAW-NOTES Markdown vault.

## Development

The app uses plain HTML/CSS/JavaScript, no build step. CI checks mobile navigation, Markdown view, rounded SVG, pinch zoom, source links and overflow.

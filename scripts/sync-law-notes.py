#!/usr/bin/env python3
"""Copy the public LAW-NOTES Markdown vault into the app as one JSON file.

Usage: python3 scripts/sync-law-notes.py <path-to-law-notes-checkout> [commit]
Writes data/law-notes.json. Only Markdown notes are copied; Obsidian settings,
templates, Canvas files and attachments are skipped. Content is stored as text
and rendered safely (escaped) by the app, never inserted as raw HTML.
"""
import json, os, sys, datetime, re

SKIP_DIRS = {".git", ".obsidian", ".github", "99-Templates", ".trash"}
MAX_NOTE = 200_000  # characters; protects the app from a runaway file

def main():
    if len(sys.argv) < 2:
        sys.exit("usage: sync-law-notes.py <law-notes-dir> [commit]")
    src = os.path.abspath(sys.argv[1])
    commit = sys.argv[2] if len(sys.argv) > 2 else ""
    notes = []
    for base, dirs, files in os.walk(src):
        dirs[:] = sorted(d for d in dirs if d not in SKIP_DIRS and not d.startswith("."))
        for name in sorted(files):
            if not name.lower().endswith(".md") or name.startswith("."):
                continue
            rel = os.path.relpath(os.path.join(base, name), src).replace(os.sep, "/")
            if re.match(r"(?i)^(untitled|welcome)\b", name):
                continue
            with open(os.path.join(base, name), encoding="utf-8", errors="replace") as f:
                text = f.read().replace("\r\n", "\n")
            if len(text) > MAX_NOTE:
                text = text[:MAX_NOTE] + "\n\n(Note shortened for the app.)\n"
            notes.append({"p": rel, "c": text})
    if len(notes) < 20:
        sys.exit("Refusing to write: only %d notes found in %s" % (len(notes), src))
    notes.sort(key=lambda n: n["p"])
    out = {
        "source": "https://github.com/Manojislearning/LAW-NOTES",
        "commit": commit,
        "syncedAt": datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "count": len(notes),
        "notes": notes,
    }
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    path = os.path.join(root, "data", "law-notes.json")
    # Keep the file stable when nothing changed, so the workflow does not commit timestamps only.
    try:
        with open(path, encoding="utf-8") as f:
            old = json.load(f)
        if old.get("notes") == notes:
            print("Notes unchanged (%d)." % len(notes))
            return
    except (OSError, ValueError):
        pass
    with open(path, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, separators=(",", ":"))
        f.write("\n")
    print("Wrote %d notes to data/law-notes.json" % len(notes))

if __name__ == "__main__":
    main()

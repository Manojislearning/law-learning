## Version 68 — Tap-to-play topics and more marriage cases

Game topics now appear as large full-width bars. Tapping a bar starts that topic straight away, and topics no longer show case counts. Marriage Law Cases grows to 53 scenarios, with new topics covering Christian, Parsi, Sikh and Buddhist law, Goa's civil code, Uttarakhand live-in registration, NRI and foreign marriages (Foreign Marriage Act; Y. Narasimha Rao), Muslim couples married under the Special Marriage Act, mehr, iddat provision and khap panchayats. Each explanation links every Act or judgment to an Indian Kanoon search so it can be read in full. The quick guide also lists which law each community uses.

## Version 67 — Marriage Law Cases

A fourth game in **Games** covers 35 scenarios on interfaith and inter-caste marriage, conversion, age and divorce, grouped into seven topics: which law applies, validity, conversion, age, divorce, children and money, and State laws. Examples: a Hindu and a Muslim marrying without converting (Special Marriage Act), conversion to take a second wife (Sarla Mudgal; BNS s.82), a spouse's conversion as a divorce ground (HMA s.13(1)(ii)), child marriage being void in Karnataka (2016 amendment), maintenance for divorced Muslim women (Mohd. Abdul Samad, 2024), and Uttarakhand's Uniform Civil Code. Each answer shows why, with the statute or case. Rounds have 8 cases; missed cases return first, and each correct answer earns 3 points once. Progress is stored under `law-learning-marriage-v1`.

The law is stated as of October 2026. Gujarat, Assam and Madhya Pradesh UCC bills were awaiting Presidential assent at that time.

## Version 66 — Games and Confusing Words

**Learn Words** is now **Games** on Home. Inside it, **Legal Words** and **Difficult Words** work as before (same saved progress), and a new third game, **Confusing Words**, covers 46 pairs people mix up: 31 law pairs (void/voidable, coercion/undue influence, theft/extortion, robbery/dacoity, certiorari/prohibition, Article 32/226, void/voidable marriage and more) and 15 legal-writing pairs (principal/principle, precedent/precedence, waive/wave and more).

A round asks 10 fill-in-the-blank questions. After each answer the game shows both meanings, a memory tip and the statute or case. Missed questions come back first in later rounds until answered correctly, and each correct answer earns 3 points once. Progress is stored under `law-learning-confusing-v1` and included in backups.

## Version 65 — Points, ranks and a shared leaderboard

Study now earns points in one place: +10 for a new word, +15 for writing an answer and then revealing a Case Practice outline, +10 for a changed-facts case, +5 a day for each honest Review attempt (whatever the result), and +2 for marking an Exam Pattern topic ready. Each award is given once, and the record of awards is kept under `law-learning-points-v1` and included in backups.

Points unlock nine ranks, from **Law Fresher** to **Chief Justice**. The Profile screen shows your rank, a progress bar to the next one and the full ladder. Tapping the PTS pill opens Profile.

The **Leaderboard** uses Firebase (Google sign-in and Firestore) once `firebase-config.js` is filled in. Players choose a public name; emails are never shown. Points sync from the device, rise by at most 3,000 per save (matching the security rules), and are restored when signing in on a new phone. Players can remove themselves from the board. The Firebase SDK is loaded only when Profile is opened.

## Version 64 — Real KSLU exam pattern and repeat topics

**Exam Pattern** (Student → Exam Pattern, `#exam`) was a placeholder. It now shows the real Semester I format, read from **45 scanned 3-year LL.B. papers (April 2022 – January 2026)** across all five subjects:

- **Both paper formats.** 80-mark papers are unit-wise (five compulsory questions, each a 10-mark essay plus a 6-mark note/problem, both with OR). 100-mark papers ask any five of Q1–Q8 (16 marks each, Q8 being two short notes) plus a compulsory Q9 of two 10-mark problems. Each format has a 3-hour time plan. Both formats were set in January 2026 under different paper codes, so students should confirm which applies to them.
- **What KSLU asks, unit by unit.** Every question was tagged to a syllabus unit. Each topic shows how many papers asked it (for example, writs appeared in 9 of 11 Constitutional Law papers) and when it was last asked. Students can tick topics as ready; the tick list is stored on the device under `law-learning-exam-prep-v1` and is included in backups.
- **Problems that keep coming back.** 42 paraphrased fact patterns that recur in the papers (air hostess retirement, goods left by mistake, promise to marry after the father's death, widow's maintenance claim, and others), each with the rule to apply and a leading authority.
- **Links to each scanned paper** on the independent KSLU Corner archive.

Counts are historical frequency only and never a prediction.

## Version 63 — Clean Home and expanded Student menu

The Home menu now presents **Law Updates** (renamed from Current Law Check), Law News, Case Practice, Review, **Learn Words** (light card, not black) and Student. The redundant Home **Notes** shortcut and **Profile & backups** shortcut are removed, while study notes and backups remain available without deleting any stored work. **Continue Contract–I** now appears inside Student and still launches the existing Unit V lessons.

Student has ten direct resources: Syllabus, Topic Brain Branches, Subjects, Exam Papers & Answers, Law Notes, Exam Pattern, Important Links, Continue Contract–I, Profile and Settings. **Settings** is a distinct screen with daily study goal, explanation language, larger text and reduced animations; it uses the original device-local `law-learning-profile-v1` key and synchronises with the existing Profile form. Profile remains the place for local account information and export/import backups. No user study records are migrated or deleted.

The previous v62 changes remain: Learn Words opens a category chooser, the first game card shows the definition, the spelling card has direct letter blanks and no repeated explanation, and a static progress line replaces the draggable card slider. Automated tests check mobile reading and navigation, preserved word IDs, backups and Settings persistence.

## Version 61 — Simple titles, no menu subtitles

The Home and Student menus now show compact **title-only buttons**, with no descriptive subheadlines, numbering or category labels. Home **Words** is renamed **Learn Words**. Within Learn Words the two choices are **Legal Words** and **Difficult Words**. The second choice retains the same 115 advanced-English entries and the same storage IDs; only the user-facing title has changed. Each menu remains accessible by keyboard or touch with at least 44px targets.

The secondary route kicker has been visually removed. Course descriptions, statutory cautions, model answers, and source citations inside learning content remain intact; removing those would undermine study accuracy. Offline caching is bumped to v61 without resetting local notes or progress.

## Version 60 — Student hub navigation

Home now has **one Student card** instead of separate cards for Syllabus, Topic Brain Branches, Subjects and Exam Papers & Answers. Selecting **Student** opens an accessible, responsive four-entry hub:

- **Syllabus** — existing 30 KSLU Semester I outlines and source-review links
- **Topic Brain Branches** — existing `./reader/?map=1` visual topic mapping and vault-backed study notes
- **Subjects** — existing subject library, unchanged
- **Exam Papers & Answers** — existing 16-answer reader, archive links and writing exercises

The shared router has a real `#student` deep link. Internal study screens return to Student with **← Student**; Student itself returns to Home with **← Home**. Previously shared deep links (such as `#syllabus` and `#papers`) still work. No learning progress, notes, backup format, paper content or syllabus content was deleted or migrated. `student-menu.css` and router v60 are cached for offline operation. Automated DOM and mobile Chromium coverage checks the menu regrouping and back navigation.

## Version 59 — KSLU exam papers with complete worked answers

**Exam Papers & Answers** (the existing `#papers` route) now features a **16-answer bank** covering five Semester I core subjects: **four Contract–I** (two independently authored answers attached to 2022 archive-attributed questions plus two new model prompts), **three Constitutional Law–I**, **three Law of Torts**, **three Family Law–I: Hindu Law**, and **three Criminal Law–I: BNS, 2023**. The 14 newly authored questions are explicitly labelled **original syllabus-aligned model questions**; they are **not claimed to have appeared in past exams**.

Readers can browse separate, year-wise **scanned past-paper archives** for each subject through KSLU Corner (an independent, non-university site), filter subjects, search topics, decode the examiner's command, recall the relevant syllabus, view an *illustrative* ten-mark answer allocation, write an optional **unsaved** draft, reveal a detailed six-section answer, and copy a Markdown study version. Original 2022 question wording is marked *archive-attributed*, not certified against original university scans. All model answers identify statutes or official sources and warn that neither their wording nor indicative marks constitute a KSLU marking scheme.

**Verification limits:** the university's historical 2018–19 syllabus and 2024–25 criminal-law circular establish broad course scope only. Cohort-specific examinations can use different 80/100-mark structures. Current substantive law and case holdings remain subject to source review; the 1986 Consumer Protection Act must not be presented as current law, and BNS answers must use current BNS section numbers with attention to separate commencement of section 106(2). This update does not provide official graded sample scripts or guarantee that a model question will appear in the examination.

## Version 58 — Readable text and two vocabulary levels

**Reading comfort:** The News feed, article excerpts, study pages and interactive word game use larger mobile-friendly typography and minimum-size touch controls. Dedicated `readability.css` rules respect narrow screens. The older word game's CSS no longer hides the Home entries for News, Case Practice, Review and other features.

**Word game:** There are now two independently navigable practice levels:
- **Level 1 — Legal Words**: the existing 415 law concepts, legal terms and exam command words, with their original indices unchanged.
- **Level 2 — Advanced English**: 115 new precise English words frequently useful in reading legal material, composing notes, structuring arguments, and writing exam answers. Every entry has a meaning, plain-English aid and legal-writing usage sentence; the game gives examples instead of pretending these words have independently verified news reports.

The level choice and recent item in each level are saved locally under `law-learning-word-level-v1`. The older `law-learning-progress-v2` IDs, score, learned/revise flags and backup format remain unchanged. Existing level-one learners retain their records without migration. Both levels are unlocked, accessible through buttons and keyboard navigation, and use the same 10-card recall, comparison and explanation sequence. The optional level preference is device-local.

## Version 57 — Illustrated, readable legal news cards

The Law News screen (`#news`) now displays each publisher's linked preview photograph when available and a **brief, attributed publisher excerpt capped at about 24 words**. Images are linked directly from the publisher's HTTPS image URL; they are not copied into this repository or replaced with unrelated stock photography. Failed or missing images show a clearly neutral illustration. Missing publisher descriptions are identified rather than fabricated. Headlines, publication times, source links, local bookmarks, filters and the student reasoning prompt remain intact.

The free RSS workflow enriches a bounded selection of ET LegalWorld articles using their own Open Graph preview image/description metadata, while preserving feed-level fallback fields. Publisher previews are not official judgments and should not be relied upon for the complete legal holding; always open the source, then consult the primary statute or judgment.

## Version 48 — BNS legal reasoning practice

**Case Practice** now offers three first-year subjects: Contract–I, Law of Torts and Criminal Law–I (BNS), with **15 original hypotheticals each (45 total)**. The BNS set spans all five published KSLU units, adds legally grounded Issue–Rule–Application–Conclusion outlines and sources the BNS enacted law and MHA commencement notification. Written answers are local to the open page, not graded or saved. The historical 2024 section 106(2) commencement exclusion is discussed only for a dated 2024 scenario, not asserted as the current position for all future dates. Source audit: `docs/bns-case-practice-v48.md`.

# Law Learning

Mobile-first, installable Progressive Web App (PWA) for studying law, KSLU LL.B. syllabus content and exam-oriented legal vocabulary.

## Version 53 — Persistent weak-case review

Case Practice now remembers only **which case** you skipped or self-identified as incomplete, **which IRAC elements** you missed, and **when to revisit it**. Weak cases can be resumed tomorrow or sooner in all five law subjects. Private essays are **not stored**; the self-check is **not an automated grade**. The home screen shows the number waiting for review. Backup schema **4** includes this data and can still import v1–v3 backups.

## Version 42 — Independent exam practice

**Case Practice** (`#practice`) contains 15 original Contract–I hypotheticals across Units I–V. A session serves five mixed cases with no advance unit label. Learners write an original IRAC answer, reveal an educator-authored reference outline and check four specific reasoning elements. The module avoids fake AI grading or exam scores and does not store written drafts. Links open primary legislation; the problems are **not official KSLU question papers**.

Automated tests check mixed-unit selection, coverage without repeated cases across three sets, reference-answer gates, statute links and preservation of prior revision/backups. Android-device testing remains to be completed.

## Version 41 — What works now

- **Contract–I guided course:** all five imported first-semester units, **50 lessons** in total. Each has plain-language statutory explanations, practical examples, common errors, exam notes and explanatory quizzes.
- **Review due:** a single Home entry lists due, started and unstarted concepts. Produce a typed or spoken answer **before** seeing the reference rule. Mark Again (10 minutes) or Recalled (1/3/7/14/30/60-day intervals). Multiple-choice recognition schedules revision but **does not** count as successful free recall.
- **Written law practice:** optional rule recall throughout Contract–I and three IRAC case exercises in Unit V. No automated assessment of legal essay quality is claimed.
- **Local profile and backups:** saves progress and dated recall attempts locally; export/import backup schema **3** accepts earlier schema 1 and 2 backups and validates review data prior to import.
- **Source transparency:** 30 Semester I units have source-ledger references and review flags. The KSLU historical syllabus has **not** been confirmed against each student's applicable cohort. Specific Relief materials distinguish major post-2018 changes.
- **Testing:** automated syntax, lesson-source, scheduling/backup and simulated browser tests run on GitHub Actions. Production GitHub Pages deployment is separately checked. Actual Android accessibility testing remains outstanding.

**Privacy:** no cloud account, password login, or cross-device sync exists yet. Review ratings are browser-local; free-form essay drafts are not uploaded or persistently saved. Keep downloaded backups private.

## Current modules

1. **Words — 415 total**
   - 15 foundation legal words with full English/Kannada learning cards
   - 400 additional exam-oriented terms
   - 50 question-paper and answer-writing command terms
   - General legal vocabulary
   - Constitutional and administrative law
   - Contract, tort and consumer law
   - Criminal law, procedure and evidence
   - Family law, property and civil procedure
   - Jurisprudence and other LL.B. subjects
   - Search across all 415 terms
   - Definitions, exam-use guidance, quiz, pronunciation and local progress

2. **Semester I Syllabus**
   - KSLU 3-Year LL.B.
   - 6 papers and 30 units currently structured in the app

3. **Exam Pattern**
   - UI ready
   - Official examination scheme still to be imported

4. **Old Papers**
   - Filtering and question-card system ready
   - Starter questions currently included
   - Real previous-year question papers still to be imported

5. **Notes**
   - Device-local study notes

6. **Important Links**
   - KSLU, courts, India Code, Bar Council and other official student/legal resources

7. **Brain Map — Negligence (Law of Torts)**
   - Expandable connected branches for legal meaning, elements, proof, possible defences, cases, examples and exam-answer structure
   - Mobile-friendly right-angle connectors, without an inner branch scrollbar
   - Official Supreme Court judgment links and a shortcut from Subjects → Law of Torts

## Run locally

Open `index.html` with a local web server. Service workers require HTTP/HTTPS, so for full PWA behavior use GitHub Pages or another local server.

## Published site

`https://manojislearning.github.io/law-learning/`

## Install on Android

Open the published site in Chrome → browser menu → **Install app** or **Add to Home screen**.

## Current content priority

Verify the syllabus applicable to the learner’s admission cohort; add new unseen legal issue-spotting problems with examiner-style rubrics; evaluate scheduled recall effectiveness with consented learners; improve Android accessibility. Source documentation: `docs/continuous-improvement.md`.

## Vault Reader — private GitHub-powered Obsidian reading on phones

The standalone reader lives at [./reader/](./reader/) (GitHub Pages: `/law-learning/reader/`). It renders the private `Manojislearning/LAW-NOTES` repository through a user-provided fine-grained, read-only GitHub token held only in active page memory. The public repository contains **only app code**, not the private study notes. Features: Markdown and Obsidian links, Canvas note indexes, folder search, bookmarks, large reading typography, text-to-speech, and installable PWA shell. See [reader/README.md](reader/README.md) for security limitations and Android setup. Run `node --test tests/vault-reader.test.mjs` to verify reader tests.

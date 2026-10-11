# Law Learning

Mobile-first, installable Progressive Web App (PWA) for studying law, KSLU LL.B. syllabus content and exam-oriented legal vocabulary.

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

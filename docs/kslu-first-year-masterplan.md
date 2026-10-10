# Law Learning — KSLU 3-Year LL.B. First-Year Product Plan

Status: **Master plan approved for staged implementation; not a claim that every feature is built.**
Baseline: public static GitHub Pages PWA in `Manojislearning/law-learning` (version 25 at audit).
Primary audience: first-year students of Karnataka State Law University (KSLU), primarily on Android phones. Expand to later years only after the first-year content and outcomes are validated.

## Product promise

**Learn one concept deeply, retrieve it without help, apply it to a legal problem, and write it correctly in an examination.**

Success is not the number of cards shown or points earned. Success is a student's ability to **remember, distinguish, apply, cite, and write** accurate legal answers after a delay.

Design constraints:
- **One screen, one learning goal, one primary action.** Short text initially; optional depth.
- Prefer **Today → Learn → Practice → Revise**, with an unobtrusive search and Profile; retain access to Subjects, Syllabus and Past Papers.
- Semester I and II of the current KSLU first-year scheme are priority. Verify exact college cohort, assessment pattern, bare Acts and semester-specific amendments before publishing legal facts.
- Work well on small Android screens, slow networks and with reduced motion, dark mode and screen readers.
- Never lock core education behind a streak, hearts or artificial scarcity.
- Every factual lesson and reported legal case should cite a traceable source and show last-reviewed date.
- No "password feature" solely implemented in client-side HTML/JavaScript. GitHub Pages is static; use a properly secured authentication service or stay local-only until a backend is ready.

## Scientific basis and hypotheses

1. **Retrieval practice**: show a prompt before showing the answer. The learner must try to recall, even if unsure. Use feedback afterwards.
2. **Spaced practice**: review difficult concepts sooner; review reliably retrieved concepts later. Initial intervals can be 1, 3, 7, 14, 30, 60 days, but must be evaluated rather than claimed optimal for every student.
3. **Interleaving and discrimination**: mix "offer vs invitation to offer," "fraud vs misrepresentation," "murder vs culpable homicide" when students know the basics.
4. **Elaboration / self-explanation**: "Why is that true?", "Which statute applies?", "Which fact changes the outcome?" with guided explanations.
5. **Worked example → faded support**: start with a solved issue, move to prompted reasoning, finish with a new problem and independent answer.
6. **Feedback that explains the rule**, not just red/green ticks. Retries require a new example when possible.
7. **Knowledge calibration**: separate learner confidence from scored correctness. Saying "Got it" does not prove mastery.
8. **Transfer**: final assessment includes unfamiliar factual problems and written answers, not only vocabulary recognition.
9. **Accessible motivation**: voluntary daily goals, milestones and gentle reminders; allow rest days.
10. **Measure durable learning** at 1, 7 and 30 days where feasible. Label mastery as an estimate, never certainty.

Research: Dunlosky et al. (2013), APS (retrieval and distributed practice); Gonçalves et al. (2025), systematic review of retrieval versus elaborative encoding; Duolingo teaching method (micro-lessons and motivating game mechanics); W3C WCAG 2.2; OWASP authentication and passkey guidance.

## Baseline audit

Present: legal word library, several game/card views, semester browsing, subject concepts, two sample-style model answers based on an archived question source, local revision points, swipe animations, GitHub Pages and a service worker.

Main gaps:
- Fragmented, overlapping large JavaScript modules and presentation layers make regression risk high.
- Progress represents button taps as well as actual answers; "learned" is not independently verified.
- No unified learning-content ledger: source URL, statutory version, case citation, level, dependencies, misconceptions and verification state for every item.
- No actual server-side user identities or secure cross-device progress. Local browser data is not an account.
- Too many choices compete on some screens; progression between word, topic, unit and model answer is not consistent.
- Need regular automated checks for syntax, routes, assets, accessibility and answer consistency.
- No evidence of interviews with the requested "top 100 learners". Do not invent this research.

## Proposed information architecture

**Today**: due reviews, continue exactly where I stopped, one recommendation.  
**Learn**: First year → semester → subject → unit → concept → short lesson.  
**Practice**: vocabulary, distinctions, facts-to-rule, case matching, written-answer builder.  
**Revise**: spaced queue, weak concepts, saved mistakes, past-paper drills.  
**Profile**: language, pace, goals, accessibility, exports and account status.  

Search remains a thin expandable control, available consistently. Syllabus and Past Papers live inside Learn/Practice and via contextual routes. One primary button per screen, with back navigation and accessible alternatives to swipes.

### Example ideal 7-minute law lesson: "Offer vs Invitation to Offer"

- **Orient (20 seconds)** — one question and why this matters for Contract–I.
- **See an example (45 sec)** — clear facts and a two-sentence explanation.
- **Choose / predict (50 sec)** — classify a new fact situation before showing the rule.
- **Understand (90 sec)** — Section 2(a), conditions, everyday examples and exceptions.
- **Compare (60 sec)** — invitation to offer, counter-offer and acceptance, with feedback.
- **Apply (90 sec)** — short legal problem with changed facts; select issue, rule and reasoning.
- **Retrieve (50 sec)** — type or speak one important point without seeing notes.
- **Schedule (25 sec)** — saved to personal review queue based on response, not on swipes.

Text should grow **only when the student selects "Explain more."**

## 32 implementation stages

Status legend: PLANNED means not implemented. Checkpoint requires a tested acceptance criterion before moving onward.

### Wave A — trust and architecture (must ship first)

1. **A1 Repository quality gate (IN PROGRESS).** Node syntax checks, referenced-file checks, service-worker assets, data-schema checks. Build fails on missing script or duplicate routes.
2. **A2 Backups and migration (PLANNED).** Export/import local progress as JSON; version migrations, opt-in reset; test zero data loss between versions.
3. **A3 Decompose app safely (PLANNED).** Single router, state store, render loop; retire unused duplicate scripts after test coverage. Keep old URLs working.
4. **A4 Content source ledger (PLANNED).** Stable content ID, syllabus year, unit, Act/section, case citation, source link, verified date, reviewer, correction record.

### Wave B — intuitive mobile UX

5. **B1 Simplified information architecture (PLANNED).** Five consistent destinations; no dense main menu; preserve search and deep links.
6. **B2 Design system (PLANNED).** Tokens for neutral colours, typography, spacing, radius, status, icons, shadows and adaptable text sizes. Muted red reserved for genuine warnings/answer highlights.
7. **B3 Navigation and transitions (PLANNED).** 180–260 ms transitions when motion enabled; system back and swipe alternatives; avoid swallowing vertical scroll or button taps.
8. **B4 Accessibility and offline (PLANNED).** WCAG 2.2 AA target; large tap targets, focus order, high contrast, `prefers-reduced-motion`, non-swipe controls and offline fallback.

### Wave C — complete KSLU first-year content

9. **C1 First-year syllabus map (PLANNED).** Confirm cohort's applicable Semester I and II course units against official KSLU PDFs; maintain version history.
10. **C2 Concept dependency graph (PLANNED).** Foundations before complex rules: contract → offer → acceptance; elements → exceptions → remedies.
11. **C3 Accurate short lessons (PLANNED).** Simple definition, core rule, statute, concrete example, common mistake and optional deep explanation.
12. **C4 Verified case-law library (PLANNED).** Facts, legal issue, holding, ratio, judgment/citation link and "why it matters" in exam answers.

### Wave D — adaptive evidence-based learning engine

13. **D1 Baseline diagnostic (PLANNED).** Optional 10–15 questions distinguish prior knowledge, not merely confidence.
14. **D2 SRS scheduler (PLANNED).** Due queue, Again / Hard / Good / Easy ratings, locally saved intervals, overdue handling.
15. **D3 Mastery model (PLANNED).** Weight delayed recall and transfer heavier than multiple-choice; expose confidence and uncertainty.
16. **D4 Daily lesson sequencing (PLANNED).** Balance new concepts, due reviews, interleaving and manageable study time.

### Wave E — learning games with legal depth

17. **E1 Word games (PLANNED).** Fill missing letters, use in sentence, meaning recognition, reverse recall, pronunciation and examples.
18. **E2 Confusion challenge (PLANNED).** Closely related legal terms with 3 verifiable/hypothetical examples and meaningful distinctions.
19. **E3 Case and fact games (PLANNED).** Rule-to-case matching, spot the changed fact, select the relevant section, classify issue vs remedy.
20. **E4 Written reasoning builder (PLANNED).** IRAC (Issue, Rule, Application, Conclusion), missing-step reconstruction and counterexample challenge.

### Wave F — exam performance

21. **F1 Past-paper ledger (PLANNED).** Actual paper metadata, scanned question reference, mark weight, exact wording, source link and verification.
22. **F2 Examiner-thinking view (PLANNED).** "What is being tested?" → syllabus map → statutory provisions → legal tests → cases → outline.
23. **F3 Mark-sensitive model answers (PLANNED).** 2/5/10/15-mark variants, headings, key terms and common avoidable omissions; rubric marked illustrative unless official.
24. **F4 Timed written mock exams (PLANNED).** Focus mode, auto-save, self-marking checklist, timed revision and export. No fabricated AI grading precision.

### Wave G — identity, privacy and personalisation

25. **G1 Local-first profile (PLANNED).** Optional nickname, study language, semester, daily goal, fonts, reduced-motion and reminders; no login required.
26. **G2 Strong optional accounts (PLANNED; REQUIRES BACKEND).** Managed identity with verified email/passkeys or safely implemented password flow, account recovery, session limits and MFA where supported.
27. **G3 Sync and security (PLANNED; REQUIRES BACKEND).** Least-privilege server access, row-level per-user rules, TLS, secure cookies/tokens, rate limiting, backups, auditing and erasure/export controls. Never publish backend secrets in GitHub.
28. **G4 Fair motivation and preferences (PLANNED).** Achievements tied to comprehension, streak-free mode, quiet reminders and private progress by default.

### Wave H — evidence, delight and launch

29. **H1 Visual polish (PLANNED).** Calm study palette, editorial legal diagrams, restrained micro-interactions, optional tiny haptics, lightweight assets.
30. **H2 Learner research with 100 participants (PLANNED).** Recruit consenting KSLU students across colleges and ability levels; do not claim "top 100 learners in the world" have been surveyed.
31. **H3 Controlled learning evaluations (PLANNED).** Compare new method with usual study on fresh and delayed tests; examine retention, reasoning, errors and accessibility, not just time on app.
32. **H4 Stable first-year release (PLANNED).** Mobile browser/PWA, public content audit, legal review, security sign-off, versioned release, rollback and support page.

## The 100-learner research protocol (proposed, not completed)

- Recruit up to 100 volunteers with informed consent: high scorers, average performers, struggling learners, students who work, Kannada-medium and English-medium learners, users with and without accessibility needs.
- Ask them how they prepare an actual 10-mark question, where they get confused, how much time they study, what they revisit after a week, and what resources they trust.
- Observe a 10-minute baseline task, not just self-reported preferences.
- Pilot two designs on real topics and collect errors, delayed recall, task completion and perceived difficulty.
- Do not collect individual grades, college identifiers, contact lists or recordings without a clear need and consent.
- Do not describe the results as endorsements by "top 100 learners" unless they genuinely participated and consented.

## Legal quality bar

Every law fact or question-answer needs:
- **Identity**: official course name, semester/unit, concept ID, jurisdiction and applicable academic year.
- **Authority**: bare Act + accurate section + authoritative judgment citation where appropriate. Identify hypothetical examples as hypothetical.
- **Status**: verified, needs review or superseded; last checked and who checked it.
- **Pedagogy**: specific learning objective, misconceptions, difficulty and evidence of transfer.
- **Assessment**: objective scoring for factual questions; an explicit rubric for written answers.
- **Change management**: content review after statutory amendments, important judgments and KSLU curriculum changes.

Notes written by AI are drafts until verified by a qualified reviewer. Never manufacture an examiner's official marking scheme, past-paper provenance, judgment holding or news event.

## Security and data handling

Current GitHub Pages is a **public static website**, not a server with private authentication.
LocalStorage progress is convenient but may be deleted by clearing browser data; it is not encrypted account storage and cannot be securely synchronised across devices by itself.

Default phase:
- Guest mode, no password, local-only data and explicit export.
- Data minimisation; no third-party tracking by default.
- No fake password/login modal and no shared hard-coded access code.

When a real backend exists:
- Use a maintained managed identity provider; prefer passkeys or robust password authentication with MFA.
- Enforce server-validated access control, hashed passwords (never plaintext), TLS, credential reset, secure session lifecycle, per-user data isolation, abuse protection.
- Privacy policy, export/delete data, recovery flow and audit testing must precede accepting student accounts.

## Product success metrics

- 7-day and 30-day **delayed recall accuracy** for previously studied topics.
- Factual legal correctness and proportion of content with verified authorities.
- New-fact transfer: ability to apply legal rules to unfamiliar scenarios.
- Ability to produce a complete issue-rule-application-conclusion answer without prompts.
- First meaningful exercise in under 30 seconds from landing; no clutter or dead-end screen.
- Reliable navigation, offline fallback, backup/restore and zero account data exposure.
- Time-to-fix erroneous law content and crash/error rates on real Android devices.
- User satisfaction, accessibility results and completion rate **without** relying on streak pressure.

## Quality / release policy

1. Only one stage or cohesive group per release; do not combine unrelated UI overhauls.
2. Add a regression test with each bug fix.
3. `node --test` and `node --check` pass before deploying; pages build success is not sufficient proof of functional correctness.
4. Smoke-test Android narrow view, PWA upgrade, swipe/scroll/typing, slow network and offline mode.
5. Maintain previous version/rollback path and export learning data before storage changes.
6. Mark stages as complete **only** when their acceptance criteria pass on the published site.

## Non-negotiable UX rules

- Never repeat the same page title three times.
- Never force a student to tap "Show card" just to begin.
- Slider and swipe must have a simple tap/keyboard alternative.
- A game should demand retrieval or reasoning, not simply allow guessing until points are awarded.
- The "I know it" button cannot by itself count as permanent mastery.
- Never replace the student’s 10-mark answer with a misleading short summary without an expand-to-full-answer option.
- No false promise of an AI judge, official examiner or secure account.
- Show units progressively, with breadcrumbs, not all branches on one screen.
- Calm interface: readable text, whitespace, appropriate contrast and meaningful feedback.

## Verified public design/science/security references

- Dunlosky et al. 2013, *Improving Students' Learning With Effective Learning Techniques* — https://www.psychologicalscience.org/publications/journals/pspi/learning-techniques.html
- Gonçalves et al. 2025, *Retrieval Practice Versus Elaborative Encoding* — https://doi.org/10.1007/s10648-025-10076-6
- Duolingo teaching method — https://blog.duolingo.com/duolingo-teaching-method/
- W3C WCAG 2.2 — https://www.w3.org/TR/WCAG22/
- OWASP Authentication Cheat Sheet — https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
- OWASP Passkey Security Cheat Sheet — https://cheatsheetseries.owasp.org/cheatsheets/Passkey_Security_Cheat_Sheet.html

## Immediate implementation order

**First commit**: this auditable master plan plus automated source, asset and data checks.
Then **A2 → A3 → A4**, with data export and source validation, before designing the unified Today screen and spaced-review engine.

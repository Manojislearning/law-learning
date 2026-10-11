# Continuous Improvement Record — Law Learning

Date: 11 October 2026
Latest user-visible release: **44** — page-linked KSLU edition audit for all 30 Semester I outlines, with current-cohort caveat; prior release histories follow.

## Principle

When the user requests “Next,” choose the highest-value mix of **new syllabus content, learner-outcome improvement, usability repair, error correction and regression testing**. After the 32-stage roadmap, continue improving; never manufacture new features just to make a release.

## Version 44 — Official KSLU first-year outline audit (11 October 2026)

**Why:** The previous app attached official-source links but left all 30 imported semester units simply marked `needs-review`. That hid genuine edition-level evidence while offering users little help distinguishing the published syllabus from the rules actually applicable to their admission year.

**Primary documents reviewed:**
- KSLU official three-year LL.B. revised syllabus for **2018–19 onwards**, including printed pages 3–14: Semester I course list, Constitutional Law–I (pp.4–5), Contract–I (p.6), Torts (p.8), Hindu Law (p.10) and conditional English (pp.13–14).
- University circular **KSLU/Aca/BOS/2024-25/1586 dated 26.9.2024**, introducing the three new criminal laws from 2024–25, with **BNS Criminal Law–I** Units I–V in Appendix I (pp.1–2).

**Delivered:**
1. Compared the **broad unit-topic summaries for all 30 imported Semester I units** against the corresponding official edition pages, without claiming a verbatim match or checking all teaching-note claims.
2. Added `outlineAudit` provenance per unit: official source ID, printed page, comparison date, narrow audit scope and caution. Preserved `syllabusStatus: needs-review` and `publishedForCohort: unconfirmed`.
3. Added direct primary-source PDF **page links** and honest comparison descriptions in the visible **Syllabus source audit** screen. The Home syllabus card now shows the work done while explicitly noting that admission-year scheme confirmation remains pending.
4. Clarified that **English is listed for students who write examinations in Kannada** and that the 2018–19 Torts syllabus cites the **1986 Consumer Protection Act** even though modern legal study ordinarily concerns the 2019 legislation. Contract–I Unit V retains a pre-amendment Specific Relief outline.
5. Added unit-by-unit provenance tests and simulated-browser source navigation checks, including truthful cohort warnings. Did not change user progress, saved reviews, essay drafts or backup format.

**Evidence record:** `docs/kslu-syllabus-audit-v44.md` contains the full page map, official document links, comparison scope and six remaining law/curriculum verification tasks.

**Still outstanding:** Authenticate any later 2025–26 / 2026–27 KSLU academic circulars for the learner's specific admission scheme. Perform independent paragraph/section-level legal and judgment review before calling each guided answer source-verified. Do not infer a statutory-law audit from outline-topic matching.

**Next improvements:** Start with current-law substantive audit of BNS and Torts Unit V, or verify the precise admission-cohort scheme once the student's admission academic year is known. Follow with an accessible minimal legal-misconception learning loop.

---

## Version 43 — Accessibility and specific reasoning feedback (11 October 2026)

**Audit finding:** Version 42 showed only a self-reported `n / 4` IRAC checklist count. That number did not explain *how to improve* a weak legal argument, and small interactive targets or unclear focus could interrupt students using small screens or keyboards.

**Delivered:**
1. **Targeted remediation:** Unchecked Issue, Rule, Application and Conclusion criteria each produce a specific improvement prompt grounded in the *current case's* source-linked reference outline. This is coaching for an element the student has self-identified as missing — **not** an AI diagnosis of an essay's correctness.
2. **Avoid information overload:** The improvement guidance is in a collapsed, optional panel. Four long reference paragraphs are not forced onto the mobile screen.
3. **Accessible interaction:** Practice buttons have at least 44 CSS pixels height, checkbox targets at least 24 pixels, details summaries have larger hit areas, visible keyboard focus remains supported, and the rubric progress text uses a polite status announcement. The existing reveal transition moves keyboard focus to the newly available reference outline.
4. **Real browser CI:** A separate GitHub Actions job runs Playwright with Chromium mobile viewport emulation at **320, 390 and 768 CSS pixels** and a keyboard-only case exercise. It checks initial answer hiding, typed-attempt gate, element-specific guidance updates, touch-target dimensions, focus progression and browser runtime errors.
5. **Regression safety:** Pure helper tests cover all four self-assessment states; the original JSDOM suite still tests the five-unit interleaved case flow, Review Due, backup portability and preservation of unsent answers.

**Important verification limits:** Browser viewport emulation does not equal testing Android Chrome, TalkBack, iOS VoiceOver, real hardware keyboards or low-bandwidth phones. Nor does automated DOM focus testing certify WCAG conformance or the accuracy of the KSLU content.

**Design references:**
- W3C WCAG 2.2 target size minimum and focus visible: https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/
- WAI-ARIA polite status messages (avoid disruptive announcements): https://www.w3.org/TR/wai-aria/

**Next high-value work:** (1) Authenticate the KSLU syllabus for the student's exact admission scheme and audit each law/case claim, particularly Unit V amendment issues; (2) gather consented real-learner feedback about confusion and written-answer effort; (3) add real-device TalkBack and Chrome accessibility checks; (4) make legal misconceptions diagnosable with alternative fact patterns, without claiming AI scoring.

---

## Version 42 — Independent legal issue spotting (11 October 2026)

**Why:** Guided lessons, recognition quizzes and the v40 example-linked IRAC activities can inadvertently cue the answer. Students need to see a genuinely new fact pattern, identify the issue without a label, retrieve the statutory rule, apply facts and formulate a qualified conclusion.

**Implemented:**
1. **Case Practice** directly accessible from Home or `#practice`. Each five-case session interleaves exactly one case from each Contract–I unit. Each unit has three original scenarios (15 total); an in-memory least-used selector cycles all three before repeating a case in that unit. Unit labels and case headings are concealed until after an attempted written answer.
2. A single text field accepts the student's own IRAC response, with an optional generic IRAC prompt. The reference analysis remains hidden until at least a short typed attempt (40 characters). There is no fake automatic evaluation of legal correctness.
3. After attempting, the learner sees separate **Issue, Rule, Application and Conclusion**, a common misconception or counterpoint, and links to primary legislative material. Four explicit self-check questions ask which elements genuinely appeared in the learner's original answer. The count is **not** an exam mark.
4. Draft text and rubric selections remain in the current page only. Leaving the exercise discards it; no new localStorage key, backup schema change or external upload. Old review due, saved learning progress and backups are unaffected.
5. The UI uses one compact home action, clear status messages, keyboard-focusable reference feedback, no gamified reward interruption and readable mobile text fields.

**Quality controls:** Fifteen bank/schema tests, no-repeat interleaving tests, official statutory-link checks and simulated browser tests across all five units, with empty-draft gate, self-check interactivity and teardown. GitHub Pages deployment and full automated suite are separate release gates.

**Legal source caution:** Scenarios are educational hypotheticals, not verified past KSLU exam papers and not examiner-approved marking rubrics. Contract Act references link to India Code. Post-2018 Specific Relief references must be checked against subsequent amendments and admission-cohort syllabus.

**Comparison and risk reduction:** The app now combines Anki-like delayed recall (v41) with a fresh factual application task rather than adding more multiple-choice permutations. This addresses a common learning-app weakness: high quiz scores without transfer to unseen questions. No published claim of improved exam grades is justified until comparative testing with consenting students.

**Next improvement priority:** (1) A real Android Chrome mobile accessibility and touch/keyboard smoke test; (2) validate official KSLU cohort syllabus unit-by-unit and resolve historical case/statute mappings; (3) improve distractor feedback and measure which legal concepts generate recurring mistakes without persisting private essays; (4) test whether students transfer learned statutory rules to unseen scenarios and simplify any UI steps that slow that task.

---

## Version 41 — Spaced Review Due + portable retrieval history (11 October 2026)

**Goal:** Recall the 50 existing Contract–I concepts after a delay instead of only recognising multiple-choice answers immediately after studying.

### Comparative audit

- **Anki** distinguishes failed and successful review responses and schedules future retrieval. This app adopts the simple *user-facing* Again/Good principle but **does not claim to implement Anki FSRS or calculate personalised memory stability**. https://docs.ankiweb.net/deck-options
- A synthesis of spacing and retrieval evidence supports *actively producing an answer* and returning to it later rather than only repeatedly rereading or relying on fixed-position choices. https://www.nature.com/articles/s44159-022-00089-1 and https://www.annualreviews.org/content/journals/10.1146/annurev-psych-010419-051019
- A common ineffective study-app pattern is equating a correct recognition response with true exam readiness. **Version 41 separates recognition (guided three-choice quiz) from self-rated retrieval (typed/aloud answer before seeing the rule).**

### Delivered

1. **Review due** is accessible directly from Home. It displays Due, Started and Not started. New learners can practise three unseen concepts without first creating synthetic due history; up to ten scheduled items form a manageable daily queue.
2. **Schedule:** successful self-rated recall: 1, 3, 7, 14, 30 then 60 days; Again: retry after 10 minutes. This is a deliberately simple custom schedule that should be validated against real study outcomes before optimisation.
3. **Guided quiz exposure** starts a next-day review after a correct recognition; wrong answers return in 10 minutes. Recognition alone never increments a recall stage. An overdue incorrect recognition is scheduled for 10 minutes in the future rather than remaining immediately overdue.
4. **Review-first interaction:** questions appear before answers. The learner types at least a short response or indicates they answered aloud, then opens the reference answer and self-rates. No unsound automated essay grade or inflated word-game points.
5. **Persistent and portable:** history is stored as `law-learning-review-v1`, keyed by stable lesson IDs. Profile export/import uses backup schema **3**, validates review records before any import write, and accepts historical v1 and v2 backups without deleting review records that aren't included.
6. **No silent reset:** corrupt review JSON is not overwritten by an empty schedule. Storage quota errors surface to the learner. All backup writes remain atomic per storage operation with rollback on multi-key restore failure.
7. **Automated checks:** deterministic interval tests, invalid-data tests, old-backup migrations, staged rollback, browser-like navigate → attempt → reveal → grade → export, and 50-item catalog integrity.

### What this does not promise

- Self-reported recall is *not* a scored exam response, ability diagnostic or professional legal competency measure.
- The fixed interval schedule is not a scientific optimum for this specific student. It does not adapt to item difficulty, exam date, retention data or forgetting probabilities.
- Drafted answers are not retained, but review ratings are saved in the browser. No account synchronisation or encryption is provided.
- Android and keyboard accessibility testing in a real mobile browser remains to be completed.
- The precise KSLU curriculum for the learner's admission cohort is still pending official-document verification.

### Next high-value improvement

Introduce an **interleaved legal issue-spotting practice set with diverse new fact patterns**, separate from the memorised lesson examples. Use a rubric that lets students explicitly self-check whether they identified (1) the issue, (2) the applicable statute/case principle, (3) facts that support and rebut the rule, and (4) a proportionate conclusion. Analyse recurring wrong choices by statutory concept—without adding coercive streaks or fake accuracy percentages. Follow with real mobile accessibility checks and cohort-appropriate syllabus audit.

---

## Version 40 — Contract–I Unit V + optional legal writing (11 October 2026)

**User-facing release:** 12 guided Specific Relief lessons from the amended Specific Relief Act, plus optional written recall on all five Contract–I units. Three Unit V case problems use Issue–Rule–Application–Conclusion fields and an educator-authored outline. Answers stay in session memory only; the app does not grade essay accuracy.

**Legal-content quality:** Amended Sections 10, 14 and 20 are explicitly distinguished from pre-2018 rules. The source ledger flags the imported historical syllabus list and includes the primary India Code amended Act. Cohort-specific KSLU syllabus validation remains pending; extra related topics (Sections 26, 31, 34) are taught without implying they were expressly listed in the old extracted section list.

**Why written recall rather than more multiple-choice:** Retrieval research supports practise producing an answer from memory, followed by corrective feedback. Results comparing answer formats vary by study and learner difficulty. For LL.B. exams, the ability to identify a legal issue and apply a statute to facts is more directly relevant than merely choosing among displayed terms. See:
- https://doi.org/10.1146/annurev-psych-010419-051019
- https://pmc.ncbi.nlm.nih.gov/articles/PMC11684041/
- https://www.cmu.edu/teaching/resources/instructionalstrategies/activelearningstrategies/retrievalpractice/index.html

**Design choice:** The written exercise is optional and collapsed, avoiding forced long forms during brief mobile study sessions. The learner reveals the outline voluntarily, making self-correction possible without fake AI grading.

**Validation:** Unit V data and route tests; multi-unit data integrity; browser-like input, comparison-reveal and IRAC field tests; full GitHub Actions checks. Android device interaction is still not independently tested.

**Next improvement focus (ranked):**
1. Store *attempt outcomes* as a versioned, exportable local revision ledger, with backup migrations and tests. Review due concepts after delay; do not equate a correctly recognised multiple-choice item with full mastery.
2. Add interleaved *unseen fact-pattern* short answers across Units I–V, with explicit rubric, reasoning checks and source-linked model answers. Avoid memorising only the same scenario.
3. Validate official KSLU syllabus applicable to the learner's first-year cohort and audit Unit V legal propositions for later amendments.
4. Test real Android accessibility, feedback announcement, touch scroll vs swipe and keyboard navigation.
5. Improve poor distractors and add why-each-wrong responses, not merely a paragraph saying which answer is correct.

---

## Version 39 review

### Evidence and comparative findings

- The app previously repeated fixed choice positions, including Unit III answers whose correct position was usually the same. A learner could learn the position instead of the legal rule.
- Public learner discussions about Duolingo repeatedly mention unwanted game interstitials, chests, XP screens, shallow explanations and repeated question formats. These are opinions from a self-selected community, not a representative 100-person survey.
  - https://www.reddit.com/r/duolingo/comments/1szkd8y/too_much_gamification/
  - https://www.reddit.com/r/duolingo/comments/1wfip7r/why_so_much_garbage_in_between_lessons/
- Duolingo's own review-exercise research supports reintroducing material learned earlier rather than only repeating the most recent question: https://blog.duolingo.com/review-exercises-help-measure-learner-recall/
- Retrieval-practice research discusses advantages and limitations of multiple-choice practice, including potential recall of wrong distractors without good feedback: https://pmc.ncbi.nlm.nih.gov/articles/PMC10229024/

### Changes delivered

1. **Unit IV**: 12 self-contained, legally grounded lessons covering compensation under Sections 73–75, legal limits, remoteness, mitigation and Sections 68–72 quasi-contractual obligations. Practical architectural/construction examples are used where relevant. Source links remain visible, and the course is not claimed as approved for the learner's admission cohort.
2. **Shuffled answer positions**: all four guided Contract–I units now use a Fisher–Yates shuffle of choices for each rendered question, so answer position is not a reliable cue.
3. **Corrective explanations**: after answering, the correct choice is revealed and the legal reason is shown; no extra popups, reward chests or additional score changes.
4. **Session mistake review**: at unit completion, the learner may revisit missed concepts. A correct retry clears that item in the current session. “Finish for now” is available in retry mode. This is *not* a permanent mastery claim.
5. **Improved gesture discipline**: forward swipe is only accepted after answering; backward swipe remains available to revisit context; the main button route is always available.
6. **Full regression suite**: all specialised JavaScript, syllabus source, backup and DOM integration tests run via GitHub Actions. Unit I–III deep links remain in place.

### Remaining weaknesses — future “Next” candidates

- **P0 academic correctness**: current admission-cohort KSLU syllabus has not been authenticated. Compare each topic with the exact current syllabus PDF before claiming university verification.
- **P0 retrieval durability**: missed items are still tracked **within a single open session only**. Need a carefully migrated local SRS store, interval algorithm, and user-data export; a second-delayed assessment is required before calling something mastered.
- **P1 cognitive engagement**: recognition-based three-choice quizzes are not sufficient for exams. Add short written recall, issue–rule–application exercises, varied scenarios and counterexample questions.
- **P1 learner self-direction**: users should be able to choose Learn (worked example) or Review (try answer first), with one tap, without visually complex tab layouts.
- **P1 feedback quality**: when a student chooses a distractor, explain specifically **why that choice was tempting but incorrect**, not only what the right answer is. Review legal reasoning with primary authorities.
- **P1 accessibility**: test touch gestures, focus management, announcements of quiz feedback, reduced motion and text zoom on actual Android; simulated DOM testing alone is not enough.
- **P2 progress ethics**: existing word-game XP counters remain and may reward tapping rather than durable knowledge. Reconsider after progress migration.
- **P2 test coverage**: add real browser automation with Playwright or Puppeteer and screenshot baselines, rather than JSDOM alone; do not assume a successful Pages deployment demonstrates mobile correctness.

## Release decision rule

For each subsequent release:
- Read the roadmap and this improvement record.
- Reassess common learning-app complaints without claiming to have surveyed users.
- Specify the expected learning outcome and simplest feasible solution.
- Build with backward-compatible deep links and storage.
- Run the full tests and browser navigation smoke checks.
- Check GitHub Pages deployment on the final head commit.
- State clearly what has been verified and what still requires cohort/manual review.

**No extra gamification by default**; study value and exam reasoning come first.

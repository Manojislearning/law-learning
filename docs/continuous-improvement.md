# Continuous Improvement Record — Law Learning

Date: 11 October 2026
Release: **39** — Contract–I Unit IV, plus correction of cross-unit quiz weaknesses.

## Principle

When the user requests “Next,” choose the highest-value mix of **new syllabus content, learner-outcome improvement, usability repair, error correction and regression testing**. After the 32-stage roadmap, continue improving; never manufacture new features just to make a release.

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

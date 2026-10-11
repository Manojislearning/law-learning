# Continuous Improvement Record — Law Learning

Date: 11 October 2026
Latest user-visible release: **50** — 15 contrastive changed-fact questions across Contract, Torts and BNS, with weak-unit transfer follow-up; prior release histories follow.

## Principle

When the user requests “Next,” choose the highest-value mix of **new syllabus content, learner-outcome improvement, usability repair, error correction and regression testing**. After the 32-stage roadmap, continue improving; never manufacture new features just to make a release.

## Version 50 — Changed-facts transfer after IRAC practice (11 October 2026)

**Audit:** The existing 45-case system supported written IRAC and weak-case retry, but immediate repetition of the **same facts** can reward memorising the published explanation. A second, materially altered fact pattern is needed to practise **transfer**, not just recall.

**What changed:** Fifteen original source-linked fact variations were added, one per unit for Contract–I, Torts and BNS. The existing Case Practice overview now offers a **Changed-facts challenge**. After a weak-case retry, learners may also open a subject- and unit-relevant transfer set. Each scenario asks what legally matters about the change; typed reasoning is required before revealing the rule, factual application and misconception. No system pretends to mark free-form legal answers automatically.

**Meaningful contrasts:** Conditional versus unconditional acceptance; contractual hardship versus later illegality; undisclosed versus disclosed special losses; fleeing driver versus truly unidentifiable vehicle; res ipsa and rebuttal evidence; hurt versus grievous hurt; cruel treatment versus alleged dowry death. Each uses the primary source links of its corresponding original case.

**Design constraints:** One existing Case Practice destination, not an additional navigation maze. No XP, streak pressure, personal essay uploads, localStorage changes or backup migrations. The transfer module's validation rejects duplicates, missing parent cases and incomplete source-linked legal reasoning.

**Verification:** Fifteen challenge flows tested under simulated browser interaction, including answer-hiding, reveal, sources and cleanup on exit, plus weak-retry follow-up. Chromium emulation verifies 320/390/768px touch controls, focus and explanation gating. Actual Android/TalkBack testing, admission-cohort verification and proof of longer-term transfer remain outstanding.

**Full design and limits:** `docs/changed-facts-transfer-v50.md`.

**Next priority:** Delayed changed-fact exercises and source-audited case-law/application feedback, then actual-device accessibility validation. Do not inflate correct immediate self-check into a mastery claim.

---

## Version 49 — Retrievable weak-case practice and truthful completion tracking (11 October 2026)

**Learning audit:** The existing 45-case, three-subject IRAC experience counted a problem as “used” immediately when displayed. Skipping a case could thus push it out of future mixed sets, falsely implying study exposure. The four-part self-check gave suggestions but did not let students systematically retry identified weaknesses.

**Delivered:**
1. **Skipped does not mean studied.** Only a written answer that was revealed and advanced with **Next case** updates the existing in-memory rotation count. Skipping keeps a case eligible for a later mixed set.
2. **Retry weak or skipped cases** on completion of a five-case session, also accessible from the same subject's practice overview. A session-local queue records skipped cases and the IRAC elements the student *self-identified* as omitted.
3. **Retry from scratch.** The repeated scenario starts with a blank answer field and hidden reference/model reasoning. Neither original essays nor reference answers are prefilled. It remains user-controlled self-assessment, **not** automated marking or evidence of professional competence.
4. **Unknown differs from wrong.** If no checkboxes were touched, the status is **not self-assessed**, rather than claiming all four legal elements were demonstrably wrong. All four self-checked items clear the retry flag; partial self-checks retain the gap(s).
5. **No new storage keys or schema migration.** Answers, session-only weakness flags and checklist interaction are not saved to localStorage or uploaded. Progress, spaced review history and older backups are unchanged.
6. **Regression coverage:** End-to-end simulated-browser Torts test covers skip → four written comparisons → self-identified Rule gap → two fresh retries → cleared queue. A separate deterministic BNS test verifies that all-skipped cases remain eligible and session flags disappear on departure. Chromium phone-width smoke test checks the retry button and initial concealed answer state.

**Remaining limitations:** A self-check is a prompt for reflection, not a verified estimate of whether a legal answer is correct. Repeating the same case after one reading may improve fluency but does not establish delayed memory or transfer to a genuinely unseen fact pattern. Cohort-specific KSLU curriculum matching remains pending.

**Next research and product priority:** Introduce a varied *counterexample* after weak-case retries so students must transfer the rule to changed facts; link it to authoritative statute/case principles. Evaluate whether recognition of legal section numbers translates into reasoning in fresh cases. Add structured accessibility tests for TalkBack and real Android browsers when available.

---

## Version 48 — Independent BNS issue-spotting (11 October 2026)

**What improved:** Reused the proven written IRAC exercise instead of introducing a third redundant quiz UI. Added **15 original Criminal Law–I BNS fact patterns**, three in each of five KSLU published syllabus units. The existing Course Practice page now offers **Contract–I / Torts / BNS** selection and **45 total original cases**, with five varied questions per session and unseen material preferred before repetition.

**Academic emphasis:** Students must distinguish (a) proper care from a claimed accident exception, child-age thresholds and private-defence limits, (b) abetment, conspiracy, and marriage-related offences, (c) murder definitions, negligent death, grievous hurt, (d) unlawful assembly, rioting, false criminal charges, and (e) theft, snatching, entrustment-based breach of trust, cheating and threats. Each case asks for a source-linked Issue / Rule / Application / Conclusion analysis, not just the correct section number.

**Quality and safeguard choices:**
- Court outcomes are never declared automatic. The model answers require statutory ingredient and fact-level analysis, with misconceptions highlighted.
- The Section 106(2) problem concerns a hypothetical **10 July 2024** incident and correctly distinguishes the enacted provision from the 2024 MHA commencement notification. Later commencement notifications remain a distinct verification requirement; the app makes no perpetual non-commencement claim.
- Source references are from the enacted India Code BNS, the official KSLU 2024 syllabus and the MHA commencement notice; the current admission cohort is not certified.
- A learner must write before revealing the reference outline; rubric ticks are explicitly self-assessment, not an AI essay grade.
- Existing Contract and Torts banks, local progress, notes, revision scheduler and backup schema remain untouched. No essays are persisted.
- Added independent source and factual distinction tests, five-unit interleaving regression, simulated browser navigation and three real Chromium mobile viewport widths, including small touch-target layout.

**Evidence record:** `docs/bns-case-practice-v48.md`.

**Next highest-value work:** Study repeated learner mistakes without recording their private essays; offer targeted *contrastive worked examples* for commonly conflated offences, keep improving statutory subsection accuracy and complete real Android/TalkBack checks.

---

## Version 47 — Independent Law of Torts exam practice (11 October 2026)

**Prioritisation:** Rather than build yet another isolated quiz, reused the same exam-style **written IRAC**, official-source feedback and lesson-free mixed-unit practice established for Contract–I. The next meaningful learning outcome is applying tort doctrine and motor/consumer statutory distinctions to **new facts**.

**Delivered:**
1. **15 original Torts problems**, three in each of KSLU's five Semester I Torts unit groupings: nature and foundational wrongs; defences/vicarious liability; negligence, strict and absolute liability; wrongs against person and property; and Consumer/Motor Vehicles liability.
2. The existing Case Practice entry now allows **Contract–I or Law of Torts** selection (30 total original case problems). A five-case session draws one from each unit, shuffles the order and favours unseen problems before repeating alternatives.
3. Model reasoning remains hidden until a short written attempt. Then the user may compare four structured IRAC paragraphs, read a common legal misconception and open primary judicial/statutory documents. Students mark missed elements themselves; **not an AI grade or exam score**.
4. The Torts syllabus subject and each unit provide a direct open action. Torts also supports `?course=torts#practice` while previous `#practice` links continue to open Contract–I by default.
5. New Torts answers and self-check rubrics are kept only in the current page; saved vocabulary, spaced revisions, backup format and original Contract cases remain intact.
6. Validation extends to official **Supreme Court judgments** (`api.sci.gov.in`) as primary case-law sources as well as India Code, Gazette and ministry reports. The source checker still rejects arbitrary external hostnames.
7. Automated checks include factual-case bank structure, source hosts, mix-without-immediate-repeat, cross-subject switching, legal-answer reveal gates, rubric integrity, old Contract test paths and real Chromium mobile-width tests.

**Academic accuracy:** The case bank is original educational material. It references *Subhagwanti* negligence, *M.C. Mehta* hazardous-enterprise liability, discussions of *Vidyawati* vicarious liability, constitutional detention compensation and dated Motor/Consumer statutory provisions. This is **not** an audit of all Torts doctrine or current KSLU admission scheme. Read `docs/torts-case-practice-v47.md` for the exact source URLs and case scope.

**UX findings:** (a) keep a single home Case Practice entry and switch subject inside it; (b) don't label the case by unit until after an attempt; (c) avoid overwhelming users with model answers before recall; (d) mix cases across units; (e) record no unverifiable mastery. Chromium surfaced a harmless test assertion discrepancy between uppercase-rendered labels and underlying text content; test the accessible text directly.

**Next:** Prefer diagnosing *which arguments learners miss*, improving distinct model counterarguments, auditing BNS Unit III subsection accuracy against live legislation and identifying the student's admission-year scheme. Actual Android/TalkBack and consented learner observation remain necessary to validate usability and learning outcome assumptions.

---

## Version 46 — Motor Vehicles Act 2019–2026 accuracy expansion (11 October 2026)

**Audit result:** The imported Law of Torts Unit V outline included Motor Vehicles Act, 1988 but did not explain three important current-law layers: (1) amended no-fault compensation and the 2022 hit-and-run scheme, (2) the separate 2025 cashless treatment scheme, (3) the **Jan Vishwas (Amendment of Provisions) Act, 2026** changes notified with effect from 15 August 2026.

**What was delivered:**
1. Nine Motor Vehicles study notes (24 total Current Law Check cards) covering Sections 146–147, 149–150, 157, 161–164, 165–166 and dated compensation/medical treatment schemes. Clear ₹5 lakh/₹2.5 lakh no-fault sums versus ₹2 lakh/₹50,000 hit-and-run amounts. Section 162 cashless treatment up to ₹1.5 lakh and seven days.
2. A **2026 Section 166(3) proviso** note about sufficient-cause late filing within the additional statutory period, Section 164(4) ex-gratia treatment and updated Section 157(2) thirty-day insurance transfer change. These matters are particularly easy to misstate when using older 2018 syllabus notes or pre-2026 consolidated legislation.
3. A **Motor Vehicles** tab inside the existing Current Law Check alongside BNS and Consumer Protection, plus an additional direct link from Torts Unit V and its Sources & review view. No separate oversized home panel or new user-state storage.
4. Unit V source ledger updated with official India Code, MoRTH / PIB reports and Gazette amendment/commencement records. Old syllabus review status remains `needs-review`; the partial `lawAudit` is not whole-unit legal certification.
5. Verified browser and mobile interactions, including correct tab selection, all nine card transitions, and computed touch target heights at 320, 390 and 768 CSS pixels.

**Audit-driven fix:** A malformed CSS grid declaration initially caused the new law-check controls to render below intended mobile touch size. The real Chromium test caught it; the grid syntax was corrected and the full suite passed. Additional selector checks now distinguish the three study tabs from the separate Back to Syllabus action.

**Privacy:** The new content doesn't alter local vocabulary scores, profile data, reviewed-card schedules, typed essays or backup formats.

**Source notes:** `docs/motor-vehicles-accuracy-v46.md` records the official India Code, 2022/2025 ministry announcements and 2026 Act and commencement Gazette references.

**Next priorities:** (1) Extend into **unseen Torts problem questions** covering negligence, motor compensation, hit-and-run identification and consumer remedies; (2) build section-by-section BNS evidence audits, correcting any old IPC mappings; (3) authenticate the exact admission-cohort KSLU syllabus; (4) complete real Android/TalkBack testing and validate learning retention with consented learners.

---

## Version 45 — Focused BNS and Consumer current-law correction (11 October 2026)

**Highest-value audit finding:** The app's historical syllabus text was source-linked, but users could still memorise wrong or stale offence numbers or consumer commission thresholds. The most consequential examples are (a) the commencement distinction for BNS Section 106(2) and (b) the 2021 revised consumer commission jurisdiction rules, which supersede original thresholds printed under the 2019 Act.

**Changes shipped:**
1. A visible, minimal **Current Law Check** home entry, with contextual open buttons from BNS Units I–V and Torts Unit V. Fifteen self-contained source-linked correction cards: eight BNS, seven Consumer.
2. Each card contains exact statutory section focus, an original plain-language rule summary, one fact example, a 'common mistake' and a three-choice check with explanatory feedback and clear correct response. Answers are shuffled; no false mastery or XP awarded.
3. Primary India Code Acts, MHA commencement Gazette notification and official Consumer Affairs 2021 jurisdiction Rules are linked from the specific cards. A short status note clearly separates selected provision checks from the whole Act, subsequent amendments, case law and applicable KSLU cohort.
4. Six unit ledger records have a separate `lawAudit: selected-provisions-checked` scope; all existing `syllabusStatus` values remain `needs-review`. Consumer jurisdiction and BNS commencement caution text is displayed on the appropriate syllabus source page.
5. Offline service-worker cache updated; prior word, quiz, writing, review and profile backup keys are unchanged.
6. Added statutory correctness regression checks plus browser navigation for Consumer and BNS, and mobile Chromium touch/overflow checks at 320, 390, 768 CSS pixels.

**Verified boundaries:** Section 106(2) was excluded from the MHA **1 July 2024** commencement notification. The card explicitly instructs students to check later Gazette notifications rather than treating that historical notice as an eternal statement of non-commencement. Consumer bands from the **2021 Rules** are based on consideration paid: District up to ₹50 lakh, State over ₹50 lakh to ₹2 crore, National over ₹2 crore, subject to other limits and possible later amendments.

**Comparison against learning-app pitfalls:** Users need error-focused retrieval and the reason a tempting answer is wrong, not a static section table or repetitive same-position quizzes. This module uses a fact example and common-misconception prompt per rule without introducing reward popups or a meaningless legal proficiency score.

**Source/audit record:** `docs/statutory-accuracy-v45.md`.

**Next work:** More detailed BNS subsection auditing, including interpretation and gender-related offences; Motor Vehicles Act update for Torts Unit V; establish the student's exact KSLU admission-year scheme from the institution's official notice; and test real Android TalkBack/keyboard behaviour rather than assuming Chromium mobile emulation suffices.

---

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

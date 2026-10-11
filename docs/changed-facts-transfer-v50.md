# Version 50 — Changed-facts legal transfer practice

**Date:** 11 October 2026  
**Area:** First-year LL.B. Contract–I, Law of Torts and Criminal Law–I (BNS).  
**Outcome aimed for:** Help learners apply a previously studied legal rule to **materially changed facts**, not just repeat the worked answer.

## Why this follows Version 49

Version 49 already had 45 original IRAC problems and session-local retries for skipped or self-identified weak answers. A learner could improve simply by remembering the same reasoning they had just seen. A strong next step is **contrastive transfer**: change a legally material fact and ask whether the earlier result still follows.

This improvement reuses the existing Case Practice interface; it does not introduce another main navigation destination, unnecessary gamification, or a new user-storage schema.

## Delivered

- **15 authored counterfactuals:** five Contract–I, five Torts and five BNS. Exactly one challenge relates to each of the five syllabus units in each subject.
- **Two entry points:** (1) **Changed-facts challenge** on the Case Practice overview presents five altered situations for the selected subject; (2) after a weak-case retry session, **Try changed facts from these units** presents corresponding unit-level transfer questions. When an exact parent problem is not among the authored variations, the challenge is from the same unit rather than falsely claiming an exact parent link.
- **Retrieval-first interaction:** a learner sees changed facts and the question **without the answer**, writes at least a short original explanation (40-character minimum), then deliberately reveals (i) governing legal rule, (ii) why the changed fact matters, and (iii) a common legal mistake. Neither typed-character count nor the model comparison is represented as automatic essay marking.
- **Provenance:** each variation maps to a unique **original** contract/torts/BNS case, and reuses that case's primary law or judgment links. The bank validator checks all 15 mappings, one-per-unit coverage and the existence of referenced authorities.
- **Privacy:** original written answers and any checked components remain on the page; leaving Case Practice discards all transfer screens. No essays uploaded or placed in localStorage; existing progress and backup schema unchanged.
- **Mobile accessibility:** answer-hiding, reveal focus, click/touch targets and legal source links tested under Chromium mobile viewport emulation at 320, 390 and 768 CSS pixels. This does **not** constitute testing an actual Android device or TalkBack.

## Transfer examples and legal caveats

| Earlier fact | Changed fact | Legal distinction learner must identify |
| --- | --- | --- |
| Conditional acceptance adds services | Written reply accepts same terms without conditions | Contract Act Section 7 absolute-acceptance analysis |
| Steel price doubles | Subsequent binding prohibition makes specified performance unlawful | Commercial hardship versus Contract Act Section 56 |
| Special contract-loss risk undisclosed | Material unusual loss communicated before agreement | Contract Act Section 73 foreseeability with causation/proof still needed |
| Vehicle remains unidentified | Vehicle positively identified despite driver fleeing | Section 161 scheme's **vehicle** identification requirement |
| Clock tower collapses with no inspection evidence | Credible maintenance and exceptional event evidence available | Res ipsa is a rebuttable evidential inference, not automatic liability |
| Harassment alleged while woman is alive | A death and specified dowry-linked evidence are alleged | BNS Sections 80 and 85–86: fact-specific statutory elements |
| Fractured tooth | Only transient pain/bruise, no statutory grievous injury | BNS hurt versus grievous hurt, subject to the actual evidence |

Each item is **original educational hypothetical analysis**, not a reported case, KSLU past examination paper, official examiner rubric, assurance of a court outcome, or evidence of learner mastery. Specific scheme/year applicability remains a separate unresolved source-review question.

## Tests and safeguards

1. Pure bank-validator tests ensure every changed situation maps to an existing source-linked case; each of the three subjects has five unit-distinct variations.
2. Weak-unit selection tests check that only relevant unit variations are chosen after a selected-case retry.
3. DOM browser-smoke simulates all **15** challenge flows, empty-response reveal gating, source links, zero persistent draft storage and clearing the page on navigation; also simulates a weak-case retry follow-up.
4. Real Chromium mobile viewport checks validate transfer controls at 320, 390 and 768 widths, reveal gating, accessible focus and source links.
5. Existing guided courses, spaced review, source ledgers, 45 original IRAC cases, weakness retry, legal accuracy references and Profile backups continue to be tested.

## Next research/priorities

1. Introduce *delayed* unseen transfer checks, not only immediate changed-fact questions. Avoid using same-session correct self-rating as proof of retention.
2. Expand the source-checked variation bank cautiously, prioritising learner-reported confusions and case-law/statute nuances instead of quantity.
3. Verify the precise KSLU admission-cohort scheme from genuine university notices and continue current-law updates.
4. Manual real-device Android Chrome / TalkBack test and remediate any access barriers.
5. Consider consent-based anonymous measurement of **which explanations are confusing**, without collecting identifiable essays or promising mastery scores.

# Version 51 — Constitutional Law–I independent practice and transfer

Date: 11 October 2026  
Course: KSLU three-year LL.B., Semester I  
Review scope: 15 original case hypotheticals, 3 in each imported Constitutional Law–I unit, plus 5 changed-facts variations.

## Why this release

The app already offered **45** independently drafted written IRAC cases covering Contract–I, Torts and BNS, with 15 changed-facts exercises and session-only weak-case retries. Constitutional Law–I still had only syllabus topic browsers and therefore lacked practice that asks the learner to identify a fundamental-rights issue **without a prefabricated heading**. Version 51 reuses the existing experience instead of adding a competing interface.

## Source texts

- **Constitution of India:** Legislative Department, Ministry of Law and Justice, government 2024 edition: <https://lddashboard.legislative.gov.in/sites/default/files/coi/COI_2024.pdf>. For subsequent amendments, consult the [official Legislative Department page](https://www.legislative.gov.in/document/constitution-of-india-in-english).
- **Citizenship Act, 1955:** India Code copy stated to be as on **15 April 2026**, <https://www.indiacode.nic.in/bitstream/123456789/1522/1/A1955-57Eng.pdf>. Citizenship facts remain date- and condition-sensitive; also check rules and current court interpretations.
- **Historic KSLU 2018–19 university first-year syllabus:** <https://kslu.karnataka.gov.in/214/syllabi/en>. Topic correspondence to Constitutional Law–I Units I–V was documented previously in `docs/kslu-syllabus-audit-v44.md`. The scheme applicable to a student's particular admission year is still unverified.

## Twenty new scenarios

| Unit | Three independent issue-spotting questions | Changed-facts exercise |
| --- | --- | --- |
| I — Constitution, Preamble, Citizenship | Preamble as interpretive aid versus freestanding claim; citizenship-by-birth requirements across dates; statutory citizenship registration | 2006-born child's parents' status becomes known |
| II — State, Judicial Review, Equality | Municipal local authority under Art. 12; municipal by-law under Arts. 13 and 19; arbitrary market fee under Art. 14 | A published and rational market-fee classification replaces personal preference |
| III — Protective discrimination and freedoms | Restaurant entry under Art. 15(2); public appointments under Art. 16; Arts. 19(1)(a) and 19(2) | An absolute criticism ban becomes narrow, viewpoint-neutral public-safety regulation |
| IV — Accused, life, religion | Art. 20(1) retroactive penal prohibition; Art. 22 ordinary-arrest safeguards; Art. 25 religious freedom and safety | Preventive detention requires a **different**, not nonexistent, Art. 22 safeguards analysis |
| V — Minorities, writs, property | Writs under Arts. 32 and 226; Art. 300A property after the 44th Amendment; Art. 30 minority educational institutions | A fundamental-right claim becomes a purely statutory writ controversy |

**Each original problem** has material facts, an unanswered legal issue, an educator-style issue–rule–application–conclusion reference outline, a common misconception and links to the relevant constitutional or citizenship text. The answer is hidden until the learner writes an independent short analysis. After reveal, the existing four-part checklist gives source-linked self-reflection; it is not scored by AI.

**Each changed-facts prompt** asks what legally changes when one decisive circumstance changes. Answers also remain hidden until the learner writes a response. No new learning-history localStorage keys were added and old spaced-review/backups are untouched.

## Accuracy limits

- The exercise models are **teaching explanations**, not official KSLU examinations, examiner-approved marking schemes or legal advice.
- For Constitutional Law, the operative text is only one part of legal analysis: Supreme Court and High Court precedent and factual context frequently determine the outcome. This release **does not verify individual judgment ratios**, and carefully avoids suggesting a quoted binding ruling that has not been checked.
- Preamble values should not be portrayed as automatically creating free-standing offences. Articles 32 and 226 have **different** jurisdictional scope. Article 300A continues to protect property by authority of law after removal of the former Part III right. Citizenship acquisition has **date-sensitive statutory criteria**. Article 22 contains **distinct ordinary arrest and preventive detention regimes**.
- Sources reflect the identified official editions and must be rechecked for later constitutional amendments, statute amendments, regulations, judicial decisions and a student's enrolled-cohort syllabus.

## Product quality and planned next stages

The app now has **60** original IRAC cases across **four** subjects and **20** changed-facts problems. The selection engine still offers five mixed cases (one per unit), skip-without-credit handling, session-only weak-case retry, and no fabricated scores. The four-subject selector reflows in two columns on mobile.

Verification gates: Node source/structure tests; all four subjects; case source URL whitelist; 20 parent-linked changed-fact prompts; 5-unit no-repeat rotation; JSDOM browser routing and answer hiding; Chromium 320/390/768-pixel viewport, touch and rubric interaction tests; GitHub Pages deployment.

**Next high-value gap:** Family Law–I: Hindu Law remains without independent case practice. Before building cases, check current Hindu Marriage Act, Hindu Succession Act (including daughters' coparcenary rights), Hindu Adoptions and Maintenance Act and Hindu Minority and Guardianship Act directly, and avoid outdated textbook propositions or oversimplified personal-law rules. Also conduct physical-device accessibility and current-cohort university notice review.

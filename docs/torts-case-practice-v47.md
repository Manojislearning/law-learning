# Release 47 — Mixed Law of Torts IRAC case practice

**Prepared:** 11 October 2026  
**KSLU course:** first-year, Semester I, Law of Torts.  
**Scope:** 15 newly authored educational fact patterns — three for each of the five imported KSLU topic units. **Not** actual past examination questions, professor-approved marking keys, legal advice, an admission-cohort syllabus certification or proof of improved student grades.

## What changed

- The existing **Case Practice** experience now switches between **Contract–I** and **Law of Torts**. The original 15 Contract–I cases remain unchanged; there are now **30 original case problems** across the two subjects.
- For either course, a five-problem session draws **one problem from each of the five units** and mixes their order, with the subject named but **unit number and legal issue concealed until answer reveal**.
- In-memory per-course selection history avoids repeating a case within a unit until all three alternatives have been encountered. Switching subjects does not mix up the history.
- The learner writes their own legal analysis before revealing an **Issue, Rule, Application, Conclusion** teaching outline and a **common trap**. Four explicit self-check statements identify the elements that need work. The optional source links include original Supreme Court judgments as well as official statutes.
- Answers and rubric choices remain inside the current page/session and are **not uploaded, stored in localStorage or assigned an invented score**. Existing review schedules, quiz data and backup schema are untouched.
- Torts has a direct practice link at the **subject** level and within **each unit** of the syllabus browser. The Home Case Practice caption now advertises both courses without another oversized home card.
- Chromium mobile emulation tests 320/390/768 CSS-pixel viewport sizes and keyboard focus; tests are not claims of physical Android or screen reader certification.

## New Torts case bank

| Syllabus unit | Original factual scenarios | Doctrinal / statutory point |
| --- | --- | --- |
| I: foundations | barred access without lost profits; lawful competition; municipal falling masonry | actionable legal wrong versus financial loss; civil versus criminal pathways |
| II: defences, vicarious liability | knowledge versus voluntary consent to risk; official jeep injury; employee's personal detour | volenti, course of employment, limits of blanket employer/state liability |
| III: negligence, nuisance and liability | collapsing public clock tower; hazardous gas escape; escaped industrial tank water | res ipsa loquitur, absolute liability, strict-versus-absolute distinction |
| IV: wrongs against person/property | unlawful detention; boundary encroachment; defamatory staff-wide publication | liberty and constitutional tort, property remedies, reputation |
| V: consumer and motor | unidentified-vehicle injury; post-August 2026 delayed MACT claim; defective fan plus unsafe fitting | Section 161 versus 164 claims, Section 166(3) 2026 proviso, Consumer Act 2019 goods/service definitions |

**Coverage is educational and incomplete:** Three selected problems per topic grouping do not cover every legal issue in the university outline. Some common-law foundations are illustrated through official higher-court judgments rather than statute sections because tort law is not wholly codified.

## Authority links used in the actual answer models

**Supreme Court of India (official `api.sci.gov.in`):**

- [Municipal Corporation of Delhi v Subhagwanti, AIR 1966 SC 1750](https://api.sci.gov.in/jonew/judis/2711.pdf): negligence and res ipsa loquitur.
- [State of Rajasthan v Vidyawati discussed in official judgment](https://api.sci.gov.in/jonew/judis/16776.pdf): governmental vicarious liability and limits of sovereign immunity.
- [M.C. Mehta hazardous-enterprise absolute liability discussed in official judgment](https://api.sci.gov.in/jonew/judis/26698.pdf): absolute/non-delegable hazardous-activity principle.
- [Rylands v Fletcher strict-liability exceptions discussed in official judgment](https://api.sci.gov.in/jonew/judis/17525.pdf).
- [Supreme Court, constitutional torts including Bhim Singh and Rudul Sah](https://api.sci.gov.in/supremecourt/2016/27156/27156_2016_3_1501_40744_Judgement_03-Jan-2023.pdf).
- [Supreme Court on encroachment and possible mandatory injunction](https://api.sci.gov.in/supremecourt/2008/13404/13404_2008_5_1501_41434_Judgement_02-Feb-2023.pdf).
- [Supreme Court on civil defamation evidence and remedies](https://api.sci.gov.in/jonew/judis/39447.pdf).

**Primary Acts, notifications and government schemes:**

- [Motor Vehicles Act, 1988](https://www.indiacode.nic.in/bitstream/123456789/1798/1/a1988-59.pdf).
- [2022 hit-and-run scheme, MoRTH](https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=1801656&lang=2&reg=48).
- [Jan Vishwas (Amendment of Provisions) Act, 2026](https://egazette.gov.in/WriteReadData/2026/271642.pdf) and [commencement](https://egazette.gov.in/WriteReadData/2026/274798.pdf).
- [Consumer Protection Act, 2019](https://www.indiacode.nic.in/bitstream/123456789/15256/1/a2019-35.pdf) and [2021 consumer jurisdiction rules](https://consumeraffairs.gov.in/public/upload/files/232278_1732705181.pdf).

## Risks and follow-up audits

1. **Legal application:** Original scenarios simplify evidence and defences. A different legally defensible conclusion may follow from additional facts; never treat IRAC outlines as exclusive solutions.
2. **Contemporary law:** Reconfirm amendments and binding decisions, particularly Section 166(3) filing requirements, ex-gratia compensation and post-2026 rules. None of the documents verifies the student's precise KSLU admission-year cohort.
3. **Breadth:** Add unseen nuisance, trespass to goods, defamation privileges, medical negligence and consumer commission procedural fact patterns after primary case research, but prefer evaluating learner performance over endless question volume.
4. **Better outcomes:** Pilot student-rated clarity, answer quality and retention with explicit consent; track recurring legal misconceptions without retaining essays by default.
5. **Mobile:** Run actual Android Chrome, TalkBack and keyboard tests. Chromium viewport emulation is an automated approximation.

**Release gate:** Node test suite including syntax validation, tort question structure, balance, source whitelisting, legacy Contract–I regression, browser interaction and Chromium phone widths must all succeed. GitHub Pages publication on final commit is independently checked.

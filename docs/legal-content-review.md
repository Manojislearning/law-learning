# A4 — KSLU First-Year Legal Content Review

Last ledger build: 11 October 2026.
Version: 32.
Scope: **the 30 imported units of Semester I** in `KSLU_FIRST_SEMESTER`. The rest of the six-semester overview is not treated as verified.

## Verification hierarchy

1. **KSLU official syllabus PDFs (authoritative for the enrolled cohort).** Use the original university-issued three-year LL.B. and amended new-criminal-law syllabus. The [official KSLU syllabi index](https://kslu.karnataka.gov.in/214/syllabi/en) lists them. Select the document that applies to the student's admission year. An index link confirms only that documents are published; it does not establish the exact wording of an imported unit.
2. **India Code and Legislative Department (authoritative for statutes).** Confirm amended sections and commencement dates directly, rather than relying on old summaries.
3. **Official judgment texts (authoritative for case law).** Record court, case number, date, reported citation, relevant facts and ratio before declaring a case verified.
4. **Secondary course notes, teaching articles and historical question-paper archives.** These can suggest topics, but do not automatically make a statutory claim or exam question authentic.

## Implementation

`content-ledger.js` contains:
- A stable `sem1-cX-uY` ID for every imported unit.
- Course and unit indexes, semester and title.
- Curriculum verification status, which is **needs-review** for all 30 imported units.
- Applicable authoritative *source links* where found, and a statement describing the scope of source verification.
- Dated, narrowly stated claims checked against source indexes.
- Warning messages for outdated or uncertain law references.

A compact **Sources and review status** panel appears on an individual syllabus topic screen; it defaults to collapsed for a minimal interface. Material risks are visible outside the panel.

## Important current warnings

- **Law of Torts, Unit V:** The imported text references the Consumer Protection Act, **1986**, whereas the current law is the Consumer Protection Act, **2019**. The enrolled cohort's syllabus may include historical content, but modern legal study must identify this difference explicitly.
- **Contract I, Unit V:** The imported Specific Relief Act section list may reflect an older course outline. Confirm amendments and prescribed topics before teaching it as current law.
- **Criminal Law I (all units):** BNS 2023 is linked to India Code. The entire unit-wise section crosswalk is **not yet audited**; confirm every offence, statutory section and applicability date.
- **Constitution and Hindu Law:** Statutory source indexes are linked, but relevant amendments and current case-law interpretations need review.
- **Question-paper source:** Existing 2022 Contract–I model answers are study drafts with secondary archive links, not confirmed university answer keys or an officially supplied examiner rubric.

## Next verification batches

1. Obtain the applicable official KSLU three-year LL.B. syllabus PDF and amended first-year papers. Compare the 30 imported unit headings and full topic wording line by line.
2. Verify **Contract–I Unit I**: sections 2(a)–(d), 3–9, 10 and 25 against India Code; separate statutory wording, settled judicial principle and hypothetical scenarios.
3. Verify the other four Contract–I units and amended Specific Relief Act.
4. Audit Law of Torts Unit V against the Consumer Protection Act 2019 and relevant Motor Vehicles legislation, while retaining historical references where syllabus requires them.
5. Check BNS chapters and sections in all five Criminal Law–I units against the university's amended syllabus.
6. Verify Constitutional Law, Hindu Law, and English unit readings with primary sources and course PDFs.
7. Check exact scanned originals of archived examination papers. Mark source, academic year, number/marks and question as verified only after an exact comparison.

## Publishing rules

- Do not elevate `syllabusStatus` to `verified` because its `sourceIds` is non-empty.
- Link checks prove the source exists, **not** that a long AI lesson or case analysis has been legally audited.
- Every course/year should have the applicable curriculum year and last-review date before claiming complete coverage.
- Correcting errors must preserve stable unit IDs to avoid breaking saved progress and deep links.
- Prefer summaries and links to source PDFs rather than copying substantial copyrighted teaching content.
- Mark hypothetical examples as hypothetical and identify major statutory changes explicitly.

## Quality gate

Run `node --test tests/*.test.mjs` on every push. `tests/content-ledger.test.mjs` currently requires:
- Exactly 30 stable, unique unit entries corresponding to the six imported Semester I subjects.
- Official HTTPS source domains, valid source references, and no falsely verified unit text.
- Warnings for old Consumer Protection and Specific Relief syllabus references.
- Source-checked claims that remain distinct from comprehensive legal review.

These checks guarantee **metadata integrity**, not substantive legal accuracy. A qualified human legal review is still required.

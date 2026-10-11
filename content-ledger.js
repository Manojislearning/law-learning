/* Statute and curriculum provenance ledger: A4. All individual syllabus units require review. */
(function(root){
"use strict";
var data={
  "schema": 1,
  "scope": "KSLU 3-year LL.B. — imported Semester I draft",
  "reviewPolicy": "All 30 imported Semester I broad topic outlines were compared against KSLU's published 2018–19 syllabus and its 2024 BNS curriculum circular. This is edition-level outline matching ONLY; enrolled-cohort applicability, subsequent amendments, every legal teaching claim and examinations are not fully verified. Selected BNS and Consumer Act claims now have a separate narrow statutory lawAudit flag; no unit is thereby certified as fully source-verified.",
  "publishedForCohort": "unconfirmed",
  "sources": {
    "kslu-index": {
      "title": "Karnataka State Law University — Official Syllabi",
      "url": "https://kslu.karnataka.gov.in/214/syllabi/en",
      "publisher": "Karnataka State Law University",
      "kind": "curriculum-index",
      "verifiedScope": "University publishes links to 3-year LL.B. and criminal-law syllabi; individual imported unit wording awaits checking against the applicable cohort PDF."
    },
    "contract-act": {
      "title": "The Indian Contract Act, 1872",
      "url": "https://www.indiacode.nic.in/handle/123456789/2187",
      "publisher": "India Code, Government of India",
      "kind": "statute",
      "verifiedScope": "Existence, title and statutory section index available; current amendments and case-law applications must be reviewed."
    },
    "specific-relief": {
      "title": "The Specific Relief Act, 1963",
      "url": "https://www.indiacode.nic.in/indiacode/handle/123456789/1583?view_type=browse",
      "publisher": "India Code, Government of India",
      "kind": "statute",
      "verifiedScope": "Act title and source index verified; verify amended provisions before relying on old unit section numbers."
    },
    "hindu-marriage": {
      "title": "The Hindu Marriage Act, 1955",
      "url": "https://www.indiacode.nic.in/indiacode/handle/123456789/1560?sam_handle=123456789%2F1362&view_type=search",
      "publisher": "India Code, Government of India",
      "kind": "statute",
      "verifiedScope": "Existence and scope of Act linked; unit syllabus wording and amendments still need review."
    },
    "bns-2023": {
      "title": "The Bharatiya Nyaya Sanhita, 2023",
      "url": "https://www.indiacode.nic.in/indiacode/handle/123456789/20062?col=123456789%2F1362&view_type=search",
      "publisher": "India Code, Government of India",
      "kind": "statute",
      "verifiedScope": "BNS 2023 Act source linked; subsection-by-subsection syllabus accuracy needs review."
    },
    "consumer-2019": {
      "title": "The Consumer Protection Act, 2019",
      "url": "https://www.indiacode.nic.in/indiacode/handle/123456789/16103?view_type=browse",
      "publisher": "India Code, Government of India",
      "kind": "statute",
      "verifiedScope": "The 2019 Act source is linked; imported teaching text refers to the older 1986 Act."
    },
    "constitution-source": {
      "title": "Constitution of India — Official primary text",
      "url": "https://legislative.gov.in/constitution-of-india/",
      "publisher": "Legislative Department, Government of India",
      "kind": "primary-text-index",
      "verifiedScope": "Reference link supplied; up-to-date text, amendments and curriculum content still require review."
    },
    "kslu-2018-p6": {
      "title": "KSLU official three-year LL.B. syllabus — Contract–I Units I–II (2018–19)",
      "url": "https://kslu.karnataka.gov.in/storage/pdf-files/%E0%B3%A9%E0%B2%B5%E0%B2%B0%E0%B3%8D%E0%B2%B7%E0%B2%A6%20%E0%B2%8E%E0%B2%B2%E0%B3%8D%E0%B2%8E%E0%B2%B2%E0%B3%8D%20%E0%B2%AC%E0%B2%BF%20%E0%B2%AF%20%E0%B2%AA%E0%B2%B0%E0%B2%BF%E0%B2%B7%E0%B3%8D%E0%B2%95%E0%B3%83%E0%B2%A4%20%E0%B2%AA%E0%B2%A0%E0%B3%8D%E0%B2%AF%E0%B2%95%E0%B3%8D%E0%B2%B0%E0%B2%AE.pdf",
      "publisher": "Karnataka State Law University",
      "kind": "official-syllabus-pdf",
      "verifiedScope": "The official 2018–19 PDF includes Contract–I Units I–II headings and topics. A current-cohort match is not established."
    },
    "kslu-2018-contract-unit3": {
      "title": "KSLU official historical 3-year LL.B. syllabus — Contract–I (2018–19)",
      "url": "https://kslu.karnataka.gov.in/storage/pdf-files/%E0%B3%A9%E0%B2%B5%E0%B2%B0%E0%B3%8D%E0%B2%B7%E0%B2%A6%20%E0%B2%8E%E0%B2%B2%E0%B3%8D%E0%B2%8E%E0%B2%B2%E0%B3%8D%20%E0%B2%AC%E0%B2%BF%20%E0%B2%AF%20%E0%B2%AA%E0%B2%B0%E0%B2%BF%E0%B2%B7%E0%B3%8D%E0%B2%95%E0%B3%83%E0%B2%A4%20%E0%B2%AA%E0%B2%A0%E0%B3%8D%E0%B2%AF%E0%B2%95%E0%B3%8D%E0%B2%B0%E0%B2%AE.pdf",
      "publisher": "Karnataka State Law University",
      "kind": "official-syllabus-pdf",
      "verifiedScope": "Historical official course syllabus reference; Unit III wording and applicability to a particular admission cohort have not been independently confirmed."
    },
    "specific-relief-amended-pdf": {
      "title": "Specific Relief Act, 1963 as amended (India Code PDF)",
      "url": "https://www.indiacode.nic.in/bitstream/123456789/1583/7/A1963-47.pdf",
      "publisher": "India Code, Government of India",
      "kind": "statute-primary-text",
      "verifiedScope": "Contains the 2018 substituted provisions for Sections 10, 14 and 20 and chapter/section texts through Section 42; verify future amendments before use."
    },
    "kslu-2018-llb": {
      "title": "KSLU — Revised 3-year LL.B. syllabus, 2018–19 (university PDF)",
      "url": "https://kslu.karnataka.gov.in/storage/pdf-files/%E0%B3%A9%E0%B2%B5%E0%B2%B0%E0%B3%8D%E0%B2%B7%E0%B2%A6%20%E0%B2%8E%E0%B2%B2%E0%B3%8D%E0%B2%8E%E0%B2%B2%E0%B3%8D%20%E0%B2%AC%E0%B2%BF%20%E0%B2%AF%20%E0%B2%AA%E0%B2%B0%E0%B2%BF%E0%B2%B7%E0%B3%8D%E0%B2%95%E0%B3%83%E0%B2%A4%20%E0%B2%AA%E0%B2%A0%E0%B3%8D%E0%B2%AF%E0%B2%95%E0%B3%8D%E0%B2%B0%E0%B2%AE.pdf",
      "publisher": "Karnataka State Law University",
      "kind": "official-syllabus-pdf",
      "verifiedScope": "2018–19 printed pages 3–14, including semester subjects and original Units I–V for Constitution, Contract, Torts, Hindu Law and conditional English. Not independently certified for every later admission cohort."
    },
    "kslu-2024-criminal": {
      "title": "KSLU circular KSLU/Aca/BOS/2024-25/1586: three new criminal laws",
      "url": "https://kslu.karnataka.gov.in/storage/pdf-files/Syllabusof3NewCriminalLaws.pdf",
      "publisher": "Karnataka State Law University",
      "kind": "official-curriculum-amendment-pdf",
      "verifiedScope": "Circular dated 26 September 2024 introduces BNS Criminal Law–I from academic year 2024–25. Appendix I printed pages 1–2 set out five BNS units. Subsequent cohort amendments must still be checked."
    },
    "bns-commencement-notification": {
      "title": "MHA — BNS commencement S.O. 850(E), 23 February 2024",
      "url": "https://www.mha.gov.in/sites/default/files/BhartiyaNyayaSanhita_24022024.pdf",
      "publisher": "Ministry of Home Affairs, Government of India",
      "kind": "official-commencement-notification",
      "verifiedScope": "Notification sets 1 July 2024 commencement for BNS provisions except Section 106(2); later notifications must be checked for any subsequent change."
    },
    "consumer-jurisdiction-2021": {
      "title": "Consumer Protection commission jurisdiction Rules, 2021",
      "url": "https://consumeraffairs.gov.in/public/upload/files/232278_1732705181.pdf",
      "publisher": "Department of Consumer Affairs, Government of India",
      "kind": "official-gazette-rules",
      "verifiedScope": "Rules notified 30 December 2021 provide ₹50 lakh/₹2 crore commission pecuniary bands based on consideration paid. Check any later amendments."
    }
  },
  "units": [
    {
      "id": "sem1-c1-u1",
      "semester": 1,
      "courseIndex": 0,
      "unitIndex": 0,
      "course": "Constitutional Law – I",
      "title": "Constitution, Preamble & Citizenship",
      "syllabusStatus": "needs-review",
      "lastReviewed": null,
      "sourceIds": [
        "kslu-index",
        "constitution-source",
        "kslu-2018-llb"
      ],
      "statuteStatus": "needs-review",
      "warnings": [],
      "outlineAudit": {
        "status": "published-outline-compared",
        "sourceId": "kslu-2018-llb",
        "printedPage": 4,
        "checkedOn": "2026-10-11",
        "scope": "Summary topics compared with KSLU 2018–19 syllabus. Paraphrased headings, not an exact-text reproduction.",
        "caution": "Confirm the prescribed scheme and any later circulars for this admission cohort."
      }
    },
    {
      "id": "sem1-c1-u2",
      "semester": 1,
      "courseIndex": 0,
      "unitIndex": 1,
      "course": "Constitutional Law – I",
      "title": "State, Law, Judicial Review & Equality",
      "syllabusStatus": "needs-review",
      "lastReviewed": null,
      "sourceIds": [
        "kslu-index",
        "constitution-source",
        "kslu-2018-llb"
      ],
      "statuteStatus": "needs-review",
      "warnings": [],
      "outlineAudit": {
        "status": "published-outline-compared",
        "sourceId": "kslu-2018-llb",
        "printedPage": 4,
        "checkedOn": "2026-10-11",
        "scope": "Summary topics compared with KSLU 2018–19 syllabus. Paraphrased headings, not an exact-text reproduction.",
        "caution": "Confirm the prescribed scheme and any later circulars for this admission cohort."
      }
    },
    {
      "id": "sem1-c1-u3",
      "semester": 1,
      "courseIndex": 0,
      "unitIndex": 2,
      "course": "Constitutional Law – I",
      "title": "Protective Discrimination & Article 19 Freedoms",
      "syllabusStatus": "needs-review",
      "lastReviewed": null,
      "sourceIds": [
        "kslu-index",
        "constitution-source",
        "kslu-2018-llb"
      ],
      "statuteStatus": "needs-review",
      "warnings": [],
      "outlineAudit": {
        "status": "published-outline-compared",
        "sourceId": "kslu-2018-llb",
        "printedPage": 4,
        "checkedOn": "2026-10-11",
        "scope": "Summary topics compared with KSLU 2018–19 syllabus. Paraphrased headings, not an exact-text reproduction.",
        "caution": "Confirm the prescribed scheme and any later circulars for this admission cohort."
      }
    },
    {
      "id": "sem1-c1-u4",
      "semester": 1,
      "courseIndex": 0,
      "unitIndex": 3,
      "course": "Constitutional Law – I",
      "title": "Rights of Accused, Life & Religion",
      "syllabusStatus": "needs-review",
      "lastReviewed": null,
      "sourceIds": [
        "kslu-index",
        "constitution-source",
        "kslu-2018-llb"
      ],
      "statuteStatus": "needs-review",
      "warnings": [],
      "outlineAudit": {
        "status": "published-outline-compared",
        "sourceId": "kslu-2018-llb",
        "printedPage": 4,
        "checkedOn": "2026-10-11",
        "scope": "Summary topics compared with KSLU 2018–19 syllabus. Paraphrased headings, not an exact-text reproduction.",
        "caution": "Confirm the prescribed scheme and any later circulars for this admission cohort."
      }
    },
    {
      "id": "sem1-c1-u5",
      "semester": 1,
      "courseIndex": 0,
      "unitIndex": 4,
      "course": "Constitutional Law – I",
      "title": "Minority Rights, Writs, DPSP & Duties",
      "syllabusStatus": "needs-review",
      "lastReviewed": null,
      "sourceIds": [
        "kslu-index",
        "constitution-source",
        "kslu-2018-llb"
      ],
      "statuteStatus": "needs-review",
      "warnings": [],
      "outlineAudit": {
        "status": "published-outline-compared",
        "sourceId": "kslu-2018-llb",
        "printedPage": 5,
        "checkedOn": "2026-10-11",
        "scope": "Summary topics compared with KSLU 2018–19 syllabus. Paraphrased headings, not an exact-text reproduction.",
        "caution": "Confirm the prescribed scheme and any later circulars for this admission cohort."
      }
    },
    {
      "id": "sem1-c2-u1",
      "semester": 1,
      "courseIndex": 1,
      "unitIndex": 0,
      "course": "Contract – I",
      "title": "Formation & Consideration",
      "syllabusStatus": "needs-review",
      "lastReviewed": null,
      "sourceIds": [
        "kslu-index",
        "contract-act",
        "kslu-2018-p6",
        "kslu-2018-llb"
      ],
      "statuteStatus": "needs-review",
      "warnings": [
        "The Unit I topic outline matches KSLU's official 2018–19 PDF; applicability to later admission cohorts still needs confirmation."
      ],
      "syllabusEditionEvidence": "Official 2018–19 KSLU syllabus, printed page 6 (Contract–I Unit I); current admission-cohort match not confirmed",
      "outlineAudit": {
        "status": "published-outline-compared",
        "sourceId": "kslu-2018-llb",
        "printedPage": 6,
        "checkedOn": "2026-10-11",
        "scope": "Summary topics compared with KSLU 2018–19 syllabus. Paraphrased headings, not an exact-text reproduction.",
        "caution": "Confirm the prescribed scheme and any later circulars for this admission cohort."
      }
    },
    {
      "id": "sem1-c2-u2",
      "semester": 1,
      "courseIndex": 1,
      "unitIndex": 1,
      "course": "Contract – I",
      "title": "Capacity, Free Consent & Void Agreements",
      "syllabusStatus": "needs-review",
      "lastReviewed": null,
      "sourceIds": [
        "kslu-index",
        "contract-act",
        "kslu-2018-p6",
        "kslu-2018-llb"
      ],
      "statuteStatus": "needs-review",
      "warnings": [
        "This lesson follows KSLU's official 2018–19 Contract–I Unit II outline; confirm the syllabus prescribed for your admission year."
      ],
      "syllabusEditionEvidence": "Contract–I Unit II topic list appears in official KSLU 2018–19 syllabus PDF; applicability to a later admission cohort is unconfirmed.",
      "outlineAudit": {
        "status": "published-outline-compared",
        "sourceId": "kslu-2018-llb",
        "printedPage": 6,
        "checkedOn": "2026-10-11",
        "scope": "Summary topics compared with KSLU 2018–19 syllabus. Paraphrased headings, not an exact-text reproduction.",
        "caution": "Confirm the prescribed scheme and any later circulars for this admission cohort."
      }
    },
    {
      "id": "sem1-c2-u3",
      "semester": 1,
      "courseIndex": 1,
      "unitIndex": 2,
      "course": "Contract – I",
      "title": "Performance & Discharge",
      "syllabusStatus": "needs-review",
      "lastReviewed": null,
      "sourceIds": [
        "kslu-index",
        "contract-act",
        "kslu-2018-contract-unit3",
        "kslu-2018-llb"
      ],
      "statuteStatus": "needs-review",
      "warnings": [
        "These lessons follow the imported Performance & Discharge outline. Confirm the syllabus prescribed for your admission cohort."
      ],
      "syllabusEditionEvidence": "Historical KSLU syllabus reference available; unit wording and current admission-cohort applicability require checking.",
      "outlineAudit": {
        "status": "published-outline-compared",
        "sourceId": "kslu-2018-llb",
        "printedPage": 6,
        "checkedOn": "2026-10-11",
        "scope": "Summary topics compared with KSLU 2018–19 syllabus. Paraphrased headings, not an exact-text reproduction.",
        "caution": "Confirm the prescribed scheme and any later circulars for this admission cohort."
      }
    },
    {
      "id": "sem1-c2-u4",
      "semester": 1,
      "courseIndex": 1,
      "unitIndex": 3,
      "course": "Contract – I",
      "title": "Breach, Damages & Quasi-Contracts",
      "syllabusStatus": "needs-review",
      "lastReviewed": null,
      "sourceIds": [
        "kslu-index",
        "contract-act",
        "kslu-2018-contract-unit3",
        "kslu-2018-llb"
      ],
      "statuteStatus": "needs-review",
      "warnings": [
        "These lessons follow the historical Unit IV damages/quasi-contract outline. Confirm the syllabus for your admission cohort."
      ],
      "syllabusEditionEvidence": "Historical KSLU Contract–I syllabus reference; edition applicability and exact Unit IV wording have not been audited for the current admission cohort.",
      "outlineAudit": {
        "status": "published-outline-compared",
        "sourceId": "kslu-2018-llb",
        "printedPage": 6,
        "checkedOn": "2026-10-11",
        "scope": "Summary topics compared with KSLU 2018–19 syllabus. Paraphrased headings, not an exact-text reproduction.",
        "caution": "Confirm the prescribed scheme and any later circulars for this admission cohort."
      }
    },
    {
      "id": "sem1-c2-u5",
      "semester": 1,
      "courseIndex": 1,
      "unitIndex": 4,
      "course": "Contract – I",
      "title": "Specific Relief & Injunctions",
      "syllabusStatus": "needs-review",
      "lastReviewed": null,
      "sourceIds": [
        "kslu-index",
        "specific-relief",
        "specific-relief-amended-pdf",
        "kslu-2018-llb"
      ],
      "statuteStatus": "needs-review",
      "warnings": [
        "The imported Specific Relief section list may reflect an older syllabus. Check current amendments before studying.",
        "Historical syllabus section references may predate the Specific Relief (Amendment) Act, 2018: Section 10 is now qualified by statutory bars, Section 14 was substituted, and Section 20 now concerns substituted performance.",
        "Rectification, cancellation and declaratory decrees fall under Sections 26, 31 and 34 respectively, beyond the imported Unit V section list. These distinctions are included as clearly labelled related study material."
      ],
      "syllabusEditionEvidence": "Imported Specific Relief topics derive from a historical KSLU outline; applicable admission-year syllabus has not been verified.",
      "outlineAudit": {
        "status": "published-outline-compared",
        "sourceId": "kslu-2018-llb",
        "printedPage": 6,
        "checkedOn": "2026-10-11",
        "scope": "Summary topics compared with KSLU 2018–19 syllabus. Paraphrased headings, not an exact-text reproduction.",
        "caution": "The historical Specific Relief unit contains wording and section numbers affected by the 2018 amendment."
      }
    },
    {
      "id": "sem1-c3-u1",
      "semester": 1,
      "courseIndex": 2,
      "unitIndex": 0,
      "course": "Law of Torts",
      "title": "Nature & Foundations of Tort",
      "syllabusStatus": "needs-review",
      "lastReviewed": null,
      "sourceIds": [
        "kslu-index",
        "kslu-2018-llb"
      ],
      "statuteStatus": "needs-review",
      "warnings": [],
      "outlineAudit": {
        "status": "published-outline-compared",
        "sourceId": "kslu-2018-llb",
        "printedPage": 8,
        "checkedOn": "2026-10-11",
        "scope": "Summary topics compared with KSLU 2018–19 syllabus. Paraphrased headings, not an exact-text reproduction.",
        "caution": "Confirm the prescribed scheme and any later circulars for this admission cohort."
      }
    },
    {
      "id": "sem1-c3-u2",
      "semester": 1,
      "courseIndex": 2,
      "unitIndex": 1,
      "course": "Law of Torts",
      "title": "General Defences & Vicarious Liability",
      "syllabusStatus": "needs-review",
      "lastReviewed": null,
      "sourceIds": [
        "kslu-index",
        "kslu-2018-llb"
      ],
      "statuteStatus": "needs-review",
      "warnings": [],
      "outlineAudit": {
        "status": "published-outline-compared",
        "sourceId": "kslu-2018-llb",
        "printedPage": 8,
        "checkedOn": "2026-10-11",
        "scope": "Summary topics compared with KSLU 2018–19 syllabus. Paraphrased headings, not an exact-text reproduction.",
        "caution": "Confirm the prescribed scheme and any later circulars for this admission cohort."
      }
    },
    {
      "id": "sem1-c3-u3",
      "semester": 1,
      "courseIndex": 2,
      "unitIndex": 2,
      "course": "Law of Torts",
      "title": "Negligence, Nuisance & Liability",
      "syllabusStatus": "needs-review",
      "lastReviewed": null,
      "sourceIds": [
        "kslu-index",
        "kslu-2018-llb"
      ],
      "statuteStatus": "needs-review",
      "warnings": [],
      "outlineAudit": {
        "status": "published-outline-compared",
        "sourceId": "kslu-2018-llb",
        "printedPage": 8,
        "checkedOn": "2026-10-11",
        "scope": "Summary topics compared with KSLU 2018–19 syllabus. Paraphrased headings, not an exact-text reproduction.",
        "caution": "Confirm the prescribed scheme and any later circulars for this admission cohort."
      }
    },
    {
      "id": "sem1-c3-u4",
      "semester": 1,
      "courseIndex": 2,
      "unitIndex": 3,
      "course": "Law of Torts",
      "title": "Torts Against Person & Property",
      "syllabusStatus": "needs-review",
      "lastReviewed": null,
      "sourceIds": [
        "kslu-index",
        "kslu-2018-llb"
      ],
      "statuteStatus": "needs-review",
      "warnings": [],
      "outlineAudit": {
        "status": "published-outline-compared",
        "sourceId": "kslu-2018-llb",
        "printedPage": 8,
        "checkedOn": "2026-10-11",
        "scope": "Summary topics compared with KSLU 2018–19 syllabus. Paraphrased headings, not an exact-text reproduction.",
        "caution": "Confirm the prescribed scheme and any later circulars for this admission cohort."
      }
    },
    {
      "id": "sem1-c3-u5",
      "semester": 1,
      "courseIndex": 2,
      "unitIndex": 4,
      "course": "Law of Torts",
      "title": "Consumer & Motor Vehicle Law",
      "syllabusStatus": "needs-review",
      "lastReviewed": null,
      "sourceIds": [
        "kslu-index",
        "consumer-2019",
        "kslu-2018-llb",
        "consumer-jurisdiction-2021"
      ],
      "statuteStatus": "needs-review",
      "warnings": [
        "The imported unit refers to the Consumer Protection Act, 1986. Current study must distinguish the Consumer Protection Act, 2019 and verify the cohort's prescribed syllabus.",
        "Consumer commission pecuniary bands under the 2021 Jurisdiction Rules are based on consideration paid: District up to ₹50 lakh, State above ₹50 lakh through ₹2 crore, National above ₹2 crore; recheck later amendments."
      ],
      "outlineAudit": {
        "status": "published-outline-compared",
        "sourceId": "kslu-2018-llb",
        "printedPage": 8,
        "checkedOn": "2026-10-11",
        "scope": "Summary topics compared with KSLU 2018–19 syllabus. Paraphrased headings, not an exact-text reproduction.",
        "caution": "The 2018 syllabus explicitly cites the repealed Consumer Protection Act, 1986; teaching current law requires checking the 2019 Act."
      },
      "lawAudit": {
        "status": "selected-provisions-checked",
        "checkedOn": "2026-10-11",
        "studyRoute": "consumer",
        "scope": "Selected provisions of Consumer Protection Act, 2019 and 2021 pecuniary jurisdiction rules checked. 1986 KSLU topic wording retained as historical syllabus evidence."
      }
    },
    {
      "id": "sem1-c4-u1",
      "semester": 1,
      "courseIndex": 3,
      "unitIndex": 0,
      "course": "Family Law – I: Hindu Law",
      "title": "Sources & Schools of Hindu Law",
      "syllabusStatus": "needs-review",
      "lastReviewed": null,
      "sourceIds": [
        "kslu-index",
        "kslu-2018-llb"
      ],
      "statuteStatus": "needs-review",
      "warnings": [],
      "outlineAudit": {
        "status": "published-outline-compared",
        "sourceId": "kslu-2018-llb",
        "printedPage": 10,
        "checkedOn": "2026-10-11",
        "scope": "Summary topics compared with KSLU 2018–19 syllabus. Paraphrased headings, not an exact-text reproduction.",
        "caution": "Confirm the prescribed scheme and any later circulars for this admission cohort."
      }
    },
    {
      "id": "sem1-c4-u2",
      "semester": 1,
      "courseIndex": 3,
      "unitIndex": 1,
      "course": "Family Law – I: Hindu Law",
      "title": "Marriage & Matrimonial Remedies",
      "syllabusStatus": "needs-review",
      "lastReviewed": null,
      "sourceIds": [
        "kslu-index",
        "hindu-marriage",
        "kslu-2018-llb"
      ],
      "statuteStatus": "needs-review",
      "warnings": [],
      "outlineAudit": {
        "status": "published-outline-compared",
        "sourceId": "kslu-2018-llb",
        "printedPage": 10,
        "checkedOn": "2026-10-11",
        "scope": "Summary topics compared with KSLU 2018–19 syllabus. Paraphrased headings, not an exact-text reproduction.",
        "caution": "Confirm the prescribed scheme and any later circulars for this admission cohort."
      }
    },
    {
      "id": "sem1-c4-u3",
      "semester": 1,
      "courseIndex": 3,
      "unitIndex": 2,
      "course": "Family Law – I: Hindu Law",
      "title": "Hindu Joint Family",
      "syllabusStatus": "needs-review",
      "lastReviewed": null,
      "sourceIds": [
        "kslu-index",
        "kslu-2018-llb"
      ],
      "statuteStatus": "needs-review",
      "warnings": [],
      "outlineAudit": {
        "status": "published-outline-compared",
        "sourceId": "kslu-2018-llb",
        "printedPage": 10,
        "checkedOn": "2026-10-11",
        "scope": "Summary topics compared with KSLU 2018–19 syllabus. Paraphrased headings, not an exact-text reproduction.",
        "caution": "Confirm the prescribed scheme and any later circulars for this admission cohort."
      }
    },
    {
      "id": "sem1-c4-u4",
      "semester": 1,
      "courseIndex": 3,
      "unitIndex": 3,
      "course": "Family Law – I: Hindu Law",
      "title": "Inheritance & Succession",
      "syllabusStatus": "needs-review",
      "lastReviewed": null,
      "sourceIds": [
        "kslu-index",
        "kslu-2018-llb"
      ],
      "statuteStatus": "needs-review",
      "warnings": [],
      "outlineAudit": {
        "status": "published-outline-compared",
        "sourceId": "kslu-2018-llb",
        "printedPage": 10,
        "checkedOn": "2026-10-11",
        "scope": "Summary topics compared with KSLU 2018–19 syllabus. Paraphrased headings, not an exact-text reproduction.",
        "caution": "Confirm the prescribed scheme and any later circulars for this admission cohort."
      }
    },
    {
      "id": "sem1-c4-u5",
      "semester": 1,
      "courseIndex": 3,
      "unitIndex": 4,
      "course": "Family Law – I: Hindu Law",
      "title": "Guardianship, Adoption & Maintenance",
      "syllabusStatus": "needs-review",
      "lastReviewed": null,
      "sourceIds": [
        "kslu-index",
        "kslu-2018-llb"
      ],
      "statuteStatus": "needs-review",
      "warnings": [],
      "outlineAudit": {
        "status": "published-outline-compared",
        "sourceId": "kslu-2018-llb",
        "printedPage": 10,
        "checkedOn": "2026-10-11",
        "scope": "Summary topics compared with KSLU 2018–19 syllabus. Paraphrased headings, not an exact-text reproduction.",
        "caution": "Confirm the prescribed scheme and any later circulars for this admission cohort."
      }
    },
    {
      "id": "sem1-c5-u1",
      "semester": 1,
      "courseIndex": 4,
      "unitIndex": 0,
      "course": "Criminal Law – I: Bharatiya Nyaya Sanhita (BNS), 2023",
      "title": "General Principles, Liability & Punishments",
      "syllabusStatus": "needs-review",
      "lastReviewed": null,
      "sourceIds": [
        "kslu-index",
        "bns-2023",
        "kslu-2024-criminal",
        "bns-commencement-notification"
      ],
      "statuteStatus": "needs-review",
      "warnings": [
        "Check the precise BNS section references against the official Act, including the relevant commencement dates."
      ],
      "outlineAudit": {
        "status": "published-outline-compared",
        "sourceId": "kslu-2024-criminal",
        "printedPage": 1,
        "checkedOn": "2026-10-11",
        "scope": "Summary topics compared with Appendix I for Criminal Law–I: BNS, 2023 (introduced for academic year 2024–25).",
        "caution": "Confirm the prescribed scheme and any later circulars for this admission cohort."
      },
      "lawAudit": {
        "status": "selected-provisions-checked",
        "checkedOn": "2026-10-11",
        "studyRoute": "bns",
        "scope": "Selected BNS statutory section mappings checked against the India Code enacted Act and commencement notification; full offences, case law and later notifications remain to be audited."
      }
    },
    {
      "id": "sem1-c5-u2",
      "semester": 1,
      "courseIndex": 4,
      "unitIndex": 1,
      "course": "Criminal Law – I: Bharatiya Nyaya Sanhita (BNS), 2023",
      "title": "Inchoate Crimes & Offences Against Women/Children",
      "syllabusStatus": "needs-review",
      "lastReviewed": null,
      "sourceIds": [
        "kslu-index",
        "bns-2023",
        "kslu-2024-criminal",
        "bns-commencement-notification"
      ],
      "statuteStatus": "needs-review",
      "warnings": [
        "Check the precise BNS section references against the official Act, including the relevant commencement dates."
      ],
      "outlineAudit": {
        "status": "published-outline-compared",
        "sourceId": "kslu-2024-criminal",
        "printedPage": 1,
        "checkedOn": "2026-10-11",
        "scope": "Summary topics compared with Appendix I for Criminal Law–I: BNS, 2023 (introduced for academic year 2024–25).",
        "caution": "Confirm the prescribed scheme and any later circulars for this admission cohort."
      },
      "lawAudit": {
        "status": "selected-provisions-checked",
        "checkedOn": "2026-10-11",
        "studyRoute": "bns",
        "scope": "Selected BNS statutory section mappings checked against the India Code enacted Act and commencement notification; full offences, case law and later notifications remain to be audited."
      }
    },
    {
      "id": "sem1-c5-u3",
      "semester": 1,
      "courseIndex": 4,
      "unitIndex": 2,
      "course": "Criminal Law – I: Bharatiya Nyaya Sanhita (BNS), 2023",
      "title": "Offences Against the Human Body",
      "syllabusStatus": "needs-review",
      "lastReviewed": null,
      "sourceIds": [
        "kslu-index",
        "bns-2023",
        "kslu-2024-criminal",
        "bns-commencement-notification"
      ],
      "statuteStatus": "needs-review",
      "warnings": [
        "Check the precise BNS section references against the official Act, including the relevant commencement dates.",
        "BNS Section 106(2), the separate rash/negligent driving escape-and-failure-to-report provision, was expressly excluded from the 1 July 2024 commencement notification. Verify later gazette notifications before treating it as in force."
      ],
      "outlineAudit": {
        "status": "published-outline-compared",
        "sourceId": "kslu-2024-criminal",
        "printedPage": 1,
        "checkedOn": "2026-10-11",
        "scope": "Summary topics compared with Appendix I for Criminal Law–I: BNS, 2023 (introduced for academic year 2024–25).",
        "caution": "Confirm the prescribed scheme and any later circulars for this admission cohort."
      },
      "lawAudit": {
        "status": "selected-provisions-checked",
        "checkedOn": "2026-10-11",
        "studyRoute": "bns",
        "scope": "Selected BNS statutory section mappings checked against the India Code enacted Act and commencement notification; full offences, case law and later notifications remain to be audited."
      }
    },
    {
      "id": "sem1-c5-u4",
      "semester": 1,
      "courseIndex": 4,
      "unitIndex": 3,
      "course": "Criminal Law – I: Bharatiya Nyaya Sanhita (BNS), 2023",
      "title": "State, Public Tranquility & Public Justice",
      "syllabusStatus": "needs-review",
      "lastReviewed": null,
      "sourceIds": [
        "kslu-index",
        "bns-2023",
        "kslu-2024-criminal",
        "bns-commencement-notification"
      ],
      "statuteStatus": "needs-review",
      "warnings": [
        "Check the precise BNS section references against the official Act, including the relevant commencement dates."
      ],
      "outlineAudit": {
        "status": "published-outline-compared",
        "sourceId": "kslu-2024-criminal",
        "printedPage": 2,
        "checkedOn": "2026-10-11",
        "scope": "Summary topics compared with Appendix I for Criminal Law–I: BNS, 2023 (introduced for academic year 2024–25).",
        "caution": "Confirm the prescribed scheme and any later circulars for this admission cohort."
      },
      "lawAudit": {
        "status": "selected-provisions-checked",
        "checkedOn": "2026-10-11",
        "studyRoute": "bns",
        "scope": "Selected BNS statutory section mappings checked against the India Code enacted Act and commencement notification; full offences, case law and later notifications remain to be audited."
      }
    },
    {
      "id": "sem1-c5-u5",
      "semester": 1,
      "courseIndex": 4,
      "unitIndex": 4,
      "course": "Criminal Law – I: Bharatiya Nyaya Sanhita (BNS), 2023",
      "title": "Property Offences & Other Offences",
      "syllabusStatus": "needs-review",
      "lastReviewed": null,
      "sourceIds": [
        "kslu-index",
        "bns-2023",
        "kslu-2024-criminal",
        "bns-commencement-notification"
      ],
      "statuteStatus": "needs-review",
      "warnings": [
        "Check the precise BNS section references against the official Act, including the relevant commencement dates."
      ],
      "outlineAudit": {
        "status": "published-outline-compared",
        "sourceId": "kslu-2024-criminal",
        "printedPage": 2,
        "checkedOn": "2026-10-11",
        "scope": "Summary topics compared with Appendix I for Criminal Law–I: BNS, 2023 (introduced for academic year 2024–25).",
        "caution": "Confirm the prescribed scheme and any later circulars for this admission cohort."
      },
      "lawAudit": {
        "status": "selected-provisions-checked",
        "checkedOn": "2026-10-11",
        "studyRoute": "bns",
        "scope": "Selected BNS statutory section mappings checked against the India Code enacted Act and commencement notification; full offences, case law and later notifications remain to be audited."
      }
    },
    {
      "id": "sem1-c6-u1",
      "semester": 1,
      "courseIndex": 5,
      "unitIndex": 0,
      "course": "English (for students writing examinations in Kannada)",
      "title": "Law and Lawyers",
      "syllabusStatus": "needs-review",
      "lastReviewed": null,
      "sourceIds": [
        "kslu-index",
        "kslu-2018-llb"
      ],
      "statuteStatus": "needs-review",
      "warnings": [
        "English is listed by KSLU for students writing examinations in Kannada; check whether this paper applies to your examination language and scheme."
      ],
      "outlineAudit": {
        "status": "published-outline-compared",
        "sourceId": "kslu-2018-llb",
        "printedPage": 13,
        "checkedOn": "2026-10-11",
        "scope": "Summary topics compared with KSLU 2018–19 syllabus. Paraphrased headings, not an exact-text reproduction.",
        "caution": "English is listed for students writing examinations in Kannada; do not treat it as compulsory for everyone."
      }
    },
    {
      "id": "sem1-c6-u2",
      "semester": 1,
      "courseIndex": 5,
      "unitIndex": 1,
      "course": "English (for students writing examinations in Kannada)",
      "title": "Grammar & Legal Vocabulary",
      "syllabusStatus": "needs-review",
      "lastReviewed": null,
      "sourceIds": [
        "kslu-index",
        "kslu-2018-llb"
      ],
      "statuteStatus": "needs-review",
      "warnings": [],
      "outlineAudit": {
        "status": "published-outline-compared",
        "sourceId": "kslu-2018-llb",
        "printedPage": 13,
        "checkedOn": "2026-10-11",
        "scope": "Summary topics compared with KSLU 2018–19 syllabus. Paraphrased headings, not an exact-text reproduction.",
        "caution": "English is listed for students writing examinations in Kannada; do not treat it as compulsory for everyone."
      }
    },
    {
      "id": "sem1-c6-u3",
      "semester": 1,
      "courseIndex": 5,
      "unitIndex": 2,
      "course": "English (for students writing examinations in Kannada)",
      "title": "Applied Writing",
      "syllabusStatus": "needs-review",
      "lastReviewed": null,
      "sourceIds": [
        "kslu-index",
        "kslu-2018-llb"
      ],
      "statuteStatus": "needs-review",
      "warnings": [],
      "outlineAudit": {
        "status": "published-outline-compared",
        "sourceId": "kslu-2018-llb",
        "printedPage": 13,
        "checkedOn": "2026-10-11",
        "scope": "Summary topics compared with KSLU 2018–19 syllabus. Paraphrased headings, not an exact-text reproduction.",
        "caution": "English is listed for students writing examinations in Kannada; do not treat it as compulsory for everyone."
      }
    },
    {
      "id": "sem1-c6-u4",
      "semester": 1,
      "courseIndex": 5,
      "unitIndex": 3,
      "course": "English (for students writing examinations in Kannada)",
      "title": "Professional Writing",
      "syllabusStatus": "needs-review",
      "lastReviewed": null,
      "sourceIds": [
        "kslu-index",
        "kslu-2018-llb"
      ],
      "statuteStatus": "needs-review",
      "warnings": [],
      "outlineAudit": {
        "status": "published-outline-compared",
        "sourceId": "kslu-2018-llb",
        "printedPage": 14,
        "checkedOn": "2026-10-11",
        "scope": "Summary topics compared with KSLU 2018–19 syllabus. Paraphrased headings, not an exact-text reproduction.",
        "caution": "English is listed for students writing examinations in Kannada; do not treat it as compulsory for everyone."
      }
    },
    {
      "id": "sem1-c6-u5",
      "semester": 1,
      "courseIndex": 5,
      "unitIndex": 4,
      "course": "English (for students writing examinations in Kannada)",
      "title": "Translation",
      "syllabusStatus": "needs-review",
      "lastReviewed": null,
      "sourceIds": [
        "kslu-index",
        "kslu-2018-llb"
      ],
      "statuteStatus": "needs-review",
      "warnings": [],
      "outlineAudit": {
        "status": "published-outline-compared",
        "sourceId": "kslu-2018-llb",
        "printedPage": 14,
        "checkedOn": "2026-10-11",
        "scope": "Summary topics compared with KSLU 2018–19 syllabus. Paraphrased headings, not an exact-text reproduction.",
        "caution": "English is listed for students writing examinations in Kannada; do not treat it as compulsory for everyone."
      }
    }
  ],
  "verifiedClaims": [
    {
      "id": "contract-acceptance-section",
      "courseIndex": 1,
      "unitIndex": 0,
      "claim": "Sections 2(b) and 7–9 of the Contract Act address acceptance and forms of acceptance.",
      "sourceIds": [
        "contract-act"
      ],
      "status": "source-checked",
      "reviewedOn": "2026-10-11"
    },
    {
      "id": "contract-consideration-section",
      "courseIndex": 1,
      "unitIndex": 0,
      "claim": "Section 2(d) defines consideration; Section 25 addresses agreements without consideration and exceptions.",
      "sourceIds": [
        "contract-act"
      ],
      "status": "source-checked",
      "reviewedOn": "2026-10-11"
    },
    {
      "id": "bns-law",
      "courseIndex": 4,
      "unitIndex": 0,
      "claim": "The Bharatiya Nyaya Sanhita, 2023 is Act 45 of 2023.",
      "sourceIds": [
        "bns-2023"
      ],
      "status": "source-checked",
      "reviewedOn": "2026-10-11"
    },
    {
      "id": "consumer-2019-law",
      "courseIndex": 2,
      "unitIndex": 4,
      "claim": "The Consumer Protection Act, 2019 is Act 35 of 2019.",
      "sourceIds": [
        "consumer-2019"
      ],
      "status": "source-checked",
      "reviewedOn": "2026-10-11"
    }
  ]
};
function getUnit(ci,ui){return data.units.find(function(unit){return unit.courseIndex===ci&&unit.unitIndex===ui;})||null;}
function getSources(unit){return unit?unit.sourceIds.map(function(id){return data.sources[id];}).filter(Boolean):[];}
var api={data:data,getUnit:getUnit,getSources:getSources};
if(typeof module==="object"&&module.exports)module.exports=api;
if(root)root.LawContentLedger=api;
})(typeof globalThis==="object"?globalThis:this);

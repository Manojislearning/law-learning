/* Carefully scoped primary-source statutory corrections for KSLU Semester I. */
(function(root){"use strict";var data={
  "schema": 1,
  "edition": "Statutory source check · 11 October 2026",
  "claimScope": "Selected statutory section mappings and commencement/rule distinctions have been checked against cited government primary texts. This is not a complete review of the Acts, all amendments, case-law applications or the student's current KSLU cohort.",
  "topics": [
    {
      "id": "bns",
      "name": "Criminal Law–I · BNS",
      "short": "BNS",
      "description": "Commencement, offences and section mapping"
    },
    {
      "id": "consumer",
      "name": "Torts · Consumer Protection",
      "short": "Consumer",
      "description": "2019 Act, definitions and 2021 jurisdiction rules"
    }
  ],
  "sources": {
    "bns-act": {
      "title": "Bharatiya Nyaya Sanhita, 2023 — India Code enacted text",
      "url": "https://www.indiacode.nic.in/bitstream/123456789/20062/1/a2023-45.pdf"
    },
    "bns-commence": {
      "title": "Ministry of Home Affairs, S.O. 850(E), 23 February 2024 — commencement",
      "url": "https://www.mha.gov.in/sites/default/files/BhartiyaNyayaSanhita_24022024.pdf"
    },
    "bns-index": {
      "title": "National Crime Records Bureau — BNS section arrangement",
      "url": "https://cytrain.ncrb.gov.in/staticpage/web_pages/IndexBNS.html"
    },
    "consumer-act": {
      "title": "Consumer Protection Act, 2019 — India Code enacted text",
      "url": "https://www.indiacode.nic.in/bitstream/123456789/15256/1/a2019-35.pdf"
    },
    "consumer-jurisdiction": {
      "title": "Department of Consumer Affairs, Jurisdiction Rules, 2021 — Gazette",
      "url": "https://consumeraffairs.gov.in/public/upload/files/232278_1732705181.pdf"
    },
    "consumer-rules": {
      "title": "Department of Consumer Affairs — Consumer Protection Acts and Rules",
      "url": "https://consumeraffairs.gov.in/pages/consumer-protection-acts"
    }
  },
  "cards": [
    {
      "id": "bns-commencement",
      "topic": "bns",
      "unit": 0,
      "section": "Section 1; MHA notification S.O. 850(E)",
      "title": "BNS commenced — but not every subsection",
      "rule": "The Central Government appointed 1 July 2024 for commencement of the BNS, 2023, except Section 106(2). The commencement notification matters separately from the date the Act was enacted.",
      "example": "A problem refers to a driver fleeing an accident and cites Section 106(2). Before describing it as an operative offence, check whether that particular subsection has subsequently been brought into force.",
      "mistake": "Do not say all BNS provisions commenced together on 1 July 2024. Also do not assume a historical non-commencement notice proves the situation for all future dates; recheck later notifications.",
      "question": "What is the important exception in the 23 February 2024 BNS commencement notification?",
      "choices": [
        "All of Section 106",
        "Section 106(2)",
        "All of Chapter XVII"
      ],
      "answer": 1,
      "why": "S.O. 850(E) expressly excluded sub-section (2) of Section 106 from the 1 July 2024 commencement.",
      "refs": [
        "bns-act",
        "bns-commence"
      ]
    },
    {
      "id": "bns-punishment",
      "topic": "bns",
      "unit": 0,
      "section": "BNS Section 4",
      "title": "Community service is listed as a punishment",
      "rule": "BNS Section 4 lists recognised punishments, including community service. It does not mean community service replaces every other statutory punishment.",
      "example": "Where an offence provision specifically permits community service, identify that provision as well as the general punishment list in Section 4.",
      "mistake": "Do not infer community service is available for every offence merely because Section 4 lists it.",
      "question": "Which BNS provision includes community service among punishment categories?",
      "choices": [
        "Section 4",
        "Section 61",
        "Section 303"
      ],
      "answer": 0,
      "why": "Section 4 sets out punishment categories; availability for a particular offence depends on its specific provision.",
      "refs": [
        "bns-act",
        "bns-index"
      ]
    },
    {
      "id": "bns-inchoate",
      "topic": "bns",
      "unit": 1,
      "section": "BNS Sections 61–62",
      "title": "Conspiracy is not the same as attempt",
      "rule": "Section 61 addresses criminal conspiracy. Section 62 supplies a general punishment rule for attempts to commit offences punishable with imprisonment where no express specific attempt provision applies.",
      "example": "Two people agreeing to carry out an unlawful plan raises conspiracy questions. A person who goes further and acts towards committing an offence may also raise attempt issues, depending on the facts.",
      "mistake": "Do not label mere preparation an attempt automatically, or assume every agreement amounts to punishable criminal conspiracy.",
      "question": "Which section contains the BNS general provision for punishing certain attempts?",
      "choices": [
        "Section 62",
        "Section 61",
        "Section 80"
      ],
      "answer": 0,
      "why": "Section 62 covers attempt punishments where the BNS does not provide a special punishment for that attempt.",
      "refs": [
        "bns-act",
        "bns-index"
      ]
    },
    {
      "id": "bns-dowry",
      "topic": "bns",
      "unit": 1,
      "section": "BNS Sections 80, 85–86",
      "title": "Dowry death and cruelty are distinct",
      "rule": "Section 80 concerns dowry death; Section 85 addresses cruelty by a husband or his relative and Section 86 defines cruelty for Section 85. The elements and evidence should be applied separately.",
      "example": "A question about alleged domestic cruelty without a death requires different statutory analysis from a fact pattern concerning a woman's death and alleged dowry-linked harassment.",
      "mistake": "Do not substitute the old IPC section numbers 304B and 498A for the BNS section numbers on a current BNS answer.",
      "question": "Which BNS provision concerns dowry death?",
      "choices": [
        "Section 103",
        "Section 80",
        "Section 316"
      ],
      "answer": 1,
      "why": "Section 80 is the BNS provision dealing with dowry death; the cruelty provisions are separately addressed in Sections 85–86.",
      "refs": [
        "bns-act",
        "bns-index"
      ]
    },
    {
      "id": "bns-homicide",
      "topic": "bns",
      "unit": 2,
      "section": "BNS Sections 100–106",
      "title": "Culpable homicide, murder and negligent death",
      "rule": "Sections 100 and 101 define culpable homicide and murder respectively. Sections 103 and 105 set out punishments for murder and culpable homicide not amounting to murder; Section 106 concerns causing death by negligence, with commencement qualifications for 106(2).",
      "example": "A fatal incident must be analysed for state of mind and statutory elements before choosing between homicide and rash/negligent-causing-death provisions.",
      "mistake": "Never call BNS Section 103 the definition of murder: Section 101 defines murder, while 103 concerns punishment.",
      "question": "In the BNS, which section defines murder?",
      "choices": [
        "Section 101",
        "Section 103",
        "Section 106"
      ],
      "answer": 0,
      "why": "Section 101 defines murder; Section 103 addresses its punishment. The difference matters in legal answers.",
      "refs": [
        "bns-act",
        "bns-index",
        "bns-commence"
      ]
    },
    {
      "id": "bns-organised",
      "topic": "bns",
      "unit": 2,
      "section": "BNS Sections 111–113",
      "title": "Three related offences, separate elements",
      "rule": "Section 111 concerns organised crime, Section 112 petty organised crime and Section 113 terrorist acts. Each has its own statutory elements and proof requirements.",
      "example": "A question alleging an organised gang committing repeated property offences calls for examination of the precise statutory ingredients; it is not enough to use the label 'organised crime'.",
      "mistake": "Do not assume an offence qualifies under Sections 111, 112 or 113 solely because several people were involved.",
      "question": "Which BNS section is headed 'Terrorist act'?",
      "choices": [
        "Section 112",
        "Section 111",
        "Section 113"
      ],
      "answer": 2,
      "why": "Section 113 addresses terrorist acts; Sections 111 and 112 are separate offences.",
      "refs": [
        "bns-act",
        "bns-index"
      ]
    },
    {
      "id": "bns-theft",
      "topic": "bns",
      "unit": 4,
      "section": "BNS Sections 303–304",
      "title": "Theft versus snatching",
      "rule": "Section 303 concerns theft; Section 304 specifically addresses snatching. The latter addresses sudden or forcible taking from a person or their possession and must satisfy its own statutory wording.",
      "example": "A quietly removed unattended bicycle suggests theft analysis; pulling a bag directly from a person's hand raises snatching considerations.",
      "mistake": "Do not give the old IPC Section 378 as the current BNS theft section. Both the offence and factual elements must be identified.",
      "question": "Which BNS section specifically covers snatching?",
      "choices": [
        "Section 304",
        "Section 303",
        "Section 318"
      ],
      "answer": 0,
      "why": "Section 304 is the snatching provision; Section 303 concerns theft.",
      "refs": [
        "bns-act",
        "bns-index"
      ]
    },
    {
      "id": "bns-property",
      "topic": "bns",
      "unit": 4,
      "section": "BNS Sections 316–318",
      "title": "Entrustment is central to breach of trust",
      "rule": "Section 316 addresses criminal breach of trust, including dishonest misuse of entrusted property. Section 317 addresses stolen property and Section 318 concerns cheating involving deception, with the specified ingredients.",
      "example": "A person entrusted with funds who later dishonestly diverts them raises different questions from someone who deceives a victim into handing over money at the outset.",
      "mistake": "A failed contractual promise alone does not automatically establish criminal cheating or criminal breach of trust. Distinguish initial deception, entrustment and later conduct.",
      "question": "Where is criminal breach of trust found in the BNS?",
      "choices": [
        "Section 318",
        "Section 316",
        "Section 303"
      ],
      "answer": 1,
      "why": "Section 316 addresses criminal breach of trust; Section 318 addresses cheating.",
      "refs": [
        "bns-act",
        "bns-index"
      ]
    },
    {
      "id": "consumer-history",
      "topic": "consumer",
      "unit": 4,
      "section": "Consumer Protection Act, 2019; historical 1986 Act",
      "title": "Syllabus history is not the current statute",
      "rule": "KSLU's historical Torts syllabus names the Consumer Protection Act, 1986. For modern consumer-law study use the Consumer Protection Act, 2019 and the rules notified under it, while retaining the historical reference only to understand the published old syllabus.",
      "example": "When answering a current-law question about consumer commissions, use the 2019 Act and current applicable delegated rules, not the titles and figures of the repealed scheme.",
      "mistake": "Do not silently rewrite the original university syllabus; mark 1986 as a historical document reference and 2019 as the newer legislation.",
      "question": "Which is the principal legislation to consult for a modern consumer protection problem?",
      "choices": [
        "Consumer Protection Act, 1986 alone",
        "Indian Contract Act alone",
        "Consumer Protection Act, 2019 with applicable rules"
      ],
      "answer": 2,
      "why": "The 2019 Act is the modern legislative framework. The 1986 Act appears in the old KSLU outline as historical wording.",
      "refs": [
        "consumer-act",
        "consumer-rules"
      ]
    },
    {
      "id": "consumer-online",
      "topic": "consumer",
      "unit": 4,
      "section": "Consumer Protection Act, 2019, Section 2(7)",
      "title": "Online transactions can involve consumers",
      "rule": "Section 2(7) defines 'consumer' and expressly includes qualifying online transactions. Exclusions and statutory qualifications, including the commercial-purpose exception and its self-employment explanation, still need careful application.",
      "example": "An individual buys a chair for personal use through an online marketplace and alleges a defect. The online purchase method does not alone remove the transaction from consumer law.",
      "mistake": "Do not say every commercial buyer is always a consumer, or that online buyers are excluded from the 2019 definition.",
      "question": "Does buying goods online automatically disqualify a purchaser from the Act's definition of consumer?",
      "choices": [
        "No, online transactions are expressly included where other conditions hold",
        "Yes, all online purchases are excluded",
        "Only cash purchases count"
      ],
      "answer": 0,
      "why": "Section 2(7) includes qualifying offline and online transactions, subject to the statutory conditions and exclusions.",
      "refs": [
        "consumer-act"
      ]
    },
    {
      "id": "consumer-defect",
      "topic": "consumer",
      "unit": 4,
      "section": "Consumer Protection Act, 2019, Sections 2(10)–2(11)",
      "title": "Defect in goods versus deficiency in service",
      "rule": "Section 2(10) defines defect in goods; Section 2(11) concerns deficiency in services. Both definitions include statutory nuances about expected standards and performance.",
      "example": "A newly purchased ceiling fan whose wiring fails may raise a defect claim. A contracted installer who performs services below the required standard may raise a deficiency claim.",
      "mistake": "Do not treat defects in tangible goods and deficiencies in service delivery as interchangeable labels.",
      "question": "A contractor performs a paid installation service below the required standard. Which defined term fits the service complaint?",
      "choices": [
        "Defect under Section 2(10) only",
        "Deficiency under Section 2(11)",
        "Attempt under BNS Section 62"
      ],
      "answer": 1,
      "why": "Section 2(11) specifically addresses deficiency in services; defects in goods are separately defined under 2(10).",
      "refs": [
        "consumer-act"
      ]
    },
    {
      "id": "consumer-jurisdiction",
      "topic": "consumer",
      "unit": 4,
      "section": "Sections 34, 47, 58 and Consumer Jurisdiction Rules, 2021",
      "title": "Commission limits are set by the 2021 Rules",
      "rule": "Under the Consumer Protection (Jurisdiction of the District Commission, State Commission and National Commission) Rules, 2021, pecuniary bands use the value of goods/services paid as consideration: District up to ₹50 lakh; State above ₹50 lakh and up to ₹2 crore; National above ₹2 crore. Check any later amendments before relying on these limits.",
      "example": "For a complaint concerning goods with ₹70 lakh paid as consideration, the 2021 rules place the pecuniary band with the State Commission, subject to other jurisdictional requirements.",
      "mistake": "Do not rely on the original 2019 Act's higher monetary limits, confuse the amount claimed with consideration paid, or assume money band alone decides territorial or subject jurisdiction.",
      "question": "Under the 2021 Rules, which commission's pecuniary band includes ₹70 lakh paid for goods?",
      "choices": [
        "State Commission",
        "District Commission",
        "National Commission"
      ],
      "answer": 0,
      "why": "The 2021 Rules assign values above ₹50 lakh and up to ₹2 crore to the State Commission, subject to the Act's other requirements.",
      "refs": [
        "consumer-act",
        "consumer-jurisdiction"
      ]
    },
    {
      "id": "consumer-limitation",
      "topic": "consumer",
      "unit": 4,
      "section": "Consumer Protection Act, 2019, Section 69",
      "title": "Two-year limitation, with a statutory exception",
      "rule": "Section 69 generally bars admission of a complaint after two years from accrual of the cause of action, but allows delayed complaints on sufficient cause where the commission records its reasons for condonation.",
      "example": "A person complaining years after a service failure should discuss when the cause of action arose and whether any delay can legally be condoned.",
      "mistake": "Do not call the two-year period an absolute ban with no possible condonation.",
      "question": "What is the standard Section 69 period for filing a consumer complaint?",
      "choices": [
        "Three months with no exceptions",
        "Five years automatically",
        "Two years, subject to statutory condonation of delay"
      ],
      "answer": 2,
      "why": "Section 69 provides two years from the cause of action, with power to condone delay on recorded reasons where sufficient cause is shown.",
      "refs": [
        "consumer-act"
      ]
    },
    {
      "id": "consumer-relief",
      "topic": "consumer",
      "unit": 4,
      "section": "Consumer Protection Act, 2019, Section 39",
      "title": "Consumer commissions may grant more than damages",
      "rule": "Section 39 lists findings and redressal orders that a District Commission may make, including suitable repair or replacement, return of price or charges, and compensation in qualifying cases, subject to the section's requirements.",
      "example": "A defective appliance complaint may concern repair or replacement as well as other appropriate remedies; begin with the evidence and statutory elements.",
      "mistake": "Do not state that every deficiency automatically results in an identical compensation amount or a punitive award.",
      "question": "Which section lists principal orders that the District Commission may make following a complaint?",
      "choices": [
        "Section 106 of the BNS",
        "Section 39 of the Consumer Protection Act, 2019",
        "Section 69 of the BNS"
      ],
      "answer": 1,
      "why": "Section 39 contains findings/orders powers. The relief depends on the proved complaint and statutory terms.",
      "refs": [
        "consumer-act"
      ]
    },
    {
      "id": "consumer-authority",
      "topic": "consumer",
      "unit": 4,
      "section": "Consumer Protection Act, 2019, Sections 10 onward",
      "title": "CCPA is different from consumer commissions",
      "rule": "The Central Consumer Protection Authority (CCPA) is established under Section 10 and handles specified consumer-rights, unfair-trade-practice and misleading-advertisement issues. District, State and National Commissions address consumer disputes under their separate statutory chapters.",
      "example": "A misleading mass advertisement potentially involves regulatory action by the CCPA; an individual defective-service complaint may be adjudicated through a consumer commission.",
      "mistake": "Do not use 'CCPA' and 'consumer commission' as interchangeable names for one tribunal.",
      "question": "Which provision establishes the Central Consumer Protection Authority?",
      "choices": [
        "Section 69",
        "BNS Section 303",
        "Section 10 of the Consumer Protection Act, 2019"
      ],
      "answer": 2,
      "why": "Section 10 establishes the CCPA, which is distinct from the consumer dispute commissions.",
      "refs": [
        "consumer-act",
        "consumer-rules"
      ]
    }
  ]
};
if(root)root.LawAccuracyData=data;
if(typeof module==="object"&&module.exports)module.exports=data;
})(typeof globalThis==="object"?globalThis:this);

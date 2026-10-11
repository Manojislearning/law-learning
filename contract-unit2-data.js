/* Contract I Unit II: ten micro-lessons, statutory source checked; old syllabus cohort applicability unconfirmed. */
(function(root){
"use strict";
var data={
  "id": "contract1-unit2",
  "unitLabel": "II",
  "syllabusEdition": "KSLU revised three-year LL.B. curriculum, 2018–19 edition (Contract–I, Unit II)",
  "cohortStatus": "Verify this syllabus edition against the requirements for your admission cohort. Teaching text is explanatory, not an official answer key.",
  "statutoryReviewDate": "2026-10-11",
  "sources": [
    {
      "title": "KSLU official three-year LL.B. syllabus, Contract–I Unit II (2018–19 edition)",
      "url": "https://kslu.karnataka.gov.in/storage/pdf-files/%E0%B3%A9%E0%B2%B5%E0%B2%B0%E0%B3%8D%E0%B2%B7%E0%B2%A6%20%E0%B2%8E%E0%B2%B2%E0%B3%8D%E0%B2%8E%E0%B2%B2%E0%B3%8D%20%E0%B2%AC%E0%B2%BF%20%E0%B2%AF%20%E0%B2%AA%E0%B2%B0%E0%B2%BF%E0%B2%B7%E0%B3%8D%E0%B2%95%E0%B3%83%E0%B2%A4%20%E0%B2%AA%E0%B2%A0%E0%B3%8D%E0%B2%AF%E0%B2%95%E0%B3%8D%E0%B2%B0%E0%B2%AE.pdf"
    },
    {
      "title": "Indian Contract Act, 1872 — official India Code",
      "url": "https://www.indiacode.nic.in/handle/123456789/2187"
    },
    {
      "title": "Mohori Bibee v Dharmodas Ghose, Privy Council (1903), judgment transcript",
      "url": "https://supremetoday.ai/doc/judgement/00100045160"
    }
  ],
  "lessons": [
    {
      "id": "capacity",
      "title": "Who can make a contract?",
      "section": "Indian Contract Act · Sections 10–12",
      "focus": "Under Section 11, a person is competent to contract if they are of majority age under applicable law, of sound mind for contracting, and not disqualified by law. Section 12 asks whether the person can understand the contract and make a rational judgment about its effect on their interests at the time.",
      "plain": "Before asking whether a deal is fair, check whether the people making it can legally enter it.",
      "example": "An adult who is temporarily so intoxicated that they cannot understand the terms may lack contracting capacity at that time. Capacity is judged at the relevant moment.",
      "pitfall": "Do not assume that anyone with a medical diagnosis always lacks capacity: Section 12 concerns understanding and rational judgment when the contract is made.",
      "exam": "Start with Section 11's three requirements, then explain Section 12's time-specific test for sound mind.",
      "prompt": "An adult cannot understand the terms due to severe temporary intoxication when signing. What does Section 12 require you to assess?",
      "choices": [
        "Whether the person could understand and judge the contract at that time",
        "Whether the contract was printed in colour",
        "Whether the person has entered a contract before"
      ],
      "answer": 0,
      "why": "Section 12 focuses on capacity to understand and form a rational judgment about the contract's effect at the time it is made.",
      "terms": [
        "Capacity to contract",
        "Contract"
      ],
      "refs": [
        0,
        1
      ]
    },
    {
      "id": "minors",
      "title": "Why a minor’s agreement is void",
      "section": "Contract Act · Section 11; Section 68",
      "focus": "A minor is not competent to contract under Section 11. In Mohori Bibee v Dharmodas Ghose (1903), the Privy Council treated the minor's agreement as void from the outset. Section 68 separately provides reimbursement from the incapable person's property for suitable necessaries supplied to them or someone they must support.",
      "plain": "An ordinary agreement made by a minor cannot be enforced against them as an adult's contract. But supplying genuine necessaries can have a distinct property-based remedy.",
      "example": "A 17-year-old signs an ordinary unsecured borrowing agreement. Contrast this with a supplier providing suitable necessary medicine; different legal principles apply.",
      "pitfall": "Do not call a minor's ordinary agreement merely 'voidable', and do not say Section 68 creates unlimited personal contractual liability for necessaries.",
      "exam": "Cite Section 11 and Mohori Bibee; explain void ab initio, then distinguish the narrow property reimbursement under Section 68.",
      "prompt": "Under Section 68, the supplier of suitable necessaries to an incapable person may generally claim reimbursement from:",
      "choices": [
        "The incapable person's property, within the statutory conditions",
        "An automatically enforceable personal loan",
        "Any relative regardless of legal obligation"
      ],
      "answer": 0,
      "why": "Section 68 concerns reimbursement from the property of the person incapable of contracting, subject to the conditions in the section.",
      "terms": [
        "Void agreement",
        "Capacity to contract"
      ],
      "refs": [
        0,
        1,
        2
      ]
    },
    {
      "id": "consent",
      "title": "Consent versus free consent",
      "section": "Contract Act · Sections 13–14",
      "focus": "Section 13 defines consent: parties agree upon the same thing in the same sense. Under Section 14, consent is free when it is not caused by coercion, undue influence, fraud, misrepresentation or mistake, subject to the law's distinctions on mistake.",
      "plain": "First ask whether both parties agreed on the same matter. Then ask whether consent was obtained freely.",
      "example": "A buyer and seller agree on the same identified property, but the buyer signs after a threat. There may be consent in form, yet free consent is in question.",
      "pitfall": "Do not confuse absence of genuine agreement with consent affected by one of the statutory vitiating factors.",
      "exam": "Write Sections 13 and 14, list five vitiating factors, then distinguish consent from free consent with a short example.",
      "prompt": "Which question should come first when examining Section 13 consent?",
      "choices": [
        "Did both parties agree on the same thing in the same sense?",
        "Was the contract signed before noon?",
        "Did one party make more profit?"
      ],
      "answer": 0,
      "why": "Section 13 is about agreeing to the same thing in the same sense; free consent is examined under Section 14.",
      "terms": [
        "Free consent",
        "Agreement"
      ],
      "refs": [
        0,
        1
      ]
    },
    {
      "id": "coercion-undue",
      "title": "Coercion versus undue influence",
      "section": "Contract Act · Sections 15–16",
      "focus": "Section 15 concerns coercion, including conduct forbidden by the applicable criminal law or unlawful detention or threatened detention of property for inducing an agreement. Section 16 concerns undue influence: one party is in a position to dominate another's will and uses that position to obtain unfair advantage.",
      "plain": "Coercion is pressure through prohibited acts or unlawful detention; undue influence exploits power over another person's decision.",
      "example": "Threatening unlawful detention of someone's property to obtain assent suggests coercion. A trusted adviser abusing dominance over a dependent client suggests undue influence.",
      "pitfall": "A party's bargaining strength alone does not automatically establish undue influence. The statutory relationship, domination and unfair advantage must be analysed.",
      "exam": "Set out Sections 15 and 16, compare the required conduct and influence, explain burdens under Section 16 where appropriate, and state the remedies separately.",
      "prompt": "A trusted adviser abuses a dependent client's reliance to secure an unfair contract. Which concept is most directly raised?",
      "choices": [
        "Undue influence",
        "Ordinary commercial negotiation",
        "Mistake of foreign law"
      ],
      "answer": 0,
      "why": "Section 16 focuses on domination of will used to obtain unfair advantage.",
      "terms": [
        "Coercion",
        "Undue influence"
      ],
      "refs": [
        0,
        1
      ]
    },
    {
      "id": "fraud-misrep",
      "title": "Fraud or misrepresentation?",
      "section": "Contract Act · Sections 17–18",
      "focus": "Section 17 covers specified deceptive acts, including knowingly false assertions and active concealment, committed with the requisite deceptive intent. Section 18 covers statutory misrepresentation without the same kind of fraudulent intent. Context, duties to disclose and the actual causal effect on consent matter.",
      "plain": "Fraud typically involves deliberate deception. Misrepresentation can arise from a materially false statement made without dishonest intent.",
      "example": "A seller deliberately lies about a building's structural safety: examine fraud. A seller innocently but materially misstates a fact on which a buyer relies: examine misrepresentation.",
      "pitfall": "Do not treat every silence as fraud; Section 17 includes an important rule and exceptions concerning silence and duty to speak.",
      "exam": "Cite Sections 17 and 18, separate the mental state and conduct, and connect the induced consent to the appropriate Section 19 consequence.",
      "prompt": "A seller honestly believes a factual description is accurate but makes a materially false statement inducing assent. Which is most relevant?",
      "choices": [
        "Misrepresentation may apply under Section 18",
        "Fraud must be established in every case",
        "Every innocent mistake is automatically coercion"
      ],
      "answer": 0,
      "why": "Section 18 addresses forms of misrepresentation that do not necessarily involve deliberate deceit; check all statutory elements.",
      "terms": [
        "Fraud",
        "Misrepresentation"
      ],
      "refs": [
        0,
        1
      ]
    },
    {
      "id": "voidable",
      "title": "Voidable is not void",
      "section": "Contract Act · Sections 19 and 19A",
      "focus": "Section 19 generally makes agreements caused by coercion, fraud or misrepresentation voidable at the option of the party whose consent was affected, subject to the section's qualifications. Section 19A permits contracts induced by undue influence to be set aside on terms the court considers just.",
      "plain": "A voidable contract is not automatically null from the start. The protected party may have the legal option to avoid it.",
      "example": "A buyer is induced to contract by a material fraudulent statement. Analyse the buyer's choice and remedies instead of automatically declaring the agreement void.",
      "pitfall": "Do not assume all defects produce the same remedy. Section 19 has exceptions and qualifications, including ordinary diligence issues in specified cases.",
      "exam": "Distinguish void and voidable agreements; explain Sections 19 and 19A and identify which party can seek the remedy.",
      "prompt": "Which statement is generally correct when consent was caused by fraud?",
      "choices": [
        "The agreement can be voidable at the deceived party's option",
        "It is necessarily a valid agreement with no remedy",
        "Every contract between the parties becomes void"
      ],
      "answer": 0,
      "why": "Section 19 addresses voidability due to certain defects in free consent, subject to its statutory conditions.",
      "terms": [
        "Voidable contract",
        "Fraud"
      ],
      "refs": [
        0,
        1
      ]
    },
    {
      "id": "mistake",
      "title": "When does mistake make an agreement void?",
      "section": "Contract Act · Sections 20–22",
      "focus": "Section 20 generally makes an agreement void where both parties are mistaken as to a matter of fact essential to the agreement. Section 21 concerns mistakes of law. Under Section 22, unilateral mistake of fact alone does not make an agreement voidable, although other applicable doctrines may matter.",
      "plain": "Ask who is mistaken, whether it concerns a fact or law, and whether that fact is essential.",
      "example": "Both parties agree to purchase a specific cargo that, unknown to both, was destroyed before the agreement: examine a common essential mistake of fact.",
      "pitfall": "Do not say that every unilateral factual mistake automatically makes a contract void.",
      "exam": "Compare Sections 20, 21 and 22; use a common-mistake example and explain why unilateral mistake alone is not enough.",
      "prompt": "Both parties are mistaken about an essential existing fact. Which section is central?",
      "choices": [
        "Section 20",
        "Section 27",
        "Section 68"
      ],
      "answer": 0,
      "why": "Section 20 covers agreement void where both parties are under a mistake concerning an essential matter of fact.",
      "terms": [
        "Mistake",
        "Void agreement"
      ],
      "refs": [
        0,
        1
      ]
    },
    {
      "id": "lawful",
      "title": "Lawful object and consideration",
      "section": "Contract Act · Sections 23–24",
      "focus": "Section 23 makes consideration or object unlawful in specified circumstances, including when it is forbidden by law, defeats the provisions of a law, is fraudulent, causes injury to person or property, or is regarded by a court as immoral or opposed to public policy. Section 24 addresses unlawful consideration or objects in part.",
      "plain": "Even where parties agree, courts do not enforce bargains with unlawful objectives.",
      "example": "A person promises payment in exchange for committing fraud. The bargain fails legality requirements, not merely because one party later regrets it.",
      "pitfall": "A contract need not be criminal to have an unlawful object; also examine statute, injury, morality and public policy.",
      "exam": "List Section 23's categories, distinguish unlawful consideration from unlawful object, and add the Section 24 principle.",
      "prompt": "A promise is made to pay someone to commit a fraudulent act. Which issue is most immediate?",
      "choices": [
        "Unlawful object under Section 23",
        "Valid acceptance without limitation",
        "Capacity under Section 12 alone"
      ],
      "answer": 0,
      "why": "A fraudulent purpose directly raises the Section 23 rules on unlawful objects and consideration.",
      "terms": [
        "Unlawful consideration",
        "Void agreement"
      ],
      "refs": [
        0,
        1
      ]
    },
    {
      "id": "void-restraints",
      "title": "Common types of void agreements",
      "section": "Contract Act · Sections 25–30",
      "focus": "Sections 25–30 address classes of void agreements: certain promises without consideration (subject to exceptions), restraint of marriage, restraint of trade (subject to statutory exceptions), restraint of legal proceedings (with qualifications), uncertainty, and wagering agreements.",
      "plain": "Some bargains fail even if both parties willingly signed. The statute treats certain subjects as unenforceable.",
      "example": "An agreement whose meaning cannot be made certain raises Section 29. A pure wager on the outcome of a match raises Section 30.",
      "pitfall": "Do not say every restraint is void without checking the Act's express exceptions and qualifications. Also do not conflate a wager with a valid contingent contract.",
      "exam": "Organise a 10-mark answer by sections 25 through 30, giving one clear example and notable statutory exception for each.",
      "prompt": "Two parties make a pure bet on a cricket result without any other relevant commercial transaction. Which section is central?",
      "choices": [
        "Section 30 on wagering",
        "Section 13 on consent alone",
        "Section 12 on sound mind alone"
      ],
      "answer": 0,
      "why": "Section 30 states the general rule that agreements by way of wager are void.",
      "terms": [
        "Void agreement",
        "Consideration"
      ],
      "refs": [
        0,
        1
      ]
    },
    {
      "id": "contingent",
      "title": "Contingent contracts versus wagering",
      "section": "Contract Act · Sections 31–36; Section 30",
      "focus": "Section 31 defines a contingent contract as one to do or not do something if an event collateral to the contract does or does not happen. Sections 32–36 govern enforceability and impossibility. Section 30 generally treats agreements by way of wager as void.",
      "plain": "A contingent contract can be a genuine enforceable obligation dependent on a separate event; a bare bet is treated differently.",
      "example": "A seller agrees to supply specialised equipment if a permit is issued. The permit event can be collateral to the promise; compare this with two strangers simply betting on whether it rains.",
      "pitfall": "An uncertain future event does not automatically turn a contract into a wager. Look at the real agreement, the collateral event, and the statutory rules.",
      "exam": "Begin with Section 31 and examples under Sections 32–36; distinguish contingent contracts from wagering agreements under Section 30.",
      "prompt": "A supplier promises delivery only if an independent regulatory permit is granted. Which is most likely relevant?",
      "choices": [
        "The law of contingent contracts",
        "Every such bargain is automatically a wager",
        "Minority under Section 11"
      ],
      "answer": 0,
      "why": "A genuine obligation conditional on a collateral event can be a contingent contract. Whether it is enforceable depends on the specific facts and statutory rules.",
      "terms": [
        "Contingent contract",
        "Void agreement"
      ],
      "refs": [
        0,
        1
      ]
    }
  ]
};
if(root)root.ContractUnitTwoData=data;
if(typeof module==="object"&&module.exports)module.exports=data;
})(typeof globalThis==="object"?globalThis:this);

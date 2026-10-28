/* Timelines v80 — first-year 3-year LL.B (KSLU Semester I and II) in simple English.
   kind "history": events in time (when = year). kind "steps": how a legal process moves (when = Step n).
   icon: a key from the sketch icon set in timelines-view.js. search: text for a Google link (cases and Acts). */
(function(root){
"use strict";
root.LAW_TIMELINES={
reviewedOn:"2026-10-28",
note:"Short revision timelines, not legal advice. Check the current Act before writing an exam answer.",
subjects:{contract:"Contract",torts:"Torts",constitution:"Constitution",family:"Family law",criminal:"Criminal law",property:"Property",labour:"Labour law"},
list:[
/* ───── CONTRACT ───── */
{id:"contract-history",subject:"contract",sem:1,kind:"history",title:"How Indian contract law grew",intro:"From the 1872 Act to the 2018 change in specific relief.",events:[
 {when:"1854",icon:"scales",title:"Hadley v Baxendale",text:"An English court says damages cover only loss that arises naturally, or loss both sides expected.",why:"This idea is now in Section 73 of our Contract Act.",search:"Hadley v Baxendale 1854 case"},
 {when:"1872",icon:"book",title:"Indian Contract Act passed",text:"One Act for all of India. It came into force on 1 September 1872.",why:"Still the base of contract law in India.",search:"Indian Contract Act 1872"},
 {when:"1893",icon:"bottle",title:"Carlill v Carbolic Smoke Ball Co",text:"A company promised £100 to anyone who used its smoke ball and still got flu. Mrs Carlill did, and won.",why:"An offer can be made to the whole world (general offer).",search:"Carlill v Carbolic Smoke Ball Co 1893 case"},
 {when:"1903",icon:"person",title:"Mohori Bibee v Dharmodas Ghose",text:"A minor mortgaged his property. The Privy Council said a minor's agreement is void from the start.",why:"Leading case on minors' agreements (Section 11).",search:"Mohori Bibee v Dharmodas Ghose 1903 case"},
 {when:"1913",icon:"envelope",title:"Lalman Shukla v Gauri Dutt",text:"A servant found a missing boy without knowing a reward was offered. He could not claim the reward.",why:"You can accept an offer only if you know about it.",search:"Lalman Shukla v Gauri Dutt 1913 case"},
 {when:"1930",icon:"coin",title:"Sale of Goods Act",text:"The rules on sale of goods were taken out of the Contract Act into a separate Act.",search:"Sale of Goods Act 1930"},
 {when:"1932",icon:"handshake",title:"Indian Partnership Act",text:"Partnership rules also moved out into their own Act.",search:"Indian Partnership Act 1932"},
 {when:"1954",icon:"alert",title:"Satyabrata Ghose v Mugneeram Bangur",text:"The Supreme Court explained when a contract becomes impossible to perform (frustration).",why:"Key case on Section 56.",search:"Satyabrata Ghose v Mugneeram Bangur 1954 case"},
 {when:"1963",icon:"gavel",title:"Specific Relief Act",text:"A new Act on when the court can order a party to actually perform the contract.",search:"Specific Relief Act 1963"},
 {when:"2018",icon:"check",title:"Specific Relief Act amended",text:"From 1 October 2018, specific performance became the normal remedy, not a rare one.",why:"Courts now enforce the promise itself more often, instead of only giving money.",search:"Specific Relief Amendment Act 2018"}
]},
{id:"contract-steps",subject:"contract",sem:1,kind:"steps",title:"From offer to a valid contract",intro:"The path every contract walks, with the section numbers.",events:[
 {when:"Step 1",icon:"person",title:"Proposal (offer)",text:"One person shows willingness to do or not do something, to get the other's assent. Section 2(a)."},
 {when:"Step 2",icon:"envelope",title:"Communication",text:"The offer must reach the other person. It is complete when it comes to their knowledge. Section 4."},
 {when:"Step 3",icon:"check",title:"Acceptance",text:"Acceptance must be absolute and unqualified. A changed reply is a counter-offer. Section 7."},
 {when:"Step 4",icon:"coin",title:"Consideration",text:"Something in return — an act, a promise or holding back. It need not be adequate. Section 2(d), Section 25."},
 {when:"Step 5",icon:"person",title:"Capacity",text:"Parties must be adults, of sound mind, and not disqualified by law. Section 11."},
 {when:"Step 6",icon:"scales",title:"Free consent",text:"No coercion, undue influence, fraud, misrepresentation or mistake. Sections 13 to 22."},
 {when:"Step 7",icon:"alert",title:"Lawful object, not void",text:"The object must be lawful and the agreement not declared void. Sections 23 to 30."},
 {when:"Step 8",icon:"doc",title:"Valid contract",text:"An agreement enforceable by law is a contract. Section 2(h) and Section 10."},
 {when:"Step 9",icon:"gavel",title:"Breach and remedies",text:"If one side breaks it, the other can claim damages (Section 73) or other relief."}
]},
{id:"contract-post",subject:"contract",sem:1,kind:"steps",title:"Offer and acceptance by post",intro:"When each part is complete, and until when you can take it back (Sections 4 and 5).",events:[
 {when:"Step 1",icon:"envelope",title:"A posts an offer",text:"The offer is complete only when it reaches B and B comes to know of it."},
 {when:"Step 2",icon:"alert",title:"A can revoke the offer",text:"A can take it back any time before B's acceptance is complete against A."},
 {when:"Step 3",icon:"envelope",title:"B posts acceptance",text:"Acceptance is complete against A the moment B posts it — it is out of B's power."},
 {when:"Step 4",icon:"alert",title:"B can revoke acceptance",text:"B can take back the acceptance until it reaches A."},
 {when:"Step 5",icon:"check",title:"Contract is binding",text:"Once the acceptance reaches A, both are bound. No one can revoke now."}
]},
{id:"special-contracts",subject:"contract",sem:2,kind:"history",title:"Special contracts (Contract II)",intro:"Indemnity, guarantee, bailment, agency, and the Acts that grew around them.",events:[
 {when:"1872",icon:"book",title:"Special contracts in the Contract Act",text:"Indemnity, guarantee, bailment, pledge and agency are in Sections 124 to 238.",search:"Indian Contract Act sections 124 to 238 special contracts"},
 {when:"1881",icon:"doc",title:"Negotiable Instruments Act",text:"Rules for promissory notes, bills of exchange and cheques.",search:"Negotiable Instruments Act 1881"},
 {when:"1930",icon:"coin",title:"Sale of Goods Act",text:"Sale of goods gets its own Act.",search:"Sale of Goods Act 1930"},
 {when:"1932",icon:"handshake",title:"Indian Partnership Act",text:"Partnership gets its own Act.",search:"Indian Partnership Act 1932"},
 {when:"1988",icon:"alert",title:"Cheque bounce becomes an offence",text:"Section 138 was added to the NI Act. It came into force in 1989.",why:"Most cheque cases in court today are under Section 138.",search:"Section 138 Negotiable Instruments Act inserted 1988"},
 {when:"2008",icon:"handshake",title:"Limited Liability Partnership Act",text:"A partnership where partners' liability is limited.",search:"Limited Liability Partnership Act 2008"}
]},
/* ───── TORTS ───── */
{id:"torts-history",subject:"torts",sem:1,kind:"history",title:"Big moments in the law of torts",intro:"From English cases to India's own absolute liability rule.",events:[
 {when:"1868",icon:"factory",title:"Rylands v Fletcher",text:"Water from a reservoir flooded a mine. Strict liability for dangerous things that escape.",search:"Rylands v Fletcher 1868 case"},
 {when:"1932",icon:"bottle",title:"Donoghue v Stevenson",text:"A snail in a ginger beer bottle. Makers owe a duty of care to consumers.",why:"Start of the modern law of negligence (neighbour principle).",search:"Donoghue v Stevenson 1932 case"},
 {when:"1962",icon:"car",title:"State of Rajasthan v Vidyawati",text:"A Government jeep driver killed a man. The State was held liable.",search:"State of Rajasthan v Vidyawati 1962 case"},
 {when:"1965",icon:"police",title:"Kasturi Lal v State of UP",text:"Police lost seized gold. The State was not liable, as it was a 'sovereign function'.",search:"Kasturi Lal v State of UP 1965 case"},
 {when:"1966",icon:"court",title:"MCD v Subhagwanti",text:"Chandni Chowk clock tower fell. Res ipsa loquitur applied; the Corporation was liable.",search:"MCD v Subhagwanti 1966 case"},
 {when:"1984",icon:"factory",title:"Bhopal gas tragedy",text:"On 2–3 December 1984, gas leaked from the Union Carbide plant. Thousands died.",why:"Showed India needed stronger rules for hazardous industries.",search:"Bhopal gas tragedy 1984"},
 {when:"1987",icon:"factory",title:"M.C. Mehta v Union of India",text:"After the oleum gas leak in Delhi, the Supreme Court made absolute liability — no exceptions.",why:"Decided in December 1986 and reported in 1987. India's own rule, stricter than Rylands.",search:"M.C. Mehta v Union of India oleum gas absolute liability"},
 {when:"1993",icon:"police",title:"Nilabati Behera v State of Orissa",text:"Death in police custody. Compensation for violation of fundamental rights.",search:"Nilabati Behera v State of Orissa 1993 case"},
 {when:"2019",icon:"coin",title:"Consumer Protection Act, 2019",text:"Replaced the 1986 Act. In force from 20 July 2020. Covers online buying too.",search:"Consumer Protection Act 2019"}
]},
{id:"negligence-steps",subject:"torts",sem:1,kind:"steps",title:"How to prove negligence",intro:"Use these steps to answer any negligence question.",events:[
 {when:"Step 1",icon:"person",title:"Duty of care",text:"Did the defendant owe a duty to the plaintiff? Think of the 'neighbour' test from Donoghue v Stevenson."},
 {when:"Step 2",icon:"alert",title:"Breach of duty",text:"Did the defendant fall below what a reasonable person would do? Res ipsa loquitur can help prove this."},
 {when:"Step 3",icon:"scales",title:"Causation",text:"Did the breach actually cause the harm? 'But for' the breach, would the harm have happened?"},
 {when:"Step 4",icon:"clock",title:"Not too remote",text:"Was the kind of harm reasonably foreseeable? (Wagon Mound test)."},
 {when:"Step 5",icon:"doc",title:"Damage",text:"The plaintiff must show real damage — injury, loss of property or money."},
 {when:"Step 6",icon:"alert",title:"Check defences",text:"Contributory negligence, volenti, act of God, inevitable accident."},
 {when:"Step 7",icon:"gavel",title:"Remedy",text:"Damages to compensate the loss, and sometimes an injunction."}
]},
{id:"motor-claim",subject:"torts",sem:1,kind:"steps",title:"After a road accident",intro:"Motor Vehicles Act, 1988 — what happens step by step.",events:[
 {when:"Step 1",icon:"person",title:"Help the victim",text:"A Good Samaritan who helps in good faith is protected (Section 134A)."},
 {when:"Step 2",icon:"coin",title:"Cashless treatment",text:"Up to ₹1.5 lakh per victim for up to 7 days from the accident (2025 Scheme)."},
 {when:"Step 3",icon:"police",title:"Police record the accident",text:"The police report helps the claim before the Tribunal."},
 {when:"Step 4",icon:"doc",title:"Fixed no-fault amount",text:"₹5 lakh for death, ₹2.5 lakh for grievous hurt — no need to prove fault (Section 164). Hit-and-run: ₹2 lakh and ₹50,000 (Section 161)."},
 {when:"Step 5",icon:"court",title:"Claim before MACT",text:"File within 6 months (Section 166(3)). Since 15 August 2026, a late claim can be allowed within a further 12 months for good reason."},
 {when:"Step 6",icon:"gavel",title:"Award",text:"The Tribunal decides full compensation; the insurer usually pays."}
]},
/* ───── CONSTITUTION ───── */
{id:"constitution-making",subject:"constitution",sem:1,kind:"history",title:"Making of the Constitution",intro:"From the first meeting to the basic structure.",events:[
 {when:"1946",icon:"person",title:"Constituent Assembly meets",text:"First meeting on 9 December 1946.",search:"Constituent Assembly of India first meeting 9 December 1946"},
 {when:"1947",icon:"doc",title:"Drafting Committee formed",text:"Set up on 29 August 1947, with Dr B.R. Ambedkar as Chairman.",search:"Drafting Committee 29 August 1947 Ambedkar"},
 {when:"1949",icon:"book",title:"Constitution adopted",text:"Adopted on 26 November 1949. We celebrate it as Constitution Day.",search:"Constitution adopted 26 November 1949"},
 {when:"1950",icon:"check",title:"Constitution comes into force",text:"On 26 January 1950 India becomes a Republic.",search:"Constitution of India came into force 26 January 1950"},
 {when:"1951",icon:"doc",title:"First Amendment",text:"Added Article 15(4) and the Ninth Schedule, on 18 June 1951.",search:"Constitution First Amendment Act 1951"},
 {when:"1973",icon:"court",title:"Kesavananda Bharati",text:"Parliament can amend the Constitution but not destroy its basic structure.",search:"Kesavananda Bharati v State of Kerala 1973 case"},
 {when:"1976",icon:"book",title:"42nd Amendment",text:"Added 'socialist', 'secular' and 'integrity' to the Preamble.",search:"42nd Amendment 1976 Preamble socialist secular"},
 {when:"1978",icon:"house",title:"44th Amendment",text:"Right to property removed from Fundamental Rights; now Article 300A.",search:"44th Amendment 1978 right to property Article 300A"}
]},
{id:"champakam",subject:"constitution",sem:1,kind:"history",title:"Champakam Dorairajan and Article 15(4)",intro:"How one student's case led to the First Amendment.",events:[
 {when:"1920s",icon:"doc",title:"Madras Communal G.O.",text:"The Madras Government's order fixed college seats by community.",search:"Madras Communal G.O. history"},
 {when:"1950",icon:"gavel",title:"Madras High Court",text:"Champakam Dorairajan challenged the order. The High Court struck it down under Article 29(2).",search:"Champakam Dorairajan Madras High Court 1950"},
 {when:"1951",icon:"court",title:"Supreme Court agrees",text:"In April 1951, the Supreme Court upheld the High Court in State of Madras v Champakam Dorairajan.",search:"State of Madras v Champakam Dorairajan 1951 case"},
 {when:"1951",icon:"book",title:"First Amendment",text:"Parliament added Article 15(4): special provisions for backward classes, SCs and STs.",why:"Shows how a court judgment can lead to a constitutional amendment.",search:"First Amendment Article 15(4) Champakam"}
]},
{id:"article-21",subject:"constitution",sem:2,kind:"history",title:"How Article 21 grew",intro:"'Life and personal liberty' — from a narrow reading to a wide one.",events:[
 {when:"1950",icon:"police",title:"A.K. Gopalan v State of Madras",text:"Narrow view: any procedure made by law was enough.",search:"A.K. Gopalan v State of Madras 1950 case"},
 {when:"1978",icon:"doc",title:"Maneka Gandhi v Union of India",text:"Her passport was taken. The procedure must be fair, just and reasonable.",why:"Linked Articles 14, 19 and 21 together.",search:"Maneka Gandhi v Union of India 1978 case"},
 {when:"1985",icon:"house",title:"Olga Tellis v Bombay Municipal Corp.",text:"Pavement dwellers. Right to livelihood is part of the right to life.",search:"Olga Tellis v Bombay Municipal Corporation 1985 case"},
 {when:"1997",icon:"person",title:"Vishaka v State of Rajasthan",text:"Guidelines against sexual harassment at the workplace.",search:"Vishaka v State of Rajasthan 1997 case"},
 {when:"2017",icon:"person",title:"K.S. Puttaswamy v Union of India",text:"Nine judges: privacy is a fundamental right.",search:"K.S. Puttaswamy v Union of India 2017 privacy case"}
]},
/* ───── FAMILY LAW ───── */
{id:"hindu-law",subject:"family",sem:1,kind:"history",title:"Hindu law reforms",intro:"From old customs to codified Acts.",events:[
 {when:"1856",icon:"rings",title:"Hindu Widows' Remarriage Act",text:"Widows could legally marry again.",search:"Hindu Widows Remarriage Act 1856"},
 {when:"1929",icon:"alert",title:"Child Marriage Restraint Act",text:"Also called the Sarda Act. Fixed a minimum marriage age.",search:"Child Marriage Restraint Act 1929"},
 {when:"1955",icon:"rings",title:"Hindu Marriage Act",text:"One law for marriage and divorce of Hindus, Sikhs, Jains and Buddhists.",search:"Hindu Marriage Act 1955"},
 {when:"1956",icon:"house",title:"Three more Acts",text:"Hindu Succession Act, Hindu Adoptions and Maintenance Act, and Hindu Minority and Guardianship Act.",search:"Hindu Succession Act 1956"},
 {when:"1976",icon:"handshake",title:"Divorce by mutual consent",text:"Section 13B added to the Hindu Marriage Act.",search:"Section 13B Hindu Marriage Act 1976 amendment"},
 {when:"2005",icon:"person",title:"Daughters become coparceners",text:"From 9 September 2005, daughters get equal rights in joint family property.",search:"Hindu Succession Amendment Act 2005 daughters coparceners"},
 {when:"2020",icon:"court",title:"Vineeta Sharma v Rakesh Sharma",text:"A daughter's right does not depend on her father being alive in 2005.",search:"Vineeta Sharma v Rakesh Sharma 2020 case"}
]},
{id:"mutual-divorce",subject:"family",sem:1,kind:"steps",title:"Divorce by mutual consent (Section 13B)",intro:"The steps under the Hindu Marriage Act.",events:[
 {when:"Step 1",icon:"clock",title:"Living apart one year",text:"Husband and wife have lived separately for at least one year and agree they cannot live together."},
 {when:"Step 2",icon:"doc",title:"First motion",text:"Both file a joint petition in the Family Court."},
 {when:"Step 3",icon:"clock",title:"Waiting period",text:"Wait at least 6 months (and within 18 months) to reconsider. The court can waive it (Amardeep Singh v Harveen Kaur, 2017)."},
 {when:"Step 4",icon:"doc",title:"Second motion",text:"Both confirm they still want divorce. Either can withdraw consent before this."},
 {when:"Step 5",icon:"gavel",title:"Decree of divorce",text:"The court is satisfied and passes the decree."}
]},
{id:"muslim-law",subject:"family",sem:2,kind:"history",title:"Muslim law in India (Family Law II)",intro:"Key Acts and judgments.",events:[
 {when:"1937",icon:"book",title:"Shariat Application Act",text:"Muslim personal law applies to Muslims in family matters.",search:"Muslim Personal Law Shariat Application Act 1937"},
 {when:"1939",icon:"doc",title:"Dissolution of Muslim Marriages Act",text:"Gives grounds on which a Muslim wife can seek divorce in court.",search:"Dissolution of Muslim Marriages Act 1939"},
 {when:"1985",icon:"court",title:"Shah Bano case",text:"A divorced Muslim woman can claim maintenance under Section 125 CrPC.",search:"Mohd Ahmed Khan v Shah Bano Begum 1985 case"},
 {when:"1986",icon:"book",title:"Muslim Women (Protection of Rights on Divorce) Act",text:"Passed after Shah Bano, on provision during and after iddat.",search:"Muslim Women Protection of Rights on Divorce Act 1986"},
 {when:"2001",icon:"court",title:"Danial Latifi v Union of India",text:"The 1986 Act read to mean fair provision for her whole future.",search:"Danial Latifi v Union of India 2001 case"},
 {when:"2017",icon:"gavel",title:"Shayara Bano v Union of India",text:"Instant triple talaq (talaq-e-biddat) set aside.",search:"Shayara Bano v Union of India 2017 case"},
 {when:"2019",icon:"alert",title:"Triple talaq made an offence",text:"Muslim Women (Protection of Rights on Marriage) Act, 2019.",search:"Muslim Women Protection of Rights on Marriage Act 2019"},
 {when:"2024",icon:"coin",title:"Mohd. Abdul Samad v State of Telangana",text:"Divorced Muslim women can also claim maintenance under Section 125 CrPC.",search:"Mohd Abdul Samad v State of Telangana 2024 case"}
]},
/* ───── CRIMINAL LAW ───── */
{id:"criminal-codes",subject:"criminal",sem:1,kind:"history",title:"India's criminal law codes",intro:"From the IPC to the BNS.",events:[
 {when:"1860",icon:"book",title:"Indian Penal Code",text:"Written by Macaulay's Law Commission. In force from 1 January 1862.",search:"Indian Penal Code 1860"},
 {when:"1872",icon:"doc",title:"Indian Evidence Act",text:"Rules on what proof a court can accept.",search:"Indian Evidence Act 1872"},
 {when:"1973",icon:"police",title:"Code of Criminal Procedure",text:"The procedure for arrest, trial and appeal. In force from 1 April 1974.",search:"Code of Criminal Procedure 1973"},
 {when:"2023",icon:"book",title:"Three new laws passed",text:"Bharatiya Nyaya Sanhita (BNS), Nagarik Suraksha Sanhita (BNSS) and Sakshya Adhiniyam (BSA).",search:"BNS BNSS BSA 2023 passed"},
 {when:"2024",icon:"check",title:"New laws in force",text:"From 1 July 2024 the BNS, BNSS and BSA replace the IPC, CrPC and Evidence Act.",why:"For crimes from 1 July 2024, cite BNS sections (e.g. murder: BNS s.103).",search:"BNS BNSS BSA came into force 1 July 2024"}
]},
{id:"criminal-case-steps",subject:"criminal",sem:1,kind:"steps",title:"Journey of a criminal case",intro:"What happens after a crime, under the BNSS, 2023.",events:[
 {when:"Step 1",icon:"police",title:"FIR",text:"Information about a cognizable offence is recorded by the police (BNSS s.173). Can be given at any station (Zero FIR)."},
 {when:"Step 2",icon:"person",title:"Investigation and arrest",text:"Police collect evidence, record statements and may arrest the accused."},
 {when:"Step 3",icon:"doc",title:"Police report (charge-sheet)",text:"After investigation, the police send their report to the Magistrate (BNSS s.193)."},
 {when:"Step 4",icon:"gavel",title:"Cognizance",text:"The Magistrate takes judicial notice of the offence (BNSS s.210)."},
 {when:"Step 5",icon:"doc",title:"Charge",text:"The court frames the charge and reads it to the accused."},
 {when:"Step 6",icon:"scales",title:"Trial and evidence",text:"Prosecution and defence examine witnesses. Guilt must be proved beyond reasonable doubt."},
 {when:"Step 7",icon:"court",title:"Judgment and appeal",text:"Acquittal or conviction and sentence. The losing side can appeal."}
]},
{id:"mens-rea-steps",subject:"criminal",sem:1,kind:"steps",title:"Stages of a crime",intro:"From the idea in the mind to the completed offence.",events:[
 {when:"Stage 1",icon:"person",title:"Intention",text:"Only thinking of a crime is not punished."},
 {when:"Stage 2",icon:"doc",title:"Preparation",text:"Arranging the means. Usually not punished, with a few exceptions (like preparing for dacoity)."},
 {when:"Stage 3",icon:"alert",title:"Attempt",text:"A direct act towards the crime that fails or is stopped. Punishable (BNS s.62)."},
 {when:"Stage 4",icon:"gavel",title:"Commission",text:"The crime is complete. Full punishment."}
]},
/* ───── PROPERTY ───── */
{id:"property-law",subject:"property",sem:2,kind:"history",title:"Property law timeline",intro:"Transfer of Property Act and the laws around it.",events:[
 {when:"1882",icon:"house",title:"Transfer of Property Act",text:"Rules for sale, mortgage, lease, gift and exchange of property. In force from 1 July 1882.",search:"Transfer of Property Act 1882"},
 {when:"1899",icon:"coin",title:"Indian Stamp Act",text:"Stamp duty must be paid on documents like sale deeds.",search:"Indian Stamp Act 1899"},
 {when:"1908",icon:"doc",title:"Registration Act",text:"Sale of immovable property worth ₹100 or more must be registered.",search:"Registration Act 1908"},
 {when:"1929",icon:"handshake",title:"Part performance added",text:"Section 53A protects a buyer who took possession under a written contract.",search:"Section 53A Transfer of Property Act 1929"},
 {when:"2001",icon:"doc",title:"53A needs registration",text:"After the 2001 amendment, the contract must be registered to claim 53A protection.",search:"Section 53A registration 2001 amendment"}
]},
/* ───── LABOUR ───── */
{id:"labour-law",subject:"labour",sem:2,kind:"history",title:"Labour law in India",intro:"From old Acts to the four Labour Codes.",events:[
 {when:"1926",icon:"handshake",title:"Trade Unions Act",text:"Workers can register trade unions.",search:"Trade Unions Act 1926"},
 {when:"1947",icon:"factory",title:"Industrial Disputes Act",text:"Rules for strikes, lay-off, retrenchment and settling disputes.",search:"Industrial Disputes Act 1947"},
 {when:"1948",icon:"helmet",title:"Factories Act and Minimum Wages Act",text:"Safety in factories and a minimum wage for workers.",search:"Factories Act 1948 Minimum Wages Act 1948"},
 {when:"1978",icon:"court",title:"Bangalore Water Supply v A. Rajappa",text:"A wide meaning of 'industry' — hospitals, clubs and many services included.",search:"Bangalore Water Supply v A Rajappa 1978 case"},
 {when:"2019",icon:"coin",title:"Code on Wages",text:"The first of four Labour Codes, passed in 2019.",search:"Code on Wages 2019"},
 {when:"2020",icon:"book",title:"Three more Codes passed",text:"Industrial Relations Code, Social Security Code, and Occupational Safety, Health and Working Conditions Code.",search:"Industrial Relations Code 2020"},
 {when:"2025",icon:"check",title:"All four Codes in force",text:"From 21 November 2025, the four Codes replace 29 older labour laws.",search:"four labour codes in force 21 November 2025"}
]}
]};
})(typeof window!=="undefined"?window:globalThis);

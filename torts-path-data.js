/* Torts Path v74 — short, simple lessons for the Law of Torts (KSLU Semester I, five units).
   Each lesson: a few quick notes, then mixed questions.
   Question types: mcq (pick one), tf (true or false), fill (tap the missing word), match (tap pairs).
   For mcq/fill, `a` is the index of the right option. Options are shuffled when shown. */
(function(root){
"use strict";
root.TORTS_PATH={
reviewedOn:"2026-10-22",
/* Case briefs: shown at the start of any question that names the case, with a link to read it.
   `match` lists the words that identify the case in a question. Facts only, so the question still makes you think. */
cases:[
 {match:["Ashby v White"],name:"Ashby v White",cite:"(1703), England",facts:"Ashby was a qualified voter. The returning officer, White, wrongly refused to let him vote in an election. The candidate Ashby supported won anyway."},
 {match:["Gloucester Grammar School"],name:"Gloucester Grammar School case",cite:"(1410), England",facts:"A schoolmaster opened a new school next to an old grammar school. Students moved to the new school, and the old school had to cut its fees from 40 pence to 12 pence."},
 {match:["Bhim Singh"],name:"Bhim Singh v State of J&K",cite:"AIR 1986 SC 494 (1985), Supreme Court of India",facts:"Bhim Singh, an MLA, was arrested by the police on his way to the Assembly session. He was not produced before a magistrate in time and missed the session."},
 {match:["Bradford Corporation v Pickles","Pickles"],name:"Bradford Corporation v Pickles",cite:"[1895] AC 587, House of Lords",facts:"Underground water flowed from Pickles' land to the Bradford Corporation's reservoir. Pickles dug shafts on his own land that cut off the water, hoping the Corporation would buy his land at a high price."},
 {match:["Hall v Brooklands"],name:"Hall v Brooklands Auto Racing Club",cite:"[1933] 1 KB 205, Court of Appeal",facts:"Hall paid to watch a car race at Brooklands. Two cars touched, and one flew over the railing into the crowd, injuring spectators. Such an accident had never happened there before."},
 {match:["Smith v Baker"],name:"Smith v Baker & Sons",cite:"[1891] AC 325, House of Lords",facts:"Smith worked drilling rock in a quarry. A crane often swung heavy stones over his head without warning. He knew this, and one day a stone fell and injured him."},
 {match:["Haynes v Harwood"],name:"Haynes v Harwood",cite:"[1935] 1 KB 146, Court of Appeal",facts:"A van with two horses was left unattended on a busy street. A boy threw a stone and the horses bolted towards people, including children. A policeman ran out, stopped them, and was injured."},
 {match:["Nichols v Marsland"],name:"Nichols v Marsland",cite:"(1876) 2 Ex D 1, England",facts:"Marsland had artificial lakes on his land. An extraordinary rainfall, heavier than anyone could remember, broke the banks, and the water washed away four bridges."},
 {match:["Stanley v Powell"],name:"Stanley v Powell",cite:"[1891] 1 QB 86, England",facts:"During a bird shoot, Powell fired at a pheasant. A pellet bounced off an oak tree at an angle and hit Stanley, who was carrying cartridges for the party."},
 {match:["Vaughan v Taff Vale"],name:"Vaughan v Taff Vale Railway Co",cite:"(1860) 5 H & N 679, England",facts:"A railway company ran trains under an Act of Parliament. Sparks from an engine set fire to Vaughan's woods next to the line. The company had taken all reasonable care."},
 {match:["Century Insurance"],name:"Century Insurance v Northern Ireland Road Transport Board",cite:"[1942] AC 509, House of Lords",facts:"A tanker driver was unloading petrol into a tank at a garage. While the petrol was flowing, he lit a cigarette and threw away the burning match. A fire and explosion followed."},
 {match:["Limpus"],name:"Limpus v London General Omnibus Co",cite:"(1862) 1 H & C 526, England",facts:"The bus company told its drivers not to race or block other buses. One driver raced a rival bus, cut across it, and caused a crash that damaged Limpus's bus."},
 {match:["Lloyd v Grace"],name:"Lloyd v Grace, Smith & Co",cite:"[1912] AC 716, House of Lords",facts:"Mrs Lloyd went to a firm of solicitors for advice. The firm's managing clerk tricked her into signing her property over to him, and he sold it for himself."},
 {match:["Vidyawati"],name:"State of Rajasthan v Vidyawati",cite:"AIR 1962 SC 933, Supreme Court of India",facts:"A Government jeep used by the Collector was being driven back from repair by a Government driver. He drove rashly and hit a man on the footpath, who died. His widow sued the State."},
 {match:["Kasturi Lal"],name:"Kasturi Lal v State of UP",cite:"AIR 1965 SC 1039, Supreme Court of India",facts:"Police arrested Kasturi Lal, a jeweller, and took his gold into custody at the police station. The head constable in charge ran away with the gold to Pakistan."},
 {match:["Nilabati Behera"],name:"Nilabati Behera v State of Orissa",cite:"(1993) 2 SCC 746, Supreme Court of India",facts:"Nilabati's son was taken into police custody for questioning. The next day his body was found on a railway track with many injuries. She wrote to the Supreme Court."},
 {match:["Rudul Sah"],name:"Rudul Sah v State of Bihar",cite:"(1983) 4 SCC 141, Supreme Court of India",facts:"Rudul Sah was acquitted by a court in 1968, but the State kept him in jail for about 14 more years. He was released only in 1982."},
 {match:["Donoghue v Stevenson"],name:"Donoghue v Stevenson",cite:"[1932] AC 562, House of Lords",facts:"A friend bought Mrs Donoghue a bottle of ginger beer at a café. The bottle was dark, so no one could see inside. She found a decomposed snail in it and fell ill. She had no contract with the maker, Stevenson."},
 {match:["Byrne v Boadle"],name:"Byrne v Boadle",cite:"(1863) 2 H & C 722, England",facts:"Byrne was walking on the street past Boadle's warehouse. A heavy barrel fell from an upper window and hit him. He could not say how it fell."},
 {match:["MCD v Subhagwanti","Subhagwanti"],name:"Municipal Corporation of Delhi v Subhagwanti",cite:"AIR 1966 SC 1750, Supreme Court of India",facts:"An 80-year-old clock tower in Chandni Chowk, Delhi, owned and controlled by the Municipal Corporation, suddenly collapsed and killed several people."},
 {match:["Re Polemis"],name:"Re Polemis and Furness, Withy & Co",cite:"[1921] 3 KB 560, Court of Appeal",facts:"Workers were unloading a ship carrying petrol. One worker carelessly dropped a plank into the hold. It caused a spark, the petrol vapour caught fire, and the whole ship was destroyed."},
 {match:["Wagon Mound"],name:"Overseas Tankship v Morts Dock (The Wagon Mound)",cite:"[1961] AC 388, Privy Council",facts:"Oil spilled from the ship Wagon Mound in Sydney harbour and spread to a wharf where welding was going on. Days later, sparks set the oil on fire and the wharf burned. Experts thought this oil would not catch fire on water."},
 {match:["Rylands v Fletcher"],name:"Rylands v Fletcher",cite:"(1868) LR 3 HL 330, House of Lords",facts:"Rylands got contractors to build a reservoir on his land. Water from it flowed through old, hidden mine shafts and flooded Fletcher's coal mine nearby. Rylands himself was not careless."},
 {match:["M.C. Mehta"],name:"M.C. Mehta v Union of India (Oleum gas leak)",cite:"AIR 1987 SC 1086, Supreme Court of India",facts:"In December 1985, oleum gas leaked from a Shriram Foods and Fertilisers plant in a crowded part of Delhi. People were affected, and a public interest case was filed."},
 {match:["Stephens v Myers"],name:"Stephens v Myers",cite:"(1830) 4 C & P 349, England",facts:"At a parish meeting, Myers became angry and moved towards the chairman, Stephens, with his fist raised. Others stopped him just before he reached Stephens."},
 {match:["Bird v Jones"],name:"Bird v Jones",cite:"(1845) 7 QB 742, England",facts:"Part of Hammersmith Bridge was fenced off to watch a boat race. Bird wanted to walk through it. He was stopped from going forward, but he was free to go back the way he came."},
 {match:["Meering v Grahame"],name:"Meering v Grahame-White Aviation Co",cite:"(1919) 122 LT 44, Court of Appeal",facts:"Meering, an employee, was asked to wait in a room to answer questions about thefts. Without his knowledge, two company policemen stood outside to stop him leaving."},
 {match:["V.P. Shantha"],name:"Indian Medical Association v V.P. Shantha",cite:"(1995) 6 SCC 651, Supreme Court of India",facts:"Several cases reached the Supreme Court asking one question: when patients pay doctors and hospitals, is that a 'service' that patients can complain about under the Consumer Protection Act?"}
],

note:"Short study notes for revision, not legal advice. Check the current Act before you write an exam answer.",
units:[
/* ───────────── UNIT 1 ───────────── */
{id:"u1",title:"Basics of Tort",sub:"What a tort is, injuria and damnum, malice, remedies",lessons:[
 {id:"u1l1",title:"What is a tort?",
  notes:["Tort = a civil wrong. The person who suffers can go to court and ask for money (damages).",
   "The word comes from Latin 'tortum', meaning twisted or crooked.",
   "Tort is not a breach of contract and not a breach of trust. It is a separate wrong.",
   "Damages in tort are 'unliquidated' — the court decides the amount, it is not fixed before."],
  qs:[
  {t:"mcq",q:"A tort is mainly a…",o:["Civil wrong","Crime only","Breach of contract"],a:0,why:"Tort is a civil wrong. The injured person sues for compensation."},
  {t:"fill",q:"In tort, the court decides the amount of money. These damages are called ___ damages.",o:["unliquidated","liquidated","fixed"],a:0,why:"Unliquidated means the amount is not fixed in advance. The court decides it."},
  {t:"tf",q:"In a crime, the State prosecutes. In a tort, the injured person himself files the case.",a:true,why:"Crime is a wrong against society, so the State prosecutes. Tort is a private wrong, so the victim sues."},
  {t:"mcq",q:"In a tort case, what does the winning plaintiff mainly get?",o:["Compensation (damages)","Jail for the defendant","Fine paid to Government"],a:0,why:"Tort gives compensation to the victim. Punishment and fines belong to criminal law."},
  {t:"tf",q:"One act can be both a tort and a crime.",a:true,why:"Yes. If Ravi slaps Suresh, Suresh can file a criminal case (hurt) and also sue in tort (battery)."},
  {t:"match",q:"Match the wrong to what it gives",pairs:[["Crime","Punishment"],["Tort","Compensation"],["Breach of contract","Damages for broken promise"]],why:"Each branch gives a different remedy."}
 ]},
 {id:"u1l2",title:"Injuria and Damnum",
  notes:["Injuria = violation of a legal right. Damnum = loss or damage (money, comfort, health).",
   "Injuria sine damno: right violated, but no loss. Still you can sue. Example: Ashby v White — voter not allowed to vote.",
   "Damnum sine injuria: loss is there, but no right is violated. You cannot sue. Example: Gloucester Grammar School case — new school opened nearby, old school lost fees.",
   "Remember: the court looks for a violated legal right, not just loss."],
  qs:[
  {t:"mcq",q:"Ashby v White: the returning officer did not allow Ashby to vote. His candidate won anyway. Can Ashby sue?",o:["Yes — his legal right was violated","No — he suffered no loss","No — voting is not a right"],a:0,why:"Injuria sine damno. His right to vote was violated, so he can sue even without loss."},
  {t:"mcq",q:"Ramesh opens a new tuition centre in Dharwad. Students leave Shankar's old centre and join Ramesh. Can Shankar sue?",o:["No — damnum sine injuria","Yes — injuria sine damno","Yes — he lost money"],a:0,why:"Shankar lost money, but no legal right was violated. Fair competition is not a tort."},
  {t:"fill",q:"Loss without violation of a legal right is called damnum sine ___.",o:["injuria","damno","culpa"],a:0,why:"Damnum sine injuria = damage without legal injury. No action lies."},
  {t:"tf",q:"In injuria sine damno, the plaintiff must prove money loss to win.",a:false,why:"No loss is needed. Violation of the legal right is enough."},
  {t:"match",q:"Match the case to the rule",pairs:[["Ashby v White","Injuria sine damno"],["Gloucester Grammar School","Damnum sine injuria"]],why:"Ashby: right violated, no loss. Gloucester: loss, no right violated."},
  {t:"mcq",q:"Bhim Singh, an MLA, was wrongly detained by police and could not attend the Assembly. What did the Supreme Court do?",o:["Gave him compensation","Said no loss, so no relief","Sent the police to jail"],a:0,why:"Bhim Singh v State of J&K (1985): his liberty was violated, so the Court gave him monetary compensation."}
 ]},
 {id:"u1l3",title:"Malice, motive and intention",
  notes:["Generally, malice (bad motive) does not matter in tort. A lawful act does not become a tort because of a bad motive.",
   "Bradford Corporation v Pickles: Pickles drained water on his own land to force the corporation to buy it. Bad motive, but lawful act — not liable.",
   "Also, a wrongful act is not excused by a good motive.",
   "Malice matters only in a few torts, like malicious prosecution and defamation (to defeat some defences)."],
  qs:[
  {t:"tf",q:"In tort, a lawful act becomes wrongful just because it was done with a bad motive.",a:false,why:"Generally motive is irrelevant. Bradford Corporation v Pickles is the classic case."},
  {t:"mcq",q:"In Bradford Corporation v Pickles, why was Pickles not liable?",o:["He did a lawful act on his own land","He had a good motive","The corporation suffered no loss"],a:0,why:"He used his own land lawfully. His bad motive did not make it a tort."},
  {t:"mcq",q:"In which tort is malice an essential part?",o:["Malicious prosecution","Trespass to land","Negligence"],a:0,why:"For malicious prosecution, the plaintiff must prove malice."},
  {t:"fill",q:"A wrongful act is ___ excused because the motive was good.",o:["not","always","sometimes only"],a:0,why:"A good motive does not make a wrongful act lawful."},
  {t:"tf",q:"Negligence means carelessness. Intention to harm is not needed for negligence.",a:true,why:"In negligence, the defendant is liable for careless conduct even without any intention to harm."}
 ]},
 {id:"u1l4",title:"Remedies in tort",
  notes:["Main remedy = damages (money). Other remedies: injunction and self-help.",
   "Kinds of damages: compensatory (to cover loss), nominal (very small, to recognise a right), contemptuous (very small because the court dislikes the plaintiff's conduct), exemplary (extra, to punish).",
   "Injunction = court order to do or not to do something. Temporary (during the case) or permanent (at the end).",
   "Self-help: abatement of nuisance (removing it yourself), re-entry on land, taking back your goods — without using more force than needed."],
  qs:[
  {t:"match",q:"Match the damages",pairs:[["Nominal","Right violated, no real loss"],["Exemplary","To punish the wrongdoer"],["Contemptuous","Tiny amount, court disapproves plaintiff"],["Compensatory","Covers the actual loss"]],why:"Each kind of damages has a different purpose."},
  {t:"mcq",q:"Lakshmi's neighbour plays loud music every night. She wants it stopped, not money. What should she ask for?",o:["Injunction","Nominal damages","Exemplary damages"],a:0,why:"An injunction orders the neighbour to stop the nuisance."},
  {t:"tf",q:"A temporary injunction is given only at the end of the case.",a:false,why:"Temporary injunction is given during the case. A permanent injunction comes with the final decree."},
  {t:"fill",q:"Cutting the branches of your neighbour's tree that hang over your land is self-help called ___ of nuisance.",o:["abatement","injunction","conversion"],a:0,why:"Abatement = removing the nuisance yourself, without unnecessary harm."},
  {t:"mcq",q:"Which damages are given to punish the defendant, not only to cover loss?",o:["Exemplary damages","Nominal damages","Compensatory damages"],a:0,why:"Exemplary (punitive) damages are extra money to punish and deter."}
 ]}
]},
/* ───────────── UNIT 2 ───────────── */
{id:"u2",title:"Defences and Vicarious Liability",sub:"Volenti, other defences, master and servant, liability of the State",lessons:[
 {id:"u2l1",title:"Volenti non fit injuria",
  notes:["Meaning: to a willing person, no injury is done. If you freely agree to a risk, you cannot sue later.",
   "Hall v Brooklands: a spectator at a car race was hurt when a car flew into the crowd. Not liable — the risk was accepted.",
   "Consent must be free. Only knowing the risk is not enough. Smith v Baker: a worker knew a crane carried stones over him, but did not agree to the risk — employer liable.",
   "Rescue cases: a person who gets hurt while saving others is not met with volenti (Haynes v Harwood)."],
  qs:[
  {t:"fill",q:"Volenti non fit injuria means: to a ___ person, no injury is done.",o:["willing","sleeping","poor"],a:0,why:"If you willingly accept a risk, you cannot complain of it."},
  {t:"mcq",q:"Kiran watches a cricket match at Chinnaswamy stadium. A ball hits him during normal play. Can he sue?",o:["No — he accepted the normal risk","Yes — always","Yes — the batsman intended it"],a:0,why:"Spectators accept the ordinary risks of the game (like Hall v Brooklands)."},
  {t:"tf",q:"Only knowing about a risk is the same as agreeing to it.",a:false,why:"Smith v Baker: knowledge is not consent. 'Scienti non fit injuria' is not the rule."},
  {t:"mcq",q:"Horses run wild on a busy road in Mysuru. A policeman stops them and gets hurt. Is volenti a defence for the owner?",o:["No — rescue case","Yes — he chose the risk","Yes — he is paid to do it"],a:0,why:"Haynes v Harwood: rescuers are not treated as volunteers. The owner is liable."},
  {t:"match",q:"Match the case",pairs:[["Hall v Brooklands","Spectator accepted risk"],["Smith v Baker","Knowledge is not consent"],["Haynes v Harwood","Rescuer can recover"]],why:"These three cases mark the limits of volenti."}
 ]},
 {id:"u2l2",title:"Other general defences",
  notes:["Inevitable accident: could not be avoided even with reasonable care (Stanley v Powell — pellet bounced off a tree).",
   "Act of God (vis major): natural force so unusual nobody could expect it (Nichols v Marsland — extraordinary rain).",
   "Statutory authority: an Act allows the work, so harm that cannot be avoided is not actionable (Vaughan v Taff Vale Railway — sparks from engine).",
   "Private defence and necessity: reasonable force to protect yourself or property; harm done to prevent greater harm."],
  qs:[
  {t:"mcq",q:"In Nichols v Marsland, artificial lakes burst due to extraordinary rain. The defence was…",o:["Act of God","Volenti","Statutory authority"],a:0,why:"Very unusual natural force that no one could foresee = act of God."},
  {t:"mcq",q:"Stanley v Powell: a pellet bounced off a tree and hit a person during a shoot. Defendant was careful. Defence?",o:["Inevitable accident","Act of God","Necessity"],a:0,why:"It could not be avoided with reasonable care, so inevitable accident."},
  {t:"tf",q:"Normal heavy monsoon rain in Mangaluru is an 'act of God'.",a:false,why:"Act of God needs an extraordinary event. Normal, expected monsoon rain is not."},
  {t:"fill",q:"Sparks from a railway engine run under an Act burnt a nearby field. The defence is statutory ___.",o:["authority","necessity","consent"],a:0,why:"Vaughan v Taff Vale Railway: the Act allowed the railway, and there was no negligence."},
  {t:"mcq",q:"A fire spreads in a village near Tumakuru. Shivu breaks a hut to stop it reaching many houses. Defence?",o:["Necessity","Act of God","Volenti"],a:0,why:"Harm done in good faith to prevent greater harm = necessity."},
  {t:"tf",q:"In private defence, you can use any amount of force.",a:false,why:"Force must be reasonable and in proportion to the threat."}
 ]},
 {id:"u2l3",title:"Vicarious liability",
  notes:["Vicarious liability: one person is liable for the tort of another. Most common: employer (master) for employee (servant).",
   "Test: was the wrong done in the course of employment? Even a wrong way of doing the job counts.",
   "Century Insurance case: driver smoked while unloading petrol — fire. Employer liable. Limpus case: bus driver raced against orders — employer liable.",
   "Lloyd v Grace, Smith & Co: clerk cheated a client for himself — firm still liable. Generally, no liability for an independent contractor."],
  qs:[
  {t:"fill",q:"An employer is liable for the employee's tort done in the course of ___.",o:["employment","holiday","contract"],a:0,why:"The key test is 'course of employment'."},
  {t:"mcq",q:"Manjunath, a delivery driver, drives rashly while delivering parcels for his company in Hubballi and hits a cyclist. Who is liable?",o:["The company also (vicariously)","Only Manjunath","Nobody"],a:0,why:"He was doing his job, though carelessly. The employer is vicariously liable (the driver is also liable)."},
  {t:"mcq",q:"In Century Insurance, a driver lit a cigarette while unloading petrol and caused a fire. Result?",o:["Employer liable — careless way of doing his job","Employer not liable — smoking is personal","Only the insurer liable"],a:0,why:"Smoking was a negligent way of doing the authorised work."},
  {t:"tf",q:"If the employer told the driver 'do not race', the employer is never liable for racing.",a:false,why:"Limpus case: a prohibited mode of doing the job is still within employment."},
  {t:"mcq",q:"Generally, is a person liable for the tort of an independent contractor?",o:["No, generally not","Yes, always","Only on Sundays"],a:0,why:"Vicarious liability mainly arises for employees, not independent contractors (with some exceptions)."},
  {t:"match",q:"Match the case",pairs:[["Lloyd v Grace, Smith & Co","Clerk's fraud — firm liable"],["Limpus case","Racing against orders — liable"],["Century Insurance","Smoking while unloading — liable"]],why:"All three held the employer liable."}
 ]},
 {id:"u2l4",title:"Liability of the State",
  notes:["Article 300 of the Constitution: the Government can sue and be sued.",
   "State of Rajasthan v Vidyawati (1962): a Government jeep driver hit a pedestrian. State liable.",
   "Kasturi Lal v State of UP (1965): police lost seized gold. State not liable — 'sovereign function'.",
   "Later cases moved away: Rudul Sah (1983) and Nilabati Behera (1993) — State must pay compensation when fundamental rights are violated. Sovereign immunity is no defence there."],
  qs:[
  {t:"mcq",q:"In Vidyawati, a Government jeep driver caused an accident. Was the State liable?",o:["Yes","No — sovereign function","No — driver alone"],a:0,why:"Driving the jeep was not a sovereign function. The State was vicariously liable."},
  {t:"mcq",q:"In Kasturi Lal, police seized gold and a constable ran away with it. The Court held…",o:["State not liable — sovereign function","State liable","Only the jeep driver liable"],a:0,why:"Power to arrest and seize property was treated as a sovereign function in 1965."},
  {t:"tf",q:"In Nilabati Behera, a death in police custody, the Court said sovereign immunity is no defence for violation of fundamental rights.",a:true,why:"The Supreme Court awarded compensation under its public law power."},
  {t:"fill",q:"Rudul Sah was kept in jail for years even after acquittal. The Supreme Court ordered ___.",o:["compensation","his re-arrest","a fresh trial"],a:0,why:"Rudul Sah v State of Bihar (1983) is an early case of compensation for violation of Article 21."},
  {t:"mcq",q:"Which Article says the Government of India and States can sue and be sued?",o:["Article 300","Article 21","Article 14"],a:0,why:"Article 300 deals with suits by and against the Government."}
 ]}
]},
/* ───────────── UNIT 3 ───────────── */
{id:"u3",title:"Negligence, Nuisance and Strict Liability",sub:"Duty of care, res ipsa loquitur, nuisance, Rylands, absolute liability",lessons:[
 {id:"u3l1",title:"Negligence",
  notes:["Negligence = breach of a legal duty to take care, causing damage.",
   "Three things to prove: (1) duty of care, (2) breach of that duty, (3) damage caused by the breach.",
   "Donoghue v Stevenson (1932): snail in a ginger-beer bottle. The maker owed a duty to the consumer — 'neighbour principle'.",
   "Standard: what a reasonable, careful person would do in the same situation."],
  qs:[
  {t:"mcq",q:"Which is NOT an essential of negligence?",o:["Intention to harm","Duty of care","Damage"],a:0,why:"Duty, breach and damage are needed. Intention is not."},
  {t:"mcq",q:"Donoghue v Stevenson is famous for…",o:["The neighbour principle","Strict liability","Act of God"],a:0,why:"Lord Atkin said we must take care not to harm our 'neighbours' — people closely affected by our acts."},
  {t:"fill",q:"Negligence is judged by the standard of a ___ person.",o:["reasonable","perfect","rich"],a:0,why:"The law asks: what would a reasonable person have done?"},
  {t:"tf",q:"In Donoghue v Stevenson, the manufacturer was liable even though there was no contract with the consumer.",a:true,why:"The duty of care in tort does not need a contract."},
  {t:"mcq",q:"Joseph leaves a deep open pit in front of his shop in Mysuru without any sign. Ayesha falls in at night. Which element is clearly shown?",o:["Breach of duty of care","Volenti","Act of God"],a:0,why:"Leaving a pit open without a warning falls below reasonable care."}
 ]},
 {id:"u3l2",title:"Res ipsa loquitur and remoteness",
  notes:["Res ipsa loquitur = 'the thing speaks for itself'. When an accident normally does not happen without negligence, and the thing was under the defendant's control, negligence is presumed.",
   "Byrne v Boadle: a flour barrel fell from a warehouse window. MCD v Subhagwanti (1966): Chandni Chowk clock tower collapsed — Municipal Corporation liable.",
   "Remoteness: the defendant is liable only for damage that is not too remote.",
   "Re Polemis: all direct consequences. Wagon Mound: only reasonably foreseeable damage — this is the main test now."],
  qs:[
  {t:"fill",q:"Res ipsa loquitur means 'the thing speaks for ___'.",o:["itself","the plaintiff","the court"],a:0,why:"The facts themselves show negligence."},
  {t:"mcq",q:"An old clock tower owned by the Municipal Corporation suddenly collapses on people. Which rule helps the victims?",o:["Res ipsa loquitur","Volenti","Damnum sine injuria"],a:0,why:"MCD v Subhagwanti: towers do not fall without negligence, and it was in the Corporation's control."},
  {t:"match",q:"Match the remoteness test",pairs:[["Re Polemis","Direct consequence test"],["Wagon Mound","Reasonable foreseeability test"]],why:"Wagon Mound replaced the direct-consequence test."},
  {t:"tf",q:"Under res ipsa loquitur, the burden shifts to the defendant to show he was not negligent.",a:true,why:"Negligence is presumed; the defendant must explain."},
  {t:"mcq",q:"Byrne v Boadle is about…",o:["A flour barrel falling from a window","A snail in a bottle","A car race"],a:0,why:"A barrel does not fall without someone's negligence."}
 ]},
 {id:"u3l3",title:"Nuisance",
  notes:["Nuisance = unlawful interference with a person's use or enjoyment of land, or a right over it.",
   "Public nuisance affects the public at large. It is also a crime (BNS, 2023, s.270). A private person can sue only if he suffers special damage, more than others.",
   "Private nuisance: interference must be unreasonable — like smoke, smell, noise, dust, vibration.",
   "'Coming to the nuisance' is not a defence. Remedies: damages, injunction, abatement."],
  qs:[
  {t:"mcq",q:"A shop blocks a public footpath in Bengaluru. Everyone walks around it. Can Ravi alone sue in tort?",o:["Only if he suffered special damage","Yes, always","No, never"],a:0,why:"For public nuisance, a private suit needs special damage beyond the public's."},
  {t:"tf",q:"Every small noise from a neighbour is a private nuisance.",a:false,why:"Interference must be substantial and unreasonable. Ordinary living sounds are not enough."},
  {t:"mcq",q:"A rice mill's dust enters Doctor Kavya's clinic daily and patients stop coming. This is…",o:["Private nuisance","Defamation","Trespass to goods"],a:0,why:"Dust interfering with the use of her property = private nuisance."},
  {t:"tf",q:"'I came to live near the factory after it started' is a good defence for the factory.",a:false,why:"Coming to the nuisance is not a defence."},
  {t:"fill",q:"Public nuisance is also an offence under BNS, 2023, section ___.",o:["270","302","101"],a:0,why:"BNS s.270 defines public nuisance (old IPC s.268)."},
  {t:"match",q:"Match the type",pairs:[["Public nuisance","Affects the public"],["Private nuisance","Affects a person's land use"]],why:"The difference decides who can sue."}
 ]},
 {id:"u3l4",title:"Strict and absolute liability",
  notes:["Rylands v Fletcher (1868): water from a reservoir flooded a mine. Rule of strict liability: a person who keeps a dangerous thing on land is liable if it escapes, even without negligence.",
   "Essentials: dangerous thing, escape, non-natural use of land.",
   "Exceptions: plaintiff's fault, act of God, act of a stranger, consent, statutory authority.",
   "M.C. Mehta v Union of India (1987): oleum gas leak in Delhi. Absolute liability for hazardous industries — NO exceptions, and compensation depends on the size of the enterprise."],
  qs:[
  {t:"mcq",q:"Which is NOT an essential of the rule in Rylands v Fletcher?",o:["Intention to cause harm","Dangerous thing","Escape"],a:0,why:"Strict liability needs dangerous thing, escape and non-natural use. No intention or negligence."},
  {t:"mcq",q:"Under M.C. Mehta's absolute liability, which exceptions are allowed?",o:["None","Act of God only","All Rylands exceptions"],a:0,why:"Absolute liability has no exceptions for hazardous or inherently dangerous industries."},
  {t:"match",q:"Match the case",pairs:[["Rylands v Fletcher","Strict liability"],["M.C. Mehta v Union of India","Absolute liability"]],why:"India went beyond Rylands after the oleum gas leak."},
  {t:"tf",q:"Under absolute liability, compensation depends on the size and capacity of the enterprise.",a:true,why:"The bigger the enterprise, the bigger the deterrent compensation."},
  {t:"mcq",q:"A chemical factory near Raichur leaks toxic gas. The factory says a stranger opened the valve. Under Indian absolute liability, is the factory liable?",o:["Yes","No — act of stranger","No — no negligence"],a:0,why:"Absolute liability allows no exceptions, including act of a stranger."},
  {t:"fill",q:"Strict liability applies when there is a ___ use of land.",o:["non-natural","natural","agricultural"],a:0,why:"Ordinary, natural use of land does not attract Rylands liability."}
 ]}
]},
/* ───────────── UNIT 4 ───────────── */
{id:"u4",title:"Torts against Person and Property",sub:"Assault, battery, false imprisonment, malicious prosecution, defamation, trespass",lessons:[
 {id:"u4l1",title:"Assault and battery",
  notes:["Assault = an act that makes a person reasonably fear immediate force. No touching is needed.",
   "Battery = actually using force on another person without lawful justification. Even a small touch in anger can be battery.",
   "Stephens v Myers: a man rushed with a raised fist but was stopped before hitting — assault.",
   "Mere words are usually not assault. But words can remove the fear ('If you were not my friend, I would beat you')."],
  qs:[
  {t:"mcq",q:"Suresh raises his stick and runs at Ganesh, but people stop him before he hits. This is…",o:["Assault","Battery","No tort"],a:0,why:"Ganesh feared immediate force. No touching happened, so assault, not battery."},
  {t:"mcq",q:"Ravi angrily pushes Kumar in a KSRTC bus queue. This is…",o:["Battery","Only assault","Defamation"],a:0,why:"Actual use of force without justification = battery."},
  {t:"tf",q:"For battery, the plaintiff must be badly injured.",a:false,why:"Any unlawful touching with force is enough. Injury is not needed."},
  {t:"fill",q:"Assault needs fear of ___ force.",o:["immediate","future","imaginary"],a:0,why:"Threat of force next week is not assault; it must be immediate."},
  {t:"match",q:"Match",pairs:[["Assault","Fear of force, no touch"],["Battery","Actual force"]],why:"Usually assault comes first, battery follows."}
 ]},
 {id:"u4l2",title:"False imprisonment and malicious prosecution",
  notes:["False imprisonment = total restraint of a person's movement without lawful reason. Even for a short time.",
   "Restraint must be complete. Bird v Jones: blocking one way while another way is open is not false imprisonment.",
   "The person need not know he was locked in (Meering v Grahame-White).",
   "Malicious prosecution: (1) prosecution by defendant, (2) without reasonable and probable cause, (3) with malice, (4) case ended in plaintiff's favour, (5) damage."],
  qs:[
  {t:"mcq",q:"A shop owner in Belagavi locks Ramya in a room for an hour on a false theft doubt. This is…",o:["False imprisonment","Assault","Nuisance"],a:0,why:"Total restraint without lawful reason, even for a short time."},
  {t:"tf",q:"Blocking one road while another road is open is false imprisonment.",a:false,why:"Bird v Jones: restraint must be total."},
  {t:"tf",q:"A person can be falsely imprisoned even if he did not know at that time.",a:true,why:"Meering v Grahame-White: knowledge is not necessary."},
  {t:"mcq",q:"Which is NOT needed for malicious prosecution?",o:["Plaintiff lost the criminal case","Malice","No reasonable and probable cause"],a:0,why:"The case must have ended in the plaintiff's favour (acquittal/discharge), not against him."},
  {t:"fill",q:"In malicious prosecution, the earlier case must end in the ___ favour.",o:["plaintiff's","defendant's","police's"],a:0,why:"You cannot sue while the case is pending or if you were convicted."}
 ]},
 {id:"u4l3",title:"Defamation",
  notes:["Defamation = publishing a false statement that lowers a person's reputation in the eyes of right-thinking people.",
   "Libel: permanent form (writing, print, picture, post). Slander: spoken words or gestures.",
   "Three essentials: statement is defamatory, it refers to the plaintiff, it is published to a third person.",
   "Defences: truth (justification), fair comment on public matters, privilege (absolute — Parliament and court; qualified — duty to tell). Defamation is also an offence (BNS, 2023, s.356)."],
  qs:[
  {t:"match",q:"Match",pairs:[["Libel","Written or permanent"],["Slander","Spoken"]],why:"The form of the statement decides libel or slander."},
  {t:"tf",q:"Kiran sends a closed letter calling Vinay a thief only to Vinay. This is defamation.",a:false,why:"No publication to a third person, so no defamation."},
  {t:"mcq",q:"Which is a complete defence to civil defamation?",o:["The statement is true","I was angry","I said it only once"],a:0,why:"Truth (justification) is a full defence in civil defamation."},
  {t:"mcq",q:"An MLA says something in the Legislative Assembly during debate. Defence?",o:["Absolute privilege","Volenti","Act of God"],a:0,why:"Statements in Parliament/Legislature debates have absolute privilege."},
  {t:"fill",q:"A WhatsApp group post falsely saying a teacher takes bribes is ___ (permanent form).",o:["libel","slander","assault"],a:0,why:"A written post is in permanent form, so libel."},
  {t:"tf",q:"Defamation can be both a tort and a crime in India.",a:true,why:"Civil suit for damages, and criminal case under BNS s.356."}
 ]},
 {id:"u4l4",title:"Trespass",
  notes:["Trespass to land = entering or staying on another's land without permission, or putting something on it. Actionable per se — no loss needed.",
   "Trespass ab initio: entering with legal authority but then abusing it — the person becomes a trespasser from the beginning.",
   "Trespass to goods = wrongful interference with goods in another's possession.",
   "Conversion = dealing with someone's goods as your own (selling, destroying, keeping). Detinue = wrongfully keeping goods after demand."],
  qs:[
  {t:"tf",q:"For trespass to land, the owner must prove damage.",a:false,why:"Trespass is actionable per se. Entry without permission is enough."},
  {t:"mcq",q:"Prakash builds his compound wall one foot into his neighbour's site in Mysuru. This is…",o:["Trespass to land","Defamation","Slander"],a:0,why:"Putting something on another's land without permission is trespass."},
  {t:"mcq",q:"Ramu borrows Somu's bike and sells it. This is…",o:["Conversion","Nuisance","False imprisonment"],a:0,why:"Selling goods as if they were your own is conversion."},
  {t:"fill",q:"Entering with legal authority and then abusing it makes one a trespasser ab ___.",o:["initio","extra","limine"],a:0,why:"Trespass ab initio = trespass from the beginning."},
  {t:"match",q:"Match",pairs:[["Conversion","Using goods as one's own"],["Detinue","Keeping goods after demand"],["Trespass to land","Entering without permission"]],why:"Each protects a different interest in property."}
 ]}
]},
/* ───────────── UNIT 5 ───────────── */
{id:"u5",title:"Consumer and Motor Vehicles Law",sub:"Consumer Protection Act, 2019 and Motor Vehicles Act, 1988",lessons:[
 {id:"u5l1",title:"Who is a consumer?",
  notes:["Use the Consumer Protection Act, 2019 (the 1986 Act is repealed).",
   "Consumer (s.2(7)): buys goods or hires services for consideration (payment). Online purchases are included.",
   "Not a consumer: one who buys for resale or for commercial purpose (but buying to earn a livelihood by self-employment is allowed).",
   "Complaints are about defect in goods, deficiency in service, unfair trade practice, overcharging, etc. IMA v V.P. Shantha: paid medical services are covered."],
  qs:[
  {t:"mcq",q:"Which law should you use today for a consumer complaint?",o:["Consumer Protection Act, 2019","Consumer Protection Act, 1986","Indian Contract Act only"],a:0,why:"The 2019 Act replaced the 1986 Act."},
  {t:"tf",q:"Buying a mobile phone online means you are not a consumer.",a:false,why:"Section 2(7) expressly includes online transactions."},
  {t:"mcq",q:"Anil buys 100 fans to resell in his shop. Is he a 'consumer' for these fans?",o:["No — bought for resale","Yes — he paid money","Yes — all buyers are consumers"],a:0,why:"Goods bought for resale are excluded."},
  {t:"mcq",q:"IMA v V.P. Shantha held that…",o:["Paid medical services come under consumer law","Doctors are never covered","Only Government hospitals are covered"],a:0,why:"Services of doctors and hospitals for payment are 'services' under consumer law."},
  {t:"fill",q:"A fault in goods is a 'defect'. A fault in a service is a '___'.",o:["deficiency","nuisance","trespass"],a:0,why:"Defect = goods; deficiency = services."},
  {t:"tf",q:"A person who buys an auto-rickshaw to earn his own livelihood by driving it can still be a consumer.",a:true,why:"The Act's explanation allows self-employment to earn a livelihood."}
 ]},
 {id:"u5l2",title:"Consumer Commissions",
  notes:["Three levels: District Commission, State Commission, National Commission (NCDRC).",
   "Money limits (2021 Rules, value of goods/services paid): District up to ₹50 lakh; State above ₹50 lakh up to ₹2 crore; National above ₹2 crore.",
   "Complaint within 2 years from the cause of action (s.69). Delay can be excused for sufficient cause.",
   "You can file where you live or work (s.34). The Central Consumer Protection Authority (CCPA) is a different body — it acts on unfair trade practices and misleading ads."],
  qs:[
  {t:"mcq",q:"Sneha paid ₹70 lakh for a flat with defects. Which Commission?",o:["State Commission","District Commission","National Commission"],a:0,why:"Above ₹50 lakh and up to ₹2 crore goes to the State Commission."},
  {t:"mcq",q:"Deepak paid ₹25,000 for a faulty washing machine. Which Commission?",o:["District Commission","State Commission","National Commission"],a:0,why:"Up to ₹50 lakh goes to the District Commission."},
  {t:"fill",q:"A consumer complaint should be filed within ___ years from the cause of action.",o:["two","three","five"],a:0,why:"Section 69: two years, with power to excuse delay for sufficient cause."},
  {t:"tf",q:"A consumer in Kalaburagi can file in the District Commission where he lives, even if the seller is in Delhi.",a:true,why:"Section 34 allows filing where the complainant resides or personally works for gain."},
  {t:"match",q:"Match",pairs:[["Up to ₹50 lakh","District Commission"],["Above ₹50 lakh to ₹2 crore","State Commission"],["Above ₹2 crore","National Commission"]],why:"Limits under the 2021 Jurisdiction Rules."},
  {t:"tf",q:"The CCPA and the District Commission are the same body.",a:false,why:"CCPA (s.10) is a regulator. Commissions decide consumer disputes."}
 ]},
 {id:"u5l3",title:"Motor accident compensation",
  notes:["Motor Vehicles Act, 1988. Third-party insurance is compulsory (s.146).",
   "No-fault liability (s.164): ₹5 lakh for death, ₹2.5 lakh for grievous hurt. No need to prove the driver's fault.",
   "Hit-and-run (s.161, 2022 Scheme): ₹2 lakh for death, ₹50,000 for grievous hurt when the vehicle cannot be traced.",
   "Claims go to the Motor Accidents Claims Tribunal (MACT) — s.165 and s.166."],
  qs:[
  {t:"mcq",q:"Under s.164 (no-fault), how much for death?",o:["₹5 lakh","₹2 lakh","₹50,000"],a:0,why:"Section 164: ₹5 lakh for death, ₹2.5 lakh for grievous hurt."},
  {t:"mcq",q:"An unknown lorry hits Basavaraj at night near Hosapete and runs away. He dies. Under the hit-and-run scheme, his family gets…",o:["₹2 lakh","₹5 lakh","Nothing"],a:0,why:"Section 161 and the 2022 Scheme: ₹2 lakh for death in hit-and-run."},
  {t:"fill",q:"Motor accident claims are decided by the Motor Accidents Claims ___.",o:["Tribunal","Commission","Panchayat"],a:0,why:"MACT is set up under s.165."},
  {t:"tf",q:"Under no-fault liability, the victim must prove the driver was negligent.",a:false,why:"No-fault means fault need not be proved for that fixed amount."},
  {t:"match",q:"Match the section",pairs:[["Section 146","Compulsory third-party insurance"],["Section 161","Hit-and-run"],["Section 164","No-fault compensation"]],why:"Learn these three sections for the exam."},
  {t:"mcq",q:"In hit-and-run, how much is given for grievous hurt?",o:["₹50,000","₹2.5 lakh","₹10,000"],a:0,why:"The 2022 Scheme gives ₹50,000 for grievous hurt."}
 ]},
 {id:"u5l4",title:"Road accident: help and time limits",
  notes:["Good Samaritan (s.134A): a person who helps an accident victim in good faith is protected from civil and criminal action.",
   "Cashless treatment (s.162, 2025 Scheme): up to ₹1.5 lakh per victim, for up to 7 days from the accident. This is treatment, not a Tribunal award.",
   "Claim time (s.166(3)): apply within 6 months. A 2026 amendment (in force from 15 August 2026) lets the Tribunal accept a late claim within a further 12 months for sufficient cause.",
   "s.164 and s.161 are separate routes. Check the latest notifications before writing exact amounts."],
  qs:[
  {t:"mcq",q:"Pooja takes a road accident victim to hospital in Shivamogga. Is she protected from harassment by law?",o:["Yes — Good Samaritan, s.134A","No","Only if she is a doctor"],a:0,why:"Section 134A protects Good Samaritans who help in good faith."},
  {t:"mcq",q:"Under the 2025 Cashless Treatment Scheme, cover is up to…",o:["₹1.5 lakh for up to 7 days","₹5 lakh for 30 days","Unlimited"],a:0,why:"Up to ₹1.5 lakh per victim, within 7 days from the accident."},
  {t:"fill",q:"A claim to the Tribunal should be filed within ___ months of the accident.",o:["six","three","twenty-four"],a:0,why:"Section 166(3) — six months; a late claim may be allowed within a further 12 months for sufficient cause (2026 amendment)."},
  {t:"tf",q:"Cashless treatment and compensation from the Tribunal are the same thing.",a:false,why:"Cashless scheme pays for treatment. The Tribunal awards compensation separately."},
  {t:"tf",q:"After the 2026 amendment, a Tribunal can accept a late claim within a further 12 months if there is sufficient cause.",a:true,why:"The Jan Vishwas Act, 2026 added this proviso to s.166(3), in force from 15 August 2026."}
 ]}
]}
]};
})(typeof window!=="undefined"?window:globalThis);

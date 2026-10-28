/* Case Book v81 — exam-ready case summaries used across the whole app.
   Every case name anywhere in the app becomes a link to its summary (case-book.js).
   Fields: id, name, also (other spellings to match), cite, court, year, subject,
   facts, issue, held, rule (the principle in one line), exam (lines to write in an exam answer).
   [[word]] or [[glossary word|shown words]] marks a difficult word; it links to the word list,
   and the word list links back to every case that uses it. Plain text only — never HTML. */
(function(root){
"use strict";
var C=[];
function add(o){C.push(o);}

/* ───────────── CONTRACT ───────────── */
add({id:"carlill",name:"Carlill v Carbolic Smoke Ball Co",also:["Carlill v. Carbolic Smoke Ball Co","Carlill v Carbolic","Carlill"],cite:"[1893] 1 QB 256",court:"Court of Appeal, England",year:1893,subject:"contract",
 facts:"The company advertised that it would pay £100 to anyone who used its smoke ball as directed and still caught flu. It said it had deposited £1,000 in a bank to show it was serious. Mrs Carlill used the ball and got flu.",
 issue:"Was the advertisement a binding [[offer]]? Did she need to tell the company she accepted?",
 held:"Yes. It was a [[general offer]] to the world, and anyone who did the act accepted it. In a [[unilateral contract]], doing the act is the acceptance; separate notice is not needed.",
 rule:"A general offer can be accepted by anyone who performs its conditions (Sections 8 and 10, Contract Act).",
 exam:"In Carlill v Carbolic Smoke Ball Co (1893), the court held that an advertisement promising a reward was a general offer, accepted by performing the conditions. So a general offer is a valid proposal, and performance itself is acceptance under Section 8."});
add({id:"lalman",name:"Lalman Shukla v Gauri Dutt",also:["Lalman Shukla v. Gauri Dutt","Lalman Shukla v Gauri Datt","Lalman Shukla"],cite:"(1913) 11 All LJ 489",court:"Allahabad High Court",year:1913,subject:"contract",
 facts:"Gauri Dutt's nephew went missing. He sent his servant Lalman to search for the boy. Later he announced a reward for whoever found him. Lalman found the boy, not knowing of the reward, and later claimed it.",
 issue:"Can a person accept an [[offer]] he does not know about?",
 held:"No. Lalman could not claim the reward because he did not know of the offer when he found the boy. There can be no [[acceptance]] without knowledge of the offer.",
 rule:"Knowledge of the offer is necessary before it can be accepted.",
 exam:"In Lalman Shukla v Gauri Dutt (1913), the servant who found the missing boy without knowing of the reward could not claim it. Acceptance needs knowledge of the proposal; doing the act by chance is not acceptance."});
add({id:"mohori",name:"Mohori Bibee v Dharmodas Ghose",also:["Mohori Bibee v. Dharmodas Ghose","Mohori Bibee"],cite:"(1903) 30 IA 114",court:"Privy Council",year:1903,subject:"contract",
 facts:"Dharmodas, a [[minor]], mortgaged his house to a moneylender for ₹20,000. The lender's agent knew he was a minor. Dharmodas's mother later sued to cancel the mortgage.",
 issue:"Is an agreement with a minor [[void]] or [[voidable]]? Must the minor return the money received?",
 held:"An agreement with a minor is void from the start ([[void ab initio]]). The mortgage was cancelled, and the minor did not have to repay the money.",
 rule:"A minor's agreement is absolutely void under Sections 10 and 11; there is no [[estoppel]] against a minor.",
 exam:"In Mohori Bibee v Dharmodas Ghose (1903), the Privy Council held that a minor's agreement is void ab initio under Sections 10 and 11. The minor's mortgage was set aside, and he was not made to repay the loan."});
add({id:"khangul",name:"Khan Gul v Lakha Singh",also:["Khan Gul v. Lakha Singh","Khan Gul"],cite:"AIR 1928 Lah 609",court:"Lahore High Court",year:1928,subject:"contract",
 facts:"A [[minor]] lied about his age and agreed to sell land to Lakha Singh. He took ₹17,500 but refused to give the land.",
 issue:"Can a minor who lied about his age be made to return what he got?",
 held:"The contract was [[void]], so the land could not be claimed. But the court, using [[equity]], ordered the minor to return the money (restitution).",
 rule:"A minor who gets money by lying about age can be ordered to return it, though the contract itself is void.",
 exam:"In Khan Gul v Lakha Singh (1928), a minor who falsely claimed to be an adult was ordered to refund the price, though the sale contract was void. Courts use equity to prevent unjust benefit."});
add({id:"balfour",name:"Balfour v Balfour",also:["Balfour v. Balfour"],cite:"[1919] 2 KB 571",court:"Court of Appeal, England",year:1919,subject:"contract",
 facts:"A husband working in Ceylon promised to pay his wife £30 a month while she stayed in England for health reasons. Later they separated and he stopped paying.",
 issue:"Was the husband's promise a legally binding contract?",
 held:"No. Agreements between husband and wife in daily family life are not meant to create legal relations.",
 rule:"Domestic and social agreements are presumed to lack [[intention to create legal relations]].",
 exam:"In Balfour v Balfour (1919), a husband's promise of a monthly allowance to his wife was not enforceable, as domestic arrangements lack intention to create legal relations."});
add({id:"felthouse",name:"Felthouse v Bindley",also:["Felthouse v. Bindley"],cite:"(1862) 11 CB (NS) 869",court:"Court of Common Pleas, England",year:1862,subject:"contract",
 facts:"An uncle wrote to his nephew offering to buy his horse and said, 'If I hear no more about him, I consider the horse mine.' The nephew did not reply. An auctioneer sold the horse by mistake.",
 issue:"Can silence be treated as [[acceptance]]?",
 held:"No. The uncle could not force a contract by saying silence would mean acceptance. There was no contract.",
 rule:"Silence is not acceptance; acceptance must be communicated (Section 7).",
 exam:"In Felthouse v Bindley (1862), the nephew's silence was not acceptance of his uncle's offer. A proposer cannot impose silence as acceptance; acceptance must be communicated."});
add({id:"boots",name:"Pharmaceutical Society v Boots",also:["Pharmaceutical Society v. Boots","Pharmaceutical Society of Great Britain v Boots"],cite:"[1953] 1 QB 401",court:"Court of Appeal, England",year:1953,subject:"contract",
 facts:"Boots ran a self-service shop where customers picked medicines from shelves and paid at a cash desk where a pharmacist supervised. The law required a pharmacist to supervise the sale.",
 issue:"Was the sale made at the shelf or at the cash desk?",
 held:"Goods on a shelf are an [[invitation to offer]]. The customer makes the [[offer]] at the cash desk, and the shop accepts there. So the sale was supervised.",
 rule:"Display of goods with price tags is an invitation to offer, not an offer.",
 exam:"In Pharmaceutical Society v Boots (1953), display of goods in a self-service shop was held to be an invitation to offer; the customer offers at the counter and the seller accepts."});
add({id:"bhagwandas",name:"Bhagwandas Goverdhandas Kedia v Girdharilal Parshottamdas",also:["Bhagwandas Goverdhandas Kedia","Bhagwandas Kedia"],cite:"AIR 1966 SC 543",court:"Supreme Court of India",year:1966,subject:"contract",
 facts:"A firm in Ahmedabad made an offer by telephone to a company at Khamgaon, which accepted on the phone. Later a dispute arose, and a suit was filed in Ahmedabad.",
 issue:"Where is a contract made by telephone completed — where acceptance is spoken or where it is heard?",
 held:"Where the [[acceptance]] is heard by the proposer — here, Ahmedabad. Telephone is like talking face to face, so the postal rule does not apply.",
 rule:"For instant communication (telephone), the contract is made where acceptance is received.",
 exam:"In Bhagwandas Kedia v Girdharilal (1966), the Supreme Court held that a contract made over telephone is complete where the acceptance is heard, so the Ahmedabad court had jurisdiction."});
add({id:"chinnaya",name:"Chinnaya v Ramayya",also:["Chinnaya v. Ramayya","Chinnaya"],cite:"(1882) ILR 4 Mad 137",court:"Madras High Court",year:1882,subject:"contract",
 facts:"An old woman gifted her property to her daughter, on condition that the daughter would pay a yearly sum to the old woman's sister (Chinnaya). The daughter promised but did not pay.",
 issue:"Can Chinnaya sue, though she gave no [[consideration]] herself?",
 held:"Yes. Under Indian law consideration can move from the promisee 'or any other person'. The mother's gift was enough consideration.",
 rule:"Consideration may come from a third person (Section 2(d)).",
 exam:"In Chinnaya v Ramayya (1882), the sister could enforce the daughter's promise because, under Section 2(d), consideration may move from the promisee or any other person — here, the mother's gift."});
add({id:"abdulaziz",name:"Abdul Aziz v Masum Ali",also:["Abdul Aziz v. Masum Ali","Abdul Aziz"],cite:"(1914) ILR 36 All 268",court:"Allahabad High Court",year:1914,subject:"contract",
 facts:"Abdul Aziz promised ₹500 for rebuilding a mosque. The committee had not started any work or taken any step relying on his promise. He did not pay.",
 issue:"Was the promise to donate enforceable?",
 held:"No. The committee had suffered no [[detriment]] and done nothing because of the promise, so there was no [[consideration]].",
 rule:"A promise to donate is not enforceable unless the promisee acted on it.",
 exam:"In Abdul Aziz v Masum Ali (1914), a promise to subscribe for a mosque was not enforceable because the committee had not acted on it; there was no consideration."});
add({id:"kedarnath",name:"Kedarnath Bhattacharji v Gorie Mahomed",also:["Kedarnath Bhattacharji v. Gorie Mahomed","Kedarnath Bhattacharji"],cite:"(1886) ILR 14 Cal 64",court:"Calcutta High Court",year:1886,subject:"contract",
 facts:"Gorie Mahomed promised ₹100 for building a town hall in Howrah. Relying on such promises, the commissioners signed contracts with builders. He then refused to pay.",
 issue:"Was the promise to subscribe enforceable?",
 held:"Yes. The commissioners acted on the promise and took on liabilities, which was a [[detriment]] and so good [[consideration]].",
 rule:"A promise to donate becomes enforceable when the promisee acts on it to his detriment.",
 exam:"In Kedarnath v Gorie Mahomed (1886), a subscription promise for a town hall was enforced because the commissioners had entered into contracts relying on it — compare Abdul Aziz v Masum Ali."});
add({id:"hadley",name:"Hadley v Baxendale",also:["Hadley v. Baxendale"],cite:"(1854) 9 Exch 341",court:"Court of Exchequer, England",year:1854,subject:"contract",
 facts:"A mill's crankshaft broke. The owners gave it to a carrier to take to the maker for a copy. The carrier delayed, and the mill stayed closed longer. The carrier was not told the mill would stop without it.",
 issue:"Must the carrier pay for the mill's lost profits?",
 held:"No. Damages cover loss that arises naturally from the breach, or loss both sides had in mind when they made the contract. The lost profit was neither.",
 rule:"Only natural or contemplated loss is recoverable; [[remote]] loss is not (Section 73).",
 exam:"In Hadley v Baxendale (1854), the carrier was not liable for the mill's lost profits, as that loss was neither natural nor in the parties' contemplation. This test is in Section 73 of the Contract Act."});
add({id:"taylor",name:"Taylor v Caldwell",also:["Taylor v. Caldwell"],cite:"(1863) 3 B & S 826",court:"Court of Queen's Bench, England",year:1863,subject:"contract",
 facts:"Taylor hired a music hall from Caldwell for four concerts. Before the first concert, the hall was destroyed by fire, without anyone's fault.",
 issue:"Was Caldwell liable for not providing the hall?",
 held:"No. The contract depended on the hall existing. Its destruction made performance impossible, so both were excused.",
 rule:"A contract is discharged when its subject matter is destroyed — [[frustration]] (Section 56).",
 exam:"In Taylor v Caldwell (1863), the destruction of the music hall by fire discharged the contract. This is the basis of the doctrine of frustration under Section 56."});
add({id:"satyabrata",name:"Satyabrata Ghose v Mugneeram Bangur",also:["Satyabrata Ghose v. Mugneeram Bangur","Satyabrata Ghose"],cite:"AIR 1954 SC 44",court:"Supreme Court of India",year:1954,subject:"contract",
 facts:"A company agreed to develop land into plots and make roads. During World War II, part of the land was taken by the Government for military use, delaying the work.",
 issue:"Did the war-time requisition [[frustration|frustrate]] the contract?",
 held:"No. The delay did not destroy the basis of the contract; work could be done after the requisition ended. 'Impossible' in Section 56 means impracticable or useless for its purpose, not just harder.",
 rule:"Section 56 covers supervening impossibility; mere delay or difficulty does not frustrate a contract.",
 exam:"In Satyabrata Ghose v Mugneeram Bangur (1954), the Supreme Court held that Section 56 applies only when performance becomes impossible or useless for its object; the war-time requisition causing delay did not frustrate the contract."});
add({id:"frost",name:"Frost v Knight",also:["Frost v. Knight"],cite:"(1872) LR 7 Ex 111",court:"Exchequer Chamber, England",year:1872,subject:"contract",
 facts:"Knight promised to marry Frost after his father's death. While his father was still alive, he broke off the engagement.",
 issue:"Could Frost sue before the father died, that is, before the time to perform came?",
 held:"Yes. A clear refusal before the due date is an [[anticipatory breach]]; the other party can sue at once.",
 rule:"Anticipatory breach allows an immediate suit (Section 39).",
 exam:"In Frost v Knight (1872), the man's refusal to marry before the due time was an anticipatory breach, and the woman could sue at once. See Section 39."});
add({id:"robinson",name:"Robinson v Davison",also:["Robinson v. Davison"],cite:"(1871) LR 6 Ex 269",court:"Court of Exchequer, England",year:1871,subject:"contract",
 facts:"A pianist agreed to play at a concert on a fixed day. She fell ill and could not perform.",
 issue:"Was she liable for breach?",
 held:"No. The contract needed her personal skill; her illness made performance impossible, so it was discharged.",
 rule:"Illness or death discharges a contract for personal services ([[frustration]]).",
 exam:"In Robinson v Davison (1871), the pianist's illness discharged her contract to perform, as it depended on her personal service."});
add({id:"fatehchand",name:"Fateh Chand v Balkishan Das",also:["Fateh Chand v. Balkishan Das","Fateh Chand"],cite:"AIR 1963 SC 1405",court:"Supreme Court of India",year:1963,subject:"contract",
 facts:"A buyer paid ₹1,000 as earnest money and ₹24,000 towards price for a property in Delhi. He failed to complete the sale. The seller kept the whole ₹25,000.",
 issue:"Could the seller keep all the money as the contract said?",
 held:"Only the ₹1,000 earnest money could be forfeited. For the rest, the seller could get only [[reasonable compensation]] for proven loss, under Section 74.",
 rule:"Under Section 74, a stated sum is the upper limit; only reasonable compensation is given ([[penalty]] not enforced).",
 exam:"In Fateh Chand v Balkishan Das (1963), the Supreme Court held that under Section 74 only reasonable compensation up to the stipulated sum can be awarded; the seller could forfeit the earnest money but not the part-price."});
add({id:"kailashnath",name:"Kailash Nath Associates v Delhi Development Authority",also:["Kailash Nath Associates v DDA","Kailash Nath Associates v. DDA","Kailash Nath Associates"],cite:"(2015) 4 SCC 136",court:"Supreme Court of India",year:2015,subject:"contract",
 facts:"DDA auctioned a plot and the highest bidder paid earnest money. After delays, DDA cancelled the bid and forfeited the earnest money. It later sold the plot at a higher price, so it suffered no loss.",
 issue:"Can earnest money be forfeited when no loss is suffered?",
 held:"No. Section 74 gives only reasonable compensation for loss actually suffered. Since DDA had no loss, it had to return the earnest money.",
 rule:"Forfeiture under Section 74 needs some legal injury or loss; no loss, no compensation.",
 exam:"In Kailash Nath Associates v DDA (2015), forfeiture of earnest money was set aside because DDA suffered no loss; Section 74 awards only reasonable compensation for actual loss."});

/* ───────────── TORTS ───────────── */
add({id:"ashby",name:"Ashby v White",also:["Ashby v. White"],cite:"(1703) 2 Ld Raym 938",court:"House of Lords / King's Bench, England",year:1703,subject:"torts",
 facts:"Ashby was a qualified voter. White, the returning officer, wrongly refused to let him vote. Ashby's candidate won anyway, so he lost nothing.",
 issue:"Can a person sue when his legal right is violated but he suffers no loss?",
 held:"Yes. Every violation of a legal right is actionable, even without [[damage]]. Ashby got damages.",
 rule:"[[Injuria sine damno]] — legal injury without loss is actionable.",
 exam:"In Ashby v White (1703), a voter wrongly stopped from voting succeeded though his candidate won, illustrating injuria sine damno: violation of a legal right is actionable even without actual loss."});
add({id:"gloucester",name:"Gloucester Grammar School case",also:["Gloucester Grammar School","Hugh v Gloucester"],cite:"(1410) YB 11 Hen IV",court:"Court of Common Pleas, England",year:1410,subject:"torts",
 facts:"A schoolmaster set up a rival school next to the Gloucester Grammar School. The old school lost students and had to cut its fees from 40 pence to 12 pence.",
 issue:"Can a person sue for money lost because of fair competition?",
 held:"No. There was loss but no legal right was violated; competition is lawful.",
 rule:"[[Damnum sine injuria]] — loss without legal injury is not actionable.",
 exam:"In the Gloucester Grammar School case (1410), the old school's loss of fees due to a rival school was not actionable — damnum sine injuria."});
add({id:"bradford",name:"Bradford Corporation v Pickles",also:["Bradford Corporation v. Pickles","Mayor of Bradford v Pickles"],cite:"[1895] AC 587",court:"House of Lords",year:1895,subject:"torts",
 facts:"Pickles dug shafts on his own land that cut off underground water flowing to the Corporation's reservoir. He did it to force them to buy his land at a high price.",
 issue:"Does a bad motive make a lawful act a [[tort]]?",
 held:"No. Pickles used his own land lawfully. His bad motive ([[malice]]) did not make it wrong.",
 rule:"Motive is generally irrelevant in tort; a lawful act does not become unlawful because of malice.",
 exam:"In Bradford Corporation v Pickles (1895), the landowner who cut off underground water to pressure the Corporation was not liable, since a lawful act is not made unlawful by a bad motive."});
add({id:"hall",name:"Hall v Brooklands Auto Racing Club",also:["Hall v. Brooklands Auto Racing Club","Hall v Brooklands"],cite:"[1933] 1 KB 205",court:"Court of Appeal, England",year:1933,subject:"torts",
 facts:"Hall paid to watch a car race. Two cars collided and one flew over the railing into the crowd, injuring him. Such an accident had never happened there before.",
 issue:"Was the club liable, or had Hall accepted the risk?",
 held:"Not liable. A spectator accepts the ordinary risks of the sport ([[volenti non fit injuria]]), and this rare accident was not foreseeable.",
 rule:"Spectators impliedly consent to the normal risks of a game.",
 exam:"In Hall v Brooklands (1933), a spectator injured by a racing car could not recover, as he had impliedly accepted the inherent risk — volenti non fit injuria."});
add({id:"smithbaker",name:"Smith v Baker & Sons",also:["Smith v Baker","Smith v. Baker"],cite:"[1891] AC 325",court:"House of Lords",year:1891,subject:"torts",
 facts:"Smith drilled rock in a quarry. A crane swung heavy stones over his head without warning. He knew of this. A stone fell and injured him.",
 issue:"Did his knowledge of the risk mean he agreed to it ([[volenti non fit injuria]])?",
 held:"No. Knowing about a risk is not the same as freely agreeing to it. The employer was liable.",
 rule:"Scienti non fit injuria is not the law — knowledge is not consent.",
 exam:"In Smith v Baker (1891), a worker's knowledge of the crane risk was not consent; volenti did not apply and the employer was liable."});
add({id:"haynes",name:"Haynes v Harwood",also:["Haynes v. Harwood"],cite:"[1935] 1 KB 146",court:"Court of Appeal, England",year:1935,subject:"torts",
 facts:"A van with two horses was left unattended on a busy street. A boy threw a stone and the horses bolted towards people. A policeman stopped them and was injured.",
 issue:"Could the owner say the policeman chose the risk ([[volenti non fit injuria]])?",
 held:"No. A rescuer acting to save others is not a volunteer. The owner, whose [[negligence]] created the danger, was liable.",
 rule:"The 'rescue' cases: volenti is not a defence against a rescuer.",
 exam:"In Haynes v Harwood (1935), a policeman injured while stopping runaway horses recovered damages; volenti does not apply to rescuers."});
add({id:"nichols",name:"Nichols v Marsland",also:["Nichols v. Marsland"],cite:"(1876) 2 Ex D 1",court:"Court of Appeal, England",year:1876,subject:"torts",
 facts:"Marsland had artificial lakes on his land. An extraordinary rainfall, heavier than any in memory, broke the banks and washed away four bridges.",
 issue:"Was Marsland liable under [[strict liability]]?",
 held:"No. The rain was so extraordinary that it was an [[act of God]], which is a defence.",
 rule:"Act of God (vis major) is a defence when a natural event could not be foreseen or guarded against.",
 exam:"In Nichols v Marsland (1876), extraordinary rainfall that burst artificial lakes was an act of God, so the owner was not liable even under strict liability."});
add({id:"stanley",name:"Stanley v Powell",also:["Stanley v. Powell"],cite:"[1891] 1 QB 86",court:"Queen's Bench, England",year:1891,subject:"torts",
 facts:"At a bird shoot, Powell fired at a pheasant. A pellet bounced off an oak tree and hit Stanley.",
 issue:"Was Powell liable though he took all care?",
 held:"No. It was an [[inevitable accident]] that could not be avoided with reasonable care.",
 rule:"Inevitable accident is a defence when harm occurs despite reasonable care.",
 exam:"In Stanley v Powell (1891), a pellet that glanced off a tree was an inevitable accident, so the careful shooter was not liable."});
add({id:"vaughan",name:"Vaughan v Taff Vale Railway Co",also:["Vaughan v Taff Vale Railway","Vaughan v Taff Vale"],cite:"(1860) 5 H & N 679",court:"Exchequer Chamber, England",year:1860,subject:"torts",
 facts:"A railway ran under an Act of Parliament. Sparks from an engine set fire to Vaughan's woods. The company took all reasonable care.",
 issue:"Was the company liable for the fire?",
 held:"No. The railway was run under [[statutory authority]], and the harm happened without [[negligence]].",
 rule:"Statutory authority is a defence for unavoidable harm from authorised work.",
 exam:"In Vaughan v Taff Vale Railway (1860), a railway authorised by statute was not liable for sparks that caused fire, as it had taken reasonable care."});
add({id:"century",name:"Century Insurance v Northern Ireland Road Transport Board",also:["Century Insurance"],cite:"[1942] AC 509",court:"House of Lords",year:1942,subject:"torts",
 facts:"A tanker driver unloading petrol at a garage lit a cigarette and threw away the match. A fire and explosion followed.",
 issue:"Was the employer liable for the driver's careless act?",
 held:"Yes. Smoking was a careless way of doing his job, so it was within the [[course of employment]]. The employer was [[vicarious liability|vicariously liable]].",
 rule:"A negligent way of doing an authorised act is within the course of employment.",
 exam:"In Century Insurance (1942), the employer was vicariously liable for the explosion caused by its driver smoking while unloading petrol — a negligent mode of doing his work."});
add({id:"limpus",name:"Limpus v London General Omnibus Co",also:["Limpus v. London General Omnibus","Limpus"],cite:"(1862) 1 H & C 526",court:"Exchequer Chamber, England",year:1862,subject:"torts",
 facts:"A bus company told its drivers not to race or block other buses. A driver raced a rival bus and caused an accident.",
 issue:"Was the company liable though it had forbidden racing?",
 held:"Yes. The driver was doing his job (driving the bus), though in a forbidden way. That is within the [[course of employment]].",
 rule:"A prohibited mode of doing an authorised act still makes the employer liable.",
 exam:"In Limpus v London General Omnibus (1862), the bus company was liable for its driver's racing despite a prohibition, as the act was an improper mode of performing his duty."});
add({id:"lloyd",name:"Lloyd v Grace, Smith & Co",also:["Lloyd v. Grace, Smith & Co","Lloyd v Grace"],cite:"[1912] AC 716",court:"House of Lords",year:1912,subject:"torts",
 facts:"Mrs Lloyd consulted a firm of solicitors. The firm's managing clerk tricked her into transferring her property to him and sold it for himself.",
 issue:"Was the firm liable for the clerk's fraud done for his own benefit?",
 held:"Yes. The clerk acted within his apparent authority as the firm's agent, so the firm was [[vicarious liability|vicariously liable]].",
 rule:"An employer is liable for an employee's fraud committed within the course of employment, even for the employee's own benefit.",
 exam:"In Lloyd v Grace, Smith & Co (1912), the solicitors were liable for their clerk's fraud since it was committed in the course of his employment."});
add({id:"ricketts",name:"Ricketts v Thomas Tilling",also:["Ricketts v. Thomas Tilling"],cite:"[1915] 1 KB 644",court:"Court of Appeal, England",year:1915,subject:"torts",
 facts:"A bus conductor drove the bus, with the driver sitting beside him, and hit a person.",
 issue:"Was the bus company liable?",
 held:"Yes. The driver was negligent in letting the conductor drive in his presence, and that was in the [[course of employment]].",
 rule:"An employee who lets an unauthorised person do his job may make the employer liable.",
 exam:"In Ricketts v Thomas Tilling (1915), the company was liable because its driver negligently allowed the conductor to drive in his presence. Compare Beard v London General Omnibus."});
add({id:"beard",name:"Beard v London General Omnibus Co",also:["Beard v. London General Omnibus","Beard v London General Omnibus"],cite:"[1900] 2 QB 530",court:"Court of Appeal, England",year:1900,subject:"torts",
 facts:"At the end of a journey, the bus conductor drove the bus himself, in the driver's absence, and injured someone.",
 issue:"Was the company liable for the conductor's driving?",
 held:"No. Driving was not part of a conductor's job, so it was outside the [[course of employment]].",
 rule:"An act outside the employee's scope of work does not make the employer liable.",
 exam:"In Beard v London General Omnibus (1900), the company was not liable when its conductor drove the bus, as driving was outside his employment."});
add({id:"vidyawati",name:"State of Rajasthan v Vidyawati",also:["State of Rajasthan v. Vidyawati","Vidyawati"],cite:"AIR 1962 SC 933",court:"Supreme Court of India",year:1962,subject:"torts",
 facts:"A Government jeep used by the Collector was being driven back from repair by a Government driver. He drove rashly and killed a man on the footpath.",
 issue:"Is the State liable for its driver's tort, or protected by [[sovereign immunity]]?",
 held:"The State was liable like any employer. Driving a jeep from a workshop is not a [[sovereign function]].",
 rule:"The State is vicariously liable for torts of its employees in non-sovereign work (Article 300).",
 exam:"In State of Rajasthan v Vidyawati (1962), the State was held vicariously liable for the rash driving of its jeep driver, since it was not a sovereign function."});
add({id:"kasturilal",name:"Kasturi Lal v State of UP",also:["Kasturi Lal v. State of U.P.","Kasturi Lal Ralia Ram Jain v State of UP","Kasturi Lal"],cite:"AIR 1965 SC 1039",court:"Supreme Court of India",year:1965,subject:"torts",
 facts:"Police arrested a jeweller, Kasturi Lal, and kept his gold at the police station. The head constable ran away with it.",
 issue:"Was the State liable for the loss caused by its policemen's [[negligence]]?",
 held:"No. Arresting and seizing property is a [[sovereign function]], so the State had [[sovereign immunity]].",
 rule:"No State liability for torts in sovereign functions (later cases have narrowed this).",
 exam:"In Kasturi Lal v State of UP (1965), the State was not liable for gold lost by its police, as seizure was a sovereign function. Later cases like Nilabati Behera have narrowed this immunity."});
add({id:"subhagwanti",name:"Municipal Corporation of Delhi v Subhagwanti",also:["MCD v Subhagwanti","MCD v. Subhagwanti","Municipal Corporation of Delhi v. Subhagwanti","Subhagwanti"],cite:"AIR 1966 SC 1750",court:"Supreme Court of India",year:1966,subject:"torts",
 facts:"An 80-year-old clock tower in Chandni Chowk, owned and controlled by the Municipal Corporation, suddenly collapsed and killed several people.",
 issue:"Was the Corporation liable without direct proof of [[negligence]]?",
 held:"Yes. A well-kept tower does not fall by itself. [[Res ipsa loquitur]] applied, and the Corporation could not show it took proper care.",
 rule:"When an accident would not happen without negligence and the thing was under the defendant's control, negligence is presumed.",
 exam:"In MCD v Subhagwanti (1966), the collapse of the Chandni Chowk clock tower raised a presumption of negligence under res ipsa loquitur, and the Corporation was held liable."});
add({id:"donoghue",name:"Donoghue v Stevenson",also:["Donoghue v. Stevenson","M'Alister v Stevenson"],cite:"[1932] AC 562",court:"House of Lords",year:1932,subject:"torts",
 facts:"A friend bought Mrs Donoghue a ginger beer in a dark bottle. She found a decomposed snail in it and fell ill. She had no contract with the maker, Stevenson.",
 issue:"Does a manufacturer owe a [[duty of care]] to the final consumer, without a contract?",
 held:"Yes. Lord Atkin's [[neighbour principle]]: you must take reasonable care not to harm people closely affected by your acts.",
 rule:"Manufacturers owe a duty of care to consumers; this is the base of modern [[negligence]].",
 exam:"In Donoghue v Stevenson (1932), the House of Lords held that a manufacturer owes a duty of care to the ultimate consumer. Lord Atkin's neighbour principle is the foundation of the modern law of negligence."});
add({id:"byrne",name:"Byrne v Boadle",also:["Byrne v. Boadle"],cite:"(1863) 2 H & C 722",court:"Court of Exchequer, England",year:1863,subject:"torts",
 facts:"Byrne was walking past Boadle's warehouse when a barrel of flour fell from an upper window and hit him. He could not say how it fell.",
 issue:"Can negligence be presumed without direct evidence?",
 held:"Yes. Barrels do not fall from windows without someone's [[negligence]]. The thing speaks for itself — [[res ipsa loquitur]].",
 rule:"Res ipsa loquitur shifts the burden to the defendant to explain.",
 exam:"In Byrne v Boadle (1863), a barrel falling from a warehouse was itself evidence of negligence — res ipsa loquitur."});
add({id:"polemis",name:"Re Polemis and Furness, Withy & Co",also:["Re Polemis"],cite:"[1921] 3 KB 560",court:"Court of Appeal, England",year:1921,subject:"torts",
 facts:"While unloading a ship carrying petrol, a worker carelessly dropped a plank into the hold. It caused a spark, petrol vapour caught fire, and the ship was destroyed.",
 issue:"Was the charterer liable for the whole loss, though a fire was not expected?",
 held:"Yes. A wrongdoer is liable for all [[direct consequences]] of the negligent act, foreseeable or not.",
 rule:"Direct consequence test of [[remote|remoteness]] (later replaced by Wagon Mound).",
 exam:"In Re Polemis (1921), the defendants were liable for all direct consequences of the dropped plank, including the fire. This direct consequence test was later rejected in The Wagon Mound."});
add({id:"wagonmound",name:"Overseas Tankship v Morts Dock (The Wagon Mound)",also:["Wagon Mound","Overseas Tankship v Morts Dock"],cite:"[1961] AC 388",court:"Privy Council",year:1961,subject:"torts",
 facts:"Oil spilled from the ship Wagon Mound in Sydney harbour and spread to a wharf where welding was going on. Sparks lit the oil and the wharf burned. Experts thought this oil would not burn on water.",
 issue:"Is a defendant liable for damage that was not [[foreseeability|foreseeable]]?",
 held:"No. Liability is only for damage of a kind that a reasonable person could foresee. Fire damage was not foreseeable.",
 rule:"Reasonable foreseeability test of [[remote|remoteness]].",
 exam:"In The Wagon Mound (1961), the Privy Council held that a defendant is liable only for reasonably foreseeable damage, rejecting the direct consequence test of Re Polemis."});
add({id:"rylands",name:"Rylands v Fletcher",also:["Rylands v. Fletcher"],cite:"(1868) LR 3 HL 330",court:"House of Lords",year:1868,subject:"torts",
 facts:"Rylands had a reservoir built on his land. Water flowed through old hidden mine shafts and flooded Fletcher's coal mine. Rylands was not careless himself.",
 issue:"Is a person liable for escape of a dangerous thing without [[negligence]]?",
 held:"Yes. A person who brings a dangerous thing on his land for [[non-natural use]] is liable if it escapes and causes harm.",
 rule:"[[Strict liability]]: dangerous thing + escape + non-natural use. Defences: act of God, plaintiff's fault, act of stranger, consent, statutory authority.",
 exam:"In Rylands v Fletcher (1868), the owner of a reservoir was held liable when its water escaped and flooded a mine, without proof of negligence. This laid down the rule of strict liability, subject to exceptions."});
add({id:"mcmehta",name:"M.C. Mehta v Union of India (Oleum gas leak)",also:["M.C. Mehta v Union of India","M.C. Mehta v. Union of India","MC Mehta v Union of India","M.C. Mehta"],cite:"AIR 1987 SC 1086",court:"Supreme Court of India",year:1987,subject:"torts",
 facts:"In December 1985, oleum gas leaked from a Shriram Foods and Fertilisers plant in a crowded part of Delhi, harming people. A public interest case was filed.",
 issue:"What liability should a [[hazardous]] industry have in India? Do the Rylands exceptions apply?",
 held:"A hazardous or inherently dangerous industry has [[absolute liability]], with no exceptions. Compensation depends on the size and capacity of the enterprise.",
 rule:"Absolute liability: no defences; compensation must deter.",
 exam:"In M.C. Mehta v Union of India (1987), after the oleum gas leak, the Supreme Court laid down absolute liability for hazardous industries, with none of the Rylands v Fletcher exceptions."});
add({id:"bhimsingh",name:"Bhim Singh v State of J&K",also:["Bhim Singh v. State of J&K","Bhim Singh v State of Jammu and Kashmir","Bhim Singh"],cite:"AIR 1986 SC 494",court:"Supreme Court of India",year:1985,subject:"torts",
 facts:"Bhim Singh, an MLA, was arrested on his way to the Assembly session. He was not produced before a magistrate in time and missed the session.",
 issue:"Can the court award money for illegal detention?",
 held:"Yes. His personal liberty was violated with mischief. The Court awarded ₹50,000 as compensation — a [[constitutional tort]] remedy.",
 rule:"Compensation can be awarded for violation of fundamental rights (Article 21).",
 exam:"In Bhim Singh v State of J&K (1985), the Supreme Court awarded ₹50,000 compensation to an MLA illegally detained, recognising monetary relief for violation of Article 21."});
add({id:"rudulsah",name:"Rudul Sah v State of Bihar",also:["Rudul Sah v. State of Bihar","Rudul Sah"],cite:"(1983) 4 SCC 141",court:"Supreme Court of India",year:1983,subject:"torts",
 facts:"Rudul Sah was acquitted in 1968 but kept in jail for about 14 more years, until 1982.",
 issue:"Can the Supreme Court order money compensation in a [[writ]] petition under Article 32?",
 held:"Yes. Release alone was not enough; the State was ordered to pay compensation for illegal detention.",
 rule:"Monetary compensation is available for violation of Article 21 — [[constitutional tort]].",
 exam:"In Rudul Sah v State of Bihar (1983), the Supreme Court awarded compensation for 14 years of illegal detention after acquittal — the first major case of compensation under Article 32."});
add({id:"nilabati",name:"Nilabati Behera v State of Orissa",also:["Nilabati Behera v. State of Orissa","Nilabati Behera"],cite:"(1993) 2 SCC 746",court:"Supreme Court of India",year:1993,subject:"torts",
 facts:"Nilabati's son was taken into police custody. The next day his body was found on a railway track with many injuries.",
 issue:"Is the State liable to pay for death in custody, or can it claim [[sovereign immunity]]?",
 held:"The State was liable. Sovereign immunity is no defence for violation of fundamental rights; this is a public law remedy, separate from private tort law.",
 rule:"[[Constitutional tort]]: strict liability of the State for violation of Article 21.",
 exam:"In Nilabati Behera v State of Orissa (1993), the Supreme Court held the State liable for a custodial death and said sovereign immunity does not apply to violation of fundamental rights."});
add({id:"stephens",name:"Stephens v Myers",also:["Stephens v. Myers"],cite:"(1830) 4 C & P 349",court:"Nisi Prius, England",year:1830,subject:"torts",
 facts:"At a parish meeting, Myers moved towards the chairman Stephens with a clenched fist. Others stopped him just before he reached Stephens.",
 issue:"Is it a tort when no blow is struck?",
 held:"Yes. Making a person fear immediate force is [[assault]], even without touching.",
 rule:"Assault needs reasonable fear of immediate force; no contact is needed.",
 exam:"In Stephens v Myers (1830), advancing with a raised fist, though stopped before contact, was held to be assault."});
add({id:"bird",name:"Bird v Jones",also:["Bird v. Jones"],cite:"(1845) 7 QB 742",court:"Queen's Bench, England",year:1845,subject:"torts",
 facts:"Part of Hammersmith Bridge was fenced off. Bird was stopped from going forward but was free to go back.",
 issue:"Was this [[false imprisonment]]?",
 held:"No. False imprisonment needs total restraint. Blocking one way while another is open is not enough.",
 rule:"Restraint must be complete for false imprisonment.",
 exam:"In Bird v Jones (1845), stopping a person from going one way while he could go back was not false imprisonment, as restraint must be total."});
add({id:"meering",name:"Meering v Grahame-White Aviation Co",also:["Meering v Grahame-White","Meering v Grahame","Meering"],cite:"(1919) 122 LT 44",court:"Court of Appeal, England",year:1919,subject:"torts",
 facts:"Meering was asked to wait in a room for questioning about thefts. Without his knowledge, two policemen stood outside to stop him leaving.",
 issue:"Can a person be falsely imprisoned without knowing it?",
 held:"Yes. Knowledge of the restraint is not necessary for [[false imprisonment]].",
 rule:"False imprisonment does not need the plaintiff's knowledge.",
 exam:"In Meering v Grahame-White (1919), the plaintiff was falsely imprisoned though he did not know guards had been placed outside the room."});
add({id:"morrison",name:"Morrison v Ritchie",also:["Morrison v. Ritchie"],cite:"(1902) 4 F 645",court:"Court of Session, Scotland",year:1902,subject:"torts",
 facts:"A newspaper, in good faith, printed that Mrs Morrison had given birth to twins. She had married only a month earlier, so readers thought ill of her.",
 issue:"Is innocent intention a defence to [[defamation]]?",
 held:"No. The newspaper was liable; what matters is how readers understand it, not the writer's intention.",
 rule:"Intention to defame is not needed; the effect on reputation counts.",
 exam:"In Morrison v Ritchie (1902), a newspaper was liable for an innocent birth announcement that lowered a newly married woman's reputation; intention is irrelevant in defamation."});
add({id:"tolley",name:"Tolley v J.S. Fry & Sons",also:["Tolley v. J.S. Fry & Sons","Tolley v Fry"],cite:"[1931] AC 333",court:"House of Lords",year:1931,subject:"torts",
 facts:"Fry's used a cartoon of Tolley, a famous amateur golfer, in a chocolate advertisement without his consent. Readers thought he had taken money, losing his amateur status.",
 issue:"Can an advert that seems harmless be [[defamation]]?",
 held:"Yes. Through [[innuendo]] (hidden meaning), it suggested he had sold his amateur status. Fry's was liable.",
 rule:"A statement can defame through innuendo.",
 exam:"In Tolley v Fry (1931), using an amateur golfer's caricature in an advert defamed him by innuendo, implying he had been paid."});
add({id:"wilkinson",name:"Wilkinson v Downton",also:["Wilkinson v. Downton"],cite:"[1897] 2 QB 57",court:"Queen's Bench, England",year:1897,subject:"torts",
 facts:"As a practical joke, Downton told Mrs Wilkinson that her husband had been badly injured in an accident. She suffered [[nervous shock]] and fell seriously ill.",
 issue:"Is a person liable for illness caused by a false statement made as a joke?",
 held:"Yes. Deliberately doing an act likely to cause physical harm, which does cause it, is actionable.",
 rule:"Intentional infliction of nervous shock is a tort.",
 exam:"In Wilkinson v Downton (1897), a cruel practical joke causing nervous shock made the joker liable for intentional harm."});
add({id:"scott",name:"Scott v Shepherd",also:["Scott v. Shepherd"],cite:"(1773) 2 Wm Bl 892",court:"Court of Common Pleas, England",year:1773,subject:"torts",
 facts:"Shepherd threw a lit firework into a market. Two people threw it away from themselves in self-protection. It exploded near Scott and blinded him in one eye.",
 issue:"Was the first thrower liable, though others threw it later?",
 held:"Yes. The others acted on instinct to save themselves; the injury was the [[direct consequences|direct consequence]] of Shepherd's act.",
 rule:"Acts done in panic do not break the chain of causation.",
 exam:"In Scott v Shepherd (1773), the original thrower of a lighted squib was liable for injury caused after others tossed it away in self-defence."});
add({id:"bolton",name:"Bolton v Stone",also:["Bolton v. Stone"],cite:"[1951] AC 850",court:"House of Lords",year:1951,subject:"torts",
 facts:"A cricket ball was hit out of a ground and injured Miss Stone on the road. Balls had gone out only about six times in 30 years.",
 issue:"Was the club negligent for not preventing such a rare event?",
 held:"No. The risk was so small that a reasonable person would not have taken more steps. No [[negligence]].",
 rule:"Reasonable care looks at how likely and how serious the harm is.",
 exam:"In Bolton v Stone (1951), a cricket club was not negligent when a ball rarely hit out injured a passer-by, as the risk was very small."});
add({id:"poonam",name:"Poonam Verma v Ashwin Patel",also:["Poonam Verma v. Ashwin Patel","Poonam Verma"],cite:"(1996) 4 SCC 332",court:"Supreme Court of India",year:1996,subject:"torts",
 facts:"A doctor trained only in homeopathy prescribed allopathic medicines to Poonam Verma's husband, who died.",
 issue:"Is a doctor who practises outside his system of medicine negligent?",
 held:"Yes. Practising a system he was not qualified in was [[negligence per se]]. He was liable to pay compensation.",
 rule:"A medical practitioner must keep within the system he is qualified in.",
 exam:"In Poonam Verma v Ashwin Patel (1996), a homeopath prescribing allopathic medicine was held negligent per se, and liable for the patient's death."});
add({id:"ktdc",name:"KTDC Ltd. v Deepti Singh",also:["KTDC Ltd. v. Deepti Singh","Kerala Tourism Development Corporation v Deepti Singh"],cite:"(2019) Supreme Court",court:"Supreme Court of India",year:2019,subject:"torts",
 facts:"A guest's family claimed compensation after an incident at the swimming pool of a hotel run by the Kerala Tourism Development Corporation.",
 issue:"Did the hotel owe and break a [[duty of care]] towards guests using its pool?",
 held:"The Supreme Court examined duty, breach and damage in a consumer claim against the hotel. Read the full judgment for the exact orders on compensation.",
 rule:"Hotels owe guests reasonable care for facilities such as swimming pools.",
 exam:"KTDC v Deepti Singh (2019) can be cited on a hotel's duty of care to guests using its facilities; check the judgment for the exact compensation ordered.",verify:true});
add({id:"ima",name:"Indian Medical Association v V.P. Shantha",also:["IMA v V.P. Shantha","IMA v. V.P. Shantha","V.P. Shantha"],cite:"(1995) 6 SCC 651",court:"Supreme Court of India",year:1995,subject:"torts",
 facts:"Many cases asked one question: when patients pay doctors and hospitals, can they complain under the Consumer Protection Act?",
 issue:"Are medical services a 'service' under consumer law?",
 held:"Yes. Paid medical services are covered. Free services at Government hospitals for all patients are not, but if some pay, others get covered too.",
 rule:"Patients who pay for treatment are [[consumer|consumers]]; medical [[negligence]] can be a deficiency in service.",
 exam:"In IMA v V.P. Shantha (1995), the Supreme Court held that services rendered by doctors and hospitals for payment fall within consumer law, so medical negligence can be a deficiency in service."});
root.LAW_CASES_A=C;
})(typeof window!=="undefined"?window:globalThis);

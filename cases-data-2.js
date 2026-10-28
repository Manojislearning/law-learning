/* Case Book v81, part 2 — Constitution, Family law, Labour and other first-year cases. Same format as cases-data.js. */
(function(root){
"use strict";
var C=[];
function add(o){C.push(o);}

/* ───────────── CONSTITUTION ───────────── */
add({id:"gopalan",name:"A.K. Gopalan v State of Madras",also:["A.K. Gopalan v. State of Madras","AK Gopalan v State of Madras","A.K. Gopalan"],cite:"AIR 1950 SC 27",court:"Supreme Court of India",year:1950,subject:"constitution",
 facts:"A.K. Gopalan, a communist leader, was held under the Preventive Detention Act, 1950. He said the detention violated Articles 19 and 21.",
 issue:"What does '[[procedure established by law]]' in Article 21 mean?",
 held:"Any procedure made by a valid law was enough; the Court would not test whether it was fair. Each Article was read separately.",
 rule:"Narrow early reading of Article 21 (later overruled in Maneka Gandhi).",
 exam:"In A.K. Gopalan v State of Madras (1950), the Supreme Court took a narrow view that any law-made procedure satisfies Article 21. This view was rejected in Maneka Gandhi v Union of India (1978)."});
add({id:"maneka",name:"Maneka Gandhi v Union of India",also:["Maneka Gandhi v. Union of India","Maneka Gandhi"],cite:"AIR 1978 SC 597",court:"Supreme Court of India",year:1978,subject:"constitution",
 facts:"The Government took away Maneka Gandhi's passport 'in public interest' without giving her reasons or a hearing.",
 issue:"Does Article 21 require the procedure to be fair? Are Articles 14, 19 and 21 linked?",
 held:"Yes. The procedure must be '[[fair, just and reasonable]]', not [[arbitrary]]. Articles 14, 19 and 21 are linked (the 'golden triangle'). [[Natural justice]] applies.",
 rule:"Procedure under Article 21 must be fair, just and reasonable; right to travel abroad is part of personal liberty.",
 exam:"In Maneka Gandhi v Union of India (1978), the Supreme Court held that the procedure under Article 21 must be fair, just and reasonable, linking Articles 14, 19 and 21 and overruling the narrow view in A.K. Gopalan."});
add({id:"kesavananda",name:"Kesavananda Bharati v State of Kerala",also:["Kesavananda Bharati v. State of Kerala","Kesavananda Bharati"],cite:"(1973) 4 SCC 225",court:"Supreme Court of India (13 judges)",year:1973,subject:"constitution",
 facts:"Swami Kesavananda Bharati, head of a mutt in Kerala, challenged Kerala land reform laws and the constitutional amendments protecting them.",
 issue:"Does Parliament have unlimited power to [[amendment|amend]] the Constitution under Article 368?",
 held:"By 7:6, Parliament can amend any part, including Fundamental Rights, but cannot destroy the [[basic structure]] of the Constitution.",
 rule:"Basic structure doctrine limits Parliament's power to amend.",
 exam:"In Kesavananda Bharati v State of Kerala (1973), a 13-judge bench held 7:6 that Parliament may amend any part of the Constitution under Article 368 but cannot alter its basic structure."});
add({id:"champakam",name:"State of Madras v Champakam Dorairajan",also:["State of Madras v. Champakam Dorairajan","Champakam Dorairajan","Champakam"],cite:"AIR 1951 SC 226",court:"Supreme Court of India",year:1951,subject:"constitution",
 facts:"The Madras Communal G.O. fixed seats in medical and engineering colleges by community. Champakam Dorairajan said she was denied a seat because of her caste.",
 issue:"Could the State reserve college seats by caste and religion under the Constitution as it stood in 1951?",
 held:"No. The order violated Article 29(2), which bars denial of admission on grounds of religion, race or caste. It was struck down.",
 rule:"Led to the First Amendment (1951), which added Article 15(4) for [[reservation]] for backward classes.",
 exam:"In State of Madras v Champakam Dorairajan (1951), the communal G.O. was struck down under Article 29(2). Parliament responded with the First Amendment, adding Article 15(4)."});
add({id:"anwarali",name:"State of West Bengal v Anwar Ali Sarkar",also:["State of West Bengal v. Anwar Ali Sarkar","Anwar Ali Sarkar"],cite:"AIR 1952 SC 75",court:"Supreme Court of India",year:1952,subject:"constitution",
 facts:"A West Bengal law let the State send any case it chose to Special Courts with a shorter procedure. Anwar Ali Sarkar was tried by a Special Court.",
 issue:"Does this unguided choice violate the right to equality (Article 14)?",
 held:"Yes. The law gave [[arbitrary]] power with no clear basis for which cases go to Special Courts. It failed the [[reasonable classification]] test.",
 rule:"Classification must have an intelligible differentia and a rational link to the object (Article 14).",
 exam:"In State of West Bengal v Anwar Ali Sarkar (1952), the Special Courts Act was struck down as it gave unguided discretion; classification must rest on intelligible differentia with a rational nexus to the object."});
add({id:"royappa",name:"E.P. Royappa v State of Tamil Nadu",also:["E. P. Royappa v State of Tamil Nadu","E. P. Royappa v. State of Tamil Nadu","E.P. Royappa v. State of Tamil Nadu","E.P. Royappa"],cite:"AIR 1974 SC 555",court:"Supreme Court of India",year:1974,subject:"constitution",
 facts:"Royappa, a senior IAS officer, was moved from Chief Secretary to a lower post. He said it was unequal treatment.",
 issue:"Is Article 14 only about classification, or also about arbitrariness?",
 held:"His claim failed on facts, but the Court said equality and [[arbitrary|arbitrariness]] are enemies. An arbitrary act violates Article 14.",
 rule:"'New doctrine' of Article 14: arbitrariness is against equality.",
 exam:"In E.P. Royappa v State of Tamil Nadu (1974), the Supreme Court said equality is antithetic to arbitrariness, giving Article 14 a new dimension beyond reasonable classification."});
add({id:"nergesh",name:"Air India v Nergesh Meerza",also:["Air India v. Nergesh Meerza","Nergesh Meerza"],cite:"AIR 1981 SC 1829",court:"Supreme Court of India",year:1981,subject:"constitution",
 facts:"Air India's rules ended an air hostess's service on her first pregnancy, and also limited her age of service, unlike male staff.",
 issue:"Were these service rules [[arbitrary]] and against Article 14?",
 held:"Ending service on first pregnancy was struck down as arbitrary and an insult to women. Some other rules were allowed.",
 rule:"Service rules that are unreasonable and arbitrary violate Article 14.",
 exam:"In Air India v Nergesh Meerza (1981), the rule terminating an air hostess's service on first pregnancy was struck down as manifestly arbitrary under Article 14."});
add({id:"nagaraj",name:"K. Nagaraj v State of A.P.",also:["K. Nagaraj v. State of A.P.","K. Nagaraj v State of Andhra Pradesh"],cite:"AIR 1985 SC 551",court:"Supreme Court of India",year:1985,subject:"constitution",
 facts:"Andhra Pradesh reduced the retirement age of all Government employees from 58 to 55 to create jobs for young people.",
 issue:"Was the reduction [[arbitrary]] and against Article 14?",
 held:"No. It applied to everyone and had a reasonable aim. A policy choice with a rational basis is valid.",
 rule:"A uniform policy decision with a rational object is not arbitrary.",
 exam:"In K. Nagaraj v State of A.P. (1985), reducing the retirement age of all employees was upheld, since a uniform policy with a rational object does not violate Article 14."});
add({id:"keralahotel",name:"Kerala Hotel & Restaurant Assn. v State of Kerala",also:["Kerala Hotel & Restaurant Assn. v. State of Kerala","Kerala Hotel and Restaurant Association v State of Kerala"],cite:"AIR 1990 SC 913",court:"Supreme Court of India",year:1990,subject:"constitution",
 facts:"Kerala allowed sale of foreign liquor only in star hotels, not in ordinary hotels and restaurants.",
 issue:"Was this classification unequal under Article 14?",
 held:"No. Treating star hotels differently (for tourism) had a reasonable basis. The [[reasonable classification]] test was met.",
 rule:"Different treatment is valid if the classification is reasonable and linked to the object.",
 exam:"In Kerala Hotel & Restaurant Association v State of Kerala (1990), permitting liquor sale only in star hotels was upheld as a reasonable classification under Article 14."});
add({id:"kaabbas",name:"K.A. Abbas v Union of India",also:["K.A. Abbas v. Union of India","K.A. Abbas"],cite:"AIR 1971 SC 481",court:"Supreme Court of India",year:1970,subject:"constitution",
 facts:"The film-maker K.A. Abbas was refused a 'U' certificate for his film 'A Tale of Four Cities'. He challenged pre-[[censorship]] of films.",
 issue:"Is censorship of films before release valid under Article 19(1)(a)?",
 held:"Yes. Films affect viewers strongly, so prior censorship is a reasonable restriction under Article 19(2), but it must follow clear guidelines.",
 rule:"Pre-censorship of films is valid if it is reasonable and guided.",
 exam:"In K.A. Abbas v Union of India (1970), the Supreme Court upheld pre-censorship of films as a reasonable restriction under Article 19(2), subject to clear standards."});
add({id:"kharak",name:"Kharak Singh v State of U.P.",also:["Kharak Singh v. State of U.P.","Kharak Singh v State of UP","Kharak Singh"],cite:"AIR 1963 SC 1295",court:"Supreme Court of India",year:1962,subject:"constitution",
 facts:"Police kept Kharak Singh under watch, including night-time visits to his house, under UP Police Regulations.",
 issue:"Do such visits violate personal liberty (Article 21)? Is [[privacy]] a fundamental right?",
 held:"Night domiciliary visits violated Article 21 and were struck down. The majority said privacy was not a guaranteed right (later overruled in Puttaswamy).",
 rule:"Personal liberty covers freedom from intrusion into the home.",
 exam:"In Kharak Singh v State of UP (1962), night-time domiciliary visits by police were held to violate Article 21, though the majority did not recognise a right to privacy — later established in K.S. Puttaswamy (2017)."});
add({id:"bijoe",name:"Bijoe Emmanuel v State of Kerala",also:["Bijoe Emmanuel v. State of Kerala","Bijoe Emmanuel"],cite:"(1986) 3 SCC 615",court:"Supreme Court of India",year:1986,subject:"constitution",
 facts:"Three children of Jehovah's Witnesses stood respectfully during the national anthem at school but did not sing, because of their faith. They were expelled.",
 issue:"Did the expulsion violate freedom of speech and religion?",
 held:"Yes. Standing respectfully is not disrespect. Forcing them to sing violated Articles 19(1)(a) and 25. They were taken back.",
 rule:"Freedom of speech includes the right to remain silent.",
 exam:"In Bijoe Emmanuel v State of Kerala (1986), students who stood silently during the national anthem could not be expelled; freedom of speech includes freedom to remain silent (Articles 19(1)(a) and 25)."});
add({id:"basheshar",name:"Basheshar Nath v CIT",also:["Basheshar Nath v. CIT","Basheshar Nath v Commissioner of Income Tax","Basheshar Nath"],cite:"AIR 1959 SC 149",court:"Supreme Court of India",year:1959,subject:"constitution",
 facts:"Basheshar Nath agreed to a tax settlement under a law later found unconstitutional. He then challenged it, and the tax department said he had given up his right.",
 issue:"Can a person give up ([[waiver|waive]]) a fundamental right?",
 held:"No. Fundamental Rights, at least under Article 14, cannot be waived, because they are also for the public good.",
 rule:"Doctrine of waiver does not apply to Fundamental Rights.",
 exam:"In Basheshar Nath v CIT (1959), the Supreme Court held that a person cannot waive a fundamental right such as Article 14."});
add({id:"olga",name:"Olga Tellis v Bombay Municipal Corporation",also:["Olga Tellis v Bombay Municipal Corp.","Olga Tellis v. Bombay Municipal Corporation","Olga Tellis"],cite:"AIR 1986 SC 180",court:"Supreme Court of India",year:1985,subject:"constitution",
 facts:"The Bombay Municipal Corporation decided to remove people living on pavements and in slums. They said they would lose their means of earning.",
 issue:"Is the right to [[livelihood]] part of the right to life (Article 21)?",
 held:"Yes. Without livelihood, life cannot be lived. Eviction was allowed, but only by a fair procedure with notice and after the monsoon.",
 rule:"Right to livelihood is part of Article 21.",
 exam:"In Olga Tellis v Bombay Municipal Corporation (1985), the Supreme Court held that the right to livelihood is part of the right to life under Article 21."});
add({id:"vishaka",name:"Vishaka v State of Rajasthan",also:["Vishaka v. State of Rajasthan","Vishaka"],cite:"(1997) 6 SCC 241",court:"Supreme Court of India",year:1997,subject:"constitution",
 facts:"Bhanwari Devi, a social worker in Rajasthan, was gang-raped for trying to stop a child marriage. There was no law on [[sexual harassment]] at work.",
 issue:"Can the court fill the gap and protect women at the workplace?",
 held:"Yes. Using Articles 14, 19, 21 and the CEDAW convention, the Court laid down binding 'Vishaka Guidelines' until Parliament made a law.",
 rule:"Courts may frame [[guidelines]] to protect fundamental rights where there is no law (later the POSH Act, 2013).",
 exam:"In Vishaka v State of Rajasthan (1997), the Supreme Court laid down binding guidelines against sexual harassment at the workplace, later enacted as the POSH Act, 2013."});
add({id:"puttaswamy",name:"Justice K.S. Puttaswamy (Retd.) v Union of India",also:["K.S. Puttaswamy v Union of India","K.S. Puttaswamy v. Union of India","K.S. Puttaswamy (Retd.) v Union of India","Puttaswamy"],cite:"(2017) 10 SCC 1",court:"Supreme Court of India (9 judges)",year:2017,subject:"constitution",
 facts:"Justice Puttaswamy, a retired judge, challenged the Aadhaar scheme. The Government argued that [[privacy]] was not a fundamental right.",
 issue:"Is the right to privacy a fundamental right?",
 held:"Yes, unanimously. Privacy is part of life and personal liberty under Article 21 and other Part III rights. M.P. Sharma and Kharak Singh were overruled on this point.",
 rule:"Right to privacy is a fundamental right; limits must pass legality, need and [[proportionality]].",
 exam:"In K.S. Puttaswamy v Union of India (2017), a nine-judge bench unanimously held that privacy is a fundamental right under Article 21, overruling Kharak Singh on this point."});
add({id:"shreya",name:"Shreya Singhal v Union of India",also:["Shreya Singhal v. Union of India","Shreya Singhal"],cite:"(2015) 5 SCC 1",court:"Supreme Court of India",year:2015,subject:"constitution",
 facts:"Two girls were arrested for Facebook posts under Section 66A of the IT Act, which punished 'grossly offensive' or 'annoying' online messages.",
 issue:"Is Section 66A valid under freedom of speech (Article 19(1)(a))?",
 held:"No. Section 66A was struck down as [[vague]] and too wide. It punished speech beyond the limits allowed by Article 19(2).",
 rule:"Vague laws that chill free speech are unconstitutional.",
 exam:"In Shreya Singhal v Union of India (2015), Section 66A of the IT Act was struck down as vague and overbroad, violating Article 19(1)(a)."});
add({id:"navtej",name:"Navtej Singh Johar v Union of India",also:["Navtej Singh Johar v. Union of India","Navtej Singh Johar"],cite:"(2018) 10 SCC 1",court:"Supreme Court of India",year:2018,subject:"constitution",
 facts:"Dancer Navtej Singh Johar and others challenged Section 377 IPC, which made same-sex relations a crime.",
 issue:"Does Section 377 violate Articles 14, 15, 19 and 21 for consenting adults?",
 held:"Yes. Section 377 was read down; consensual sex between adults in private is no longer a crime. Suresh Kumar Koushal (2013) was overruled.",
 rule:"Dignity, privacy and equality protect sexual orientation.",
 exam:"In Navtej Singh Johar v Union of India (2018), the Supreme Court decriminalised consensual same-sex relations between adults by reading down Section 377 IPC."});

/* ───────────── FAMILY LAW ───────────── */
add({id:"amardeep",name:"Amardeep Singh v Harveen Kaur",also:["Amardeep Singh v. Harveen Kaur","Amardeep Singh"],cite:"(2017) 8 SCC 746",court:"Supreme Court of India",year:2017,subject:"family",
 facts:"A couple, separated for over eight years, had settled everything and filed for divorce by [[mutual consent]]. They asked the court to skip the six-month wait.",
 issue:"Is the six-month waiting period in Section 13B(2) of the Hindu Marriage Act compulsory?",
 held:"No. It is directory, not mandatory. The family court can waive it when there is no chance of reunion and all issues are settled.",
 rule:"The [[cooling-off period]] under Section 13B(2) can be waived.",
 exam:"In Amardeep Singh v Harveen Kaur (2017), the Supreme Court held that the six-month cooling-off period under Section 13B(2) HMA is directory and can be waived in suitable cases."});
add({id:"shilpa",name:"Shilpa Sailesh v Varun Sreenivasan",also:["Shilpa Sailesh v. Varun Sreenivasan","Shilpa Sailesh"],cite:"Decided 1 May 2023",court:"Supreme Court of India (Constitution Bench)",year:2023,subject:"family",
 facts:"A couple whose marriage had completely failed asked the Supreme Court to grant divorce directly.",
 issue:"Can the Supreme Court dissolve a marriage on [[irretrievable breakdown]], which is not a ground in the Hindu Marriage Act?",
 held:"Yes, but only the Supreme Court, using Article 142 ([[complete justice]]), in suitable cases. Family courts cannot use this ground.",
 rule:"Irretrievable breakdown divorce is available only through Article 142.",
 exam:"In Shilpa Sailesh v Varun Sreenivasan (2023), a Constitution Bench held that the Supreme Court can dissolve a marriage on irretrievable breakdown under Article 142, which family courts cannot do."});
add({id:"sarojrani",name:"Saroj Rani v Sudarshan Kumar Chadha",also:["Saroj Rani v. Sudarshan Kumar Chadha","Saroj Rani"],cite:"AIR 1984 SC 1562",court:"Supreme Court of India",year:1984,subject:"family",
 facts:"Saroj Rani got a decree of [[restitution of conjugal rights]] against her husband. He then sought divorce because they had not lived together for a year after it.",
 issue:"Is Section 9 of the Hindu Marriage Act (restitution of conjugal rights) valid under Articles 14 and 21?",
 held:"Yes. Section 9 is valid; it aims to save marriages, not to force anyone. The husband got divorce on the statutory ground.",
 rule:"Restitution of conjugal rights is constitutionally valid.",
 exam:"In Saroj Rani v Sudarshan Kumar Chadha (1984), the Supreme Court upheld Section 9 HMA (restitution of conjugal rights) as constitutional, since it aims to preserve marriage."});
add({id:"vineeta",name:"Vineeta Sharma v Rakesh Sharma",also:["Vineeta Sharma v. Rakesh Sharma","Vineeta Sharma"],cite:"(2020) 9 SCC 1",court:"Supreme Court of India (3 judges)",year:2020,subject:"family",
 facts:"Daughters claimed a share in joint family property. Their fathers had died before 9 September 2005, when the 2005 amendment made daughters [[coparcener|coparceners]].",
 issue:"Must the father be alive on 9 September 2005 for the daughter to get rights?",
 held:"No. A daughter is a coparcener by birth, like a son. Her right does not depend on her father being alive in 2005.",
 rule:"Daughters have equal coparcenary rights by birth under Section 6 of the Hindu Succession Act.",
 exam:"In Vineeta Sharma v Rakesh Sharma (2020), the Supreme Court held that daughters are coparceners by birth under amended Section 6 HSA, whether or not the father was alive on 9 September 2005."});
add({id:"githa",name:"Githa Hariharan v RBI",also:["Githa Hariharan v. RBI","Githa Hariharan v Reserve Bank of India","Githa Hariharan"],cite:"AIR 1999 SC 1149",court:"Supreme Court of India",year:1999,subject:"family",
 facts:"The RBI refused to accept an application signed by the mother as [[guardian]] for her child's investment, saying the father was the natural guardian.",
 issue:"Under Section 6 of the Hindu Minority and Guardianship Act, is the mother guardian only 'after' the father dies?",
 held:"'After' means 'in the absence of' the father, not only after his death. The mother can act as natural guardian when the father is not taking care.",
 rule:"Read Section 6 in a gender-equal way (Articles 14 and 15).",
 exam:"In Githa Hariharan v RBI (1999), the Supreme Court read 'after' in Section 6 HMGA as 'in the absence of', allowing the mother to act as natural guardian."});
add({id:"revanasiddappa",name:"Revanasiddappa v Mallikarjun",also:["Revanasiddappa v. Mallikarjun","Revanasiddappa"],cite:"Decided 1 September 2023",court:"Supreme Court of India (3 judges)",year:2023,subject:"family",
 facts:"Children born from a [[void marriage]] claimed a share in their father's joint family property.",
 issue:"Do children of void or voidable marriages get a share in ancestral property?",
 held:"They are legitimate (Section 16 HMA) and get a share in their parent's share of the property, found by a notional partition. They are not coparceners by birth.",
 rule:"Children of void marriages inherit their parent's share, not an independent coparcenary right.",
 exam:"In Revanasiddappa v Mallikarjun (2023), the Supreme Court held that children of void or voidable marriages are entitled to their parent's share in coparcenary property, determined by notional partition."});
add({id:"shahbano",name:"Mohd. Ahmed Khan v Shah Bano Begum",also:["Mohd Ahmed Khan v Shah Bano Begum","Mohd. Ahmed Khan v. Shah Bano Begum","Shah Bano"],cite:"AIR 1985 SC 945",court:"Supreme Court of India (Constitution Bench)",year:1985,subject:"family",
 facts:"Shah Bano, aged 62, was divorced by her husband after over 40 years of marriage. She asked for [[maintenance]] under Section 125 CrPC.",
 issue:"Can a divorced Muslim woman claim maintenance under Section 125 CrPC beyond the [[iddat]] period?",
 held:"Yes. Section 125 is a secular law that applies to all religions. The husband had to pay maintenance.",
 rule:"Section 125 CrPC applies to divorced Muslim women.",
 exam:"In Mohd Ahmed Khan v Shah Bano Begum (1985), the Supreme Court held that a divorced Muslim wife can claim maintenance under Section 125 CrPC, a secular provision."});
add({id:"daniallatifi",name:"Danial Latifi v Union of India",also:["Danial Latifi v. Union of India","Danial Latifi"],cite:"(2001) 7 SCC 740",court:"Supreme Court of India (Constitution Bench)",year:2001,subject:"family",
 facts:"After Shah Bano, Parliament passed the Muslim Women (Protection of Rights on Divorce) Act, 1986. Danial Latifi, Shah Bano's lawyer, challenged it.",
 issue:"Does the 1986 Act limit a divorced woman's rights to the [[iddat]] period only?",
 held:"The Act is valid, but the husband must make 'reasonable and fair provision' for her whole future, paid within the iddat period.",
 rule:"Fair provision under the 1986 Act covers her future, not just iddat.",
 exam:"In Danial Latifi v Union of India (2001), the Supreme Court upheld the 1986 Act but held that the husband must make reasonable and fair provision for the divorced wife's future within the iddat period."});
add({id:"shayara",name:"Shayara Bano v Union of India",also:["Shayara Bano v. Union of India","Shayara Bano"],cite:"(2017) 9 SCC 1",court:"Supreme Court of India (Constitution Bench)",year:2017,subject:"family",
 facts:"Shayara Bano's husband divorced her by saying '[[talaq]]' three times at once. She challenged this practice.",
 issue:"Is instant [[triple talaq]] (talaq-e-biddat) valid?",
 held:"By 3:2, instant triple talaq was set aside. The majority found it [[manifest arbitrariness|manifestly arbitrary]] and against Article 14 (and not essential to Islam).",
 rule:"Instant triple talaq is invalid; later made an offence by the 2019 Act.",
 exam:"In Shayara Bano v Union of India (2017), the Supreme Court set aside instant triple talaq by 3:2. Parliament then passed the Muslim Women (Protection of Rights on Marriage) Act, 2019."});
add({id:"abdulsamad",name:"Mohd. Abdul Samad v State of Telangana",also:["Mohd Abdul Samad v State of Telangana","Mohd. Abdul Samad v. State of Telangana","Abdul Samad"],cite:"Decided 10 July 2024",court:"Supreme Court of India",year:2024,subject:"family",
 facts:"A divorced Muslim woman got [[maintenance]] under Section 125 CrPC. The husband said only the 1986 Act applied to her.",
 issue:"Does the 1986 Act take away a divorced Muslim woman's right under Section 125 CrPC?",
 held:"No. Both remedies are available. Section 125 is a secular, social justice provision for all women.",
 rule:"Divorced Muslim women can claim under Section 125 CrPC (now BNSS s.144) as well as the 1986 Act.",
 exam:"In Mohd Abdul Samad v State of Telangana (2024), the Supreme Court held that a divorced Muslim woman can claim maintenance under Section 125 CrPC despite the 1986 Act."});
add({id:"lilythomas",name:"Lily Thomas v Union of India",also:["Lily Thomas v. Union of India","Lily Thomas"],cite:"(2000) 6 SCC 224",court:"Supreme Court of India",year:2000,subject:"family",
 facts:"A Hindu husband converted to Islam only to marry a second time without divorcing his first wife.",
 issue:"Is the second marriage valid after such conversion?",
 held:"No. The second marriage is [[void]], and he can be prosecuted for [[bigamy]]. The first marriage under Hindu law continues.",
 rule:"Conversion to escape monogamy does not make a second marriage valid (follows Sarla Mudgal).",
 exam:"In Lily Thomas v Union of India (2000), the Supreme Court reaffirmed Sarla Mudgal: a Hindu husband who converts to Islam to remarry commits bigamy, and the second marriage is void."});
add({id:"sarla",name:"Sarla Mudgal v Union of India",also:["Sarla Mudgal v. Union of India","Sarla Mudgal"],cite:"AIR 1995 SC 1531",court:"Supreme Court of India",year:1995,subject:"family",
 facts:"Hindu husbands converted to Islam to marry again without dissolving their first marriage.",
 issue:"Is the second marriage valid? Is the husband guilty of [[bigamy]]?",
 held:"The second marriage is void, and the husband is liable for bigamy under Section 494 IPC (now BNS s.82). The Court also urged a Uniform Civil Code.",
 rule:"A Hindu marriage can be dissolved only on grounds in the HMA; conversion alone does not end it.",
 exam:"In Sarla Mudgal v Union of India (1995), the Supreme Court held that a Hindu husband's second marriage after converting to Islam is void and amounts to bigamy."});
add({id:"latasingh",name:"Lata Singh v State of U.P.",also:["Lata Singh v. State of U.P.","Lata Singh v State of UP","Lata Singh"],cite:"(2006) 5 SCC 475",court:"Supreme Court of India",year:2006,subject:"family",
 facts:"Lata Singh, an adult, married a man of another caste. Her brothers threatened and harassed her husband's family, and cases were filed against them.",
 issue:"Can family members stop an adult's inter-caste marriage?",
 held:"No. An adult is free to marry anyone. The cases were quashed, and police were told to protect such couples.",
 rule:"Inter-caste marriage is lawful; harassment of such couples must be stopped.",
 exam:"In Lata Singh v State of UP (2006), the Supreme Court held that an adult woman is free to marry a person of her choice, and directed police to protect inter-caste couples from harassment."});
add({id:"shafin",name:"Shafin Jahan v Asokan K.M.",also:["Shafin Jahan v. Asokan K.M.","Shafin Jahan","Hadiya case"],cite:"(2018) 16 SCC 368",court:"Supreme Court of India",year:2018,subject:"family",
 facts:"Hadiya, an adult woman, converted to Islam and married Shafin Jahan. Her father went to court, and the Kerala High Court cancelled the marriage.",
 issue:"Can a court cancel an adult woman's marriage of her own choice?",
 held:"No. The High Court's order was set aside. An adult's choice of partner and faith is part of her liberty and [[privacy]] under Article 21.",
 rule:"Choice of a life partner is a fundamental right.",
 exam:"In Shafin Jahan v Asokan (2018) (the Hadiya case), the Supreme Court restored the marriage, holding that an adult's choice of partner is protected by Article 21."});
add({id:"shaktivahini",name:"Shakti Vahini v Union of India",also:["Shakti Vahini v. Union of India","Shakti Vahini"],cite:"(2018) 7 SCC 192",court:"Supreme Court of India",year:2018,subject:"family",
 facts:"An organisation asked the Court to act against honour killings and [[khap panchayat]] orders against couples marrying by choice.",
 issue:"Can khap panchayats interfere with adults' marriage?",
 held:"No. Such interference is illegal. The Court laid down [[guidelines]] for police and officers to prevent honour crimes and protect couples.",
 rule:"Adults' right to marry by choice must be protected from honour crimes.",
 exam:"In Shakti Vahini v Union of India (2018), the Supreme Court held that khap interference in adults' marriage is illegal and issued guidelines to prevent honour killings."});
add({id:"independentthought",name:"Independent Thought v Union of India",also:["Independent Thought v. Union of India","Independent Thought"],cite:"(2017) 10 SCC 800",court:"Supreme Court of India",year:2017,subject:"family",
 facts:"An exception in the rape law allowed a husband to have sex with his wife aged 15 to 18 without it being rape.",
 issue:"Is this exception valid for a wife under 18?",
 held:"No. The exception was read down: sex with a wife below 18 is rape. Girl children's rights cannot be lowered by marriage.",
 rule:"The marital exception does not apply to wives under 18.",
 exam:"In Independent Thought v Union of India (2017), the Supreme Court read down the marital rape exception, holding that sexual intercourse with a wife below 18 years is rape."});
add({id:"supriya",name:"Supriyo Chakraborty v Union of India",also:["Supriya Chakraborty v. Union of India","Supriya Chakraborty v Union of India","Supriyo Chakraborty v. Union of India","Supriyo Chakraborty"],cite:"Decided 17 October 2023",court:"Supreme Court of India (Constitution Bench)",year:2023,subject:"family",
 facts:"Same-sex couples asked the Court to recognise their marriages, including under the Special Marriage Act.",
 issue:"Is there a fundamental right to marry for same-sex couples?",
 held:"No. The Court refused to read same-sex marriage into the Special Marriage Act; it said this is for Parliament to decide. It recognised that queer people must not face discrimination.",
 rule:"Recognition of same-sex marriage is a matter for the legislature.",
 exam:"In Supriyo Chakraborty v Union of India (2023), a Constitution Bench declined to recognise same-sex marriage under the Special Marriage Act, leaving it to Parliament."});
add({id:"velusamy",name:"D. Velusamy v D. Patchaiammal",also:["D. Velusamy v. D. Patchaiammal","Velusamy"],cite:"(2010) 10 SCC 469",court:"Supreme Court of India",year:2010,subject:"family",
 facts:"Patchaiammal claimed [[maintenance]] saying she lived with Velusamy as his wife. He said he was already married to someone else.",
 issue:"When is a [[live-in relationship]] a 'relationship in the nature of marriage' under the Domestic Violence Act?",
 held:"The couple must live together like spouses for a long time, be of legal age, be qualified to marry, and present themselves as married. A mere 'keep' or one-night stand does not count.",
 rule:"Tests for a relationship in the nature of marriage.",
 exam:"In D. Velusamy v D. Patchaiammal (2010), the Supreme Court set out tests for a live-in relationship to be a 'relationship in the nature of marriage' under the Domestic Violence Act."});
add({id:"salim",name:"Mohammed Salim v Shamsudeen",also:["Mohammed Salim v. Shamsudeen","Mohammed Salim"],cite:"(2019) 4 SCC 130",court:"Supreme Court of India",year:2019,subject:"family",
 facts:"A Muslim man married a Hindu woman without her converting. Their son claimed a share in his father's property.",
 issue:"Is such a marriage valid, and can the son inherit?",
 held:"The marriage is irregular ([[fasid]]), not void. A child of an irregular marriage is legitimate and can inherit from the father.",
 rule:"Fasid marriage gives legitimate children inheritance rights.",
 exam:"In Mohammed Salim v Shamsudeen (2019), the Supreme Court held that a Muslim man's marriage with a Hindu woman is irregular (fasid), and the child is legitimate and entitled to inherit."});
add({id:"narasimharao",name:"Y. Narasimha Rao v Y. Venkata Lakshmi",also:["Y. Narasimha Rao v. Y. Venkata Lakshmi","Narasimha Rao"],cite:"(1991) 3 SCC 451",court:"Supreme Court of India",year:1991,subject:"family",
 facts:"A couple married in India under Hindu law. The husband got a divorce from a US court on a ground not in Indian law, without the wife taking part.",
 issue:"Is the foreign [[decree]] of divorce valid in India?",
 held:"No. A foreign divorce is recognised only if it is on a ground in the law under which the couple married, and the wife submitted to that court.",
 rule:"Foreign matrimonial decrees must follow the law of marriage (Section 13 CPC).",
 exam:"In Y. Narasimha Rao v Y. Venkata Lakshmi (1991), a US divorce decree was not recognised because it was not on a ground available under the Hindu Marriage Act."});

/* ───────────── LABOUR ───────────── */
add({id:"bwssb",name:"Bangalore Water Supply v A. Rajappa",also:["Bangalore Water Supply v A Rajappa","Bangalore Water Supply and Sewerage Board v A. Rajappa","Bangalore Water Supply"],cite:"AIR 1978 SC 548",court:"Supreme Court of India (7 judges)",year:1978,subject:"labour",
 facts:"Workers of the Bangalore Water Supply Board raised a dispute. The Board said it was not an '[[industry]]' under the Industrial Disputes Act.",
 issue:"What is an 'industry' under Section 2(j) of the Industrial Disputes Act?",
 held:"Any organised activity with employer–employee cooperation to make goods or services for people is an industry, even without profit. The 'triple test' was laid down.",
 rule:"Wide meaning of industry; hospitals, clubs and many public services are included (sovereign functions excluded).",
 exam:"In Bangalore Water Supply v A. Rajappa (1978), a seven-judge bench gave 'industry' a wide meaning through the triple test: systematic activity, employer–employee cooperation, and production of goods or services."});
root.LAW_CASES_B=C;
})(typeof window!=="undefined"?window:globalThis);

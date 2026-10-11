const CORE_WORDS = [
  {
    term: "Affidavit",
    pronunciation: "uh-FUH-duh-vit",
    definition: "A written statement of facts that a person swears or affirms to be true.",
    memory: "Affidavit = facts written down + formally sworn to be true.",
    deep: "Imagine you saw something important. Instead of only telling the court by speaking, you write the facts on paper and formally promise that what you wrote is true. That written sworn statement is an affidavit.",
    daily: "It is like saying: “I wrote these facts down, and I officially promise they are true.”",
    kannada: "ಪ್ರಮಾಣಪೂರ್ವಕ ಲಿಖಿತ ಹೇಳಿಕೆ",
    kannadaExplain: "ಒಬ್ಬ ವ್ಯಕ್ತಿ ಕೆಲವು ಸತ್ಯಾಂಶಗಳನ್ನು ಬರಹದಲ್ಲಿ ನೀಡಿ, ಅವು ಸತ್ಯವೆಂದು ಪ್ರಮಾಣ ಮಾಡುವ ದಾಖಲೆಯನ್ನು ಅಫಿಡವಿಟ್ ಎಂದು ಕರೆಯುತ್ತಾರೆ.",
    kannadaSentence: "ಅರ್ಜಿದಾರರು ತಮ್ಮ ಹೇಳಿಕೆಗಳನ್ನು ದೃಢಪಡಿಸಲು ನ್ಯಾಯಾಲಯಕ್ಕೆ ಅಫಿಡವಿಟ್ ಸಲ್ಲಿಸಿದರು.",
    compareTerm: "Testimony",
    compareSelf: "Usually a written statement formally sworn or affirmed to be true.",
    compareOther: "Evidence given by a witness, commonly by speaking before a court or tribunal.",
    compareRule: "Affidavit is primarily sworn writing; testimony is evidence given by a witness, often orally.",
    examples: [
      "The petitioner filed an affidavit stating the facts supporting the application.",
      "She swore an affidavit explaining when the documents were received.",
      "The court asked the party to place the factual statement on record by affidavit."
    ]
  },
  {
    term: "Appeal",
    pronunciation: "uh-PEEL",
    definition: "A request to a higher court to review a decision made by a lower court.",
    memory: "Appeal = ask a higher court to examine the lower court's decision.",
    deep: "If a court gives a decision and the law allows you to challenge it, you may ask a higher court to examine that decision. You are not simply asking the same judge to change their mind; you are using the legal process of appeal.",
    daily: "It is like saying: “A lower court decided this. I want the higher court to check whether the decision should stand.”",
    kannada: "ಮೇಲ್ಮನವಿ",
    kannadaExplain: "ಕೆಳ ನ್ಯಾಯಾಲಯದ ತೀರ್ಪು ಅಥವಾ ಆದೇಶವನ್ನು ಮೇಲಿನ ನ್ಯಾಯಾಲಯ ಪರಿಶೀಲಿಸಬೇಕೆಂದು ಕಾನೂನು ಪ್ರಕಾರ ಸಲ್ಲಿಸುವ ಮನವಿಯನ್ನು ಮೇಲ್ಮನವಿ ಎನ್ನುತ್ತಾರೆ.",
    kannadaSentence: "ಆರೋಪಿ ತೀರ್ಪಿನ ವಿರುದ್ಧ ಹೈಕೋರ್ಟ್‌ಗೆ ಮೇಲ್ಮನವಿ ಸಲ್ಲಿಸಿದರು.",
    compareTerm: "Review",
    compareSelf: "Normally asks a higher court to examine the lower court's decision, where an appeal is legally available.",
    compareOther: "Usually asks the same court to reconsider its own decision on limited legal grounds.",
    compareRule: "Appeal normally moves upward in the court hierarchy; review normally goes back to the court that made the decision.",
    examples: [
      "The accused filed an appeal against the conviction.",
      "The company appealed the civil court's decree.",
      "The appellate court examined the findings challenged by the appellant."
    ]
  },
  {
    term: "Bail",
    pronunciation: "BAYL",
    definition: "Release of an accused person from custody, usually subject to conditions, while the criminal case is pending.",
    memory: "Bail = temporary legal release from custody; it is not a finding of innocence.",
    deep: "A person can be accused of a crime before the court has finally decided whether that person is guilty. Bail allows the accused to remain outside custody while the case continues, usually after accepting conditions such as appearing in court.",
    daily: "It means: “You can stay out of jail while the case is going on, but you must follow the court's conditions.”",
    kannada: "ಜಾಮೀನು",
    kannadaExplain: "ಪ್ರಕರಣ ಅಂತಿಮವಾಗುವ ಮೊದಲು, ಕೆಲವು ಷರತ್ತುಗಳೊಂದಿಗೆ ಆರೋಪಿಯನ್ನು ಬಂಧನದಿಂದ ತಾತ್ಕಾಲಿಕವಾಗಿ ಬಿಡುಗಡೆ ಮಾಡುವುದನ್ನು ಜಾಮೀನು ಎಂದು ಕರೆಯುತ್ತಾರೆ.",
    kannadaSentence: "ನ್ಯಾಯಾಲಯವು ಹಾಜರಾತಿ ಷರತ್ತಿನೊಂದಿಗೆ ಆರೋಪಿಗೆ ಜಾಮೀನು ನೀಡಿತು.",
    compareTerm: "Acquittal",
    compareSelf: "Release from custody while the case is still pending; guilt or innocence has not necessarily been finally decided.",
    compareOther: "A final judicial finding that the accused is not guilty of the offence charged.",
    compareRule: "Bail concerns custody during the case; acquittal concerns the final result on guilt.",
    examples: [
      "The court granted bail subject to conditions.",
      "The accused applied for bail after arrest.",
      "Bail does not by itself mean that the criminal case is over."
    ]
  },
  {
    term: "Plaintiff",
    pronunciation: "PLAYN-tif",
    definition: "A person or entity that brings a civil suit against another party.",
    memory: "Plaintiff = the party who starts a civil suit.",
    deep: "In a civil dispute, someone goes to court asking for a legal remedy such as money, an injunction or declaration. That person who starts the civil suit is called the plaintiff.",
    daily: "Think: “I am taking this civil dispute to court.” That person is the plaintiff.",
    kannada: "ವಾದಿ",
    kannadaExplain: "ನಾಗರಿಕ ಮೊಕದ್ದಮೆಯನ್ನು ನ್ಯಾಯಾಲಯದಲ್ಲಿ ಪ್ರಾರಂಭಿಸುವ ವ್ಯಕ್ತಿ ಅಥವಾ ಸಂಸ್ಥೆಯನ್ನು ವಾದಿ ಎಂದು ಕರೆಯುತ್ತಾರೆ.",
    kannadaSentence: "ವಾದಿಯು ಪರಿಹಾರಕ್ಕಾಗಿ ನಾಗರಿಕ ಮೊಕದ್ದಮೆ ದಾಖಲಿಸಿದರು.",
    compareTerm: "Petitioner",
    compareSelf: "Starts a civil suit, commonly by presenting a plaint.",
    compareOther: "Approaches a court or tribunal through a petition in proceedings where that procedure applies.",
    compareRule: "Plaintiff belongs to a civil suit; petitioner belongs to a petition proceeding.",
    examples: [
      "The plaintiff sought damages for breach of contract.",
      "The plaintiff produced documents in support of the suit.",
      "The defendant filed a written statement responding to the plaintiff's claim."
    ]
  },
  {
    term: "Defendant",
    pronunciation: "dih-FEN-dunt",
    definition: "A person or entity against whom a civil claim or suit is brought.",
    memory: "Defendant = the party defending against the civil claim.",
    deep: "When one party starts a civil suit, the party against whom that suit is filed is the defendant. The defendant can admit, deny or legally answer the plaintiff's claims.",
    daily: "The plaintiff says, “I have a civil claim against you.” The person answering that claim is the defendant.",
    kannada: "ಪ್ರತಿವಾದಿ",
    kannadaExplain: "ನಾಗರಿಕ ಮೊಕದ್ದಮೆಯಲ್ಲಿ ಯಾರ ವಿರುದ್ಧ ದಾವೆ ಹೂಡಲಾಗಿದೆಯೋ ಆ ವ್ಯಕ್ತಿ ಅಥವಾ ಸಂಸ್ಥೆಯನ್ನು ಪ್ರತಿವಾದಿ ಎಂದು ಕರೆಯುತ್ತಾರೆ.",
    kannadaSentence: "ಪ್ರತಿವಾದಿಯು ಆರೋಪಗಳನ್ನು ನಿರಾಕರಿಸಿ ಲಿಖಿತ ಹೇಳಿಕೆ ಸಲ್ಲಿಸಿದರು.",
    compareTerm: "Respondent",
    compareSelf: "The party against whom a civil suit is brought.",
    compareOther: "The party responding to a petition, appeal or similar proceeding.",
    compareRule: "Defendant is typically used in a suit; respondent is typically used in a petition or appeal.",
    examples: [
      "The defendant denied liability.",
      "Summons was served on the defendant.",
      "The defendant asked the court to dismiss the suit."
    ]
  },
  {
    term: "Petitioner",
    pronunciation: "puh-TISH-uh-ner",
    definition: "A person who approaches a court or tribunal by filing a petition.",
    memory: "Petitioner = the person asking through a petition.",
    deep: "Not every case begins as a civil suit. Some proceedings begin with a petition. The person who files that petition and asks the court or tribunal for relief is the petitioner.",
    daily: "It is the person saying: “I am filing this petition and asking the court for this relief.”",
    kannada: "ಅರ್ಜಿದಾರ",
    kannadaExplain: "ಪಿಟಿಷನ್ ಅಥವಾ ಅರ್ಜಿಯ ಮೂಲಕ ನ್ಯಾಯಾಲಯ ಅಥವಾ ನ್ಯಾಯಮಂಡಳಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ ಪರಿಹಾರ ಕೇಳುವ ವ್ಯಕ್ತಿಯನ್ನು ಅರ್ಜಿದಾರ ಎಂದು ಕರೆಯುತ್ತಾರೆ.",
    kannadaSentence: "ಅರ್ಜಿದಾರರು ಆಡಳಿತಾತ್ಮಕ ಆದೇಶವನ್ನು ಪ್ರಶ್ನಿಸಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿದರು.",
    compareTerm: "Plaintiff",
    compareSelf: "Starts a petition proceeding.",
    compareOther: "Starts a civil suit.",
    compareRule: "Petitioner files a petition; plaintiff files a civil suit.",
    examples: [
      "The petitioner challenged the administrative order.",
      "Notice was issued after the petitioner filed the writ petition.",
      "The petitioner requested interim relief."
    ]
  },
  {
    term: "Respondent",
    pronunciation: "rih-SPON-dunt",
    definition: "The party who answers or responds to a petition, appeal or similar proceeding.",
    memory: "Respondent = the party responding to the case brought in petition/appeal form.",
    deep: "If one side files a petition or appeal, the other side who must answer it is generally called the respondent. The exact party title depends on the type of proceeding.",
    daily: "One side asks the court for something; the respondent is the side that must answer that request.",
    kannada: "ಪ್ರತಿವಾದಿ / ಪ್ರತಿಸ್ಪಂದಿ",
    kannadaExplain: "ಅರ್ಜಿ, ಮೇಲ್ಮನವಿ ಅಥವಾ ಸಮಾನ ನ್ಯಾಯಾಂಗ ಪ್ರಕ್ರಿಯೆಗೆ ಉತ್ತರ ನೀಡುವ ಪಕ್ಷವನ್ನು respondent ಎಂದು ಕರೆಯುತ್ತಾರೆ.",
    kannadaSentence: "ನ್ಯಾಯಾಲಯವು ಪ್ರತಿವಾದಿಗೆ ನೋಟಿಸ್ ಜಾರಿ ಮಾಡಿತು.",
    compareTerm: "Defendant",
    compareSelf: "Responds in a petition, appeal or similar proceeding.",
    compareOther: "Defends against a civil suit.",
    compareRule: "Respondent is tied to petitions/appeals; defendant is tied mainly to civil suits.",
    examples: [
      "The respondent filed objections to the petition.",
      "The court issued notice to the respondent.",
      "The respondent opposed the interim application."
    ]
  },
  {
    term: "Jurisdiction",
    pronunciation: "joor-is-DIK-shun",
    definition: "The legal authority of a court or tribunal to hear and decide a matter.",
    memory: "Jurisdiction = does this court have legal power over this case?",
    deep: "A court cannot decide every dispute in the world. The law gives different courts power over particular places, types of cases, monetary values or subjects. Jurisdiction asks whether this court is legally allowed to decide this matter.",
    daily: "Before asking “Who should win?”, first ask: “Does this court have the power to hear this case?”",
    kannada: "ನ್ಯಾಯವ್ಯಾಪ್ತಿ / ಅಧಿಕಾರ ವ್ಯಾಪ್ತಿ",
    kannadaExplain: "ಒಂದು ಪ್ರಕರಣವನ್ನು ವಿಚಾರಿಸಿ ತೀರ್ಮಾನಿಸಲು ನ್ಯಾಯಾಲಯ ಅಥವಾ ನ್ಯಾಯಮಂಡಳಿಗೆ ಕಾನೂನಿನಿಂದ ದೊರಕಿರುವ ಅಧಿಕಾರವನ್ನು ನ್ಯಾಯವ್ಯಾಪ್ತಿ ಎಂದು ಕರೆಯುತ್ತಾರೆ.",
    kannadaSentence: "ನ್ಯಾಯಾಲಯವು ಮೊದಲು ಈ ಪ್ರಕರಣದ ಮೇಲೆ ತನಗೆ ನ್ಯಾಯವ್ಯಾಪ್ತಿ ಇದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿತು.",
    compareTerm: "Venue",
    compareSelf: "Legal power or authority to hear the matter.",
    compareOther: "The proper or chosen geographical place where proceedings are heard, subject to procedural rules.",
    compareRule: "Jurisdiction is about legal power; venue is about the place of hearing.",
    examples: [
      "The court examined its territorial jurisdiction.",
      "A lack of jurisdiction can prevent a court from deciding the merits.",
      "Subject-matter jurisdiction concerns the type of dispute a court may hear."
    ]
  },
  {
    term: "Injunction",
    pronunciation: "in-JUNK-shun",
    definition: "A court order requiring a person to do something or to stop doing something.",
    memory: "Injunction = a court order controlling an action.",
    deep: "Sometimes money later is not enough to protect a person's rights. A court may order someone not to continue a harmful act, or in some situations require a particular act. That kind of court order is an injunction.",
    daily: "It can mean the court says: “Stop doing this,” or sometimes, “You must do this.”",
    kannada: "ತಡೆಯಾಜ್ಞೆ",
    kannadaExplain: "ಯಾವುದೋ ಕೃತ್ಯವನ್ನು ಮಾಡಬಾರದು ಅಥವಾ ಕೆಲವು ಸಂದರ್ಭಗಳಲ್ಲಿ ನಿರ್ದಿಷ್ಟ ಕೃತ್ಯವನ್ನು ಮಾಡಬೇಕು ಎಂದು ನ್ಯಾಯಾಲಯ ನೀಡುವ ಆದೇಶವನ್ನು injunction ಎಂದು ಕರೆಯುತ್ತಾರೆ.",
    kannadaSentence: "ನಿರ್ಮಾಣವನ್ನು ತಾತ್ಕಾಲಿಕವಾಗಿ ನಿಲ್ಲಿಸಲು ನ್ಯಾಯಾಲಯ ತಡೆಯಾಜ್ಞೆ ನೀಡಿತು.",
    compareTerm: "Damages",
    compareSelf: "A court order controlling conduct.",
    compareOther: "Money awarded as compensation for legally recognized loss or injury.",
    compareRule: "Injunction changes or restrains conduct; damages compensate with money.",
    examples: [
      "The court granted an interim injunction restraining construction.",
      "The plaintiff sought a permanent injunction.",
      "The application asked the court to prevent disposal of the disputed property."
    ]
  },
  {
    term: "Negligence",
    pronunciation: "NEG-li-juns",
    definition: "Failure to exercise the standard of care required by law, causing legally recognized harm.",
    memory: "Negligence = legally insufficient care + resulting harm.",
    deep: "The law sometimes expects a person to take reasonable care. If that duty exists, the person falls below the required standard, and that failure causes legally recognized harm, negligence may arise.",
    daily: "It is more than simply making a mistake. The law asks whether the person should have been more careful and whether the lack of care caused the harm.",
    kannada: "ನಿರ್ಲಕ್ಷ್ಯ",
    kannadaExplain: "ಕಾನೂನಿನ ಪ್ರಕಾರ ಅಗತ್ಯವಿರುವ ಜಾಗ್ರತೆಯನ್ನು ವಹಿಸದೆ, ಅದರಿಂದ ಮತ್ತೊಬ್ಬರಿಗೆ ಕಾನೂನು ಗುರುತಿಸುವ ಹಾನಿ ಉಂಟಾದರೆ ಅದನ್ನು negligence ಎಂದು ಕರೆಯಬಹುದು.",
    kannadaSentence: "ಸುರಕ್ಷತಾ ಕ್ರಮಗಳನ್ನು ಪಾಲಿಸದ ನಿರ್ಲಕ್ಷ್ಯದಿಂದ ಅಪಘಾತ ಸಂಭವಿಸಿದೆ ಎಂದು ದಾವೆ ಮಾಡಲಾಯಿತು.",
    compareTerm: "Accident",
    compareSelf: "A legal concept involving failure to meet a required standard of care and resulting harm.",
    compareOther: "An event that happens unexpectedly; an accident is not automatically legal negligence.",
    compareRule: "Every negligent event may look accidental, but not every accident proves negligence.",
    examples: [
      "The claimant alleged negligence in maintaining the premises.",
      "The court considered whether a reasonable standard of care had been breached.",
      "Negligence generally requires more than proof that an accident occurred."
    ]
  },
  {
    term: "Evidence",
    pronunciation: "EV-i-duns",
    definition: "Material placed before a court or tribunal to prove or disprove facts in issue, subject to applicable evidentiary rules.",
    memory: "Evidence = material used to prove or disprove facts.",
    deep: "Courts decide cases using information that can legally be considered. Documents, witness statements, objects, electronic records and other material may become evidence depending on the applicable rules.",
    daily: "Evidence is the material the court can use to decide what facts are proved.",
    kannada: "ಸಾಕ್ಷ್ಯ",
    kannadaExplain: "ಪ್ರಕರಣದಲ್ಲಿರುವ ಸತ್ಯಾಂಶಗಳನ್ನು ಸಾಬೀತುಪಡಿಸಲು ಅಥವಾ ತಳ್ಳಿಹಾಕಲು ನ್ಯಾಯಾಲಯದ ಮುಂದೆ ಇಡುವ ಕಾನೂನುಬದ್ಧ ಮಾಹಿತಿಯನ್ನು ಸಾಕ್ಷ್ಯ ಎಂದು ಕರೆಯುತ್ತಾರೆ.",
    kannadaSentence: "ದಾಖಲೆಯನ್ನು ನ್ಯಾಯಾಲಯದಲ್ಲಿ ಸಾಕ್ಷ್ಯವಾಗಿ ಸಲ್ಲಿಸಲಾಯಿತು.",
    compareTerm: "Testimony",
    compareSelf: "A broad category covering material used to prove or disprove facts.",
    compareOther: "Evidence given by a witness, usually through statements before a court or tribunal.",
    compareRule: "Testimony is one form of evidence; evidence is the wider category.",
    examples: [
      "The document was admitted in evidence.",
      "Electronic records may be used as evidence subject to legal requirements.",
      "The prosecution relied on documentary and oral evidence."
    ]
  },
  {
    term: "Testimony",
    pronunciation: "TES-ti-moh-nee",
    definition: "Evidence given by a witness, usually orally before a court or tribunal.",
    memory: "Testimony = what a witness says as evidence.",
    deep: "A witness may tell the court what they saw, heard, did or know about relevant facts. That witness evidence is called testimony, subject to the rules governing examination and admissibility.",
    daily: "It is the witness giving their account to the court.",
    kannada: "ಸಾಕ್ಷ್ಯವಾಣಿ",
    kannadaExplain: "ಸಾಕ್ಷಿಯೊಬ್ಬರು ನ್ಯಾಯಾಲಯ ಅಥವಾ ನ್ಯಾಯಮಂಡಳಿಯ ಮುಂದೆ ನೀಡುವ ಹೇಳಿಕೆಯನ್ನು testimony ಅಥವಾ ಸಾಕ್ಷ್ಯವಾಣಿ ಎಂದು ಕರೆಯುತ್ತಾರೆ.",
    kannadaSentence: "ಸಾಕ್ಷಿಯ ಸಾಕ್ಷ್ಯವಾಣಿಯನ್ನು ನ್ಯಾಯಾಲಯ ದಾಖಲಿಸಿತು.",
    compareTerm: "Affidavit",
    compareSelf: "Evidence given by a witness, commonly orally.",
    compareOther: "A written statement formally sworn or affirmed to be true.",
    compareRule: "Testimony is witness evidence, often spoken; an affidavit is sworn written evidence.",
    examples: [
      "The witness gave testimony about what she observed.",
      "The defence challenged the witness's testimony in cross-examination.",
      "The court compared the oral testimony with the documentary record."
    ]
  },
  {
    term: "Precedent",
    pronunciation: "PRES-i-dunt",
    definition: "An earlier judicial decision that may guide or bind a court deciding a later case with relevantly similar legal issues.",
    memory: "Precedent = an earlier case used to guide a later case.",
    deep: "Courts do not decide every legal question from zero. Earlier decisions, especially from courts that are binding in the hierarchy, can provide legal principles that later courts must follow or may treat as persuasive.",
    daily: "It means: “A court already dealt with this legal issue before. What did that decision establish?”",
    kannada: "ಪೂರ್ವನಿದರ್ಶನ",
    kannadaExplain: "ಹಿಂದಿನ ನ್ಯಾಯಾಲಯದ ತೀರ್ಪು ಮುಂದಿನ ಸಮಾನ ಕಾನೂನು ಪ್ರಶ್ನೆಗಳ ತೀರ್ಮಾನಕ್ಕೆ ಮಾರ್ಗದರ್ಶನ ನೀಡುವುದು ಅಥವಾ ಕೆಲವು ಸಂದರ್ಭಗಳಲ್ಲಿ ಬಾಧ್ಯವಾಗುವುದನ್ನು precedent ಎಂದು ಕರೆಯುತ್ತಾರೆ.",
    kannadaSentence: "ವಕೀಲರು ತಮ್ಮ ವಾದಕ್ಕೆ ಬೆಂಬಲವಾಗಿ ಸುಪ್ರೀಂ ಕೋರ್ಟ್‌ನ ಪೂರ್ವನಿದರ್ಶನವನ್ನು ಉಲ್ಲೇಖಿಸಿದರು.",
    compareTerm: "Ratio decidendi",
    compareSelf: "The earlier decision or authority considered in a later case.",
    compareOther: "The legal principle necessary for deciding the earlier case and, where binding, the part later courts follow.",
    compareRule: "Precedent is the earlier case/authority; ratio decidendi is the binding legal principle within it.",
    examples: [
      "Counsel relied on a Supreme Court precedent.",
      "The court distinguished the precedent because the material facts were different.",
      "A binding precedent must be understood through the legal principle it actually decided."
    ]
  },
  {
    term: "Summons",
    pronunciation: "SUM-unz",
    definition: "A formal court document requiring a person to appear, respond or take another procedural step as directed.",
    memory: "Summons = an official court call to appear or respond.",
    deep: "When a case requires a person to come before the court or formally answer proceedings, the court may issue summons according to procedural law. Ignoring it can have legal consequences.",
    daily: "It is an official message from the court saying: “You are required to appear or respond as directed.”",
    kannada: "ನ್ಯಾಯಾಲಯದ ಸಮನ್ಸ್",
    kannadaExplain: "ನ್ಯಾಯಾಲಯಕ್ಕೆ ಹಾಜರಾಗಲು ಅಥವಾ ಕಾನೂನು ಪ್ರಕ್ರಿಯೆಗೆ ಉತ್ತರಿಸಲು ವ್ಯಕ್ತಿಗೆ ನೀಡುವ ಅಧಿಕೃತ ನ್ಯಾಯಾಲಯದ ನೋಟಿಸ್‌ನ್ನು summons ಎಂದು ಕರೆಯುತ್ತಾರೆ.",
    kannadaSentence: "ಪ್ರತಿವಾದಿಗೆ ನ್ಯಾಯಾಲಯದ ಸಮನ್ಸ್ ಜಾರಿಗೊಂಡಿತು.",
    compareTerm: "Warrant",
    compareSelf: "Calls or directs a person to appear or respond.",
    compareOther: "Judicial authorization for an act such as arrest or search where the law permits it.",
    compareRule: "Summons tells you to appear/respond; a warrant authorizes a coercive act such as arrest or search.",
    examples: [
      "The defendant was served with summons.",
      "The summons directed the witness to attend court on the stated date.",
      "Proper service of summons is an important procedural step."
    ]
  },
  {
    term: "Decree",
    pronunciation: "dih-KREE",
    definition: "The formal expression of a civil court's adjudication that conclusively determines rights of parties regarding all or any matters in controversy in the suit, subject to the governing procedural definition.",
    memory: "Decree = formal civil adjudication of rights in a suit.",
    deep: "After deciding rights in a civil suit, the court's adjudication may take the formal legal form of a decree when it meets the procedural definition. Not every direction made by a civil court is a decree.",
    daily: "Think of it as the formal legal result that records how the civil court has finally determined particular rights in the suit.",
    kannada: "ಡಿಕ್ರಿ / ನಾಗರಿಕ ತೀರ್ಪಿನ ಔಪಚಾರಿಕ ನಿರ್ಣಯ",
    kannadaExplain: "ನಾಗರಿಕ ಮೊಕದ್ದಮೆಯಲ್ಲಿ ಪಕ್ಷಗಳ ಹಕ್ಕುಗಳನ್ನು ನಿರ್ಣಾಯಕವಾಗಿ ತೀರ್ಮಾನಿಸುವ ನ್ಯಾಯಾಲಯದ ಔಪಚಾರಿಕ ನಿರ್ಣಯವನ್ನು, ಪ್ರಕ್ರಿಯಾ ಕಾನೂನಿನ ಅರ್ಥದಲ್ಲಿ, decree ಎಂದು ಕರೆಯುತ್ತಾರೆ.",
    kannadaSentence: "ತೀರ್ಪಿನ ನಂತರ ನಾಗರಿಕ ನ್ಯಾಯಾಲಯವು ಡಿಕ್ರಿ ತಯಾರಿಸಿತು.",
    compareTerm: "Order",
    compareSelf: "A formal civil adjudication that falls within the procedural definition of decree.",
    compareOther: "A formal decision or direction of a court that is not necessarily a decree.",
    compareRule: "Every decree is a formal adjudicative result, but not every court order is a decree.",
    examples: [
      "The civil court drew up the decree after judgment.",
      "The decree recorded the rights determined in the suit.",
      "The aggrieved party challenged the decree in accordance with law."
    ]
  }
];

function buildExamWords(rows) {
  var categoryTips = {
    "Exam Skills": "Use this command word as the structure of your answer. Do exactly what it asks instead of writing everything you know.",
    "General Legal": "Use this term to make legal reasoning precise; connect it to the relevant rule, authority and facts.",
    "Constitution & Administrative": "Use this term with the relevant constitutional Article, doctrine and leading authority where appropriate.",
    "Contract, Tort & Consumer": "State its elements, exceptions and remedy, then apply it to the facts where the question is problem-based.",
    "Criminal, Procedure & Evidence": "State the legal ingredients and use the current BNS, BNSS or BSA provision where relevant, then apply it to the facts.",
    "Family, Property & Civil Procedure": "Identify the governing statute or personal-law rule, state the conditions, and explain the legal consequence.",
    "Jurisprudence & Other Subjects": "Define the concept precisely, explain its principle or elements, and support it with statutory or case authority where appropriate."
  };

  return rows.map(function(row) {
    var term = row[0];
    var definition = row[1];
    var category = row[2];
    var isCommand = category === "Exam Skills";
    var examUse = categoryTips[category] || "Use the term precisely and connect it to the governing legal rule.";

    return {
      term: term,
      pronunciation: term,
      definition: definition,
      memory: term + " — " + definition,
      deep: definition + " Exam use: " + examUse,
      daily: isCommand
        ? term + " tells you what intellectual task the examiner expects."
        : "Use " + term + " only when its legal meaning accurately fits the issue.",
      kannada: "Kannada note pending",
      kannadaExplain: "ಈ ಪದಕ್ಕೆ ಕನ್ನಡ ವಿವರಣೆ ಇನ್ನೂ ಸೇರಿಸಲಾಗಿಲ್ಲ. ಮೇಲಿನ English definition ಮತ್ತು exam use ಓದಿ.",
      kannadaSentence: isCommand
        ? "Exam instruction: " + term
        : "Exam answer: use " + term + " only where the legal issue requires it.",
      compareTerm: isCommand ? "Examiner expects" : "Answer use",
      compareSelf: definition,
      compareOther: examUse,
      compareRule: isCommand
        ? "Follow the command word exactly; it determines the depth and structure of the answer."
        : "Define it, state the governing rule, then apply it precisely to the issue or facts.",
      examples: [
        isCommand
          ? 'If a question says "' + term + '", structure the answer around that instruction.'
          : "In an exam answer, define " + term + ", state the governing rule, and connect it to the issue or facts."
      ],
      category: category
    };
  });
}

CORE_WORDS.forEach(function(word) {
  word.category = word.category || "Foundation";
});
const WORDS = CORE_WORDS.concat(buildExamWords(window.EXAM_WORD_ROWS || []));

const KSLU_FIRST_SEMESTER = {
  "title": "KSLU 3-Year LL.B · Semester I",
  "note": "Semester I only. Course titles follow the 2024–25 program structure in your KSLU PDF. The detailed course pages supplied in the same PDF carry the older 2018–19 heading, while Criminal Law I is updated to BNS, 2023.",
  "courses": [
    {
      "name": "Constitutional Law – I",
      "about": "Constitution, constitutionalism, Fundamental Rights, constitutional remedies, Directive Principles and Fundamental Duties.",
      "units": [
        {
          "unit": "Unit I",
          "title": "Constitution, Preamble & Citizenship",
          "text": "Meaning and definition of Constitution; kinds of Constitution; Constitutionalism; salient features of the Indian Constitution; Preamble—meaning, scope, importance, objectives and values; Citizenship—modes of acquisition and termination."
        },
        {
          "unit": "Unit II",
          "title": "State, Law, Judicial Review & Equality",
          "text": "State under Article 12; judicial trends on State action; definition and meaning of law; pre- and post-Constitutional laws; doctrines of severability and eclipse; Judicial Review and Article 13; equality and social justice under Article 14."
        },
        {
          "unit": "Unit III",
          "title": "Protective Discrimination & Article 19 Freedoms",
          "text": "Protective discrimination and social justice under Articles 15 and 16; judicial trends on social justice; Article 17 and untouchability; freedoms under Article 19 including speech and expression, assembly, association, movement, residence, profession, occupation, trade or business, and reasonable restrictions."
        },
        {
          "unit": "Unit IV",
          "title": "Rights of Accused, Life & Religion",
          "text": "Rights of the accused under Article 20; ex-post facto law, double jeopardy and self-incrimination; rights of arrested persons and preventive detention under Article 22; right to life and personal liberty under Article 21; right against exploitation; secularism and freedom of religion, including judicial interpretation and restrictions."
        },
        {
          "unit": "Unit V",
          "title": "Minority Rights, Writs, DPSP & Duties",
          "text": "Cultural and educational rights of minorities; Articles 32 and 226 and kinds of writs; right to property before 1978 and the present position; Directive Principles of State Policy; Fundamental Duties; interrelationship between Fundamental Rights and Directive Principles."
        }
      ]
    },
    {
      "name": "Contract – I",
      "about": "Formation, capacity, consent, discharge, remedies and specific relief.",
      "units": [
        {
          "unit": "Unit I",
          "title": "Formation & Consideration",
          "text": "Formation of contract; agreement and contract; definitions and classification; offer and acceptance; communication and revocation; essential elements; invitation to offer; tenders; consideration, nudum pactum, privity of contract and consideration, exceptions, unlawful consideration and e-contract."
        },
        {
          "unit": "Unit II",
          "title": "Capacity, Free Consent & Void Agreements",
          "text": "Capacity to contract; minor’s agreements and effects; persons of unsound mind and persons disqualified by law; free consent—coercion, undue influence, misrepresentation, fraud and mistake; legality of object; void agreements; contingent contracts."
        },
        {
          "unit": "Unit III",
          "title": "Performance & Discharge",
          "text": "Modes of discharge of contracts; time and place of performance; reciprocal promises; appropriation of payments; discharge by agreement, operation of law, frustration or impossibility of performance, and breach including anticipatory and actual breach."
        },
        {
          "unit": "Unit IV",
          "title": "Breach, Damages & Quasi-Contracts",
          "text": "Remedies for breach of contracts; damages, kinds of damages, remoteness and ascertainment of damages; quasi-contracts."
        },
        {
          "unit": "Unit V",
          "title": "Specific Relief & Injunctions",
          "text": "Specific Relief Act topics listed in the syllabus: Sections 9–16, 21, 24 and 36–42; nature of specific relief; recovery of possession; specific performance; who may obtain relief and against whom; discretion; rectification, cancellation, declaratory decrees, preventive relief, temporary, perpetual and mandatory injunctions."
        }
      ]
    },
    {
      "name": "Law of Torts",
      "about": "Tortious liability, defences, negligence, specific torts and consumer/motor-vehicle remedies.",
      "units": [
        {
          "unit": "Unit I",
          "title": "Nature & Foundations of Tort",
          "text": "Evolution, nature, scope and meaning of torts; tort distinguished from contract and crime; ubi jus ibi remedium; mental elements including intention, motive and malice in law and fact."
        },
        {
          "unit": "Unit II",
          "title": "General Defences & Vicarious Liability",
          "text": "General defences and vicarious liability."
        },
        {
          "unit": "Unit III",
          "title": "Negligence, Nuisance & Liability",
          "text": "Negligence; nuisance; absolute and strict liability; legal remedies, awards and remoteness of damage."
        },
        {
          "unit": "Unit IV",
          "title": "Torts Against Person & Property",
          "text": "Assault, battery, mayhem, false imprisonment; libel and slander; malicious prosecution, malicious civil action and abuse of legal process; domestic and other rights including marital, parental, service and contractual rights; intimidation and conspiracy; torts against property."
        },
        {
          "unit": "Unit V",
          "title": "Consumer & Motor Vehicle Law",
          "text": "Consumer Protection Act, 1986 topics listed in the syllabus, including consumer, defects, deficiency in services, medical services, remedies, redressal agencies, limitation and penalties; Motor Vehicles Act, 1988 topics including no-fault liability, third-party insurance, Claims Tribunal, offences, penalties and procedure."
        }
      ]
    },
    {
      "name": "Family Law – I: Hindu Law",
      "about": "Sources and schools of Hindu law, marriage, joint family, succession, guardianship, adoption and maintenance.",
      "units": [
        {
          "unit": "Unit I",
          "title": "Sources & Schools of Hindu Law",
          "text": "Concept of Dharma; ancient and modern sources of Hindu Law; importance of Dharma Shastra on legislation; Mitakshara and Dayabhaga schools; application of Hindu Law."
        },
        {
          "unit": "Unit II",
          "title": "Marriage & Matrimonial Remedies",
          "text": "Marriage and kinship; evolution of marriage and family; law before the Hindu Marriage Act; detailed study of the Hindu Marriage Act, 1955; matrimonial remedies; maintenance and alimony; customary practices and legislative provisions concerning dowry prohibition."
        },
        {
          "unit": "Unit III",
          "title": "Hindu Joint Family",
          "text": "Hindu undivided family; Mitakshara joint family, formation and incidents; property under both schools; Kartha—position, powers, privileges and obligations; debts; doctrine of pious obligation; partition and reunion; religious and charitable endowment."
        },
        {
          "unit": "Unit IV",
          "title": "Inheritance & Succession",
          "text": "Inheritance and succession; historical perspective; Hindu Succession Act, 1956; Stridhana and woman’s property; amendments; gifts and testamentary succession; wills."
        },
        {
          "unit": "Unit V",
          "title": "Guardianship, Adoption & Maintenance",
          "text": "Hindu minority and guardianship; kinds, duties and powers of guardians; Hindu Adoption and Maintenance Act, 1956; traditional maintenance rights and rights under that Act."
        }
      ]
    },
    {
      "name": "Criminal Law – I: Bharatiya Nyaya Sanhita (BNS), 2023",
      "about": "General principles of crime and major offences under the Bharatiya Nyaya Sanhita, 2023.",
      "units": [
        {
          "unit": "Unit I",
          "title": "General Principles, Liability & Punishments",
          "text": "General principles and conceptions of crime; distinction from morality and other wrongs; actus reus and mens rea; variations in liability; parties to crime; State obligation to detect and punish; historical background, extent and operation of BNS; definitions and general explanations (Ss. 2–3); gender neutrality; punishments and community service (Ss. 4–13); commutation, fine, default, solitary confinement and general exceptions (Ss. 14–44)."
        },
        {
          "unit": "Unit II",
          "title": "Inchoate Crimes & Offences Against Women/Children",
          "text": "Abetment (Ss. 45–60), criminal conspiracy (S. 61), attempt (S. 62); offences against women including rape and other sexual offences, deceitful means, criminal force and assault; offences relating to marriage including dowry death, bigamy and cruelty; kidnapping and offences against children, with sections as listed in the syllabus."
        },
        {
          "unit": "Unit III",
          "title": "Offences Against the Human Body",
          "text": "Culpable homicide, mob lynching, murder, hit-and-run and causing death by rash or negligent act; suicide-related provisions; organized crime and terrorist act; hurt and grievous hurt; wrongful restraint and confinement; criminal force and assault; kidnapping, abduction, slavery and forced labour, with sections as listed in the syllabus."
        },
        {
          "unit": "Unit IV",
          "title": "State, Public Tranquility & Public Justice",
          "text": "Offences against the State; acts endangering sovereignty, unity and integrity of India; election and currency offences; offences against public tranquility; offences against public justice; public nuisance; mischief and criminal trespass; forgery and property-mark offences, with sections as listed in the syllabus."
        },
        {
          "unit": "Unit V",
          "title": "Property Offences & Other Offences",
          "text": "Theft, snatching, extortion, robbery, dacoity, criminal misappropriation, criminal breach of trust, receiving stolen property and cheating; defamation, criminal intimidation, insult and annoyance, with sections as listed in the syllabus."
        }
      ]
    },
    {
      "name": "English (for students writing examinations in Kannada)",
      "about": "Legal English, grammar, applied/professional writing and translation.",
      "units": [
        {
          "unit": "Unit I",
          "title": "Law and Lawyers",
          "text": "Law and Lawyers — M. K. Gandhi."
        },
        {
          "unit": "Unit II",
          "title": "Grammar & Legal Vocabulary",
          "text": "Articles; parts of speech and usage; error identification; types and transformation of sentences; change of voice; reported speech; idioms; legal words and their usage."
        },
        {
          "unit": "Unit III",
          "title": "Applied Writing",
          "text": "Paragraph writing; report/press report; précis writing and summarizing; essay writing; cohesive devices; comprehension passages; letter writing."
        },
        {
          "unit": "Unit IV",
          "title": "Professional Writing",
          "text": "Petitions; notices; refutation; essays on legal topics; comprehension of legal content; legal words and usage; cohesive legal devices."
        },
        {
          "unit": "Unit V",
          "title": "Translation",
          "text": "Principles of translation and exercises using legal texts and decided cases."
        }
      ]
    }
  ]
};

const PRACTICE_QUESTIONS = [
  {
    subject: "Law of Contracts", paper: "Starter Practice", part: "Long Answer", unit: "Agreement & contract",
    question: "Explain the essentials of a valid contract and distinguish an agreement from a contract.",
    topics: ["Agreement", "Enforceability", "Essentials"],
    answer: "Start with the statutory concept of contract, then identify the requirements that make an agreement enforceable. Use the authorities and exact statutory provisions prescribed in your syllabus."
  },
  {
    subject: "Law of Torts", paper: "Starter Practice", part: "Problem / Essay", unit: "Negligence",
    question: "What is negligence? Explain the principal elements that a claimant generally needs to establish.",
    topics: ["Duty of care", "Breach", "Causation", "Damage"],
    answer: "Define negligence and structure the answer around duty, breach of the applicable standard, causation and legally recognized damage. Add prescribed authorities when your official syllabus is imported."
  },
  {
    subject: "Constitutional Law", paper: "Starter Practice", part: "Short / Essay", unit: "Judicial review",
    question: "Explain the idea of judicial review in the Indian constitutional system.",
    topics: ["Constitutional supremacy", "Review of state action", "Remedies"],
    answer: "Explain the courts' role in examining state action against constitutional requirements, then discuss scope, remedies and limits using the authorities prescribed for your course."
  }
];

const STORAGE_KEY = "law-learning-progress-v2";
const NOTES_KEY = "law-learning-notes-v1";
/* Shared state loaded through app-core; storage keys and existing progress remain unchanged. */
let state = window.LawAppCore.createProgress(localStorage).load();
window.LawAppCore.progress = window.LawAppCore.createProgress(localStorage);

const $ = function(selector) { return document.querySelector(selector); };
const $$ = function(selector) { return Array.from(document.querySelectorAll(selector)); };

function saveProgress() {
  return window.LawAppCore.progress.save(state);
}

function currentWord() {
  return WORDS[state.currentWord];
}

/* View rendering and boot handlers moved to legacy-study-ui.js (Stage A3). */

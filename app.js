const TERMS = [
  { term: "Affidavit", meaning: "A written statement of facts that a person swears or affirms to be true.", example: "The petitioner filed an affidavit stating the facts supporting the application." },
  { term: "Appeal", meaning: "A request to a higher court to review the decision of a lower court.", example: "The convicted person filed an appeal before the High Court." },
  { term: "Bail", meaning: "Release of an accused person from custody, usually subject to conditions, while the case is pending.", example: "The court granted bail subject to the accused appearing at every hearing." },
  { term: "Cognizable offence", meaning: "An offence for which police may arrest without a warrant, subject to the applicable criminal procedure law.", example: "For a cognizable offence, police can begin investigation according to law without first obtaining a magistrate's order." },
  { term: "Non-cognizable offence", meaning: "An offence for which police generally need the magistrate's order to investigate and cannot ordinarily arrest without warrant solely on that basis.", example: "The officer directed the complainant to follow the prescribed procedure for a non-cognizable offence." },
  { term: "Cause of action", meaning: "The set of material facts that gives a person the legal right to bring a claim.", example: "The plaint must disclose a cause of action against the defendant." },
  { term: "Contract", meaning: "An agreement enforceable by law.", example: "A valid contract creates legally enforceable obligations between the parties." },
  { term: "Consideration", meaning: "Something of value given, promised or done in return for a promise, as recognized by contract law.", example: "The buyer's payment was consideration for the seller's promise to deliver the goods." },
  { term: "Damages", meaning: "Money awarded as compensation for legally recognized loss or injury.", example: "The court awarded damages for breach of contract." },
  { term: "Defendant", meaning: "A person or entity against whom a civil claim is brought.", example: "The defendant filed a written statement denying the allegations." },
  { term: "Plaintiff", meaning: "A person or entity that brings a civil suit against another party.", example: "The plaintiff sought an injunction and damages." },
  { term: "Petitioner", meaning: "A person who approaches a court or tribunal by filing a petition.", example: "The petitioner challenged the administrative order." },
  { term: "Respondent", meaning: "The party who answers or responds to a petition, appeal or similar proceeding.", example: "Notice was issued to the respondent." },
  { term: "Precedent", meaning: "An earlier judicial decision that may guide or bind a court deciding a later case with relevantly similar legal issues.", example: "The advocate relied on a Supreme Court precedent." },
  { term: "Ratio decidendi", meaning: "The legal principle or reasoning necessary for a court's decision; this is the binding part of a precedent where the doctrine applies.", example: "The later court identified the ratio decidendi before applying the earlier judgment." },
  { term: "Obiter dictum", meaning: "A judicial observation that is not necessary for deciding the case and is generally persuasive rather than binding.", example: "The judge's wider comments were treated as obiter dictum." },
  { term: "Jurisdiction", meaning: "The legal authority of a court or tribunal to hear and decide a matter.", example: "The court first examined whether it had territorial jurisdiction." },
  { term: "Injunction", meaning: "A court order requiring a person to do something or stop doing something.", example: "The court granted an interim injunction restraining construction until the next hearing." },
  { term: "Liability", meaning: "Legal responsibility for an act, omission, debt, loss or obligation.", example: "The issue was whether the employer had liability for the employee's conduct." },
  { term: "Negligence", meaning: "Failure to exercise the standard of care required by law, causing legally recognized harm.", example: "The claimant alleged negligence in maintaining the premises." },
  { term: "Tort", meaning: "A civil wrong, independent of contract in the ordinary sense, for which the law provides a remedy.", example: "Negligence is a major branch of tort law." },
  { term: "Mens rea", meaning: "The legally required mental element of an offence, where the offence requires one.", example: "The prosecution had to prove the required mens rea along with the prohibited act." },
  { term: "Actus reus", meaning: "The prohibited act, omission or state of affairs forming the external element of an offence.", example: "Criminal liability commonly requires proof of the relevant actus reus." },
  { term: "Burden of proof", meaning: "The obligation placed on a party to prove a fact or case to the legally required standard.", example: "In a criminal trial, the prosecution ordinarily bears the burden of proving guilt beyond reasonable doubt." },
  { term: "Evidence", meaning: "Material placed before a court or tribunal to prove or disprove facts in issue, subject to applicable evidentiary rules.", example: "The document was tendered as evidence during the trial." },
  { term: "Testimony", meaning: "Evidence given by a witness, usually orally before a court or tribunal.", example: "The witness gave testimony about what she saw." },
  { term: "Writ", meaning: "A formal judicial order; constitutional courts in India may issue specific writs for protection of legal and fundamental rights within their jurisdiction.", example: "The petitioner sought a writ to challenge unlawful administrative action." },
  { term: "Habeas corpus", meaning: "A writ used to require justification for a person's detention and to secure release where the detention is unlawful.", example: "The family approached the High Court seeking habeas corpus." },
  { term: "Mandamus", meaning: "A writ directing a public authority to perform a public or statutory duty where legal requirements are met.", example: "The petitioner sought mandamus directing the authority to decide the pending application." },
  { term: "Certiorari", meaning: "A writ used by a superior court to quash an order of a lower court, tribunal or authority where recognized legal grounds exist.", example: "The High Court was asked to issue certiorari against the tribunal's order." },
  { term: "Locus standi", meaning: "A person's legal standing or sufficient connection to bring a proceeding.", example: "The court examined whether the petitioner had locus standi." },
  { term: "Limitation", meaning: "The legally prescribed time period within which a proceeding or claim must ordinarily be brought.", example: "The suit was challenged as being filed beyond the limitation period." },
  { term: "Summons", meaning: "A formal court document requiring a person to appear before the court or respond as directed.", example: "The defendant was served with summons." },
  { term: "Warrant", meaning: "A written authorization issued by a competent judicial authority for an act such as arrest or search, as permitted by law.", example: "The police executed the search warrant according to its terms." },
  { term: "FIR", meaning: "First Information Report: the record of information relating to the commission of a cognizable offence made to police under the applicable criminal procedure law.", example: "Police registered an FIR after receiving information about the alleged cognizable offence." },
  { term: "Charge", meaning: "A formal accusation specifying the offence an accused person is alleged to have committed.", example: "The court framed charges after considering the record and applicable law." },
  { term: "Acquittal", meaning: "A judgment that the accused is not found guilty of the offence charged.", example: "The accused was acquitted after the prosecution failed to prove the case to the required standard." },
  { term: "Conviction", meaning: "A formal finding by a criminal court that an accused person is guilty of an offence.", example: "The conviction was later challenged in appeal." },
  { term: "Decree", meaning: "The formal expression of an adjudication conclusively determining rights of parties regarding matters in controversy in a civil suit, as defined by procedural law.", example: "After judgment, the civil court drew up the decree." },
  { term: "Order", meaning: "A formal decision or direction of a court that is not necessarily a decree or final judgment.", example: "The court passed an interim order preserving the property." }
];

const SUBJECTS = [
  {
    name: "Constitutional Law",
    note: "Starter map — replace with your university's exact semester/unit numbering.",
    units: ["Constitutional framework", "Fundamental Rights", "Directive Principles", "Union & State institutions", "Judicial review"]
  },
  {
    name: "Law of Contracts",
    note: "Core concepts commonly encountered in first-year LL.B study.",
    units: ["Agreement & contract", "Offer & acceptance", "Consideration", "Capacity", "Free consent", "Breach & remedies"]
  },
  {
    name: "Law of Torts",
    note: "Starter concept map for tortious liability.",
    units: ["General principles", "Negligence", "Nuisance", "Defamation", "Vicarious liability", "Remedies"]
  },
  {
    name: "Family Law",
    note: "Exact coverage varies by university scheme.",
    units: ["Marriage", "Divorce", "Maintenance", "Adoption", "Guardianship", "Succession basics"]
  },
  {
    name: "Criminal Law",
    note: "Use the current substantive criminal law prescribed by your university.",
    units: ["General principles", "Mental element", "General exceptions", "Offences against body", "Property offences", "Punishments"]
  }
];

const PRACTICE_QUESTIONS = [
  {
    subject: "Law of Contracts",
    paper: "Starter Practice",
    part: "Long Answer",
    marks: "Practice",
    question: "Explain the essentials of a valid contract and distinguish an agreement from a contract.",
    unit: "Agreement & contract",
    topics: ["Agreement", "Enforceability", "Essentials"],
    answer: "Build the answer around the statutory definition, then identify the conditions that make an agreement enforceable. Use headings, explain each essential briefly, and finish by distinguishing a wider category of agreements from the narrower category of legally enforceable contracts."
  },
  {
    subject: "Law of Torts",
    paper: "Starter Practice",
    part: "Problem / Essay",
    marks: "Practice",
    question: "What is negligence? Explain the principal elements that a claimant generally needs to establish.",
    unit: "Negligence",
    topics: ["Duty of care", "Breach", "Causation", "Damage"],
    answer: "A structured answer should define negligence and then discuss duty of care, breach of the applicable standard, factual and legal causation, and legally recognized damage. Add authorities from your prescribed syllabus when they are imported."
  },
  {
    subject: "Constitutional Law",
    paper: "Starter Practice",
    part: "Short / Essay",
    marks: "Practice",
    question: "Explain the idea of judicial review in the Indian constitutional system.",
    unit: "Judicial review",
    topics: ["Constitutional supremacy", "Court review", "Limits on public power"],
    answer: "Explain judicial review as the power of constitutional courts to examine state action against constitutional requirements. Organize the answer around constitutional supremacy, review of legislative and executive action, remedies, and the limits imposed by jurisdiction and precedent."
  }
];

const STORAGE_KEY = "law-learning-progress-v1";
let saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
let state = {
  score: saved.score || 0,
  learned: new Set(saved.learned || []),
  difficult: new Set(saved.difficult || []),
  streak: saved.streak || 0,
  deck: TERMS.map((_, i) => i),
  position: 0,
  revealed: false,
  reviewMode: false
};

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

const scoreEl = $("#score");
const learnedEl = $("#learned-count");
const difficultEl = $("#difficult-count");
const streakEl = $("#streak-count");
const progressBar = $("#progress-bar");
const card = $("#flashcard");
const termEl = $("#term");
const meaningEl = $("#meaning");
const exampleEl = $("#example");
const answerEl = $("#answer");
const numberEl = $("#card-number");
const statusEl = $("#card-status");

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    score: state.score,
    learned: [...state.learned],
    difficult: [...state.difficult],
    streak: state.streak
  }));
}

function currentTermIndex() {
  if (!state.deck.length) return 0;
  return state.deck[state.position % state.deck.length];
}

function renderStats() {
  scoreEl.textContent = state.score;
  learnedEl.textContent = state.learned.size;
  difficultEl.textContent = state.difficult.size;
  streakEl.textContent = state.streak;
  const completed = Math.min(state.learned.size, TERMS.length);
  progressBar.style.width = `${(completed / TERMS.length) * 100}%`;
}

function renderCard() {
  if (!state.deck.length) {
    state.deck = TERMS.map((_, i) => i);
    state.position = 0;
    state.reviewMode = false;
  }

  const index = currentTermIndex();
  const item = TERMS[index];
  state.revealed = false;
  termEl.textContent = item.term;
  meaningEl.textContent = item.meaning;
  exampleEl.textContent = item.example;
  answerEl.hidden = true;
  numberEl.textContent = `${state.position + 1} / ${state.deck.length}`;
  statusEl.textContent = state.reviewMode ? "Difficult review" : "Tap to reveal";
  card.classList.remove("fly-left", "fly-right");
  renderStats();
}

function revealCard() {
  if (state.revealed) return;
  state.revealed = true;
  answerEl.hidden = false;
  statusEl.textContent = "Meaning revealed";
}

function moveCard(direction) {
  if (!state.deck.length) return;
  const index = currentTermIndex();

  if (direction === "know") {
    const firstLearn = !state.learned.has(index);
    state.learned.add(index);
    state.difficult.delete(index);
    state.score += firstLearn ? 10 : 4;
    state.streak += 1;
    card.classList.add("fly-right");
  } else {
    state.difficult.add(index);
    state.score += 2;
    state.streak = 0;
    card.classList.add("fly-left");
  }

  saveProgress();
  renderStats();

  setTimeout(() => {
    state.position += 1;

    if (state.reviewMode && state.position >= state.deck.length) {
      const remaining = [...state.difficult];
      if (remaining.length) {
        state.deck = remaining;
        state.position = 0;
      } else {
        state.deck = TERMS.map((_, i) => i);
        state.position = 0;
        state.reviewMode = false;
      }
    } else if (!state.reviewMode && state.position >= state.deck.length) {
      state.position = 0;
    }

    renderCard();
  }, 170);
}

card.addEventListener("click", revealCard);
card.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    revealCard();
  }
  if (event.key === "ArrowRight") moveCard("know");
  if (event.key === "ArrowLeft") moveCard("difficult");
});

$("#know-btn").addEventListener("click", () => moveCard("know"));
$("#difficult-btn").addEventListener("click", () => moveCard("difficult"));

$("#review-btn").addEventListener("click", () => {
  const difficult = [...state.difficult];
  if (!difficult.length) {
    alert("No difficult cards yet. Mark some cards difficult first.");
    return;
  }
  state.deck = difficult;
  state.position = 0;
  state.reviewMode = true;
  renderCard();
});

$("#reset-btn").addEventListener("click", () => {
  const ok = confirm("Reset all flashcard points and progress on this device?");
  if (!ok) return;
  localStorage.removeItem(STORAGE_KEY);
  state.score = 0;
  state.learned = new Set();
  state.difficult = new Set();
  state.streak = 0;
  state.deck = TERMS.map((_, i) => i);
  state.position = 0;
  state.reviewMode = false;
  renderCard();
});

let touchStartX = 0;
let touchStartY = 0;

card.addEventListener("touchstart", event => {
  const touch = event.changedTouches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
}, { passive: true });

card.addEventListener("touchend", event => {
  const touch = event.changedTouches[0];
  const dx = touch.clientX - touchStartX;
  const dy = touch.clientY - touchStartY;

  if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.2) {
    moveCard(dx > 0 ? "know" : "difficult");
  }
}, { passive: true });

$$(".main-tab").forEach(button => {
  button.addEventListener("click", () => {
    const view = button.dataset.view;
    $$(".main-tab").forEach(btn => btn.classList.toggle("active", btn === button));
    $$(".main-view").forEach(panel => panel.classList.toggle("active", panel.id === `${view}-view`));
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

$$(".subtab").forEach(button => {
  button.addEventListener("click", () => {
    const view = button.dataset.paperView;
    $$(".subtab").forEach(btn => btn.classList.toggle("active", btn === button));
    $$(".paper-panel").forEach(panel => panel.classList.toggle("active", panel.id === `${view}-panel`));
  });
});

function renderSubjects() {
  $("#subject-list").innerHTML = SUBJECTS.map(subject => `
    <article class="subject-card">
      <p class="eyebrow">Subject</p>
      <h3>${subject.name}</h3>
      <p>${subject.note}</p>
      <div class="subject-units">
        ${subject.units.map(unit => `<span class="unit-chip">${unit}</span>`).join("")}
      </div>
    </article>
  `).join("");
}

function renderPaperFilters() {
  const subjectFilter = $("#subject-filter");
  const paperFilter = $("#paper-filter");
  const subjects = ["All subjects", ...new Set(PRACTICE_QUESTIONS.map(q => q.subject))];
  const papers = ["All papers", ...new Set(PRACTICE_QUESTIONS.map(q => q.paper))];

  subjectFilter.innerHTML = subjects.map(value => `<option value="${value}">${value}</option>`).join("");
  paperFilter.innerHTML = papers.map(value => `<option value="${value}">${value}</option>`).join("");

  subjectFilter.addEventListener("change", renderQuestions);
  paperFilter.addEventListener("change", renderQuestions);
}

function renderQuestions() {
  const subject = $("#subject-filter").value || "All subjects";
  const paper = $("#paper-filter").value || "All papers";

  const filtered = PRACTICE_QUESTIONS.filter(q =>
    (subject === "All subjects" || q.subject === subject) &&
    (paper === "All papers" || q.paper === paper)
  );

  $("#question-list").innerHTML = filtered.map((q, index) => `
    <article class="question-card">
      <div class="question-meta">
        <span class="unit-chip">${q.subject}</span>
        <span class="unit-chip">${q.part}</span>
        <span class="unit-chip">${q.unit}</span>
      </div>
      <p class="eyebrow">Practice question ${index + 1}</p>
      <h3>${q.question}</h3>
      <div class="subject-units">
        ${q.topics.map(topic => `<span class="unit-chip">${topic}</span>`).join("")}
      </div>
      <details>
        <summary>Show answer approach</summary>
        <p>${q.answer}</p>
      </details>
    </article>
  `).join("");
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(error => {
      console.warn("Service worker registration failed:", error);
    });
  });
}

renderSubjects();
renderPaperFilters();
renderQuestions();
renderCard();

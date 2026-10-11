/* Legacy study renderer. Stage A3 extraction: classic script loaded after app.js data/core and before modern word UI.
 * The original element IDs, event listeners and functions are preserved for compatibility.
 * Do not add another site-wide hashchange listener here; routing is owned by LawAppCore.
 */
function setupWordCardLibrary() {
  var categorySelect = $("#card-category");
  if (!categorySelect) return;

  var categories = Array.from(new Set(WORDS.map(function(word) {
    return word.category || "Foundation";
  })));

  categorySelect.innerHTML =
    '<option value="All">All categories</option>' +
    categories.map(function(category) {
      return '<option value="' + category + '">' + category + '</option>';
    }).join("");

  var search = $("#card-search");
  if (search) search.addEventListener("input", renderWordCards);
  categorySelect.addEventListener("change", renderWordCards);

  var grid = $("#word-card-grid");
  if (grid) {
    grid.addEventListener("click", function(event) {
      var card = event.target.closest(".vocab-card");
      if (!card) return;
      state.currentWord = Number(card.dataset.index);
      renderWord();
      renderWordCards();
      var title = $("#word-title");
      if (title) title.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  renderWordCards();
}

function renderWordCards() {
  var grid = $("#word-card-grid");
  if (!grid) return;

  var query = ($("#card-search") ? $("#card-search").value : "").trim().toLowerCase();
  var category = $("#card-category") ? $("#card-category").value : "All";

  var filtered = WORDS.map(function(word, index) {
    return { word: word, index: index };
  }).filter(function(item) {
    var word = item.word;
    var matchesCategory = category === "All" || (word.category || "Foundation") === category;
    var haystack = [
      word.term,
      word.definition,
      word.memory,
      word.category || "Foundation"
    ].join(" ").toLowerCase();
    var matchesQuery = !query || haystack.indexOf(query) !== -1;
    return matchesCategory && matchesQuery;
  });

  var count = $("#word-filter-count");
  if (count) count.textContent = filtered.length + " shown";

  if (!filtered.length) {
    grid.innerHTML = '<div class="empty-card-state"><strong>No cards found</strong><p>Try another legal term or choose All categories.</p></div>';
    return;
  }

  grid.innerHTML = filtered.map(function(item) {
    var word = item.word;
    var selected = item.index === state.currentWord ? " selected" : "";
    return '<button class="vocab-card' + selected + '" type="button" data-index="' + item.index + '">' +
      '<span class="vocab-card-number">#' + String(item.index + 1).padStart(3, "0") + '</span>' +
      '<span class="vocab-card-category">' + (word.category || "Foundation") + '</span>' +
      '<strong>' + word.term + '</strong>' +
      '<p>' + word.definition + '</p>' +
      '<span class="vocab-card-action">Tap to study →</span>' +
      '</button>';
  }).join("");
}

function populateWordSelect() {
  var select = $("#word-select");
  select.innerHTML = WORDS.map(function(word, index) {
    var category = word.category ? " · " + word.category : "";
    return '<option value="' + index + '">' + (index + 1) + '. ' + word.term + category + '</option>';
  }).join("");
  select.value = String(state.currentWord);

  var searchList = $("#word-search-list");
  if (searchList) {
    searchList.innerHTML = WORDS.map(function(word) {
      return '<option value="' + word.term + '"></option>';
    }).join("");
  }
}

function renderWord() {
  var word = currentWord();
  $("#word-select").value = String(state.currentWord);
  var wordSearch = $("#word-search");
  if (wordSearch) wordSearch.value = word.term;
  $("#word-title").textContent = word.term;
  $("#pronunciation").textContent = word.pronunciation;
  $("#word-definition").textContent = word.definition;
  $("#memory-hook").textContent = word.memory;
  $("#deep-meaning").textContent = word.deep;
  $("#daily-words").textContent = word.daily;
  $("#kannada-meaning").textContent = word.kannada;
  $("#kannada-explain").textContent = word.kannadaExplain;
  $("#kannada-sentence").textContent = word.kannadaSentence;

  $("#compare-a").textContent = word.term;
  $("#compare-b").textContent = word.compareTerm;
  $("#compare-a-label").textContent = word.term;
  $("#compare-a-text").textContent = word.compareSelf;
  $("#compare-b-label").textContent = word.compareTerm;
  $("#compare-b-text").textContent = word.compareOther;
  $("#compare-rule").textContent = word.compareRule;

  $("#examples-title").textContent = word.term + " — examples";
  $("#examples-list").innerHTML = word.examples.map(function(example, index) {
    return '<article class="example-item"><span>Example ' + (index + 1) + '</span><p>' + example + '</p></article>';
  }).join("");

  renderStats();
  newQuiz();
  renderWordCards();
  saveProgress();
}

function renderStats() {
  $("#score").textContent = state.score;
  $("#learned-count").textContent = state.learned.size;
  $("#difficult-count").textContent = state.difficult.size;
  $("#streak-count").textContent = state.streak;
}

function changeWord(step) {
  state.currentWord = (state.currentWord + step + WORDS.length) % WORDS.length;
  renderWord();
}

function speakCurrent(rate) {
  if (!("speechSynthesis" in window)) {
    alert("Voice pronunciation is not available in this browser.");
    return;
  }
  window.speechSynthesis.cancel();
  var utterance = new SpeechSynthesisUtterance(currentWord().term);
  utterance.lang = "en-IN";
  utterance.rate = rate || 0.82;
  utterance.pitch = 1;
  var voices = window.speechSynthesis.getVoices();
  var preferred = voices.find(function(v) { return /en-IN/i.test(v.lang); }) ||
                  voices.find(function(v) { return /^en/i.test(v.lang) && /natural|google|microsoft/i.test(v.name); }) ||
                  voices.find(function(v) { return /^en/i.test(v.lang); });
  if (preferred) utterance.voice = preferred;
  window.speechSynthesis.speak(utterance);
}

function markKnown() {
  window.LawAppCore.progress.mark(state,state.currentWord,false,{firstPoints:10,repeatPoints:3});
  saveProgress();
  renderStats();
  changeWord(1);
}

function markHard() {
  window.LawAppCore.progress.mark(state,state.currentWord,true,{removeLearned:false,reviewPoints:1});
  saveProgress();
  renderStats();
  changeWord(1);
}

function shuffle(list) {
  var copy = list.slice();
  for (var i = copy.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

function newQuiz() {
  var targetIndex = state.currentWord;
  var target = WORDS[targetIndex];
  state.quizTarget = targetIndex;

  var distractorIndexes = shuffle(WORDS.map(function(_, i) { return i; }).filter(function(i) { return i !== targetIndex; })).slice(0, 3);
  var choices = shuffle([targetIndex].concat(distractorIndexes));

  $("#quiz-question").textContent = "Which definition best matches \"" + target.term + "\"?";
  $("#quiz-feedback").hidden = true;
  $("#next-quiz").hidden = true;

  $("#quiz-options").innerHTML = choices.map(function(index) {
    return '<button class="quiz-option" data-index="' + index + '" type="button">' + WORDS[index].definition + '</button>';
  }).join("");

  $$(".quiz-option").forEach(function(button) {
    button.addEventListener("click", answerQuiz);
  });
}

function answerQuiz(event) {
  var chosen = Number(event.currentTarget.dataset.index);
  var correct = state.quizTarget;
  var buttons = $$(".quiz-option");

  buttons.forEach(function(button) {
    button.disabled = true;
    var index = Number(button.dataset.index);
    if (index === correct) button.classList.add("correct");
    if (index === chosen && index !== correct) button.classList.add("wrong");
  });

  var feedback = $("#quiz-feedback");
  feedback.hidden = false;

  if (chosen === correct) {
    feedback.textContent = "Correct. " + WORDS[correct].memory;
    state.score += 5;
    state.streak += 1;
  } else {
    feedback.textContent = "Not quite. " + WORDS[correct].memory;
    state.streak = 0;
  }

  $("#next-quiz").hidden = false;
  saveProgress();
  renderStats();
}

function renderKSLUSyllabus() {
  var detail = $("#syllabus-detail");
  if (!detail) return;

  var coursesHtml = KSLU_FIRST_SEMESTER.courses.map(function(course, courseIndex) {
    var units = course.units.map(function(unit) {
      return '<details class="unit-reveal">' +
        '<summary><span>' + unit.unit + '</span><strong>' + unit.title + '</strong><small>Tap to reveal topics</small></summary>' +
        '<div class="unit-reveal-content"><p>' + unit.text + '</p></div>' +
        '</details>';
    }).join("");

    return '<details class="course-card">' +
      '<summary><span class="course-number">Paper ' + (courseIndex + 1) + '</span><strong>' + course.name + '</strong><small class="tap-hint">Tap to view units</small></summary>' +
      '<div class="course-content"><p class="course-about">' + course.about + '</p>' + units + '</div>' +
      '</details>';
  }).join("");

  detail.innerHTML =
    '<article class="semester-summary"><p class="eyebrow">KSLU · Semester I only</p>' +
    '<h3>6 Papers</h3><p>Tap a paper to open its five units. Tap an individual unit only when you want the full topic list.</p>' +
    '<p class="course-note">' + KSLU_FIRST_SEMESTER.note + '</p></article>' +
    coursesHtml;
}

function renderPaperFilters() {
  var subjects = ["All subjects"].concat(Array.from(new Set(PRACTICE_QUESTIONS.map(function(q) { return q.subject; }))));
  var papers = ["All papers"].concat(Array.from(new Set(PRACTICE_QUESTIONS.map(function(q) { return q.paper; }))));

  $("#subject-filter").innerHTML = subjects.map(function(value) {
    return '<option value="' + value + '">' + value + '</option>';
  }).join("");

  $("#paper-filter").innerHTML = papers.map(function(value) {
    return '<option value="' + value + '">' + value + '</option>';
  }).join("");

  $("#subject-filter").addEventListener("change", renderQuestions);
  $("#paper-filter").addEventListener("change", renderQuestions);
}

function renderQuestions() {
  var subject = $("#subject-filter").value || "All subjects";
  var paper = $("#paper-filter").value || "All papers";

  var filtered = PRACTICE_QUESTIONS.filter(function(q) {
    return (subject === "All subjects" || q.subject === subject) &&
           (paper === "All papers" || q.paper === paper);
  });

  $("#question-list").innerHTML = filtered.map(function(q, index) {
    var topics = q.topics.map(function(topic) {
      return '<span class="unit-chip">' + topic + '</span>';
    }).join("");

    return '<article class="question-card"><div class="question-meta"><span class="unit-chip">' +
      q.subject + '</span><span class="unit-chip">' + q.part + '</span><span class="unit-chip">' +
      q.unit + '</span></div><p class="eyebrow">Starter question ' + (index + 1) +
      '</p><h3>' + q.question + '</h3><div class="subject-units">' + topics +
      '</div><details><summary>Show answer approach</summary><p>' + q.answer + '</p></details></article>';
  }).join("");
}

function setupNavigation() {
  /* One shared hash router handles menu clicks, back and view activation. */
  window.LawAppCore.router = window.LawAppCore.createRouter(window,document);
  window.LawAppCore.router.start();

  $$(".word-tab").forEach(function(button) {
    button.addEventListener("click", function() {
      var view = button.dataset.wordView;
      $$(".word-tab").forEach(function(btn) { btn.classList.toggle("active", btn === button); });
      $$(".word-panel").forEach(function(panel) { panel.classList.toggle("active", panel.id === view + "-panel"); });
      if (view === "quiz") newQuiz();
    });
  });

  $$(".learn-choice").forEach(function(button) {
    button.addEventListener("click", function() {
      var target = button.dataset.learnTarget;
      var alreadyOpen = button.classList.contains("active");

      $$(".learn-choice").forEach(function(choice) {
        choice.classList.remove("active");
        choice.setAttribute("aria-expanded", "false");
        var icon = choice.querySelector(".learn-choice-icon");
        if (icon) icon.textContent = "+";
      });

      $$(".learn-box").forEach(function(box) {
        box.classList.remove("active");
      });

      if (!alreadyOpen) {
        button.classList.add("active");
        button.setAttribute("aria-expanded", "true");
        var icon = button.querySelector(".learn-choice-icon");
        if (icon) icon.textContent = "−";
        var box = $("#" + target + "-learn-box");
        if (box) box.classList.add("active");
      }
    });
  });
}

function setupNotes() {
  var area = $("#notes-area");
  var status = $("#notes-status");
  area.value = localStorage.getItem(NOTES_KEY) || "";
  var timer = null;

  area.addEventListener("input", function() {
    status.textContent = "Saving…";
    clearTimeout(timer);
    timer = setTimeout(function() {
      localStorage.setItem(NOTES_KEY, area.value);
      status.textContent = "Saved locally on this device";
    }, 350);
  });

  $("#clear-notes").addEventListener("click", function() {
    if (!confirm("Clear all notes saved on this device?")) return;
    area.value = "";
    localStorage.removeItem(NOTES_KEY);
    status.textContent = "Notes cleared";
  });
}

function selectWordBySearch(value) {
  var query = String(value || "").trim().toLowerCase();
  if (!query) return;

  var index = WORDS.findIndex(function(word) {
    return word.term.toLowerCase() === query;
  });
  if (index < 0) {
    index = WORDS.findIndex(function(word) {
      return word.term.toLowerCase().indexOf(query) === 0;
    });
  }
  if (index < 0) {
    index = WORDS.findIndex(function(word) {
      return word.term.toLowerCase().indexOf(query) !== -1;
    });
  }

  if (index >= 0) {
    state.currentWord = index;
    renderWord();
  }
}

$("#word-select").addEventListener("change", function(event) {
  state.currentWord = Number(event.target.value);
  renderWord();
});

var wordSearchInput = $("#word-search");
if (wordSearchInput) {
  wordSearchInput.addEventListener("change", function(event) {
    selectWordBySearch(event.target.value);
  });
  wordSearchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      selectWordBySearch(event.target.value);
    }
  });
}
$("#prev-word").addEventListener("click", function() { changeWord(-1); });
$("#next-word").addEventListener("click", function() { changeWord(1); });
$("#speak-word").addEventListener("click", function() { speakCurrent(0.82); });
$("#speak-slow").addEventListener("click", function() { speakCurrent(0.62); });
$("#mark-known").addEventListener("click", markKnown);
$("#mark-hard").addEventListener("click", markHard);
$("#next-quiz").addEventListener("click", function() { changeWord(1); newQuiz(); });

populateWordSelect();
setupWordCardLibrary();
setupNavigation();
renderKSLUSyllabus();
renderPaperFilters();
renderQuestions();
setupNotes();
renderWord();

if (window.speechSynthesis && typeof window.speechSynthesis.getVoices === "function") {
  window.speechSynthesis.getVoices();
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("./sw.js").catch(function(error) {
      console.warn("Service worker registration failed:", error);
    });
  });
}

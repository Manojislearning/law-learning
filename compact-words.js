/* Law Learning: single-word study flow. Works with existing app.js WORDS and progress. */
(function () {
  "use strict";
  var host = document.getElementById("words-view");
  if (!host || typeof WORDS === "undefined" || !WORDS.length) return;
  var css = document.createElement("style");
  css.textContent = "\n#words-view > :not(.quick-words){display:none!important}\n#home-view .home-card:not([data-open=\"words\"]):not([data-open=\"syllabus\"]){display:none!important}\n#home-view .home-grid{display:block;max-width:640px;margin:auto}\n#home-view .home-card[data-open=\"words\"],#home-view .home-card[data-open=\"syllabus\"]{width:100%;margin-bottom:12px}\n.quick-words{max-width:640px;margin:12px auto;padding-bottom:124px}\n.quick-search{display:flex;align-items:center;gap:9px;background:#fff;border:1px solid var(--line);border-radius:13px;min-height:43px;padding:0 12px;margin-bottom:10px;width:100%}\n.quick-search:focus-within{border-color:#8a96a8;box-shadow:0 0 0 3px rgba(13,19,33,.06)}\n.quick-search input{width:100%;flex:1;min-width:0;border:0;outline:none;background:transparent;color:var(--text);font:inherit;font-size:16px}\n.quick-search-icon{font-size:1.1rem;color:var(--muted);line-height:1}\n.search-clear{border:0;background:none;font-size:1.2rem;color:var(--muted);cursor:pointer;padding:5px}\n.quick-results{background:#fff;border:1px solid var(--line);border-radius:13px;overflow:hidden;margin-bottom:12px}\n.quick-results[hidden],.study-panel[hidden],.study-feedback[hidden],.review-list[hidden],.study-news[hidden]{display:none!important}\n.quick-result{border:0;border-bottom:1px solid var(--line);background:white;padding:12px 14px;display:flex;width:100%;align-items:center;justify-content:space-between;gap:12px;text-align:left;font:inherit;cursor:pointer;color:var(--text)}\n.quick-result:last-child{border-bottom:0}\n.quick-result:hover,.quick-result:focus-visible{background:#f3f5f8}\n.study-heading{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:7px 0 15px}\n.study-heading span{font-size:.76rem;font-weight:750;color:var(--muted)}\n.study-heading button{border:0;background:none;color:var(--text);font:inherit;font-weight:750;font-size:.86rem;cursor:pointer;padding:8px}\n.study-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px;margin-bottom:14px}\n.study-tabs button{border:1px solid var(--line);border-radius:13px;background:#fff;min-height:44px;color:var(--text);font:inherit;font-size:.88rem;font-weight:750;cursor:pointer}\n.study-tabs button.active{background:var(--text);color:#fff}\n.study-panel{border:1px solid var(--line);background:#fff;padding:clamp(16px,4.7vw,23px);border-radius:22px;box-shadow:0 12px 35px rgba(13,19,33,.035)}\n.study-kicker{font-size:.73rem;font-weight:800;color:var(--muted);margin:0 0 15px}\n.study-term{font:500 clamp(1.8rem,8vw,3.15rem)/1.14 Georgia,serif;letter-spacing:-.025em;overflow-wrap:anywhere;margin:0 0 22px}\n.study-definition{font-size:1.02rem;line-height:1.55;margin:0 0 16px}\n.study-meta{font-size:.72rem;text-transform:uppercase;letter-spacing:.06em;font-weight:800;color:var(--muted);margin:20px 0 6px}\n.study-more{font-size:.91rem;line-height:1.55;color:var(--text);margin:0}\n.study-actions{margin-top:17px;display:flex;align-items:center;gap:10px}\n.study-actions button,.mini-tabs button,.study-next{padding:10px 13px;border-radius:11px;border:1px solid var(--line);font:inherit;font-weight:750;background:#f7f8fa;color:var(--text);cursor:pointer}\n.study-news{margin-top:20px;padding-top:14px;border-top:1px solid var(--line);font-size:.84rem;line-height:1.5}\n.study-news a{color:#1d4e91;text-decoration:underline}\n.mini-tabs{display:flex;gap:8px;margin-bottom:17px}\n.mini-tabs button{padding:8px 13px;font-size:.8rem}\n.mini-tabs button.active{background:var(--text);color:white}\n.game-options{display:grid;gap:9px}\n.game-choice{display:block;width:100%;text-align:left;background:#f9fafb;border:1px solid var(--line);border-radius:13px;padding:12px 13px;font:inherit;font-size:.94rem;line-height:1.42;color:var(--text);cursor:pointer}\n.game-choice.correct{background:#eaf7ef;border-color:#408a60}\n.game-choice.wrong{background:#fff0ee;border-color:#be5a52}\n.game-choice:disabled{cursor:default}\n.study-feedback{margin:15px 0 0;font-size:.9rem;font-weight:750;line-height:1.45}\n.spell-prompt{font-size:1rem;line-height:1.5;color:var(--muted);margin:-6px 0 15px}\n.spell-mask{font-family:Georgia,serif;font-size:clamp(1.9rem,7vw,2.9rem);letter-spacing:.09em;overflow-wrap:anywhere;margin:0 0 20px}\n.spell-form{display:flex;flex-direction:column;gap:10px}\n.spell-form input{min-width:0;width:100%;min-height:46px;border:1px solid var(--line);border-radius:12px;padding:10px;font-size:16px;letter-spacing:.12em}\n.spell-form button{align-self:start;padding:11px 16px;border-radius:12px;background:var(--text);color:white;border:0;font:inherit;font-weight:750;cursor:pointer}\n.compare-sides{display:grid;grid-template-columns:1fr 1fr;gap:10px}\n.compare-side{min-width:0;border:1px solid var(--line);border-radius:13px;padding:14px;background:#f9fafb}\n.compare-side strong{font-size:.97rem;overflow-wrap:anywhere}\n.compare-side p{margin:9px 0 0;font-size:.86rem;line-height:1.55}\n.compare-note{margin:14px 0 0;font-size:.84rem;line-height:1.5;color:var(--muted)}\n.study-bar{position:fixed;bottom:calc(10px + env(safe-area-inset-bottom));left:50%;transform:translateX(-50%);width:min(calc(100% - 22px),650px);z-index:25;border:1px solid var(--line);border-radius:18px;background:rgba(255,255,255,.97);box-shadow:0 12px 38px rgba(13,19,33,.14);padding:10px;backdrop-filter:blur(10px)}\n.study-bar-top{display:flex;align-items:center;justify-content:space-between;margin:0 3px 7px;gap:8px}\n.study-bar-top span{font-size:.71rem;color:var(--muted);font-weight:700}\n.study-bar-top button{font-size:.76rem;font-weight:750;border:0;background:transparent;color:var(--text);padding:5px;cursor:pointer}\n.study-bar-actions{display:grid;grid-template-columns:1fr 1fr;gap:9px}\n.study-bar-actions button{min-height:43px;border:1px solid var(--text);border-radius:12px;font:inherit;font-weight:750;font-size:.9rem;cursor:pointer}\n#word-got{background:var(--text);color:#fff}\n#word-revise{background:#fff;color:var(--text)}\n.review-list{background:white;border:1px solid var(--line);border-radius:14px;padding:12px;margin-bottom:14px}\n.review-list p{font-size:.83rem;color:var(--muted);margin:4px 0 9px}\n.review-list button{display:inline-block;margin:5px;padding:8px 10px;background:#f5f6f8;border:1px solid var(--line);border-radius:9px;font:inherit;font-size:.82rem;cursor:pointer}\n@media (max-width:460px){.compare-sides{grid-template-columns:1fr}.study-panel{padding:17px}.quick-words{padding-bottom:132px}}\n@media(prefers-reduced-motion:no-preference){\n@keyframes word-rise{from{opacity:0;transform:translateY(13px) scale(.985)}to{opacity:1;transform:translateY(0) scale(1)}}\n.study-panel.motion{animation:word-rise .3s cubic-bezier(.2,.7,.2,1) both}\n.quick-result{animation:word-rise .16s ease both}\n}\n";
  document.head.appendChild(css);

  host.insertAdjacentHTML("afterbegin",
    '<div class="quick-words">' +
      '<div class="quick-search"><span class="quick-search-icon" aria-hidden="true">⌕</span><input id="study-search" type="search" placeholder="Search legal words…" autocomplete="off" aria-label="Search words" aria-controls="study-results"><button class="search-clear" id="study-clear" type="button" aria-label="Clear search" hidden>×</button></div>' +
      '<div class="quick-results" id="study-results" hidden></div>' +
      '<div class="study-heading"><span id="study-position"></span><button id="study-next" type="button">Next word →</button></div>' +
      '<nav class="study-tabs" aria-label="Study modes"><button data-mode="game" class="active" aria-pressed="true" type="button">Game</button><button data-mode="learn" aria-pressed="false" type="button">Learn</button><button data-mode="compare" aria-pressed="false" type="button">Compare</button></nav>' +
      '<section id="study-game" class="study-panel" aria-label="Word game"><div class="mini-tabs"><button type="button" data-game="meaning" class="active">Meaning</button><button type="button" data-game="spelling">Spelling</button></div><p class="study-kicker" id="game-prompt"></p><h2 class="study-term" id="game-term"></h2><p id="game-clue" class="spell-prompt" hidden></p><div id="game-options" class="game-options"></div><p id="game-feedback" class="study-feedback" aria-live="polite" hidden></p></section>' +
      '<section id="study-learn" class="study-panel" aria-label="Learn word" hidden><p class="study-kicker" id="learn-category"></p><h2 id="learn-term" class="study-term"></h2><p id="learn-definition" class="study-definition"></p><p class="study-meta">Remember</p><p class="study-more" id="learn-memory"></p><p class="study-meta">Example</p><p class="study-more" id="learn-example"></p><div class="study-actions"><button id="learn-listen" type="button">Listen ↗</button></div><div class="study-news" id="learn-news"></div></section>' +
      '<section id="study-compare" class="study-panel" aria-label="Compare word" hidden><p class="study-kicker">Compare related terms</p><div class="compare-sides"><div class="compare-side"><strong id="compare-left-term"></strong><p id="compare-left-meaning"></p></div><div class="compare-side"><strong id="compare-right-term"></strong><p id="compare-right-meaning"></p></div></div><p class="compare-note" id="compare-rule"></p></section>' +
      '<div class="review-list" id="study-review-list" hidden><strong>Revision list</strong><p>Select a saved word to practise again.</p><div id="study-review-terms"></div></div>' +
      '<div class="study-bar"><div class="study-bar-top"><span id="study-progress"></span><button id="review-toggle" type="button" aria-expanded="false">Revision (0)</button></div><div class="study-bar-actions"><button id="word-got" type="button">Got it</button><button id="word-revise" type="button">Revise later</button></div></div>' +
    '</div>'
  );

  var $ = function (id) { return document.getElementById(id); };
  var selected = typeof state !== "undefined" && Number.isInteger(state.currentWord) && state.currentWord >= 0 && state.currentWord < WORDS.length ? state.currentWord : 0;
  var mode = "game";
  var gameType = "meaning";
  var correctCount = 0;
  var answered = { meaning: false, spelling: false };
  var optionToken = 0;
  try { correctCount = Number(localStorage.getItem("law-word-game-score")) || 0; } catch (e) {}

  function word() { return WORDS[selected]; }
  function simplify(s) { return String(s || "").trim().toLocaleLowerCase(); }
  function arrayShuffle(list) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var v = a[i]; a[i] = a[j]; a[j] = v; }
    return a;
  }
  function progress() {
    return typeof state !== "undefined" ? state : null;
  }
  function updateProgress() {
    var p = progress();
    if (!p) return;
    $("study-progress").textContent = p.learned.size + " learned";
    $("review-toggle").textContent = "Revision (" + p.difficult.size + ")";
    if (typeof saveProgress === "function") saveProgress();
    if (typeof renderStats === "function") renderStats();
  }
  function animate() {
    var visible = document.querySelector("#words-view .study-panel:not([hidden])");
    if (!visible) return;
    visible.classList.remove("motion");
    void visible.offsetWidth;
    visible.classList.add("motion");
  }
  function setMode(next) {
    mode = next;
    document.querySelectorAll("#words-view [data-mode]").forEach(function (button) {
      var current = button.dataset.mode === next;
      button.classList.toggle("active", current);
      button.setAttribute("aria-pressed", String(current));
    });
    ["game", "learn", "compare"].forEach(function (id) { $("study-" + id).hidden = id !== next; });
    renderMode();
    animate();
  }
  function selectWord(index, targetMode) {
    if (!Number.isInteger(index) || index < 0 || index >= WORDS.length) return;
    selected = index;
    var p = progress();
    if (p) { p.currentWord = index; updateProgress(); }
    answered = { meaning: false, spelling: false };
    $("study-search").value = "";
    $("study-clear").hidden = true;
    hideSearch();
    $("study-position").textContent = "Word " + (selected + 1) + " of " + WORDS.length;
    setMode(targetMode || mode);
  }
  function nextWord() { selectWord((selected + 1) % WORDS.length); }
  function hideSearch() { $("study-results").hidden = true; $("study-results").replaceChildren(); }
  function runSearch() {
    var query = simplify($("study-search").value);
    $("study-clear").hidden = !query;
    if (!query) { hideSearch(); return; }
    var results = WORDS.map(function (w, i) { return { index: i, label: w.term }; })
      .filter(function (item) { return simplify(item.label).includes(query); })
      .sort(function (a, b) {
        var pa = simplify(a.label).startsWith(query) ? 0 : 1, pb = simplify(b.label).startsWith(query) ? 0 : 1;
        return pa - pb || a.label.localeCompare(b.label);
      }).slice(0, 9);
    $("study-results").replaceChildren();
    if (!results.length) {
      var empty = document.createElement("p");
      empty.className = "study-more";
      empty.style.padding = "13px";
      empty.textContent = "No matching words.";
      $("study-results").appendChild(empty);
    } else {
      results.forEach(function (item) {
        var button = document.createElement("button");
        button.type = "button";
        button.className = "quick-result";
        button.textContent = item.label;
        button.addEventListener("click", function () { selectWord(item.index, "learn"); });
        $("study-results").appendChild(button);
      });
    }
    $("study-results").hidden = false;
  }
  function wordTokens(text) {
    var stop = ["the","and","with","where","from","that","which","this","their","into","under","legal","person","court","means","being","right","relating","other"];
    return String(text || "").toLowerCase().split(/[^a-z]+/).filter(function (t) { return t.length >= 4 && !stop.includes(t); });
  }
  function similarWords() {
    var focus = word();
    var category = focus.category || "Foundation";
    var tokens = new Set(wordTokens(focus.definition));
    return WORDS.map(function (item, index) {
      var similarity = wordTokens(item.definition).filter(function (token) { return tokens.has(token); }).length;
      return { index: index, w: item, weight: similarity };
    }).filter(function (item) { return item.index !== selected && item.w.definition && item.w.definition !== focus.definition && (item.w.category || "Foundation") === category; })
      .sort(function (a, b) { return b.weight - a.weight; });
  }
  function renderMeaning() {
    $("game-prompt").textContent = "Choose the correct meaning";
    $("game-term").hidden = false;
    $("game-term").textContent = word().term;
    $("game-clue").hidden = true;
    $("game-feedback").hidden = true;
    var options = $("game-options");
    options.replaceChildren();
    var all = similarWords();
    if (all.length < 3) {
      all = WORDS.map(function (w, index) { return { w: w, index: index }; })
        .filter(function (entry) { return entry.index !== selected && entry.w.definition && entry.w.definition !== word().definition; });
    }
    var chosen = all.slice(0, Math.min(all.length, 8));
    var distractors = arrayShuffle(chosen).slice(0, 3).map(function (item) { return item.w; });
    var candidates = arrayShuffle([word()].concat(distractors));
    var token = ++optionToken;
    candidates.forEach(function (candidate) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "game-choice";
      button.textContent = candidate.definition;
      if (answered.meaning) button.disabled = true;
      button.addEventListener("click", function () {
        if (answered.meaning || token !== optionToken) return;
        answered.meaning = true;
        var correct = candidate === word();
        document.querySelectorAll("#game-options .game-choice").forEach(function (b) {
          b.disabled = true;
          if (b.textContent === word().definition) b.classList.add("correct");
        });
        if (!correct) button.classList.add("wrong");
        showFeedback(correct ? "Correct. You can also practise its spelling." : "Not quite. The correct meaning is highlighted.");
        if (correct) award();
      });
      options.appendChild(button);
    });
    if (answered.meaning) showFeedback("Meaning question completed. Switch to Spelling or choose another word.");
  }
  function maskWord(term) {
    var chars = Array.from(term);
    var available = chars.map(function (c, i) { return /[A-Za-z]/.test(c) ? i : -1; }).filter(function (i) { return i >= 0; });
    var missing = available.filter(function (_, i) { return i % 3 === 1 || (available.length <= 5 && i === 0); });
    if (!missing.length && available.length) missing = [available[0]];
    return { display: chars.map(function (c, i) { return missing.includes(i) ? "＿" : c; }).join(""), expected: missing.map(function (i) { return chars[i]; }).join("") };
  }
  function renderSpelling() {
    $("game-prompt").textContent = "Fill in the missing letters";
    $("game-term").hidden = false;
    var mask = maskWord(word().term);
    $("game-term").textContent = mask.display;
    $("game-term").classList.add("spell-mask");
    $("game-clue").hidden = false;
    $("game-clue").textContent = word().definition;
    $("game-feedback").hidden = true;
    $("game-options").replaceChildren();
    var form = document.createElement("form");
    form.className = "spell-form";
    var input = document.createElement("input");
    input.type = "text"; input.autocomplete = "off"; input.spellcheck = false;
    input.setAttribute("aria-label", "Missing letters, in order");
    input.placeholder = "Missing letters, in order";
    input.maxLength = Math.max(mask.expected.length * 2, 1);
    var submit = document.createElement("button");
    submit.type = "submit"; submit.textContent = "Check";
    form.append(input, submit);
    if (answered.spelling) { input.disabled = true; submit.disabled = true; }
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (answered.spelling) return;
      answered.spelling = true;
      var correct = simplify(input.value).replace(/\s/g, "") === simplify(mask.expected);
      input.disabled = true; submit.disabled = true;
      $("game-term").textContent = word().term;
      showFeedback(correct ? "Correct spelling." : "Missing letters: " + mask.expected + " · " + word().term);
      if (correct) award();
    });
    $("game-options").appendChild(form);
    if (answered.spelling) showFeedback("Spelling completed. Choose another word to play again.");
  }
  function award() {
    correctCount++;
    try { localStorage.setItem("law-word-game-score", String(correctCount)); } catch (e) {}
    var p = progress();
    if (p) { p.score += 5; p.streak++; updateProgress(); }
  }
  function showFeedback(message) { $("game-feedback").hidden = false; $("game-feedback").textContent = message; }
  function renderGame() {
    document.querySelectorAll("#words-view [data-game]").forEach(function (button) {
      button.classList.toggle("active", button.dataset.game === gameType);
    });
    $("game-term").classList.remove("spell-mask");
    if (gameType === "meaning") renderMeaning(); else renderSpelling();
  }
  var newsByWord = {
    "Appeal": { title: "US Supreme Court to hear an appeal over immigration detention", url: "https://www.reuters.com/world/supreme-court-hear-trump-appeal-involving-lengthy-detention-certain-immigrants-2026-06-15/" },
    "Petitioner": { title: "India's Supreme Court rejects Vodafone Idea petition", url: "https://www.reuters.com/world/india/india-top-court-rejects-vodafone-ideas-petition-india-waive-telecom-dues-2025-05-19/" },
    "Petition": { title: "India's Supreme Court rejects Vodafone Idea petition", url: "https://www.reuters.com/world/india/india-top-court-rejects-vodafone-ideas-petition-india-waive-telecom-dues-2025-05-19/" }
  };
  function renderNews() {
    var section = $("learn-news");
    section.replaceChildren();
    var p = document.createElement("p");
    p.className = "study-meta";
    p.textContent = "In the news";
    var a = document.createElement("a");
    a.target = "_blank"; a.rel = "noopener noreferrer";
    var data = newsByWord[word().term];
    a.href = data ? data.url : "https://news.google.com/search?q=" + encodeURIComponent('"' + word().term + '" court law');
    a.textContent = data ? data.title + " ↗" : "Find reporting related to " + word().term + " ↗";
    section.append(p, a);
    section.hidden = false;
  }
  function renderLearn() {
    $("learn-category").textContent = word().category || "Legal term";
    $("learn-term").textContent = word().term;
    $("learn-definition").textContent = word().definition || "";
    $("learn-memory").textContent = word().memory || "";
    $("learn-example").textContent = word().examples && word().examples.length ? word().examples[0] : "Use this term precisely in your answer.";
    renderNews();
  }
  function renderCompare() {
    var w = word();
    $("compare-left-term").textContent = w.term;
    $("compare-left-meaning").textContent = w.compareSelf || w.definition;
    var genuine = w.compareTerm && !["Answer use", "Examiner expects"].includes(w.compareTerm);
    if (genuine) {
      $("compare-right-term").textContent = w.compareTerm;
      $("compare-right-meaning").textContent = w.compareOther || "";
      $("compare-rule").textContent = w.compareRule || "Compare the two legal concepts.";
    } else {
      var related = similarWords()[0];
      $("compare-right-term").textContent = related ? related.w.term : "Related concept";
      $("compare-right-meaning").textContent = related ? related.w.definition : "Additional comparisons will be added.";
      $("compare-rule").textContent = "Related vocabulary in the same subject area. Compare their meanings; they are not necessarily opposites.";
    }
  }
  function renderMode() {
    if (mode === "game") renderGame();
    if (mode === "learn") renderLearn();
    if (mode === "compare") renderCompare();
  }
  function reviewQueue() {
    var p = progress();
    var area = $("study-review-terms");
    area.replaceChildren();
    if (!p || !p.difficult.size) {
      var blank = document.createElement("p");
      blank.textContent = "No words marked for revision yet.";
      area.appendChild(blank);
    } else {
      Array.from(p.difficult).filter(function (idx) { return idx >= 0 && idx < WORDS.length; }).forEach(function (idx) {
        var button = document.createElement("button");
        button.type = "button"; button.textContent = WORDS[idx].term;
        button.addEventListener("click", function () { $("study-review-list").hidden = true; $("review-toggle").setAttribute("aria-expanded", "false"); selectWord(idx, "learn"); });
        area.appendChild(button);
      });
    }
  }
  function mark(forRevision) {
    var p = progress();
    if (p) {
      if (forRevision) {
        p.difficult.add(selected); p.learned.delete(selected); p.streak = 0;
      } else {
        var first = !p.learned.has(selected);
        p.learned.add(selected); p.difficult.delete(selected);
        if (first) p.score += 10;
        p.streak++;
      }
      updateProgress();
    }
    nextWord();
  }
  document.querySelectorAll("#words-view [data-mode]").forEach(function (button) {
    button.addEventListener("click", function () { setMode(button.dataset.mode); });
  });
  document.querySelectorAll("#words-view [data-game]").forEach(function (button) {
    button.addEventListener("click", function () { gameType = button.dataset.game; if (mode !== "game") setMode("game"); else { renderGame(); animate(); } });
  });
  $("study-search").addEventListener("input", runSearch);
  $("study-search").addEventListener("keydown", function (event) {
    if (event.key === "Escape") { hideSearch(); this.blur(); }
    if (event.key === "Enter") { var first = $("study-results").querySelector("button"); if (first) { event.preventDefault(); first.click(); } }
  });
  $("study-clear").addEventListener("click", function () { $("study-search").value = ""; hideSearch(); this.hidden = true; $("study-search").focus(); });
  $("study-next").addEventListener("click", nextWord);
  $("word-got").addEventListener("click", function () { mark(false); });
  $("word-revise").addEventListener("click", function () { mark(true); });
  $("review-toggle").addEventListener("click", function () {
    var list = $("study-review-list"); list.hidden = !list.hidden;
    this.setAttribute("aria-expanded", String(!list.hidden));
    if (!list.hidden) { reviewQueue(); list.scrollIntoView({ block: "nearest", behavior: "smooth" }); }
  });
  $("learn-listen").addEventListener("click", function () {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    var speech = new SpeechSynthesisUtterance(word().term);
    speech.lang = "en-IN"; speech.rate = 0.85;
    window.speechSynthesis.speak(speech);
  });
  selectWord(selected, "game");
})();
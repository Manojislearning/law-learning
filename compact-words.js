/* Search-first vocabulary interface. All terms remain in the original WORDS dataset. */
(function () {
  "use strict";
  var host = document.getElementById("words-view");
  if (!host || typeof WORDS === "undefined") return;

  var style = document.createElement("style");
  style.textContent = `
    #words-view > :not(.quick-words) { display: none !important; }
    #home-view .home-card:not([data-open="words"]) { display:none !important; }
    #home-view .home-grid { display:block; max-width:640px; margin:auto; }
    #home-view .home-card[data-open="words"] { width:100%; }
    @keyframes wordEnter { from {opacity:0;transform:translateY(18px) scale(.975);filter:blur(3px)} to {opacity:1;transform:translateY(0) scale(1);filter:blur(0)} }
    @keyframes resultEnter {from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}
    #quick-word-card:not([hidden]), .game-question.animated {animation:wordEnter .42s cubic-bezier(.18,.7,.2,1) both;}
    .quick-result {animation:resultEnter .22s ease both;}
    @media (prefers-reduced-motion:reduce) { #quick-word-card:not([hidden]),.game-question.animated,.quick-result {animation:none !important} }
    .quick-search-wrap {display:flex;align-items:center;gap:10px;margin-bottom:18px;justify-content:flex-end;}
    .quick-search {width:44px;min-height:38px;padding:0 11px;border-radius:14px;transition:width .3s ease;overflow:hidden;}
    .quick-search.expanded {width:100%;}
    .quick-search-trigger {border:0;background:none;color:var(--text);font-size:1.2rem;padding:0;cursor:pointer;min-width:20px;}
    #quick-word-input {min-height:38px;font-size:.88rem;min-width:0;width:0;opacity:0;pointer-events:none;transition:opacity .2s ease;}
    .quick-search.expanded #quick-word-input {opacity:1;pointer-events:auto;width:auto;}
    .quick-mode {display:flex;gap:8px;margin:0 0 18px;}
    .quick-mode button {border:1px solid var(--line);border-radius:12px;background:white;padding:10px 16px;font:inherit;font-weight:750;cursor:pointer;}
    .quick-mode button.active {background:var(--text);color:white;}
    #quick-game[hidden],#quick-study[hidden] {display:none!important;}
    .game-question {padding:24px;border:1px solid var(--line);border-radius:20px;background:white;}
    .game-meta {display:flex;justify-content:space-between;color:var(--muted);font-size:.75rem;font-weight:750;}
    .game-term {font-family:Georgia,serif;font-size:clamp(2rem,8vw,3.2rem);margin:23px 0;overflow-wrap:anywhere;}
    .game-options {display:grid;gap:9px;}
    .game-choice {padding:14px;text-align:left;background:#fafbfc;border:1px solid var(--line);border-radius:13px;font:inherit;cursor:pointer;line-height:1.45;}
    .game-choice:disabled {cursor:default;}
    .game-choice.correct {background:#e5f5eb;border-color:#198452;}
    .game-choice.wrong {background:#fff0ee;border-color:#c34137;}
    .game-feedback {min-height:30px;margin:15px 0 0;font-weight:700;}
    .game-next {margin-top:9px;padding:12px 20px;background:var(--text);color:white;border:0;border-radius:12px;font:inherit;font-weight:750;}
    .game-next[hidden] {display:none!important;}
    .quick-search-wrap + #quick-word-results {margin-bottom:15px;}

    .quick-words { max-width: 640px; margin: 22px auto; }
    .quick-words h2 { margin: 0 0 5px; font-size: clamp(1.6rem,6vw,2.3rem); }
    .quick-words .quick-caption { color: var(--muted); font-size: .86rem; margin-bottom: 24px; }
    .quick-search { display:flex; align-items:center; gap:10px; padding: 5px 14px; border: 1px solid var(--line); border-radius:17px; background:#fff; box-shadow:0 8px 30px rgba(13,19,33,.05); }
    .quick-search:focus-within { border-color:#4d596d; box-shadow:0 0 0 3px rgba(13,19,33,.07); }
    .quick-search-icon { color:var(--muted); font-size:1.2rem; }
    #quick-word-input { flex:1; min-width:0; border:0; outline:0; min-height:51px; font:inherit; font-size:1rem; background:transparent; color:var(--text); }
    #quick-search-clear { background:transparent; border:0; color:var(--muted); font-size:1.3rem; padding:6px; }
    #quick-word-results { margin-top:10px; border:1px solid var(--line); border-radius:16px; overflow:hidden; background:white; }
    #quick-word-results[hidden], #quick-word-card[hidden], #quick-word-more[hidden] { display:none !important; }
    .quick-result { display:flex; align-items:center; justify-content:space-between; width:100%; padding:14px 17px; border:0; border-bottom:1px solid var(--line); background:#fff; text-align:left; color:var(--text); font:inherit; }
    .quick-result:last-child { border-bottom:0; }
    .quick-result:hover, .quick-result:focus-visible { background:var(--surface-2); }
    .quick-result small { color:var(--muted); font-size:.7rem; margin-left:10px; }
    .quick-empty { padding:17px; margin:0; color:var(--muted); }
    #quick-word-card { margin-top:22px; padding:24px; background:#fff; border:1px solid var(--line); border-radius:22px; box-shadow:var(--shadow); }
    #quick-word-card .quick-tag { color:var(--muted); font-size:.7rem; font-weight:800; text-transform:uppercase; letter-spacing:.08em; }
    #quick-word-title { font-family:Georgia,serif; font-weight:500; font-size:clamp(2rem,8vw,3.3rem); line-height:1.13; margin:8px 0 14px; overflow-wrap:anywhere; }
    #quick-word-definition { font-size:1.07rem; line-height:1.6; margin:0 0 18px; }
    .quick-actions { display:flex; flex-wrap:wrap; gap:8px; }
    .quick-actions button { border:1px solid var(--line); border-radius:11px; background:#f8f9fb; padding:10px 13px; font:inherit; font-size:.85rem; cursor:pointer; }
    .quick-actions button:hover { border-color:var(--text); }
    #quick-word-more { margin-top:18px; padding-top:16px; border-top:1px solid var(--line); }
    #quick-word-more p { margin:8px 0 14px; line-height:1.6; }
    #quick-word-more .quick-label { font-size:.7rem; font-weight:800; color:var(--muted); text-transform:uppercase; }
    .quick-footnote { margin-top:14px; font-size:.76rem; color:var(--muted); }
    @media(max-width:480px) { .quick-words{margin:14px 0} #quick-word-card{padding:20px} }
  `;
  document.head.appendChild(style);

  var shell = document.createElement("div");
  shell.className = "quick-words";
  shell.innerHTML =
    '<h2>Words</h2>' +
    '<p class="quick-caption">Learn one word at a time.</p>' +
    '<div class="quick-search-wrap"><div class="quick-search" role="search">' +
      '<button type="button" id="quick-search-toggle" class="quick-search-trigger" aria-label="Open search" aria-expanded="false">⌕</button>' +
      '<input id="quick-word-input" type="search" autocomplete="off" spellcheck="false" placeholder="Search legal words…" aria-label="Search legal vocabulary" aria-controls="quick-word-results" aria-expanded="false">' +
      '<button id="quick-search-clear" type="button" aria-label="Clear search" hidden>×</button>' +
    '</div></div>' +
    '<div id="quick-word-results" role="listbox" aria-label="Matching words" hidden></div>' +
    '<div class="quick-mode"><button type="button" id="quick-mode-game" class="active">Word game</button><button type="button" id="quick-mode-study">Learn words</button></div>' +
    '<section id="quick-game"><div id="game-question" class="game-question"><div class="game-meta"><span>Choose the correct meaning</span><span id="game-score">0 correct</span></div><h3 class="game-term" id="game-term"></h3><div class="game-options" id="game-options"></div><p class="game-feedback" id="game-feedback" aria-live="polite"></p><button class="game-next" id="game-next" type="button" hidden>Next word →</button></div></section>' +
    '<section id="quick-study" hidden><button class="game-next" id="quick-random" type="button">Show a word →</button></section>' +
    '<article id="quick-word-card" aria-live="polite" hidden>' +
      '<span class="quick-tag" id="quick-word-category">Legal term</span>' +
      '<h3 id="quick-word-title"></h3>' +
      '<p id="quick-word-definition"></p>' +
      '<div class="quick-actions"><button type="button" id="quick-word-speak">Listen</button><button type="button" id="quick-word-detail" aria-expanded="false">More details</button><button type="button" id="quick-word-close">Close card</button></div>' +
      '<div id="quick-word-more" hidden>' +
        '<span class="quick-label">Remember</span><p id="quick-word-memory"></p>' +
        '<span class="quick-label">Example</span><p id="quick-word-example"></p>' +
      '</div>' +
    '</article>';
  host.insertBefore(shell, host.firstChild);

  var input = document.getElementById("quick-word-input");
  var results = document.getElementById("quick-word-results");
  var card = document.getElementById("quick-word-card");
  var more = document.getElementById("quick-word-more");
  var clear = document.getElementById("quick-search-clear");
  var active = null;
  var searchBox = shell.querySelector(".quick-search");
  var searchToggle = document.getElementById("quick-search-toggle");
  function setSearchExpanded(open) {
    searchBox.classList.toggle("expanded", open);
    searchToggle.setAttribute("aria-expanded", String(open));
    searchToggle.setAttribute("aria-label", open ? "Close search" : "Open search");
    if (open) input.focus();
    else {input.value="";hideResults();clear.hidden=true;}
  }
  searchToggle.addEventListener("click",function(){setSearchExpanded(!searchBox.classList.contains("expanded"));});
  var game = document.getElementById("quick-game");
  var study = document.getElementById("quick-study");
  var gameMode = document.getElementById("quick-mode-game");
  var studyMode = document.getElementById("quick-mode-study");
  function mode(which) {
    game.hidden = which !== "game";
    study.hidden = which !== "study";
    gameMode.classList.toggle("active", which==="game");
    studyMode.classList.toggle("active", which==="study");
    card.hidden=true;
  }
  gameMode.addEventListener("click",function(){mode("game");});
  studyMode.addEventListener("click",function(){mode("study");});
  document.getElementById("quick-random").addEventListener("click",function(){openWord(Math.floor(Math.random()*WORDS.length));});
  var correctCount = 0, round = null;
  try { correctCount = Number(localStorage.getItem("law-word-game-score")) || 0; } catch(e){}
  function shuffle(a) { for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;} return a; }
  function nextRound() {
    var choices = WORDS.filter(function(w){return w.term && w.definition;});
    if(choices.length<4) return;
    var picked = choices[Math.floor(Math.random()*choices.length)];
    var distractors = shuffle(choices.filter(function(w){return w.term!==picked.term && w.definition!==picked.definition;})).slice(0,3);
    round=picked;
    document.getElementById("game-term").textContent=picked.term;
    document.getElementById("game-score").textContent=correctCount+" correct";
    document.getElementById("game-feedback").textContent="";
    document.getElementById("game-next").hidden=true;
    var options=document.getElementById("game-options");options.replaceChildren();
    shuffle([picked].concat(distractors)).forEach(function(w){
      var b=document.createElement("button");b.className="game-choice";b.type="button";b.textContent=w.definition;
      b.addEventListener("click",function(){
        if(!round) return;
        var right=w===round;
        if(right) { correctCount++;try{localStorage.setItem("law-word-game-score",String(correctCount));}catch(e){} }
        options.querySelectorAll("button").forEach(function(button){button.disabled=true;if(button.textContent===picked.definition)button.classList.add("correct");});
        if(!right)b.classList.add("wrong");
        document.getElementById("game-feedback").textContent=right?"Correct! +1":"Not quite. The correct answer is highlighted.";
        document.getElementById("game-score").textContent=correctCount+" correct";
        document.getElementById("game-next").hidden=false;
        round=null;
      });options.appendChild(b);
    });
    var question=document.getElementById("game-question");question.classList.remove("animated");void question.offsetWidth;question.classList.add("animated");
  }
  document.getElementById("game-next").addEventListener("click",nextRound);
  nextRound();

  function hideResults() {
    results.hidden = true;
    results.replaceChildren();
    input.setAttribute("aria-expanded", "false");
  }
  function openWord(index) {
    active = WORDS[index];
    if (!active) return;
    document.getElementById("quick-word-category").textContent = active.category || "Legal term";
    document.getElementById("quick-word-title").textContent = active.term;
    document.getElementById("quick-word-definition").textContent = active.definition || active.deep || "";
    document.getElementById("quick-word-memory").textContent = active.memory || active.daily || "";
    document.getElementById("quick-word-example").textContent = (active.examples && active.examples[0]) || "";
    input.value = active.term;
    clear.hidden = false;
    hideResults();
    more.hidden = true;
    document.getElementById("quick-word-detail").textContent = "More details";
    document.getElementById("quick-word-detail").setAttribute("aria-expanded","false");
    mode("study");
    card.hidden = false;
    card.style.animation = "none"; void card.offsetWidth; card.style.animation = "";
    card.scrollIntoView({behavior:"smooth",block:"nearest"});
  }
  function search() {
    var query = input.value.trim().toLocaleLowerCase();
    clear.hidden = !input.value;
    card.hidden = true;
    active = null;
    if (!query) { hideResults(); return; }
    var found = WORDS.map(function(w,i){ return {word:w,index:i}; })
      .filter(function(item){ return item.word.term.toLocaleLowerCase().includes(query); })
      .sort(function(a,b){
        var aa=a.word.term.toLocaleLowerCase(),bb=b.word.term.toLocaleLowerCase();
        return Number(bb.startsWith(query))-Number(aa.startsWith(query)) || aa.localeCompare(bb);
      }).slice(0,10);
    results.replaceChildren();
    if (!found.length) {
      var empty=document.createElement("p");
      empty.className="quick-empty";
      empty.textContent="No matching words.";
      results.appendChild(empty);
    } else {
      found.forEach(function(item) {
        var button=document.createElement("button");
        button.type="button"; button.className="quick-result";button.setAttribute("role","option");
        var title=document.createElement("strong");title.textContent=item.word.term;
        var arrow=document.createElement("span");arrow.textContent="→";arrow.setAttribute("aria-hidden","true");
        button.append(title,arrow);
        button.addEventListener("click",function(){openWord(item.index);});
        results.appendChild(button);
      });
    }
    results.hidden=false;
    input.setAttribute("aria-expanded","true");
  }
  input.addEventListener("input",search);
  input.addEventListener("keydown",function(event){
    if (event.key==="Escape") { hideResults(); input.blur(); }
    if (event.key==="Enter") {
      var first=results.querySelector(".quick-result");
      if (first && !results.hidden) {event.preventDefault();first.click();}
    }
  });
  clear.addEventListener("click",function(){input.value="";card.hidden=true;search();input.focus();});
  document.getElementById("quick-word-close").addEventListener("click",function(){card.hidden=true;input.value="";search();input.focus();});
  document.getElementById("quick-word-detail").addEventListener("click",function(){
    more.hidden=!more.hidden;
    this.textContent=more.hidden?"More details":"Less details";
    this.setAttribute("aria-expanded",String(!more.hidden));
  });
  document.getElementById("quick-word-speak").addEventListener("click",function(){
    if (!active || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    var speech=new SpeechSynthesisUtterance(active.term);
    speech.lang="en-IN";speech.rate=.85;window.speechSynthesis.speak(speech);
  });
})();

/* Search-first vocabulary interface. All terms remain in the original WORDS dataset. */
(function () {
  "use strict";
  var host = document.getElementById("words-view");
  if (!host || typeof WORDS === "undefined") return;

  var style = document.createElement("style");
  style.textContent = `
    #words-view > :not(.quick-words) { display: none !important; }
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
    '<h2>Legal words</h2>' +
    '<p class="quick-caption">Search a term. Tap a result to open its card.</p>' +
    '<div class="quick-search" role="search">' +
      '<span class="quick-search-icon" aria-hidden="true">⌕</span>' +
      '<input id="quick-word-input" type="search" autocomplete="off" spellcheck="false" placeholder="Search legal words…" aria-label="Search legal vocabulary" aria-controls="quick-word-results" aria-expanded="false">' +
      '<button id="quick-search-clear" type="button" aria-label="Clear search" hidden>×</button>' +
    '</div>' +
    '<div id="quick-word-results" role="listbox" aria-label="Matching words" hidden></div>' +
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
    card.hidden = false;
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

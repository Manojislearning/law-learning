/* Case Book v81 — every case name in the app becomes a link to an exam-ready summary.
   • Linker: watches the visible screen and wraps known case names in buttons (.case-link).
     It never touches buttons, links, inputs, or quiz questions that are still unanswered.
   • Sheet: facts, issue, held, the rule in one line, and "write this in your exam", with Copy.
     Difficult words are links to a word page; each word page links back to every case that uses it.
   • Case Book screen (Student → Case Book, #cases): search, subject filter, and the word list.
   Data: cases-data.js, cases-data-2.js, case-words-data.js. All text via textContent. */
(function(root){
"use strict";
var doc=root.document;
var CASES=[].concat(root.LAW_CASES_A||[],root.LAW_CASES_B||[]),WORDS=root.LAW_CASE_WORDS||{};
if(!CASES.length)return;
var BY_ID={};CASES.forEach(function(c){BY_ID[c.id]=c;});
var SUBJECTS={contract:"Contract",torts:"Torts",constitution:"Constitution",family:"Family law",labour:"Labour law"};
var FIELDS=["facts","issue","held","rule","exam"];
var MARK=/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

function el(tag,text,cls,parent){var n=doc.createElement(tag);if(cls)n.className=cls;if(text!==undefined&&text!==null)n.textContent=String(text);if(parent)parent.appendChild(n);return n;}
function btn(text,cls,parent,fn){var b=el("button",text,cls,parent);b.type="button";if(fn)b.addEventListener("click",fn);return b;}
function plain(s){return String(s||"").replace(MARK,function(_,k,shown){return shown||k;});}
function wordsOf(c){var seen=[];FIELDS.forEach(function(f){String(c[f]||"").replace(MARK,function(_,k){k=k.toLowerCase();if(WORDS[k]&&seen.indexOf(k)<0)seen.push(k);return _;});});return seen;}
/* Backlinks: every case whose summary uses the word, marked or not. */
var BACKLINKS={};
Object.keys(WORDS).forEach(function(w){
 var re=new RegExp("(^|[^a-z])"+w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/ /g,"[\\s-]+")+"(?![a-z])","i");
 CASES.forEach(function(c){if(wordsOf(c).indexOf(w)>=0||re.test(FIELDS.map(function(f){return plain(c[f]);}).join(" ")))(BACKLINKS[w]=BACKLINKS[w]||[]).push(c.id);});
});
function google(c){return "https://www.google.com/search?q="+encodeURIComponent(c.name.replace(/\s*\(.*\)$/,"")+" "+c.year+" case");}
function kanoon(c){return "https://indiankanoon.org/search/?formInput="+encodeURIComponent(c.name.replace(/\s*\(.*\)$/,""));}

/* Text with [[word]] marks → text nodes and word buttons. */
function rich(parent,text){
 var s=String(text||""),last=0,m;MARK.lastIndex=0;
 while((m=MARK.exec(s))){
  if(m.index>last)parent.appendChild(doc.createTextNode(s.slice(last,m.index)));
  var key=m[1].toLowerCase(),shown=m[2]||m[1];
  if(WORDS[key]){var b=btn(shown,"cb-word",parent,openWord.bind(null,key));b.setAttribute("aria-label",shown+" — meaning");}
  else parent.appendChild(doc.createTextNode(shown));
  last=m.index+m[0].length;
 }
 if(last<s.length)parent.appendChild(doc.createTextNode(s.slice(last)));
 return parent;
}

/* ───── Linker ───── */
function esc(s){return s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");}
var ALIAS=[];CASES.forEach(function(c){[c.name].concat(c.also||[]).forEach(function(a){ALIAS.push({a:a,id:c.id});});});
ALIAS.sort(function(x,y){return y.a.length-x.a.length;});
var ALIAS_KEY={};ALIAS.forEach(function(x){ALIAS_KEY[norm(x.a)]=ALIAS_KEY[norm(x.a)]||x.id;});
function norm(s){return String(s).toLowerCase().replace(/\s+v\.?\s+/g," v ").replace(/[.\s]+/g," ").trim();}
function pattern(a){return esc(a).replace(/\\\.\s*/g,"\\.?\\s*").replace(/\s+v\s+/g,"\\s+v\\.?\\s+").replace(/ /g,"\\s+");}
/* No look-behind, so older phone browsers can run it: group 1 is the character before the name. */
var CASE_RE=new RegExp("(^|[^A-Za-z])("+ALIAS.map(function(x){return pattern(x.a);}).join("|")+")(?![A-Za-z])","g");
var SKIP="button,a,input,textarea,select,option,label,svg,script,style,code,pre,.case-link,.cb-title,.cb-kicker,.tp-q,.tp-options,.tp-match,.mlc-facts,.mlc-ask,.mlc-options,.tl-pool,.tl-slots,[data-no-caselink],[contenteditable]";
function linkify(scope){
 if(!scope)return;
 var walker=doc.createTreeWalker(scope,NodeFilter.SHOW_TEXT,{acceptNode:function(n){
  if(!n.nodeValue||n.nodeValue.length<5)return NodeFilter.FILTER_REJECT;
  var p=n.parentElement;if(!p||p.closest(SKIP))return NodeFilter.FILTER_REJECT;
  CASE_RE.lastIndex=0;return CASE_RE.test(n.nodeValue)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;}});
 var nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
 nodes.forEach(function(n){
  var s=n.nodeValue,frag=doc.createDocumentFragment(),last=0,m;CASE_RE.lastIndex=0;
  while((m=CASE_RE.exec(s))){
   var start=m.index+m[1].length,name=m[2],id=ALIAS_KEY[norm(name)];if(!id)continue;
   if(start>last)frag.appendChild(doc.createTextNode(s.slice(last,start)));
   var b=el("button",name,"case-link",frag);b.type="button";b.setAttribute("data-case",id);b.setAttribute("aria-label",name+" — case summary");
   last=start+name.length;
  }
  if(!last)return;
  if(last<s.length)frag.appendChild(doc.createTextNode(s.slice(last)));
  n.parentNode.replaceChild(frag,n);
 });
}
var pending=0;
function scan(){pending=0;linkify(doc.querySelector("main .main-view.active")||doc.querySelector("main #home-view.active"));}
function schedule(){if(!pending)pending=setTimeout(scan,120);}
var main=doc.querySelector("main");
if(main&&root.MutationObserver)new root.MutationObserver(schedule).observe(main,{childList:true,subtree:true});
doc.addEventListener("click",function(e){
 var b=e.target.closest&&e.target.closest(".case-link");
 if(!b)return;e.preventDefault();openCase(b.getAttribute("data-case"),b);
});

/* ───── Sheet ───── */
var overlay=null,sheet=null,body=null,backBtn=null,history_=[],opener=null;
function ensure(){
 if(overlay)return;
 overlay=el("div",undefined,"cb-overlay",doc.body);overlay.hidden=true;
 overlay.addEventListener("click",function(e){if(e.target===overlay)close();});
 sheet=el("section",undefined,"cb-sheet",overlay);sheet.setAttribute("role","dialog");sheet.setAttribute("aria-modal","true");sheet.setAttribute("aria-label","Case summary");
 var bar=el("div",undefined,"cb-bar",sheet);
 backBtn=btn("‹ Back","cb-back",bar,function(){history_.pop();show();});
 el("span","Case Book","cb-bar-title",bar);
 btn("×","cb-close",bar,close).setAttribute("aria-label","Close");
 body=el("div",undefined,"cb-body",sheet);
 doc.addEventListener("keydown",function(e){if(e.key==="Escape"&&!overlay.hidden)close();});
}
function openCase(id,from){if(!BY_ID[id])return;push({t:"case",k:id},from);}
function openWord(key,from){if(!WORDS[key])return;push({t:"word",k:key},from);}
function push(entry,from){
 ensure();
 if(overlay.hidden){history_=[];opener=from||doc.activeElement;}
 var top=history_[history_.length-1];if(!top||top.t!==entry.t||top.k!==entry.k)history_.push(entry);
 show();
}
function close(){
 if(!overlay||overlay.hidden)return;
 overlay.hidden=true;history_=[];doc.documentElement.classList.remove("cb-open");
 if(opener&&opener.focus&&doc.contains(opener))opener.focus({preventScroll:true});
}
function show(){
 var top=history_[history_.length-1];if(!top){close();return;}
 overlay.hidden=false;doc.documentElement.classList.add("cb-open");
 backBtn.hidden=history_.length<2;
 body.replaceChildren();body.scrollTop=0;
 if(top.t==="case")renderCase(BY_ID[top.k],body);else renderWord(top.k,body);
 linkify(body); /* other cases named inside a summary or tip become links too */
 var h=body.querySelector("h2");if(h){h.tabIndex=-1;h.focus({preventScroll:true});}
}
/* Top-bar Back closes the sheet first. Window capture runs before the screens' own Back handlers. */
root.addEventListener("click",function(e){
 if(overlay&&!overlay.hidden&&e.target.closest&&e.target.closest("#back-home")){e.preventDefault();e.stopImmediatePropagation();close();}
},true);

function section(parent,title,text,cls){var s=el("section",undefined,"cb-part "+(cls||""),parent);el("h3",title,"",s);rich(el("p",undefined,"",s),text);return s;}
function renderCase(c,w){
 el("p",[SUBJECTS[c.subject],c.court,c.year].filter(Boolean).join(" · "),"cb-kicker",w);
 el("h2",c.name,"cb-title",w);
 el("p",c.cite,"cb-cite",w);
 var one=el("div",undefined,"cb-rule",w);el("strong","In one line","",one);rich(el("p",undefined,"",one),c.rule);
 section(w,"Facts",c.facts);
 section(w,"Issue",c.issue);
 section(w,"Held",c.held);
 var ex=el("section",undefined,"cb-exam",w);el("h3","✍ Write this in your exam","",ex);
 rich(el("p",undefined,"",ex),c.exam);
 var copy=btn("Copy","cb-copy",ex,function(){
  var t=plain(c.exam);
  var done=function(){copy.textContent="Copied ✓";setTimeout(function(){copy.textContent="Copy";},1800);};
  try{root.navigator.clipboard.writeText(t).then(done,function(){copy.textContent="Select and copy the text";});}catch(e){copy.textContent="Select and copy the text";}
 });
 if(c.verify)el("p","Check the full judgment for the exact orders before quoting details.","cb-verify",w);
 var ws=wordsOf(c);
 if(ws.length){var kw=el("section",undefined,"cb-part",w);el("h3","Difficult words","",kw);var chips=el("div",undefined,"cb-chips",kw);ws.forEach(function(k){btn(k,"cb-chip",chips,openWord.bind(null,k));});}
 var links=el("div",undefined,"cb-links",w);
 [["Read on Google ↗",google(c)],["Indian Kanoon ↗",kanoon(c)]].forEach(function(x){var a=el("a",x[0],"cb-link",links);a.href=x[1];a.target="_blank";a.rel="noopener noreferrer";});
 /* Related: same subject, sharing the rarer words (common words like 'negligence' count for little). */
 var same=CASES.filter(function(o){return o.subject===c.subject&&o.id!==c.id;}).map(function(o){
  var score=0;ws.forEach(function(k){var l=BACKLINKS[k]||[];if(l.indexOf(o.id)>=0)score+=1/l.length;});return {o:o,score:score};
 }).filter(function(x){return x.score>=0.2;}).sort(function(a,b){return b.score-a.score;}).slice(0,4).map(function(x){return x.o;});
 if(same.length){var rel=el("section",undefined,"cb-part",w);el("h3","Related cases","",rel);same.forEach(function(o){btn(o.name+" ("+o.year+")","cb-row",rel,openCase.bind(null,o.id));});}
}
function renderWord(k,w){
 var d=WORDS[k];
 el("p","Word meaning","cb-kicker",w);
 el("h2",k.charAt(0).toUpperCase()+k.slice(1),"cb-title",w);
 el("p",d.m,"cb-meaning",w);
 if(d.tip){var t=el("div",undefined,"cb-rule",w);el("strong","Exam tip","",t);el("p",d.tip,"",t);}
 var list=(BACKLINKS[k]||[]).map(function(id){return BY_ID[id];});
 var s=el("section",undefined,"cb-part",w);el("h3","Cases that use this word ("+list.length+")","",s);
 list.sort(function(a,b){return a.year-b.year;}).forEach(function(c){var b=btn(undefined,"cb-row",s,openCase.bind(null,c.id));el("strong",c.name,"",b);el("small",c.year+" · "+plain(c.rule),"",b);});
}

/* ───── Case Book screen ───── */
var host=doc.getElementById("cases-view"),state={q:"",subject:"all",tab:"cases"};
function screen(){
 if(!host)return;host.replaceChildren();
 var w=el("div",undefined,"cb-page",host);
 el("p","Tap any case name anywhere in the app to open its summary. Blue words are difficult words — tap them for the meaning.","cb-lead",w);
 var tabs=el("div",undefined,"cb-tabs",w);tabs.setAttribute("role","group");tabs.setAttribute("aria-label","Show");
 [["cases","Cases ("+CASES.length+")"],["words","Word list ("+Object.keys(WORDS).length+")"]].forEach(function(t){var b=btn(t[1],"cb-tab"+(state.tab===t[0]?" is-on":""),tabs,function(){state.tab=t[0];state.q="";screen();});b.setAttribute("aria-pressed",String(state.tab===t[0]));});
 var f=el("form",undefined,"cb-search",w);f.setAttribute("role","search");
 var input=el("input",undefined,"",f);input.type="search";input.value=state.q;input.placeholder=state.tab==="cases"?"Search cases, facts or words…":"Search words…";input.setAttribute("aria-label","Search");
 input.addEventListener("input",function(){state.q=input.value;draw();});
 f.addEventListener("submit",function(e){e.preventDefault();});
 var chips=null;
 if(state.tab==="cases"){
  chips=el("div",undefined,"cb-filter",w);
  ["all"].concat(Object.keys(SUBJECTS)).forEach(function(k){var b=btn(k==="all"?"All":SUBJECTS[k],"tl-chip"+(state.subject===k?" is-on":""),chips,function(){state.subject=k;screen();});b.setAttribute("aria-pressed",String(state.subject===k));});
 }
 var list=el("div",undefined,"cb-list",w),count=el("p",undefined,"cb-count",w);count.setAttribute("role","status");
 w.insertBefore(count,list);
 function draw(){
  list.replaceChildren();var q=state.q.trim().toLowerCase(),n=0;
  if(state.tab==="cases"){
   CASES.filter(function(c){return (state.subject==="all"||c.subject===state.subject)&&(!q||(c.name+" "+(c.also||[]).join(" ")+" "+FIELDS.map(function(x){return plain(c[x]);}).join(" ")).toLowerCase().indexOf(q)>=0);})
    .sort(function(a,b){return a.subject===b.subject?a.year-b.year:Object.keys(SUBJECTS).indexOf(a.subject)-Object.keys(SUBJECTS).indexOf(b.subject);})
    .forEach(function(c){n++;var b=btn(undefined,"cb-row",list,openCase.bind(null,c.id));el("strong",c.name,"",b);el("small",SUBJECTS[c.subject]+" · "+c.year+" — "+plain(c.rule),"",b);});
   count.textContent=n+(n===1?" case":" cases");
  }else{
   Object.keys(WORDS).sort().filter(function(k){return !q||k.indexOf(q)>=0||WORDS[k].m.toLowerCase().indexOf(q)>=0;}).forEach(function(k){n++;var b=btn(undefined,"cb-row",list,openWord.bind(null,k));el("strong",k,"",b);el("small",(BACKLINKS[k]||[]).length+" cases · "+WORDS[k].m,"",b);});
   count.textContent=n+(n===1?" word":" words");
  }
 }
 draw();
}
function fromHash(){var h=location.hash,i=h.indexOf("?");if(i<0)return;var q=new URLSearchParams(h.slice(i+1));if(q.get("c"))openCase(q.get("c"));else if(q.get("w"))openWord(q.get("w"));}
var router=root.LawAppCore&&root.LawAppCore.router;
if(router){
 router.subscribe(function(r){close();if(r==="cases"){screen();fromHash();}schedule();});
 if(router.current()==="cases"){screen();fromHash();}
}
schedule();
root.LawCaseBook={open:openCase,word:openWord,count:CASES.length,linkify:linkify,cases:CASES,words:WORDS};
})(window);

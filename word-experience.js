
(function(){
"use strict";
var host=document.getElementById("words-view");
if(!host||typeof WORDS==="undefined"||!WORDS.length)return;
var s=document.createElement("style");s.textContent="\n#words-view > :not(.word-v19){display:none!important}\n#home-view .home-card:not([data-open=\"words\"]):not([data-open=\"syllabus\"]):not([data-open=\"subject\"]):not([data-open=\"papers\"]){display:none!important}\n#home-view .home-grid{display:block;max-width:640px;margin:auto}\n#home-view .home-card[data-open=\"words\"],#home-view .home-card[data-open=\"syllabus\"],#home-view .home-card[data-open=\"subject\"]{width:100%;margin-bottom:12px}\n.word-v19{max-width:650px;margin:12px auto;padding-bottom:150px}\n.w-search{display:flex;align-items:center;gap:9px;min-height:43px;padding:0 12px;border-radius:13px;border:1px solid var(--line);background:#fff}\n.w-search input{min-width:0;flex:1;border:0;outline:0;background:transparent;font:inherit;font-size:16px;color:var(--text)}\n.w-search button{background:transparent;border:0;font:inherit;font-size:1.2rem;color:var(--muted)}\n.w-results{margin-top:7px;border-radius:12px;background:#fff;border:1px solid var(--line);overflow:hidden}\n.w-results button{display:block;width:100%;padding:13px;text-align:left;border:0;border-bottom:1px solid var(--line);background:#fff;font:inherit}\n.w-results button:last-child{border-bottom:0}\n.w-results p{margin:10px;color:var(--muted)}\n.w-head{display:flex;align-items:center;justify-content:space-between;margin:14px 0;gap:10px}\n.w-head span{font-size:.76rem;color:var(--muted);font-weight:750}\n.w-head button{border:0;background:transparent;color:var(--text);font:inherit;font-size:.83rem;font-weight:750;padding:8px}\n.w-tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px}\n.w-tabs button{padding:12px 5px;border:1px solid var(--line);border-radius:13px;background:#fff;color:var(--text);font:inherit;font-weight:750;font-size:.9rem}\n.w-tabs button.active{background:var(--text);color:white}\n.w-card{background:#fff;border:1px solid var(--line);border-radius:21px;padding:clamp(16px,4vw,23px);min-height:255px}\n.w-card[hidden],.w-results[hidden],.w-review[hidden]{display:none!important}\n.w-eyebrow{font-size:.74rem;font-weight:800;color:var(--muted);margin:0 0 16px}\n.w-term{font:500 clamp(1.85rem,8vw,3.2rem)/1.15 Georgia,serif;overflow-wrap:anywhere;margin:0 0 17px}\n.w-p{font-size:.99rem;line-height:1.6;margin:0 0 14px}\n.w-small{font-size:.84rem;line-height:1.55;color:var(--muted);margin:0 0 12px}\n.w-label{margin:17px 0 6px;font-weight:800;font-size:.73rem;text-transform:uppercase;color:var(--muted)}\n.w-options{display:grid;gap:9px}\n.w-option{width:100%;display:block;background:#f8f9fb;color:var(--text);border:1px solid var(--line);border-radius:12px;padding:12px;text-align:left;font:inherit;font-size:.91rem;line-height:1.5}\n.w-option.right{background:#e6f5ec;border-color:#298153}\n.w-option.wrong{background:#fff0ef;border-color:#bd514e}\n.w-input{display:block;width:100%;min-width:0;border:1px solid var(--line);border-radius:12px;padding:12px;font:inherit;font-size:16px}\n.w-btn{background:var(--text);color:white;border:0;border-radius:12px;padding:11px 14px;font:inherit;font-weight:750;margin-top:11px}\n.w-feedback{font-size:.87rem;font-weight:750;margin:14px 0 0;line-height:1.45}\n.w-news{display:block;color:#2259a3;text-decoration:underline;font-size:.88rem;font-weight:750;line-height:1.5;margin-top:13px}\n.w-compare{margin:9px 0;border:1px solid var(--line);border-radius:13px;padding:13px;background:#f9fafb}\n.w-compare strong{font-size:.94rem}\n.w-compare p{margin:6px 0 0;font-size:.87rem;line-height:1.55}\n.w-nav{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:13px}\n.w-nav button{min-height:44px;border:1px solid var(--line);border-radius:12px;background:#fff;font:inherit;font-weight:750}\n.w-nav button:last-child{background:var(--text);color:white}\n.w-nav button:disabled{opacity:.35}\n.w-dots{display:flex;gap:4px;margin-bottom:13px}\n.w-dots span{height:4px;flex:1;background:var(--line);border-radius:3px}\n.w-dots span.done{background:var(--text)}\n.w-bottom{position:fixed;bottom:calc(8px + env(safe-area-inset-bottom));left:50%;transform:translateX(-50%);z-index:24;width:min(calc(100% - 20px),650px);padding:10px;border:1px solid var(--line);border-radius:18px;background:rgba(255,255,255,.97);box-shadow:0 10px 35px rgba(13,19,33,.13);backdrop-filter:blur(10px)}\n.w-bottomtop{display:flex;align-items:center;justify-content:space-between;margin:1px 3px 8px;font-size:.76rem;font-weight:750;color:var(--muted)}\n.w-bottomtop button{border:0;background:transparent;color:var(--text);font:inherit;font-size:.79rem;font-weight:750}\n.w-bottomactions{display:grid;grid-template-columns:1fr 1fr;gap:9px}\n.w-bottomactions button{min-height:43px;border-radius:12px;border:1px solid var(--text);font:inherit;font-size:.9rem;font-weight:750}\n.w-bottomactions button:first-child{background:var(--text);color:#fff}\n.w-bottomactions button:last-child{background:white;color:var(--text)}\n.w-review{border:1px solid var(--line);border-radius:12px;background:#fff;margin:13px 0;padding:13px}\n.w-review button{border:1px solid var(--line);border-radius:9px;padding:8px;margin:4px;background:#f8f9fb;font:inherit}\n@media(prefers-reduced-motion:no-preference){@keyframes inCard{from{opacity:0;transform:translateY(14px) scale(.986)}to{opacity:1;transform:translateY(0) scale(1)}}.w-card.motion{animation:inCard .3s ease both}}\n";document.head.appendChild(s);
host.insertAdjacentHTML("afterbegin",
'<div class="word-v19"><div class="w-search"><span aria-hidden="true">⌕</span><input id="w-search" type="search" placeholder="Search legal words…" aria-label="Search legal words" autocomplete="off"><button id="w-clear" type="button" aria-label="Clear search" hidden>×</button></div><div class="w-results" id="w-results" hidden></div>'+
'<div class="w-head"><span id="w-position"></span><button id="w-next-word" type="button">Next word →</button></div>'+
'<div class="w-tabs"><button data-wtab="game" class="active">Game</button><button data-wtab="learn">Learn</button><button data-wtab="compare">Compare</button></div>'+
'<div id="w-game"><div class="w-scrubber"><input id="w-scrub" type="range" min="1" max="10" value="1" step="1" aria-label="Move to a lesson card"><output id="w-scrub-label" for="w-scrub">1 / 10</output></div><div id="w-dots" class="w-dots" hidden></div><article id="w-deck" class="w-card"></article><div class="w-nav"><button id="w-back">← Previous</button><button id="w-forward">Next card →</button></div></div>'+
'<article id="w-learn" class="w-card" hidden></article><article id="w-compare" class="w-card" hidden></article>'+
'<div id="w-review" class="w-review" hidden></div>'+
'<div class="w-bottom"><div class="w-bottomtop"><span id="w-stats"></span><button id="w-revision">Revision (0)</button></div><div class="w-bottomactions"><button id="w-got">Got it</button><button id="w-revise">Revise later</button></div></div></div>');
var $=function(id){return document.getElementById(id)};
var index=typeof state!=="undefined"&&Number.isInteger(state.currentWord)&&state.currentWord>=0&&state.currentWord<WORDS.length?state.currentWord:0;
var tab="game",cardIndex=0,answers={},points={};
var stages=["The word","In the news","Spell it","Find the meaning","Simple explanation","True or false","Spot the distinction","In a sentence","Remember the term","Explain it"];
var clusters=[
["Appeal","Review","Review petition","Revision","Petition","Writ jurisdiction"],
["Bail","Anticipatory bail","Default bail","Interim bail","Acquittal","Parole","Presumption of innocence","Benefit of doubt"],
["Affidavit","Testimony","Evidence","Primary evidence","Secondary evidence","Deposition"],
["Plaintiff","Defendant","Petitioner","Respondent","Appellant","Accused"],
["Murder","Culpable homicide","Negligent act","Rash act","Attempt"],
["Robbery","Dacoity","Theft","Extortion","Snatching"],
["Kidnapping","Abduction","Wrongful restraint","Wrongful confinement","False imprisonment"],
["Void marriage","Voidable marriage","Divorce","Judicial separation"],
["Lease","Mortgage","Sale","Gift","Transfer of property"],
["Will","Probate","Testamentary succession","Intestate succession"],
["Injunction","Stay order","Declaratory relief","Damages","Specific performance"],
["Actus reus","Mens rea","Common intention","Common object","Criminal conspiracy","Abetment","Instigation"],
["Habeas corpus","Mandamus","Certiorari","Prohibition","Quo warranto"],
["Ratio decidendi","Obiter dicta","Stare decisis","Precedent"],
["Burden of proof","Presumption of innocence","Benefit of doubt","Corroboration"],
["Indemnity","Guarantee","Surety","Principal debtor","Bailment","Pledge"],
["Arbitrariness","Reasonable classification","Equality before law","Reservation"],
["Legal right","Legal duty","Possession","Ownership","Title"],
["Nuisance","Trespass","Defamation","Duty of care","Breach of duty"],
["Set-off","Counterclaim","Written statement","Cause of action"]
];
var article={
"Bail":["Sigachi CEO gets bail from Indian court in factory-fire case (2026)","A real example of bail while a case is pending.","https://www.reuters.com/world/india/sigachi-ceo-gets-bail-india-court-fatal-factory-fire-case-2026-02-04/"],
"Petition":["Supreme Court rejects Vodafone Idea's petition (2025)","A company sought judicial relief through a petition.","https://www.reuters.com/world/india/india-top-court-rejects-vodafone-ideas-petition-india-waive-telecom-dues-2025-05-19/"],
"Petitioner":["Supreme Court rejects Vodafone Idea's petition (2025)","The petitioner approached the court seeking relief.","https://www.reuters.com/world/india/india-top-court-rejects-vodafone-ideas-petition-india-waive-telecom-dues-2025-05-19/"],
"Review petition":["Supreme Court pauses liquidation while review is sought (2025)","A review petition was planned against an earlier ruling.","https://www.reuters.com/world/india/indias-top-court-orders-status-quo-liquidation-proceedings-bhushan-power-2025-05-26/"],
"Review":["Supreme Court pauses liquidation while review is sought (2025)","Review asks the court to revisit an earlier decision.","https://www.reuters.com/world/india/indias-top-court-orders-status-quo-liquidation-proceedings-bhushan-power-2025-05-26/"],
"Injunction":["US bill raised questions about enforcing injunctions (2025)","The reporting explains judicial injunctions and enforcement.","https://www.reuters.com/world/us/trumps-sweeping-tax-cut-bill-includes-provision-weaken-court-powers-2025-05-30/"],
"Reservation":["Supreme Court permits SC/ST reservation sub-classification (2024)","A landmark ruling on reservations and equality.","https://indianexpress.com/article/explained/explained-law/explained-sub-classification-of-sc-st-9489996/lite/"],
"Benefit of doubt":["Court acquits accused after prosecution failed to prove charges (2026)","A reported case illustrating how the benefit of reasonable doubt affects acquittal.","https://indianexpress.com/article/legal-news/allahabad-high-court-84-year-old-pocso-case-benefit-of-doubt-10798601/"],
"Acquittal":["Court acquits accused after prosecution failed to prove charges (2026)","An acquittal after examining whether the criminal charge was proven.","https://indianexpress.com/article/legal-news/allahabad-high-court-84-year-old-pocso-case-benefit-of-doubt-10798601/"]
};
var lookup=new Map(WORDS.map(function(w,i){return[w.term.toLowerCase(),i]}));
function w(){return WORDS[index];}
function lower(v){return String(v||"").trim().toLowerCase();}
function el(tag,cls,content){var n=document.createElement(tag);if(cls)n.className=cls;if(content!==undefined)n.textContent=content;return n;}
function put(box,tag,cls,text){var n=el(tag,cls,text);box.appendChild(n);return n;}
function btn(box,text,callback,cls){var b=put(box,"button",cls||"w-btn",text);b.type="button";b.addEventListener("click",callback);return b;}
function title(box,text){put(box,"h2","w-term",text);}
function p(box,text){put(box,"p","w-p",text);}
function small(box,text){put(box,"p","w-small",text);}
function section(box,label,content){put(box,"p","w-label",label);p(box,content);}
function shuffle(list){var a=list.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
function related(){
 var arr=[];clusters.forEach(function(group){if(group.some(function(x){return lower(x)===lower(w().term);}) )group.forEach(function(x){var id=lookup.get(lower(x));if(id!==undefined&&id!==index&&!arr.includes(id))arr.push(id);});});
 var real=lookup.get(lower(w().compareTerm));if(real!==undefined&&real!==index&&!arr.includes(real))arr.unshift(real);
 if(arr.length<5){
 var terms=String(w().definition||"").toLowerCase().split(/[^a-z]+/).filter(function(x){return x.length>4;});
 var peers=WORDS.map(function(x,i){return {i:i,score:terms.filter(function(t){return x.definition.toLowerCase().includes(t);}).length};})
 .filter(function(o){return o.i!==index&&(WORDS[o.i].category||"Foundation")===(w().category||"Foundation")&&!arr.includes(o.i);})
 .sort(function(a,b){return b.score-a.score||a.i-b.i;});
 peers.slice(0,5-arr.length).forEach(function(x){arr.push(x.i);});
 }return arr.slice(0,5);
}
function news(){
 var found=article[w().term];if(found)return found;
 return ["Find real reporting mentioning “"+w().term+"”","No individually verified news story is available for this term yet. Open the news search to explore published reports.","https://news.google.com/search?q="+encodeURIComponent('"'+w().term+'" law court')];
}
function newsView(box){
 var n=news();small(box,n[1]);var a=put(box,"a","w-news",n[0]+" ↗");a.href=n[2];a.target="_blank";a.rel="noopener noreferrer";
}
function noteFeedback(box,good,text){
 var x=put(box,"p","w-feedback",(good?"Correct. ":"Try again next time. ")+text);x.style.color=good?"#18643e":"#9e453f";
}
function award(){
 var key=index+"-"+cardIndex;if(points[key])return;points[key]=true;
 if(typeof state!=="undefined"){state.score+=5;state.streak++;if(typeof saveProgress==="function")saveProgress();if(typeof renderStats==="function")renderStats();}
}
function options(box,right,wrong){
 var outer=put(box,"div","w-options"),choices=shuffle([right].concat(wrong.slice(0,3)));
 choices.forEach(function(value){
 var button=btn(outer,value,function(){
 var key=index+"-"+cardIndex;if(answers[key])return;answers[key]=true;
 Array.from(outer.querySelectorAll("button")).forEach(function(b){b.disabled=true;if(b.textContent===right)b.classList.add("right");});
 var correct=value===right;if(!correct)button.classList.add("wrong");noteFeedback(outer,correct,correct?"Good recall.":"The correct response is highlighted.");
 if(correct)award();
 },"w-option");
 });
}
function wrongWords(){
 var items=related().map(function(i){return WORDS[i]});var other=WORDS.filter(function(x){return x!==w()&&!items.includes(x)&&(x.category||"Foundation")===(w().category||"Foundation")});
 return items.concat(other).slice(0,3);
}
function spelling(word){
 var characters=Array.from(word),positions=[];characters.forEach(function(c,i){if(/[A-Za-z]/.test(c))positions.push(i);});
 var missing=positions.filter(function(_,j){return j%3===1});if(!missing.length&&positions.length)missing=[positions[0]];
 return {masked:characters.map(function(c,i){return missing.includes(i)?"＿":c;}).join(""),answer:missing.map(function(i){return characters[i];}).join("")};
}
function yesno(box,statement,truth,explain){
 title(box,statement);var out=put(box,"div","w-options");
 ["True","False"].forEach(function(answer){
 var b=btn(out,answer,function(){
 var key=index+"-"+cardIndex;if(answers[key])return;answers[key]=true;
 var good=(answer==="True")===truth;
 Array.from(out.children).forEach(function(item){item.disabled=true;if((item.textContent==="True")===truth)item.classList.add("right");});
 if(!good)b.classList.add("wrong");noteFeedback(out,good,explain);if(good)award();
 },"w-option");
 });
}
function renderDeck(){
 var box=$("w-deck");box.replaceChildren();put(box,"p","w-eyebrow",(cardIndex+1)+" / 10 · "+stages[cardIndex]);var word=w(),rel=related(),near=rel.length?WORDS[rel[0]]:null;
 if(cardIndex===0){title(box,word.term);}
 if(cardIndex===1){title(box,"A real-world example");newsView(box);}
 if(cardIndex===2){
 var spell=spelling(word.term);title(box,spell.masked);small(box,"Fill the missing letters in order.");p(box,word.definition);
 var form=put(box,"form"),input=put(form,"input","w-input");input.placeholder="Missing letters";input.autocomplete="off";input.spellcheck=false;
 var b=btn(form,"Check spelling",function(){});b.type="submit";
 form.addEventListener("submit",function(e){e.preventDefault();var key=index+"-"+cardIndex;if(answers[key])return;answers[key]=true;
 var good=lower(input.value).replace(/\s/g,"")===lower(spell.answer);
 noteFeedback(box,good,good?"Correct spelling.":"Missing letters: "+spell.answer+". Full term: "+word.term+".");
 input.disabled=true;b.disabled=true;if(good)award();});
 }
 if(cardIndex===3){title(box,word.term);small(box,"Select the correct legal meaning.");options(box,word.definition,wrongWords().map(function(x){return x.definition;}));}
 if(cardIndex===4){
 title(box,"In simple words");
 var simple=word.daily&&!word.daily.startsWith("Use "+word.term+" only")?word.daily:
 (word.memory&&!word.memory.startsWith(word.term+" —")?word.memory:word.definition);
 p(box,simple);section(box,"Remember",word.memory||word.definition);
 }
 if(cardIndex===5){
 small(box,"True or false?");var truth=index%2===0||!near;
 yesno(box,'“'+word.term+'” means: '+(truth?word.definition:near.definition),truth,
 truth?word.definition:"This describes "+near.term+", not "+word.term+".");
 }
 if(cardIndex===6){
 title(box,"Which term fits?");var target=near||word;p(box,target.definition);
 var distract=[word].concat(rel.slice(1).map(function(i){return WORDS[i]})).filter(function(x){return x!==target;});
 distract=distract.concat(WORDS.filter(function(x){return x!==target&&!distract.includes(x)})).slice(0,3);
 options(box,target.term,distract.map(function(x){return x.term;}));
 }
 if(cardIndex===7){
 title(box,"Use it in a sentence");
 var example=(word.examples||[]).find(function(x){return lower(x).includes(lower(word.term));});
 var pos=example?lower(example).indexOf(lower(word.term)):-1;
 var context=pos>=0?example.slice(0,pos)+"_____"+example.slice(pos+word.term.length):"Choose the legal term for this situation: "+word.definition;
 p(box,context);small(box,"Select the missing legal term.");options(box,word.term,wrongWords().map(function(x){return x.term;}));
 }
 if(cardIndex===8){
 title(box,"Remember the term");p(box,word.definition);
 var text=put(box,"input","w-input");text.placeholder="Type the legal term";text.autocomplete="off";text.spellcheck=false;
 var check=btn(box,"Check",function(){
 var key=index+"-"+cardIndex;if(answers[key])return;answers[key]=true;
 var good=lower(text.value)===lower(word.term);noteFeedback(box,good,good?"You remembered it.":"Answer: "+word.term);text.disabled=true;check.disabled=true;if(good)award();
 });
 }
 if(cardIndex===9){
 title(box,"Explain it yourself");small(box,"Write one sentence: what does this term mean, and when should it be used?");
 var area=put(box,"textarea","w-input");area.rows=3;area.placeholder="Write your explanation…";
 btn(box,"Reveal key points",function(){
 if(box.querySelector(".key-points"))return;var sec=put(box,"div","key-points");section(sec,"Legal meaning",word.definition);
 if(word.compareTerm&&!["Examiner expects","Answer use"].includes(word.compareTerm)&&word.compareRule)section(sec,"Avoid confusion",word.compareRule);
 });
 }
 box.classList.remove("motion");void box.offsetWidth;box.classList.add("motion");update();
}
function renderLearn(){
 var box=$("w-learn"),x=w();box.replaceChildren();put(box,"p","w-eyebrow","Learn · detailed notes");title(box,x.term);
 section(box,"Legal definition",x.definition);
 var plain=x.daily&&!x.daily.startsWith("Use "+x.term+" only")?x.daily:x.memory;
 section(box,"In simple words",plain||x.definition);
 section(box,"When it is used",(x.examples&&x.examples[0])||x.deep||"Use it where the legal facts meet its definition.");
 if(x.deep)section(box,"Understand it",x.deep);
 if(x.compareTerm&&!["Examiner expects","Answer use"].includes(x.compareTerm))section(box,"Often confused with",x.compareTerm+" — "+(x.compareOther||"See Compare."));
 if(x.compareRule)section(box,"Exam reminder",x.compareRule);
 put(box,"p","w-label","News in context");newsView(box);
 box.classList.remove("motion");void box.offsetWidth;box.classList.add("motion");
}
function renderCompare(){
 var box=$("w-compare"),x=w();box.replaceChildren();put(box,"p","w-eyebrow","Compare related concepts");title(box,x.term);p(box,x.definition);
 var peers=related();if(!peers.length){small(box,"No related terms available.");return;}
 var known=clusters.some(function(g){return g.includes(x.term);});
 small(box,known?"Commonly confused legal concepts:":"Related subject terms; compare their distinct definitions.");
 peers.forEach(function(i){var other=WORDS[i],item=put(box,"div","w-compare");put(item,"strong",null,other.term);p(item,other.definition);
 if(lower(other.term)===lower(x.compareTerm)&&x.compareRule)small(item,"Key distinction: "+x.compareRule);});
 box.classList.remove("motion");void box.offsetWidth;box.classList.add("motion");
}
function update(){
 $("w-position").textContent="Word "+(index+1)+" / "+WORDS.length;
 var scrub=$("w-scrub");scrub.value=String(cardIndex+1);scrub.style.setProperty("--fill",((cardIndex/9)*100)+"%");$("w-scrub-label").textContent=(cardIndex+1)+" / 10";
 $("w-back").disabled=cardIndex===0;$("w-forward").textContent=cardIndex===9?"Next word →":"Next card →";
 if(typeof state!=="undefined"){$("w-stats").textContent=state.learned.size+" learned";$("w-revision").textContent="Revision ("+state.difficult.size+")";}
}
function switchTab(name){tab=name;document.querySelectorAll("#words-view [data-wtab]").forEach(function(b){b.classList.toggle("active",b.dataset.wtab===name);});
 ["game","learn","compare"].forEach(function(t){$("w-"+t).hidden=t!==name;});
 if(name==="game")renderDeck();if(name==="learn")renderLearn();if(name==="compare")renderCompare();update();
}
function hideSearch(){$("w-results").hidden=true;$("w-results").replaceChildren();}
function choose(i,name){
 if(i<0||i>=WORDS.length)return;index=i;cardIndex=0;answers={};points={};
 if(typeof state!=="undefined"){state.currentWord=i;if(typeof saveProgress==="function")saveProgress();}
 $("w-search").value="";$("w-clear").hidden=true;hideSearch();switchTab(name||tab);
}
function nextWord(){choose((index+1)%WORDS.length);}
function search(){
 var q=lower($("w-search").value);$("w-clear").hidden=!q;if(!q){hideSearch();return;}
 var list=WORDS.map(function(x,i){return {x:x,i:i}}).filter(function(t){return lower(t.x.term).includes(q);})
 .sort(function(a,b){return Number(lower(b.x.term).startsWith(q))-Number(lower(a.x.term).startsWith(q))||a.x.term.localeCompare(b.x.term);}).slice(0,10);
 var out=$("w-results");out.replaceChildren();if(!list.length)put(out,"p",null,"No matches.");
 list.forEach(function(t){btn(out,t.x.term,function(){choose(t.i,"learn");},"w-suggestion");});out.hidden=false;
}
function mark(review){
 if(typeof state!=="undefined"){
 if(review){state.difficult.add(index);state.learned.delete(index);state.streak=0;}
 else {if(!state.learned.has(index))state.score+=10;state.learned.add(index);state.difficult.delete(index);state.streak++;}
 if(typeof saveProgress==="function")saveProgress();if(typeof renderStats==="function")renderStats();
 }nextWord();
}
document.querySelectorAll("#words-view [data-wtab]").forEach(function(b){b.addEventListener("click",function(){switchTab(b.dataset.wtab);});});
$("w-back").addEventListener("click",function(){if(cardIndex>0){cardIndex--;renderDeck();}});
$("w-forward").addEventListener("click",function(){if(cardIndex<9){cardIndex++;renderDeck();}else nextWord();});
$("w-next-word").addEventListener("click",nextWord);
$("w-search").addEventListener("input",search);
$("w-search").addEventListener("keydown",function(e){if(e.key==="Escape"){hideSearch();this.blur();}if(e.key==="Enter"){var first=$("w-results").querySelector("button");if(first){e.preventDefault();first.click();}}});
$("w-clear").addEventListener("click",function(){$("w-search").value="";hideSearch();this.hidden=true;$("w-search").focus();});
$("w-got").addEventListener("click",function(){mark(false);});
$("w-revise").addEventListener("click",function(){mark(true);});
$("w-revision").addEventListener("click",function(){
 var box=$("w-review");box.hidden=!box.hidden;if(box.hidden)return;box.replaceChildren();put(box,"p","w-eyebrow","Your revision words");
 if(typeof state==="undefined"||!state.difficult.size){small(box,"Nothing marked for revision.");return;}
 Array.from(state.difficult).filter(function(i){return i>=0&&i<WORDS.length;}).forEach(function(i){
 btn(box,WORDS[i].term,function(){box.hidden=true;choose(i,"learn");},"w-review-btn");
 });
});

var gestureStyle=document.createElement("style");gestureStyle.textContent="\n.w-head{display:none!important}\n.w-dots{display:none!important}\n.w-scrubber{display:flex;align-items:center;gap:15px;padding:4px 4px 12px}\n.w-scrubber input{appearance:none;-webkit-appearance:none;min-width:0;flex:1;height:7px;border:0;border-radius:999px;background:linear-gradient(90deg,#0d1321 var(--fill,0%),#d7dbe1 var(--fill,0%));cursor:pointer;touch-action:none}\n.w-scrubber input::-webkit-slider-thumb{appearance:none;-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:#0d1321;border:3px solid #fff;box-shadow:0 1px 6px rgba(13,19,33,.27)}\n.w-scrubber input::-moz-range-thumb{width:14px;height:14px;border-radius:50%;background:#0d1321;border:3px solid #fff;box-shadow:0 1px 6px rgba(13,19,33,.27)}\n.w-scrubber output{white-space:nowrap;min-width:48px;text-align:right;font-size:.76rem;font-weight:800;color:var(--muted)}\n.w-card{will-change:transform,opacity}\n@media (prefers-reduced-motion:no-preference){.w-card.motion{animation:none!important}}\n";document.head.appendChild(gestureStyle);
var swipeStyle=document.createElement("style");
swipeStyle.textContent='#home-view .home-card:not([data-open="words"]):not([data-open="syllabus"]):not([data-open="subject"]):not([data-open="papers"]){display:none!important}#home-view .home-card[data-open="papers"]{display:block!important;width:100%;margin-bottom:12px}#w-next-word,#w-game .w-nav{display:none!important}.w-head::after{content:"Swipe left or right";font-size:.8rem;font-weight:700;color:var(--muted)}#w-deck,#w-learn,#w-compare{touch-action:pan-y}';
document.head.appendChild(swipeStyle);
function swipeInteractive(el){return !!(el&&el.closest('input,textarea,select,button,a,[contenteditable="true"]'));}
var swipeChanging=false;
function changeWithMotion(direction,action){
 if(swipeChanging)return;
 var element=tab==="game"?$("w-deck"):tab==="learn"?$("w-learn"):$("w-compare");
 var less=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 if(!element||!element.animate||less){action();return;}
 swipeChanging=true;
 var dx=direction<0?-100:100;
 var outgoing=element.animate([
  {transform:"translateX(0) rotate(0deg)",opacity:1},
  {transform:"translateX("+dx+"px) rotate("+(direction<0?-2:2)+"deg)",opacity:0}
 ],{duration:175,easing:"cubic-bezier(.5,0,.95,.3)",fill:"forwards"});
 outgoing.onfinish=function(){
  outgoing.cancel();action();
  var incoming=tab==="game"?$("w-deck"):tab==="learn"?$("w-learn"):$("w-compare");
  var animation=incoming.animate([
   {transform:"translateX("+(-dx)+"px) rotate("+(direction<0?2:-2)+"deg)",opacity:0},
   {transform:"translateX(0) rotate(0deg)",opacity:1}
  ],{duration:250,easing:"cubic-bezier(.12,.8,.24,1)",fill:"both"});
  animation.onfinish=function(){animation.cancel();swipeChanging=false;};
  animation.oncancel=function(){swipeChanging=false;};
 };
 outgoing.oncancel=function(){swipeChanging=false;};
}
function moveBySwipe(direction){
 changeWithMotion(direction,function(){
  if(tab==="game"){
   if(direction<0){if(cardIndex<9){cardIndex++;renderDeck();}else nextWord();}
   else if(cardIndex>0){cardIndex--;renderDeck();}
   else {choose((index-1+WORDS.length)%WORDS.length,"game");cardIndex=9;renderDeck();}
  }else choose((index+(direction<0?1:-1)+WORDS.length)%WORDS.length);
 });
}
$("w-scrub").addEventListener("input",function(){
 var next=Number(this.value);$("w-scrub-label").textContent=next+" / 10";
 this.style.setProperty("--fill",((next-1)/9*100)+"%");
});
$("w-scrub").addEventListener("change",function(){
 var target=Number(this.value)-1,old=cardIndex;
 if(target===old)return;
 changeWithMotion(target>old?-1:1,function(){cardIndex=target;renderDeck();});
});
["w-deck","w-learn","w-compare"].forEach(function(id){
 var surface=$(id),start=null;
 surface.addEventListener("touchstart",function(e){
  if(e.touches.length!==1||swipeInteractive(e.target)){start=null;return;}
  start={x:e.touches[0].clientX,y:e.touches[0].clientY,t:Date.now()};
 },{passive:true});
 surface.addEventListener("touchend",function(e){
  if(!start||!e.changedTouches.length)return;
  var dx=e.changedTouches[0].clientX-start.x,dy=e.changedTouches[0].clientY-start.y,age=Date.now()-start.t;start=null;
  if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.45&&age<1200)moveBySwipe(dx);
 },{passive:true});
 surface.addEventListener("touchcancel",function(){start=null;},{passive:true});
});
document.addEventListener("keydown",function(e){
 if(location.hash!=="#words"||swipeInteractive(e.target))return;
 if(e.key==="ArrowRight")moveBySwipe(-1);
 if(e.key==="ArrowLeft")moveBySwipe(1);
});
/* Wide swipe zone: covers card body, answer options, and whitespace; excludes
   the search field, slider, bottom revision controls and tappable links. */
var swipeSurface=document.querySelector("#words-view .word-v19"),wideStart=null;
function blockedGestureTarget(target){
 return !!target.closest(".w-search,.w-tabs,.w-bottom,.w-scrubber,.cmp-page,input,textarea,select,a,[contenteditable='true']");
}
swipeSurface.addEventListener("touchstart",function(event){
 if(event.touches.length!==1||blockedGestureTarget(event.target)){wideStart=null;return;}
 var t=event.touches[0];
 wideStart={x:t.clientX,y:t.clientY,time:Date.now(),horizontal:false};
},{capture:true,passive:true});
swipeSurface.addEventListener("touchmove",function(event){
 if(!wideStart||event.touches.length!==1)return;
 var point=event.touches[0],dx=point.clientX-wideStart.x,dy=point.clientY-wideStart.y;
 if(Math.abs(dx)>20&&Math.abs(dx)>Math.abs(dy)*1.25){
  wideStart.horizontal=true;if(event.cancelable)event.preventDefault();
 }
},{capture:true,passive:false});
swipeSurface.addEventListener("touchend",function(event){
 if(!wideStart||!event.changedTouches.length)return;
 var point=event.changedTouches[0],dx=point.clientX-wideStart.x,dy=point.clientY-wideStart.y;
 var good=Math.abs(dx)>=48&&Math.abs(dx)>Math.abs(dy)*1.3&&Date.now()-wideStart.time<1400;
 wideStart=null;
 if(!good)return;
 if(event.cancelable)event.preventDefault();
 event.stopPropagation();
 moveBySwipe(dx<0?-1:1);
},{capture:true,passive:false});
swipeSurface.addEventListener("touchcancel",function(){wideStart=null;},{capture:true,passive:true});
window.openLawWord=function(term,requestedTab){
 var i=WORDS.findIndex(function(x){return x.term.toLowerCase()===String(term).trim().toLowerCase();});
 if(i<0)return false;
 location.hash="words";choose(i,requestedTab||"game");window.scrollTo({top:0,behavior:"smooth"});return true;
};
choose(index,"game");
})();
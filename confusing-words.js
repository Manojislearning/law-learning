/* Confusing Words v66 — a fill-the-blank game inside Games for pairs people mix up.
   Data: confusing-words-data.js. Missed questions come back sooner; correct answers earn points once each. */
(function(root){
"use strict";
var doc=root.document,DATA=root.CONFUSING_WORDS;
var app=doc.querySelector("#words-view .word-v19"),chooser=doc.getElementById("w-chooser");
if(!app||!chooser||!Array.isArray(DATA)||!DATA.length)return;
var KEY="law-learning-confusing-v1",ROUND=10;

function el(tag,text,cls,parent){var n=doc.createElement(tag);if(cls)n.className=cls;if(text!==undefined&&text!==null)n.textContent=String(text);if(parent)parent.appendChild(n);return n;}
function btn(text,cls,parent,fn){var b=el("button",text,cls,parent);b.type="button";if(fn)b.addEventListener("click",fn);return b;}
function load(){try{var v=JSON.parse(root.localStorage.getItem(KEY)||"{}");return {missed:v&&typeof v.missed==="object"&&v.missed?v.missed:{},best:Number(v&&v.best)||0,played:Number(v&&v.played)||0};}catch(e){return {missed:{},best:0,played:0};}}
function save(){try{root.localStorage.setItem(KEY,JSON.stringify(store));}catch(e){}}
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
var store=load();

/* All questions, flattened. */
var ALL=[];DATA.forEach(function(set){set.q.forEach(function(q,i){ALL.push({id:set.id+":"+i,set:set,text:q[0],answer:q[1]});});});
var GROUPS={all:"All pairs",law:"Law terms",writing:"Legal writing"};
var view={group:"all",round:[],pos:0,right:0,streak:0,bestStreak:0,wrongIds:[]};

/* Entry button in the Games chooser. */
var entry=el("button",undefined,"w-level",chooser);entry.type="button";entry.setAttribute("data-confuse","1");
el("strong","Confusing Words",undefined,entry);el("span","→",undefined,entry).setAttribute("aria-hidden","true");

var rootEl=el("section",undefined,"cw");rootEl.hidden=true;rootEl.setAttribute("aria-label","Confusing Words game");
app.insertBefore(rootEl,chooser.nextSibling);

function pool(){return ALL.filter(function(q){return view.group==="all"||q.set.group===view.group;});}
function pickRound(){
 var p=pool(),missed=shuffle(p.filter(function(q){return store.missed[q.id];})),fresh=shuffle(p.filter(function(q){return !store.missed[q.id];}));
 var picked=missed.slice(0,Math.ceil(ROUND/2)),used={};picked.forEach(function(q){used[q.set.id]=1;});
 /* Prefer one question per pair so a round covers many pairs. */
 fresh.forEach(function(q){if(picked.length<ROUND&&!used[q.set.id]){picked.push(q);used[q.set.id]=1;}});
 fresh.forEach(function(q){if(picked.length<ROUND&&picked.indexOf(q)<0)picked.push(q);});
 return shuffle(picked).slice(0,ROUND);
}

function open(){chooser.hidden=true;rootEl.hidden=false;home();}
function close(){rootEl.hidden=true;chooser.hidden=false;}
entry.addEventListener("click",open);
doc.addEventListener("click",function(e){
 if(!e.target.closest("#back-home")||location.hash!=="#words"||rootEl.hidden)return;
 e.preventDefault();e.stopImmediatePropagation();close();
},true);
if(root.LawAppCore&&root.LawAppCore.router)root.LawAppCore.router.subscribe(function(r){if(r!=="words")close();});

function top(title){
 rootEl.replaceChildren();
 btn("← Games","w-change-level",rootEl,close);
 if(title)el("h2",title,"cw-title",rootEl);
}

function home(){
 top("Confusing Words");
 el("p","Words that sound alike or look alike but mean different things in law. Pick the right word for each sentence.","cw-lead",rootEl);
 var chips=el("div",undefined,"cw-chips",rootEl);chips.setAttribute("role","group");chips.setAttribute("aria-label","Choose pairs");
 Object.keys(GROUPS).forEach(function(g){
  var n=g==="all"?DATA.length:DATA.filter(function(s){return s.group===g;}).length;
  var b=btn(GROUPS[g]+" · "+n,"cw-chip"+(view.group===g?" is-on":""),chips,function(){view.group=g;home();});
  b.setAttribute("aria-pressed",view.group===g?"true":"false");
 });
 var stats=el("div",undefined,"cw-stats",rootEl);
 var missedCount=Object.keys(store.missed).filter(function(id){return pool().some(function(q){return q.id===id;});}).length;
 [[store.best+"/"+ROUND,"Best round"],[store.played,"Rounds played"],[missedCount,"To revisit"]].forEach(function(s){var c=el("div",undefined,"cw-stat",stats);el("strong",s[0],"",c);el("span",s[1],"",c);});
 btn("Play "+ROUND+" questions","cw-primary",rootEl,start);
 el("p",missedCount?"Words you missed come back first.":"Each correct answer earns 3 points the first time.","cw-note",rootEl);
 var browse=el("details",undefined,"cw-browse",rootEl);
 el("summary","Study all "+DATA.filter(function(s){return view.group==="all"||s.group===view.group;}).length+" pairs",undefined,browse);
 DATA.filter(function(s){return view.group==="all"||s.group===view.group;}).forEach(function(s){pairCard(browse,s,null);});
}

function pairCard(parent,set,highlight){
 var c=el("article",undefined,"cw-pair",parent);
 el("p",set.subject,"cw-subject",c);
 el("h3",set.words.join(" vs "),"cw-pairtitle",c);
 var dl=el("dl",undefined,"cw-means",c);
 set.words.forEach(function(w,i){var row=el("div",undefined,"cw-mean"+(highlight===i?" is-answer":""),dl);el("dt",w,"",row);el("dd",set.means[i],"",row);});
 var tip=el("p",undefined,"cw-tip",c);el("strong","Remember: ","",tip);tip.appendChild(doc.createTextNode(set.tip));
 el("p",set.src,"cw-src",c);
 return c;
}

function start(){
 view.round=pickRound();view.pos=0;view.right=0;view.streak=0;view.bestStreak=0;view.wrongIds=[];
 question();
}

function question(){
 var q=view.round[view.pos];if(!q){finish();return;}
 top(null);
 var head=el("div",undefined,"cw-head",rootEl);
 el("span","Question "+(view.pos+1)+" of "+view.round.length,"",head);
 el("span",view.streak>1?"🔥 "+view.streak+" in a row":view.right+" correct","cw-streak",head);
 var bar=el("div",undefined,"cw-bar",rootEl);bar.setAttribute("role","progressbar");bar.setAttribute("aria-label","Round progress");
 bar.setAttribute("aria-valuemin","0");bar.setAttribute("aria-valuemax",String(view.round.length));bar.setAttribute("aria-valuenow",String(view.pos));
 el("span",undefined,"",bar).style.width=Math.round(view.pos/view.round.length*100)+"%";
 var card=el("article",undefined,"cw-card",rootEl);
 el("p",q.set.subject+" · "+q.set.words.join(" / "),"cw-subject",card);
 var s=el("p",undefined,"cw-sentence",card);
 var parts=q.text.split("____");
 s.appendChild(doc.createTextNode(parts[0]));var blank=el("span","______","cw-blank",s);s.appendChild(doc.createTextNode(parts.slice(1).join("____")));
 var opts=el("div",undefined,"cw-options",card);
 var order=shuffle(q.set.words.map(function(w,i){return i;}));
 var buttons=order.map(function(i){
  return btn(q.set.words[i],"cw-option",opts,function(){answer(q,i,buttons,order,blank,card);});
 });
 if(buttons[0])buttons[0].focus({preventScroll:true});
}

function answer(q,chosen,buttons,order,blank,card){
 var ok=chosen===q.answer;
 buttons.forEach(function(b,k){b.disabled=true;var i=order[k];if(i===q.answer)b.classList.add("right");else if(i===chosen)b.classList.add("wrong");});
 blank.textContent=q.set.words[q.answer];blank.classList.add(ok?"is-right":"is-wrong");
 if(ok){
  view.right++;view.streak++;view.bestStreak=Math.max(view.bestStreak,view.streak);
  if(store.missed[q.id]){delete store.missed[q.id];}
  if(root.LawPoints)root.LawPoints.award("confuse:"+q.id,3);
 }else{
  view.streak=0;view.wrongIds.push(q.id);store.missed[q.id]=(store.missed[q.id]||0)+1;
 }
 save();
 var fb=el("p",ok?"Correct.":"Not quite. The answer is “"+q.set.words[q.answer]+"”.","cw-feedback "+(ok?"is-right":"is-wrong"),card);
 fb.setAttribute("role","status");
 pairCard(card,q.set,q.answer).classList.add("cw-explain");
 var next=btn(view.pos+1<view.round.length?"Next question →":"See result →","cw-primary",card,function(){view.pos++;question();});
 next.focus({preventScroll:true});
 next.scrollIntoView&&next.scrollIntoView({block:"nearest",behavior:"smooth"});
}

function finish(){
 store.played++;if(view.right>store.best)store.best=view.right;save();
 top("Round complete");
 var score=el("p",undefined,"cw-score",rootEl);el("strong",view.right+"/"+view.round.length,"",score);el("span"," correct · best streak "+view.bestStreak,"",score);
 el("p",view.right===view.round.length?"Perfect round. Try another group of pairs.":view.right>=7?"Good work. The ones you missed will come back next round.":"Keep going. Missed words come back first until you get them right.","cw-lead",rootEl);
 var row=el("div",undefined,"cw-row",rootEl);
 btn("Play again","cw-primary",row,start);
 btn("Back to pairs","cw-secondary",row,home);
 if(view.wrongIds.length){
  el("h3","Review what you missed","cw-h3",rootEl);
  var seen={};
  view.wrongIds.forEach(function(id){var q=ALL.find(function(x){return x.id===id;});if(q&&!seen[q.set.id]){seen[q.set.id]=1;pairCard(rootEl,q.set,q.answer);}});
 }
}
root.LawConfusingWords={open:open,close:close,count:DATA.length};
})(window);

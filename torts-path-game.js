/* Torts Path v74 — a Duolingo-style path for the Law of Torts in Games.
   Units → lessons unlocked one by one. Each lesson: quick notes, then mixed questions with
   3 hearts, Check → Continue, missed questions coming back at the end, XP, a daily goal and a day streak.
   Data: torts-path-data.js. Text only (textContent); no HTML injection. */
(function(root){
"use strict";
var doc=root.document,DATA=root.TORTS_PATH;
var app=doc.querySelector("#words-view .word-v19"),chooser=doc.getElementById("w-chooser");
if(!app||!chooser||!DATA||!Array.isArray(DATA.units)||!DATA.units.length)return;
var KEY="law-learning-torts-path-v1",HEARTS=3,XP_LESSON=10,XP_PERFECT=5,XP_PRACTICE=5,GOAL=20,PRACTICE_SIZE=8;
var CASES=Array.isArray(DATA.cases)?DATA.cases:[];
var LABEL={mcq:"Pick the right answer",tf:"True or false?",fill:"Fill in the blank",match:"Tap the matching pairs"};

function el(tag,text,cls,parent){var n=doc.createElement(tag);if(cls)n.className=cls;if(text!==undefined&&text!==null)n.textContent=String(text);if(parent)parent.appendChild(n);return n;}
function btn(text,cls,parent,fn){var b=el("button",text,cls,parent);b.type="button";if(fn)b.addEventListener("click",fn);return b;}
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
function day(offset){var d=new Date();d.setDate(d.getDate()+(offset||0));return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");}

/* Saved progress: done lessons, total XP, today's XP, streak. */
function load(){
 try{var v=JSON.parse(root.localStorage.getItem(KEY)||"{}")||{};
  return {done:v.done&&typeof v.done==="object"?v.done:{},xp:Number(v.xp)||0,streak:Number(v.streak)||0,lastDay:typeof v.lastDay==="string"?v.lastDay:"",
   dayXp:Number(v.dayXp)||0,dayXpDate:typeof v.dayXpDate==="string"?v.dayXpDate:"",perfect:v.perfect&&typeof v.perfect==="object"?v.perfect:{}};}
 catch(e){return {done:{},xp:0,streak:0,lastDay:"",dayXp:0,dayXpDate:"",perfect:{}};}
}
function save(){try{root.localStorage.setItem(KEY,JSON.stringify(store));}catch(e){}}
var store=load();
function streakNow(){return store.lastDay===day(0)||store.lastDay===day(-1)?store.streak:0;}
function todayXp(){return store.dayXpDate===day(0)?store.dayXp:0;}
function addXp(n){
 store.xp+=n;
 if(store.dayXpDate!==day(0)){store.dayXpDate=day(0);store.dayXp=0;}
 store.dayXp+=n;
 if(store.lastDay!==day(0)){store.streak=store.lastDay===day(-1)?store.streak+1:1;store.lastDay=day(0);}
 save();
}

/* Flat lesson list, so "unlocked" means the lesson before it is done. */
var LESSONS=[];
DATA.units.forEach(function(u,ui){u.lessons.forEach(function(l,li){LESSONS.push({unit:u,ui:ui,li:li,lesson:l});});});
function indexOf(id){for(var i=0;i<LESSONS.length;i++)if(LESSONS[i].lesson.id===id)return i;return -1;}
function unlocked(i){return i===0||!!store.done[LESSONS[i-1].lesson.id];}
function current(){for(var i=0;i<LESSONS.length;i++)if(!store.done[LESSONS[i].lesson.id])return i;return -1;}

var entry=el("button",undefined,"w-level",chooser);entry.type="button";entry.setAttribute("data-torts","1");
el("strong","Torts Path",undefined,entry);el("span","→",undefined,entry).setAttribute("aria-hidden","true");
var box=el("section",undefined,"cw tp");box.hidden=true;box.setAttribute("aria-label","Torts Path game");
app.insertBefore(box,chooser.nextSibling);

function open(){chooser.hidden=true;box.hidden=false;path();}
function close(){box.hidden=true;chooser.hidden=false;}
entry.addEventListener("click",open);
doc.addEventListener("click",function(e){
 if(!e.target.closest("#back-home")||location.hash!=="#words"||box.hidden)return;
 e.preventDefault();e.stopImmediatePropagation();
 if(view||inner)path();else close();
},true);
if(root.LawAppCore&&root.LawAppCore.router)root.LawAppCore.router.subscribe(function(r){if(r!=="words"){view=null;close();}});

var view=null,inner=false; /* view: the lesson being played; inner: a screen inside the game other than the path */

function stats(parent){
 var s=el("div",undefined,"tp-stats",parent);
 var a=el("span",undefined,"tp-stat",s);el("b","🔥 "+streakNow(),"",a);el("small",streakNow()===1?"day streak":"days streak","",a);
 var b=el("span",undefined,"tp-stat",s);el("b","⭐ "+store.xp,"",b);el("small","total XP","",b);
 var c=el("span",undefined,"tp-stat",s);el("b",Math.min(todayXp(),GOAL)+"/"+GOAL,"",c);el("small","today's goal","",c);
 var g=el("div",undefined,"cw-bar tp-goal",parent);g.setAttribute("role","progressbar");g.setAttribute("aria-label","Daily goal");
 g.setAttribute("aria-valuemin","0");g.setAttribute("aria-valuemax",String(GOAL));g.setAttribute("aria-valuenow",String(Math.min(todayXp(),GOAL)));
 el("span",undefined,"",g).style.width=Math.min(100,Math.round(todayXp()/GOAL*100))+"%";
}

/* ───── The path ───── */
function path(focusId){
 view=null;inner=false;box.replaceChildren();
 btn("← Games","w-change-level",box,close);
 el("h2","Torts Path","cw-title",box);
 el("p","Short lessons in simple English. Finish one to open the next. 5 units · KSLU Semester I.","cw-lead",box);
 stats(box);
 var cur=current(),doneCount=LESSONS.filter(function(x){return store.done[x.lesson.id];}).length;
 if(doneCount)btn("Practise old lessons (+"+XP_PRACTICE+" XP)","cw-secondary tp-practise",box,practise);
 var focusEl=null;
 DATA.units.forEach(function(u,ui){
  var sec=el("section",undefined,"tp-unit",box);sec.setAttribute("aria-label","Unit "+(ui+1)+": "+u.title);
  var head=el("div",undefined,"tp-unit-head",sec);
  var t=el("div",undefined,"",head);el("p","Unit "+(ui+1),"cw-subject",t);el("h3",u.title,"tp-unit-title",t);el("p",u.sub,"tp-unit-sub",t);
  var all=u.lessons.every(function(l){return store.done[l.id];});
  btn(all?"👑 Notes":"Notes","tp-notes-btn",head,function(){guide(ui);});
  var list=el("ol",undefined,"tp-nodes",sec);
  u.lessons.forEach(function(l,li){
   var i=indexOf(l.id),isDone=!!store.done[l.id],open=unlocked(i);
   var item=el("li",undefined,"tp-item tp-pos"+(li%4),list);
   var b=btn(undefined,"tp-node"+(isDone?" is-done":"")+(i===cur?" is-current":"")+(open?"":" is-locked"),item,function(){
    if(!open){hint(item,"Finish the lesson before this to open it.");return;}
    startLesson(i);
   });
   b.setAttribute("aria-label",l.title+(isDone?", done":open?", open":", locked"));
   if(!open)b.setAttribute("aria-disabled","true");
   el("span",isDone?"✓":open?String(li+1):"🔒","tp-node-mark",b).setAttribute("aria-hidden","true");
   if(i===cur)el("span","START","tp-start",item).setAttribute("aria-hidden","true");
   el("span",l.title,"tp-node-label"+(open?"":" is-locked"),item);
   if((focusId&&l.id===focusId)||(!focusId&&i===cur))focusEl=b;
  });
 });
 if(cur<0)el("p","🏆 You finished every Torts lesson. Keep practising to keep your streak.","tp-trophy",box);
 el("p",DATA.note,"cw-note",box);
 if(focusEl)setTimeout(function(){try{focusEl.scrollIntoView({block:"center"});}catch(e){}},0);
}
function hint(parent,text){var old=parent.querySelector(".tp-hint");if(old)old.remove();var h=el("p",text,"tp-hint",parent);h.setAttribute("role","status");setTimeout(function(){h.remove();},2600);}

/* Guidebook: all notes of a unit. */
function guide(ui){
 var u=DATA.units[ui];view=null;inner=true;box.replaceChildren();
 btn("← Path","w-change-level",box,function(){path();});
 el("p","Unit "+(ui+1)+" notes","cw-subject tp-top-sub",box);
 el("h2",u.title,"cw-title",box);
 u.lessons.forEach(function(l){var c=el("article",undefined,"cw-pair tp-notes",box);el("h3",l.title,"cw-pairtitle",c);var ul=el("ul",undefined,"",c);l.notes.forEach(function(n){el("li",n,"",ul);});noteLinks(c,l.notes);});
}

/* ───── Lessons ───── */
function startLesson(i){
 var L=LESSONS[i];
 view={kind:"lesson",index:i,lesson:L.lesson,queue:L.lesson.qs.slice(),total:L.lesson.qs.length,right:0,hearts:HEARTS,mistakes:0,answered:0,firstTry:0,missed:[]};
 notes();
}
function practise(){
 var pool=[];LESSONS.forEach(function(x){if(store.done[x.lesson.id])x.lesson.qs.forEach(function(q){pool.push(q);});});
 var qs=shuffle(pool).slice(0,PRACTICE_SIZE);
 view={kind:"practice",lesson:{id:"practice",title:"Practice"},queue:qs,total:qs.length,right:0,hearts:HEARTS,mistakes:0,answered:0,firstTry:0,missed:[]};
 ask();
}
function header(){
 box.replaceChildren();
 var h=el("div",undefined,"tp-bar",box);
 btn("✕","tp-x",h,function(){path(view&&view.lesson.id);}).setAttribute("aria-label","Leave lesson");
 var bar=el("div",undefined,"cw-bar tp-progress",h);bar.setAttribute("role","progressbar");bar.setAttribute("aria-label","Lesson progress");
 bar.setAttribute("aria-valuemin","0");bar.setAttribute("aria-valuemax",String(view.total));bar.setAttribute("aria-valuenow",String(view.right));
 el("span",undefined,"",bar).style.width=Math.round(view.right/view.total*100)+"%";
 var hearts=el("span","❤ "+view.hearts,"tp-hearts",h);hearts.setAttribute("aria-label",view.hearts+" hearts left");
}
function notes(){
 header();
 var c=el("article",undefined,"cw-card tp-card",box);
 el("p","Quick notes","cw-subject",c);
 el("h2",view.lesson.title,"tp-q",c);
 var ul=el("ul",undefined,"tp-notelist",c);view.lesson.notes.forEach(function(n){el("li",n,"",ul);});
 noteLinks(c,view.lesson.notes);
 var go=btn("Start lesson →","cw-primary",c,ask);go.focus({preventScroll:true});
}

function ask(){
 var q=view.queue[0];if(!q){finish();return;}
 header();
 var c=el("article",undefined,"cw-card tp-card",box);
 el("p",LABEL[q.t]||"Question","cw-subject",c);
 caseBriefs(c,q);
 if(q.t==="match"){match(c,q);return;}
 var pick={i:null},buttons=[],blank=null;
 if(q.t==="fill"){
  var s=el("p",undefined,"tp-q tp-fill",c),parts=String(q.q).split("___");
  el("span",parts[0],"",s);blank=el("span","     ","cw-blank tp-blank",s);el("span",parts.slice(1).join("___"),"",s);
 }else el("p",q.q,"tp-q",c);
 var opts=q.t==="tf"?["True","False"]:q.o;
 var order=q.t==="tf"?[0,1]:shuffle(opts.map(function(o,i){return i;}));
 var wrap=el("div",undefined,"tp-options"+(q.t==="tf"?" tp-tf":"")+(q.t==="fill"?" tp-chips":""),c);
 var check;
 order.forEach(function(i){
  var b=btn(opts[i],"cw-option tp-option",wrap,function(){
   pick.i=i;buttons.forEach(function(x){x.classList.toggle("is-picked",x===b);x.setAttribute("aria-pressed",x===b?"true":"false");});
   if(blank)blank.textContent=opts[i];
   check.disabled=false;
  });
  b.setAttribute("aria-pressed","false");buttons.push(b);
 });
 check=btn("Check","cw-primary tp-check",c,function(){
  if(pick.i===null)return;
  var ok=q.t==="tf"?(pick.i===0)===q.a:pick.i===q.a;
  buttons.forEach(function(b,k){b.disabled=true;var i=order[k],right=q.t==="tf"?(i===0)===q.a:i===q.a;if(right)b.classList.add("right");else if(i===pick.i)b.classList.add("wrong");});
  if(blank){blank.classList.add(ok?"is-right":"is-wrong");}
  check.remove();
  var answer=q.t==="tf"?(q.a?"True":"False"):opts[q.a];
  result(c,q,ok,answer);
 });
 check.disabled=true;
 if(buttons[0])buttons[0].focus({preventScroll:true});
}

/* Case briefs: when a question names a case, show its facts first, with a link to read the full case. */
function casesIn(q){
 var text=[q.q].concat(q.o||[],(q.pairs||[]).map(function(p){return p.join(" ");})).join(" ");
 return CASES.filter(function(k){return k.match.some(function(m){return text.indexOf(m)>=0;});});
}
/* Google search for the case name, citation and "case", so every case finds a judgment or summary. */
function caseUrl(k){return "https://www.google.com/search?q="+encodeURIComponent(k.name.replace(/\s*\(.*\)$/,"")+" "+k.cite.replace(/,.*$/,"")+" case");}
function readLink(k,parent){
 var a=el("a","Read this case on Google ↗","tp-case-link",parent);
 a.href=caseUrl(k);a.target="_blank";a.rel="noopener noreferrer";
 return a;
}
/* Links for every case named in a block of notes. */
function noteLinks(parent,texts){
 var all=texts.join(" "),list=CASES.filter(function(k){return k.match.some(function(m){return all.indexOf(m)>=0;});});
 if(!list.length)return;
 var w=el("div",undefined,"tp-note-cases",parent);el("p","📘 Cases in these notes","tp-case-label",w);
 list.forEach(function(k){var a=readLink(k,w);a.textContent=k.name+" ↗";});
}
function caseBriefs(card,q){
 var list=casesIn(q);if(!list.length)return;
 if(list.length===1){
  var k=list[0],box=el("aside",undefined,"tp-case",card);box.setAttribute("aria-label","Case in brief");
  el("p","📘 Case in brief","tp-case-label",box);
  el("p",k.name,"tp-case-name",box);el("p",k.cite,"tp-case-cite",box);
  el("p",k.facts,"tp-case-facts",box);
  readLink(k,box);
  return;
 }
 /* Several cases (match questions): one tap opens each brief. */
 var wrap=el("div",undefined,"tp-cases",card);
 el("p","📘 Cases in this question — tap one to read the facts","tp-case-label",wrap);
 list.forEach(function(k){
  var d=el("details",undefined,"tp-case tp-case-more",wrap);
  el("summary",k.name,"tp-case-name",d);
  el("p",k.cite,"tp-case-cite",d);el("p",k.facts,"tp-case-facts",d);readLink(k,d);
 });
}

/* Match pairs: tap one on the left, then its partner on the right. */
function match(c,q){
 el("p",q.q,"tp-q",c);
 var grid=el("div",undefined,"tp-match",c);
 var left=el("div",undefined,"tp-col",grid),right=el("div",undefined,"tp-col",grid);
 var sel=null,left_n=q.pairs.length,slip=false;
 function make(col,side){
  return shuffle(q.pairs.map(function(p,i){return i;})).map(function(i){
   var b=btn(q.pairs[i][side],"cw-option tp-option tp-m",col,function(){tap(b,i,side);});b.setAttribute("aria-pressed","false");return b;});
 }
 make(left,0);make(right,1);
 function tap(b,i,side){
  if(b.disabled)return;
  if(!sel||sel.side===side){
   if(sel)sel.b.classList.remove("is-picked"),sel.b.setAttribute("aria-pressed","false");
   sel={b:b,i:i,side:side};b.classList.add("is-picked");b.setAttribute("aria-pressed","true");return;
  }
  var a=sel;sel=null;a.b.classList.remove("is-picked");a.b.setAttribute("aria-pressed","false");
  if(a.i===i){
   [a.b,b].forEach(function(x){x.classList.add("right");x.disabled=true;});
   left_n--;
   if(!left_n)result(c,q,!slip,null,true);
  }else{
   slip=true;
   [a.b,b].forEach(function(x){x.classList.add("wrong");setTimeout(function(){x.classList.remove("wrong");},650);});
   var m=c.querySelector(".tp-slip");if(!m){m=el("p","Not a pair. Try again.","tp-slip",c);m.setAttribute("role","status");}
  }
 }
}

function result(card,q,ok,answer,matched){
 view.answered++;
 if(matched){ /* A match is finished once all pairs are found; a slip only costs the perfect bonus. */
  view.queue.shift();view.right++;if(ok)view.firstTry++;else view.mistakes++;
 }else if(ok){
  view.queue.shift();view.right++;if(view.missed.indexOf(q)<0)view.firstTry++;
 }else{
  view.mistakes++;view.hearts--;if(view.missed.indexOf(q)<0)view.missed.push(q);
  view.queue.push(view.queue.shift()); /* it comes back at the end */
 }
 var heartEl=box.querySelector(".tp-hearts");if(heartEl){heartEl.textContent="❤ "+view.hearts;heartEl.setAttribute("aria-label",view.hearts+" hearts left");if(!ok&&!matched)heartEl.classList.add("is-hit");}
 var prog=box.querySelector(".tp-progress");if(prog){prog.setAttribute("aria-valuenow",String(view.right));prog.firstChild.style.width=Math.round(view.right/view.total*100)+"%";}
 var good=ok||matched;
 var fb=el("div",undefined,"tp-feedback "+(good?"is-right":"is-wrong"),card);fb.setAttribute("role","status");
 el("p",good?(ok?pickPraise():"Done! All pairs matched."):"Wrong answer","tp-fb-title",fb);
 if(!good&&answer)el("p","Right answer: "+answer,"tp-fb-answer",fb);
 if(q.why)el("p",q.why,"tp-fb-why",fb);
 /* A case named only in the explanation gets its read link here. */
 var shown=casesIn(q);CASES.filter(function(k){return shown.indexOf(k)<0&&q.why&&k.match.some(function(m){return q.why.indexOf(m)>=0;});}).forEach(function(k){readLink(k,fb).textContent="Read "+k.name+" ↗";});
 var out=!good&&view.hearts<=0;
 var next=btn(out?"See result →":"Continue →","cw-primary tp-continue",fb,function(){if(out)noHearts();else ask();});
 next.focus({preventScroll:true});
 try{fb.scrollIntoView({block:"nearest"});}catch(e){}
}
function pickPraise(){var p=["Correct!","Super!","Well done!","Nice one!","Correct, keep going!"];return p[Math.floor(Math.random()*p.length)];}
function noHearts(){
 var again=view.kind==="lesson"?view.index:null; box.replaceChildren();
 el("p","💔","tp-big",box).setAttribute("aria-hidden","true");
 el("h2","Out of hearts","cw-title tp-center",box);
 el("p","No problem. Read the quick notes once more and try again. Mistakes help you remember.","cw-lead tp-center",box);
 var row=el("div",undefined,"cw-row",box);
 btn("Try again","cw-primary",row,function(){if(again===null)practise();else startLesson(again);}).focus({preventScroll:true});
 btn("Back to path","cw-secondary",row,function(){path();});
 view=null;inner=true;
}

function finish(){
  var v=view,perfect=v.mistakes===0,xp=0,pts=0,first=false;
 if(v.kind==="lesson"){
  first=!store.done[v.lesson.id];
  store.done[v.lesson.id]=1;
  xp=XP_LESSON+(perfect?XP_PERFECT:0);
  if(perfect)store.perfect[v.lesson.id]=1;
  if(root.LawPoints){pts+=root.LawPoints.award("torts-path:"+v.lesson.id,XP_LESSON);if(perfect)pts+=root.LawPoints.award("torts-path-perfect:"+v.lesson.id,XP_PERFECT);}
 }else xp=XP_PRACTICE;
 var before=streakNow(),hadToday=store.lastDay===day(0);
 addXp(xp);
 view=null;inner=true;box.replaceChildren();
 el("p",perfect?"🏆":"🎉","tp-big",box).setAttribute("aria-hidden","true");
 el("h2",v.kind==="lesson"?"Lesson complete!":"Practice done!","cw-title tp-center",box);
 el("p",v.lesson.title,"cw-lead tp-center",box);
 var s=el("div",undefined,"tp-stats tp-result",box);
 var a=el("span",undefined,"tp-stat",s);el("b","+"+xp,"",a);el("small","XP","",a);
 var acc=v.answered?Math.round(v.firstTry/v.total*100):100;
 var b=el("span",undefined,"tp-stat",s);el("b",acc+"%","",b);el("small","right first time","",b);
 var c=el("span",undefined,"tp-stat",s);el("b","🔥 "+streakNow(),"",c);el("small",!hadToday&&streakNow()>before?"streak up!":"day streak","",c);
 if(perfect)el("p","Perfect lesson — no mistakes. +"+XP_PERFECT+" bonus XP.","tp-perfect",box);
 if(pts)el("p","+"+pts+" points added to your rank.","cw-note",box);
 if(todayXp()>=GOAL&&todayXp()-xp<GOAL)el("p","🎯 Daily goal reached!","tp-perfect",box);
 var nextI=v.kind==="lesson"?v.index+1:-1;
 var row=el("div",undefined,"cw-row",box);
 if(nextI>0&&nextI<LESSONS.length&&first){
  btn("Next lesson →","cw-primary",row,function(){startLesson(nextI);}).focus({preventScroll:true});
  btn("Back to path","cw-secondary",row,function(){path();});
 }else{
  btn("Back to path","cw-primary",row,function(){path(v.lesson.id);}).focus({preventScroll:true});
  btn(v.kind==="lesson"?"Play again":"Practise more","cw-secondary",row,function(){if(v.kind==="lesson")startLesson(v.index);else practise();});
 }
}

/* Direct link: …/law-learning/#torts opens the path. */
function fromLink(){
 if(location.hash!=="#torts")return;
 if(root.LawAppCore&&root.LawAppCore.router)root.LawAppCore.router.navigate("words");
 if(history.replaceState)history.replaceState(null,"","#words");
 setTimeout(open,0);
}
if(root.LawAppCore&&root.LawAppCore.router)root.LawAppCore.router.subscribe(function(){if(location.hash==="#torts")fromLink();});
fromLink();
root.LawTortsPath={open:open,lessons:function(){return LESSONS.map(function(x){return x.lesson.id;});},store:function(){return store;}};
})(window);

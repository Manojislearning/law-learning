/* Timelines v80 — Student → Timelines (#timelines).
   Sketch-style timelines for first-year law: years (or steps) on a line, hand-drawn icons with pink highlight,
   a one-line "why it matters", a Google link for cases and Acts, and a "Put in order" check that earns points.
   Data: timelines-data.js. Text is set with textContent; icons are fixed SVG drawn with createElementNS. */
(function(root){
"use strict";
var doc=root.document,host=doc.getElementById("timelines-view"),DATA=root.LAW_TIMELINES;
if(!host||!DATA||!Array.isArray(DATA.list))return;
var KEY="law-learning-timelines-v1",NS="http://www.w3.org/2000/svg",ORDER_SIZE=5;

function el(tag,text,cls,parent){var n=doc.createElement(tag);if(cls)n.className=cls;if(text!==undefined&&text!==null)n.textContent=String(text);if(parent)parent.appendChild(n);return n;}
function btn(text,cls,parent,fn){var b=el("button",text,cls,parent);b.type="button";if(fn)b.addEventListener("click",fn);return b;}
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
function load(){try{var v=JSON.parse(root.localStorage.getItem(KEY)||"{}")||{};return {done:v.done&&typeof v.done==="object"?v.done:{},filter:typeof v.filter==="string"?v.filter:"all"};}catch(e){return {done:{},filter:"all"};}}
function save(){try{root.localStorage.setItem(KEY,JSON.stringify(store));}catch(e){}}
var store=load();

/* ───── Sketch icons: ink strokes over a pink scribble, like a hand-drawn notebook. ───── */
/* Each icon: [pink highlight parts, ink parts]. Shapes: ["p",d] path, ["c",cx,cy,r] circle, ["r",x,y,w,h,rx] rect, ["t",x,y,text,size]. */
var ICONS={
 book:[[["p","M14 14 L44 10 L48 52 L18 56 Z"]],[["p","M14 14 L44 10 L48 52 L18 56 Z"],["p","M19 13.4 L23 55.4"],["p","M28 22 L40 20.4 M29 28 L41 26.4 M30 34 L39 32.8"],["t",31,47,"§",13]]],
 gavel:[[["p","M8 50 C18 44 30 40 40 34 L46 42 C36 48 22 52 10 56 Z"]],[["p","M28 12 L44 28 L38 34 L22 18 Z"],["p","M25 15 L41 31"],["p","M33 25 L12 46"],["p","M28 50 H54 V56 H28 Z"]]],
 court:[[["p","M10 24 L32 9 L54 24 Z"],["r",12,46,40,8,1]],[["p","M10 24 L32 10 L54 24 Z"],["p","M12 26 H52"],["p","M17 28 V46 M25 28 V46 M39 28 V46 M47 28 V46"],["p","M12 47 H52 M9 53 H55"]]],
 scales:[[["p","M6 34 Q14 44 22 34 Z"],["p","M42 34 Q50 44 58 34 Z"]],[["p","M32 10 V50 M22 54 H42 M26 50 H38"],["p","M12 18 H52"],["c",32,10,2.5],["p","M14 18 L7 34 M14 18 L21 34 M50 18 L43 34 M50 18 L57 34"],["p","M6 34 Q14 44 22 34 Z M42 34 Q50 44 58 34 Z"]]],
 doc:[[["c",38,44,9]],[["p","M16 8 H40 L48 16 V56 H16 Z"],["p","M40 8 V16 H48"],["p","M22 22 H40 M22 28 H42 M22 34 H36"],["c",38,44,7],["p","M35 44 L37.5 46.5 L42 41.5"]]],
 handshake:[[["p","M6 30 L20 22 L34 30 L44 22 L58 30 L50 44 L32 50 L14 44 Z"]],[["p","M4 28 L16 20 L24 24"],["p","M60 28 L48 20 L36 26 L28 22 L22 28 C24 31 28 31 31 28"],["p","M16 20 L12 40 L26 50 C28 52 31 51 32 49 C34 51 37 50 38 48 C40 49 43 48 43 45 L50 40 L48 20"],["p","M32 49 L27 44 M38 48 L33 42"]]],
 envelope:[[["r",10,18,44,30,3]],[["r",9,17,46,32,3],["p","M9 18 L32 37 L55 18"],["p","M9 48 L26 32 M55 48 L38 32"]]],
 car:[[["p","M8 40 L14 28 L46 26 L56 38 L56 46 L8 46 Z"]],[["p","M6 44 V36 L14 26 H44 L56 36 V44 Z"],["p","M16 28 L12 36 H30 V28 Z M34 28 V36 H50 L44 28 Z"],["c",18,46,6],["c",46,46,6]]],
 factory:[[["p","M8 54 V30 L20 38 V30 L32 38 V30 L44 38 V18 H52 V54 Z"]],[["p","M8 54 V30 L20 38 V30 L32 38 V30 L44 38 V14 H52 V54 Z"],["p","M5 54 H58"],["p","M15 46 H21 M27 46 H33 M37 46 H41"],["p","M47 10 C47 6 52 6 52 2 M50 12 C51 8 56 8 56 4"]]],
 person:[[["c",32,18,9],["p","M14 56 C16 40 48 40 50 56 Z"]],[["c",32,18,9],["p","M14 56 C15 42 24 36 32 36 C40 36 49 42 50 56"]]],
 rings:[[["c",24,38,13]],[["c",24,38,13],["c",40,38,13],["p","M20 18 L24 12 L28 18 L24 24 Z"],["p","M24 24 V25"]]],
 house:[[["p","M12 30 L32 12 L52 30 V56 H12 Z"]],[["p","M8 32 L32 10 L56 32"],["p","M14 28 V56 H50 V28"],["p","M27 56 V40 H37 V56"],["p","M42 22 V14 H48 V27"]]],
 police:[[["p","M32 6 L52 14 C52 34 44 48 32 58 C20 48 12 34 12 14 Z"]],[["p","M32 6 L52 14 C52 34 44 48 32 58 C20 48 12 34 12 14 Z"],["p","M32 20 L35 28 L43 28 L37 33 L39 41 L32 36 L25 41 L27 33 L21 28 L29 28 Z"]]],
 clock:[[["c",32,34,20]],[["c",32,34,20],["p","M32 20 V34 L42 40"],["p","M24 8 H40 M32 8 V14"]]],
 alert:[[["c",32,32,22]],[["c",32,32,22],["p","M32 18 V36"],["c",32,44,1.5]]],
 check:[[["c",32,32,22]],[["c",32,32,22],["p","M21 33 L29 41 L44 23"]]],
 coin:[[["c",32,32,21]],[["c",32,32,21],["c",32,32,15],["t",32,40,"₹",20]]],
 bottle:[[["p","M24 26 H40 V56 H24 Z"]],[["p","M28 6 H36 V18 C36 22 42 24 42 30 V56 H22 V30 C22 24 28 22 28 18 Z"],["p","M26 6 H38"],["p","M27 44 C27 38 37 38 37 44 C37 48 31 48 31 45 C31 43 34 43 34 45"],["p","M24 49 H40"]]],
 helmet:[[["p","M12 40 C12 22 52 22 52 40 Z"]],[["p","M12 40 C12 20 52 20 52 40"],["p","M6 42 H58 L56 46 H8 Z"],["p","M28 22 V32 M36 22 V32"]]]
};
function shape(s,cls){
 var n;
 if(s[0]==="p"){n=doc.createElementNS(NS,"path");n.setAttribute("d",s[1]);}
 else if(s[0]==="c"){n=doc.createElementNS(NS,"circle");n.setAttribute("cx",s[1]);n.setAttribute("cy",s[2]);n.setAttribute("r",s[3]);}
 else if(s[0]==="r"){n=doc.createElementNS(NS,"rect");n.setAttribute("x",s[1]);n.setAttribute("y",s[2]);n.setAttribute("width",s[3]);n.setAttribute("height",s[4]);n.setAttribute("rx",s[5]||0);}
 else {n=doc.createElementNS(NS,"text");n.setAttribute("x",s[1]);n.setAttribute("y",s[2]);n.setAttribute("text-anchor","middle");n.setAttribute("font-size",s[4]);n.textContent=s[3];}
 n.setAttribute("class",cls);return n;
}
var uid=0;
function icon(name){
 var def=ICONS[name]||ICONS.doc,id="tlh"+(++uid);
 var svg=doc.createElementNS(NS,"svg");svg.setAttribute("viewBox","0 0 64 64");svg.setAttribute("class","tl-icon");svg.setAttribute("aria-hidden","true");
 /* Pink pencil hatching behind the drawing. */
 var defs=doc.createElementNS(NS,"defs"),pat=doc.createElementNS(NS,"pattern");
 pat.setAttribute("id",id);pat.setAttribute("width","5");pat.setAttribute("height","5");pat.setAttribute("patternUnits","userSpaceOnUse");pat.setAttribute("patternTransform","rotate(35)");
 var r=doc.createElementNS(NS,"rect");r.setAttribute("width","5");r.setAttribute("height","5");r.setAttribute("fill","#fbd3e4");pat.appendChild(r);
 var l=doc.createElementNS(NS,"line");l.setAttribute("x1","0");l.setAttribute("y1","0");l.setAttribute("x2","0");l.setAttribute("y2","5");l.setAttribute("stroke","#ec7fb0");l.setAttribute("stroke-width","2");pat.appendChild(l);
 defs.appendChild(pat);svg.appendChild(defs);
 var hi=doc.createElementNS(NS,"g");hi.setAttribute("transform","translate(2.5 2)");hi.setAttribute("fill","url(#"+id+")");
 def[0].forEach(function(s){hi.appendChild(shape(s,"tl-hi"));});svg.appendChild(hi);
 var ink=doc.createElementNS(NS,"g");def[1].forEach(function(s){ink.appendChild(shape(s,s[0]==="t"?"tl-ink-text":"tl-ink"));});svg.appendChild(ink);
 return svg;
}

/* ───── Screens ───── */
var current=null; /* open timeline, or null on the list */
function google(q){return "https://www.google.com/search?q="+encodeURIComponent(q);}
function span(t){return t.kind==="steps"?t.events.length+" steps":t.events[0].when+" → "+t.events[t.events.length-1].when;}
function list(){
 current=null;host.replaceChildren();
 var w=el("div",undefined,"tl tl-list",host);
 el("h2","Timelines","tl-title tl-list-title",w);
 el("p","First-year law in order — years, cases and steps. Tap a timeline, then test yourself.","tl-lead",w);
 var chips=el("div",undefined,"tl-chips",w);chips.setAttribute("role","group");chips.setAttribute("aria-label","Choose a subject");
 var keys=["all"].concat(Object.keys(DATA.subjects));
 keys.forEach(function(k){
  if(k!=="all"&&!DATA.list.some(function(t){return t.subject===k;}))return;
  var c=btn(k==="all"?"All":DATA.subjects[k],"tl-chip"+(store.filter===k?" is-on":""),chips,function(){store.filter=k;save();list();});
  c.setAttribute("aria-pressed",String(store.filter===k));
 });
 [1,2].forEach(function(sem){
  var items=DATA.list.filter(function(t){return t.sem===sem&&(store.filter==="all"||t.subject===store.filter);});
  if(!items.length)return;
  el("h3",sem===1?"Semester I":"Semester II","tl-sem",w);
  items.forEach(function(t){
   var b=btn(undefined,"tl-card",w,function(){open(t.id);});
   var ic=el("span",undefined,"tl-card-icon",b);ic.appendChild(icon(t.events[Math.min(1,t.events.length-1)].icon));
   var tx=el("span",undefined,"tl-card-text",b);
   el("strong",t.title,"",tx);
   el("small",DATA.subjects[t.subject]+" · "+span(t)+(store.done[t.id]?" · ✓ in order":""),"",tx);
   el("span","→","tl-arrow",b).setAttribute("aria-hidden","true");
  });
 });
 el("p",DATA.note,"tl-foot",w);
 backLabel();
}
function open(id){
 var t=DATA.list.find(function(x){return x.id===id;});if(!t){list();return;}
 current=t;host.replaceChildren();
 var w=el("div",undefined,"tl tl-sheet",host);
 el("p",DATA.subjects[t.subject]+" · Semester "+(t.sem===1?"I":"II")+(t.kind==="steps"?" · Steps":""),"tl-kicker",w);
 var h=el("h2",t.title,"tl-title",w);h.tabIndex=-1;
 el("p",t.intro,"tl-lead",w);
 var ol=el("ol",undefined,"tl-line"+(t.kind==="steps"?" is-steps":""),w);
 t.events.forEach(function(e,i){
  var li=el("li",undefined,"tl-event",ol);
  var head=el("div",undefined,"tl-head",li);
  el("span",undefined,"tl-dot",head).setAttribute("aria-hidden","true");
  el("span",e.when,"tl-year",head);
  var art=el("span",undefined,"tl-art",head);art.appendChild(icon(e.icon));
  var card=el("div",undefined,"tl-card-body",li);
  var tx=el("div",undefined,"tl-text",card);
  el("h3",e.title,"tl-event-title",tx);
  el("p",e.text,"tl-event-text",tx);
  if(e.why){var y=el("p",undefined,"tl-why",tx);el("strong","Why it matters: ","",y);y.appendChild(doc.createTextNode(e.why));}
  if(e.search){var a=el("a","Read on Google ↗","tl-link",tx);a.href=google(e.search);a.target="_blank";a.rel="noopener noreferrer";}
 });
 var row=el("div",undefined,"tl-row",w);
 btn("Test yourself: put in order","cw-primary",row,function(){quiz(t);});
 btn("All timelines","cw-secondary",row,list);
 try{history.replaceState(null,"","#timelines?t="+encodeURIComponent(t.id));}catch(e){}
 backLabel();
 try{root.scrollTo({top:0,behavior:"instant"});}catch(e){root.scrollTo(0,0);}
 h.focus({preventScroll:true});
}

/* ───── Put in order: tap the events from first to last. ───── */
function quiz(t){
 var picked=t.events.length<=ORDER_SIZE?t.events.slice():shuffle(t.events.map(function(e,i){return i;})).slice(0,ORDER_SIZE).sort(function(a,b){return a-b;}).map(function(i){return t.events[i];});
 var answer=picked.slice(),pool=shuffle(picked.slice()),chosen=[];
 host.replaceChildren();
 var w=el("div",undefined,"tl tl-quiz",host);
 el("p",t.title,"tl-kicker",w);
 var h=el("h2",t.kind==="steps"?"Put the steps in order":"Put these in time order","tl-title",w);h.tabIndex=-1;
 el("p","Tap the "+(t.kind==="steps"?"first step":"earliest event")+" first, then the next, and so on. Tap a chosen one again to undo.","tl-lead",w);
 var slots=el("ol",undefined,"tl-slots",w);
 var opts=el("div",undefined,"tl-pool",w);
 var check=btn("Check order","cw-primary",w,finish);check.disabled=true;
 var result=el("div",undefined,"tl-result",w);result.setAttribute("role","status");
 function draw(){
  slots.replaceChildren();opts.replaceChildren();
  answer.forEach(function(_,i){
   var s=el("li",undefined,"tl-slot"+(chosen[i]?" is-filled":""),slots);
   if(chosen[i]){var b=btn((i+1)+". "+chosen[i].title,"tl-chosen",s,function(){chosen.splice(i,1);draw();});b.setAttribute("aria-label","Remove "+chosen[i].title);}
   else el("span",(i+1)+".","tl-slot-num",s);
  });
  pool.forEach(function(e){if(chosen.indexOf(e)>=0)return;btn(e.title,"tl-option",opts,function(){chosen.push(e);draw();});});
  check.disabled=chosen.length!==answer.length;
 }
 function finish(){
  var right=0;
  slots.querySelectorAll(".tl-slot").forEach(function(s,i){var ok=chosen[i]===answer[i];if(ok)right++;s.classList.add(ok?"is-right":"is-wrong");
   el("small",ok?"✓ "+answer[i].when:"✗ correct: "+answer[i].when+" — "+answer[i].title,"tl-slot-note",s);
   s.querySelectorAll("button").forEach(function(b){b.disabled=true;});});
  check.remove();opts.replaceChildren();
  var all=right===answer.length,pts=0;
  if(all){store.done[t.id]=1;save();if(root.LawPoints)pts=root.LawPoints.award("timeline:"+t.id,3);}
  el("p",all?"All in order! "+(pts?"+"+pts+" points.":""):right+" of "+answer.length+" in the right place. Read the timeline once more and try again.","tl-result-text "+(all?"is-right":"is-wrong"),result);
  var row=el("div",undefined,"tl-row",result);
  btn("Try again","cw-primary",row,function(){quiz(t);});
  btn("Back to timeline","cw-secondary",row,function(){open(t.id);});
 }
 draw();
 try{root.scrollTo({top:0,behavior:"instant"});}catch(e){root.scrollTo(0,0);}
 h.focus({preventScroll:true});
}

/* Top-bar Back: from a timeline go to the list, then to Student. */
function backLabel(){var b=doc.getElementById("back-home");if(b&&router&&router.current()==="timelines"){b.textContent=current?"← Timelines":"← Student";}}
var router=root.LawAppCore&&root.LawAppCore.router;
doc.addEventListener("click",function(e){
 if(!e.target.closest("#back-home")||!router||router.current()!=="timelines")return;
 if(current||host.querySelector(".tl-quiz")){e.preventDefault();e.stopImmediatePropagation();list();}
},true);
function fromHash(){var h=location.hash,i=h.indexOf("?");if(i<0)return "";return new URLSearchParams(h.slice(i+1)).get("t")||"";}
function enter(){var id=fromHash();if(id)open(id);else list();}
if(router){router.subscribe(function(r){if(r==="timelines")enter();});if(router.current()==="timelines")enter();}
root.LawTimelines={open:function(id){if(router.current()==="timelines")open(id);else{router.navigate("timelines");setTimeout(function(){open(id);},0);}},count:DATA.list.length};
})(window);

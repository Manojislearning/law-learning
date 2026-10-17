/* Marriage Law Cases v67 — scenario game in Games: which law applies, validity, conversion, age, divorce, money.
   Data: marriage-law-data.js. Reuses Confusing Words styles (cw-*). Text only; no HTML injection. */
(function(root){
"use strict";
var doc=root.document,DATA=root.MARRIAGE_CASES;
var app=doc.querySelector("#words-view .word-v19"),chooser=doc.getElementById("w-chooser");
if(!app||!chooser||!Array.isArray(DATA)||!DATA.length)return;
var KEY="law-learning-marriage-v1",ROUND=8;
var CATS={all:"All cases",law:"Which law applies?",valid:"Is the marriage valid?",convert:"Conversion",age:"Age",divorce:"Divorce",money:"Children, maintenance & property",other:"Christian, Parsi, Sikh & Buddhist",state:"State laws: Goa & UCC",abroad:"NRI & marriages abroad"};

function el(tag,text,cls,parent){var n=doc.createElement(tag);if(cls)n.className=cls;if(text!==undefined&&text!==null)n.textContent=String(text);if(parent)parent.appendChild(n);return n;}
function btn(text,cls,parent,fn){var b=el("button",text,cls,parent);b.type="button";if(fn)b.addEventListener("click",fn);return b;}
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
function load(){try{var v=JSON.parse(root.localStorage.getItem(KEY)||"{}");return {missed:v&&v.missed&&typeof v.missed==="object"?v.missed:{},best:Number(v&&v.best)||0,played:Number(v&&v.played)||0};}catch(e){return {missed:{},best:0,played:0};}}
function save(){try{root.localStorage.setItem(KEY,JSON.stringify(store));}catch(e){}}
var store=load(),view={cat:"all",round:[],pos:0,right:0,streak:0,wrong:[]};

var entry=el("button",undefined,"w-level",chooser);entry.type="button";entry.setAttribute("data-marriage","1");
el("strong","Marriage Law Cases",undefined,entry);el("span","→",undefined,entry).setAttribute("aria-hidden","true");
var box=el("section",undefined,"cw mlc");box.hidden=true;box.setAttribute("aria-label","Marriage Law Cases game");
app.insertBefore(box,chooser.nextSibling);

function open(){chooser.hidden=true;box.hidden=false;home();}
function close(){box.hidden=true;chooser.hidden=false;}
entry.addEventListener("click",open);
doc.addEventListener("click",function(e){
 if(!e.target.closest("#back-home")||location.hash!=="#words"||box.hidden)return;
 e.preventDefault();e.stopImmediatePropagation();close();
},true);
if(root.LawAppCore&&root.LawAppCore.router)root.LawAppCore.router.subscribe(function(r){if(r!=="words")close();});

function pool(){return DATA.filter(function(c){return view.cat==="all"||c.cat===view.cat;});}
function top(title){box.replaceChildren();btn("← Games","w-change-level",box,close);if(title)el("h2",title,"cw-title",box);}

function home(){
 top("Marriage Law Cases");
 el("p","Interfaith and inter-caste marriages, conversion, age and divorce. Read the facts and pick what the law says.","cw-lead",box);
 el("p","Tap a topic to play.","cw-pick",box);
 var bars=el("nav",undefined,"cw-bars",box);bars.setAttribute("aria-label","Choose a topic");
 Object.keys(CATS).forEach(function(k){
  if(k!=="all"&&!DATA.some(function(c){return c.cat===k;}))return;
  var b=btn(undefined,"cw-bar-btn",bars,function(){view.cat=k;start();});
  el("strong",CATS[k],"",b);el("span","→","",b).setAttribute("aria-hidden","true");
 });
 var miss=DATA.filter(function(c){return store.missed[c.id];}).length;
 el("p","Best round "+store.best+"/"+ROUND+" · "+store.played+" played"+(miss?" · "+miss+" to revisit (they come back first)":"")+". Each correct answer earns 3 points once. Law as of October 2026.","cw-note",box);
 var guide=el("details",undefined,"cw-browse",box);
 el("summary","Quick guide: which law applies?",undefined,guide);
 [["Both Hindu, Jain, Sikh or Buddhist","Hindu Marriage Act, 1955 (caste does not matter)"],
  ["Different religions, nobody converts","Special Marriage Act, 1954 (30 days' notice; man 21, woman 18)"],
  ["Both Muslim (including after genuine conversion)","Muslim personal law; wife's grounds in the 1939 Act"],
  ["One or both Christian, church wedding","Christian Marriage Act, 1872; divorce under the Divorce Act, 1869"],
  ["Residents of Uttarakhand (not Scheduled Tribes)","Uttarakhand Uniform Civil Code, in force since January 2025"],
  ["Two Sikhs (Anand Karaj)","Anand Marriage Act for the ceremony; divorce under the Hindu Marriage Act"],
  ["Two Parsis","Parsi Marriage and Divorce Act, 1936; Parsi Matrimonial Courts"],
  ["Anyone domiciled in Goa","Goa's family law (Portuguese Civil Code)"],
  ["Indian citizen marrying abroad at an Indian mission","Foreign Marriage Act, 1969"],
  ["Any wife needing maintenance","BNSS, 2023, s.144, whatever her religion"]].forEach(function(r){
  var c=el("div",undefined,"cw-mean",guide);el("dt",r[0],"",c);el("dd",r[1],"",c);
 });
}

function start(){
 var p=pool(),missed=shuffle(p.filter(function(c){return store.missed[c.id];})),fresh=shuffle(p.filter(function(c){return !store.missed[c.id];}));
 view.round=missed.slice(0,Math.ceil(ROUND/2)).concat(fresh);
 view.round=shuffle(view.round.slice(0,Math.min(ROUND,p.length)));
 view.pos=0;view.right=0;view.streak=0;view.wrong=[];
 ask();
}

function ask(){
 var c=view.round[view.pos];if(!c){finish();return;}
 top(null);
 var head=el("div",undefined,"cw-head",box);
 el("span","Case "+(view.pos+1)+" of "+view.round.length,"",head);
 el("span",view.streak>1?view.streak+" in a row":view.right+" correct","cw-streak",head);
 var bar=el("div",undefined,"cw-bar",box);bar.setAttribute("role","progressbar");bar.setAttribute("aria-label","Round progress");
 bar.setAttribute("aria-valuemin","0");bar.setAttribute("aria-valuemax",String(view.round.length));bar.setAttribute("aria-valuenow",String(view.pos));
 el("span",undefined,"",bar).style.width=Math.round(view.pos/view.round.length*100)+"%";
 var card=el("article",undefined,"cw-card",box);
 el("p",CATS[c.cat],"cw-subject",card);
 el("p",c.facts,"mlc-facts",card);
 el("p",c.ask,"mlc-ask",card);
 var opts=el("div",undefined,"mlc-options",card);
 var order=shuffle(c.options.map(function(o,i){return i;}));
 var buttons=order.map(function(i){return btn(c.options[i],"cw-option mlc-option",opts,function(){answer(c,i,buttons,order,card);});});
 if(buttons[0])buttons[0].focus({preventScroll:true});
}

function answer(c,chosen,buttons,order,card){
 var ok=chosen===c.answer;
 buttons.forEach(function(b,k){b.disabled=true;var i=order[k];if(i===c.answer)b.classList.add("right");else if(i===chosen)b.classList.add("wrong");});
 if(ok){view.right++;view.streak++;delete store.missed[c.id];if(root.LawPoints)root.LawPoints.award("marriage:"+c.id,3);}
 else{view.streak=0;view.wrong.push(c);store.missed[c.id]=(store.missed[c.id]||0)+1;}
 save();
 var fb=el("p",ok?"Correct.":"Not quite. The answer is: "+c.options[c.answer],"cw-feedback "+(ok?"is-right":"is-wrong"),card);fb.setAttribute("role","status");
 explain(card,c);
 var next=btn(view.pos+1<view.round.length?"Next case →":"See result →","cw-primary",card,function(){view.pos++;ask();});
 next.focus({preventScroll:true});
}

function explain(parent,c){
 var e=el("div",undefined,"cw-pair cw-explain",parent);
 el("p","Why","cw-subject",e);
 el("p",c.why,"mlc-why",e);
 el("p",c.law,"cw-src",e);
 links(e,c.law);
 return e;
}
/* One search link per authority, so the reader can open the Act or judgment. */
function links(parent,law){
 var items=String(law||"").split(";").map(function(x){return x.trim();}).filter(function(x){return x&&!/^Muslim personal law|^Goa family law/i.test(x);});
 if(!items.length)return;
 var wrap=el("div",undefined,"cw-links",parent);
 items.forEach(function(item){
  var q=item.replace(/,\s*(ss?\.|Art\.|Arts\.).*$/,"").replace(/\s*\((Mulla[^)]*)\)$/,"");
  var a=el("a","Read: "+item+" ↗","cw-link",wrap);
  a.href="https://indiankanoon.org/search/?formInput="+encodeURIComponent(q);a.target="_blank";a.rel="noopener noreferrer";
 });
}

function finish(){
 store.played++;if(view.right>store.best)store.best=view.right;save();
 top("Round complete");
 var s=el("p",undefined,"cw-score",box);el("strong",view.right+"/"+view.round.length,"",s);el("span"," correct","",s);
 el("p",view.wrong.length?"Cases you missed come back first next time.":"Perfect round. Try another topic.","cw-lead",box);
 var row=el("div",undefined,"cw-row",box);btn("Play again","cw-primary",row,start);btn("Back to topics","cw-secondary",row,home);
 if(view.wrong.length){
  el("h3","Review what you missed","cw-h3",box);
  view.wrong.forEach(function(c){var p=el("article",undefined,"cw-pair",box);el("p",c.facts,"mlc-facts",p);el("p",c.options[c.answer],"cw-pairtitle",p);el("p",c.why,"mlc-why",p);el("p",c.law,"cw-src",p);links(p,c.law);});
 }
}
root.LawMarriageCases={open:open,close:close,count:DATA.length};
})(window);

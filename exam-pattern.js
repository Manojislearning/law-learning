/* Exam Pattern v64 — real KSLU Semester I format, unit-wise repeat topics and repeat problems.
   Data: kslu-paper-analysis.js. Every string is rendered as text, never as HTML. */
(function(){
"use strict";
var host=document.getElementById("exam-view");
var DATA=window.KSLU_PAPER_ANALYSIS;
if(!host||!DATA||!window.LawAppCore)return;
var KEY="law-learning-exam-prep-v1";
var node=function(tag,text,cls){return window.LawAppCore.ui.node(document,tag,text,cls);};
function add(parent,tag,text,cls){var n=node(tag,text,cls);parent.appendChild(n);return n;}

function load(){
 try{var v=JSON.parse(localStorage.getItem(KEY)||"{}");return v&&typeof v==="object"&&v.ready&&typeof v.ready==="object"?v:{ready:{}};}
 catch(e){return {ready:{}};}
}
function save(state){try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){}}
var state=load();
var view={format:"80",subject:DATA.subjects[0].id};

var MONTHS=["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function session(s){if(!/^\d{4}-\d{2}$/.test(s))return "undated";return MONTHS[Number(s.slice(5))]+" "+s.slice(0,4);}

var FORMATS={
 "80":{
  title:"80-mark paper · unit-wise",
  code:"Seen as paper codes 4001… in Jan 2026",
  rows:[
   ["Duration","3 hours · Max. 80 marks"],
   ["Structure","Q1–Q5, one question for each syllabus unit. Every unit is compulsory."],
   ["Each question","(a) essay, 10 marks, with an OR choice + (b) short note or problem, 6 marks, with an OR choice"],
   ["Total","5 units × 16 = 80"],
   ["Language","Entirely English or entirely Kannada"]
  ],
  plan:[["Read the paper and pick OR options",8],["Each unit: 10-mark essay (about 20 min) + 6-mark note/problem (about 12 min)",160],["Re-read, underline sections and case names",12]],
  tip:"No unit can be skipped. Prepare at least two essay topics and two short notes from every unit — the OR choice only helps if you know one of the two."
 },
 "100":{
  title:"100-mark paper · any five + compulsory problems",
  code:"Seen as paper codes 2070… in Jan 2026",
  rows:[
   ["Duration","3 hours · Max. 100 marks"],
   ["Q1–Q7","Essay questions, 16 marks each"],
   ["Q8","Short notes — any two of three, 2 × 8 = 16"],
   ["Choice","Answer any five of Q1–Q8 (5 × 16 = 80)"],
   ["Q9 (compulsory)","Solve any two of three problems, 2 × 10 = 20"],
   ["Language","Entirely English or entirely Kannada"]
  ],
  plan:[["Read the paper; choose your five and two problems",8],["Q9 problems first while fresh (IRAC, about 15 min each)",30],["Five 16-mark answers (about 26 min each)",130],["Re-read and fix sections and case names",12]],
  tip:"Q9 is 20 marks and always problem-based. Practise IRAC on the repeat problems below — the same fact patterns keep returning."
 }
};

function chip(parent,label,active,onClick){
 var b=add(parent,"button",label,"xp-chip"+(active?" is-on":""));
 b.type="button";b.setAttribute("aria-pressed",active?"true":"false");b.addEventListener("click",onClick);return b;
}

function renderFormat(box){
 var f=FORMATS[view.format];
 var card=add(box,"section",undefined,"xp-card");
 add(card,"h3",f.title);
 add(card,"p",f.code+". Both formats were set for 3-year LL.B. Semester I in the same session, so check the paper code on your hall ticket or ask your college which one you will write.","xp-muted");
 var dl=add(card,"dl","","xp-rows");
 f.rows.forEach(function(r){var row=add(dl,"div","","xp-row");add(row,"dt",r[0]);add(row,"dd",r[1]);});
 add(card,"h4","3-hour time plan");
 var ol=add(card,"ol","","xp-plan");
 f.plan.forEach(function(p){var li=add(ol,"li");add(li,"span",p[0]);add(li,"strong",p[1]+" min");});
 add(card,"p",f.tip,"xp-tip");
}

function subjectPapers(id){return DATA.papers.filter(function(p){return p.subject===id;});}

function renderTopics(box){
 var subject=DATA.subjects.find(function(s){return s.id===view.subject;});
 var topics=DATA.topics.filter(function(t){return t.subject===view.subject;});
 var papers=subjectPapers(view.subject);
 var card=add(box,"section",undefined,"xp-card");
 add(card,"h3","What KSLU asks — "+subject.name);
 add(card,"p","Counted across "+papers.length+" papers ("+DATA.range+"). A count shows how many papers asked the topic at least once, as an essay, short note or problem. Past frequency is a revision guide, not a prediction.","xp-muted");
 var high=topics.filter(function(t){return t.count/t.of>=0.6;});
 var meter=add(card,"div","","xp-progress");
 var readyText=add(meter,"strong");
 add(meter,"span"," frequently asked topics (60%+ of papers) marked ready");
 var bar=add(card,"div","","xp-bar");bar.setAttribute("role","progressbar");
 bar.setAttribute("aria-label","Frequently asked topics ready");
 bar.setAttribute("aria-valuemin","0");bar.setAttribute("aria-valuemax",String(high.length));
 var fill=add(bar,"span");
 function refresh(){
  var ready=high.filter(function(t){return state.ready[t.id];}).length;
  readyText.textContent=ready+" of "+high.length;
  bar.setAttribute("aria-valuenow",String(ready));
  fill.style.width=(high.length?Math.round(ready/high.length*100):0)+"%";
 }
 refresh();
 [1,2,3,4,5].forEach(function(u){
  var list=topics.filter(function(t){return t.unit===u;}).sort(function(a,b){return b.count-a.count;});
  if(!list.length)return;
  add(card,"h4","Unit "+["","I","II","III","IV","V"][u],"xp-unit");
  var ul=add(card,"ul","","xp-topics");
  list.forEach(function(t){
   var li=add(ul,"li","","xp-topic"+(t.count/t.of>=0.6?" is-hot":""));
   var label=add(li,"label");
   var cb=add(label,"input");cb.type="checkbox";cb.checked=!!state.ready[t.id];
   cb.setAttribute("aria-label","Mark ready: "+t.topic);
   cb.addEventListener("change",function(){if(cb.checked)state.ready[t.id]=true;else delete state.ready[t.id];save(state);refresh();});
   var text=add(label,"span","","xp-topic-text");
   add(text,"span",t.topic);
   var share=t.count/t.of;
   add(text,"small","Last asked "+session(t.sessions[0])+(share>=0.8?" · nearly every paper":share>=0.6?" · asked often":""));
   var count=add(li,"span",t.count+"/"+t.of,"xp-count");
   count.setAttribute("aria-label","Asked in "+t.count+" of "+t.of+" papers");
  });
 });
}

function renderProblems(box){
 var list=(DATA.problems[view.subject]||[]).slice().sort(function(a,b){return b.sessions.length-a.sessions.length;});
 if(!list.length)return;
 var card=add(box,"section",undefined,"xp-card");
 add(card,"h3","Problems that keep coming back");
 add(card,"p","Fact patterns paraphrased from the papers, with the rule to apply. Write your own IRAC answer first, then open the hint.","xp-muted");
 list.forEach(function(p){
  var d=add(card,"details","","xp-problem");
  var s=add(d,"summary");
  add(s,"span",p.facts);
  add(s,"small",(p.sessions.length>1?"Asked "+p.sessions.length+" times · ":"Asked ")+p.sessions.map(session).join(", "));
  var body=add(d,"div","","xp-problem-body");
  var a=add(body,"p");add(a,"strong","Apply: ");a.appendChild(document.createTextNode(p.apply));
  var c=add(body,"p");add(c,"strong","Authority: ");c.appendChild(document.createTextNode(p.cite));
 });
}

function renderPapers(box){
 var subject=DATA.subjects.find(function(s){return s.id===view.subject;});
 var card=add(box,"details",undefined,"xp-card xp-papers");
 add(card,"summary","Open the scanned papers used ("+subjectPapers(view.subject).length+")");
 var ul=add(card,"ul");
 subjectPapers(view.subject).forEach(function(p){
  var li=add(ul,"li");var a=add(li,"a",session(p.session)+" · "+p.marks+" marks");
  a.href=p.url;a.target="_blank";a.rel="noopener noreferrer";
 });
 var more=add(card,"p","","xp-muted");
 var link=add(more,"a","All years on KSLU Corner");link.href=subject.archive;link.target="_blank";link.rel="noopener noreferrer";
 more.appendChild(document.createTextNode(" — an independent archive, not an official KSLU site. Get an official copy where possible."));
}

var root=node("div",undefined,"xp");
function render(){
 root.replaceChildren();
 var head=add(root,"div","","xp-head");
 add(head,"p","KSLU 3-year LL.B. · Semester I · from "+DATA.papers.length+" real papers, "+DATA.range,"xp-muted");
 var fchips=add(root,"div","","xp-chips");fchips.setAttribute("aria-label","Paper format");
 chip(fchips,"80 marks",view.format==="80",function(){view.format="80";render();});
 chip(fchips,"100 marks",view.format==="100",function(){view.format="100";render();});
 renderFormat(root);
 var schips=add(root,"div","","xp-chips xp-subjects");schips.setAttribute("aria-label","Subject");
 DATA.subjects.forEach(function(s){chip(schips,s.name.replace(/:.*$/,""),view.subject===s.id,function(){view.subject=s.id;render();});});
 renderTopics(root);
 renderProblems(root);
 renderPapers(root);
}
host.replaceChildren(root);
render();
window.LawExamPattern={key:KEY,render:render,state:function(){return state;}};
})();

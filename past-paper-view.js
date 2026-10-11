/* KSLU Exam Papers & Answers v59 — real archive links, clearly separate original practice. */
(function () {
"use strict";
var host=document.getElementById("papers-view");
if(!host||!Array.isArray(window.LAW_PAST_ANSWERS)||!window.LawAppCore)return;
var originals=window.LAW_PAST_ANSWERS.map(function(a){return Object.assign({kind:"archive-attributed",subject:"Contract–I"},a);});
var seen=new Set(originals.map(function(a){return a.id;}));
var models=(Array.isArray(window.LAW_MODEL_PRACTICE)?window.LAW_MODEL_PRACTICE:[]).filter(function(a){if(!a||!a.id||seen.has(a.id))return false;seen.add(a.id);return a.kind==="model"&&Array.isArray(a.sections)&&a.sections.length>=6;});
var ALL=originals.concat(models);
var subjects=[
 ["All","All subjects",""],
 ["Contract–I","Contract–I","https://kslucorner.in/papers/llb/sem-1/contract-i"],
 ["Constitutional Law–I","Constitutional Law–I","https://kslucorner.in/papers/llb/sem-1/constitutional-law-i"],
 ["Law of Torts","Law of Torts","https://kslucorner.in/papers/llb/sem-1/law-of-torts"],
 ["Family Law–I: Hindu Law","Hindu Law","https://kslucorner.in/papers/llb/sem-1/family-law-i-hindu-law"],
 ["Criminal Law–I: BNS, 2023","Criminal Law–I (BNS)","https://kslucorner.in/papers/llb/sem-1/bharatiya-nyaya-sanhita"]
];
var basePlans={
 "acceptance-2022":{
  command:"Define + Discuss",
  interpretation:"Begin with Section 2(b) and set out the validity requirements. Distinguish contractual promise from enforceability and cite appropriate authorities.",
  recall:["Section 2(b): acceptance","Sections 3–4: communication","Sections 5–6: revocation","Section 7: absolute and unqualified acceptance","Sections 8–9: performance and conduct","Lalman Shukla; Carlill; Felthouse; Bhagwandas"],
  marks:[["Statutory definition",2],["Validity and communication rules",3],["Cases and reasoning",3],["Example and conclusion",2]],
  difficult:["Acceptance","Proposal","Revocation","Consideration","Contract","Enforceable","Counter-offer"]
 },
 "consideration-2022":{
  command:"Discuss the proposition with exceptions",
  interpretation:"Explain the general rule and carefully qualify it by Section 25's three numbered exceptions, illustrations and other distinct statutory situations.",
  recall:["Section 2(d): consideration","Section 10: enforceability","Section 25(1): registered family promise","Section 25(2): past voluntary services","Section 25(3): written time-barred debt","Completed gift, inadequate consideration and separate statutory rules"],
  marks:[["Definition and general rule",2],["Three Section 25 exceptions",4],["Other qualifying rules",2],["Examples and conclusion",2]],
  difficult:["Consideration","Void agreement","Enforceable","Contract","Free consent"]
 }
};
var searchText="",subject="All",selected=null;
var header=host.querySelector(".section-head");if(header){
 var h=header.querySelector("h2");if(h)h.textContent="KSLU Exam Papers & Answers";
 var p=header.querySelector(".muted");if(p)p.textContent="Browse actual past-paper scans and study complete original model answers with a clear exam-writing method.";
}
var home=document.createElement("div"),reader=document.createElement("div");
home.className="exam59-home";reader.className="exam59-reader";reader.hidden=true;
host.append(home,reader);
function E(parent,tag,text,cls){
 var n=document.createElement(tag);if(cls)n.className=cls;
 if(text!==undefined&&text!==null)n.textContent=String(text);
 parent.appendChild(n);return n;
}
function B(parent,text,fn,cls){
 var b=E(parent,"button",text,cls);b.type="button";b.addEventListener("click",fn);return b;
}
function paragraph(p,text,cls){return E(p,"p",text,cls);}
function isArchived(a){return a.kind!=="model";}
function meta(a){return (isArchived(a)?"Archive-attributed · Verify original wording":"Original model · Not an actual KSLU question")+" · "+a.marks+"-mark example";}
function makePlan(a){
 var prior=basePlans[a.id];
 var recall=prior?prior.recall:(a.keyPoints||[]);
 var marks=prior?prior.marks:a.sections.map(function(s,i){return [s[0],[1,2,2,2,2,1][i]||1];});
 return {
  unitPath:"Semester I → "+a.subject+" → "+a.unit,
  command:prior?prior.command:(a.command||"Explain with authorities"),
  interpretation:prior?prior.interpretation:(a.interpretation||"Identify the rule, cases and application."),
  recall:recall,marks:marks,
  think:["Identify the action words in the question and the precise syllabus topic.",
         "Recall statutory provisions and the leading rule before looking at the answer.",
         "Organise the points under short legal headings and a clear introduction.",
         a.tips?.[0]||"Distinguish the statutory rule from its exceptions and applications.",
         a.tips?.[1]||"Use cases to explain legal principles, not only for decoration.",
         "Conclude by applying the rule to the question and qualifying the result."],
  difficult:prior?prior.difficult:WORDS.filter(function(w){
    if(w.term.length<5)return false;
    return recall.some(function(t){return t.toLowerCase().includes(w.term.toLowerCase());});
  }).map(function(w){return w.term;}).slice(0,12)
 };
}
function safeLink(parent,label,href,cls){
 if(typeof href!=="string"||!/^https:\/\//.test(href))return;
 var a=E(parent,"a",label,cls);a.href=href;a.target="_blank";a.rel="noopener noreferrer";return a;
}
function renderHome(){
 selected=null;home.hidden=false;reader.hidden=true;home.replaceChildren();
 paragraph(home,"The answer bank contains "+ALL.length+" detailed answers. Model questions are syllabus-aligned practice, not claimed to be copied from an examination.","exam59-intro");
 var archives=E(home,"section",undefined,"exam59-archives");
 E(archives,"h3","Original KSLU paper scans");
 paragraph(archives,"Open an external archive to find year-wise papers. KSLU Corner is independent of the university; check each session's question paper and applicable syllabus.","exam59-note");
 var links=E(archives,"div",undefined,"exam59-archive-links");
 subjects.slice(1).forEach(function(s){safeLink(links,s[1]+" ↗",s[2],"exam59-archive-link");});
 var bank=E(home,"section",undefined,"exam59-bank");
 E(bank,"h3","Questions with worked answers");
 var chips=E(bank,"div",undefined,"exam59-subjects");
 chips.setAttribute("role","group");chips.setAttribute("aria-label","Filter exam answers by subject");
 subjects.forEach(function(s){
  var amount=ALL.filter(function(a){return a.subject===s[0];}).length;
  var active=subject===s[0];
  var button=B(chips,s[1]+(s[0]==="All"?"":" · "+amount),function(){subject=s[0];renderHome();},"exam59-chip"+(active?" active":""));
  button.setAttribute("aria-pressed",String(active));
 });
 var finder=E(bank,"input",undefined,"exam59-search");finder.type="search";finder.placeholder="Search a question, topic or Act…";finder.setAttribute("aria-label","Search KSLU model answers");finder.value=searchText;
 var list=E(bank,"div",undefined,"exam59-list");list.setAttribute("aria-live","polite");
 function showList(){
  list.replaceChildren();
  var found=ALL.filter(function(a){
   return (subject==="All"||a.subject===subject)&&(!searchText||(a.title+" "+a.unit+" "+a.subject).toLowerCase().includes(searchText.toLowerCase()));
  });
  paragraph(list,found.length+" answered "+(found.length===1?"question":"questions"),"exam59-count");
  if(!found.length)paragraph(list,"No matching questions. Try another subject or search word.","exam59-note");
  found.forEach(function(a){
   var b=B(list,"",function(){openQuestion(a);},"exam59-question");
   E(b,"span",a.subject+" · "+a.unit,"exam59-meta");
   E(b,"strong",a.title);
   E(b,"span",meta(a)+" · Read full answer →","exam59-meta");
  });
 }
 finder.addEventListener("input",function(){searchText=finder.value.trim();showList();});
 showList();
}
function makeMarkdown(a,info){
 var lines=["# "+a.title,"","**Type:** "+meta(a),"**Unit:** "+info.unitPath,"","## Examiner focus",info.interpretation,"","## Answer structure"];
 info.marks.forEach(function(p){lines.push("- "+p[0]+" ("+p[1]+" suggested marks)");});
 lines.push("","## Model answer");
 a.sections.forEach(function(s){lines.push("","### "+s[0],"",s[1]);});
 lines.push("","## Sources");
 a.sources.forEach(function(s){lines.push("- ["+s[0]+"]("+s[1]+")");});
 lines.push("","Independent study answer, not an official KSLU marking key.");
 return lines.join("\n");
}
function openQuestion(a){
 selected=a;home.hidden=true;reader.hidden=false;reader.replaceChildren();
 var info=makePlan(a);
 B(reader,"← All answered questions",renderHome,"exam59-back");
 paragraph(reader,a.subject+" · "+a.unit,"exam59-meta");
 E(reader,"h2",a.title,"exam59-title");
 paragraph(reader,meta(a),"exam59-origin");
 paragraph(reader,isArchived(a)?"The question is attributed to a 2022 archive. Compare against the scanned original before quoting the examination wording. The answer is an independent model.":"An original practice question aligned to the published KSLU syllabus. It has not been verified as having appeared in an actual exam.","exam59-caution");
 var tools=E(reader,"div",undefined,"exam59-tools");
 B(tools,"Copy complete answer",function(){
  var text=makeMarkdown(a,info),button=this;
  if(navigator.clipboard&&navigator.clipboard.writeText){
   navigator.clipboard.writeText(text).then(function(){button.textContent="Copied answer";}).catch(function(){window.prompt("Copy answer",text);});
  }else window.prompt("Copy answer",text);
 },"exam59-secondary");
 var focus=E(reader,"section",undefined,"exam59-panel");
 E(focus,"h3","1. Decode the question");
 paragraph(focus,"Command: "+info.command,"exam59-lead");
 paragraph(focus,info.interpretation);
 var think=E(reader,"section",undefined,"exam59-panel");
 E(think,"h3","2. How to structure your thinking");
 var ol=E(think,"ol");info.think.forEach(function(x){E(ol,"li",x);});
 var recall=E(reader,"section",undefined,"exam59-panel");
 E(recall,"h3","3. What to recall from the syllabus");
 var ul=E(recall,"ul");info.recall.forEach(function(x){E(ul,"li",x);});
 var marks=E(reader,"section",undefined,"exam59-panel");
 E(marks,"h3","4. Illustrative 10-mark plan");
 paragraph(marks,"Suggested study allocation only; not KSLU's marking scheme.","exam59-note");
 var points=E(marks,"ul");info.marks.forEach(function(x){var li=E(points,"li");E(li,"b",x[1]+" marks — ");E(li,"span",x[0]);});
 var practice=E(reader,"section",undefined,"exam59-panel");
 E(practice,"h3","5. Write your own answer");
 paragraph(practice,"Optional, private and unsaved. No automated marks are assigned.","exam59-note");
 var draft=E(practice,"textarea",undefined,"exam59-draft");
 draft.rows=7;draft.placeholder="Issue → statutory rule → cases → explanation/application → qualified conclusion";draft.setAttribute("aria-label","Your practice answer, not saved");
 var reveal=B(reader,"Reveal full model answer ↓",function(){
  var next=!answer.hidden;answer.hidden=next;reveal.textContent=next?"Reveal full model answer ↓":"Hide model answer ↑";reveal.setAttribute("aria-expanded",String(!next));
  if(!next&&typeof answer.scrollIntoView==="function")answer.scrollIntoView({block:"start",behavior:"smooth"});
 },"exam59-reveal");
 reveal.setAttribute("aria-expanded","false");
 var answer=E(reader,"section",undefined,"exam59-panel exam59-answer");answer.hidden=true;
 E(answer,"h3","6. Detailed model answer");
 a.sections.forEach(function(part){
  var section=E(answer,"div",undefined,"exam59-section");
  E(section,"h4",part[0]);paragraph(section,part[1]);
 });
 var foot=E(reader,"section",undefined,"exam59-panel");
 E(foot,"h3","Authorities, primary sources & revision");
 (a.sources||[]).forEach(function(src){safeLink(foot,src[0]+" ↗",src[1],"exam59-source");});
 paragraph(foot,"Study model only. Check current statute, judgments, KSLU scheme and commencement for your admission cohort.","exam59-note");
 var vocab=(info.difficult||[]).filter(function(t){return WORDS.some(function(w){return w.term.toLowerCase()===t.toLowerCase();});});
 if(vocab.length){
  E(foot,"h4","Study the difficult words");
  var words=E(foot,"div",undefined,"exam59-vocab");
  vocab.forEach(function(term){
   B(words,term+" →",function(){if(window.openLawWord)window.openLawWord(term,"learn");else location.hash="words";},"exam59-word");
  });
 }
 window.scrollTo({top:0,behavior:"smooth"});
}
renderHome();
window.LawAppCore.router.subscribe(function(route){if(route==="papers"&&selected)renderHome();});
window.LawExamPapersV59={count:ALL.length,subjects:subjects.map(function(s){return s[0];})};
})();

/* Focused KSLU syllabus: Year / Semester / Subject / Unit / Topic */
(function(){
"use strict";
var host=document.getElementById("syllabus-detail");
if(!host||typeof KSLU_FIRST_SEMESTER==="undefined")return;
var sheet=document.createElement("style");sheet.textContent="\n#syllabus-view>.section-head{display:none!important}\n#syllabus-detail{max-width:670px;margin:0 auto;padding:4px 0 42px}\n.sf-top{margin:7px 0 22px;display:flex;align-items:center;gap:11px}\n.sf-back{background:white;border:1px solid var(--line);border-radius:11px;min-width:41px;height:41px;color:var(--text);font:inherit;font-weight:750;cursor:pointer}\n.sf-headings{min-width:0;flex:1}\n.sf-eyebrow{font-size:.7rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);font-weight:800;margin:0 0 4px}\n.sf-title{font-size:clamp(1.55rem,5vw,2rem);line-height:1.18;letter-spacing:-.02em;margin:0}\n.sf-sub{font-size:.85rem;line-height:1.52;color:var(--muted);margin:0 0 17px}\n.sf-choice{display:flex;align-items:center;justify-content:space-between;gap:14px;width:100%;min-height:70px;background:#fff;border:1px solid var(--line);border-radius:15px;text-align:left;padding:16px;margin-bottom:10px;cursor:pointer;color:var(--text);font:inherit;box-shadow:0 4px 17px rgba(13,19,33,.025)}\n.sf-choice strong{display:block;font-size:1rem;line-height:1.38}\n.sf-choice small{display:block;color:var(--muted);font-size:.77rem;margin-top:5px;line-height:1.4}\n.sf-choice>span:last-child{font-size:1.4rem;color:var(--muted);flex:none}\n.sf-choice:focus-visible{outline:3px solid #7991ac;outline-offset:2px}\n.sf-pill{display:inline-block;font-size:.73rem;font-weight:750;padding:6px 10px;border-radius:8px;background:#eef0f4;color:var(--text);margin:0 5px 9px 0}\n.sf-info{background:#fff;border:1px solid var(--line);border-radius:16px;padding:18px;margin:14px 0;line-height:1.63;font-size:.92rem}\n.sf-info p{margin:6px 0}\n.sf-info h3{font-size:1rem;margin:0 0 8px}\n.sf-note{color:var(--muted);font-size:.82rem;line-height:1.6;margin:16px 0}\n.sf-learnword{display:inline-block;border:1px solid var(--line);background:#f7f8fa;border-radius:10px;padding:9px 12px;font:inherit;font-size:.8rem;font-weight:700;color:var(--text);margin:4px 5px 4px 0;cursor:pointer}\n.sf-footer{border-top:1px solid var(--line);margin-top:25px;padding-top:16px}\n@keyframes sf-from-right{from{opacity:0;transform:translateX(22px)}to{opacity:1;transform:translateX(0)}}\n@keyframes sf-from-left{from{opacity:0;transform:translateX(-22px)}to{opacity:1;transform:translateX(0)}}\n@media(prefers-reduced-motion:no-preference){.sf-screen.forward{animation:sf-from-right .25s cubic-bezier(.2,.7,.2,1) both}.sf-screen.backward{animation:sf-from-left .25s cubic-bezier(.2,.7,.2,1) both}}\n";document.head.appendChild(sheet);
var sourceStyle=document.createElement("style");
sourceStyle.textContent='.sf-sources{border:1px solid var(--line);border-radius:12px;background:#fff;margin:14px 0}.sf-sources summary{font-size:.83rem;font-weight:750;padding:13px;cursor:pointer}.sf-sources-body{border-top:1px solid var(--line);padding:11px 14px}.sf-sources-body p{color:var(--muted);font-size:.8rem;line-height:1.6}.sf-sources-body a{display:block;font-size:.83rem;line-height:1.5;color:#265b90;text-decoration:underline;margin:10px 0}.sf-source-warning{border-left:3px solid #ad6324;background:#fff5e8;color:#70440d;border-radius:0 9px 9px 0;padding:12px;font-size:.81rem;line-height:1.5;margin:12px 0}';
document.head.appendChild(sourceStyle);
var dashboardStyle=document.createElement("style");
dashboardStyle.textContent='.sf-source-entry{border-top:1px solid var(--line);padding-top:18px;margin-top:20px}.sf-source-entry .sf-choice{margin-top:8px}.sf-source-link{display:block;font-size:.9rem;line-height:1.5;font-weight:650;margin:13px 0;color:#275a8a;text-decoration:underline}.sf-source-small{font-size:.8rem!important;color:var(--muted)}';
document.head.appendChild(dashboardStyle);

host.replaceChildren();
var statePath=[],direction="forward";
if(location.hash==="#syllabus"&&new URLSearchParams(location.search).get("learn")==="contract1-unit1"){
 statePath=[{level:"year",value:1},{level:"semester",value:1},{level:"subject",value:1},{level:"unit",value:0},{level:"guided",value:0}];
}

/* A direct link can open the source dashboard without five menu taps. */
if(location.hash==="#syllabus"&&new URLSearchParams(location.search).get("sources")==="1")statePath=[{level:"source",value:true}];
var otherSemesters={"2":["Constitutional Law – II","Contract – II","Labour Law – I","Property Law","Family Law – II: Mohammedan Law & Indian Succession Act","Kanoonu Kannada / Kannada Kali"],"3":["Jurisprudence","Labour Law – I","Law of Taxation","Criminal Law – II: Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023"],"4":["Public International Law","Optional I: Human Rights Law and Practice / Insurance Law","Optional II: Banking Law / Right to Information","Clinical I: Professional Ethics and Professional Accounting System","Clinical II: Alternative Dispute Resolution Systems"],"5":["Company Law","Civil Procedure Code and Limitation Act","Optional III: Intellectual Property Rights I / Penology & Victimology","Optional IV: Interpretation of Statutes and Principles of Legislation / Competition Law","Clinical III: Drafting, Pleading and Conveyance"],"6":["Bharatiya Sakshya Adhiniyam (BSA), 2023","Environmental Law","Optional V: Intellectual Property Rights II / White Collar Crimes","Optional VI: Land Law / Law relating to International Trade Economics","Clinical IV: Moot Court Exercise and Internship"]};
var topicsCache=[];
var courseIndex=0,unitIndex=0,topicIndex=0;
function E(box,tag,text,cls){
 var n=window.LawAppCore.ui.node(document,tag,text,cls);box.appendChild(n);return n;
}
function B(box,title,caption,go){
 var button=E(box,"button",undefined,"sf-choice");button.type="button";
 var left=E(button,"span");E(left,"strong",title);if(caption)E(left,"small",caption);
 E(button,"span","›");button.addEventListener("click",go);return button;
}
function push(level,value){statePath.push({level:level,value:value});direction="forward";render();}
function back(){if(statePath.length){statePath.pop();direction="backward";render();}else location.hash="home";}
function active(level){var f=statePath.find(function(x){return x.level===level;});return f?f.value:null;}
function currentCourses(sem){
 if(sem===1)return KSLU_FIRST_SEMESTER.courses.map(function(c){return c.name;});
 return otherSemesters[sem]||[];
}
function splitTopics(unit){
 return String(unit.text||"").split(/;\s*/).map(function(t){return t.trim().replace(/\.\s*$/,"");}).filter(Boolean);
}
var explanations=[
[/preamble/i,"The Preamble expresses the foundational constitutional ideals. Explain its objectives and role in constitutional interpretation."],
[/article 12|state action/i,"Article 12 identifies bodies treated as State for Part III. Apply the constitutional tests to the institution in question."],
[/article 13|judicial review/i,"Judicial review permits courts to examine laws and governmental actions for inconsistency with the Constitution."],
[/severability/i,"Severability asks whether the valid part of legislation can continue when an unconstitutional part is removed."],
[/eclipse/i,"The doctrine of eclipse addresses the operation of pre-Constitution laws inconsistent with Fundamental Rights."],
[/article 14|equality/i,"Study equality before law, equal protection, and constitutionally valid classification."],
[/article 19|speech|reasonable restrictions/i,"Identify the precise Article 19 freedom and the applicable constitutional limits before assessing a restriction."],
[/article 20|double jeopardy|self-incrimination/i,"Distinguish retrospective criminal punishment, double jeopardy and compelled self-incrimination."],
[/article 21|life and personal liberty/i,"Article 21 protects life and personal liberty according to procedure established by law, as judicially interpreted."],
[/articles? 32|articles? 226|writ/i,"Match the right and wrong to the correct writ remedy and court jurisdiction."],
[/acceptance|offer/i,"For contract formation, check proposal, knowledge, unconditional assent, communication, timing and permitted mode."],
[/consideration|nudum pactum/i,"Identify the act, abstinence or promise at the promisor's desire and any relevant statutory exception."],
[/fraud|coercion|undue influence|free consent/i,"Identify the relevant reason consent may be defective, its essential elements and the effect on enforceability."],
[/negligence|duty of care/i,"Identify duty, breach, causation and legally recognised damage before applying possible defences."],
[/strict liability|absolute liability/i,"Distinguish the ordinary strict-liability rule from the Indian absolute-liability principle."],
[/mens rea|actus reus/i,"Separate prohibited conduct from the mental element required for the offence."],
[/murder|culpable homicide/i,"Compare the statutory ingredients, relevant mental states and applicable exceptions."],
[/theft|robbery|extortion|dacoity/i,"Identify the elements of each property offence under the applicable BNS provisions."]
];
function explain(course,topic){
 for(var i=0;i<explanations.length;i++)if(explanations[i][0].test(topic))return explanations[i][1];
 if(/Contract/i.test(course))return "Identify the governing Contract Act provision, essential conditions, exceptions and resulting remedy.";
 if(/Torts/i.test(course))return "Identify the protected legal interest, wrong, defence and possible remedy.";
 if(/Criminal/i.test(course))return "Locate the applicable BNS provision, its physical and mental elements, statutory exceptions and punishment.";
 if(/Family/i.test(course))return "Identify the governing personal law, qualifying relationship, statutory conditions and legal consequence.";
 if(/Constitutional/i.test(course))return "Identify the relevant constitutional provision, competing rights or powers, limits and available remedy.";
 return "Define the central concept, explain its essential components and practise applying it to a short example.";
}
function legalWords(text){
 if(typeof WORDS==="undefined")return [];
 var val=String(text).toLowerCase();
 return WORDS.filter(function(w){return w.term.length>4&&val.includes(w.term.toLowerCase());}).slice(0,5);
}
function screen(title,kicker,summary){
 var box=E(host,"section",undefined,"sf-screen "+direction);
 var top=E(box,"div",undefined,"sf-top");
 if(statePath.length){var bb=E(top,"button","←","sf-back");bb.setAttribute("aria-label","Back to previous syllabus screen");bb.addEventListener("click",back);}
 var head=E(top,"div",undefined,"sf-headings");
 E(head,"p",kicker||"3-Year LL.B","sf-eyebrow");E(head,"h2",title,"sf-title");
 if(summary)E(box,"p",summary,"sf-sub");return box;
}

function sourceCourseSummary(){
 var ledger=window.LawContentLedger;
 if(!ledger)return "Official source ledger is unavailable.";
 return ledger.data.units.length+" units • primary-source links • "+ledger.data.units.filter(function(u){return u.syllabusStatus==="needs-review";}).length+" awaiting unit-text review";
}
function sourceLink(parent,item){
 var a=E(parent,"a",item.title+" ↗","sf-source-link");
 a.href=item.url;a.target="_blank";a.rel="noopener noreferrer";
}
function openSourceUnit(subject,unit){push("sourceUnit",unit);}
function sourceUnitPage(subject,unitIndex){
 var c=KSLU_FIRST_SEMESTER.courses[subject],u=c.units[unitIndex],ledger=window.LawContentLedger;
 var f=screen(u.title,c.name+" · "+u.unit,"Official reference links and review status.");
 var record=ledger&&ledger.getUnit(subject,unitIndex);
 var box=E(f,"div",undefined,"sf-info");
 E(box,"h3","Source status");
 E(box,"p",record&&record.syllabusStatus==="verified"?"Checked against the applicable official university syllabus.":"Needs review — full unit wording has not yet been confirmed against the applicable KSLU syllabus PDF.");
 if(record){
  record.warnings.forEach(function(warning){
   var n=E(f,"div",warning,"sf-source-warning");
   n.setAttribute("role","note");
  });
  var list=E(f,"div",undefined,"sf-info");
  E(list,"h3","Official references");
  ledger.getSources(record).forEach(function(item){sourceLink(list,item);});
  E(list,"p","The linked sites establish reference sources; they do not independently verify the teaching notes.","sf-source-small");
 }
 var foot=E(f,"div",undefined,"sf-footer");
 B(foot,"Study this unit","Continue to topics →",function(){
  statePath=[{level:"year",value:1},{level:"semester",value:1},{level:"subject",value:subject},{level:"unit",value:unitIndex}];
  direction="forward";render();
 });
}
function render(){
 host.replaceChildren();
 var year=active("year"),sem=active("semester"),subject=active("subject"),unit=active("unit"),topic=active("topic");
 var source=active("source"),sourceCourse=active("sourceCourse"),sourceUnit=active("sourceUnit");
 var guided=active("guided");
 if(guided!==null&&subject===1&&unit===0&&window.ContractUnitOneUI){
   window.ContractUnitOneUI.render(host,{
    index:guided,direction:direction,
    onBack:function(){back();},
    onMove:function(next,dir){
     statePath[statePath.length-1].value=next;direction=dir;render();
    }
   });
   return;
 }

 if(source!==null){
  if(sourceCourse===null){
   var sc=screen("Sources & review","FIRST YEAR · SEMESTER I",sourceCourseSummary());
   KSLU_FIRST_SEMESTER.courses.forEach(function(course,i){
    B(sc,course.name,"5 units · review status and official references",function(){push("sourceCourse",i);});
   });
  } else if(sourceUnit===null){
   var course=KSLU_FIRST_SEMESTER.courses[sourceCourse];
   var cs=screen(course.name,"SOURCES & REVIEW","Select a unit to inspect its official references.");
   course.units.forEach(function(u,i){
    B(cs,u.unit+" — "+u.title,"Source details →",function(){openSourceUnit(sourceCourse,i);});
   });
  }else sourceUnitPage(sourceCourse,sourceUnit);
  window.scrollTo({top:0,behavior:"auto"});return;
 }

 if(year===null){
  var a=screen("Syllabus","KSLU · 3-Year LL.B","Choose a year to begin.");
  ["First Year","Second Year","Third Year"].forEach(function(name,i){B(a,name,"Semesters "+(i*2+1)+"–"+(i*2+2),function(){push("year",i+1);});});
  var info=E(a,"div",undefined,"sf-source-entry");
  E(info,"p","SOURCE TRANSPARENCY","sf-eyebrow");
  B(info,"Sources & review",sourceCourseSummary(),function(){push("source",true);});

 }else if(sem===null){
  var b=screen(["","First Year","Second Year","Third Year"][year],"Syllabus","Choose a semester.");
  [year*2-1,year*2].forEach(function(s){B(b,"Semester "+s,currentCourses(s).length+" subjects",function(){push("semester",s);});});
 }else if(subject===null){
  var c=screen("Semester "+sem,"Year "+year,"Choose a subject.");
  currentCourses(sem).forEach(function(name,i){
   B(c,name,sem===1?"5 units available":"Subject outline · unit details pending",function(){push("subject",i);});
  });
 }else if(unit===null){
  var currentName=currentCourses(sem)[subject],d=screen(currentName,"Semester "+sem,"Select a unit to learn.");
  if(sem===1){
   var course=KSLU_FIRST_SEMESTER.courses[subject];
   course.units.forEach(function(u,i){
    var meta=window.LawContentLedger&&window.LawContentLedger.getUnit(subject,i);
    B(d,u.unit+" — "+u.title,meta?"Topics • Source status: needs review":"Learn topics →",function(){push("unit",i);});
   });
  }else{
   var msg=E(d,"div",undefined,"sf-info");E(msg,"h3","Detailed unit outline not imported");
   E(msg,"p","The subject title is shown from the 2024–25 KSLU programme listing. The detailed units for this semester have not been added or verified.");
   E(msg,"p","Return to select a subject or semester.");
  }
 }else if(topic===null){
  var course=KSLU_FIRST_SEMESTER.courses[subject],u=course.units[unit];
  topicsCache=splitTopics(u);
  var e=screen(u.title,course.name+" · "+u.unit,"Choose one core topic.");
  if(sem===1&&subject===1&&unit===0&&window.ContractUnitOneUI){
    B(e,"Study Contract–I Unit I","6 short lessons · examples · practice questions",function(){push("guided",0);});
  }

  topicsCache.forEach(function(t,i){B(e,t,"Study this topic →",function(){push("topic",i);});});
  E(e,"p","The topic divisions are study aids based on the imported course outline.","sf-note");
 }else{
  var course=KSLU_FIRST_SEMESTER.courses[subject],u=course.units[unit],t=splitTopics(u)[topic];
  var f=screen(t,u.unit+" · "+course.name);
  var core=E(f,"div",undefined,"sf-info");E(core,"h3","Core understanding");E(core,"p",explain(course.name,t));
  if(t.includes(",")){
   var sub=E(f,"div",undefined,"sf-info");E(sub,"h3","Break it down");
   var parts=t.split(/,\s*/).map(function(x){return x.trim();}).filter(Boolean);
   var ul=E(sub,"ul");parts.forEach(function(p){E(ul,"li",p);});
  }
  var exam=E(f,"div",undefined,"sf-info");E(exam,"h3","Check your understanding");
  E(exam,"p","Can you define this concept, explain its essential requirements, identify exceptions and apply the rule to a practical example?");
  E(exam,"p","For exam answers, connect the definition to the relevant statutory text or leading authority.");

  var ledger=window.LawContentLedger;
  var unitSource=ledger&&ledger.getUnit(subject,unit);
  if(unitSource){
    unitSource.warnings.forEach(function(message){
      var warning=E(f,"p",message,"sf-source-warning");warning.setAttribute("role","note");
    });
    var sources=E(f,"details",undefined,"sf-sources");
    E(sources,"summary","Sources and review status");
    var body=E(sources,"div",undefined,"sf-sources-body");
    E(body,"p","Syllabus wording: not yet independently verified against the applicable KSLU unit PDF.");
    ledger.getSources(unitSource).forEach(function(source){
      var link=E(body,"a",source.title+" ↗");
      link.href=source.url;link.target="_blank";link.rel="noopener noreferrer";
    });
    E(body,"p","Official links are for verification. Confirm amendments and applicable course requirements.");
  }
  var words=legalWords(t);
  if(words.length){
   E(f,"p","Related vocabulary","sf-eyebrow");
   words.forEach(function(w){
    var btn=E(f,"button",w.term+" ↗","sf-learnword");
    btn.addEventListener("click",function(){if(window.openLawWord)window.openLawWord(w.term,"game");else location.hash="words";});
   });
  }
  var next=topic+1;
  if(next<splitTopics(u).length){
   var footer=E(f,"div",undefined,"sf-footer");
   B(footer,"Next topic","Continue learning →",function(){statePath[statePath.length-1].value=next;direction="forward";render();});
  }
 }
 window.scrollTo({top:0,behavior:"auto"});
}
var navigatingFromSubject=false;
window.openContractUnitOne=function(){
  statePath=[{level:"year",value:1},{level:"semester",value:1},{level:"subject",value:1},{level:"unit",value:0},{level:"guided",value:0}];
  direction="forward";
  navigatingFromSubject=location.hash!=="#syllabus";
  if(navigatingFromSubject)window.LawAppCore.router.navigate("syllabus");
  render();return true;
};
var launch=document.getElementById("home-contract-lesson");
if(launch)launch.addEventListener("click",function(){window.openContractUnitOne();});

window.openSyllabusUnit=function(semester,subject,unit){
 if(semester!==1||!KSLU_FIRST_SEMESTER.courses[subject]||!KSLU_FIRST_SEMESTER.courses[subject].units[unit])return false;
 statePath=[{level:"year",value:1},{level:"semester",value:1},{level:"subject",value:subject},{level:"unit",value:unit}];
 direction="forward";navigatingFromSubject=location.hash!=="#syllabus";
 if(navigatingFromSubject)window.LawAppCore.router.navigate("syllabus");
 render();return true;
};
window.LawAppCore.router.subscribe(function(route){
 if(route!=="syllabus")return;
 if(navigatingFromSubject){navigatingFromSubject=false;return;}
 if(statePath.length){statePath=[];direction="forward";render();}
});
render();
})();
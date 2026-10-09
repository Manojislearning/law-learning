/* Exam-first model answers: question → recall map → marks → full answer. */
(function(){
"use strict";
var host=document.getElementById("papers-view");
if(!host||!Array.isArray(window.LAW_PAST_ANSWERS)||typeof WORDS==="undefined")return;
var css=document.createElement("style");css.textContent="\n#papers-view .section-head{margin-bottom:14px}\n#papers-view .paper-toolbar,#papers-view #question-list,#papers-view .notice{display:none!important}\n.exam-home{max-width:740px;margin:0 auto 36px}\n.exam-home[hidden],.exam-reader[hidden],.exam-glossary[hidden]{display:none!important}\n.exam-intro{font-size:.85rem;color:var(--muted);line-height:1.6;margin:0 0 16px}\n.exam-question{display:block;width:100%;text-align:left;background:#fff;border:1px solid var(--line);border-radius:16px;padding:17px;margin:10px 0;color:var(--text);font:inherit;cursor:pointer}\n.exam-question strong{display:block;font-size:1rem;line-height:1.5;margin:8px 0}\n.exam-question small{font-size:.76rem;color:var(--muted)}\n.exam-reader,.exam-glossary{max-width:740px;margin:0 auto 40px}\n.exam-back{background:#fff;border:1px solid var(--line);border-radius:11px;padding:10px 14px;font:inherit;font-weight:750;color:var(--text);margin:8px 0 18px}\n.exam-h1{font-size:clamp(1.45rem,5.2vw,2.1rem);line-height:1.25;margin:8px 0 12px}\n.exam-meta{font-size:.77rem;font-weight:800;color:var(--muted);margin:0 0 8px}\n.exam-panel{background:#fff;border:1px solid var(--line);border-radius:17px;padding:clamp(15px,3vw,21px);margin:13px 0}\n.exam-panel h3{font-size:1.08rem;line-height:1.35;margin:0 0 10px}\n.exam-panel p,.exam-panel li{font-size:.91rem;line-height:1.72}\n.exam-panel ul,.exam-panel ol{margin:8px 0;padding-left:23px}\n.exam-panel li{padding-left:2px;margin:8px 0}\n.exam-hint{color:var(--muted);font-size:.81rem;line-height:1.6}\n.exam-marks{display:inline-block;white-space:nowrap;margin:2px 6px 2px 0;background:#fff2f2;border:1px solid #e8baba;border-radius:7px;color:#9a3439;font-size:.73rem;font-weight:850;padding:4px 7px;vertical-align:baseline}\n.exam-key{font-weight:800;color:#8d292e;background:#fff2f2;border:1px solid #edcece;border-radius:6px;padding:2px 5px}\n.exam-term{display:inline;border:1px solid #e6baba;background:#fff3f3;border-radius:6px;color:#8b272c;padding:1px 5px;margin:0 1px;font:inherit;font-weight:800;font-size:.91em;line-height:inherit;cursor:pointer;box-decoration-break:clone;-webkit-box-decoration-break:clone}\n.exam-toolrow{display:flex;flex-wrap:wrap;gap:9px;margin:16px 0}\n.exam-toolrow button{background:#fff;border:1px solid var(--line);color:var(--text);border-radius:11px;padding:11px 13px;font:inherit;font-weight:750;font-size:.82rem}\n.exam-outline{counter-reset:step}\n.exam-outline li{margin-bottom:10px}\n.exam-fullsection{margin:0 0 23px}\n.exam-fullsection h4{font-size:1.05rem;margin:0 0 9px;line-height:1.4}\n.exam-fullsection p{font-size:.93rem;line-height:1.85;margin:0}\n.exam-source a{display:block;color:#285d9b;text-decoration:underline;font-size:.83rem;line-height:1.55;margin:8px 0}\n.exam-words{display:grid;gap:9px}\n.exam-worditem{display:flex;align-items:center;justify-content:space-between;gap:10px;border:1px solid var(--line);border-radius:12px;background:#fff;padding:12px}\n.exam-worditem strong{font-size:.91rem;color:#8b272c}\n.exam-worditem p{font-size:.82rem;line-height:1.5;margin:5px 0 0}\n.exam-worditem button{flex:none;background:#0d1321;border:0;color:white;padding:10px;border-radius:9px;font:inherit;font-size:.78rem;font-weight:750}\n@media(max-width:480px){.exam-worditem{display:block}.exam-worditem button{margin-top:10px;width:100%}}\n";document.head.appendChild(css);
var plan={"acceptance-2022":{"unitPath":"First Year → Semester I → Contract–I → Unit I: Formation & Consideration","command":"Define + Discuss","interpretation":"The question first asks for the statutory meaning of acceptance and then requires the legal conditions for its validity, supported by leading authorities.","recall":["Section 2(b): acceptance transforms a proposal into a promise","Knowledge of the offer before performing or communicating acceptance","Section 7: unconditional assent and prescribed or reasonable manner","Sections 3–4: communication and completion; separate postal and instantaneous communication","Sections 5–6: revocation and lapse of proposals","Sections 8–9: conduct, performance and express or implied acceptance","Leading case principles: Lalman Shukla, Carlill, Felthouse, Bhagwandas"],"think":["Circle the action words: DEFINE and DISCUSS. Do not give only a definition.","Locate the topic: Contract–I, Unit I, proposal and acceptance.","Recall the statutory sequence: proposal → knowledge → acceptance → communication → promise.","Group the rules under knowledge, unconditionality, manner, timing and conduct.","Attach one or two relevant case principles to those rules, then give a short example.","Conclude by distinguishing a valid acceptance from an enforceable contract."],"marks":[["Meaning and Section 2(b)",2],["Validity requirements: knowledge, Section 7 and manner",3],["Communication, timing and Sections 3–6",2],["Relevant cases and legal principles",2],["Illustration and conclusion",1]],"difficult":["Acceptance","Consideration","Agreement","Contract","Revocation","Free consent","Enforceable","Counter-offer","Promise","Doctrine","Offer"]},"consideration-2022":{"unitPath":"First Year → Semester I → Contract–I → Unit I: Formation & Consideration","command":"Discuss the proposition","interpretation":"The examiner is testing whether you know the general rule that agreements without consideration are void, and whether you can qualify it through statutory exceptions and case illustrations.","recall":["Section 2(d): definition and who may furnish consideration","Section 10: lawful consideration among essentials of a contract","Section 25: general rule and three principal exceptions","Section 25(1): written registered promise from natural love and affection between near relations","Section 25(2): promise to compensate qualifying past voluntary services","Section 25(3): signed written promise to pay time-barred debt","Explanations: completed gifts and inadequacy of consideration","Separate statutory rules under Sections 63 and 185","Case principles: Chinnaya v Ramayya; charitable subscription cases"],"think":["Underline the proposition: WITHOUT CONSIDERATION IS VOID. It is a rule with exceptions.","Place the question in Contract–I, Unit I: consideration and enforceability.","Define consideration first under Section 2(d); explain why it matters.","State Section 25, then recall each numbered exception separately.","Distinguish no consideration from insufficient consideration and completed gifts.","Add two statutory illustrations or case principles and finish with a qualified conclusion."],"marks":[["Definition under Section 2(d)",2],["Section 25 general rule",1],["Three Section 25 exceptions",3],["Completed gifts, adequacy and related rules",2],["Cases or illustrations",1],["Qualified conclusion",1]],"difficult":["Consideration","Nudum pactum","Privity of contract","Enforceable","Void agreement","Agreement","Contract","Free consent","Indemnity","Unlawful consideration"]}};
var previous=host.querySelector(".paper-answers");
if(previous)previous.remove();
var intro=host.querySelector(".section-head .muted");
if(intro)intro.textContent="Read the question, recall the syllabus, plan the marks, then write the answer.";
var h=host.querySelector(".section-head h2");if(h)h.textContent="Past Papers";
var home=document.createElement("div"),reader=document.createElement("div"),glossary=document.createElement("div");
home.className="exam-home";reader.className="exam-reader";glossary.className="exam-glossary";
reader.hidden=true;glossary.hidden=true;
host.append(home,reader,glossary);
var selected=0;
function E(parent,tag,text,cls){var el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;parent.appendChild(el);return el;}
function B(parent,text,cb,cls){var btn=E(parent,"button",text,cls);btn.type="button";btn.addEventListener("click",cb);return btn;}
function goHome(){home.hidden=false;reader.hidden=true;glossary.hidden=true;window.scrollTo({top:0,behavior:"smooth"});}
function showReader(i){selected=i;home.hidden=true;glossary.hidden=true;reader.hidden=false;buildAnswer();window.scrollTo({top:0,behavior:"smooth"});}
function hasWord(term){return WORDS.find(function(w){return w.term.toLowerCase()===term.toLowerCase();});}
function marked(parent,text){
 var dict=(plan[window.LAW_PAST_ANSWERS[selected].id].difficult||[]).map(hasWord).filter(Boolean)
 .map(function(w){return w.term;}).sort(function(a,b){return b.length-a.length;});
 var start=0,low=text.toLowerCase(),n=0;
 while(start<text.length){
  var found=null;
  if(n<14)dict.forEach(function(term){
   var at=low.indexOf(term.toLowerCase(),start);
   while(at>=0){
    var left=at>0?text[at-1]:"",right=text[at+term.length]||"";
    if(!/[a-zA-Z]/.test(left)&&!/[a-zA-Z]/.test(right))break;
    at=low.indexOf(term.toLowerCase(),at+1);
   }
   if(at>=0&&(!found||at<found.at||(at===found.at&&term.length>found.term.length)))found={at:at,term:term};
  });
  if(!found){parent.appendChild(document.createTextNode(text.slice(start)));break;}
  if(found.at>start)parent.appendChild(document.createTextNode(text.slice(start,found.at)));
  let selectedTerm=found.term;
  var button=B(parent,text.slice(found.at,found.at+selectedTerm.length),function(){
   if(window.openLawWord)window.openLawWord(selectedTerm,"game");else location.hash="words";
  },"exam-term");button.title="Practise "+selectedTerm+" in the word game";
  start=found.at+found.term.length;n++;
 }
}
function markBadge(parent,n){E(parent,"strong",n+" marks","exam-marks");}
function list(parent,items,ordered){
 var node=E(parent,ordered?"ol":"ul");
 items.forEach(function(row){E(node,"li",row);});return node;
}
function section(parent,title){var p=E(parent,"section",undefined,"exam-panel");E(p,"h3",title);return p;}
function makeMarkdown(item,info){
 var lines=["# "+item.title,"","**Paper:** "+item.paper,"**Syllabus:** "+info.unitPath,"","## What the examiner is testing",info.interpretation,"","## How to think about the question"];
 info.think.forEach(function(t,i){lines.push((i+1)+". "+t);});
 lines.push("","## Required concepts");
 info.recall.forEach(function(t){lines.push("- **"+t+"**");});
 lines.push("","## Indicative 10-mark answer plan (not official)");
 info.marks.forEach(function(pair){lines.push("- **"+pair[1]+" marks:** "+pair[0]);});
 lines.push("","## Detailed model answer");
 item.sections.forEach(function(part){lines.push("","### "+part[0],"",part[1]);});
 lines.push("","## Sources");
 item.sources.forEach(function(x){lines.push("- ["+x[0]+"]("+x[1]+")");});
 return lines.join("\n");
}
function glossaryPage(){
 var item=window.LAW_PAST_ANSWERS[selected],info=plan[item.id];
 home.hidden=true;reader.hidden=true;glossary.hidden=false;glossary.replaceChildren();
 B(glossary,"← Back to answer",function(){glossary.hidden=true;reader.hidden=false;window.scrollTo({top:0,behavior:"smooth"});},"exam-back");
 E(glossary,"p","LEGAL VOCABULARY","exam-meta");
 E(glossary,"h2","Difficult words","exam-h1");
 E(glossary,"p","Open any term in the Learn tab for its definition, plain-language explanation and examples.","exam-intro");
 var list=E(glossary,"div",undefined,"exam-words");
 info.difficult.map(hasWord).filter(Boolean).forEach(function(w){
  var row=E(list,"article",undefined,"exam-worditem"),left=E(row,"div");
  E(left,"strong",w.term);E(left,"p",w.definition);
  B(row,"Learn →",function(){if(window.openLawWord)window.openLawWord(w.term,"learn");else location.hash="words";});
 });
 window.scrollTo({top:0,behavior:"smooth"});
}
function buildAnswer(){
 var item=window.LAW_PAST_ANSWERS[selected],info=plan[item.id];reader.replaceChildren();
 B(reader,"← Back to questions",goHome,"exam-back");
 E(reader,"p",item.paper+" · "+item.marks+" marks","exam-meta");
 E(reader,"h2",item.title,"exam-h1");
 E(reader,"p","Syllabus: "+info.unitPath,"exam-intro");
 var tools=E(reader,"div",undefined,"exam-toolrow");
 B(tools,"Study difficult words ↗",glossaryPage);
 B(tools,"Copy answer as Markdown",function(){
  var answer=makeMarkdown(item,info);
  if(navigator.clipboard&&navigator.clipboard.writeText){
   navigator.clipboard.writeText(answer).then(function(){this.textContent="Copied Markdown";}.bind(this)).catch(function(){window.prompt("Copy Markdown",answer);});
  }else window.prompt("Copy Markdown",answer);
 });
 var why=section(reader,"1. Decode the question");
 E(why,"p","Command: "+info.command);
 E(why,"p",info.interpretation);
 E(why,"p","Examiner's likely focus — a study interpretation, not the university's official marking scheme.","exam-hint");
 var think=section(reader,"2. How should I think?");
 list(think,info.think,true);
 var recall=section(reader,"3. Recall the syllabus concepts");
 E(recall,"p","Before writing, test whether you can recall these core concepts from your unit.","exam-hint");
 list(recall,info.recall,false);
 var skeleton=section(reader,"4. Plan a 10-mark answer");
 E(skeleton,"p","Illustrative allocation only: your examiner may use different criteria.","exam-hint");
 var ul=E(skeleton,"ul");
 info.marks.forEach(function(pair){
  var li=E(ul,"li");markBadge(li,pair[1]);E(li,"strong",pair[0]);
 });
 var model=section(reader,"5. Detailed model answer");
 E(model,"p","Use these headings as your point-by-point structure. The paragraphs explain what to write under each point.","exam-hint");
 item.sections.forEach(function(part,i){
  var block=E(model,"section",undefined,"exam-fullsection");
  E(block,"h4",part[0].match(/^\d+\./)?part[0]:(i===0?"Introduction":part[0]));
  var prose=E(block,"p");marked(prose,part[1]);
 });
 var foot=section(reader,"Sources and revision");
 var src=E(foot,"div",undefined,"exam-source");
 item.sources.forEach(function(pair){var a=E(src,"a",pair[0]+" ↗");a.href=pair[1];a.target="_blank";a.rel="noopener noreferrer";});
 E(foot,"p","Original model answers are learning aids, not an official marking key. Check currently applicable Acts and case law.","exam-hint");
 B(foot,"Revise difficult words →",glossaryPage);
}
function renderHome(){
 home.replaceChildren();
 E(home,"p","Two archived KSLU Contract–I questions with detailed original study answers. Select a question to see how to identify its syllabus unit, choose the necessary points and construct a full answer.","exam-intro");
 window.LAW_PAST_ANSWERS.forEach(function(item,i){
  var b=B(home,"",function(){showReader(i);},"exam-question");
  E(b,"small",item.paper+" · "+item.marks+" marks");
  E(b,"strong",(i+1)+". "+item.title);E(b,"small","Answer plan · core concepts · full model answer →");
 });
}
renderHome();
window.addEventListener("hashchange",function(){if(location.hash==="#papers")goHome();});
})();
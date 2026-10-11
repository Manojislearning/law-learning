/* Exam-style first-year legal practice. Fresh case order, user-controlled reveal,
 * case-specific IRAC comparison and self-check; no grading pretence or essay upload.
 */
(function(root){
"use strict";
var host=document.getElementById("practice-root"),core=root.LawCaseCore;
var banks={contract:root.LawCaseData,torts:root.LawTortsCaseData,bns:root.LawBnsCaseData};
var requested=new URLSearchParams(root.location.search).get("course");
var bankKey=Object.prototype.hasOwnProperty.call(banks,requested)?requested:"contract";
var bank=banks[bankKey];
if(!host||!core||!bank)return;
var histories={contract:new Map(),torts:new Map(),bns:new Map()},weakBySubject={contract:new Map(),torts:new Map(),bns:new Map()};
var history=histories[bankKey],weak=weakBySubject[bankKey],session=null,pos=0,analysed=0,skipped=0,mode="mixed";
try{core.verify(banks.contract);core.verify(banks.torts);core.verify(banks.bns);}catch(err){host.textContent="Case practice is unavailable: "+err.message;return;}
var css=document.createElement("style");css.textContent=".cp-wrap{max-width:710px;margin:0 auto;padding:9px 0 58px}.cp-wrap p{line-height:1.65;font-size:.91rem}.cp-eyebrow{font-size:.72rem;font-weight:850;letter-spacing:.055em;color:var(--muted);text-transform:uppercase}.cp-wrap h2{font-size:clamp(1.6rem,4.8vw,2rem);line-height:1.2;margin:8px 0 14px}.cp-panel{background:#fff;border:1px solid var(--line);border-radius:17px;padding:clamp(16px,4vw,24px);margin:13px 0}.cp-banner{background:#f4f6f8;border-radius:12px;padding:12px 15px;color:#243044;font-size:.84rem;line-height:1.5;margin:14px 0}.cp-button{display:block;width:100%;margin-top:12px;background:#101c2d;color:#fff;border:1px solid #101c2d;border-radius:12px;padding:12px 15px;font:inherit;font-weight:780;cursor:pointer}.cp-button.alt{background:white;color:#101c2d;border-color:var(--line)}.cp-button:focus-visible,.cp-wrap textarea:focus-visible,.cp-rubric input:focus-visible,.cp-wrap a:focus-visible{outline:3px solid #7691b3;outline-offset:3px}.cp-meta{display:flex;gap:10px;align-items:center;justify-content:space-between;color:var(--muted);font-size:.78rem;font-weight:800;margin-bottom:16px}.cp-facts{font-size:1rem!important;line-height:1.8!important;color:var(--text)}.cp-question{border-left:3px solid #1c304f;padding:8px 13px;margin:14px 0;font-weight:700}.cp-writing{display:block;font-size:.84rem;font-weight:750;margin-top:16px}.cp-writing textarea{width:100%;display:block;margin-top:9px;padding:12px;border:1px solid #b5c0ce;border-radius:12px;box-sizing:border-box;font:inherit;font-size:16px;line-height:1.6;resize:vertical;min-height:160px;background:#fff;color:var(--text)}.cp-help{font-size:.82rem;color:var(--muted);margin:16px 0}.cp-help summary{cursor:pointer;font-weight:750}.cp-error{color:#864324;font-size:.85rem;min-height:22px;margin-top:9px}.cp-model{background:#f2f5f8;border-radius:12px;padding:15px;margin:16px 0}.cp-model h3{font-size:.89rem;margin:17px 0 4px}.cp-model h3:first-child{margin-top:0}.cp-model p{margin:3px 0 12px}.cp-rubric{border:1px solid var(--line);border-radius:13px;padding:13px;margin-top:16px}.cp-rubric legend{font-size:.87rem;font-weight:800;padding:0 5px}.cp-rubric label{display:flex;gap:12px;align-items:flex-start;font-size:.85rem;line-height:1.5;margin:11px 0}.cp-rubric input{width:20px;height:20px;flex:none;accent-color:#1e4c71}.cp-result{font-size:.83rem;background:#f5f7f8;border-radius:10px;padding:12px;margin-top:10px}.cp-case-source{display:block;font-size:.82rem;color:#285988;margin:9px 0;line-height:1.5}.cp-topic{font-size:.85rem;color:var(--muted)}.cp-wrap [hidden]{display:none!important}.cp-coaching{margin:14px 0 0;background:#f1f5f8;border-radius:12px;padding:12px}.cp-coaching summary{min-height:44px;padding:9px 2px;cursor:pointer;font-size:.86rem;font-weight:760}.cp-coaching-list{padding-left:20px;margin:0}.cp-coaching-list li{line-height:1.6;font-size:.85rem;margin:8px 0;overflow-wrap:anywhere}.cp-coaching-list li:first-child{margin-top:0}.cp-coaching-list li:last-child{margin-bottom:0}.cp-rubric label{min-height:44px;padding:7px 0;cursor:pointer}.cp-rubric input{width:24px;height:24px}.cp-help summary{min-height:44px;padding:10px 2px;display:list-item}.cp-case-source{min-height:40px;padding:9px 0;overflow-wrap:anywhere}.cp-wrap button{min-height:44px}.cp-wrap h2:focus,.cp-model:focus{outline:none}.cp-wrap h2:focus-visible,.cp-model:focus-visible{outline:3px solid #7691b3;outline-offset:4px}.cp-subjects{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:15px 0}.cp-subjects .cp-button{margin:0;min-height:48px;min-width:0}.cp-subjects .cp-button[aria-pressed=true]{background:#101c2d;color:white;border-color:#101c2d}@media(max-width:350px){.cp-panel{padding:14px}.cp-meta{flex-wrap:wrap}.cp-coaching{padding:10px}.cp-subjects{grid-template-columns:repeat(2,minmax(0,1fr))}.cp-subjects .cp-button:last-child{grid-column:1/-1}}";document.head.appendChild(css);
function E(parent,tag,text,cl){
 var n=document.createElement(tag);if(cl)n.className=cl;if(text!==undefined)n.textContent=String(text);
 parent.appendChild(n);return n;
}
function B(parent,text,click,alt){
 var el=E(parent,"button",text,"cp-button"+(alt?" alt":""));el.type="button";el.addEventListener("click",click);return el;
}
function reset(){session=null;pos=0;analysed=0;skipped=0;mode="mixed";host.replaceChildren();}
function forgetSelfChecks(){Object.keys(weakBySubject).forEach(function(k){weakBySubject[k].clear();});}
function shell(){host.replaceChildren();return E(host,"div",undefined,"cp-wrap");}
function goHome(){root.LawAppCore.router.navigate("home");}
function courseName(){return bankKey==="torts"?"Law of Torts":bankKey==="bns"?"Criminal Law–I · BNS":"Contract–I";}
function openCourse(next){
 if(!Object.prototype.hasOwnProperty.call(banks,next))return false;
 bankKey=next;bank=banks[next];history=histories[next];weak=weakBySubject[next];dashboard();
 if(root.LawAppCore.router.current()!=="practice")root.LawAppCore.router.navigate("practice");
 return true;
}
function dashboard(){
 reset();
 var wrap=shell();
 E(wrap,"p","FIRST YEAR · "+courseName(),"cp-eyebrow");
 var dashboardTitle=E(wrap,"h2","Practise legal reasoning");
 dashboardTitle.tabIndex=-1;
 E(wrap,"p","Practise "+courseName()+" with five unfamiliar fact patterns, one from each syllabus unit. Write your own issue–rule–application–conclusion answer before reading the reference reasoning.");
 var subjects=E(wrap,"div",undefined,"cp-subjects");
 [["contract","Contract–I"],["torts","Law of Torts"],["bns","BNS · Criminal"]].forEach(function(entry){
  var btn=B(subjects,entry[1],function(){openCourse(entry[0]);},true);
  btn.setAttribute("aria-pressed",String(entry[0]===bankKey));
 });
 E(wrap,"p","These are original study problems, not official KSLU examination questions or examiner-marked answers.","cp-banner");
 var panel=E(wrap,"section",undefined,"cp-panel");
 E(panel,"h3","Mixed five-case practice");
 E(panel,"p","Each set mixes five units. Completed cases count toward rotation; skipped cases remain eligible next time. Three completed sets cover all fifteen cases in this subject.");
 B(panel,"Start 5 cases →",start);
 if(weak.size)B(panel,"Retry "+weak.size+" weak or skipped case"+(weak.size===1?"":"s")+" →",startWeakReview,true);
 var notes=E(wrap,"details",undefined,"cp-help");
 E(notes,"summary","What is IRAC?");
 E(notes,"p","Issue: what legal question arises? Rule: which statute or principle applies? Application: connect the rule to facts for and against each side. Conclusion: give a qualified outcome.");
 B(wrap,"Back to home",goHome,true);
 E(wrap,"p","Your written answers and rubric choices stay on this page only, and are discarded when you leave the practice session. No account, upload, score or automatic legal grading.","cp-topic");
 if(typeof dashboardTitle.focus==="function")dashboardTitle.focus();
}
function start(){
 session=core.select(bank,history);mode="mixed";
 pos=0;analysed=0;skipped=0;
 draw();
}
function startWeakReview(){
 var pending=bank.cases.filter(function(c){return weak.has(c.id);});
 if(!pending.length){dashboard();return;}
 session=pending.slice(0,5);mode="retry";pos=0;analysed=0;skipped=0;draw();
}
function advance(completed,checks,assessed){
 var c=session[pos];
 if(completed){
  analysed++;
  core.recordUsage(history,[c]);
  var missed=core.criteria.filter(function(key,i){return !checks[i];});
  if(!assessed)weak.set(c.id,{status:"not self-assessed",missing:[]});
  else if(missed.length)weak.set(c.id,{status:"self-identified gaps",missing:missed});
  else weak.delete(c.id);
 }else{
  skipped++;
  if(!weak.has(c.id))weak.set(c.id,{status:"skipped",missing:[]});
 }
 pos++;if(pos>=session.length)finish();else draw();
}
function draw(){
 var c=session[pos];
 var wrap=shell();
 E(wrap,"p",mode==="retry"?"SECOND ATTEMPT · NO ANSWER HINTS":"EXAM PRACTICE · NO TOPIC HINTS","cp-eyebrow");
 var box=E(wrap,"article",undefined,"cp-panel");
 var meta=E(box,"div",undefined,"cp-meta");
 E(meta,"span","Case "+(pos+1)+" / "+session.length);E(meta,"span",courseName());
 var heading=E(box,"h2","Read the facts");heading.tabIndex=-1;
 E(box,"p",c.facts,"cp-facts");
 E(box,"p",c.task,"cp-question");
 if(mode==="retry")E(box,"p","Try again from memory before opening the reference. Your earlier answer is not shown or saved.","cp-topic");
 var help=E(box,"details",undefined,"cp-help");
 E(help,"summary","Need an answer structure?");
 E(help,"p","Issue · Rule · Application · Conclusion. Identify both supporting facts and possible limitations. The exact statute is deliberately hidden until review.");
 var label=E(box,"label","Write your legal analysis","cp-writing");
 var draft=E(label,"textarea");draft.rows=7;draft.maxLength=4200;
 draft.placeholder="Issue:\nRule:\nApplication:\nConclusion:";
 var warning=E(box,"p","","cp-error");warning.setAttribute("role","status");warning.setAttribute("aria-live","polite");
 var button=B(box,"Reveal reference reasoning →",function(){
  if(draft.value.trim().length<40){warning.textContent="Write at least a short legal explanation (40 characters) before comparing.";return;}
  button.hidden=true;draft.readOnly=true;warning.textContent="";
  model.hidden=false;rubric.hidden=false;finishBtn.hidden=false;skip.hidden=true;
  if(typeof model.focus==="function")model.focus();
 });
 var model=E(box,"section",undefined,"cp-model");model.hidden=true;model.tabIndex=-1;
 E(model,"p",courseName()+" · Unit "+["","I","II","III","IV","V"][c.unit]+" · "+c.title,"cp-eyebrow");
 ["issue","rule","application","conclusion"].forEach(function(key){
  E(model,"h3",key[0].toUpperCase()+key.slice(1));
  E(model,"p",c.outline[key]);
 });
 E(model,"h3","Common mistake");E(model,"p",c.trap);
 E(model,"p","Reference analysis only. Alternative legally sound conclusions may be justified by additional facts or authorities.","cp-topic");
 var refs=E(model,"details",undefined,"cp-help");E(refs,"summary","Open source judgments and legislation");
 c.sourceIds.forEach(function(id){
  var src=bank.sources[id],link=E(refs,"a",src.title+" ↗","cp-case-source");
  link.href=src.url;link.target="_blank";link.rel="noopener noreferrer";
 });
 var rubric=E(box,"fieldset",undefined,"cp-rubric");rubric.hidden=true;
 E(rubric,"legend","Self-check your answer (not a grade)");
 var markers=[
   ["issue","I identified the central legal question."],
   ["rule","I identified the applicable statutory provision or principle."],
   ["application","I applied specific facts and addressed a possible limitation."],
   ["conclusion","I reached a qualified conclusion supported by my reasoning."]
 ];
 var picks=[],assessed=false;
 markers.forEach(function(item){
  var label=E(rubric,"label"),input=E(label,"input");input.type="checkbox";
  picks.push(input);E(label,"span",item[1]);
 });
 var status=E(rubric,"p","Tick only the elements you included. Leave the checklist untouched if you prefer not to assess; the case will be flagged for review.","cp-result");
 status.setAttribute("role","status");status.setAttribute("aria-live","polite");
 var guidance=E(rubric,"details",undefined,"cp-coaching");
 var guidanceTitle=E(guidance,"summary","Review suggestions for missed elements");
 var tips=E(guidance,"ul",undefined,"cp-coaching-list");
 function update(){
  var checks=picks.map(function(x){return x.checked;});
  var n=checks.filter(Boolean).length;
  status.textContent=n+" of 4 elements self-checked. Not an examination mark.";
  tips.replaceChildren();
  var missing=core.missingGuidance(c,checks);
  guidanceTitle.textContent=missing.length?"Review "+missing.length+" unchecked IRAC element"+(missing.length===1?"":"s"):"All four IRAC elements self-checked";
  if(!missing.length){
   E(tips,"li","All four criteria selected. Confirm they appear in your original answer before moving on.");
  } else {
   missing.forEach(function(tip){E(tips,"li",tip.message);});
  }
 }
 picks.forEach(function(p){p.addEventListener("change",function(){assessed=true;update();});});
 update();
 var finishBtn=B(box,"Next case →",function(){advance(true,picks.map(function(x){return x.checked;}),assessed);});finishBtn.hidden=true;
 var skip=B(wrap,"Skip case",function(){advance(false);},true);
 B(wrap,"End practice",dashboard,true);
 if(typeof heading.focus==="function")heading.focus();
}
function finish(){
 var wrap=shell(),box=E(wrap,"section",undefined,"cp-panel");
 E(box,"p","PRACTICE SESSION COMPLETE","cp-eyebrow");
 var finishedTitle=E(box,"h2","You finished the set");finishedTitle.tabIndex=-1;
 E(box,"p",analysed+" case"+(analysed===1?"":"s")+" compared with reference reasoning; "+skipped+" skipped. Skips do not count as completed learning. No essay grade was assigned.");
 E(box,"p","The next set prioritises cases you have not completed in this open visit. Your self-checked missing IRAC steps can be retried with the reference answer hidden again.","cp-topic");
 if(weak.size){
  E(box,"p",weak.size+" case"+(weak.size===1?" needs":"s need")+" another attempt: skipped, not self-checked, or marked incomplete in your own IRAC checklist.","cp-topic");
  B(box,"Retry "+weak.size+" weak or skipped case"+(weak.size===1?"":"s")+" →",startWeakReview);
 }else E(box,"p","No cases currently flagged for a retry. This does not certify exam mastery.","cp-topic");
 B(box,"Try a different set →",start);
 B(box,"Return to practice overview",dashboard,true);
 B(wrap,"Home",goHome,true);
 if(typeof finishedTitle.focus==="function")finishedTitle.focus();
}
root.LawCasePracticeUI={show:dashboard,reset:reset,open:openCourse};
root.LawAppCore.router.subscribe(function(route){
 if(route==="practice")dashboard();
 else {if(session)reset();forgetSelfChecks();} /* Discard drafts and self-check flags on departure. */
});
if(root.LawAppCore.router.current()==="practice")dashboard();
})(typeof window!=="undefined"?window:globalThis);

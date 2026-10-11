/* Offline recall, independent of word-game XP. Attempts require active recall before reveal. */
(function(root){
"use strict";
var host=document.getElementById("review-root"),core=root.LawReviewCore;
if(!host||!core)return;
var style=document.createElement("style");style.textContent=".review-ui{max-width:680px;margin:0 auto;padding:10px 0 50px;color:var(--text)}.review-ui button{cursor:pointer;font:inherit}.review-ui h2{font-size:1.8rem;margin:8px 0}.review-ui p{font-size:.9rem;line-height:1.55}.review-small{font-size:.78rem!important;color:var(--muted)}.review-stats{display:flex;gap:8px;margin:17px 0}.review-stat{flex:1;background:white;border:1px solid var(--line);border-radius:13px;padding:13px}.review-stat strong{display:block;font-size:1.4rem}.review-stat small{font-size:.74rem;color:var(--muted)}.review-panel{background:white;border:1px solid var(--line);padding:18px;border-radius:16px;margin:13px 0}.review-panel h3{font-size:1.05rem;margin:2px 0 8px}.review-main,.review-secondary{display:block;width:100%;padding:12px;border-radius:11px;font-weight:750;margin-top:11px}.review-main{background:#0d1321;border:1px solid #0d1321;color:white}.review-secondary{background:white;border:1px solid var(--line);color:var(--text)}.review-prompt{font-size:1.1rem!important;line-height:1.5!important;font-weight:650}.review-meta{display:flex;justify-content:space-between;color:var(--muted);font-size:.76rem;font-weight:800}.review-card textarea{display:block;width:100%;box-sizing:border-box;font:inherit;font-size:16px;line-height:1.5;resize:vertical;border:1px solid #bac4d2;border-radius:11px;padding:11px;min-height:100px;background:#fff;color:var(--text)}.review-label{display:block;font-size:.85rem;font-weight:750;margin:16px 0 9px}.review-aloud{display:flex;gap:10px;align-items:center;font-size:.82rem;margin:14px 0}.review-aloud input{width:18px;height:18px}.review-answer{padding:14px;background:#f3f5f8;border-radius:13px;margin:13px 0}.review-answer h4{font-size:.82rem;margin:13px 0 3px}.review-answer p{margin:4px 0 9px}.review-choices{display:grid;grid-template-columns:1fr 1fr;gap:10px}.review-choices button{border:1px solid var(--line);background:white;border-radius:11px;padding:12px;font-weight:750;color:var(--text)}.review-choices button:last-child{background:#edf5ef;border-color:#bad1c3}.review-result{background:#f2f4f6;padding:16px;border-radius:13px}.review-status{color:#79491b!important;min-height:1.25rem}.review-ui button:focus-visible,.review-ui textarea:focus-visible{outline:3px solid #8ca2c0;outline-offset:3px}@media(max-width:360px){.review-choices{grid-template-columns:1fr}}";document.head.appendChild(style);
var units=[root.ContractUnitOneData,root.ContractUnitTwoData,root.ContractUnitThreeData,root.ContractUnitFourData,root.ContractUnitFiveData];
var cards=[],map=new Map(),queue=[],offset=0,done=0;
try{cards=core.catalog(units);cards.forEach(function(x){map.set(x.id,x);});}
catch(err){host.textContent="Review content unavailable: "+err.message;return;}
function E(p,t,v,c){var n=document.createElement(t);if(c)n.className=c;if(v!==undefined)n.textContent=String(v);p.appendChild(n);return n;}
function B(p,t,fn,c){var b=E(p,"button",t,c);b.type="button";if(fn)b.addEventListener("click",fn);return b;}
function shell(){host.replaceChildren();return E(host,"div",undefined,"review-ui");}
function refresh(){
 var el=document.getElementById("review-dashboard-count");if(!el)return;
 try{var x=core.summary(root.localStorage,cards);el.textContent=x.due.length+" due · "+x.newCards.length+" not started";}
 catch(err){el.textContent="Review data needs attention";}
}
function dashboard(){
 var wrap=shell(),summary;
 try{summary=core.summary(root.localStorage,cards);}
 catch(err){
  E(wrap,"h2","Review data needs attention");
  E(wrap,"p","Your saved review history could not be read. It was not reset. Restore a trusted backup from Profile if required.");
  E(wrap,"p",err.message,"review-small");return;
 }
 E(wrap,"p","CONTRACT–I · SPACED REVISION","review-small");
 E(wrap,"h2","Review what matters");
 E(wrap,"p","Recall the rule first; compare the explanation; then decide whether you remembered it. No points, streak pressure or pretend exam grades.");
 var row=E(wrap,"div",undefined,"review-stats");
 [[summary.due.length,"Due now"],[summary.studied,"Started"],[summary.newCards.length,"Not started"]].forEach(function(item){
  var box=E(row,"div",undefined,"review-stat");E(box,"strong",item[0]);E(box,"small",item[1]);
 });
 var d=E(wrap,"section",undefined,"review-panel");
 E(d,"h3",summary.due.length?"Ready for retrieval":"Nothing due right now");
 E(d,"p",summary.due.length?"Try up to ten questions across the syllabus.":summary.nextDue?"Next due "+new Date(summary.nextDue).toLocaleString()+".":"Review dates will appear after your first study or recall attempt.","review-small");
 if(summary.due.length)B(d,"Review "+Math.min(10,summary.due.length)+" due concepts →",function(){begin(summary.due.slice(0,10));},"review-main");
 if(summary.newCards.length){
  var n=E(wrap,"section",undefined,"review-panel");E(n,"h3","Learn a new concept");
  E(n,"p","Start three concepts you have not reviewed yet. You can study them in more detail from the Syllabus page.","review-small");
  B(n,"Try 3 new concepts →",function(){begin(summary.newCards.slice(0,3));},"review-main");
 }
 E(wrap,"p","Successful self-rated recall schedules 1, 3, 7, 14, 30 and 60 days. A missed item returns after ten minutes. Multiple-choice recognition cannot advance your recall stage.","review-small");
 B(wrap,"Home",function(){root.LawAppCore.router.navigate("home");},"review-secondary");
}
function begin(selection){queue=selection.map(function(x){return x.id;});offset=0;done=0;next();}
function next(){
 var id=queue[offset];if(!id){finish();return;}
 var item=map.get(id),wrap=shell(),panel=E(wrap,"section",undefined,"review-panel");
 var meta=E(panel,"div",undefined,"review-meta");E(meta,"span","Contract–I · Unit "+["","I","II","III","IV","V"][item.unit]);E(meta,"span",(offset+1)+" / "+queue.length);
 E(panel,"h2",item.title);
 E(panel,"p",item.question,"review-prompt");
 E(panel,"p","Answer in your own words, or speak it before revealing the reference answer.","review-small");
 var label=E(panel,"label","Your short answer","review-label");
 var area=E(label,"textarea",undefined,"review-input");area.rows=3;area.maxLength=1200;area.placeholder="State the legal rule and, if possible, explain why…";
 var oral=E(panel,"label",undefined,"review-aloud");var check=E(oral,"input");check.type="checkbox";E(oral,"span","I answered aloud");
 var notice=E(panel,"p","","review-status");notice.setAttribute("role","status");notice.setAttribute("aria-live","polite");
 var reveal=B(panel,"Show the reference answer →",function(){
  if(area.value.trim().length<8&&!check.checked){notice.textContent="Write a short answer, or confirm that you answered aloud.";return;}
  reveal.hidden=true;area.readOnly=true;check.disabled=true;answer.hidden=false;rating.hidden=false;notice.textContent="";
 },"review-main");
 var answer=E(panel,"div",undefined,"review-answer");answer.hidden=true;
 E(answer,"h4","Reference answer");E(answer,"p",item.answer);
 E(answer,"h4","Why");E(answer,"p",item.why);
 E(answer,"h4",item.section);E(answer,"p",item.rule);
 E(answer,"h4","Exam answer");E(answer,"p",item.exam);
 E(answer,"p","This is a suggested explanation, not an automatic mark or certification of mastery.","review-small");
 var rating=E(panel,"div",undefined,"review-choices");rating.hidden=true;
 function finishCard(grade){
  try{core.recall(root.localStorage,id,grade);}catch(err){notice.textContent="Could not save the review: "+err.message;return;}
  done++;offset++;refresh();next();
 }
 B(rating,"Again · 10 minutes",function(){finishCard("again");});
 B(rating,"Recalled · schedule",function(){finishCard("good");});
 B(wrap,"Skip",function(){offset++;next();},"review-secondary");
 B(wrap,"End review",dashboard,"review-secondary");
}
function finish(){
 var wrap=shell(),box=E(wrap,"div",undefined,"review-result");
 E(box,"h2","Session complete");
 E(box,"p",done+" review attempt"+(done===1?"":"s")+" scheduled. A correct recall is progress, not proof of permanent mastery.");
 B(wrap,"Review dashboard",dashboard,"review-main");
 B(wrap,"Home",function(){root.LawAppCore.router.navigate("home");},"review-secondary");
}
root.LawReviewUI={show:dashboard,refresh:refresh};
root.LawAppCore.router.subscribe(function(route){if(route==="review")dashboard();else refresh();});
refresh();
if(root.LawAppCore.router.current()==="review")dashboard();
})(typeof window!=="undefined"?window:globalThis);

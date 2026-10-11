/* Shared Contract I lesson renderer for Units I and II. No artificial mastery/score changes. */
(function(root){
"use strict";
var sheet=document.createElement("style");sheet.textContent=".c1-guide{max-width:680px;margin:auto;padding:4px 0 45px}.c1-top{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:16px}.c1-back{background:#fff;border:1px solid var(--line);border-radius:11px;padding:11px;font:inherit;color:var(--text);font-weight:750}.c1-count{font-size:.79rem;color:var(--muted);font-weight:800}.c1-card{background:#fff;border:1px solid var(--line);border-radius:17px;padding:clamp(17px,4vw,24px)}.c1-card h2{font-size:clamp(1.6rem,6vw,2.1rem);margin:6px 0 13px;line-height:1.2}.c1-card h3{font-size:.97rem;margin:20px 0 6px}.c1-card p{font-size:.94rem;line-height:1.65;margin:8px 0}.c1-muted{font-size:.82rem!important;color:var(--muted);line-height:1.5}.c1-simple{border-radius:12px;background:#f3f5f7;padding:14px;margin:14px 0}.c1-simple strong{font-size:.85rem}.c1-simple p{margin:5px 0!important}.c1-rule{border-left:3px solid #32445d;padding-left:12px}.c1-option{display:block;width:100%;border:1px solid var(--line);border-radius:12px;background:#f8f9fb;text-align:left;font:inherit;font-size:.9rem;color:var(--text);line-height:1.5;padding:13px;margin:8px 0}.c1-option.correct{background:#e8f6ec;border-color:#288455}.c1-option.wrong{background:#fff0ee;border-color:#b35b59}.c1-feedback{margin-top:14px;background:#f2f4f6;border-radius:12px;padding:13px;font-size:.88rem;line-height:1.6}.c1-feedback.correct{background:#e8f6ec}.c1-next{display:block;width:100%;background:#0d1321;color:#fff;border:0;border-radius:12px;padding:13px;font:inherit;font-weight:750;margin-top:15px}.c1-terms{display:flex;flex-wrap:wrap;gap:8px;margin:15px 0}.c1-terms button{border:1px solid var(--line);border-radius:10px;background:#f5f7f8;color:var(--text);padding:9px;font:inherit;font-size:.8rem;font-weight:700}.c1-sources{border:1px solid var(--line);background:#fff;border-radius:13px;padding:0;margin:12px 0}.c1-sources summary{cursor:pointer;padding:14px;font-weight:700;font-size:.86rem}.c1-sources-body{padding:0 14px 12px}.c1-sources-body a{display:block;margin:10px 0;font-size:.84rem;color:#275c93}.c1-swipe{text-align:center;color:var(--muted);font-size:.74rem;padding:5px}.c1-lesson-number{font-size:.75rem;font-weight:750;color:var(--muted)}@media(prefers-reduced-motion:no-preference){@keyframes c1go{from{opacity:.35;transform:translateX(14px)}to{opacity:1;transform:translateX(0)}}@keyframes c1back{from{opacity:.35;transform:translateX(-14px)}to{opacity:1;transform:translateX(0)}}.c1-guide.forward .c1-card{animation:c1go .24s ease-out}.c1-guide.backward .c1-card{animation:c1back .24s ease-out}}";document.head.appendChild(sheet);
function E(parent,tag,text,cls){
 var n=document.createElement(tag);if(cls)n.className=cls;
 if(text!==undefined)n.textContent=text;
 parent.appendChild(n);return n;
}
function B(parent,text,callback,cls){
 var b=E(parent,"button",text,cls);b.type="button";b.addEventListener("click",callback);return b;
}
function createGuide(data){
if(!data||!Array.isArray(data.lessons))return null;
function render(container,opts){
 var index=Number.isInteger(opts.index)?opts.index:0;
 index=Math.min(data.lessons.length-1,Math.max(0,index));
 var info=data.lessons[index],answered=false;
 container.replaceChildren();
 var outer=E(container,"section",undefined,"c1-guide "+(opts.direction==="backward"?"backward":"forward"));
 var nav=E(outer,"div",undefined,"c1-top");
 B(nav,"← Unit "+(data.unitLabel||"I"),opts.onBack,"c1-back");
 E(nav,"span","Lesson "+(index+1)+" / "+data.lessons.length,"c1-count");
 var body=E(outer,"article",undefined,"c1-card");
 E(body,"span","Contract–I · Unit "+(data.unitLabel||"I"),"c1-lesson-number");
 E(body,"h2",info.title);
 E(body,"p",info.section,"c1-muted");
 var rule=E(body,"div",undefined,"c1-rule");
 E(rule,"h3","The legal rule");E(rule,"p",info.focus);
 var simple=E(body,"div",undefined,"c1-simple");
 E(simple,"strong","In simple words");E(simple,"p",info.plain);
 E(body,"h3","Example");E(body,"p",info.example);
 E(body,"h3","Don't confuse");E(body,"p",info.pitfall);
 E(body,"h3","Exam answer");E(body,"p",info.exam);
 E(body,"h3","Check your understanding");E(body,"p",info.prompt);
 var options=E(body,"div",undefined,"c1-options");
 var result=E(body,"div",undefined,"c1-feedback");result.hidden=true;
 info.choices.forEach(function(choice,n){
  var btn=B(options,choice,function(){
   if(answered)return;answered=true;
   Array.from(options.children).forEach(function(b,i){
     b.disabled=true;
     if(i===info.answer)b.classList.add("correct");
   });
   if(n!==info.answer)btn.classList.add("wrong");
   result.textContent=(n===info.answer?"Correct. ":"Not quite. ")+info.why;
   result.classList.toggle("correct",n===info.answer);
   result.hidden=false;next.hidden=false;
  },"c1-option");
 });
 var next=B(body,index===data.lessons.length-1?"Finish · Back to unit →":"Next lesson →",function(){
  if(index===data.lessons.length-1)opts.onBack();
  else opts.onMove(index+1,"forward");
 },"c1-next");
 next.hidden=true;
 var terms=E(outer,"div",undefined,"c1-terms");
 info.terms.forEach(function(term){
  B(terms,"Learn "+term+" ↗",function(){
   if(typeof root.openLawWord==="function")root.openLawWord(term,"learn");
   else root.location.hash="words";
  });
 });
 var sourceBox=E(outer,"details",undefined,"c1-sources");
 E(sourceBox,"summary","Official sources & edition");
 var references=E(sourceBox,"div",undefined,"c1-sources-body");
 E(references,"p",data.syllabusEdition+". "+data.cohortStatus,"c1-muted");
 info.refs.forEach(function(r){
  var item=data.sources[r];if(!item)return;
  var a=E(references,"a",item.title+" ↗");
  a.href=item.url;a.target="_blank";a.rel="noopener noreferrer";
 });
 E(outer,"p","Swipe left or right to move between lessons.","c1-swipe");
 var touch=null;
 outer.addEventListener("touchstart",function(e){
  if(e.touches.length!==1||e.target.closest("button,a,input,textarea,summary")){touch=null;return;}
  touch={x:e.touches[0].clientX,y:e.touches[0].clientY};
 },{passive:true});
 outer.addEventListener("touchend",function(e){
  if(!touch||!e.changedTouches.length)return;
  var x=e.changedTouches[0].clientX-touch.x,y=e.changedTouches[0].clientY-touch.y;
  touch=null;
  if(Math.abs(x)<65||Math.abs(x)<Math.abs(y)*1.6)return;
  if(x<0&&index<data.lessons.length-1)opts.onMove(index+1,"forward");
  if(x>0&&index>0)opts.onMove(index-1,"backward");
 },{passive:true});
 if(typeof root.scrollTo==="function")root.scrollTo({top:0,behavior:"auto"});
}
return {render:render,lessons:data.lessons};
}
root.ContractUnitOneUI=createGuide(root.ContractUnitOneData);
root.ContractUnitTwoUI=createGuide(root.ContractUnitTwoData);
})(typeof window!=="undefined"?window:globalThis);
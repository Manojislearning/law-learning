/* Accessible primary-source statutory mini-reference. No personal data, no mastery claims. */
(function(root){
"use strict";
var mount=document.getElementById("law-updates-root"),core=root.LawAccuracyCore,d=root.LawAccuracyData;
if(!mount||!core||!d)return;
try{core.verify(d);}catch(e){mount.textContent="Statutory study notes are unavailable: "+e.message;return;}
var style=document.createElement("style");style.textContent=".law-check{max-width:700px;margin:0 auto;padding:10px 0 60px}.law-check h2{font-size:clamp(1.55rem,4vw,2rem);margin:8px 0 10px;line-height:1.2}.law-check h3{font-size:1.13rem;line-height:1.35;margin:6px 0 12px}.law-check p{font-size:.91rem;line-height:1.65;margin:10px 0}.law-check small{font-size:.77rem;color:var(--muted)}.law-panel{border:1px solid var(--line);border-radius:16px;padding:17px;background:#fff;margin:13px 0}.law-pill{font-size:.72rem;letter-spacing:.04em;font-weight:850;text-transform:uppercase;color:#42607c}.law-controls{display:grid;grid-template-columns:repeat(3,minmax(0,1fr);gap:9px;margin:17px 0}.law-check button{font:inherit;cursor:pointer;min-height:45px;border-radius:11px;padding:10px 13px}.law-tab{min-width:0;overflow-wrap:anywhere;border:1px solid var(--line);background:#fff;color:var(--text);font-weight:760}.law-tab[aria-pressed=\"true\"]{background:#101c2d;color:white;border-color:#101c2d}.law-example{padding:12px 13px;background:#f2f5f8;border-radius:10px}.law-mistake{border-left:3px solid #a77843;padding:9px 13px;background:#faf8f4;border-radius:0 10px 10px 0}.law-answers{display:grid;gap:9px;margin:11px 0}.law-answer{background:white;border:1px solid #c8d0da;text-align:left;color:var(--text);font-size:.86rem}.law-answer.correct{border-color:#448560;background:#edf6ef}.law-answer.wrong{border-color:#aa674f;background:#fbefeb}.law-answer[disabled]{cursor:default;opacity:1}.law-feedback{border-radius:10px;background:#edf3f7;padding:13px;font-size:.87rem;line-height:1.6}.law-feedback[hidden]{display:none!important}.law-feedback[role=\"status\"]{min-height:24px}.law-next{display:flex;gap:9px;align-items:stretch;margin:13px 0}.law-next button{flex:1;min-width:0;border:1px solid var(--line);background:white;color:var(--text);font-size:.86rem;font-weight:800}.law-next button:last-child{color:white;background:#101c2d;border-color:#101c2d}.law-next button:disabled{opacity:.45}.law-source{display:block;color:#265b84;font-size:.81rem;line-height:1.55;padding:9px 0;overflow-wrap:anywhere}.law-check button:focus-visible,.law-source:focus-visible{outline:3px solid #7994b5;outline-offset:3px}.law-check .law-audit-note{font-size:.81rem;color:var(--muted);padding:11px 0}.law-guide-heading:focus{outline:none}@media(max-width:340px){.law-next{flex-direction:column}.law-controls{grid-template-columns:repeat(2,minmax(0,1fr))}.law-controls .law-tab:last-child{grid-column:1/-1}}";document.head.appendChild(style);
var defaultTopic=new URLSearchParams(root.location.search).get("law");
var topic=(defaultTopic==="bns"||defaultTopic==="consumer"||defaultTopic==="motor")?defaultTopic:"bns",index=0;
function E(parent,tag,contents,klass){
 var node=document.createElement(tag);if(klass)node.className=klass;
 if(contents!==undefined)node.textContent=String(contents);parent.appendChild(node);return node;
}
function B(parent,text,onClick,klass){
 var button=E(parent,"button",text,klass);button.type="button";if(onClick)button.addEventListener("click",onClick);return button;
}
function select(next){
 if(next!=="bns"&&next!=="consumer"&&next!=="motor")return false;
 topic=next;index=0;
 if(root.LawAppCore.router.current()!=="law-updates")root.LawAppCore.router.navigate("law-updates");
 render();return true;
}
function render(){
 var cards=core.cardsFor(d,topic),item=cards[index];
 mount.replaceChildren();
 var rootBox=E(mount,"div",undefined,"law-check");
 E(rootBox,"div","KSLU · SELECTED CURRENT-LAW CORRECTIONS","law-pill");
 var title=E(rootBox,"h2","Current Law Check","law-guide-heading");
 title.tabIndex=-1;
 E(rootBox,"p","Check high-risk statute changes and section numbers before relying on an older syllabus summary. These are selected source-checked notes, not a complete legal commentary.");
 var nav=E(rootBox,"div",undefined,"law-controls");
 d.topics.forEach(function(entry){
  var t=entry.id,name=entry.short;
  var btn=B(nav,name,function(){select(t);},"law-tab");
  btn.setAttribute("aria-pressed",String(topic===t));
 });
 var card=E(rootBox,"article",undefined,"law-panel");
 var selected=d.topics.find(function(x){return x.id===topic;});
 E(card,"div",(selected?selected.short:topic)+" · "+(index+1)+" / "+cards.length,"law-pill");
 E(card,"h3",item.title);
 E(card,"p",item.section,"law-audit-note");
 E(card,"h4","The rule");
 E(card,"p",item.rule);
 var ex=E(card,"div",undefined,"law-example");E(ex,"strong","Example");E(ex,"p",item.example);
 var trap=E(card,"div",undefined,"law-mistake");E(trap,"strong","Common mistake");E(trap,"p",item.mistake);
 E(card,"h4","Check your understanding");
 E(card,"p",item.question);
 var group=E(card,"div",undefined,"law-answers");
 var feedback=E(card,"p","","law-feedback");feedback.hidden=true;feedback.setAttribute("role","status");feedback.setAttribute("aria-live","polite");
 var indices=[0,1,2];
 for(var i=2;i>0;i--){var j=Math.floor(Math.random()*(i+1)),tmp=indices[i];indices[i]=indices[j];indices[j]=tmp;}
 var buttons=[];
 indices.forEach(function(original){
  var button=B(group,item.choices[original],function(){
   if(buttons.some(function(x){return x.disabled;}))return;
   var correct=original===item.answer;
   buttons.forEach(function(b){b.disabled=true;if(b.textContent===item.choices[item.answer])b.classList.add("correct");});
   if(!correct)button.classList.add("wrong");
   feedback.textContent=(correct?"Correct. ":"Not quite. ")+item.why;
   feedback.hidden=false;
  },"law-answer");
  buttons.push(button);
 });
 var sources=E(card,"details",undefined,"law-references");
 E(sources,"summary","Official primary references");
 item.refs.forEach(function(ref){
  var s=d.sources[ref];if(!s)return;
  var link=E(sources,"a",s.title+" ↗","law-source");
  link.href=s.url;link.target="_blank";link.rel="noopener noreferrer";
 });
 var switches=E(rootBox,"div",undefined,"law-next");
 var prev=B(switches,"← Previous",function(){index=Math.max(0,index-1);render();},"law-prev");prev.disabled=index===0;
 B(switches,index===cards.length-1?"Start this subject again ↻":"Next rule →",function(){index=(index+1)%cards.length;render();},"law-forward");
 E(rootBox,"p",d.claimScope,"law-audit-note");
 B(rootBox,"Back to syllabus",function(){root.LawAppCore.router.navigate("syllabus");},"law-tab");
 if(root.LawAppCore.router.current()==="law-updates"&&typeof title.focus==="function")title.focus();
}
root.LawAccuracyUI={open:select,render:render};
root.LawAppCore.router.subscribe(function(route){if(route==="law-updates")render();});
if(root.LawAppCore.router.current()==="law-updates")render();
})(typeof window!=="undefined"?window:globalThis);

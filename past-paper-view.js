/* Two archived KSLU Contract I exam questions with detailed study answers. */
(function(){
"use strict";
var target=document.getElementById("papers-view");
if(!target||!Array.isArray(window.LAW_PAST_ANSWERS))return;
var style=document.createElement("style");style.textContent="#papers-view .section-head{margin-bottom:16px}\n#papers-view .paper-toolbar,#papers-view #question-list,#papers-view .notice{display:none!important}\n.paper-answers{max-width:760px;margin:0 auto}\n.paper-intro{font-size:.87rem;line-height:1.6;color:var(--muted);margin:0 0 14px}\n.paper-question{border:1px solid var(--line);background:white;border-radius:18px;overflow:hidden;margin-bottom:12px}\n.paper-question summary{cursor:pointer;list-style:none;padding:17px}\n.paper-question summary::-webkit-details-marker{display:none}\n.paper-question summary strong{display:block;margin-top:8px;font-size:1.02rem;line-height:1.48}\n.paper-meta{font-size:.74rem;color:var(--muted);font-weight:750}\n.paper-answer{border-top:1px solid var(--line);padding:16px}\n.paper-answer section{margin-bottom:20px}\n.paper-answer h3{font-size:1.04rem;margin:0 0 8px}\n.paper-answer p{font-size:.93rem;line-height:1.77;margin:0 0 10px}\n.paper-term{display:inline;padding:0;border:0;border-bottom:1px dotted #255b9b;background:transparent;color:#255b9b;font:inherit;font-weight:650;cursor:pointer;vertical-align:baseline}\n.paper-sources{border-top:1px solid var(--line);padding-top:13px}\n.paper-sources a{display:block;margin:8px 0;font-size:.8rem;text-decoration:underline;color:#22599d}\n.paper-note{font-size:.8rem;color:var(--muted);line-height:1.5;margin:10px 0}\n.paper-tag{display:inline-block;margin:0 5px 5px 0;padding:7px 9px;background:#f3f5f7;border-radius:9px;font-size:.72rem}\n";document.head.appendChild(style);
var original=target.querySelector(".section-head h2");if(original)original.textContent="Past Papers";
var blurb=target.querySelector(".section-head .muted");if(blurb)blurb.textContent="Two authentic archived Contract–I questions with detailed model answers. Tap a legal term to practise it in the Words game.";
var root=document.createElement("div");root.className="paper-answers";var toolbar=target.querySelector(".paper-toolbar");
target.insertBefore(root,toolbar);
function E(parent,tag,content,cls){var n=document.createElement(tag);if(cls)n.className=cls;if(content!==undefined)n.textContent=content;parent.appendChild(n);return n;}
E(root,"p","These are independently written study answers (not an official KSLU answer key). The examination questions come from an archived reproduction. Verify the original paper and current law for assessment.","paper-intro");
var preferred=["Consideration","Acceptance","Proposal","Offer","Agreement","Contract","Promise","Revocation","Enforceable","Void agreement","Voidable contract","Capacity to contract","Unlawful consideration","Free consent","Fraud","Undue influence","Coercion","Counter-offer","Nudum pactum","Privity of contract","Bailment","Doctrine","Damages"];
var dictionary=preferred.map(function(term){var w=WORDS.find(function(x){return x.term.toLowerCase()===term.toLowerCase();});return w?w.term:null;}).filter(Boolean).sort(function(a,b){return b.length-a.length;});
function linkText(p,text){
 var lower=text.toLowerCase(),cursor=0,created=0;
 while(cursor<text.length){
  var match=null;
  if(created<9)dictionary.forEach(function(word){
   var pos=lower.indexOf(word.toLowerCase(),cursor);
   while(pos>=0){
    var left=pos?text[pos-1]:"",right=text[pos+word.length]||"";
    if(!/[a-zA-Z]/.test(left)&&!/[a-zA-Z]/.test(right))break;
    pos=lower.indexOf(word.toLowerCase(),pos+1);
   }
   if(pos>=0&&(!match||pos<match.pos||(pos===match.pos&&word.length>match.word.length)))match={pos:pos,word:word};
  });
  if(!match){p.appendChild(document.createTextNode(text.slice(cursor)));break;}
  if(match.pos>cursor)p.appendChild(document.createTextNode(text.slice(cursor,match.pos)));
  var span=E(p,"button",text.slice(match.pos,match.pos+match.word.length),"paper-term");
  span.type="button";span.title="Open "+match.word+" in the word game";
  span.addEventListener("click",function(){if(window.openLawWord)window.openLawWord(match.word,"game");else location.hash="words";});
  cursor=match.pos+match.word.length;created++;
 }
}
window.LAW_PAST_ANSWERS.forEach(function(item,i){
 var details=E(root,"details",undefined,"paper-question");details.id="past-"+item.id;
 var summary=E(details,"summary");E(summary,"span",item.paper+" · "+item.marks+" marks","paper-meta");
 E(summary,"strong",(i+1)+". "+item.title);var body=E(details,"div",undefined,"paper-answer");
 E(body,"p","Unit: "+item.unit+" · Approximate length: two handwritten/typed study pages or more depending on layout.","paper-note");
 item.sections.forEach(function(part){
  var sec=E(body,"section");E(sec,"h3",part[0]);var paragraph=E(sec,"p");linkText(paragraph,part[1]);
 });
 E(body,"h3","References and question-paper source");
 var sources=E(body,"div",undefined,"paper-sources");
 item.sources.forEach(function(it){
  var a=E(sources,"a",it[0]+" ↗");a.href=it[1];a.target="_blank";a.rel="noopener noreferrer";
 });
 E(body,"p","Study aid only. Confirm applicable sections, current amendments and the course's prescribed authorities before reproducing an answer in an examination.","paper-note");
});
})();

(function(){
"use strict";
if(typeof KSLU_FIRST_SEMESTER==="undefined"||typeof WORDS==="undefined")return;
var root=document.getElementById("syllabus-detail");if(!root)return;
var sheet=document.createElement("style");sheet.textContent=".syl-learn-btn{border:0;background:#0d1321;color:white;border-radius:11px;padding:10px 14px;font:inherit;font-size:.85rem;font-weight:750;margin:10px 0}.syl-lesson[hidden],.syl-tree-wrapper[hidden]{display:none!important}.syl-lesson{max-width:690px;margin:auto}.syl-back{background:#fff;color:#0d1321;border:1px solid #d9dee6;border-radius:12px;padding:10px 14px;font:inherit;margin:12px 0}.syl-lesson h2{font-size:clamp(1.5rem,6vw,2.1rem)}.syl-lesson p{line-height:1.65}.syl-lesson small{color:#6c7480}.syl-topic{background:#fff;border:1px solid #d9dee6;border-radius:14px;margin:10px 0;overflow:hidden}.syl-topic summary{padding:14px;font-size:.94rem;font-weight:750;line-height:1.5;cursor:pointer}.syl-topic-detail{padding:3px 14px 15px;font-size:.9rem;line-height:1.6}.syl-topic-detail ul{padding-left:21px}.syl-core-label{font-size:.7rem;color:#687080;font-weight:850;text-transform:uppercase;margin:14px 0 3px}.syl-word-link{border:1px solid #d9dee6;border-radius:9px;padding:8px 11px;background:#f4f6f8;font:inherit;font-size:.8rem;margin:3px}.syl-summary{background:#fff;border:1px solid #d9dee6;border-radius:14px;padding:16px;margin:12px 0}";document.head.appendChild(sheet);
var tree=document.createElement("div");tree.className="syl-tree-wrapper";
while(root.firstChild)tree.appendChild(root.firstChild);root.appendChild(tree);
var page=document.createElement("section");page.className="syl-lesson";page.hidden=true;root.appendChild(page);
var previousScroll=0;
var explanations=[
[/preamble/i,"The Preamble identifies constitutional purposes and values that guide interpretation."],
[/article 12|state action/i,"Article 12 determines the bodies treated as State for enforcing Fundamental Rights."],
[/article 13|judicial review/i,"Judicial review examines whether a law or State action is consistent with constitutional requirements."],
[/severability/i,"Severability asks whether an invalid provision can be removed while the valid portion continues."],
[/eclipse/i,"The eclipse doctrine concerns pre-Constitution legislation that is inconsistent with Fundamental Rights."],
[/article 14|equality/i,"Study the equality guarantee, reasonable classification and the prohibition of arbitrariness."],
[/article 19|freedom of speech/i,"Identify the relevant freedom, the permitted constitutional restrictions and whether they are reasonable."],
[/article 20|double jeopardy|self-incrimination/i,"Separate protection against retrospective criminal laws, double jeopardy and compelled self-incrimination."],
[/article 21|personal liberty/i,"Life and personal liberty require lawful procedure as interpreted under Article 21."],
[/articles? 32|articles? 226|writ/i,"Study which constitutional writ addresses the legal wrong and which court has jurisdiction."],
[/offer|acceptance/i,"Contract formation turns on proposal, knowledge, assent, communication and valid acceptance."],
[/consideration|nudum pactum/i,"Identify what is exchanged, whose desire prompted it and whether a statutory exception applies."],
[/free consent|fraud|coercion|undue influence/i,"Distinguish the ground affecting free consent, its ingredients, and the effect on enforceability."],
[/discharge|frustration|performance/i,"Identify the event that ended contractual duties and whether breach or impossibility is established."],
[/negligence|duty of care/i,"Examine duty, breach, causation and damage before applying a defence."],
[/strict liability|absolute liability/i,"Distinguish strict liability from the Indian rule of absolute liability for hazardous enterprises."],
[/mitakshara|dayabhaga|coparcenary/i,"Distinguish the schools and apply current statutory rules governing joint-family property."],
[/mens rea|actus reus/i,"Separate the physical conduct of an offence from its required mental element."],
[/murder|culpable homicide/i,"Compare the statutory ingredients, intention, knowledge and applicable exceptions."],
[/theft|robbery|dacoity|extortion/i,"Use statutory elements to distinguish property offences and identify relevant penalties."]
];
function E(parent,tag,content,cls){var node=document.createElement(tag);if(cls)node.className=cls;if(content!==undefined)node.textContent=content;parent.appendChild(node);return node;}
function B(parent,content,cb,cls){var b=E(parent,"button",content,cls);b.type="button";b.addEventListener("click",cb);return b;}
function concept(course,topic){
 for(var i=0;i<explanations.length;i++)if(explanations[i][0].test(topic))return explanations[i][1];
 if(course.includes("Criminal"))return "Locate the current BNS provision. Identify conduct, mental element, exceptions and punishment.";
 if(course.includes("Contract"))return "Find the statutory rule, essential requirements, exceptions and legal consequences.";
 if(course.includes("Family"))return "Identify the applicable personal-law provision, persons concerned and available remedies.";
 if(course.includes("Torts"))return "Identify the legal interest, tort elements, defences and remedy using a factual example.";
 if(course.includes("Constitutional"))return "Identify the provision, protected right or power, limitations and available remedy.";
 return "Define the concept accurately, distinguish related expressions, and apply it in a short illustration.";
}
function splitTopics(text){return text.split(/;\s*/).map(function(x){return x.trim().replace(/\.$/,"")}).filter(Boolean);}
function close(){page.hidden=true;tree.hidden=false;window.scrollTo({top:previousScroll,behavior:"smooth"});}
function openUnit(ci,ui){
 var course=KSLU_FIRST_SEMESTER.courses[ci],unit=course.units[ui];previousScroll=window.scrollY;
 tree.hidden=true;page.hidden=false;page.replaceChildren();
 B(page,"← Back to syllabus",close,"syl-back");
 E(page,"small","FIRST YEAR · SEMESTER 1 · "+course.name);
 E(page,"h2",unit.unit+": "+unit.title);E(page,"p","Break each syllabus topic into its core meaning, smaller elements, application and relevant vocabulary.");
 var start=E(page,"div",undefined,"syl-summary");E(start,"strong","Start with the big picture");
 E(start,"p",course.about);
 E(start,"small","Learning outline based on the imported KSLU syllabus. Check current Acts and the prescribed text for authoritative law.");
 splitTopics(unit.text).forEach(function(topic,i){
  var d=E(page,"details",undefined,"syl-topic");E(d,"summary",(i+1)+". "+topic);
  var content=E(d,"div",undefined,"syl-topic-detail");
  E(content,"p","Core understanding","syl-core-label");E(content,"p",concept(course.name,topic));
  var parts=topic.split(/,\s*/).map(function(x){return x.trim()}).filter(Boolean);
  if(parts.length>1){E(content,"p","Smaller elements","syl-core-label");var ul=E(content,"ul");parts.forEach(function(part){E(ul,"li",part)})}
  E(content,"p","Test your understanding","syl-core-label");
  E(content,"p","Explain the rule, identify its elements and exceptions, then apply it to an example. Support your answer with the appropriate statutory provision or authority.");
  var matches=WORDS.filter(function(w){return w.term.length>=5&&topic.toLowerCase().includes(w.term.toLowerCase())}).slice(0,5);
  if(matches.length){E(content,"p","Practise key terms","syl-core-label");matches.forEach(function(w){B(content,w.term+" ↗",function(){if(window.openLawWord)window.openLawWord(w.term,"game");else location.hash="words";},"syl-word-link");});}
 });
 var end=E(page,"div",undefined,"syl-summary");E(end,"strong","Exam answer checklist");
 E(end,"p","Definition → essential elements → exceptions → legal authority → application → conclusion.");
 B(end,"← Back to syllabus",close,"syl-back");
 window.scrollTo({top:0,behavior:"smooth"});
}
KSLU_FIRST_SEMESTER.courses.forEach(function(c,ci){
 var course=tree.querySelectorAll(".course-card")[ci];if(!course)return;
 c.units.forEach(function(unit,ui){
  var d=course.querySelectorAll(".unit-reveal")[ui];if(!d)return;
  var content=d.querySelector(".unit-reveal-content")||d;
  B(content,"Learn this unit →",function(){openUnit(ci,ui);},"syl-learn-btn");
 });
});
window.addEventListener("hashchange",function(){if(location.hash!=="#syllabus"&&!page.hidden)close();});
})();
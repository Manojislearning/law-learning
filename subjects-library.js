(function(){
"use strict";
var mount=document.getElementById("subject-library");
if(!mount||typeof KSLU_FIRST_SEMESTER==="undefined")return;
var semData={"2":["Constitutional Law – II","Contract – II","Labour Law – I","Property Law","Family Law – II: Mohammedan Law & Indian Succession Act","Kanoonu Kannada / Kannada Kali"],"3":["Jurisprudence","Labour Law – I","Law of Taxation","Criminal Law – II: Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023"],"4":["Public International Law","Optional I: Human Rights Law and Practice / Insurance Law","Optional II: Banking Law / Right to Information","Clinical I: Professional Ethics and Professional Accounting System","Clinical II: Alternative Dispute Resolution Systems"],"5":["Company Law","Civil Procedure Code and Limitation Act","Optional III: Intellectual Property Rights I / Penology & Victimology","Optional IV: Interpretation of Statutes and Principles of Legislation / Competition Law","Clinical III: Drafting, Pleading and Conveyance"],"6":["Bharatiya Sakshya Adhiniyam (BSA), 2023","Environmental Law","Optional V: Intellectual Property Rights II / White Collar Crimes","Optional VI: Land Law / Law relating to International Trade Economics","Clinical IV: Moot Court Exercise and Internship"]};
var conceptHints={"Constitutional Law":["Constitutional supremacy","Fundamental Rights","Equality and reasonable classification","Parliamentary government","Judicial review","Writs and constitutional remedies"],"Contract":["Proposal and acceptance","Consideration","Free consent","Enforceability","Breach and damages","Specific relief"],"Law of Torts":["General principles of tortious liability","Negligence and duty of care","Nuisance","Strict and absolute liability","Defamation","Legal remedies"],"Family Law – I: Hindu Law":["Hindu marriage","Mitakshara and Dayabhaga","Joint Hindu family and coparcenary","Hindu succession","Adoption and guardianship","Maintenance"],"Criminal Law":["Elements of criminal liability","Actus reus and mens rea","General exceptions","Abetment and conspiracy","Offences against the person","Property offences"],"Labour Law":["Industrial relations","Employment protections","Industrial disputes","Trade unions","Wages and working conditions"],"Property Law":["Transfer of property","Sale, mortgage and lease","Gift and exchange","Easements","Lis pendens"],"Family Law – II":["Marriage and divorce under Muslim law","Mahr","Maintenance","Succession under applicable laws","Inheritance"],"Jurisprudence":["Schools of jurisprudence","Rights and duties","Legal personality","Possession and ownership","Law, morality and justice"],"Law of Taxation":["Direct and indirect taxation","Taxable persons and transactions","Assessment and collection","Exemptions and remedies"],"Public International Law":["Sources of international law","Treaties","State responsibility","Jurisdiction","International dispute settlement"],"Human Rights":["Human rights principles","National human rights mechanisms","International human rights instruments","Enforcement and remedies"],"Insurance Law":["Insurance contract","Insurable interest","Indemnity","Disclosure and good faith","Claims"],"Banking Law":["Banker-customer relationship","Negotiable instruments","Credit and security","Regulatory compliance"],"Right to Information":["Public authorities","Right to access records","Exemptions","Appeals and penalties"],"Professional Ethics":["Advocates' duties","Professional misconduct","Bar Council rules","Professional accounting"],"Alternative Dispute":["Negotiation","Mediation","Conciliation","Arbitration","Settlement agreements"],"Company Law":["Incorporation","Memorandum and articles","Directors and management","Share capital","Corporate governance"],"Civil Procedure":["Jurisdiction","Pleadings","Interim relief","Decrees and execution","Limitation"],"Intellectual Property":["Copyright","Patents","Trademarks","Industrial designs","Licensing and infringement"],"Penology":["Theories of punishment","Sentencing","Victim rights","Prisons and rehabilitation"],"Interpretation of Statutes":["Literal and purposive interpretation","Internal aids","External aids","Presumptions of interpretation","Harmonious construction"],"Competition Law":["Anti-competitive agreements","Abuse of dominance","Merger regulation","Competition enforcement"],"Drafting, Pleading":["Legal notices","Plaints and written statements","Petitions and affidavits","Conveyancing","Document drafting"],"Bharatiya Sakshya Adhiniyam":["Relevancy and admissibility","Primary and secondary evidence","Burden of proof","Witness testimony","Electronic evidence"],"Environmental Law":["Constitutional environmental protection","Pollution control","Environmental clearances","Public interest litigation","Environmental liability"],"White Collar":["Economic offences","Fraud","Corporate offences","Investigation and prosecution"],"Land Law":["Land tenure","Revenue records","Land transfer restrictions","Land acquisition"],"International Trade":["International commercial transactions","Trade agreements","Dispute settlement","Cross-border contracts"],"Moot Court":["Case analysis","Memorial drafting","Legal research","Oral advocacy","Courtroom procedure"],"English":["Legal vocabulary","Grammar","Writing and comprehension","Translation"],"Kannada":["Legal Kannada vocabulary","Writing and translation"]};
var courses={1:KSLU_FIRST_SEMESTER.courses.map(function(c){return c.name;})};
Object.keys(semData).forEach(function(k){courses[Number(k)]=semData[k];});
var chosenYear=1,current=null,selectedUnit=null;
var style=document.createElement("style");
style.textContent='.sb-root{max-width:680px;margin:4px auto 35px}.sb-intro{font-size:.82rem;line-height:1.6;color:var(--muted);margin:0 0 15px}.sb-tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px}.sb-tabs button{border:1px solid var(--line);border-radius:11px;background:white;padding:11px 6px;font:inherit;font-size:.85rem;font-weight:750;color:var(--text)}.sb-tabs button.active{color:white;background:var(--text)}.sb-search{width:100%;border:1px solid var(--line);border-radius:12px;padding:12px;background:#fff;font:inherit;font-size:16px;margin:0 0 12px}.sb-choice{display:flex;justify-content:space-between;gap:10px;align-items:center;width:100%;background:#fff;border:1px solid var(--line);border-radius:14px;padding:15px;margin:9px 0;text-align:left;font:inherit;color:var(--text)}.sb-choice strong{font-size:.94rem}.sb-choice small{font-size:.76rem;color:var(--muted);display:block;margin-top:5px}.sb-top{display:flex;gap:12px;align-items:center;margin:0 0 17px}.sb-back{border:1px solid var(--line);border-radius:11px;background:#fff;padding:11px;font:inherit;font-weight:750;color:var(--text)}.sb-title{font-size:clamp(1.5rem,5vw,2rem);margin:0}.sb-concept{background:#fff;border:1px solid var(--line);border-radius:14px;padding:16px;margin:10px 0}.sb-concept h3{font-size:1rem;margin:0 0 7px}.sb-concept p{line-height:1.62;margin:7px 0;font-size:.89rem}.sb-concept button{padding:9px 12px;margin:8px 5px 0 0;border:1px solid var(--line);border-radius:10px;background:#f5f7fa;font:inherit;font-weight:750;font-size:.78rem}.sb-kicker{font-size:.74rem;color:var(--muted);font-weight:800;margin:5px 0}.sb-tags{color:var(--muted);font-size:.78rem}';
document.head.appendChild(style);
var pane=document.createElement("div");pane.className="sb-root";mount.appendChild(pane);
function E(parent,tag,value,cls){var el=document.createElement(tag);if(cls)el.className=cls;if(value!==undefined)el.textContent=value;parent.appendChild(el);return el;}
function B(parent,text,cb,cls){var el=E(parent,"button",text,cls);el.type="button";el.addEventListener("click",cb);return el;}
function keywords(name){
 var key=Object.keys(conceptHints).sort(function(a,b){return b.length-a.length;}).find(function(k){return name.toLowerCase().includes(k.toLowerCase());});
 return key?conceptHints[key]:["Introduction and scope","Governing legislation and principles","Key legal elements","Applications and remedies"];
}
function selected(){return courses[current.sem][current.i];}
function reset(){current=null;selectedUnit=null;render();}
function navBack(){if(selectedUnit!==null){selectedUnit=null;render();}else reset();}
function subjectRows(){
 E(pane,"p","Browse legal subjects by year. Semester I includes official imported units; other subject concepts are study guides, not verified university unit outlines.","sb-intro");
 var tabs=E(pane,"div",undefined,"sb-tabs");
 [1,2,3].forEach(function(y){var b=B(tabs,"Year "+y,function(){chosenYear=y;render();});if(chosenYear===y)b.classList.add("active");});
 var q=E(pane,"input",undefined,"sb-search");q.type="search";q.placeholder="Find a subject or concept…";q.setAttribute("aria-label","Find a legal subject");
 var out=E(pane,"div");
 function fill(){
  var search=q.value.trim().toLowerCase();out.replaceChildren();var count=0;
  [chosenYear*2-1,chosenYear*2].forEach(function(sem){
   (courses[sem]||[]).forEach(function(name,i){
    if(search&&!name.toLowerCase().includes(search)&&!keywords(name).join(" ").toLowerCase().includes(search))return;
    count++;var row=B(out,"",function(){current={sem:sem,i:i};selectedUnit=null;render();},"sb-choice");
    var left=E(row,"span");E(left,"strong",name);E(left,"small","Semester "+sem+" · "+(sem===1?"5 verified syllabus units":"Concept overview"));
    E(row,"span","›");
   });
  });
  if(!count)E(out,"p","No matching subjects.","sb-intro");
 }
 q.addEventListener("input",fill);fill();
}
function subjectPage(){
 var bar=E(pane,"div",undefined,"sb-top");B(bar,"←",navBack,"sb-back");var head=E(bar,"div");E(head,"p","Semester "+current.sem,"sb-kicker");E(head,"h2",selected(),"sb-title");
 E(pane,"p",current.sem===1?"Select a verified syllabus unit to explore its fundamental concepts.":"These are foundation concepts for study. Official detailed unit headings are not yet imported.","sb-intro");
 if(/Law of Torts/i.test(selected()))B(pane,"Open Negligence Brain Map →",function(){location.hash="brainmap";},"sb-back");
 if(current.sem===1){
  KSLU_FIRST_SEMESTER.courses[current.i].units.forEach(function(unit,i){
   var card=E(pane,"div",undefined,"sb-concept");E(card,"h3",unit.unit+" — "+unit.title);
   E(card,"p",unit.text.length>210?unit.text.slice(0,206)+"…":unit.text);
   B(card,"Study concepts →",function(){selectedUnit=i;render();});
   B(card,"Open in Syllabus ↗",function(){if(window.openSyllabusUnit)window.openSyllabusUnit(1,current.i,i);else location.hash="syllabus";});
  });
 }else{
  keywords(selected()).forEach(function(t){var card=E(pane,"div",undefined,"sb-concept");E(card,"h3",t);E(card,"p","Understand the concept's definition, legal elements, purpose, relevant statutory framework and practical application.");});
 }
}
function unitPage(){
 var unit=KSLU_FIRST_SEMESTER.courses[current.i].units[selectedUnit];
 var bar=E(pane,"div",undefined,"sb-top");B(bar,"←",navBack,"sb-back");var head=E(bar,"div");E(head,"p",selected()+" · "+unit.unit,"sb-kicker");E(head,"h2",unit.title,"sb-title");
 E(pane,"p","Core ideas from the imported Semester I syllabus.","sb-intro");
 var topics=unit.text.split(/;\s*/).map(function(t){return t.trim().replace(/\.$/,"");}).filter(Boolean);
 topics.forEach(function(t){
  var card=E(pane,"div",undefined,"sb-concept");E(card,"h3",t);
  E(card,"p","Define the rule, identify the essential conditions, distinguish closely related terms and apply it to a practical problem.");
  var matched=WORDS.filter(function(w){return w.term.length>4&&t.toLowerCase().includes(w.term.toLowerCase());}).slice(0,4);
  matched.forEach(function(w){B(card,"Learn: "+w.term+" ↗",function(){if(window.openLawWord)window.openLawWord(w.term,"learn");else location.hash="words";});});
 });
 B(pane,"Open complete unit in Syllabus →",function(){if(window.openSyllabusUnit)window.openSyllabusUnit(1,current.i,selectedUnit);else location.hash="syllabus";},"sb-back");
}
function render(){pane.replaceChildren();if(current===null)subjectRows();else if(selectedUnit===null)subjectPage();else unitPage();window.scrollTo({top:0,behavior:"auto"});}
render();
})();
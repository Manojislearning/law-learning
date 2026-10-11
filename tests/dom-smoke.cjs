/* DOM integration smoke test. Run with: npm install --no-save jsdom@26 && node tests/dom-smoke.cjs
 * Simulates actual browser classic-script load order and user navigation.
 * Does not replace Android/Chrome interaction tests.
 */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const {JSDOM,VirtualConsole}=require("jsdom");
const root=path.resolve(__dirname,"..");
const html=fs.readFileSync(path.join(root,"index.html"),"utf8");
const scripts=[...html.matchAll(/<script\s+src="\.\/([^"]+\.js)(?:\?[^"]+)?"><\/script>/g)].map(m=>m[1]);
const shell=html.replace(/<script\s+src="\.\/[^"]+"><\/script>/g,"");
assert.ok(scripts.length>=10);

function build(url){
 const errors=[];
 const output=new VirtualConsole();
 output.on("jsdomError",err=>errors.push(err));
 const dom=new JSDOM(shell,{
  url:url,runScripts:"dangerously",pretendToBeVisual:true,virtualConsole:output,
  beforeParse(win){
   win.scrollTo=function(){};
   win.HTMLElement.prototype.scrollIntoView=function(){};
   win.matchMedia=function(){return {matches:false,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){}};};
   win.speechSynthesis=undefined;
  }
 });
 const doc=dom.window.document;
 for(const script of scripts){
   const item=doc.createElement("script");
   item.textContent=fs.readFileSync(path.join(root,script),"utf8");
   doc.body.appendChild(item);
   if(errors.length)throw Error("Runtime script error in "+script+": "+errors[0].stack);
 }
 return {dom,doc,errors};
}
function findButton(doc,name){
 return [...doc.querySelectorAll("#syllabus-detail button")].find(b=>b.textContent.includes(name));
}
async function settle(){await new Promise(r=>setTimeout(r,40));}

(async()=>{
 const {dom,doc,errors}=build("https://example.test/law-learning/index.html?v=34#home");
 assert.equal(dom.window.LawAppCore.router.current(),"home");
 assert.ok(doc.getElementById("syllabus-detail"));
 const syll=doc.querySelector('button.home-card[data-open="syllabus"]');
 assert.ok(syll,"Syllabus main menu must exist");
 syll.click();await settle();
 assert.equal(dom.window.LawAppCore.router.current(),"syllabus");
 assert.ok(doc.querySelector(".sf-source-entry"),"Syllabus landing page must contain visible source entry");
 const src=findButton(doc,"Sources & review");
 assert.ok(src,"Sources & review entry must be a navigable button");
 src.click();
 assert.ok(doc.querySelector("#syllabus-detail").textContent.includes("30/30"),"Source summary must reflect imported units");
 assert.ok(doc.querySelector("#syllabus-detail").textContent.includes("English"),"Official conditional English note should appear on audit page");
  const contract=findButton(doc,"Contract – I");
 assert.ok(contract,"Contract course source status must be listed");contract.click();
 const unit=findButton(doc,"Unit I");
 assert.ok(unit,"Contract I unit must be selectable");unit.click();
 assert.ok(doc.querySelector("#syllabus-detail").textContent.includes("Official references"),"References page must render");
 assert.ok([...doc.querySelectorAll("#syllabus-detail a")].some(a=>a.href.includes("indiacode.nic.in")),"Primary legislation must be linked");
 const proof=doc.querySelector(".sf-audit-proof");
 assert.ok(proof,"Published-edition outline evidence must be visible at unit level");
 assert.ok(proof.textContent.includes("printed page 6"),"Contract I should point to the official syllabus page 6");
 assert.ok([...proof.querySelectorAll("a")].some(a=>a.href.includes("#page=6")),"Source audit should link directly to original page");
 assert.ok(doc.querySelector("#syllabus-detail").textContent.includes("Current admission-year scheme: not yet confirmed"),"Historical match must never imply cohort verification");
 assert.deepEqual(errors,[]);
 dom.window.close();

 const direct=build("https://example.test/law-learning/index.html?sources=1&v=34#syllabus");
 assert.ok(direct.doc.querySelector("#syllabus-detail").textContent.includes("30/30"),"Direct source URL must open review dashboard");
 assert.deepEqual(direct.errors,[]);
 direct.dom.window.close();

 const guided=build("https://example.test/law-learning/index.html?learn=contract1-unit1&v=36#syllabus");
 const gd=guided.doc,gw=guided.dom.window;
 assert.ok(gd.querySelector(".c1-card"),"Direct link must open guided Contract I lessons");
 assert.ok(gd.querySelector(".c1-card h2").textContent.includes("Offer"),"First lesson should explain offer");
 assert.equal(gw.ContractUnitOneUI.lessons.length,6,"Expected six source-checked lessons");
 const options=[...gd.querySelectorAll(".c1-option")];
 assert.equal(options.length,3,"Every concept check must have three options");
 options[0].click();
 assert.equal(gd.querySelector(".c1-feedback").hidden,false,"Quiz must show explanatory feedback");
 const recognition=gw.LawReviewCore.read(gw.localStorage).cards["contract1-unit1:proposal"];
 assert.ok(recognition,"Guided quiz attempt must schedule a review");
 assert.equal(recognition.stage,0,"Recognition must not count as successful recall");
 assert.equal(recognition.recognitions,1);
 assert.ok(recognition.due>Date.now(),"Guided quiz should schedule retrieval into the future");
 gd.querySelector(".c1-next").click();
 assert.ok(gd.querySelector(".c1-card h2").textContent.includes("acceptance"),"Next button must change lesson");
 assert.deepEqual(guided.errors,[],"Guided lesson cannot throw during startup");
 guided.dom.window.close();


 const u2=build("https://example.test/law-learning/index.html?learn=contract1-unit2&v=37#syllabus");
 const u2d=u2.doc,u2w=u2.dom.window;
 assert.equal(u2w.ContractUnitTwoUI.lessons.length,10,"Unit II must have ten concept lessons");
 assert.ok(u2d.querySelector(".c1-card h2").textContent.includes("Who can make a contract?"),"Direct Unit II URL must open capacity");
 assert.ok(u2d.querySelector(".c1-lesson-number").textContent.includes("Unit II"),"Lesson label must identify Unit II");
 const u2answers=u2d.querySelectorAll(".c1-option");
 assert.equal(u2answers.length,3);
 u2answers[1].click();
 assert.equal(u2d.querySelector(".c1-feedback").hidden,false,"Wrong answers must show explanatory feedback");
 assert.ok(u2d.querySelector(".c1-option.correct"),"Correct answer must be revealed");
 u2d.querySelector(".c1-next").click();
 assert.ok(u2d.querySelector(".c1-card h2").textContent.includes("minor"),"Second lesson should explain minority");
 assert.deepEqual(u2.errors,[],"Unit II navigation must not throw");
 u2.dom.window.close();

 const u3=build("https://example.test/law-learning/index.html?learn=contract1-unit3&v=38#syllabus");
 const u3d=u3.doc,u3w=u3.dom.window;
 assert.equal(u3w.ContractUnitThreeUI.lessons.length,10,"Unit III must provide ten lessons");
 assert.ok(u3d.querySelector(".c1-card h2").textContent.includes("performance"),"Unit III deep link must open performance lesson");
 assert.ok(u3d.querySelector(".c1-lesson-number").textContent.includes("Unit III"),"Unit label must be Unit III");
 assert.equal(u3d.querySelectorAll(".c1-option").length,3,"Unit III questions must give three options");
 u3d.querySelector(".c1-option").click();
 assert.equal(u3d.querySelector(".c1-feedback").hidden,false,"A response must reveal explanatory feedback");
 u3d.querySelector(".c1-next").click();
 assert.ok(u3d.querySelector(".c1-card h2").textContent.includes("Who must perform"),"Unit III next navigation must advance");
 assert.deepEqual(u3.errors,[],"Unit III must not trigger browser runtime errors");
 u3.dom.window.close();

 const u4=build("https://example.test/law-learning/index.html?learn=contract1-unit4&v=39#syllabus");
 const u4d=u4.doc,u4w=u4.dom.window;
 assert.equal(u4w.ContractUnitFourUI.lessons.length,12,"Unit IV must include 12 lessons");
 assert.ok(u4d.querySelector(".c1-card h2").textContent.includes("compensation"),"Unit IV direct URL must open damages lesson");
 assert.ok(u4d.querySelector(".c1-lesson-number").textContent.includes("Unit IV"));
 for(let i=0;i<u4w.ContractUnitFourUI.lessons.length;i++){
  const lesson=u4w.ContractUnitFourUI.lessons[i];
  const correct=lesson.choices[lesson.answer];
  const opts=[...u4d.querySelectorAll(".c1-option")];
  assert.equal(opts.length,3,"Every guided question has three answer choices");
  assert.equal(u4d.querySelector(".c1-next").hidden,true,"Must answer before Next button");
  const target=opts.find(b=>i===0?b.textContent!==correct:b.textContent===correct);
  assert.ok(target,"Expected correct or deliberately incorrect option");
  target.click();
  assert.equal(u4d.querySelector(".c1-feedback").hidden,false,"Every answer gets explanatory feedback");
  assert.ok(u4d.querySelector(".c1-option.correct"),"Correct answer must be highlighted regardless of display position");
  if(i<u4w.ContractUnitFourUI.lessons.length-1)u4d.querySelector(".c1-next").click();
 }
 const retry=u4d.querySelector(".c1-retry:not([hidden])");
 assert.ok(retry&&retry.textContent.includes("Review 1"),"The unit must offer review of missed concepts");
 retry.click();
 assert.ok(u4d.querySelector(".c1-count").textContent.includes("REVIEW"),"Missed review must enter review mode");
 const first=u4w.ContractUnitFourUI.lessons[0],right=first.choices[first.answer];
 const retryAnswer=[...u4d.querySelectorAll(".c1-option")].find(b=>b.textContent===right);
 assert.ok(retryAnswer);
 retryAnswer.click();
 assert.ok(u4d.querySelector(".c1-next").textContent.includes("Finish review"),"Correct retry must clear missed queue");
 u4d.querySelector(".c1-next").click();
 assert.ok(!u4d.querySelector(".c1-card"),"Finishing review returns to Unit IV topics");
 assert.deepEqual(u4.errors,[],"Unit IV must not throw browser errors");
 u4.dom.window.close();

 const u5=build("https://example.test/law-learning/index.html?v=40&learn=contract1-unit5#syllabus");
 const u5doc=u5.doc,u5win=u5.dom.window;
 assert.equal(u5win.ContractUnitFiveUI.lessons.length,12,"Unit V must contain 12 lessons");
 assert.ok(u5doc.querySelector(".c1-card h2").textContent.includes("specific relief"),"Direct link must open Unit V introduction");
 assert.ok(u5doc.querySelector(".c1-lesson-number").textContent.includes("Unit V"),"Reader must show Unit V");
 assert.ok(u5doc.querySelector(".c1-write"),"Legal written recall must be visible as an optional panel");
 const recall=u5doc.querySelector(".c1-write");
 recall.open=true;
 const area=recall.querySelector("textarea");
 assert.ok(area,"Short recall must allow writing");
 area.value="Specific relief protects specific individual rights";area.dispatchEvent(new u5win.Event("input",{bubbles:true}));
 recall.querySelector(".c1-compare").click();
 assert.equal(recall.querySelector(".c1-model").hidden,false,"Comparison outline must be available");
 const firstRight=u5win.ContractUnitFiveUI.lessons[0].choices[u5win.ContractUnitFiveUI.lessons[0].answer];
 const firstAnswer=[...u5doc.querySelectorAll(".c1-option")].find(b=>b.textContent===firstRight);
 assert.ok(firstAnswer);firstAnswer.click();u5doc.querySelector(".c1-next").click();
 assert.ok(u5doc.querySelector(".c1-card h2").textContent.includes("Recovering possession"));
 u5win.openContractGuidedUnit(4);
 u5win.ContractUnitFiveUI.render(u5doc.getElementById("syllabus-detail"),{
   index:2,direction:"forward",
   onBack:function(){},onMove:function(){}
 });
 const irac=u5doc.querySelector(".c1-write");irac.open=true;
 assert.equal(irac.querySelectorAll("textarea").length,4,"Case question must offer four IRAC fields");
 const iracTextareas=[...irac.querySelectorAll("textarea")];
 iracTextareas[0].value="Can the contract be specifically enforced?";
 iracTextareas[0].dispatchEvent(new u5win.Event("input",{bubbles:true}));
 irac.querySelector(".c1-compare").click();
 assert.ok(irac.querySelector(".c1-model").textContent.includes("Section 10"),"Legal model should cite amended statutory rule");
 assert.deepEqual(u5.errors,[],"Unit V and writing panel must not raise runtime errors");
 u5.dom.window.close();

 const homepage=build("https://example.test/law-learning/index.html?v=40#home");
 const btn=homepage.doc.getElementById("home-contract-lesson");
 assert.ok(btn,"Homepage needs a single visible guided-lesson entry");
 btn.click();await settle();
 assert.equal(homepage.dom.window.LawAppCore.router.current(),"syllabus");
 assert.ok(homepage.doc.querySelector(".c1-card"),"Home lesson entry should open a guided concept");
 assert.ok(homepage.doc.querySelector(".c1-card h2").textContent.includes("specific relief"),"Homepage should launch Unit V");
 assert.deepEqual(homepage.errors,[]);
 homepage.dom.window.close();

 {
  const rv=build("https://example.test/law-learning/index.html?v=41#home");
  const w=rv.dom.window,doc=rv.doc;
  assert.equal(w.LawReviewCore.catalog([w.ContractUnitOneData,w.ContractUnitTwoData,w.ContractUnitThreeData,w.ContractUnitFourData,w.ContractUnitFiveData]).length,50);
  assert.ok(doc.getElementById("review-dashboard-count").textContent.includes("50 not started"),"New installation should show 50 unstarted lessons");
  const open=doc.querySelector('.home-review-card[data-open="review"]');
  assert.ok(open,"Review must be visible from home");
  open.click();await settle();
  assert.equal(w.LawAppCore.router.current(),"review");
  assert.ok(doc.getElementById("review-root").textContent.includes("Review what matters"));
  const buttons=[...doc.querySelectorAll("#review-root button")];
  const begin=buttons.find(x=>x.textContent.includes("Try 3 new concepts"));
  assert.ok(begin,"New students must be able to begin reviews without due items");
  begin.click();
  const textarea=doc.querySelector("#review-root textarea");
  const reference=doc.querySelector("#review-root .review-answer");
  const grade=doc.querySelector("#review-root .review-choices");
  assert.ok(reference.hidden&&grade.hidden,"Reference and self-rating must be hidden before retrieval");
  const reveal=[...doc.querySelectorAll("#review-root button")].find(x=>x.textContent.includes("Show the reference answer"));
  reveal.click();
  assert.ok(reference.hidden,"Reveal must require typed or spoken attempt");
  assert.ok(doc.querySelector("#review-root .review-status").textContent.includes("short answer"));
  textarea.value="Section 2(a) governs a proposal made seeking the other's assent.";
  textarea.dispatchEvent(new w.Event("input",{bubbles:true}));
  reveal.click();
  assert.equal(reference.hidden,false);
  assert.equal(grade.hidden,false);
  assert.ok(reference.textContent.includes("Section 2"));
  const graded=[...grade.querySelectorAll("button")].find(x=>x.textContent.includes("Recalled"));
  graded.click();
  const stored=w.LawReviewCore.read(w.localStorage);
  const item=stored.cards["contract1-unit1:proposal"];
  assert.equal(item.stage,1);
  assert.equal(item.recalls,1);
  assert.ok(item.due>Date.now()+23*60*60*1000);
  assert.ok(!w.localStorage.getItem(w.LawReviewCore.KEY).includes("governs a proposal made"),"Private drafted answers must not be saved");
  const exported=w.LawBackupCore.exportBackup(w.localStorage);
  assert.equal(w.LawBackupCore.describe(exported).reviewCards,1,"Profile backup must include the newly scheduled review");
  assert.deepEqual(rv.errors,[]);
  rv.dom.window.close();
 }
 {
  const due=build("https://example.test/law-learning/index.html?v=41#review");
  const w=due.dom.window,doc=due.doc,now=Date.now();
  w.LawReviewCore.recognize(w.localStorage,"contract1-unit2:capacity",false,now-11*60000);
  w.LawReviewUI.show();
  assert.ok(doc.querySelector("#review-root").textContent.includes("1"),"A failed concept from earlier should become due");
  const start=[...doc.querySelectorAll("#review-root button")].find(x=>x.textContent.includes("due concepts"));
  assert.ok(start);
  start.click();
  assert.ok(doc.querySelector("#review-root h2").textContent.includes("Who can make a contract?"));
  const spoken=doc.querySelector("#review-root .review-aloud input");
  spoken.checked=true;
  [...doc.querySelectorAll("#review-root button")].find(x=>x.textContent.includes("Show the reference answer")).click();
  const again=[...doc.querySelectorAll("#review-root .review-choices button")].find(x=>x.textContent.includes("Again"));
  again.click();
  const row=w.LawReviewCore.read(w.localStorage).cards["contract1-unit2:capacity"];
  assert.equal(row.stage,0);
  assert.equal(row.recalls,1);
  assert.ok(row.due>Date.now()+9*60000);
  assert.ok(doc.querySelector("#review-root").textContent.includes("Session complete"));
  assert.deepEqual(due.errors,[]);
  due.dom.window.close();
 }

 {
  const cp=build("https://example.test/law-learning/index.html?v=43#practice");
  const w=cp.dom.window,d=cp.doc,root=d.getElementById("practice-root");
  assert.equal(w.LawAppCore.router.current(),"practice");
  assert.ok(root.textContent.includes("Practise legal reasoning"),"Direct practice link should open exam set overview");
  assert.ok(root.textContent.includes("not official KSLU"),"Students must see provenance caveat");
  let start=[...root.querySelectorAll("button")].find(x=>x.textContent.includes("Start 5 cases"));
  assert.ok(start,"Need visible start button");
  start.click();
  const observedUnits=new Set(),factsSeen=new Set(),dataBefore=w.localStorage.length;
  for(let i=0;i<5;i++){
   assert.ok(root.textContent.includes("Case "+(i+1)+" / 5"));
   assert.equal(root.querySelector(".cp-model").hidden,true,"Reference reasoning must stay hidden until the student attempts the case");
   const facts=root.querySelector(".cp-facts").textContent;
   assert.ok(facts.length>60);
   factsSeen.add(facts);
   const response=root.querySelector(".cp-writing textarea");
   const reveal=[...root.querySelectorAll("button")].find(x=>x.textContent.includes("Reveal reference reasoning"));
   const model=root.querySelector(".cp-model"),rubric=root.querySelector(".cp-rubric");
   assert.equal(model.hidden,true);assert.equal(rubric.hidden,true);
   reveal.click();
   assert.equal(model.hidden,true,"Empty response must not reveal model");
   assert.ok(root.querySelector(".cp-error").textContent.includes("40 characters"));
   response.value="The parties' rights depend on the relevant legal rule and how it applies to these specific facts.";
   response.dispatchEvent(new w.Event("input",{bubbles:true}));
   reveal.click();
   assert.equal(model.hidden,false);
   assert.equal(rubric.hidden,false);
   assert.ok(model.textContent.includes("Rule"));
   assert.ok(model.textContent.includes("Application"));
   const m=model.textContent.match(/Contract–I · Unit (I|II|III|IV|V) ·/);
   assert.ok(m,"Case explanation should disclose actual unit only after attempt");
   observedUnits.add(m[1]);
   assert.ok(model.querySelectorAll("a[href*='indiacode.nic.in']").length>0,"Every case must link primary legislation");
   const ticks=[...rubric.querySelectorAll('input[type="checkbox"]')];
   assert.equal(ticks.length,4);
   ticks[0].checked=true;ticks[0].dispatchEvent(new w.Event("change",{bubbles:true}));
   assert.ok(rubric.textContent.includes("1 of 4"),"The self-check should update without assigning an exam score");
   const tips=rubric.querySelector(".cp-coaching");
   assert.equal(tips.tagName,"DETAILS","Coaching stays optional until opened");
   assert.equal(tips.querySelectorAll(".cp-coaching-list li").length,3,"Unchecked elements receive case-specific guidance");
   assert.ok(tips.querySelector("summary").textContent.includes("3 unchecked"));
   const status=rubric.querySelector(".cp-result");
   assert.equal(status.getAttribute("aria-live"),"polite","Self-check updates should be accessible");
   const next=[...root.querySelectorAll("button")].find(x=>x.textContent.includes("Next case"));
   next.click();
  }
  assert.equal(observedUnits.size,5,"One issue-spotting case is needed from each unit");
  assert.equal(factsSeen.size,5);
  assert.ok(root.textContent.includes("You finished the set"));
  assert.ok(root.textContent.includes("No essay grade"));
  assert.equal(w.localStorage.length,dataBefore,"Written practice must not create persistent data");
  const again=[...root.querySelectorAll("button")].find(x=>x.textContent.includes("Try a different set"));
  again.click();
  const fresh=root.querySelector(".cp-facts").textContent;
  assert.ok(!factsSeen.has(fresh),"Second session should initially present a not-yet-used scenario");
  w.LawAppCore.router.navigate("home");
  await settle();
  assert.equal(w.LawAppCore.router.current(),"home");
  assert.equal(root.textContent,"","Leaving practice must discard the in-memory essay draft");
  assert.ok(d.getElementById("review-dashboard-count"),"Review Due must remain available");
  assert.deepEqual(cp.errors,[]);
  cp.dom.window.close();
 }

 {
  const law=build("https://example.test/law-learning/index.html?law=consumer&v=46#law-updates");
  const w=law.dom.window,d=law.doc,host=d.getElementById("law-updates-root");
  assert.equal(w.LawAppCore.router.current(),"law-updates","Deep link must open current-law screen");
  assert.ok(host.querySelector("h2").textContent.includes("Current Law Check"));
  assert.ok(host.querySelector(".law-tab[aria-pressed='true']").textContent.includes("Consumer"),"Consumer deep link must select consumer data");
  assert.ok(host.querySelector(".law-panel h3").textContent.includes("Syllabus history"));
  assert.equal(host.querySelectorAll(".law-answer").length,3);
  assert.equal(host.querySelector(".law-feedback").hidden,true);
  const wrong=[...host.querySelectorAll(".law-answer")].find(x=>x.textContent.includes("1986 alone"));
  assert.ok(wrong);wrong.click();
  assert.equal(host.querySelector(".law-feedback").hidden,false,"Wrong answer should show reason");
  assert.ok(host.querySelector(".law-answer.correct"));
  assert.ok([...host.querySelectorAll(".law-source")].some(x=>x.href.includes('indiacode.nic.in')),"Government sources must be clickable");
  const bns=[...host.querySelectorAll(".law-tab")].find(x=>x.textContent.includes("BNS"));
  bns.click();
  assert.ok(host.querySelector(".law-panel h3").textContent.includes("commenced"),"BNS must open commencement warning first");
  assert.ok(host.textContent.includes("106(2)"));
  assert.ok([...host.querySelectorAll(".law-source")].some(x=>x.href.includes("mha.gov.in")));
  assert.equal(d.querySelectorAll(".home-law-check").length,1,"Home should have one entry");
  w.LawAppCore.router.navigate("home");await settle();
  d.querySelector(".home-law-check").click();await settle();
  assert.equal(w.LawAppCore.router.current(),"law-updates","Home entry must navigate to law audit");
  assert.deepEqual(law.errors,[]);
  law.dom.window.close();
 }
 {
  const syllabusLaw=build("https://example.test/law-learning/index.html?v=46#syllabus");
  const w=syllabusLaw.dom.window,d=syllabusLaw.doc;
  let syllabus=d.getElementById("syllabus-detail");
  findButton(d,"First Year").click();
  findButton(d,"Semester 1").click();
  findButton(d,"Law of Torts").click();
  findButton(d,"Unit V").click();
  const current=findButton(d,"Current Law Check · Consumer");
  assert.ok(current,"Torts Unit V must link to modern 2019 consumer legal checks");
  assert.ok(findButton(d,"Current Law Check · Motor Vehicles"),"Torts Unit V must also offer current motor-accident law");
  current.click();await settle();
  assert.equal(w.LawAppCore.router.current(),"law-updates");
  assert.ok(d.querySelector(".law-tab[aria-pressed='true']").textContent.includes("Consumer"));
  assert.deepEqual(syllabusLaw.errors,[]);
  syllabusLaw.dom.window.close();
 }

 {
  const mv=build("https://example.test/law-learning/index.html?law=motor&v=46#law-updates");
  const w=mv.dom.window,doc=mv.doc,host=doc.getElementById("law-updates-root");
  assert.equal(w.LawAppCore.router.current(),"law-updates");
  assert.ok(host.querySelector(".law-tab[aria-pressed='true']").textContent.includes("Motor Vehicles"));
  assert.ok(host.querySelector(".law-panel h3").textContent.includes("No-fault"));
  assert.equal(w.LawAccuracyCore.cardsFor(w.LawAccuracyData,"motor").length,9);
  assert.ok(host.textContent.includes("₹5 lakh"));
  const controls=[...host.querySelectorAll(".law-controls .law-tab")];
  assert.equal(controls.length,3,"Existing law check must show all three subjects");
  const expected=["Hit-and-run","Cashless","third-party","Insurer","Motor Accidents","Filing time","ex-gratia","Insurance transfer"];
  for(const name of expected){host.querySelector(".law-forward").click();assert.ok(host.querySelector(".law-panel h3").textContent.includes(name),"Missing motor law card "+name);}
  assert.ok(host.textContent.includes("thirty days"));
  const details=host.querySelector(".law-references");assert.ok(details);
  assert.ok([...details.querySelectorAll("a")].some(x=>x.href.includes("egazette.gov.in")),"2026 motor notes need official Gazette sources");
  host.querySelectorAll(".law-controls .law-tab")[0].click();
  assert.ok(host.querySelector(".law-tab[aria-pressed='true']").textContent.includes("BNS"));
  host.querySelectorAll(".law-controls .law-tab")[1].click();
  assert.ok(host.querySelector(".law-tab[aria-pressed='true']").textContent.includes("Consumer"));
  assert.deepEqual(mv.errors,[]);
  mv.dom.window.close();
 }

 {
  const t=build("https://example.test/law-learning/index.html?course=torts&v=47#practice");
  const w=t.dom.window,doc=t.doc,root=doc.getElementById("practice-root");
  assert.equal(w.LawAppCore.router.current(),"practice");
  assert.ok(root.textContent.includes("Law of Torts"));
  assert.ok(root.querySelector('.cp-subjects .cp-button[aria-pressed="true"]').textContent.includes("Law of Torts"));
  assert.equal(w.LawTortsCaseData.cases.length,15);
  assert.equal(w.LawCaseData.cases.length,15,"Old Contract I cases must still load");
  const start=[...root.querySelectorAll("button")].find(x=>x.textContent.includes("Start 5 cases"));
  assert.ok(start);start.click();
  const seenUnits=new Set(),facts=new Set(),initialStorage=w.localStorage.length;
  for(let k=0;k<5;k++){
   assert.ok(root.textContent.includes("Case "+(k+1)+" / 5"));
   const fact=root.querySelector(".cp-facts").textContent;assert.ok(fact.length>65);
   facts.add(fact);
   const answer=root.querySelector(".cp-model");assert.ok(answer.hidden,"Reference must start hidden");
   const button=[...root.querySelectorAll("button")].find(x=>x.textContent.includes("Reveal reference reasoning"));
   button.click();assert.equal(answer.hidden,true,"Torts case requires a written attempt");
   root.querySelector("textarea").value="Issue: evaluate the relevant wrong. Rule: apply the appropriate law. Application: balance the facts. Conclusion: reasoned outcome.";
   button.click();assert.equal(root.querySelector(".cp-model").hidden,false);
   const header=root.querySelector(".cp-model .cp-eyebrow").textContent;
   const matched=header.match(/Law of Torts · Unit (I|II|III|IV|V) ·/);
   assert.ok(matched,"The unit must only be disclosed with the model answer");
   seenUnits.add(matched[1]);
   assert.ok(root.querySelectorAll(".cp-case-source[href^='https://']").length>0);
   assert.equal(root.querySelectorAll(".cp-rubric input").length,4);
   assert.ok(root.querySelector(".cp-coaching").tagName==="DETAILS");
   [...root.querySelectorAll("button")].find(x=>x.textContent.includes("Next case")).click();
  }
  assert.equal(seenUnits.size,5,"Torts practice must cover all five syllabus units");
  assert.equal(facts.size,5);
  assert.ok(root.textContent.includes("You finished the set"));
  assert.equal(w.localStorage.length,initialStorage,"Torts answers must not change local storage");
  [...root.querySelectorAll("button")].find(x=>x.textContent.includes("Try a different set")).click();
  assert.ok(!facts.has(root.querySelector(".cp-facts").textContent),"New Torts sets should prioritize unseen cases");
  [...root.querySelectorAll("button")].find(x=>x.textContent.includes("End practice")).click();
  const contract=[...root.querySelectorAll(".cp-subjects button")].find(x=>x.textContent.includes("Contract"));
  assert.ok(contract);contract.click();
  assert.ok(root.querySelector('.cp-subjects button[aria-pressed="true"]').textContent.includes("Contract"));
  [...root.querySelectorAll("button")].find(x=>x.textContent.includes("Start 5 cases")).click();
  assert.ok(root.textContent.includes("Contract–I"),"Switching back must launch original Contract I questions");
  assert.deepEqual(t.errors,[]);
  t.dom.window.close();
 }
 {
  const via=build("https://example.test/law-learning/index.html?v=47#syllabus");
  const w=via.dom.window,d=via.doc;
  findButton(d,"First Year").click();
  findButton(d,"Semester 1").click();
  findButton(d,"Law of Torts").click();
  const tortButton=findButton(d,"Torts Case Practice");
  assert.ok(tortButton,"Torts syllabus should directly link to mixed reasoning practice");
  tortButton.click();await settle();
  assert.equal(w.LawAppCore.router.current(),"practice");
  assert.ok(d.querySelector('.cp-subjects button[aria-pressed="true"]').textContent.includes("Law of Torts"));
  assert.deepEqual(via.errors,[]);
  via.dom.window.close();
 }

 {
  const bns=build("https://example.test/law-learning/index.html?course=bns&v=48#practice");
  const w=bns.dom.window,d=bns.doc,root=d.getElementById("practice-root");
  assert.equal(w.LawAppCore.router.current(),"practice");
  assert.equal(w.LawBnsCaseData.cases.length,15);
  assert.equal(w.LawTortsCaseData.cases.length,15);
  assert.equal(w.LawCaseData.cases.length,15);
  assert.ok(root.querySelector('.cp-subjects button[aria-pressed="true"]').textContent.includes("BNS"));
  assert.equal(root.querySelectorAll(".cp-subjects button").length,3);
  const launch=[...root.querySelectorAll("button")].find(x=>x.textContent.includes("Start 5 cases"));
  assert.ok(launch);launch.click();
  const seen=new Set(),units=new Set(),startStorage=w.localStorage.length;
  for(let i=0;i<5;i++){
   assert.ok(root.textContent.includes("Case "+(i+1)+" / 5"));
   const facts=root.querySelector(".cp-facts").textContent;
   assert.ok(facts.length>70);
   seen.add(facts);
   const ref=root.querySelector(".cp-model");
   assert.equal(ref.hidden,true,"BNS issue and rule must be concealed before writing");
   const show=[...root.querySelectorAll("button")].find(x=>x.textContent.includes("Reveal reference reasoning"));
   show.click();assert.equal(ref.hidden,true,"Empty BNS answer must not open reference");
   root.querySelector("textarea").value="Issue: determine the offence. Rule: use BNS elements. Application: assess facts and limits. Conclusion: qualified result.";
   show.click();assert.equal(root.querySelector(".cp-model").hidden,false);
   const label=root.querySelector(".cp-model .cp-eyebrow").textContent;
   const match=label.match(/Criminal Law–I · BNS · Unit (I|II|III|IV|V) ·/);
   assert.ok(match,"Model answer should disclose the BNS unit only after written recall");
   units.add(match[1]);
   assert.ok([...root.querySelectorAll(".cp-case-source")].some(a=>a.href.includes("indiacode.nic.in")),"Primary BNS law must be linked");
   assert.equal(root.querySelectorAll(".cp-rubric input").length,4);
   assert.ok(root.querySelector(".cp-coaching").tagName==="DETAILS");
   [...root.querySelectorAll("button")].find(x=>x.textContent.includes("Next case")).click();
  }
  assert.equal(units.size,5);
  assert.equal(seen.size,5);
  assert.equal(w.localStorage.length,startStorage,"Case drafts and ratings should not persist");
  assert.ok(root.textContent.includes("You finished the set"));
  [...root.querySelectorAll("button")].find(x=>x.textContent.includes("Try a different set")).click();
  assert.ok(!seen.has(root.querySelector(".cp-facts").textContent),"A second BNS set must prioritize unseen cases");
  [...root.querySelectorAll("button")].find(x=>x.textContent.includes("End practice")).click();
  const tortBtn=[...root.querySelectorAll(".cp-subjects button")].find(x=>x.textContent.includes("Law of Torts"));
  assert.ok(tortBtn);tortBtn.click();
  assert.ok(root.querySelector('.cp-subjects button[aria-pressed="true"]').textContent.includes("Law of Torts"));
  assert.deepEqual(bns.errors,[]);
  bns.dom.window.close();
 }
 {
  const nav=build("https://example.test/law-learning/index.html?v=48#syllabus");
  const w=nav.dom.window,d=nav.doc;
  findButton(d,"First Year").click();
  findButton(d,"Semester 1").click();
  findButton(d,"Criminal Law").click();
  const link=findButton(d,"BNS Case Practice");
  assert.ok(link,"BNS subject must provide a direct IRAC practice entry");
  link.click();await settle();
  assert.equal(w.LawAppCore.router.current(),"practice");
  assert.ok(d.querySelector('.cp-subjects button[aria-pressed="true"]').textContent.includes("BNS"));
  assert.deepEqual(nav.errors,[]);
  nav.dom.window.close();
 }

 {
  const retry=build("https://example.test/law-learning/index.html?v=49&course=torts#practice");
  const w=retry.dom.window,area=retry.doc.getElementById("practice-root");
  assert.ok(area.querySelector(".cp-subjects button[aria-pressed='true']").textContent.includes("Law of Torts"));
  [...area.querySelectorAll("button")].find(b=>b.textContent.includes("Start 5 cases")).click();
  const skippedFacts=area.querySelector(".cp-facts").textContent;
  [...area.querySelectorAll("button")].find(b=>b.textContent==="Skip case").click();
  for(let k=0;k<4;k++){
    const text=area.querySelector("textarea");
    text.value="Issue: identify the issue. Rule: relevant law. Application: material facts. Conclusion: conditional outcome.";
    text.dispatchEvent(new w.Event("input",{bubbles:true}));
    const model=area.querySelector(".cp-model");
    assert.equal(model.hidden,true,"The new and retried case must conceal its reference answer");
    [...area.querySelectorAll("button")].find(b=>b.textContent.includes("Reveal reference reasoning")).click();
    assert.equal(model.hidden,false);
    const ticks=[...area.querySelectorAll(".cp-rubric input")];
    ticks.forEach((tick,i)=>{tick.checked=!(k===0&&i===1);tick.dispatchEvent(new w.Event("change",{bubbles:true}));});
    [...area.querySelectorAll("button")].find(b=>b.textContent.includes("Next case")).click();
  }
  assert.ok(area.textContent.includes("4 cases compared with reference reasoning; 1 skipped."),"A skipped case must not count as completed");
  const restart=[...area.querySelectorAll("button")].find(b=>b.textContent.includes("Retry 2 weak or skipped cases"));
  assert.ok(restart,"Review needs both skipped case and self-reported Rule gap");
  restart.click();
  assert.equal(area.querySelector(".cp-model").hidden,true);
  assert.ok(area.querySelector(".cp-eyebrow").textContent.includes("SECOND ATTEMPT"));
  const retryFacts=[];
  for(let k=0;k<2;k++){
    retryFacts.push(area.querySelector(".cp-facts").textContent);
    const draft=area.querySelector("textarea");
    assert.equal(draft.value,"","Retry must not prefill or store the previous essay");
    draft.value="Issue: legal problem. Rule: applicable statute. Application: facts support and limit the claim. Conclusion: reasoned outcome.";
    [...area.querySelectorAll("button")].find(b=>b.textContent.includes("Reveal reference reasoning")).click();
    [...area.querySelectorAll(".cp-rubric input")].forEach(b=>{b.checked=true;b.dispatchEvent(new w.Event("change",{bubbles:true}));});
    [...area.querySelectorAll("button")].find(b=>b.textContent.includes("Next case")).click();
  }
  assert.ok(retryFacts.includes(skippedFacts),"The skipped case should return for a fresh attempt");
  assert.ok(area.textContent.includes("No cases currently flagged"),"Retried and fully self-checked cases leave no weak queue");
  assert.ok(![...area.querySelectorAll("button")].some(b=>b.textContent.includes("Retry 2 weak")));
  assert.equal(w.localStorage.getItem("law-learning-practice-weak-v1"),null,"Case feedback flags must not be permanently stored");
  assert.deepEqual(retry.errors,[]);
  retry.dom.window.close();
 }
 {
  const skipped=build("https://example.test/law-learning/index.html?v=49&course=bns#practice");
  const w=skipped.dom.window,area=skipped.doc.getElementById("practice-root");
  w.Math.random=function(){return 0;};
  [...area.querySelectorAll("button")].find(b=>b.textContent.includes("Start 5 cases")).click();
  const initially=area.querySelector(".cp-facts").textContent;
  for(let k=0;k<5;k++)[...area.querySelectorAll("button")].find(b=>b.textContent==="Skip case").click();
  assert.ok(area.textContent.includes("0 cases compared with reference reasoning; 5 skipped."));
  [...area.querySelectorAll("button")].find(b=>b.textContent.includes("Try a different set")).click();
  assert.equal(area.querySelector(".cp-facts").textContent,initially,"Skipped cases must remain unseen under deterministic selection");
  [...area.querySelectorAll("button")].find(b=>b.textContent==="End practice").click();
  assert.ok(area.querySelector(".cp-panel button").textContent.includes("Start 5 cases"));
  w.LawAppCore.router.navigate("home");await settle();
  w.LawAppCore.router.navigate("practice");await settle();
  assert.ok(!area.textContent.includes("Retry 5 weak"),"Leaving the page discards session-only retry flags");
  assert.deepEqual(skipped.errors,[]);
  skipped.dom.window.close();
 }

 for(const subject of ["contract","torts","bns"]){
  const transfer=build("https://example.test/law-learning/index.html?v=50&course="+subject+"#practice");
  const w=transfer.dom.window,area=transfer.doc.getElementById("practice-root"),initial=w.localStorage.length;
  const launcher=[...area.querySelectorAll("button")].find(x=>x.textContent.includes("Changed-facts challenge"));
  assert.ok(launcher,"Changed-fact challenge must be visible in "+subject);
  launcher.click();
  for(let i=0;i<5;i++){
   assert.ok(area.textContent.includes("Scenario "+(i+1)+" of 5"),"Transfer challenge numbering must advance");
   const model=area.querySelector(".cp-transfer-model");
   assert.equal(model.hidden,true,"Transfer reasoning must initially be hidden");
   const reveal=[...area.querySelectorAll("button")].find(x=>x.textContent.includes("Compare with transfer reasoning"));
   assert.ok(reveal);
   reveal.click();
   assert.equal(model.hidden,true,"Empty answers may not reveal transfer reasoning");
   assert.ok(area.querySelector(".cp-error").textContent.includes("40 characters"));
   const draft=area.querySelector("textarea");
   assert.equal(draft.value,"","Changed-fact answer must not be prefilled");
   draft.value="The altered facts change the legal elements and how the rule applies; a qualified outcome needs specific evidence.";
   draft.dispatchEvent(new w.Event("input",{bubbles:true}));
   reveal.click();
   assert.equal(model.hidden,false,"Transfer reasoning must reveal after an original answer");
   assert.ok(model.textContent.includes("Why the changed fact matters"));
   assert.ok(model.textContent.includes("Mistake to avoid"));
   assert.ok([...model.querySelectorAll("a")].some(a=>a.href.startsWith("https://")),"Transfer reasoning must retain original official authorities");
   const next=[...area.querySelectorAll("button")].find(x=>x.textContent.includes("changed fact →")||x.textContent.includes("Finish transfer practice"));
   assert.ok(next);next.click();
  }
  assert.ok(area.textContent.includes("You tested changed facts"));
  assert.ok(area.textContent.includes("5 scenarios compared"));
  assert.equal(w.localStorage.length,initial,"Transfer answers must remain in memory only");
  const again=[...area.querySelectorAll("button")].find(x=>x.textContent.includes("Another changed-facts set"));
  again.click();
  assert.equal(area.querySelector(".cp-transfer-model").hidden,true);
  w.LawAppCore.router.navigate("home");await settle();
  assert.equal(area.textContent,"","Leaving transfer practice must discard the answer screen");
  assert.deepEqual(transfer.errors,[]);
  transfer.dom.window.close();
 }
 {
  const weak=build("https://example.test/law-learning/index.html?v=50&course=torts#practice");
  const area=weak.doc.getElementById("practice-root");
  [...area.querySelectorAll("button")].find(x=>x.textContent.includes("Start 5 cases")).click();
  for(let i=0;i<5;i++)[...area.querySelectorAll("button")].find(x=>x.textContent==="Skip case").click();
  [...area.querySelectorAll("button")].find(x=>x.textContent.includes("Retry 5 weak or skipped")).click();
  for(let i=0;i<5;i++)[...area.querySelectorAll("button")].find(x=>x.textContent==="Skip case").click();
  const follow=[...area.querySelectorAll("button")].find(x=>x.textContent.includes("Try changed facts from these units"));
  assert.ok(follow,"A weak-case retry must offer a changed-facts follow-up");
  follow.click();
  assert.ok(area.querySelector(".cp-facts").textContent.length>75);
  assert.equal(area.querySelector(".cp-transfer-model").hidden,true);
  assert.deepEqual(weak.errors,[]);
  weak.dom.window.close();
 }
 console.log("DOM integration passed: Contract, Torts, BNS IRAC, changed-facts transfer, recall and statutory checks.");
})().catch(err=>{console.error(err);process.exitCode=1;});

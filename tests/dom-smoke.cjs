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
 assert.ok(doc.querySelector("#syllabus-detail").textContent.includes("30 units"),"Source summary must reflect imported units");
 const contract=findButton(doc,"Contract – I");
 assert.ok(contract,"Contract course source status must be listed");contract.click();
 const unit=findButton(doc,"Unit I");
 assert.ok(unit,"Contract I unit must be selectable");unit.click();
 assert.ok(doc.querySelector("#syllabus-detail").textContent.includes("Official references"),"References page must render");
 assert.ok([...doc.querySelectorAll("#syllabus-detail a")].some(a=>a.href.includes("indiacode.nic.in")),"Primary legislation must be linked");
 assert.deepEqual(errors,[]);
 dom.window.close();

 const direct=build("https://example.test/law-learning/index.html?sources=1&v=34#syllabus");
 assert.ok(direct.doc.querySelector("#syllabus-detail").textContent.includes("30 units"),"Direct source URL must open review dashboard");
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
 const btn=[...u5doc.querySelectorAll(".c1-option")].find(b=>b.textContent===firstRight);
 assert.ok(btn);btn.click();u5doc.querySelector(".c1-next").click();
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
 console.log("DOM integration passed: KSLU sources, Contract Units I–V, questions, deep links and home course.");
})().catch(err=>{console.error(err);process.exitCode=1;});

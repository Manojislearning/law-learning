/* Exercise the full KSLU archive and model answer reader in a browser-like DOM. */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const {JSDOM,VirtualConsole}=require("jsdom");
const dir=path.resolve(__dirname,"..");
const html=fs.readFileSync(path.join(dir,"index.html"),"utf8");
const scripts=[...html.matchAll(/<script\s+src="\.\/([^"]+\.js)(?:\?[^"]+)?"><\/script>/g)].map(m=>m[1]);
const shell=html.replace(/<script\s+src="\.\/[^"]+"><\/script>/g,"");
const errors=[];
const consoleOut=new VirtualConsole();consoleOut.on("jsdomError",e=>errors.push(e.message));
const dom=new JSDOM(shell,{
 url:"https://example.test/law-learning/#papers",runScripts:"dangerously",pretendToBeVisual:true,virtualConsole:consoleOut,
 beforeParse(w){
  w.scrollTo=()=>{};
  w.HTMLElement.prototype.scrollIntoView=()=>{};
  w.matchMedia=()=>({matches:false,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){}});
  w.speechSynthesis=undefined;
 }
});
const d=dom.window.document,w=dom.window;
function nameIncludes(scope,selector,part){return [...scope.querySelectorAll(selector)].find(x=>x.textContent.includes(part));}
(async()=>{
 for(const src of scripts){
  const elem=d.createElement("script");
  elem.textContent=fs.readFileSync(path.join(dir,src),"utf8");
  d.body.appendChild(elem);
  assert.deepEqual(errors,[],"Application script error: "+src);
 }
 assert.equal(w.LawExamPapersV59.count,16);
 assert.equal(d.querySelectorAll(".exam59-question").length,16);
 assert.equal(d.querySelectorAll(".exam59-archive-link").length,5);
 assert.ok([...d.querySelectorAll(".exam59-archive-link")].some(a=>a.href.includes("bharatiya-nyaya-sanhita")));
 assert.ok(nameIncludes(d,".exam59-question","Define acceptance"),"Prior archived sample question missing");
 assert.ok(nameIncludes(d,".exam59-question","Common intention"),"New BNS answer missing");

 let b=nameIncludes(d,".exam59-chip","Criminal Law–I (BNS)");
 assert.ok(b);
 b.click();
 assert.equal(b.getAttribute("aria-pressed"),"true");
 assert.equal(d.querySelectorAll(".exam59-question").length,3);
 const q=nameIncludes(d,".exam59-question","culpable homicide");
 assert.ok(q);q.click();
 assert.equal(d.querySelector(".exam59-home").hidden,true);
 assert.equal(d.querySelector(".exam59-reader").hidden,false);
 assert.ok(d.querySelector(".exam59-origin").textContent.includes("Original model"));
 assert.ok(d.querySelector(".exam59-caution").textContent.includes("not been verified"));
 assert.ok(d.querySelector(".exam59-panel").textContent.includes("Decode the question"));
 assert.equal(d.querySelector(".exam59-answer").hidden,true,"Full answer must not appear before self-attempt");
 assert.equal(d.querySelectorAll(".exam59-answer .exam59-section").length,6);
 const draft=d.querySelector(".exam59-draft");
 draft.value="My private test response with an argument and statutory provisions.";
 const reveal=d.querySelector(".exam59-reveal");
 reveal.click();
 assert.equal(d.querySelector(".exam59-answer").hidden,false);
 assert.ok(d.querySelector(".exam59-answer").textContent.includes("Section 100"));
 assert.equal(reveal.getAttribute("aria-expanded"),"true");
 assert.ok(d.querySelectorAll(".exam59-source[href^='https://']").length>=1);
 reveal.click();
 assert.equal(d.querySelector(".exam59-answer").hidden,true);
 assert.ok(d.querySelector(".exam59-note").textContent.length>25);
 assert.equal(w.localStorage.getItem("law-learning-exam-drafts"),null,"Essays must not be saved");
 d.querySelector(".exam59-back").click();
 assert.equal(d.querySelectorAll(".exam59-question").length,3,"Back should preserve subject filter");
 b=nameIncludes(d,".exam59-chip","All subjects");b.click();
 assert.equal(d.querySelectorAll(".exam59-question").length,16);
 const search=d.querySelector(".exam59-search");
 search.value="privacy";search.dispatchEvent(new w.Event("input",{bubbles:true}));
 assert.equal(d.querySelectorAll(".exam59-question").length,1,"Search must narrow to Article 21 privacy question");
 assert.deepEqual(errors,[]);
 dom.window.close();
 console.log("Past-paper DOM passed: archive links, 16 answers, BNS subject, disclosure, notes and search.");
})().catch(err=>{console.error(err);dom.window.close();process.exitCode=1;});

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
 console.log("DOM integration passed: home -> syllabus -> sources -> Contract I -> Unit I, and direct source URL.");
})().catch(err=>{console.error(err);process.exitCode=1;});

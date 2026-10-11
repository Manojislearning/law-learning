/* Student hub v60: direct routing, grouping and contextual Back regression. */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const {JSDOM,VirtualConsole}=require("jsdom");
const root=path.resolve(__dirname,"..");
const html=fs.readFileSync(path.join(root,"index.html"),"utf8");
const scripts=[...html.matchAll(/<script\s+src="\.\/([^"]+\.js)(?:\?[^"]+)?"><\/script>/g)].map(m=>m[1]);
const shell=html.replace(/<script\s+src="\.\/[^"]+"><\/script>/g,"");
function setup(hash){
 const errors=[],virtual=new VirtualConsole();
 virtual.on("jsdomError",err=>errors.push(err.message));
 const dom=new JSDOM(shell,{
  url:"https://example.test/law-learning/"+hash,runScripts:"dangerously",pretendToBeVisual:true,virtualConsole:virtual,
  beforeParse(w){
   w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};
   w.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){},addListener(){},removeListener(){}});
   w.speechSynthesis=undefined;
  }
 });
 const d=dom.window.document;
 for(const src of scripts){
  const element=d.createElement("script");
  element.textContent=fs.readFileSync(path.join(root,src),"utf8");
  d.body.appendChild(element);
  assert.deepEqual(errors,[],"Script error in "+src);
 }
 return {dom,w:dom.window,d,errors};
}
(async()=>{
 const {dom,w,d,errors}=setup("#home");
 const settle=()=>new Promise(resolve=>setTimeout(resolve,25));
 const home=d.querySelector("#home-view");
 const student=d.querySelector("#student-view");
 assert.equal(home.querySelectorAll('[data-open="student"]').length,1);
 assert.equal(home.querySelectorAll('[data-open="syllabus"],[data-open="subjects"],[data-open="papers"],a[href="./reader/?map=1"]').length,0);
 assert.equal(student.querySelectorAll('.student-hub-card').length,4);
 assert.ok(student.querySelector('a[href="./reader/?map=1"]'));
 home.querySelector('[data-open="student"]').click();
 await settle();
 assert.equal(w.LawAppCore.router.current(),"student");
 assert.equal(student.classList.contains("active"),true);
 assert.equal(d.getElementById("section-title").textContent,"Student");
 const links=["syllabus","subjects","papers"];
 for(const route of links){
   const button=student.querySelector('[data-open="'+route+'"]');
   assert.ok(button,"Student missing "+route);
   button.click();
   await settle();
   assert.equal(w.LawAppCore.router.current(),route);
   assert.equal(d.getElementById("back-home").textContent,"← Student");
   d.getElementById("back-home").click();
   await settle();
   assert.equal(w.LawAppCore.router.current(),"student");
   assert.equal(student.classList.contains("active"),true);
 }
 d.getElementById("back-home").click();
 await settle();
 assert.equal(w.LawAppCore.router.current(),"home");
 assert.equal(home.classList.contains("active"),true);
 assert.equal(d.getElementById("back-home").hidden,true);
 assert.deepEqual(errors,[]);
 dom.window.close();
 const direct=setup("#student");
 assert.equal(direct.w.LawAppCore.router.current(),"student");
 assert.equal(direct.d.getElementById("student-view").classList.contains("active"),true);
 direct.dom.window.close();
 console.log("Student hub DOM: four relocated links, direct entry and contextual Back navigation passed.");
})().catch(err=>{console.error(err);process.exitCode=1;});

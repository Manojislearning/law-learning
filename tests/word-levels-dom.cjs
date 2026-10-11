/* Browser DOM test: two level choice, larger reading text, stable local learning IDs. */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const {JSDOM,VirtualConsole}=require("jsdom");
const base=path.resolve(__dirname,".."),html=fs.readFileSync(path.join(base,"index.html"),"utf8");
const scripts=[...html.matchAll(/<script\s+src="\.\/([^"]+\.js)(?:\?[^"]+)?"><\/script>/g)].map(m=>m[1]);
const shell=html.replace(/<script\s+src="\.\/[^"]+"><\/script>/g,"");
const errors=[];
const logger=new VirtualConsole();logger.on("jsdomError",e=>errors.push(e.message));
const dom=new JSDOM(shell,{
 url:"https://example.test/law-learning/#words",runScripts:"dangerously",pretendToBeVisual:true,virtualConsole:logger,
 beforeParse(w){
  w.scrollTo=function(){};
  w.HTMLElement.prototype.scrollIntoView=function(){};
  w.matchMedia=function(){return{matches:false,addEventListener(){},removeEventListener(){},addListener(){},removeListener(){}};};
  w.speechSynthesis=undefined;
 }
});
const w=dom.window,d=w.document;
function text(sel){return d.querySelector(sel)?.textContent||"";}
function clickLevel(id){const button=d.querySelector('[data-wlevel="'+id+'"]');assert.ok(button);button.click();return button;}
function search(word){
 const input=d.getElementById("w-search");input.value=word;input.dispatchEvent(new w.Event("input",{bubbles:true}));
 return text("#w-results");
}
(async()=>{
 for(const src of scripts){
  const el=d.createElement("script");el.textContent=fs.readFileSync(path.join(base,src),"utf8");d.body.appendChild(el);
  assert.deepEqual(errors,[],"Script failed: "+src);
 }
 assert.equal(w.LawAppCore.router.current(),"words");
 assert.equal(d.querySelectorAll(".w-level").length,2);
 assert.ok(text("#w-level-position").includes("415"),"Legal level should display all original entries");
 assert.ok(d.querySelector(".w-level.active").textContent.includes("Legal Words"));
 assert.ok(search("Affidavit").includes("Affidavit"),"Legal search should find historical vocabulary");

 const english=clickLevel("advanced");
 assert.equal(english.getAttribute("aria-pressed"),"true");
 assert.ok(text("#w-level-position").includes("115"),"English level should display 115 new entries");
 assert.ok(text("#w-deck").includes("Cogent"),"First English lesson should be a genuine writing word");
 assert.ok(search("Affidavit").includes("No matches"),"Cross-level search should not silently mix games");
 assert.ok(search("Cogent").includes("Cogent"),"English search should include the new vocabulary");
 assert.equal(JSON.parse(w.localStorage.getItem("law-learning-word-level-v1")).level,"advanced");
 assert.ok(text("#w-level-position").includes("Word 1"));

 d.getElementById("w-got").click();
 const learned=w.LawAppCore.progress.load().learned;
 assert.equal(learned.has(415),true,"English word saved under appended index without remapping old data");
 assert.ok(text("#w-level-position").includes("Word 2"));

 clickLevel("legal");
 assert.ok(text("#w-level-position").includes("415"),"Legal level should not contain English words");
 assert.ok(text("#w-deck").includes("Affidavit"),"Returning to legal study must resume its old word");
 assert.ok(search("Affidavit").includes("Affidavit"));
 d.getElementById("w-revise").click();
 const data=w.LawAppCore.progress.load();
 assert.equal(data.learned.has(415),true,"Level change must not erase other level learning");
 assert.equal(data.difficult.has(0),true,"Existing legal revision index should be preserved");

 w.LawAppCore.router.navigate("home");
 await new Promise(r=>setTimeout(r,20));
 const news=d.querySelector('#home-view .home-card[data-open="news"]');
 assert.ok(news,"News home entry must still exist");
 assert.notEqual(w.getComputedStyle(news).display,"none","Word game must no longer hide other home features");
 assert.deepEqual(errors,[]);
 dom.window.close();
 console.log("Word levels DOM checks: preserved legal IDs, Advanced English, search, resume, progress and home navigation.");
})().catch(err=>{console.error(err);dom.window.close();process.exitCode=1;});

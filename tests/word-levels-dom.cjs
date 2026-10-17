/* v62: category selection, old IDs, direct spelling blanks, progress bar and Back navigation. */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const {JSDOM,VirtualConsole}=require("jsdom");
const base=path.resolve(__dirname,".."),html=fs.readFileSync(path.join(base,"index.html"),"utf8");
const scripts=[...html.matchAll(/<script\s+src="\.\/([^"]+\.js)(?:\?[^"]+)?"><\/script>/g)].map(m=>m[1]);
const shell=html.replace(/<script\s+src="\.\/[^"]+"><\/script>/g,"");
const errors=[],logger=new VirtualConsole();logger.on("jsdomError",e=>errors.push(e.message));
const dom=new JSDOM(shell,{
 url:"https://example.test/law-learning/#words",runScripts:"dangerously",pretendToBeVisual:true,virtualConsole:logger,
 beforeParse(w){w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};
  w.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){},addListener(){},removeListener(){}});
  w.speechSynthesis=undefined;}
});
const w=dom.window,d=w.document,delay=()=>new Promise(resolve=>setTimeout(resolve,25));
const val=selector=>d.querySelector(selector)?.textContent||"";
function clickLevel(key){const el=d.querySelector('[data-wlevel="'+key+'"]');assert.ok(el);el.click();return el;}
function search(term){const input=d.getElementById("w-search");input.value=term;input.dispatchEvent(new w.Event("input",{bubbles:true}));return val("#w-results");}
(async()=>{
 for(const src of scripts){
  const el=d.createElement("script");el.textContent=fs.readFileSync(path.join(base,src),"utf8");d.body.appendChild(el);
  assert.deepEqual(errors,[],"Application script crashed: "+src);
 }
 assert.equal(w.LawAppCore.router.current(),"words");
 assert.equal(d.querySelectorAll("#w-chooser .w-level").length,3,"Legal Words, Difficult Words and Confusing Words");
 assert.equal(d.getElementById("w-chooser").hidden,false,"Word selection page is the default");
 assert.equal(d.getElementById("w-practice").hidden,true,"Game must not start before a selection");
 assert.equal(d.querySelector("#w-game input[type=range]"),null,"No slider in the game");
 assert.ok(d.getElementById("w-progress").getAttribute("role")==="progressbar");

 clickLevel("advanced");
 assert.equal(d.getElementById("w-chooser").hidden,true);
 assert.equal(d.getElementById("w-practice").hidden,false);
 assert.ok(val("#w-level-position").includes("115"));
 assert.ok(val("#w-deck").includes("Cogent"));
 assert.ok(val("#w-deck").includes("Convincing because"),"The first card should include a definition");
 assert.ok(search("Affidavit").includes("No matches"));
 assert.ok(search("Cogent").includes("Cogent"));
 assert.equal(JSON.parse(w.localStorage.getItem("law-learning-word-level-v1")).level,"advanced");

 d.getElementById("w-forward").click();
 d.getElementById("w-forward").click();
 assert.ok(val("#w-deck").includes("Spell it"));
 assert.ok(!val("#w-deck").includes("Convincing because"),"Spelling card must not show definition");
 const inputs=[...d.querySelectorAll("#w-deck .w-spell-blank")];
 assert.equal(inputs.length,2,"Cogent has two intentionally missing letters");
 assert.ok(!d.querySelector("#w-deck input[placeholder='Missing letters']"));
 inputs[0].value="o";inputs[0].dispatchEvent(new w.Event("input",{bubbles:true}));
 assert.equal(d.activeElement,inputs[1],"Typing should focus next blank");
 inputs[1].value="n";inputs[1].dispatchEvent(new w.Event("input",{bubbles:true}));
 d.querySelector("#w-deck .w-spell-form").dispatchEvent(new w.Event("submit",{bubbles:true,cancelable:true}));
 assert.ok(val("#w-deck").includes("Correct spelling."),"Inline spelling should be checked");
 assert.ok(inputs.every(x=>x.disabled));
 assert.equal(d.getElementById("w-progress").getAttribute("aria-valuenow"),"3");
 assert.equal(d.getElementById("w-progress-fill").style.width,"30%");

 d.getElementById("w-got").click();
 assert.equal(w.LawAppCore.progress.load().learned.has(415),true);
 assert.ok(val("#w-level-position").includes("Word 2"));

 d.getElementById("w-change-level").click();
 assert.equal(d.getElementById("w-chooser").hidden,false,"User can return to selection");
 clickLevel("legal");
 assert.ok(val("#w-level-position").includes("415"));
 assert.ok(val("#w-deck").includes("Affidavit"));
 assert.ok(val("#w-deck").includes("A written statement"),"Legal first card should include definition");
 assert.ok(search("Affidavit").includes("Affidavit"));
 d.getElementById("w-revise").click();
 assert.equal(w.LawAppCore.progress.load().learned.has(415),true);
 assert.equal(w.LawAppCore.progress.load().difficult.has(0),true);

 d.getElementById("back-home").click();
 assert.equal(d.getElementById("w-chooser").hidden,false,"First Back returns to chooser");
 await delay();assert.equal(w.LawAppCore.router.current(),"words");
 d.getElementById("back-home").click();await delay();
 assert.equal(w.LawAppCore.router.current(),"home","Second Back returns to Home");
 assert.equal(d.getElementById("w-practice").hidden,true);
 assert.ok(d.querySelector('#home-view .home-card[data-open="news"]'));
 assert.deepEqual(errors,[]);
 dom.window.close();
 console.log("Learn Words v62 DOM passed: chooser, definitions, inline spelling, progress, saved IDs and Back.");
})().catch(err=>{console.error(err);dom.window.close();process.exitCode=1;});

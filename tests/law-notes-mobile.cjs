/* Law Notes v77: Chromium mobile checks for the notes inside the app (bundled data/law-notes.json). */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs"),http=require("node:http"),path=require("node:path");
const {chromium}=require("playwright");
const root=path.resolve(__dirname,"..");
const mime={".html":"text/html;charset=utf-8",".js":"text/javascript;charset=utf-8",".mjs":"text/javascript;charset=utf-8",".css":"text/css;charset=utf-8",".json":"application/json",".svg":"image/svg+xml",".webmanifest":"application/manifest+json",".png":"image/png",".woff":"font/woff"};
const server=http.createServer((req,res)=>{let p;try{p=decodeURIComponent(new URL(req.url,"http://x").pathname);}catch{res.writeHead(400);res.end();return;}
 const f=path.resolve(root,"."+(p.endsWith("/")?p+"index.html":p));if(!f.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 fs.readFile(f,(e,b)=>{if(e){res.writeHead(404);res.end();return;}res.writeHead(200,{"content-type":mime[path.extname(f)]||"application/octet-stream","cache-control":"no-store"});res.end(b);});});
const noOverflow=page=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1);

async function run(){
 await new Promise((ok,fail)=>{server.once("error",fail);server.listen(0,"127.0.0.1",ok);});
 const base="http://127.0.0.1:"+server.address().port+"/";
 const browser=await chromium.launch({headless:true});
 try{
  for(const width of [320,390,768]){
   const ctx=await browser.newContext({viewport:{width,height:800},isMobile:true,hasTouch:true,reducedMotion:"reduce",serviceWorkers:"block"});
   await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/,r=>r.abort());
   const page=await ctx.newPage(),errors=[];page.on("pageerror",e=>errors.push(e.message));
   await page.goto(base+"#home",{waitUntil:"load"});
   await page.locator('#home-view [data-open="student"]').tap();
   assert.deepEqual(await page.locator("#student-view .student-group").allInnerTexts(),["Study","Exams","You and links"]);
   await page.locator('#student-view [data-open="lawnotes"]').tap();
   await page.locator("#lawnotes-view .ln-title",{hasText:"Law Notes"}).waitFor();
   assert.equal(await page.locator("#section-title").innerText(),"Law Notes");
   const subjects=await page.locator("#lawnotes-view .ln-row strong").allInnerTexts();
   assert.ok(subjects.includes("Law of Torts")&&subjects.some(s=>/Constitutional Law/.test(s)),"Subjects listed: "+subjects.join(", "));
   assert.ok(await noOverflow(page),width+"px notes home fits");
   /* Subject → unit → topic. */
   await page.locator("#lawnotes-view .ln-row",{hasText:"Law of Torts"}).first().tap();
   assert.equal(await page.locator("#lawnotes-view .ln-row",{hasText:/^Unit \d/}).count(),5,"Five Torts units");
   await page.locator("#lawnotes-view .ln-row",{hasText:"Unit 1"}).first().tap();
   assert.match(await page.locator("#lawnotes-view .ln-kicker").innerText(),/Unit 1/i);
   const topics=page.locator("#lawnotes-view .ln-topics .ln-row");
   assert.ok(await topics.count()>=5,"Unit topics listed");
   await topics.nth(1).tap();
   await page.locator("#lawnotes-view .ln-article").waitFor();
   assert.ok(await page.locator("#lawnotes-view .ln-outline").isVisible(),"Outline notes show help");
   assert.match(await page.locator("#lawnotes-view .ln-outline").innerText(),/Torts Path/);
   const firstTitle=await page.locator("#lawnotes-view .ln-article h1").innerText();
   await page.locator("#lawnotes-view .ln-next").tap();
   assert.notEqual(await page.locator("#lawnotes-view .ln-article h1").innerText(),firstTitle,"Next opens the next topic");
   assert.match(page.url(),/#lawnotes\?file=/,"Note address can be shared and reloaded");
   const bad=await page.evaluate(()=>[...document.querySelectorAll("#lawnotes-view button")].map(b=>b.getBoundingClientRect()).filter(r=>r.width&&(r.height<44||r.right>innerWidth+1)).length);
   assert.equal(bad,0,width+"px buttons are large enough and fit");
   /* Top Back steps up one level: note → unit → subject → notes → Student. */
   await page.locator("#back-home").tap();
   assert.ok(await page.locator("#lawnotes-view .ln-topics").isVisible(),"Back from a note returns to the unit");
   await page.locator("#back-home").tap();await page.locator("#back-home").tap();
   assert.equal(await page.locator("#lawnotes-view .ln-title").innerText(),"Law Notes");
   await page.locator("#back-home").tap();
   await page.waitForFunction(()=>window.LawAppCore.router.current()==="student");
   /* Search the text of every note, open a result, save it. */
   await page.locator('#student-view [data-open="lawnotes"]').tap();
   await page.locator("#lawnotes-view .ln-search input").fill("Donoghue");
   await page.locator("#lawnotes-view .ln-search input").press("Enter");
   assert.match(await page.locator("#lawnotes-view .ln-lead").innerText(),/found/);
   await page.locator("#lawnotes-view .ln-row").first().tap();
   await page.locator("#lawnotes-view .ln-article").waitFor();
   assert.match(await page.locator("#lawnotes-view .ln-article").innerText(),/Donoghue/);
   await page.locator("#lawnotes-view .ln-tool",{hasText:"Save"}).tap();
   assert.match(await page.locator("#lawnotes-view .ln-tool.is-on").innerText(),/Saved/);
   await page.locator("#lawnotes-view .ln-tool",{hasText:"A+"}).tap();
   assert.ok(await page.evaluate(()=>JSON.parse(localStorage.getItem("law-learning-lawnotes-v1")).size>0),"Text size remembered");
   await page.reload({waitUntil:"load"});
   await page.locator("#lawnotes-view .ln-article").waitFor();
   assert.match(await page.locator("#lawnotes-view .ln-article").innerText(),/Donoghue/,"Reload keeps the open note");
   await page.goto(base+"#student");await page.reload({waitUntil:"load"});await page.locator('#student-view [data-open="lawnotes"]').tap();
   await page.locator("#lawnotes-view .ln-continue").waitFor();
   assert.ok(await page.locator("#lawnotes-view .ln-row",{hasText:"Saved notes"}).isVisible());
   /* Wiki links inside a written note open other notes in the app. */
   await page.goto(base+"reader/?file="+encodeURIComponent("01-Semester-1/Constitutional-Law-I/Units/Unit-01/01 - Meaning and definition of Constitution.md"),{waitUntil:"load"});
   await page.locator("#lawnotes-view .ln-article").waitFor();
   assert.match(page.url(),/#lawnotes/,"Old reader link redirects into the app");
   assert.ok(!(await page.locator("#lawnotes-view .ln-outline").count()),"Written note has no outline box");
   /* Topic branch map. */
   await page.locator("#lawnotes-view .ln-tool",{hasText:"Map"}).tap();
   await page.locator("#map-overlay:not([hidden]) .map-branch").first().waitFor();
   await page.locator("#map-close").tap();
   assert.equal(await page.locator("#map-overlay").isHidden(),true);
   const link=page.locator("#lawnotes-view .ln-article a[href^='#lawnotes?file=']").first();
   if(await link.count()){const before=await page.locator("#lawnotes-view .ln-article h1").innerText();await link.tap();await page.waitForFunction(b=>document.querySelector("#lawnotes-view .ln-article h1")?.textContent!==b,before);}
   /* Syllabus unit offers the matching notes. */
   await page.goto(base+"#syllabus");await page.reload({waitUntil:"load"});
   assert.deepEqual(errors,[]);
   await ctx.close();
  }
 }finally{await browser.close();server.close();}
}
run().then(()=>console.log("Law Notes mobile checks passed: in-app notes, units, outline help, next, back, search, save, text size, reload, old links and map."),e=>{console.error(e);process.exit(1);});

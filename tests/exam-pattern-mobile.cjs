/* Exam Pattern v64: Chromium mobile-viewport checks against the real static app.
 * Desktop Chromium mobile emulation, NOT a physical Android-device test. */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const http=require("node:http");
const path=require("node:path");
const {chromium}=require("playwright");
const root=path.resolve(__dirname,"..");
const mime={".html":"text/html;charset=utf-8",".js":"text/javascript;charset=utf-8",".css":"text/css;charset=utf-8",".json":"application/json",".webmanifest":"application/manifest+json",".svg":"image/svg+xml"};
const server=http.createServer((req,res)=>{
 let pathname;try{pathname=decodeURIComponent(new URL(req.url,"http://localhost").pathname);}catch{res.writeHead(400);res.end();return;}
 const wanted=path.resolve(root,"."+(pathname==="/"?"/index.html":pathname));
 if(!wanted.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 fs.readFile(wanted,(err,bytes)=>{if(err){res.writeHead(404);res.end();return;}
  res.writeHead(200,{"content-type":mime[path.extname(wanted)]||"application/octet-stream","cache-control":"no-store"});res.end(bytes);});
});
async function run(){
 await new Promise((ok,fail)=>{server.once("error",fail);server.listen(0,"127.0.0.1",ok);});
 const base="http://127.0.0.1:"+server.address().port+"/";
 const browser=await chromium.launch({headless:true});
 try{
  for(const width of [320,390,768]){
   const context=await browser.newContext({viewport:{width,height:760},isMobile:true,hasTouch:true,reducedMotion:"reduce"});
   await context.route(/^https?:\/\/(?!127\.0\.0\.1)/,r=>r.abort());
   const page=await context.newPage(),errors=[];
   page.on("pageerror",e=>errors.push(e.message));
   await page.goto(base+"#exam",{waitUntil:"load"});
   const view=page.locator("#exam-view");
   await view.locator(".xp-card").first().waitFor();
   assert.match(await view.locator(".xp-head").innerText(),/45 real papers/);
   assert.equal(await view.locator("h2").count(),0,"Topbar already shows the page title");
   assert.match(await view.locator(".xp-card").first().innerText(),/5 units × 16 = 80/);
   await view.getByRole("button",{name:"100 marks"}).tap();
   assert.match(await view.locator(".xp-card").first().innerText(),/Q9 \(compulsory\)/);
   await view.getByRole("button",{name:"Family Law – I"}).tap();
   assert.match(await view.locator(".xp-card").nth(1).innerText(),/Hindu Law/);
   const box=view.locator(".xp-topic input").first();
   await box.check();
   const stored=await page.evaluate(()=>JSON.parse(localStorage.getItem("law-learning-exam-prep-v1")));
   assert.equal(Object.keys(stored.ready).length,1,"Ticking a topic must persist on this device");
   assert.match(await view.locator(".xp-progress").innerText(),/^1 of /);
   await page.reload({waitUntil:"load"});
   await view.getByRole("button",{name:"Family Law – I"}).tap();
   assert.equal(await view.locator(".xp-topic input").first().isChecked(),true,"Tick survives reload");
   const problem=view.locator(".xp-problem").first();
   await problem.locator("summary").tap();
   assert.match(await problem.innerText(),/Apply:/);
   const metrics=await page.evaluate(()=>{
    const bad=[...document.querySelectorAll("#exam-view .xp-chip, #exam-view .xp-topic label")].filter(el=>el.getClientRects().length)
     .map(el=>el.getBoundingClientRect()).filter(r=>r.height<44||r.left<-1||r.right>innerWidth+1);
    return {bad:bad.length,scroll:document.documentElement.scrollWidth-innerWidth};
   });
   assert.equal(metrics.bad,0,width+"px: undersized or overflowing control");
   assert.ok(metrics.scroll<=1,width+"px: horizontal scroll "+metrics.scroll);
   assert.deepEqual(errors,[],"No page errors");
   if(process.env.SHOT)await page.screenshot({path:process.env.SHOT+"-"+width+".png",fullPage:false});
   await context.close();
  }
  console.log("Exam Pattern mobile checks passed at 320, 390 and 768px.");
 }finally{await browser.close();server.close();}
}
run().catch(e=>{console.error(e);process.exitCode=1;server.close();});

/* Timelines v80: Chromium mobile checks — list, filters, a timeline, icons, links, put-in-order, points, back. */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs"),http=require("node:http"),path=require("node:path");
const {chromium}=require("playwright");
const root=path.resolve(__dirname,"..");
const mime={".html":"text/html;charset=utf-8",".js":"text/javascript;charset=utf-8",".mjs":"text/javascript;charset=utf-8",".css":"text/css;charset=utf-8",".json":"application/json",".png":"image/png",".woff":"font/woff",".svg":"image/svg+xml"};
const server=http.createServer((req,res)=>{let p;try{p=decodeURIComponent(new URL(req.url,"http://x").pathname);}catch{res.writeHead(400);res.end();return;}
 const f=path.resolve(root,"."+(p.endsWith("/")?p+"index.html":p));if(!f.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 fs.readFile(f,(e,b)=>{if(e){res.writeHead(404);res.end();return;}res.writeHead(200,{"content-type":mime[path.extname(f)]||"application/octet-stream","cache-control":"no-store"});res.end(b);});});
async function run(){
 await new Promise((ok,fail)=>{server.once("error",fail);server.listen(0,"127.0.0.1",ok);});
 const base="http://127.0.0.1:"+server.address().port+"/";
 const browser=await chromium.launch({headless:true});
 try{
  for(const width of [320,390,768]){
   const ctx=await browser.newContext({viewport:{width,height:800},isMobile:true,hasTouch:true,reducedMotion:"reduce",serviceWorkers:"block"});
   await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/,r=>r.abort());
   const page=await ctx.newPage(),errors=[];page.on("pageerror",e=>errors.push(e.message));
   await page.goto(base+"#student",{waitUntil:"load"});
   await page.locator('#student-view [data-open="timelines"]').tap();
   await page.locator("#timelines-view .tl-card").first().waitFor();
   const total=await page.locator("#timelines-view .tl-card").count();assert.ok(total>=15,"timelines listed: "+total);
   await page.locator("#timelines-view .tl-chip",{hasText:"Contract"}).tap();
   const contract=await page.locator("#timelines-view .tl-card").count();assert.ok(contract>=3&&contract<total,"filter works");
   await page.locator("#timelines-view .tl-chip",{hasText:"All"}).tap();
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),width+"px list fits");
   await page.locator("#timelines-view .tl-card",{hasText:"Making of the Constitution"}).tap();
   await page.locator("#timelines-view .tl-event").first().waitFor();
   assert.ok(await page.locator("#timelines-view .tl-event").count()>=6);
   assert.equal(await page.locator("#timelines-view .tl-year").first().innerText(),"1946");
   assert.ok(await page.locator("#timelines-view .tl-art svg path").count()>10,"Sketch icons drawn");
   const hrefs=await page.locator("#timelines-view .tl-link").evaluateAll(a=>a.map(x=>x.href));
   assert.ok(hrefs.length&&hrefs.every(h=>h.startsWith("https://www.google.com/search?q=")),"Google links");
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),width+"px timeline fits");
   assert.equal(await page.locator("#back-home").innerText(),"← Timelines");
   /* Put in order: answer from the data. */
   const before=await page.evaluate(()=>window.LawPoints.total());
   await page.getByRole("button",{name:"Test yourself: put in order"}).tap();
   const order=await page.evaluate(()=>{const t=window.LAW_TIMELINES.list.find(x=>x.id==="constitution-making");const shown=[...document.querySelectorAll(".tl-option")].map(b=>b.textContent);return t.events.map(e=>e.title).filter(x=>shown.includes(x));});
   assert.ok(order.length>=4);
   assert.equal(await page.getByRole("button",{name:"Check order"}).isDisabled(),true);
   for(const t of order)await page.locator("#timelines-view .tl-option",{hasText:t}).first().tap();
   await page.getByRole("button",{name:"Check order"}).tap();
   assert.match(await page.locator("#timelines-view .tl-result-text").innerText(),/All in order! \+3 points/);
   assert.equal(await page.evaluate(()=>window.LawPoints.total())-before,3);
   /* A wrong order is marked. */
   await page.getByRole("button",{name:"Try again"}).tap();
   const opts=await page.locator("#timelines-view .tl-option").allInnerTexts();
   const t2=await page.evaluate(()=>window.LAW_TIMELINES.list.find(x=>x.id==="constitution-making").events.map(e=>e.title));
   const wrong=opts.slice().sort((a,b)=>t2.indexOf(b)-t2.indexOf(a));
   for(const t of wrong)await page.locator("#timelines-view .tl-option",{hasText:t}).first().tap();
   await page.getByRole("button",{name:"Check order"}).tap();
   assert.ok(await page.locator("#timelines-view .tl-slot.is-wrong").count()>0);
   assert.equal(await page.evaluate(()=>window.LawPoints.total())-before,3,"points only once");
   /* Back: quiz → list → Student. */
   await page.locator("#back-home").tap();
   assert.ok(await page.locator("#timelines-view .tl-card",{hasText:"✓ in order"}).count()>=1,"Done mark shown");
   await page.locator("#back-home").tap();
   await page.waitForFunction(()=>window.LawAppCore.router.current()==="student");
   /* Deep link. */
   await page.goto(base+"#timelines?t=champakam");await page.reload({waitUntil:"load"});
   await page.locator("#timelines-view .tl-title",{hasText:"Champakam"}).waitFor();
   assert.deepEqual(errors,[]);
   await ctx.close();
  }
 }finally{await browser.close();server.close();}
}
run().then(()=>console.log("Timelines mobile checks passed: list, filters, sketch icons, Google links, put-in-order, points once, back and deep link."),e=>{console.error(e);process.exit(1);});

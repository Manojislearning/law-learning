/* Case Book v81: case names become links across the app; sheet, word backlinks, Case Book screen. */
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
   let n=0;const go=async h=>{await page.goto(base+"?r="+(++n)+h,{waitUntil:"load"});};
   /* Timeline: case names are links. */
   await go("#timelines?t=torts-history");
   await page.locator("#timelines-view .case-link").first().waitFor();
   assert.ok(await page.locator("#timelines-view .case-link").count()>=5,"Timeline case links");
   await page.locator("#timelines-view .case-link",{hasText:"Donoghue v Stevenson"}).first().tap();
   const sheet=page.locator(".cb-sheet");await sheet.waitFor();
   assert.match(await sheet.locator(".cb-title").innerText(),/Donoghue v Stevenson/);
   for(const h of ["Facts","Issue","Held","✍ Write this in your exam"])assert.ok(await sheet.locator("h3",{hasText:h}).count(),h);
   assert.ok(await page.evaluate(()=>{const s=document.querySelector(".cb-sheet").getBoundingClientRect();return s.left>=-1&&s.right<=innerWidth+1;}),width+"px sheet fits");
   /* Word → meaning → backlinks → another case → back. */
   await sheet.locator(".cb-word",{hasText:"duty of care"}).first().tap();
   assert.match(await sheet.locator(".cb-kicker").innerText(),/Word meaning/);
   assert.ok(await sheet.locator(".cb-row").count()>=1,"Backlinks to cases");
   await sheet.locator(".cb-back").tap();
   assert.match(await sheet.locator(".cb-title").innerText(),/Donoghue/);
   /* Tapping the dark backdrop closes the sheet, without leaving the timeline. */
   await page.locator(".cb-overlay").tap({position:{x:8,y:8}});
   assert.equal(await page.locator(".cb-overlay").isHidden(),true);
   assert.ok(await page.locator("#timelines-view .tl-event").count()>0,"Still on the timeline");
   /* Torts Path: unanswered question stems and options are never links. */
   await page.evaluate(()=>localStorage.setItem("law-learning-torts-path-v1",JSON.stringify({done:{u1l1:1}})));
   await go("#torts");await page.locator(".tp-node.is-current").tap();await page.getByRole("button",{name:"Start lesson →"}).tap();
   await page.waitForTimeout(300);
   assert.equal(await page.locator(".tp-q .case-link,.tp-option .case-link").count(),0,"No links in the question or answers");
   if(await page.locator(".tp-case-name").count())assert.ok(await page.locator(".tp-case-name .case-link").count()>=1,"Case brief name is a link");
   /* Case Book screen: search and deep link. */
   await go("#cases");
   await page.locator("#cases-view .cb-row").first().waitFor();
   assert.ok(await page.locator("#cases-view .cb-row").count()>=90);
   await page.locator("#cases-view .cb-search input").fill("snail");
   assert.match(await page.locator("#cases-view .cb-row").first().innerText(),/Donoghue/);
   await page.locator("#cases-view .cb-tab",{hasText:"Word list"}).tap();
   assert.ok(await page.locator("#cases-view .cb-row").count()>=80,"Word list");
   await go("#cases?c=mohori");
   await page.locator(".cb-sheet .cb-title",{hasText:"Mohori Bibee"}).waitFor();
   await page.keyboard.press("Escape");
   assert.equal(await page.locator(".cb-overlay").isHidden(),true);
   assert.deepEqual(errors,[]);
   await ctx.close();
  }
 }finally{await browser.close();server.close();}
}
run().then(()=>console.log("Case Book mobile checks passed: links on screens, sheet, word backlinks, back, quiz safety, search, word list and deep link."),e=>{console.error(e);process.exit(1);});

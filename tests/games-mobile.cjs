/* Games v66: Chromium mobile checks for the Games chooser and the Confusing Words round. */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs"),http=require("node:http"),path=require("node:path");
const {chromium}=require("playwright");
const root=path.resolve(__dirname,"..");
const mime={".html":"text/html;charset=utf-8",".js":"text/javascript;charset=utf-8",".css":"text/css;charset=utf-8",".json":"application/json",".svg":"image/svg+xml",".webmanifest":"application/manifest+json"};
const server=http.createServer((req,res)=>{let p;try{p=decodeURIComponent(new URL(req.url,"http://x").pathname);}catch{res.writeHead(400);res.end();return;}
 const f=path.resolve(root,"."+(p==="/"?"/index.html":p));if(!f.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 fs.readFile(f,(e,b)=>{if(e){res.writeHead(404);res.end();return;}res.writeHead(200,{"content-type":mime[path.extname(f)]||"application/octet-stream","cache-control":"no-store"});res.end(b);});});
async function run(){
 await new Promise((ok,fail)=>{server.once("error",fail);server.listen(0,"127.0.0.1",ok);});
 const base="http://127.0.0.1:"+server.address().port+"/";
 const browser=await chromium.launch({headless:true});
 try{
  for(const width of [320,390,768]){
   const ctx=await browser.newContext({viewport:{width,height:780},isMobile:true,hasTouch:true,reducedMotion:"reduce"});
   await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/,r=>r.abort());
   const page=await ctx.newPage(),errors=[];page.on("pageerror",e=>errors.push(e.message));
   await page.goto(base+"#home",{waitUntil:"load"});
   await page.locator('#home-view [data-open="words"]').tap();
   await page.waitForFunction(()=>document.getElementById("section-title").textContent==="Games");
   assert.deepEqual(await page.locator("#w-chooser .w-level strong").allInnerTexts(),["Legal Words","Difficult Words","Confusing Words","Marriage Law Cases"]);
   await page.locator('#w-chooser [data-confuse]').tap();
   assert.match(await page.locator(".cw-title").innerText(),/Confusing Words/);
   const before=await page.evaluate(()=>window.LawPoints.total());
   assert.equal(await page.locator(".cw:not(.mlc) .cw-bar-btn").count(),3,"Three tap-to-play sets");
   assert.doesNotMatch(await page.locator(".cw:not(.mlc) .cw-bars").innerText(),/\d/,"No counts on sets");
   await page.locator(".cw:not(.mlc) .cw-bar-btn",{hasText:"All pairs"}).tap();
   let right=0;
   for(let i=0;i<10;i++){
    await page.locator(".cw-option").first().waitFor();
    assert.match(await page.locator(".cw-head").innerText(),new RegExp("Question "+(i+1)+" of 10"));
    /* Answer odd questions correctly using the data, even ones by picking the other word. */
    const pick=await page.evaluate(i=>{const s=document.querySelector(".cw-sentence").textContent.split("______");
     const q=[].concat(...window.CONFUSING_WORDS.map(set=>set.q.map(x=>({set,x})))).find(o=>{const p=o.x[0].split("____");return p[0]===s[0]&&p[1]===s[1];});
     const want=q.set.words[q.x[1]];return i%2?want:q.set.words.find(w=>w!==want);},i);
    if(i%2)right++;
    await page.locator(".cw-option",{hasText:new RegExp("^"+pick.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"$")}).tap();
    assert.equal(await page.locator(".cw-option:disabled").count(),await page.locator(".cw-option").count(),"Options lock after answering");
    assert.ok(await page.locator(".cw-explain").isVisible(),"Explanation appears after answering");
    if(i===0){
     const m=await page.evaluate(()=>{const v=[...document.querySelectorAll(".cw-option,.cw-primary,.cw-chip")].filter(e=>e.getClientRects().length).map(e=>e.getBoundingClientRect()).filter(r=>r.height<44||r.left<-1||r.right>innerWidth+1).length;return {v,s:document.documentElement.scrollWidth-innerWidth};});
     assert.equal(m.v,0,width+"px control too small or overflowing");assert.ok(m.s<=1,width+"px horizontal scroll");
    }
    await page.locator(".cw-card .cw-primary").tap();
   }
   assert.match(await page.locator(".cw-score").innerText(),new RegExp("^"+right+"/10"));
   assert.ok(await page.locator(".cw-pair").count()>=1,"Missed pairs are listed for review");
   const after=await page.evaluate(()=>window.LawPoints.total());
   assert.equal(after-before,right*3,"3 points per first correct answer");
   const stored=await page.evaluate(()=>JSON.parse(localStorage.getItem("law-learning-confusing-v1")));
   assert.equal(Object.keys(stored.missed).length,10-right);assert.equal(stored.played,1);
   await page.getByRole("button",{name:"Choose another set"}).tap();
   assert.match(await page.locator(".cw:not(.mlc) .cw-note").innerText(),/to revisit/);
   await page.locator("#back-home").tap();
   assert.equal(await page.locator("#w-chooser").isVisible(),true,"Back returns to the Games chooser");
   assert.deepEqual(errors,[]);
   /* Marriage Law Cases: play a full round, answering from the data. */
   await page.locator('#w-chooser [data-marriage]').tap();
   assert.match(await page.locator(".mlc .cw-title").innerText(),/Marriage Law Cases/);
   const mBefore=await page.evaluate(()=>window.LawPoints.total());
   const bars=page.locator(".mlc .cw-bar-btn");
   assert.ok(await bars.count()>=9,"Topic bars");
   assert.doesNotMatch(await page.locator(".mlc .cw-bars").innerText(),/\d/,"No counts on topics");
   const bh=await bars.first().boundingBox();assert.ok(bh.height>=60&&bh.width>=Math.min(width,650)-40,"Bars are large and full width");
   await page.locator(".mlc .cw-bar-btn",{hasText:"All cases"}).tap();
   let mRight=0;
   for(let i=0;i<8;i++){
    await page.locator(".mlc-option").first().waitFor();
    const want=await page.evaluate(()=>{const f=document.querySelector(".mlc-facts").textContent;const c=window.MARRIAGE_CASES.find(x=>x.facts===f);return c.options[c.answer];});
    const opts=page.locator(".mlc-option");const n=await opts.count();let tapped=false;
    for(let k=0;k<n;k++){const t=await opts.nth(k).innerText();if((i%3===0)?t!==want:t===want){await opts.nth(k).tap();tapped=true;break;}}
    assert.ok(tapped);if(i%3!==0)mRight++;
    assert.ok(await page.locator(".mlc .cw-explain").isVisible(),"Why panel shows");
    const hrefs=await page.locator(".mlc .cw-explain .cw-link").evaluateAll(a=>a.map(x=>x.href));
    assert.ok(hrefs.every(h=>h.startsWith("https://indiankanoon.org/search/?formInput=")),"Source links go to Indian Kanoon search");
    if(i===0){const bad=await page.evaluate(()=>[...document.querySelectorAll(".mlc-option,.mlc .cw-primary")].map(e=>e.getBoundingClientRect()).filter(r=>r.height<44||r.right>innerWidth+1).length);assert.equal(bad,0,width+"px marriage control size");}
    await page.locator(".mlc .cw-card .cw-primary").tap();
   }
   assert.match(await page.locator(".mlc .cw-score").innerText(),new RegExp("^"+mRight+"/8"));
   assert.equal(await page.evaluate(()=>window.LawPoints.total())-mBefore,mRight*3);
   await page.locator("#back-home").tap();
   assert.equal(await page.locator("#w-chooser").isVisible(),true);
   assert.deepEqual(errors,[]);
   if(width===390&&process.env.SHOT){await page.locator('#w-chooser [data-marriage]').tap();await page.locator(".mlc .cw-bar-btn",{hasText:"All cases"}).tap();await page.locator(".mlc-option").first().tap();await page.screenshot({path:process.env.SHOT,fullPage:true});}
   await ctx.close();
  }
  { const ctx=await browser.newContext({viewport:{width:390,height:780},isMobile:true,hasTouch:true});await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/,r=>r.abort());
    const page=await ctx.newPage();await page.goto(base+"#marriage",{waitUntil:"load"});
    await page.locator(".mlc .cw-title").waitFor();assert.equal(await page.locator(".mlc").isVisible(),true,"#marriage opens the game directly");
    assert.equal(await page.locator("#w-chooser").isVisible(),false);
    /* Leaving mid-round and starting again must not replay the same opening cases. */
    const firsts=[];
    for(let k=0;k<4;k++){
     await page.locator(".mlc .cw-bar-btn",{hasText:"All cases"}).tap();
     await page.locator(".mlc-facts").waitFor();firsts.push(await page.locator(".mlc-facts").innerText());
     await page.getByRole("button",{name:"← Games"}).tap();
     await page.locator('#w-chooser [data-marriage]').tap();
    }
    assert.equal(new Set(firsts).size,4,"Each fresh start opens with a different case");
    await ctx.close(); }
  { /* Paper & pen theme: on by default, fonts self-hosted, switch in Settings persists. */
    const ctx=await browser.newContext({viewport:{width:390,height:780},isMobile:true,hasTouch:true});await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/,r=>r.abort());
    const page=await ctx.newPage();await page.goto(base+"#settings",{waitUntil:"load"});
    assert.equal(await page.evaluate(()=>document.documentElement.classList.contains("paper")),true,"Paper style is on by default");
    await page.evaluate(()=>document.fonts.ready);
    assert.equal(await page.evaluate(()=>document.fonts.check('16px "Patrick Hand"')),true,"Handwriting fonts load from the app itself");
    await page.locator("#settings-paper").uncheck();
    assert.equal(await page.evaluate(()=>document.documentElement.classList.contains("paper")),false);
    await page.reload({waitUntil:"load"});
    assert.equal(await page.evaluate(()=>document.documentElement.classList.contains("paper")),false,"Choice survives reload");
    assert.equal(await page.locator("#settings-paper").isChecked(),false);
    await page.locator("#settings-paper").check();
    assert.equal(await page.evaluate(()=>document.documentElement.classList.contains("paper")),true);
    await ctx.close(); }
  console.log("Games checks passed at 320, 390 and 768px: chooser, Confusing Words and Marriage Law rounds, explanations, points, revisit list and Back.");
 }finally{await browser.close();server.close();}
}
run().catch(e=>{console.error(e);process.exitCode=1;server.close();});

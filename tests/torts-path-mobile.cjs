/* Torts Path v74: Chromium mobile checks — path, notes, all four question types, hearts, XP, points, unlock and deep link. */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs"),http=require("node:http"),path=require("node:path");
const {chromium}=require("playwright");
const root=path.resolve(__dirname,"..");
const mime={".html":"text/html;charset=utf-8",".js":"text/javascript;charset=utf-8",".css":"text/css;charset=utf-8",".json":"application/json",".svg":"image/svg+xml",".webmanifest":"application/manifest+json",".png":"image/png",".woff":"font/woff"};
const server=http.createServer((req,res)=>{let p;try{p=decodeURIComponent(new URL(req.url,"http://x").pathname);}catch{res.writeHead(400);res.end();return;}
 const f=path.resolve(root,"."+(p==="/"?"/index.html":p));if(!f.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 fs.readFile(f,(e,b)=>{if(e){res.writeHead(404);res.end();return;}res.writeHead(200,{"content-type":mime[path.extname(f)]||"application/octet-stream","cache-control":"no-store"});res.end(b);});});

/* Answer the question on screen: right when `good`, wrong otherwise. */
async function answer(page,good){
 return page.evaluate((good)=>{
  const D=window.TORTS_PATH,qText=document.querySelector(".tp-card .tp-q").textContent;
  const all=D.units.flatMap(u=>u.lessons.flatMap(l=>l.qs));
  const label=document.querySelector(".tp-card .cw-subject").textContent;
  if(label==="Tap the matching pairs"){
   const q=all.find(x=>x.t==="match"&&x.q===qText&&[...document.querySelectorAll(".tp-m")].some(b=>b.textContent===x.pairs[0][0]));
   const btn=t=>[...document.querySelectorAll(".tp-m")].find(b=>b.textContent===t&&!b.disabled);
   q.pairs.forEach(p=>{btn(p[0]).click();btn(p[1]).click();});
   return "match";
  }
  const isFill=label==="Fill in the blank";
  const q=all.find(x=>isFill?x.t==="fill"&&qText.startsWith(x.q.split("___")[0])&&qText.endsWith(x.q.split("___")[1]):x.t!=="match"&&x.q===qText);
  const want=q.t==="tf"?(q.a?"True":"False"):q.o[q.a];
  const opts=[...document.querySelectorAll(".tp-options .tp-option")];
  const pick=opts.find(b=>good?b.textContent===want:b.textContent!==want);
  pick.click();document.querySelector(".tp-check").click();
  return q.t;
 },good);
}

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
   await page.locator('#w-chooser [data-torts]').tap();
   assert.match(await page.locator(".tp .cw-title").innerText(),/Torts Path/);
   assert.equal(await page.locator(".tp-unit").count(),5,"Five units");
   assert.equal(await page.locator(".tp-node").count(),20,"Twenty lessons");
   assert.equal(await page.locator(".tp-node.is-locked").count(),19,"Only the first lesson is open");
   const overflow=await page.evaluate(()=>[...document.querySelectorAll(".tp-node,.tp-node-label,.tp-unit-head")].filter(e=>{const r=e.getBoundingClientRect();return r.left<-1||r.right>innerWidth+1;}).length);
   assert.equal(overflow,0,width+"px path fits");
   /* Locked lesson gives a hint and does not open. */
   await page.locator(".tp-node.is-locked").first().tap({force:true});
   assert.match(await page.locator(".tp-hint").innerText(),/Finish the lesson/);
   /* Guidebook. */
   await page.locator(".tp-notes-btn").first().tap();
   assert.equal(await page.locator(".tp-notes").count(),4,"Unit notes list each lesson");
   await page.getByRole("button",{name:"← Path"}).tap();
   const before=await page.evaluate(()=>window.LawPoints.total());
   /* Lesson 1: notes, then play with one deliberate mistake. */
   await page.locator(".tp-node.is-current").tap();
   assert.match(await page.locator(".tp-card .cw-subject").textContent(),/Quick notes/);
   await page.getByRole("button",{name:"Start lesson →"}).tap();
   const seen=new Set();let first=true,steps=0;
   while(await page.locator(".tp-card").count()&&steps<20){
    steps++;
    assert.equal(await page.locator(".tp-check").isDisabled().catch(()=>true),true,"Check waits for a choice");
    const label=await page.locator(".tp-card .cw-subject").textContent();
    const t=await answer(page,!(first&&label!=="Tap the matching pairs"));
    if(t!=="match"&&first){first=false;
     assert.match(await page.locator(".tp-feedback.is-wrong .tp-fb-title").innerText(),/Wrong/);
     assert.match(await page.locator(".tp-hearts").innerText(),/❤ 2/);
    }
    seen.add(t);
    if(steps===1){const bad=await page.evaluate(()=>[...document.querySelectorAll(".tp-option,.tp-continue,.tp-x")].map(e=>e.getBoundingClientRect()).filter(r=>r.height<44||r.right>innerWidth+1).length);assert.equal(bad,0,width+"px control size");}
    await page.locator(".tp-continue").tap();
   }
   assert.ok(seen.has("mcq")&&seen.has("tf")&&seen.has("fill")&&seen.has("match"),"All four question types played: "+[...seen]);
   assert.equal(steps,7,"Six questions plus the missed one again");
   assert.match(await page.locator(".tp .cw-title").innerText(),/Lesson complete/);
   assert.match(await page.locator(".tp-result").innerText(),/\+10/);
   assert.equal(await page.evaluate(()=>window.LawPoints.total())-before,10,"10 rank points, no perfect bonus");
   /* Next lesson is now open; play it perfectly. */
   await page.getByRole("button",{name:"Next lesson →"}).tap();
   await page.getByRole("button",{name:"Start lesson →"}).tap();
   while(await page.locator(".tp-card").count()){await answer(page,true);await page.locator(".tp-continue").tap();}
   assert.match(await page.locator(".tp-perfect").first().innerText(),/Perfect lesson/);
   assert.equal(await page.evaluate(()=>window.LawPoints.total())-before,25);
   await page.getByRole("button",{name:"Back to path"}).tap();
   assert.equal(await page.locator(".tp-node.is-done").count(),2);
   assert.match(await page.locator(".tp-stats").first().innerText(),/🔥 1[\s\S]*⭐ 25[\s\S]*20\/20/);
   /* Losing all hearts. */
   await page.locator(".tp-node.is-current").tap();await page.getByRole("button",{name:"Start lesson →"}).tap();
   for(let k=0;k<3;k++){const lab=await page.locator(".tp-card .cw-subject").textContent();if(lab==="Tap the matching pairs"){await answer(page,true);await page.locator(".tp-continue").tap();k--;continue;}await answer(page,false);await page.locator(".tp-continue").tap();}
   assert.match(await page.locator(".tp .cw-title").innerText(),/Out of hearts/);
   /* Back button returns to the path, then to Games. */
   await page.locator("#back-home").tap();
   assert.equal(await page.locator(".tp-unit").count(),5);
   await page.locator("#back-home").tap();
   assert.equal(await page.locator("#w-chooser").isVisible(),true);
   /* Progress survives reload. */
   await page.reload({waitUntil:"load"});
   assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem("law-learning-torts-path-v1")).xp),25);
   assert.deepEqual(errors,[]);
   if(width===390&&process.env.SHOT){await page.goto(base+"#torts",{waitUntil:"load"});await page.locator(".tp-unit").first().waitFor();await page.screenshot({path:process.env.SHOT});
    await page.locator(".tp-node.is-current").tap();await page.getByRole("button",{name:"Start lesson →"}).tap();await answer(page,false);await page.screenshot({path:process.env.SHOT.replace(".png","-q.png"),fullPage:true});}
   await ctx.close();
  }
  { const ctx=await browser.newContext({viewport:{width:390,height:780},isMobile:true,hasTouch:true});await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/,r=>r.abort());
    const page=await ctx.newPage();await page.goto(base+"#torts",{waitUntil:"load"});
    await page.locator(".tp .cw-title").waitFor();assert.equal(await page.locator(".tp").isVisible(),true,"#torts opens the path directly");
    await ctx.close(); }
 }finally{await browser.close();server.close();}
}
run().then(()=>console.log("Torts Path mobile checks passed"),e=>{console.error(e);process.exit(1);});

/* Chromium mobile viewport + keyboard smoke checks against the real static app.
 * This is desktop Chromium mobile emulation, NOT a physical Android-device test.
 */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const http=require("node:http");
const path=require("node:path");
const {chromium}=require("playwright");
const root=path.resolve(__dirname,"..");
function serve(req,res){
 let pathname;
 try{pathname=decodeURIComponent(new URL(req.url,"http://localhost").pathname);}
 catch{res.writeHead(400);res.end("Bad URL");return;}
 const wanted=path.resolve(root,"."+((pathname==="/")?"/index.html":pathname));
 if(wanted!==path.join(root,"index.html")&&!wanted.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 fs.readFile(wanted,(err,bytes)=>{
  if(err){res.writeHead(404);res.end("Missing");return;}
  const ext=path.extname(wanted);
  const mime={".html":"text/html;charset=utf-8",".js":"text/javascript;charset=utf-8",".css":"text/css;charset=utf-8",".json":"application/json;charset=utf-8",".webmanifest":"application/manifest+json",".svg":"image/svg+xml"};
  res.writeHead(200,{"content-type":mime[ext]||"application/octet-stream","cache-control":"no-store"});
  res.end(bytes);
 });
}
const server=http.createServer(serve);
async function run(){
 await new Promise((resolve,reject)=>{server.once("error",reject);server.listen(0,"127.0.0.1",resolve);});
 const address="http://127.0.0.1:"+server.address().port+"/?v=43#practice";
 const browser=await chromium.launch({headless:true});
 try{
  for(const width of [320,390,768]){
   const context=await browser.newContext({viewport:{width,height:740},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:"reduce"});
   const page=await context.newPage(),errors=[];
   page.on("pageerror",e=>errors.push(e.message));
   await page.goto(address,{waitUntil:"load"});
   await page.locator("#practice-root").getByRole("button",{name:/Start 5 cases/}).tap();
   const heading=page.locator("#practice-root h2").first();
   assert.equal(await heading.innerText(),"Read the facts");
   let measurements=await page.evaluate(()=>{
    const v=innerWidth;
    const targets=[document.querySelector("#practice-root .cp-panel"),document.querySelector("#practice-root .cp-writing textarea"),...document.querySelectorAll("#practice-root .cp-button")].filter(el=>el&&el.getClientRects().length>0);
    return targets.map(el=>({tag:el.tagName,left:el.getBoundingClientRect().left,right:el.getBoundingClientRect().right,height:el.getBoundingClientRect().height,v}));
   });
   assert.ok(measurements.every(x=>x.left>=-1&&x.right<=width+1&&x.height>=44),width+"px: a practice control overflows or is undersized "+JSON.stringify(measurements));
   const output=page.locator("#practice-root .cp-model");
   assert.equal(await output.isHidden(),true,"Reference must begin hidden at "+width+"px");
   await page.locator("#practice-root").getByRole("button",{name:/Reveal reference reasoning/}).tap();
   assert.equal(await output.isHidden(),true,"Must prevent reveal before an answer");
   const notice=page.locator("#practice-root .cp-error");
   assert.ok((await notice.innerText()).includes("40 characters"));
   await page.locator("#practice-root textarea").fill("Issue: Is there a concluded agreement? Rule: apply the relevant statutory provisions. Application: consider the actual facts. Conclusion: a reasoned result follows.");
   await page.locator("#practice-root").getByRole("button",{name:/Reveal reference reasoning/}).tap();
   assert.equal(await output.isVisible(),true,"Reference must appear after an answer");
   assert.equal(await page.evaluate(()=>document.activeElement?.classList.contains("cp-model")),true,"Keyboard focus should move to reference outline");
   const advice=page.locator("#practice-root .cp-coaching-list li");
   assert.equal(await advice.count(),4,"Four missing criteria should initially provide separate guidance");
   const rubric=page.locator("#practice-root .cp-rubric input");
   await rubric.nth(0).check();
   assert.equal(await advice.count(),3,"Checking one criterion removes only that suggestion");
   assert.ok((await page.locator("#practice-root .cp-result").innerText()).includes("1 of 4"));
   for(let i=1;i<4;i++)await rubric.nth(i).check();
   assert.equal(await advice.count(),1,"All checked provides a measured reminder, not a score");
   await page.locator("#practice-root .cp-coaching summary").click();
   assert.ok((await advice.first().innerText()).includes("Confirm"),"Opened optional coaching should show the all-checked reminder");
   assert.equal(errors.length,0,"Browser errors at "+width+"px: "+errors.join("; "));
   await context.close();
  }
  const context=await browser.newContext({viewport:{width:390,height:720},reducedMotion:"reduce"});
  const page=await context.newPage(),errors=[];
  page.on("pageerror",e=>errors.push(e.message));
  await page.goto(address,{waitUntil:"load"});
  const launch=page.locator("#practice-root").getByRole("button",{name:/Start 5 cases/});
  await launch.focus();
  await page.keyboard.press("Enter");
  assert.equal(await page.locator("#practice-root h2").first().innerText(),"Read the facts");
  assert.equal(await page.evaluate(()=>document.activeElement?.textContent),"Read the facts");
  const reveal=page.locator("#practice-root").getByRole("button",{name:/Reveal reference reasoning/});
  await page.locator("#practice-root textarea").fill("I identify the statutory issue, cite its relevant provision, apply the material facts and reach a qualified conclusion.");
  await reveal.focus();await page.keyboard.press("Enter");
  assert.equal(await page.locator("#practice-root .cp-model").isVisible(),true);
  assert.equal(await page.evaluate(()=>document.activeElement?.getAttribute("tabindex")),"-1","Focus target should be programmatically accessible");
  await page.locator("#practice-root").getByRole("button",{name:/Next case/}).click();
  assert.equal(await page.locator("#practice-root h2").first().innerText(),"Read the facts");
  assert.equal(await page.evaluate(()=>document.activeElement?.textContent),"Read the facts","Focus should follow the next case");
  assert.equal(errors.length,0);
  await context.close();

  for(const width of [320,390,768]){
   const context=await browser.newContext({viewport:{width,height:750},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:"reduce"});
   const page=await context.newPage(),errors=[];
   page.on("pageerror",e=>errors.push(e.message));
   await page.goto(address.replace("v=43#practice","v=46&law=bns#law-updates"),{waitUntil:"load"});
   const root=page.locator("#law-updates-root");
   assert.ok((await root.innerText()).includes("Section 106(2)"));
   const visible=await page.evaluate(()=>{
    const els=[...document.querySelectorAll("#law-updates-root button")].filter(el=>el.getClientRects().length);
    return els.map(el=>({name:el.innerText.slice(0,50),x:el.getBoundingClientRect().left,right:el.getBoundingClientRect().right,height:el.getBoundingClientRect().height}));
   });
   assert.ok(visible.every(x=>x.x>=-1&&x.right<=width+1&&x.height>=44),width+"px law check overflow or small target "+JSON.stringify(visible));
   const answer=page.locator("#law-updates-root .law-feedback");
   assert.equal(await answer.isVisible(),false,"Answer feedback must begin hidden");
   await page.locator("#law-updates-root .law-answer").first().tap();
   assert.equal(await answer.isVisible(),true,"Practice answer must reveal explanation");
   await page.locator("#law-updates-root .law-tab").filter({hasText:"Consumer"}).tap();
   assert.ok((await root.innerText()).includes("Syllabus history"),"Consumer tab should show historical statute caveat");
   assert.ok((await root.innerText()).includes("Consumer Protection Act, 2019"));
   await page.locator("#law-updates-root .law-tab").filter({hasText:"Motor Vehicles"}).tap();
   assert.ok((await root.innerText()).includes("No-fault compensation"));
   assert.ok((await root.innerText()).includes("₹5 lakh"));
   assert.equal(await page.locator("#law-updates-root .law-controls .law-tab").count(),3,"Only the three topic tabs are counted");
   assert.equal(errors.length,0,"Law check errors at "+width+"px: "+errors.join("; "));
   await context.close();
  }

  for(const width of [320,390,768]){
   const context=await browser.newContext({viewport:{width,height:760},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:"reduce"});
   const page=await context.newPage(),errors=[];
   page.on("pageerror",e=>errors.push(e.message));
   await page.goto(address.replace("v=43#practice","v=47&course=torts#practice"),{waitUntil:"load"});
   const root=page.locator("#practice-root");
   assert.equal(await root.locator('.cp-subjects button[aria-pressed="true"]').innerText(),"Law of Torts");
   const layout=await page.evaluate(()=>{
    const box=document.querySelector("#practice-root .cp-subjects").getBoundingClientRect();
    const items=[...document.querySelectorAll("#practice-root .cp-subjects button")].map(x=>x.getBoundingClientRect());
    return {x:box.left,right:box.right,b:items.map(i=>({left:i.left,right:i.right,height:i.height}))};
   });
   assert.ok(layout.x>=-1&&layout.right<=width+1,width+"px Torts subject selector overflow");
   assert.ok(layout.b.every(x=>x.left>=-1&&x.right<=width+1&&x.height>=44),width+"px Torts selector hit target insufficient");
   await root.getByRole("button",{name:/Start 5 cases/}).tap();
   assert.ok((await root.innerText()).includes("Law of Torts"));
   const model=root.locator(".cp-model");
   assert.equal(await model.isHidden(),true);
   await root.getByRole("button",{name:/Reveal reference reasoning/}).tap();
   assert.equal(await model.isHidden(),true);
   await root.locator("textarea").fill("I identify the tort issue and a relevant judicial or statutory rule, analyse the facts and possible defences, and reach a balanced conclusion.");
   await root.getByRole("button",{name:/Reveal reference reasoning/}).tap();
   assert.equal(await model.isVisible(),true);
   assert.ok((await model.locator(".cp-eyebrow").textContent()).includes("Law of Torts · Unit"),"Reference should reveal Torts subject and unit after the attempt");
   assert.ok((await model.locator("a.cp-case-source").count())>0);
   assert.equal(await root.locator(".cp-rubric input").count(),4);
   assert.equal(errors.length,0,width+"px Torts Chromium errors: "+errors.join("; "));
   await context.close();
  }
  console.log("Chromium UI passed: touch widths 320/390/768; answer reveal, four IRAC coaching stages; keyboard navigation, BNS/Consumer/Motor checks plus Torts practice and keyboard focus.");
 }finally{await browser.close();server.close();}
}
run().catch(e=>{console.error(e);server.close();process.exitCode=1;});

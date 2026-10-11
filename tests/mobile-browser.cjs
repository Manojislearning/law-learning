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
    const targets=[document.querySelector("#practice-root .cp-panel"),document.querySelector("#practice-root .cp-writing textarea"),...document.querySelectorAll("#practice-root .cp-button")];
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
   assert.ok((await advice.first().innerText()).includes("Confirm"));
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
  console.log("Chromium UI passed: touch widths 320/390/768; answer reveal, four IRAC coaching stages; keyboard navigation and focus.");
 }finally{await browser.close();server.close();}
}
run().catch(e=>{console.error(e);server.close();process.exitCode=1;});

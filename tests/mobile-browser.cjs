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

  for(const width of [320,390,768]){
   const context=await browser.newContext({viewport:{width,height:760},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:"reduce"});
   const page=await context.newPage(),errors=[];
   page.on("pageerror",e=>errors.push(e.message));
   await page.goto(address.replace("v=43#practice","v=48&course=bns#practice"),{waitUntil:"load"});
   const area=page.locator("#practice-root");
   assert.ok((await area.locator('.cp-subjects button[aria-pressed="true"]').innerText()).includes("BNS"));
   assert.equal(await area.locator(".cp-subjects button").count(),5,"Five subject choices must fit on mobile");
   const positions=await page.evaluate(()=>{
    const els=[...document.querySelectorAll("#practice-root .cp-subjects button")];
    return els.map(e=>({left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right,height:e.getBoundingClientRect().height}));
   });
   assert.ok(positions.every(x=>x.left>=-1&&x.right<=width+1&&x.height>=44),width+"px BNS subject buttons overflow or undersized "+JSON.stringify(positions));
   await area.getByRole("button",{name:/Start 5 cases/}).tap();
   const model=area.locator(".cp-model");
   assert.equal(await model.isHidden(),true);
   await area.getByRole("button",{name:/Reveal reference reasoning/}).tap();
   assert.equal(await model.isHidden(),true);
   await area.locator("textarea").fill("Issue: identify statutory offence. Rule: apply relevant BNS elements. Application: compare the stated facts and defences. Conclusion: qualified outcome.");
   await area.getByRole("button",{name:/Reveal reference reasoning/}).tap();
   assert.equal(await model.isVisible(),true);
   assert.ok((await model.locator(".cp-eyebrow").textContent()).includes("Criminal Law–I · BNS · Unit"));
   assert.ok(await model.locator('a[href*="indiacode.nic.in"]').count()>0);
   assert.equal(await area.locator(".cp-rubric input").count(),4);
   assert.equal(errors.length,0,width+"px BNS practice errors: "+errors.join("; "));
   await context.close();
  }

  {
   const context=await browser.newContext({viewport:{width:390,height:780},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:"reduce"});
   const page=await context.newPage(),errors=[];
   page.on("pageerror",e=>errors.push(e.message));
   await page.goto(address.replace("v=43#practice","v=49&course=torts#practice"),{waitUntil:"load"});
   const area=page.locator("#practice-root");
   await area.getByRole("button",{name:/Start 5 cases/}).tap();
   for(let i=0;i<5;i++)await area.getByRole("button",{name:"Skip case"}).tap();
   assert.ok((await area.innerText()).includes("0 cases compared with reference reasoning; 5 skipped."));
   const retry=area.getByRole("button",{name:/Retry 5 weak or skipped cases/});
   assert.equal(await retry.isVisible(),true);
   const box=await retry.boundingBox();assert.ok(box&&box.height>=44,"Retry button must remain touch accessible");
   await retry.tap();
   assert.equal(await area.locator(".cp-model").isHidden(),true,"Weak-case retry must never reveal the previous model answer");
   assert.equal(await area.locator("textarea").inputValue(),"","Student essay must not be prefilled or persisted");
   assert.ok((await area.innerText()).includes("SECOND ATTEMPT"));
   assert.equal(errors.length,0,"Torts retry mobile runtime errors: "+errors.join("; "));
   await context.close();
  }

  for(const width of [320,390,768]){
   const context=await browser.newContext({viewport:{width,height:760},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:"reduce"});
   const page=await context.newPage(),errors=[];page.on("pageerror",e=>errors.push(e.message));
   await page.goto(address.replace("v=43#practice","v=50&course=torts#practice"),{waitUntil:"load"});
   const area=page.locator("#practice-root");
   await area.getByRole("button",{name:/Changed-facts challenge/}).tap();
   assert.ok((await area.innerText()).includes("CHANGED FACTS"));
   const boxes=await page.evaluate(()=>{
    const nodes=[...document.querySelectorAll("#practice-root button,#practice-root textarea")].filter(el=>el.getClientRects().length);
    return nodes.map(el=>({name:el.tagName,left:el.getBoundingClientRect().left,right:el.getBoundingClientRect().right,height:el.getBoundingClientRect().height}));
   });
   assert.ok(boxes.every(b=>b.left>=-1&&b.right<=width+1&&b.height>=44),width+"px transfer controls should fit and be touch-accessible "+JSON.stringify(boxes));
   const model=area.locator(".cp-transfer-model");
   assert.equal(await model.isHidden(),true);
   await area.getByRole("button",{name:/Compare with transfer reasoning/}).tap();
   assert.equal(await model.isHidden(),true,"The model must stay hidden before an answer");
   await area.locator("textarea").fill("This revised fact changes the applicable rule and the likely conclusion; relevant evidence must still be checked before deciding.");
   await area.getByRole("button",{name:/Compare with transfer reasoning/}).tap();
   assert.equal(await model.isVisible(),true);
   assert.equal(await page.evaluate(()=>document.activeElement?.classList.contains("cp-transfer-model")),true,"Focus must move to the changed-facts reference");
   assert.ok(await model.locator("a[href^='https://']").count()>0);
   assert.equal(errors.length,0,"Transfer mobile browser runtime errors at "+width+"px: "+errors.join("; "));
   await context.close();
  }

  for(const width of [320,390,768]){
   const context=await browser.newContext({viewport:{width,height:760},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:"reduce"});
   const page=await context.newPage(),errors=[];page.on("pageerror",e=>errors.push(e.message));
   await page.goto(address.replace("v=43#practice","v=51&course=constitution#practice"),{waitUntil:"load"});
   const area=page.locator("#practice-root");
   assert.equal(await area.locator(".cp-subjects button").count(),5);
   assert.ok((await area.locator('.cp-subjects button[aria-pressed="true"]').innerText()).includes("Constitution"));
   const bounds=await page.evaluate(()=>[...document.querySelectorAll("#practice-root .cp-subjects button")].map(el=>({left:el.getBoundingClientRect().left,right:el.getBoundingClientRect().right,height:el.getBoundingClientRect().height})));
   assert.ok(bounds.every(b=>b.left>=-1&&b.right<=width+1&&b.height>=44),width+"px Constitution subject controls overflow "+JSON.stringify(bounds));
   await area.getByRole("button",{name:/Start 5 cases/}).tap();
   const model=area.locator(".cp-model");
   assert.equal(await model.isHidden(),true);
   await area.locator("textarea").fill("Issue: identify the relevant constitutional provision. Rule: consider the Constitution. Application: analyse the facts. Conclusion: qualify the result.");
   await area.getByRole("button",{name:/Reveal reference reasoning/}).tap();
   assert.equal(await model.isVisible(),true);
   assert.ok((await model.innerText()).toLowerCase().includes("constitutional law–i"),"Constitutional analysis must show the right course");
   assert.ok(await model.locator("a[href*='legislative.gov.in']").count()>0);
   const picks=area.locator(".cp-rubric input");
   assert.equal(await picks.count(),4);
   await picks.nth(1).check();
   assert.ok((await area.locator(".cp-coaching summary").innerText()).includes("3 unchecked"));
   assert.equal(errors.length,0,"Constitution mobile errors at "+width+"px: "+errors.join("; "));
   await context.close();
  }

  for(const width of [320,390,768]){
   const context=await browser.newContext({viewport:{width,height:760},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:"reduce"});
   const page=await context.newPage(),errors=[];page.on("pageerror",e=>errors.push(e.message));
   await page.goto(address.replace("v=43#practice","v=52&course=hindu#practice"),{waitUntil:"load"});
   const area=page.locator("#practice-root");
   assert.equal(await area.locator(".cp-subjects button").count(),5);
   assert.ok((await area.locator('.cp-subjects button[aria-pressed="true"]').innerText()).includes("Hindu Law"));
   const targets=await page.evaluate(()=>[...document.querySelectorAll("#practice-root .cp-subjects button")].map(el=>({left:el.getBoundingClientRect().left,right:el.getBoundingClientRect().right,height:el.getBoundingClientRect().height})));
   assert.ok(targets.every(x=>x.left>=-1&&x.right<=width+1&&x.height>=44),width+"px Hindu subject chooser fails touch check "+JSON.stringify(targets));
   await area.getByRole("button",{name:/Start 5 cases/}).tap();
   const model=area.locator(".cp-model");
   assert.equal(await model.isHidden(),true);
   await area.getByRole("button",{name:/Reveal reference reasoning/}).tap();
   assert.equal(await model.isHidden(),true,"Model cannot reveal from blank answer");
   await area.locator("textarea").fill("Issue: determine applicable Hindu statute. Rule: cite statutory section. Application: check dates, conditions and exceptions. Conclusion: reasoned result.");
   await area.getByRole("button",{name:/Reveal reference reasoning/}).tap();
   assert.equal(await model.isVisible(),true);
   assert.ok((await model.innerText()).toLowerCase().includes("hindu law"));
   assert.ok(await model.locator("a[href*='indiacode.nic.in']").count()>0);
   await area.locator(".cp-rubric input").nth(0).check();
   assert.ok((await area.locator(".cp-coaching summary").innerText()).includes("3 unchecked"));
   assert.equal(errors.length,0,"Hindu legal practice errors "+width+": "+errors.join("; "));
   await context.close();
  }

  for(const width of [320,390]){
   const context=await browser.newContext({viewport:{width,height:740},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:"reduce"});
   const page=await context.newPage(),errors=[];
   page.on("pageerror",err=>errors.push(err.message));
   await page.goto(address.replace("v=43#practice","v=54&course=torts#practice"),{waitUntil:"load"});
   const area=page.locator("#practice-root");
   await area.getByRole("button",{name:/Start 5 cases/}).tap();
   const structure=area.locator(".cp-reasoning").first();
   assert.equal(await structure.count(),1,"Case writing should offer optional fact/counterargument prompts");
   assert.ok((await structure.innerText()).includes("Improve your fact analysis"));
   assert.equal(await area.locator(".cp-model").isVisible(),false,"Case statute stays hidden before retrieval");
   await area.locator(".cp-writing textarea").fill("Issue: identify duty, breach or statutory claim. Rule: state the relevant legal test. Application: cite supporting facts and counterargument. Conclusion: a qualified outcome.");
   await area.getByRole("button",{name:/Reveal reference reasoning/}).tap();
   const unit=area.locator(".cp-unit-link");
   assert.equal(await unit.isVisible(),true,"Related syllabus unit appears only after answer");
   const rect=await unit.boundingBox();
   assert.ok(rect&&rect.height>=44&&rect.x>=0&&rect.x+rect.width<=width+1,"Study-unit link must remain usable at "+width+"px");
   await unit.tap();
   await page.waitForURL(/#syllabus$/);
   assert.ok((await page.locator("#syllabus-detail").innerText()).includes("Unit"),"Expected directly mapped syllabus unit");
   assert.equal(errors.length,0,"No case-to-unit browser errors: "+errors.join("; "));
   await context.close();
  }

  for(const width of [320,390]){
   const context=await browser.newContext({viewport:{width,height:740},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:"reduce"});
   const page=await context.newPage(),errors=[];
   page.on("pageerror",err=>errors.push(err.message));
   await page.goto(address.replace("v=43#practice","v=55&course=contract#practice"),{waitUntil:"load"});
   await page.evaluate(()=>{
    const w=window,rows=[["contract",w.LawCaseData],["torts",w.LawTortsCaseData],["bns",w.LawBnsCaseData],["constitution",w.LawConstitutionCaseData],["hindu",w.LawHinduCaseData]];
    rows.forEach(([subject,bank],i)=>w.LawCaseReviewCore.note(w.localStorage,subject,bank.cases[0].id,"skipped",[],Date.now()-100000-i*10000));
    w.LawCasePracticeUI.show();
   });
   const practice=page.locator("#practice-root");
   assert.ok((await practice.innerText()).includes("Daily Case Review"),"Due dashboard must be visible on phone");
   const daily=practice.getByRole("button",{name:/Review 5 due cases/});
   const rect=await daily.boundingBox();
   assert.ok(rect&&rect.height>=44&&rect.x>=-1&&rect.x+rect.width<=width+1,"Daily review CTA too small/overflow at "+width+"px");
   await daily.tap();
   assert.ok((await practice.innerText()).includes("DAILY REVIEW · DELAYED RETRIEVAL"));
   assert.equal(await practice.locator(".cp-model").isHidden(),true,"Daily review must not reveal old answer");
   assert.equal(await practice.locator(".cp-writing textarea").inputValue(),"");
   const skip=practice.getByRole("button",{name:"Skip case"});
   await skip.tap();
   assert.equal(await practice.locator(".cp-model").isHidden(),true);
   assert.equal(errors.length,0,"Daily phone browser runtime errors: "+errors.join("; "));
   await context.close();
  }
  // News v57: thumbnail, concise source brief and no horizontal overflow on phones.
   for(const width of [320,390,768]){
    const context=await browser.newContext({viewport:{width,height:740},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:"reduce"});
    const page=await context.newPage(),errors=[];page.on("pageerror",err=>errors.push(err.message));
    await page.route("https://raw.githubusercontent.com/Manojislearning/law-learning/main/data/news.json**", async route=>{
      await route.fulfill({status:200,contentType:"application/json",body:JSON.stringify({
        schema:1,generatedAt:"2026-10-11T10:00:00Z",items:[{
          id:"a123456789abcdef",title:"Supreme Court considers a question of public law",
          url:"https://example.org/verified-story",source:"Example News",publishedAt:"2026-10-11T09:00:00Z",
          category:"Supreme Court",priority:1,image:"https://images.example.org/legal-preview.jpg",
          brief:"The publisher describes the current proceedings and notes that the legal position requires confirmation from the official court order."
        }]
      })});
    });
    await page.route("https://images.example.org/legal-preview.jpg",async route=>{
      await route.fulfill({status:200,contentType:"image/png",body:Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9WlP+lEAAAAASUVORK5CYII=","base64")});
    });
    await page.goto(address.replace("v=43#practice","v=57#news"),{waitUntil:"load"});
    await page.locator("#news-root .news-story").first().waitFor();
    const image=page.locator("#news-root .news-image");
    assert.equal(await image.count(),1,"News image must appear at "+width+"px");
    assert.ok((await page.locator("#news-root .news-brief").innerText()).includes("The publisher describes"),"Publisher brief must render");
    const bounds=await page.evaluate(()=>{
      return [...document.querySelectorAll("#news-root .news-story,#news-root .news-image,#news-root .news-filters button,#news-root .news-actions a,#news-root .news-actions button")].filter(el=>el.getClientRects().length).map(el=>{
        const r=el.getBoundingClientRect();return {left:r.left,right:r.right,height:r.height,tag:el.tagName};
      });
    });
    assert.ok(bounds.every(b=>b.left>=-1&&b.right<=width+1),width+"px news image/card overflow: "+JSON.stringify(bounds));
    assert.ok(bounds.filter(x=>["BUTTON","A"].includes(x.tag)).every(x=>x.height>=44),"News touch target too short");
    assert.equal(errors.length,0,"News browser errors: "+errors.join("; "));
    await context.close();
   }
   // Readability and two word levels: actual Chromium on narrow viewports.
   for(const width of [320,390,768]){
    const context=await browser.newContext({viewport:{width,height:760},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:"reduce"});
    const page=await context.newPage(),errors=[];page.on("pageerror",err=>errors.push(err.message));
    await page.goto(address.replace("v=43#practice","v=58#words"),{waitUntil:"load"});
    const levels=page.locator(".w-level");
    assert.equal(await levels.count(),2,"Legal and Advanced English levels should be visible");
    assert.ok((await page.locator("#w-level-position").innerText()).includes("415"));
    const advanced=levels.filter({hasText:"Advanced English"});
    const bounds=await advanced.boundingBox();
    assert.ok(bounds&&bounds.width>100&&bounds.height>=44&&bounds.x>=0&&bounds.x+bounds.width<=width+1,"Advanced level button is not accessible at "+width+"px");
    await advanced.tap();
    assert.ok((await page.locator("#w-level-position").innerText()).includes("115"));
    assert.ok((await page.locator("#w-deck").innerText()).includes("Cogent"));
    await page.locator("#w-forward").tap();
    assert.ok((await page.locator("#w-deck").innerText()).includes("law answer"),"Writing example should be visible");
    const sizes=await page.evaluate(()=>{
      const selectors=["#w-level-position",".w-level.active strong","#w-deck .w-p"];
      return selectors.map(s=>{const n=document.querySelector(s);return {selector:s,size:parseFloat(getComputedStyle(n).fontSize),right:n.getBoundingClientRect().right};});
    });
    assert.ok(sizes.every(x=>x.size>=16&&x.right<=width+1),width+"px font too small or text overflowing "+JSON.stringify(sizes));
    await page.locator(".w-level").filter({hasText:"Legal Words"}).tap();
    assert.ok((await page.locator("#w-level-position").innerText()).includes("415"),"Level switch must retain original legal words");
    assert.equal(errors.length,0,"Word game v58 browser errors at "+width+"px: "+errors.join("; "));
    await context.close();
   }
   // KSLU exam v59: 16 question navigation, readable answer copy and touch controls.
   for(const width of [320,390,768]){
    const context=await browser.newContext({viewport:{width,height:760},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:"reduce"});
    const page=await context.newPage(),errors=[];page.on("pageerror",e=>errors.push(e.message));
    await page.goto(address.replace("v=43#practice","v=59#papers"),{waitUntil:"load"});
    const library=page.locator("#papers-view");
    assert.equal(await library.locator(".exam59-question").count(),16,"Model bank should have 16 answers");
    const filter=library.locator(".exam59-chip").filter({hasText:"Criminal Law–I (BNS)"});
    await filter.tap();
    assert.equal(await library.locator(".exam59-question").count(),3,"BNS subject filter should show 3 worked answers");
    await library.locator(".exam59-question").first().tap();
    assert.equal(await library.locator(".exam59-answer").isHidden(),true,"Answers should start private for self-testing");
    const reveal=library.locator(".exam59-reveal");
    await reveal.tap();
    assert.equal(await library.locator(".exam59-answer").isVisible(),true);
    const bounds=await page.evaluate(()=>{
     return [...document.querySelectorAll("#papers-view .exam59-reader .exam59-panel,#papers-view .exam59-reader .exam59-section p,#papers-view .exam59-reader button")].filter(e=>e.getClientRects().length).map(e=>{
      const b=e.getBoundingClientRect(),style=getComputedStyle(e);
      return {tag:e.tagName,width:b.width,left:b.left,right:b.right,height:b.height,font:parseFloat(style.fontSize)};
     });
    });
    assert.ok(bounds.every(x=>x.left>=-1&&x.right<=width+1),width+"px KSLU exam content overflows "+JSON.stringify(bounds));
    assert.ok(bounds.filter(x=>x.tag==="P").every(x=>x.font>=16),width+"px answer font must be readable");
    assert.ok(bounds.filter(x=>x.tag==="BUTTON").every(x=>x.height>=44),"Question controls must meet touch minimum");
    assert.equal(errors.length,0,"Exam reader browser errors "+width+"px: "+errors.join("; "));
    await context.close();
   }
   // Student hub v60: a single Home tile with four comfortably tappable study destinations.
   for(const width of [320,390,768]){
    const context=await browser.newContext({viewport:{width,height:760},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:"reduce"});
    const page=await context.newPage(),errors=[];page.on("pageerror",e=>errors.push(e.message));
    await page.goto(address.replace("v=43#practice","v=60#home"),{waitUntil:"load"});
    assert.equal(await page.locator('#home-view [data-open="student"]').count(),1);
    assert.equal(await page.locator('#home-view [data-open="syllabus"],#home-view [data-open="subjects"],#home-view [data-open="papers"],#home-view a[href="./reader/?map=1"]').count(),0);
    await page.locator('#home-view [data-open="student"]').tap();
    const student=page.locator("#student-view");
    assert.equal(await student.isVisible(),true);
    assert.equal(await student.locator(".student-hub-card").count(),4);
    assert.equal(await student.locator('a[href="./reader/?map=1"]').count(),1);
    const rectangles=await student.locator(".student-hub-card").evaluateAll(nodes=>nodes.map(node=>{
      const r=node.getBoundingClientRect();return {left:r.left,right:r.right,height:r.height};
    }));
    assert.ok(rectangles.every(x=>x.left>=-1&&x.right<=width+1&&x.height>=44),width+"px Student hub item overflow or touch target too small: "+JSON.stringify(rectangles));
    for(const route of ["syllabus","subjects","papers"]){
      await student.locator('[data-open="'+route+'"]').tap();
      await page.waitForURL(new RegExp("#"+route+"$"));
      assert.equal(await page.locator("#back-home").innerText(),"← Student");
      await page.locator("#back-home").tap();
      await page.waitForURL(/#student$/);
    }
    await page.locator("#back-home").tap();
    await page.waitForURL(/#home$/);
    assert.equal(errors.length,0,"Student navigation browser error at "+width+"px: "+errors.join("; "));
    await context.close();
   }
   console.log("Chromium UI passed: touch widths 320/390/768; answer reveal, four IRAC coaching stages; keyboard navigation, BNS/Consumer/Motor checks plus Hindu/Constitution/Torts/BNS practice, retry workflow, changed-facts transfer, weak-case unit jump and keyboard focus.");
 }finally{await browser.close();server.close();}
}
run().catch(e=>{console.error(e);server.close();process.exitCode=1;});

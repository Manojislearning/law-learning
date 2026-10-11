/* Vault Reader Android smoke test. GitHub is mocked; no credentials or private data. */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const http=require("node:http");
const path=require("node:path");
const {chromium}=require("playwright");
const root=path.resolve(__dirname,"..");
const docs={
 "00 - Notes.md":"# Law Notes Home\n\n## Subjects\n\n- [[01-Semester-1/Constitutional-Law-I/00 - Constitutional Law I|Constitutional Law I]]",
 "01-Semester-1/Constitutional-Law-I/00 - Constitutional Law I.md":"# Constitutional Law I\n\n## Unit 1\n\n- [[Preamble]]",
 "01-Semester-1/Constitutional-Law-I/Topics/Preamble.md":"# Preamble\n\n## Meaning\n\nJustice, liberty, equality and fraternity.\n\n- [[Constitutionalism|Constitutionalism]]\n\n## Main Values\n\nEquality and fraternity.\n\n## Exam Points\n\nExplain constitutional ideals.",
 "01-Semester-1/Constitutional-Law-I/Topics/Constitutionalism.md":"# Constitutionalism\n\n## Rule of Law\n\nPower is restrained by constitutional limits."
};
const paths=Object.keys(docs);
function serve(req,res){
 let pathname;
 try{pathname=decodeURIComponent(new URL(req.url,"http://localhost").pathname);}
 catch{res.writeHead(400);res.end();return;}
 const target=path.resolve(root,"."+(pathname.endsWith("/")?pathname+"index.html":pathname));
 if(!target.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 fs.readFile(target,(error,data)=>{
  if(error){res.writeHead(404);res.end("missing");return;}
  const ext=path.extname(target),mime={".html":"text/html;charset=utf-8",".mjs":"text/javascript;charset=utf-8",".css":"text/css;charset=utf-8",".svg":"image/svg+xml",".webmanifest":"application/manifest+json"};
  res.writeHead(200,{"content-type":mime[ext]||"application/octet-stream","cache-control":"no-store"});res.end(data);
 });
}
const server=http.createServer(serve);
async function main(){
 await new Promise((ok,bad)=>{server.once("error",bad);server.listen(0,"127.0.0.1",ok)});
 const browser=await chromium.launch({headless:true});
 try{
  for(const width of [320,390,768,1200]){
   const mobile=width<=850;
   const context=await browser.newContext({viewport:{width,height:790},deviceScaleFactor:1,isMobile:mobile,hasTouch:mobile,reducedMotion:"reduce",serviceWorkers:"block"});
   const page=await context.newPage(),errors=[];
   page.on("pageerror",e=>errors.push(e.message));
   await page.route("https://api.github.com/**",async route=>{
    const u=new URL(route.request().url());
    if(u.pathname.endsWith("/git/trees/main")){
     await new Promise(resolve=>setTimeout(resolve,140));
     return route.fulfill({status:200,contentType:"application/json",body:JSON.stringify({truncated:false,tree:paths.map(path=>({type:"blob",path}))})});
    }
    const marker="/repos/Manojislearning/LAW-NOTES/contents/";
    if(u.pathname.includes(marker)){
     const file=decodeURIComponent(u.pathname.slice(u.pathname.indexOf(marker)+marker.length));
     if(!(file in docs))return route.fulfill({status:404,contentType:"application/json",body:"{}"});
     return route.fulfill({status:200,contentType:"application/json",body:JSON.stringify({encoding:"base64",content:Buffer.from(docs[file]).toString("base64")})});
    }
    return route.abort();
   });
   await page.goto("http://127.0.0.1:"+server.address().port+"/reader/",{waitUntil:"domcontentloaded"});
   assert.equal(await page.locator("#loading-screen").isVisible(),true,"Animated splash appears on start");
   assert.equal(await page.locator("#token").count(),0,"No GitHub token on the starting page");
   assert.equal(await page.locator("#pages-btn").count(),0,"Pages/Scroll toggle is removed");
   await page.locator("#reader-view:not([hidden]) #article h1").first().waitFor();
   assert.match(await page.locator("#article").innerText(),/Law Notes Home/);
   assert.equal(await page.locator("#loading-screen").isVisible(),false,"Splash disappears when notes are ready");
   assert.equal(await page.locator(".bottom-nav").isVisible(),mobile);
   assert.equal(await page.locator("#markdown-btn").count(),0,"Markdown button has been removed");
   assert.equal(await page.locator("#font-btn").count(),0,"Duplicate Aa font button has been removed");
   assert.equal(await page.locator("#font-size").count(),1,"Display settings has the only font slider");
   await page.locator("#article a.wiki").first().click();
   await page.locator("#article h1").filter({hasText:"Constitutional Law I"}).waitFor();
   assert.equal(await page.locator("#map-btn").isHidden(),true,"Maps are only for topic notes");
   await page.locator("#article a.wiki").first().click();
   await page.locator("#article h1").filter({hasText:"Preamble"}).waitFor();
   assert.equal(await page.locator("#map-btn").isVisible(),true);
   const radius=await page.locator("#article").evaluate(el=>parseFloat(getComputedStyle(el).borderTopLeftRadius));
   assert.ok(radius>=20,"The notes surface needs visibly rounded edges, at "+width+"px");
   await page.locator("#map-btn").click();
   assert.equal(await page.locator("#map-overlay").isVisible(),true);
   assert.equal(await page.locator("#map-scene [data-id]").count(),4,
     "Only the current topic and its three immediate headings are visible");
   assert.equal(await page.locator("#map-scene [aria-label='Semester I']").count(),0);
   assert.equal(await page.locator("#map-scene .map-node rect").count(),0,
     "Previous rounded topic cards are not rendered");
   const mapNodes=()=>page.locator("#map-scene [data-id]");
   assert.equal(await page.locator("#map-scene [aria-label='Meaning']").getAttribute("aria-expanded"),"false");
   await page.locator("#map-scene [aria-label='Meaning']").click();
   assert.equal(await mapNodes().count(),3,"Opening Meaning focuses on Meaning and its two immediate children");
   assert.equal(await page.locator("#map-status").textContent(),"Meaning","Selected branch is now the map root");
   assert.equal(await page.locator("#map-scene [aria-label='Preamble']").count(),0,"The original root is hidden");
   assert.equal(await page.locator("#map-back").textContent(),"← Back");
   await page.locator("#map-scene [aria-label='Justice, liberty, equality and fraternity.']").click();
   await page.locator("#map-details:not([hidden]) #map-note-body p").first().waitFor();
   await page.locator("#map-detail-close").click();
   await page.locator("#map-back").click();
   assert.equal(await mapNodes().count(),4,"Back restores only the original immediate headings");
   assert.equal(await page.locator("#map-status").textContent(),"Preamble");
   assert.equal(await page.locator("#map-back").textContent(),"← Note");
   await page.locator("#map-scene [aria-label='Meaning']").click();
   await page.locator("#map-fit").click();
   const first=Number((await page.locator("#map-svg").getAttribute("viewBox")).split(" ")[2]);
   await page.locator("#map-zoom-in").click();
   const second=Number((await page.locator("#map-svg").getAttribute("viewBox")).split(" ")[2]);
   assert.ok(second<first,"+ zoom must enlarge branches, not zoom out");
   await page.locator("#map-zoom-out").click();
   const third=Number((await page.locator("#map-svg").getAttribute("viewBox")).split(" ")[2]);
   assert.ok(third>second,"− zoom must reduce the visual scale");
   const pinch=await page.locator("#map-svg").evaluate(svg=>{
    const b=svg.getBoundingClientRect(),x=b.left+75,y=b.top+100;
    const event=(type,id,v)=>svg.dispatchEvent(new PointerEvent(type,{bubbles:true,pointerId:id,pointerType:"touch",isPrimary:id===1,clientX:x+v,clientY:y}));
    const before=Number(svg.getAttribute("viewBox").split(" ")[2]);
    event("pointerdown",1,0);event("pointerdown",2,80);event("pointermove",2,150);
    const after=Number(svg.getAttribute("viewBox").split(" ")[2]);
    event("pointerup",2,150);event("pointerup",1,0);
    return {before,after};
   });
   assert.ok(pinch.after<pinch.before,"Two-finger zoom works in focused map");
   await page.locator("#map-fit").click();
   await page.locator("#map-scene [aria-label='Constitutionalism']").click();
   await page.locator("#map-scene [aria-label='Rule of Law']").waitFor();
   assert.equal(await page.locator("#map-status").textContent(),"Constitutionalism",
     "Linked notes also become the focused map root");
   await page.locator("#map-scene [aria-label='Rule of Law']").click();
   assert.equal(await page.locator("#map-status").textContent(),"Rule of Law");
   await page.locator("#map-scene [aria-label='Power is restrained by constitutional limits.']").click();
   await page.locator("#map-details:not([hidden]) #map-note-body p").first().waitFor();
   await page.locator("#map-read-note").click();
   await page.locator("#article h1").filter({hasText:"Constitutionalism"}).waitFor();
   assert.equal(await page.locator("#map-overlay").isVisible(),false);
   if(mobile)await page.locator("#bottom-next").click();
   else await page.locator("#next-note").click();
   await page.locator("#article h1").filter({hasText:"Preamble"}).waitFor();
   assert.equal(await page.locator("#up-note").isVisible(),true);
   await page.locator("#save-btn").click();
   assert.equal(await page.locator("#save-btn").evaluate(el=>el.classList.contains("saved")),true);
   await page.locator("#settings-btn").click();
   assert.equal(await page.locator("#prefs").isVisible(),true);
   await page.locator("#font-size").evaluate(el=>{el.value="22";el.dispatchEvent(new Event("input",{bubbles:true}))});
   assert.equal(await page.locator("#font-size-label").textContent(),"22px");
   await page.locator("#close-prefs").click();
   assert.equal(await page.locator("#prefs").isVisible(),false);
   if(mobile){
    await page.locator("#menu-btn").click();
    assert.equal(await page.locator("#sidebar").evaluate(el=>el.classList.contains("open")),true);
    await page.locator("#search").fill("Preamble");
    await page.locator("#sidebar-content [data-note]").first().click();
    assert.match(await page.locator("#article").innerText(),/Justice, liberty, equality/);
    assert.equal(await page.locator("#sidebar").evaluate(el=>el.classList.contains("open")),false);
   }
   const layout=await page.evaluate(()=>({
    page:document.documentElement.scrollWidth,
    elements:[...document.querySelectorAll(".masthead,.reader-toolbar,#article,.bottom-nav")].filter(e=>e.offsetWidth>0).map(e=>({left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right}))
   }));
   assert.ok(layout.page<=width+2,width+"px horizontal overflow: "+JSON.stringify(layout));
   assert.ok(layout.elements.every(x=>x.left>=-2&&x.right<=width+2),width+"px controls overflow");
   assert.deepEqual(errors,[],"Browser errors at "+width+"px");
   console.log("Reader "+width+"px: progressive brain branches, mobile unfold, linked note expansion, pinch, one font setting and navigation pass");
   await context.close();
  }
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve))}
}
main().catch(error=>{console.error(error);process.exitCode=1;server.close()});

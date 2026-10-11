/* Mobile Vault Reader smoke test: mocked private GitHub API, never real credentials. */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const http=require("node:http");
const path=require("node:path");
const {chromium}=require("playwright");
const root=path.resolve(__dirname,"..");
const htmlFiles={
 "HOME - Start Here.md":"# Law Notes Home\n\nOpen [[01-Semester-1/Constitutional-Law-I/00 - Constitutional Law I|Constitutional Law I]].\n\n## Start here\n\nYour studies organised.",
 "01-Semester-1/Constitutional-Law-I/00 - Constitutional Law I.md":
 "# Constitutional Law I\n\n## Unit 1\n\nThe [[Preamble]] sets out the Constitution's aims.",
 "01-Semester-1/Constitutional-Law-I/Preamble.md":
 "# Preamble\n\n## Meaning\n\nJustice, liberty, equality and fraternity."
};
const paths=Object.keys(htmlFiles);
function serve(req,res){
 let pathname;
 try{pathname=decodeURIComponent(new URL(req.url,"http://localhost").pathname);}
 catch{res.writeHead(400);res.end();return;}
 const target=path.resolve(root,"."+pathname);
 if(!target.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 fs.readFile(target,(err,data)=>{
  if(err){res.writeHead(404);res.end("missing");return;}
  const ext=path.extname(target);
  const mime={".html":"text/html;charset=utf-8",".mjs":"text/javascript;charset=utf-8",".css":"text/css;charset=utf-8",".webmanifest":"application/manifest+json",".svg":"image/svg+xml"};
  res.writeHead(200,{"content-type":mime[ext]||"application/octet-stream","cache-control":"no-store"});
  res.end(data);
 });
}
const server=http.createServer(serve);
async function main(){
 await new Promise((resolve,reject)=>{server.once("error",reject);server.listen(0,"127.0.0.1",resolve);});
 const browser=await chromium.launch({headless:true});
 try{
  for(const width of [320,390,768,1200]){
   const mobile=width<=850;
   const context=await browser.newContext({viewport:{width,height:790},deviceScaleFactor:2,isMobile:mobile,hasTouch:mobile,reducedMotion:"reduce",serviceWorkers:"block"});
   const page=await context.newPage(),errors=[];
   page.on("pageerror",e=>errors.push(e.message));
   await page.route("https://api.github.com/**",async route=>{
    const url=new URL(route.request().url());
    if(url.pathname.endsWith("/git/trees/main")){
     await route.fulfill({status:200,contentType:"application/json",body:JSON.stringify({truncated:false,tree:paths.map(p=>({type:"blob",path:p}))})});return;
    }
    const prefix="/repos/Manojislearning/LAW-NOTES/contents/";
    if(url.pathname.includes(prefix)){
     const p=decodeURIComponent(url.pathname.slice(url.pathname.indexOf(prefix)+prefix.length));
     if(!(p in htmlFiles)){await route.fulfill({status:404,contentType:"application/json",body:"{}"});return;}
     await route.fulfill({status:200,contentType:"application/json",body:JSON.stringify({encoding:"base64",content:Buffer.from(htmlFiles[p]).toString("base64")})});return;
    }
    await route.abort();
   });
   const url="http://127.0.0.1:"+server.address().port+"/reader/";
   await page.goto(url,{waitUntil:"load"});
   assert.equal(await page.locator("h1").first().innerText(),"Your law notes.\nOne quiet place.");
   const welcome=await page.locator(".connect-card").evaluate(el=>({width:el.getBoundingClientRect().width,height:el.getBoundingClientRect().height}));
   assert.ok(welcome.width<=width-15,"Connect card is too wide at "+width);
   await page.locator("#token").fill("github_pat_example_synthetic_not_real");
   await page.locator("#connect-btn").click();
   await page.locator("#reader-view:not([hidden]) #article h1").first().waitFor();
   assert.match(await page.locator("#article").innerText(),/Law Notes Home/);
   assert.equal(await page.locator("#reader-view").isVisible(),true);
   assert.equal(await page.locator(".bottom-nav").isVisible(),mobile);
   const home=page.locator("#article a.wiki");
   await home.first().click();
   assert.match(await page.locator("#article").innerText(),/Constitutional Law I/);
   await page.locator("#save-btn").click();
   assert.equal(await page.locator("#save-btn").evaluate(el=>el.classList.contains("saved")),true);
   await page.locator("#font-btn").click();
   assert.equal(await page.locator("#prefs").isVisible(),true);
   await page.locator("#font-size").evaluate(el=>{el.value="22";el.dispatchEvent(new Event("input",{bubbles:true}));});
   assert.equal(await page.locator("#font-size-label").textContent(),"22px");
   await page.locator("#close-prefs").click();
   assert.equal(await page.locator("#prefs").isVisible(),false);
   if(mobile){
    await page.locator("#bottom-library").click();
    assert.equal(await page.locator("#sidebar").evaluate(el=>el.classList.contains("open")),true);
    await page.locator("#search").fill("Preamble");
    assert.ok((await page.locator("#sidebar-content [data-note]").count())>=1);
    await page.locator("#sidebar-content [data-note]").first().click();
    assert.match(await page.locator("#article").innerText(),/Justice, liberty, equality/);
    assert.equal(await page.locator("#sidebar").evaluate(el=>el.classList.contains("open")),false);
   }
   const bounds=await page.evaluate(()=>{
    const els=[document.querySelector(".masthead"),document.querySelector(".reader-toolbar"),document.querySelector("#reader-view:not([hidden])"),document.querySelector("#article"),document.querySelector("#connect-btn"),document.querySelector(".bottom-nav")].filter(e=>e&&e.offsetWidth>0);
    return {viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,controls:els.map(e=>({name:e.className||e.id,left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right}))};
   });
   assert.ok(bounds.scrollWidth<=width+2,width+"px horizontal overflow "+JSON.stringify(bounds));
   assert.ok(bounds.controls.every(c=>c.left>=-2&&c.right<=width+2),width+"px control overflow "+JSON.stringify(bounds));
   assert.equal(errors.length,0,"Browser errors at "+width+": "+errors.join("; "));
   console.log("Vault Reader "+width+"px: connect, links, bookmarks, font, mobile drawer and layout passed.");
   await context.close();
  }
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
}
main().catch(error=>{console.error(error);process.exitCode=1;server.close();});

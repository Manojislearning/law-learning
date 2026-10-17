/* Ranks v65: Chromium mobile checks for points, rank card and the leaderboard flow.
 * Firebase is replaced by a small in-page fake served for the gstatic SDK URLs, so no network or account is needed. */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const http=require("node:http");
const path=require("node:path");
const {chromium}=require("playwright");
const root=path.resolve(__dirname,"..");
const mime={".html":"text/html;charset=utf-8",".js":"text/javascript;charset=utf-8",".css":"text/css;charset=utf-8",".json":"application/json",".webmanifest":"application/manifest+json",".svg":"image/svg+xml"};
let fakeConfig=false;
const server=http.createServer((req,res)=>{
 let p;try{p=decodeURIComponent(new URL(req.url,"http://x").pathname);}catch{res.writeHead(400);res.end();return;}
 const file=path.resolve(root,"."+(p==="/"?"/index.html":p));
 if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 if(fakeConfig&&p==="/firebase-config.js"){res.writeHead(200,{"content-type":mime[".js"]});res.end('window.LAW_FIREBASE_CONFIG={apiKey:"test",projectId:"test"};');return;}
 fs.readFile(file,(e,b)=>{if(e){res.writeHead(404);res.end();return;}res.writeHead(200,{"content-type":mime[path.extname(file)]||"application/octet-stream","cache-control":"no-store"});res.end(b);});
});
/* Minimal stand-in for the Firebase compat SDK: app, auth (popup sign-in) and a Firestore leaderboard collection. */
const FAKE_APP=`(function(){
 var docs=JSON.parse(sessionStorage.getItem("fakeDocs")||"null")||{"rival":{name:"Asha",points:420,title:"Moot Court Member"}};
 function keep(){sessionStorage.setItem("fakeDocs",JSON.stringify(docs));}window.__fakeDocs=docs;window.__keep=keep;var authCb=null,u=null;
 function snap(id){var d=docs[id];return {exists:!!d,id:id,data:function(){return d&&JSON.parse(JSON.stringify(d));}};}
 var db={collection:function(){return {
  doc:function(id){return {get:function(){return Promise.resolve(snap(id));},
   set:function(v){var c=JSON.parse(JSON.stringify(v));delete c.updatedAt;docs[id]=c;keep();window.__lastSet=c;return Promise.resolve();},
   delete:function(){delete docs[id];keep();return Promise.resolve();}};},
  orderBy:function(){return {limit:function(){return {get:function(){var ids=Object.keys(docs).sort(function(a,b){return docs[b].points-docs[a].points;});
   return Promise.resolve({forEach:function(fn){ids.forEach(function(id){fn(snap(id));});}});}};}};}
 };}};
 var auth={onAuthStateChanged:function(cb){authCb=cb;setTimeout(function(){cb(u);},0);},getRedirectResult:function(){return Promise.resolve(null);},
  signInWithPopup:function(){u={uid:"me123"};setTimeout(function(){authCb(u);},0);return Promise.resolve({user:u});},
  signOut:function(){u=null;authCb(null);return Promise.resolve();}};
 window.firebase={apps:[],initializeApp:function(){var a={auth:function(){return auth;},firestore:function(){return db;}};this.apps.push(a);return a;},
  app:function(){return this.apps[0];},auth:{GoogleAuthProvider:function(){}},firestore:{FieldValue:{serverTimestamp:function(){return "ts";}}}};
})();`;
async function run(){
 await new Promise((ok,fail)=>{server.once("error",fail);server.listen(0,"127.0.0.1",ok);});
 const base="http://127.0.0.1:"+server.address().port+"/";
 const browser=await chromium.launch({headless:true});
 try{
  for(const width of [320,390]){
   fakeConfig=false;
   const ctx=await browser.newContext({viewport:{width,height:780},isMobile:true,hasTouch:true,reducedMotion:"reduce"});
   await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/,r=>r.abort());
   const page=await ctx.newPage(),errors=[];page.on("pageerror",e=>errors.push(e.message));
   await page.goto(base+"#home",{waitUntil:"load"});
   await page.locator(".score-pill").tap();
   await page.locator("#profile-view.active .rk-title").waitFor();
   assert.equal(await page.locator(".rk-title").innerText(),"Law Fresher");
   assert.match(await page.locator(".rk-board").innerText(),/opens soon/,"No config: leaderboard explains it is coming");
   const given=await page.evaluate(()=>{const a=window.LawPoints.award("test:one",80);const b=window.LawPoints.award("test:one",80);return [a,b,window.LawPoints.total()];});
   assert.deepEqual(given.slice(0,2),[80,0]);
   await page.evaluate(()=>window.LawPoints.award("test:two",30));
   assert.equal(await page.locator(".rk-title").innerText(),"Junior Student","Crossing 100 points promotes the rank");
   assert.equal(await page.locator("#score").innerText(),String(given[2]+30));
   await page.reload({waitUntil:"load"});
   assert.equal(await page.evaluate(()=>window.LawPoints.award("test:one",80)),0,"Awards survive reload");
   const scroll=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
   assert.ok(scroll<=1,width+"px horizontal scroll "+scroll);
   assert.deepEqual(errors,[]);
   await ctx.close();
  }
  /* Configured leaderboard with the fake SDK. */
  fakeConfig=true;
  const ctx=await browser.newContext({viewport:{width:390,height:800},isMobile:true,hasTouch:true});
  await ctx.route(/^https:\/\/www\.gstatic\.com\/firebasejs\//,r=>r.fulfill({status:200,contentType:"text/javascript",body:/app-compat/.test(r.request().url())?FAKE_APP:""}));
  await ctx.route(/^https?:\/\/(?!127\.0\.0\.1|www\.gstatic\.com)/,r=>r.abort());
  const page=await ctx.newPage(),errors=[];page.on("pageerror",e=>errors.push(e.message));
  await page.goto(base+"#profile",{waitUntil:"load"});
  await page.locator(".rk-item").first().waitFor();
  assert.match(await page.locator(".rk-list").innerText(),/Asha/);
  await page.evaluate(()=>window.LawPoints.award("test:big",60));
  await page.locator("#rk-name").fill("x");
  await page.getByRole("button",{name:/Sign in with Google/}).tap();
  assert.match(await page.locator(".rk-error").innerText(),/at least 2/);
  await page.locator("#rk-name").fill("Manoj <b>K</b>");
  await page.getByRole("button",{name:/Sign in with Google/}).tap();
  await page.locator(".rk-item.is-me").waitFor();
  const set=await page.evaluate(()=>window.__lastSet);
  assert.equal(set.name,"Manoj bK/b","Angle brackets are stripped from names");
  assert.equal(set.points,60);assert.equal(set.title,"Law Fresher");
  assert.match(await page.locator(".rk-item.is-me").innerText(),/you/);
  const order=await page.locator(".rk-who strong").allInnerTexts();
  assert.equal(order[0],"Asha","Higher points rank first");
  /* A new phone: remote points are pulled down when they exceed local ones. */
  await page.evaluate(()=>{window.__fakeDocs.me123.points=900;window.__keep();});
  await page.getByRole("button",{name:"Sign out"}).tap();
  await page.evaluate(()=>{localStorage.clear();});
  await page.reload({waitUntil:"load"});
  await page.getByRole("button",{name:/Sign in with Google/}).waitFor();
  await page.locator("#rk-name").fill("Manoj");
  await page.getByRole("button",{name:/Sign in with Google/}).tap();
  await page.waitForFunction(()=>document.getElementById("score").textContent==="900");
  assert.equal(await page.locator(".rk-title").innerText(),"Legal Intern");
  assert.deepEqual(errors,[]);
  await ctx.close();
  console.log("Ranks checks passed: rank card, one-time awards, PTS shortcut, leaderboard join, ordering, name cleaning and points restore.");
 }finally{await browser.close();server.close();}
}
run().catch(e=>{console.error(e);process.exitCode=1;server.close();});

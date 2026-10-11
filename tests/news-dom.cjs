/* DOM integration tests for Law News. Run after installing jsdom@26. */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const {JSDOM}=require("jsdom");
const root=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const html=read("index.html");
const items=[
  {id:"a123456789abcdef",title:"<img src=x onerror=alert(1)> Supreme Court pronounces a legal order",url:"https://example.org/case-a",source:"Example News",publishedAt:"2026-10-10T08:00:00Z",category:"Supreme Court",priority:2},
  {id:"b123456789abcdef",title:"Karnataka High Court considers an appeal",url:"https://example.org/case-b",source:"Example Publisher",publishedAt:"2026-10-10T07:00:00Z",category:"Karnataka",priority:1},
  {id:"c123456789abcdef",title:"Important statutory update",url:"javascript:alert('x')",source:"Spoofed",publishedAt:"2026-10-10T05:00:00Z",category:"Legislation",priority:1}
];
async function main(){
  const dom=new JSDOM(html,{url:"https://example.test/law-learning/#news",runScripts:"outside-only",pretendToBeVisual:true});
  const w=dom.window,d=w.document;w.scrollTo=()=>{};
  const sourceCalls=[];
  w.fetch=async (url)=>{
    sourceCalls.push(String(url));
    return {ok:true,json:async()=>({schema:1,generatedAt:"2026-10-11T10:00:00Z",items})};
  };
  w.eval(read("app-core.js"));
  w.LawAppCore.router=w.LawAppCore.createRouter(w,d);
  w.LawAppCore.router.start();
  w.eval(read("news-feed.js"));
  await new Promise(r=>setTimeout(r,20));
  assert.equal(w.LawAppCore.router.current(),"news");
  assert.ok(sourceCalls[0].startsWith("https://raw.githubusercontent.com/"),"Live data must be fetched from the bot-updated snapshot");
  assert.equal(d.querySelectorAll(".news-story").length,2,"Unsafe links should not render");
  assert.equal(d.querySelectorAll("#news-root img").length,0,"Untrusted story titles must never render as HTML");
  assert.ok(d.querySelector(".news-title").textContent.includes("<img"),"Untrusted title must remain literal text");
  const first=d.querySelector(".news-read");
  assert.equal(first.getAttribute("target"),"_blank");
  assert.ok(first.getAttribute("rel").includes("noopener"));
  assert.equal(d.querySelector(".news-prompt p:last-child").hidden,true);
  d.querySelector(".news-quiz-toggle").click();
  assert.equal(d.querySelector(".news-prompt p:last-child").hidden,false,"Exercise should reveal only after click");
  d.querySelector(".news-actions button").click();
  assert.deepEqual(JSON.parse(w.localStorage.getItem("law-learning-news-saved-v1")),["a123456789abcdef"]);
  const tab=Array.from(d.querySelectorAll(".news-filter")).find(x=>x.textContent==="Saved");
  tab.click();
  assert.equal(d.querySelectorAll(".news-story").length,1,"Saved filter should show marked story");
  assert.equal(d.querySelector(".news-actions button").textContent,"Saved ✓");
  d.querySelector(".news-actions button").click();
  assert.equal(d.querySelectorAll(".news-story").length,0,"Removing saved story should update the list");
  dom.window.close();
  console.log("Law News DOM navigation, attribution, safe rendering, practice and bookmarks passed.");
}
main().catch(err=>{console.error(err);process.exitCode=1;});

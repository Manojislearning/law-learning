import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
const read=f=>fs.readFileSync(new URL("../"+f,import.meta.url),"utf8");
const ctx={window:{}};vm.runInNewContext(read("timelines-data.js"),ctx);
const D=ctx.window.LAW_TIMELINES;
const view=read("timelines-view.js");
const icons=[...view.matchAll(/^ (\w+):\[\[/gm)].map(m=>m[1]);

test("timelines cover first-year subjects in both semesters",()=>{
 assert.ok(D.list.length>=15,"timelines: "+D.list.length);
 for(const s of Object.keys(D.subjects))assert.ok(D.list.some(t=>t.subject===s),"subject "+s);
 assert.ok(D.list.some(t=>t.sem===1)&&D.list.some(t=>t.sem===2));
 assert.ok(D.list.some(t=>t.kind==="steps")&&D.list.some(t=>t.kind==="history"));
});

test("every timeline is well formed, brief and in order",()=>{
 const ids=new Set();
 for(const t of D.list){
  assert.ok(!ids.has(t.id),"unique "+t.id);ids.add(t.id);
  assert.ok(t.title&&t.intro&&D.subjects[t.subject],t.id);
  assert.ok(t.events.length>=4&&t.events.length<=10,t.id+" events");
  assert.equal(new Set(t.events.map(e=>e.title)).size,t.events.length,t.id+" titles distinct for the order game");
  let last=0;
  for(const e of t.events){
   assert.ok(e.when&&e.title&&e.text,t.id);
   assert.ok(e.text.split(/\s+/).length<=45,t.id+" brief: "+e.title);
   assert.ok(icons.includes(e.icon),t.id+" icon "+e.icon);
   if(t.kind==="history"){const y=parseInt(e.when,10);assert.ok(y>=last,t.id+" years in order at "+e.when);last=y;}
  }
 }
});

test("current-law dates are right",()=>{
 const t=read("timelines-data.js");
 assert.match(t,/From 1 July 2024 the BNS, BNSS and BSA replace/);
 assert.match(t,/From 21 November 2025, the four Codes/);
 assert.match(t,/BNSS s\.173/);assert.match(t,/BNSS s\.193/);assert.match(t,/BNSS s\.210/);
 assert.match(t,/In force from 20 July 2020/);
});

test("Timelines is wired into the app",()=>{
 const html=read("index.html"),sw=read("sw.js");
 for(const f of ["./timelines-data.js?v=80","./timelines-view.js?v=80","./timelines.css?v=80"])assert.ok(sw.includes(f)&&html.includes(f.slice(2)),f);
 assert.ok(html.indexOf("timelines-data.js")<html.indexOf("timelines-view.js"));
 assert.ok(html.includes('data-open="timelines"')&&html.includes('id="timelines-view"'));
 assert.ok(read("app-core.js").includes('timelines:["First-year law in order","Timelines"]'));
 assert.ok(read("backup-core.js").includes('"law-learning-timelines-v1"'));
 assert.match(view,/LawPoints\.award\("timeline:"/);
 assert.doesNotMatch(view,/innerHTML|addEventListener\("hashchange"/);
 assert.match(view,/rel="noopener noreferrer"/);
});

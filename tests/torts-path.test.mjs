import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const read=f=>fs.readFileSync(new URL("../"+f,import.meta.url),"utf8");
const ctx={window:{}};vm.runInNewContext(read("torts-path-data.js"),ctx);
const D=ctx.window.TORTS_PATH;

test("Torts Path has five KSLU units with four lessons each",()=>{
 assert.equal(D.units.length,5);
 for(const u of D.units)assert.equal(u.lessons.length,4,u.id);
});

test("every lesson has short notes and valid questions",()=>{
 const ids=new Set();
 for(const u of D.units)for(const l of u.lessons){
  assert.ok(!ids.has(l.id),"unique id "+l.id);ids.add(l.id);
  assert.ok(l.notes.length>=3&&l.notes.length<=5,l.id+" notes");
  for(const n of l.notes)assert.ok(n.split(/\s+/).length<=60,l.id+" note is brief");
  assert.ok(l.qs.length>=5,l.id+" questions");
  const types=new Set(l.qs.map(q=>q.t));assert.ok(types.size>=3,l.id+" mixes question types");
  for(const q of l.qs){
   assert.ok(["mcq","tf","fill","match"].includes(q.t),l.id+" type");
   assert.ok(q.why&&q.why.length<260,l.id+" short why");
   if(q.t==="mcq"||q.t==="fill"){
    assert.ok(Array.isArray(q.o)&&q.o.length>=2&&q.a>=0&&q.a<q.o.length,l.id+": "+q.q);
    assert.equal(new Set(q.o).size,q.o.length,"distinct options: "+q.q);
   }
   if(q.t==="fill")assert.equal(q.q.split("___").length,2,"one blank: "+q.q);
   if(q.t==="tf")assert.equal(typeof q.a,"boolean",q.q);
   if(q.t==="match"){
    assert.ok(q.pairs.length>=2&&q.pairs.length<=4,l.id+" pairs");
    assert.equal(new Set(q.pairs.map(p=>p[0])).size,q.pairs.length);
    assert.equal(new Set(q.pairs.map(p=>p[1])).size,q.pairs.length);
   }
  }
 }
});

test("current-law figures match the statutory accuracy notes",()=>{
 const t=read("torts-path-data.js");
 assert.match(t,/Consumer Protection Act, 2019/);
 assert.match(t,/₹5 lakh for death, ₹2\.5 lakh for grievous hurt/);
 assert.match(t,/₹2 lakh for death, ₹50,000 for grievous hurt/);
 assert.match(t,/District up to ₹50 lakh; State above ₹50 lakh up to ₹2 crore; National above ₹2 crore/);
 assert.match(t,/BNS, 2023, s\.270/);
 assert.match(t,/BNS, 2023, s\.356/);
});

test("Torts Path is wired into the app, offline cache, backups and points",()=>{
 const sw=read("sw.js"),html=read("index.html"),view=read("torts-path-game.js");
 for(const f of ["./torts-path-data.js?v=74","./torts-path-game.js?v=74","./torts-path.css?v=74"])assert.ok(sw.includes(f)&&html.includes(f.slice(2)),f);
 assert.ok(html.indexOf("torts-path-data.js")<html.indexOf("torts-path-game.js"));
 assert.ok(read("backup-core.js").includes('"law-learning-torts-path-v1"'));
 assert.match(view,/LawPoints\.award\("torts-path:"/);
 assert.doesNotMatch(view,/innerHTML|addEventListener\("hashchange"/);
 assert.doesNotMatch(read("torts-path.css"),/prefers-color-scheme:\s*dark/);
});

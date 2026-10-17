import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import vm from "node:vm";
const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");
function core(){const ctx={window:{}};vm.runInNewContext(read("points-core.js"),ctx,{timeout:2000});const c=ctx.window.LawPointsCore;return {...c,RANKS:JSON.parse(JSON.stringify(c.RANKS)),rankFor:p=>JSON.parse(JSON.stringify(c.rankFor(p)))};}
function memory(){const m=new Map();return {getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v)),m};}

test("Ranks climb in order and report progress to the next title",()=>{
 const c=core();
 assert.equal(c.rankFor(0).title,"Law Fresher");
 assert.equal(c.rankFor(99).title,"Law Fresher");
 assert.equal(c.rankFor(100).title,"Junior Student");
 assert.equal(c.rankFor(1500).title,"Junior Advocate");
 assert.equal(c.rankFor(999999).title,"Chief Justice");
 assert.equal(c.rankFor(999999).next,null);
 const mid=c.rankFor(200);
 assert.equal(mid.next.title,"Moot Court Member");
 assert.equal(mid.next.need,100);
 assert.ok(Math.abs(mid.progress-0.5)<1e-9);
 assert.equal(c.rankFor(-5).title,"Law Fresher");
 assert.equal(c.rankFor(NaN).level,1);
 const at=c.RANKS.map(r=>r.at);
 assert.deepEqual([...at].sort((a,b)=>a-b),at);
});

test("One-time awards add points once and survive a reload",()=>{
 const c=core(),s=memory(),state={score:40};
 assert.equal(c.award(s,state,"case:contract:c1",15),15);
 assert.equal(state.score,55);
 assert.equal(c.award(s,state,"case:contract:c1",15),0,"same id must not pay twice");
 assert.equal(state.score,55);
 assert.equal(c.award(s,state,"case:contract:c2",15),15);
 assert.equal(c.award(s,state,"",15),0);
 assert.equal(c.award(s,state,"big",500),0,"single awards are capped");
 assert.equal(Object.keys(c.readAwards(s)).length,2);
 const broken=memory();broken.setItem(c.KEY,"{oops");
 assert.deepEqual({...c.readAwards(broken)},{});
});

test("Points, ranks and leaderboard are wired, cached, backed up and text-only",()=>{
 const html=read("index.html"),sw=read("sw.js"),backup=read("backup-core.js"),view=read("ranks-view.js");
 const app=html.indexOf("./app.js"),pts=html.indexOf("points-core.js"),prof=html.indexOf("profile-local.js"),cfg=html.indexOf("firebase-config.js"),rk=html.indexOf("ranks-view.js");
 assert.ok(app>0&&pts>app&&prof>0&&cfg>prof&&rk>cfg);
 for(const f of ["./points-core.js?v=65","./firebase-config.js?v=65","./ranks-view.js?v=65","./ranks.css?v=65"])assert.ok(sw.includes(f),f);
 assert.ok(sw.includes("law-learning-v67"));
 for(const k of ["law-learning-points-v1","law-learning-ranks-v1"])assert.ok(backup.includes('"'+k+'"'),k);
 assert.doesNotMatch(view,/innerHTML|insertAdjacentHTML|document\.write/);
 assert.match(view,/www\.gstatic\.com\/firebasejs\/\d+\.\d+\.\d+\//,"Firebase SDK must be pinned to an exact version");
 assert.match(view,/base\+3000/,"client must respect the per-save cap in the security rules");
});

test("Study actions award points through one helper",()=>{
 assert.match(read("case-practice-view.js"),/LawPoints\.award\("case:"\+bankKey/);
 assert.match(read("case-practice-view.js"),/LawPoints\.award\("transfer:"/);
 assert.match(read("review-view.js"),/LawPoints\.award\("review:"/);
 assert.match(read("exam-pattern.js"),/LawPoints\.award\("exam-ready:"/);
});

test("Confusing Words: every question has a blank and a valid answer, wired into Games",()=>{
 const ctx={window:{}};vm.runInNewContext(read("confusing-words-data.js"),ctx);
 const sets=JSON.parse(JSON.stringify(ctx.window.CONFUSING_WORDS));
 assert.ok(sets.length>=40,"at least 40 pairs");
 assert.equal(new Set(sets.map(s=>s.id)).size,sets.length);
 for(const s of sets){
  assert.ok(["law","writing"].includes(s.group),s.id);
  assert.ok(s.words.length>=2&&s.words.length===s.means.length,s.id);
  assert.ok(s.tip.length>10&&s.src.length>2,s.id);
  assert.ok(s.q.length>=2,s.id+" needs a question for each word");
  for(const [text,ans] of s.q){assert.equal(text.split("____").length,2,s.id+": one blank");assert.ok(Number.isInteger(ans)&&ans>=0&&ans<s.words.length,s.id);}
  assert.deepEqual([...new Set(s.q.map(q=>q[1]))].sort(),s.words.map((w,i)=>i),s.id+": each word is the answer at least once");
 }
 const html=read("index.html"),sw=read("sw.js"),view=read("confusing-words.js");
 assert.ok(html.indexOf("confusing-words.js")>html.indexOf("word-experience.js"));
 for(const f of ["./confusing-words-data.js?v=66","./confusing-words.js?v=66","./confusing-words.css?v=67"])assert.ok(sw.includes(f),f);
 assert.ok(read("backup-core.js").includes('"law-learning-confusing-v1"'));
 assert.doesNotMatch(view,/innerHTML|insertAdjacentHTML/);
 assert.match(view,/LawPoints\.award\("confuse:"/);
});

test("Marriage Law Cases: well-formed scenarios across all topics, wired into Games",()=>{
 const ctx={window:{}};vm.runInNewContext(read("marriage-law-data.js"),ctx);
 const cases=JSON.parse(JSON.stringify(ctx.window.MARRIAGE_CASES));
 assert.ok(cases.length>=30);
 assert.equal(new Set(cases.map(c=>c.id)).size,cases.length);
 const cats=new Set(cases.map(c=>c.cat));
 for(const k of ["law","valid","convert","age","divorce","money","state"])assert.ok(cats.has(k),k);
 for(const c of cases){
  assert.ok(c.facts.length>20&&c.ask.length>5&&c.why.length>60&&c.law.length>5,c.id);
  assert.ok(c.options.length>=3&&c.options.length<=4,c.id);
  assert.equal(new Set(c.options).size,c.options.length,c.id+" duplicate option");
  assert.ok(Number.isInteger(c.answer)&&c.answer<c.options.length,c.id);
 }
 const sw=read("sw.js"),html=read("index.html"),view=read("marriage-law-game.js");
 for(const f of ["./marriage-law-data.js?v=67","./marriage-law-game.js?v=67"])assert.ok(sw.includes(f)&&html.includes(f.slice(2)),f);
 assert.ok(read("backup-core.js").includes('"law-learning-marriage-v1"'));
 assert.doesNotMatch(view,/innerHTML|insertAdjacentHTML/);
 assert.match(view,/LawPoints\.award\("marriage:"/);
 assert.match(read("marriage-law-data.js"),/BNS, 2023, s\.82/,"bigamy cites BNS");
});

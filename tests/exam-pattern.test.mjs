import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import vm from "node:vm";
const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");
function data(){const ctx={window:{}};vm.runInNewContext(read("kslu-paper-analysis.js"),ctx,{timeout:2000});return JSON.parse(JSON.stringify(ctx.window.KSLU_PAPER_ANALYSIS));}

test("Paper analysis covers 45 real Semester I papers across all five subjects",()=>{
 const d=data();
 assert.equal(d.papers.length,45);
 const ids=d.subjects.map(s=>s.id);
 assert.deepEqual(ids,["constitution","contract","torts","hindu","bns"]);
 for(const p of d.papers){
  assert.ok(ids.includes(p.subject),p.url);
  assert.ok([80,100].includes(p.marks),p.url);
  assert.match(p.url,/^https:\/\/github\.com\/bluecode3\/kslucorner-papers\/releases\/download\/llb-sem-1\/llb__sem-1__[a-z0-9-]+__(\d{4}-\d{2}|undated)-(80|100)m-[0-9a-f]{8}\.pdf$/);
  assert.match(p.session,/^(\d{4}-\d{2}|undated)$/);
 }
 assert.equal(new Set(d.papers.map(p=>p.url)).size,45,"duplicate paper");
 for(const s of d.subjects)assert.match(s.archive,/^https:\/\/kslucorner\.in\/papers\/llb\/sem-1\//);
});

test("Every topic is tied to a syllabus unit with an honest paper count",()=>{
 const d=data();
 const perSubject=Object.fromEntries(d.subjects.map(s=>[s.id,d.papers.filter(p=>p.subject===s.id).length]));
 assert.equal(new Set(d.topics.map(t=>t.id)).size,d.topics.length);
 for(const t of d.topics){
  assert.ok(t.unit>=1&&t.unit<=5,t.id);
  assert.equal(t.of,perSubject[t.subject],t.id+" denominator must equal the subject's paper count");
  assert.ok(t.count>=1&&t.count<=t.of,t.id);
  assert.equal(t.sessions.length<=t.count,true,t.id);
  assert.deepEqual([...t.sessions].sort().reverse(),t.sessions,t.id+" sessions newest first");
 }
 for(const s of d.subjects){
  const units=new Set(d.topics.filter(t=>t.subject===s.id).map(t=>t.unit));
  assert.equal(units.size,5,s.id+" should have topics in all five units");
 }
});

test("Repeat problems give a rule and an authority and cite real sessions",()=>{
 const d=data();
 const sessions=new Set(d.papers.map(p=>p.session));
 for(const s of d.subjects){
  const list=d.problems[s.id];
  assert.ok(Array.isArray(list)&&list.length>=5,s.id);
  for(const p of list){
   assert.ok(p.facts.length>30&&p.apply.length>30&&p.cite.length>5,p.facts);
   assert.ok(p.sessions.length>=1&&p.sessions.every(x=>sessions.has(x)),p.facts);
  }
 }
 const bns=JSON.stringify(d.problems.bns);
 assert.doesNotMatch(bns,/\bIPC (section )?(299|300|378)\b/,"BNS problems must lead with BNS sections");
});

test("Exam Pattern page is wired, cached offline, backed up and text-only",()=>{
 const html=read("index.html"),sw=read("sw.js"),view=read("exam-pattern.js"),backup=read("backup-core.js");
 const core=html.indexOf("app-core.js"),dataAt=html.indexOf("kslu-paper-analysis.js"),viewAt=html.indexOf("exam-pattern.js");
 assert.ok(core>0&&dataAt>core&&viewAt>dataAt,"data and view must load after app-core");
 assert.ok(html.includes("exam-pattern.css?v=64"));
 assert.doesNotMatch(html,/Official pattern not imported yet/);
 for(const f of ["./kslu-paper-analysis.js?v=64","./exam-pattern.js?v=64","./exam-pattern.css?v=64"])assert.ok(sw.includes(f),f);
 assert.ok(sw.includes("law-learning-v78"));
 assert.ok(backup.includes('"law-learning-exam-prep-v1"'));
 assert.doesNotMatch(view,/innerHTML|insertAdjacentHTML|document\.write/);
 assert.match(view,/try\{localStorage\.setItem/);
});

test("Later-semester list follows KSLU's 2024-25 scheme document",()=>{
 const flow=read("syllabus-flow.js");
 const sem3=flow.match(/"3":\[([^\]]+)\]/)[1];
 assert.match(sem3,/Jurisprudence/);
 assert.match(sem3,/Bharatiya Nagarik Suraksha Sanhita/);
});

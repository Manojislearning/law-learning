import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import vm from "node:vm";
const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");
function bank(){
 const ctx={window:{}};
 for(const file of ["past-paper-data.js","past-paper-models-1.js","past-paper-models-2.js"])
  vm.runInNewContext(read(file),ctx,{timeout:2000});
 return [...ctx.window.LAW_PAST_ANSWERS,...ctx.window.LAW_MODEL_PRACTICE];
}
test("KSLU bank has 16 substantial answers spanning all five core Semester I subjects",()=>{
 const rows=bank();
 assert.equal(rows.length,16);
 assert.equal(new Set(rows.map(r=>r.id)).size,16);
 const subjects=new Set(rows.map(r=>r.subject||"Contract–I"));
 assert.equal(subjects.size,5);
 for(const subject of ["Contract–I","Constitutional Law–I","Law of Torts","Family Law–I: Hindu Law","Criminal Law–I: BNS, 2023"]){
  assert.ok([...rows].filter(r=>(r.subject||"Contract–I")===subject).length>=2,subject);
 }
 for(const row of rows){
  assert.equal(row.marks,10,row.id);
  assert.ok(row.title.length>25,row.id+" question title too short");
  assert.ok(Array.isArray(row.sections)&&row.sections.length>=6,row.id+" lacks enough answer sections");
  assert.ok(row.sections.every(section=>section.length===2&&section[0].length>6&&section[1].length>150),row.id+" shallow sections");
  assert.ok(row.sections.map(section=>section[1]).join(" ").split(/\s+/).length>=300,row.id+" too short for full exam answer");
  assert.ok(Array.isArray(row.sources)&&row.sources.length>=1);
  assert.ok(row.sources.every(source=>/^https:\/\//.test(source[1])),row.id+" has insecure authority link");
  if(row.kind==="model"){
   assert.match(row.paper,/not a scanned past paper/i);
   assert.ok(row.interpretation?.length>50);
   assert.ok(row.keyPoints?.length>=5);
   assert.ok(row.tips?.length>=2);
  }
 }
});
test("BNS use the current syllabus's statute rather than re-label old IPC sections",()=>{
 const rows=bank().filter(r=>r.subject==="Criminal Law–I: BNS, 2023");
 assert.equal(rows.length,3);
 assert.ok(rows.some(r=>r.title.includes("3(5)")));
 assert.ok(rows.some(r=>r.title.includes("106(1)")));
 assert.ok(rows.some(r=>r.title.includes("culpable homicide")));
 assert.ok(rows.every(r=>r.sources.some(s=>s[1].includes("indiacode.nic.in"))));
 assert.ok(rows.every(r=>r.sections.some(s=>s[1].includes("BNS")||s[1].includes("Bharatiya Nyaya"))));
});
test("New KSLU reader offers verified external archive navigation, source separation, and answer reveal",()=>{
 const html=read("index.html"),sw=read("sw.js"),reader=read("past-paper-view.js");
 for(const asset of ["past-paper-models-1.js?v=59","past-paper-models-2.js?v=59","past-paper-view.js?v=59","exam-papers.css?v=59"]){
  assert.ok(html.includes(asset),"HTML missing "+asset);
  assert.ok(sw.includes("./"+asset),"PWA missing "+asset);
 }
 assert.ok(sw.includes("law-learning-v80"));
 assert.ok(reader.includes("kslucorner.in/papers/llb/sem-1/"));
 assert.ok(reader.includes("Original model · Not an actual KSLU question"));
 assert.ok(reader.includes("Reveal full model answer"));
 assert.ok(reader.includes("Your practice answer, not saved"));
 assert.ok(reader.includes("navigator.clipboard.writeText"));
 assert.ok(!reader.includes("innerHTML"),"Untrusted exam data should never render as HTML");
});

import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
const require=createRequire(import.meta.url);
const Torts=require('../torts-case-practice-data.js');
const Contract=require('../case-practice-data.js');
const Core=require('../case-practice-core.js');
const root=resolve(import.meta.dirname,'..');
const read=x=>readFileSync(resolve(root,x),'utf8');
test('Torts adds 15 independently written unit-balanced IRAC cases with sources',()=>{
 assert.equal(Core.verify(Torts),true);
 assert.equal(Torts.subject,'torts');
 assert.equal(Torts.cases.length,15);
 assert.equal(new Set(Torts.cases.map(x=>x.id)).size,15);
 for(let i=1;i<=5;i++)assert.equal(Torts.cases.filter(x=>x.unit===i).length,3);
 for(const x of Torts.cases){
  assert.ok(x.facts.length>=65,x.id);
  assert.ok(x.task.length>=32,x.id);
  assert.ok(x.trap.length>=30,x.id);
  for(const k of Core.criteria)assert.ok(x.outline[k]?.length>=40,x.id+': '+k);
  assert.ok(x.sourceIds.length>0,x.id+': missing authorities');
  for(const k of x.sourceIds)assert.ok(Torts.sources[k]?.url.startsWith('https://'),x.id+': missing URL '+k);
 }
 assert.ok(Torts.editionNote.includes('not KSLU past papers'));
});
test('Five mixed Tort cases cover each syllabus unit once, with no repeat across three sets',()=>{
 let used=new Map(),ids=[];
 for(let i=0;i<3;i++){
  const chosen=Core.select(Torts,used,()=>0.31);
  assert.deepEqual(chosen.map(x=>x.unit).sort(),[1,2,3,4,5]);
  ids.push(...chosen.map(x=>x.id));
  Core.recordUsage(used,chosen);
 }
 assert.equal(new Set(ids).size,15);
 assert.equal([...used.values()].reduce((sum,x)=>sum+x,0),15);
});
test('Torts and Contract I histories remain independent, with previous Contract bank intact',()=>{
 assert.equal(Core.verify(Contract),true);
 const tortHistory=new Map(),contractHistory=new Map();
 Core.recordUsage(tortHistory,Core.select(Torts,tortHistory,()=>0.2));
 assert.equal(contractHistory.size,0);
 Core.recordUsage(contractHistory,Core.select(Contract,contractHistory,()=>0.2));
 assert.equal(tortHistory.size,5);assert.equal(contractHistory.size,5);
 assert.equal(Torts.cases.length+Contract.cases.length,30);
});
test('Negligence and hazardous-activity cases use original Supreme Court judgments',()=>{
 const c=Torts.cases.find(x=>x.id==='u3-resipsa');
 assert.ok(c.outline.rule.includes('Subhagwanti'));
 assert.ok(c.sourceIds.includes('negligence'));
 const a=Torts.cases.find(x=>x.id==='u3-hazardous');
 assert.ok(a.outline.rule.includes('M.C. Mehta'));
 assert.ok(a.outline.rule.includes('non-delegable'));
 assert.ok(a.trap.includes('negligence'));
 for(const id of ['negligence','absolute','liberty','trespass']){
  assert.equal(new URL(Torts.sources[id].url).hostname,'api.sci.gov.in');
 }
});
test('Torts Unit V covers modern Motor Vehicles and Consumer law with changed filing rule',()=>{
 const unit=Torts.cases.filter(x=>x.unit===5);
 assert.equal(unit.length,3);
 assert.ok(unit.some(x=>x.outline.rule.includes('Section 161')&&x.outline.rule.includes('₹50,000')));
 assert.ok(unit.some(x=>x.outline.rule.includes('166(3)')&&x.outline.rule.includes('15 August 2026')));
 assert.ok(unit.some(x=>x.outline.rule.includes('Consumer Protection Act, 2019')&&x.outline.rule.includes('2(11)')));
 assert.ok(Torts.sources['motor-amendment'].url.includes('egazette.gov.in'));
});
test('Reference documents are limited to Supreme Court and official statute/government hosts',()=>{
 const allowed=['api.sci.gov.in','www.indiacode.nic.in','egazette.gov.in','www.pib.gov.in','consumeraffairs.gov.in'];
 for(const [key,source] of Object.entries(Torts.sources)){
  const u=new URL(source.url);
  assert.equal(u.protocol,'https:',key);
  assert.ok(allowed.includes(u.hostname),key);
 }
 const tampered=JSON.parse(JSON.stringify(Torts));
 tampered.sources.negligence.url='https://malicious.example/page';
 assert.throws(()=>Core.verify(tampered),/primary law source/);
});
test('App deep link and on-demand subject selection preserve private essays and backups',()=>{
 const html=read('index.html'),sw=read('sw.js'),view=read('case-practice-view.js'),syllabus=read('syllabus-flow.js');
 for(const filename of ['torts-case-practice-data.js?v=47','case-practice-core.js?v=48','case-practice-view.js?v=48','syllabus-flow.js?v=48']){
  assert.ok(html.includes(filename),'HTML: '+filename);
  assert.ok(sw.includes(filename),'SW: '+filename);
 }
 assert.ok(view.includes('get("course")'));
 assert.ok(view.includes('open:openCourse'));
 assert.ok(view.includes('histories={contract:new Map(),torts:new Map(),bns:new Map()}'));
 assert.ok(view.includes('draft.value.trim().length<40'));
 assert.ok(view.includes('model.hidden=false'));
 assert.ok(syllabus.includes('LawCasePracticeUI.open("torts")'));
 assert.ok(!view.includes('localStorage.setItem'));
});
test('The feedback rubric remains explicit self-assessment, not automatic marking',()=>{
 const item=Torts.cases.find(x=>x.id==='u5-hitrun');
 const feedback=Core.missingGuidance(item,[true,false,false,true]);
 assert.deepEqual(feedback.map(x=>x.key),['rule','application']);
 assert.ok(feedback[0].message.includes('₹50,000'));
 assert.ok(feedback[1].message.includes('unidentified'));
 assert.ok(!read('case-practice-view.js').includes('accuracy ='));
});

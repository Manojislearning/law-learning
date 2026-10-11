import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
const require=createRequire(import.meta.url);
const core=require('../case-practice-core.js');
const root=resolve(import.meta.dirname,'..'),read=x=>readFileSync(resolve(root,x),'utf8');

test('All five first-year case subjects map to exact KSLU syllabus subject and unit',()=>{
 const subjects={constitution:0,contract:1,torts:2,hindu:3,bns:4};
 for(const [key,n] of Object.entries(subjects)){
  for(let i=1;i<=5;i++)
   assert.deepEqual(core.syllabusTarget(key,i),{semester:1,subject:n,unit:i-1},key+':'+i);
 }
 for(const [bad,unit] of [['unknown',1],['torts',0],['bns',6],['contract','3'],['__proto__',2]])
  assert.throws(()=>core.syllabusTarget(bad,unit),/Invalid syllabus/);
});
test('Weak-case reminder exposes only IRAC criteria already self-identified by learner',()=>{
 assert.deepEqual(core.revisitReminder({status:'self-identified gaps',missing:['rule','application']}),['rule','application']);
 assert.deepEqual(core.revisitReminder({status:'skipped',missing:[]}),[]);
 assert.deepEqual(core.revisitReminder(null),[]);
 assert.deepEqual(core.revisitReminder({missing:['issue','issue','conclusion']}),['issue','conclusion']);
 assert.throws(()=>core.revisitReminder({missing:['rule','PRIVATE_ESSAY_TEXT']}),/Unexpected review/);
});
test('Generic evidence prompts encourage fact based reasoning and counterarguments without leaking answers',()=>{
 const q=core.reasoningPrompts();
 assert.equal(q.length,3);
 assert.ok(q[0].toLowerCase().includes('fact'));
 assert.ok(q[1].toLowerCase().includes('other side'));
 assert.ok(q[2].includes('additional fact'));
 const view=read('case-practice-view.js');
 assert.ok(view.includes('core.reasoningPrompts()'));
 assert.ok(view.includes('core.revisitReminder(earlier)'));
 assert.ok(view.includes('cp-retry-reminder'));
 assert.ok(view.includes('c.outline.application'));
 assert.ok(view.includes('c.trap'));
});
test('Related law opens via supported existing syllabus route only after reference reveal',()=>{
 const view=read('case-practice-view.js');
 const before=view.indexOf('var model=E(box,"section",undefined,"cp-model")');
 const after=view.indexOf('var study=B(model,"Study this KSLU syllabus unit');
 assert.ok(before>0&&after>before,'Study button must live inside reference-answer model');
 assert.ok(view.includes('core.syllabusTarget(bankKey,c.unit)'));
 assert.ok(view.includes('root.openSyllabusUnit(target.semester,target.subject,target.unit)'));
 assert.ok(view.includes('if(!weak.has(c.id))'),'Unassessed case must remain revisitable');
 assert.ok(!view.includes('localStorage.setItem'),'Never persist essays through the practice module');
});
test('Only already existing offline modules are updated, not stored state or backup schema',()=>{
 const html=read('index.html'),sw=read('sw.js'),backup=read('backup-core.js');
 for(const file of ['case-practice-core.js?v=54','case-practice-view.js?v=55']){
  assert.ok(html.includes(file),'HTML missing '+file);
  assert.ok(sw.includes(file),'Offline cache missing '+file);
 }
 assert.ok(sw.includes('law-learning-v56'));
 assert.ok(backup.includes('VERSION = 4'));
});

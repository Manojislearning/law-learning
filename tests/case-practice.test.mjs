import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
const require=createRequire(import.meta.url);
const Bank=require('../case-practice-data.js');
const Core=require('../case-practice-core.js');
const root=resolve(import.meta.dirname,'..');
const file=name=>readFileSync(resolve(root,name),'utf8');

test('Fifteen original cases contain complete substantive IRAC reasoning across five Contract–I units',()=>{
 assert.equal(Core.verify(Bank),true);
 assert.equal(Bank.cases.length,15);
 for(let unit=1;unit<=5;unit++)assert.equal(Bank.cases.filter(x=>x.unit===unit).length,3);
 for(const c of Bank.cases){
  for(const field of ['issue','rule','application','conclusion']){
   assert.ok(c.outline[field].length>=40,c.id+' missing '+field);
  }
  assert.ok(c.facts.length>=65&&c.task.length>=32);
  assert.ok(c.sections.length>0);
  assert.ok(c.sourceIds.length>0);
 }
});

test('Session selects exactly one scenario from each unit in mixed order',()=>{
 const history=new Map();
 const list=Core.select(Bank,history,()=>.37);
 assert.equal(list.length,5);
 assert.deepEqual(list.map(x=>x.unit).sort(),[1,2,3,4,5]);
 assert.equal(new Set(list.map(x=>x.id)).size,5);
 assert.notDeepEqual(list.map(x=>x.unit),[1,2,3,4,5],'Fixed order could hint at the topic');
});
test('Three sessions cycle through all fifteen before repeating a unit case',()=>{
 const history=new Map(),ids=[];
 for(let i=0;i<3;i++){
  const chosen=Core.select(Bank,history,()=>.63);
  ids.push(...chosen.map(x=>x.id));
  Core.recordUsage(history,chosen);
 }
 assert.equal(ids.length,15);assert.equal(new Set(ids).size,15);
 const fourth=Core.select(Bank,history,()=>.21);
 assert.equal(fourth.length,5);
});
test('Selection does not mutate question bank or invent persistence',()=>{
 const original=JSON.stringify(Bank);
 const seen=new Map();
 Core.recordUsage(seen,Core.select(Bank,seen,()=>.05));
 assert.equal(JSON.stringify(Bank),original);
 assert.equal([...seen.values()].reduce((a,b)=>a+b,0),5);
 assert.ok(!file('case-practice-view.js').includes('localStorage.setItem'));
});
test('Invalid bank, source, repeated identifiers and bad random generator are rejected',()=>{
 const corrupted=JSON.parse(JSON.stringify(Bank));
 corrupted.cases[1].id=corrupted.cases[0].id;
 assert.throws(()=>Core.verify(corrupted),/repeated/);
 const invalid=JSON.parse(JSON.stringify(Bank));
 invalid.cases[0].sourceIds=['unverified-blog'];
 assert.throws(()=>Core.verify(invalid),/source/);
 assert.throws(()=>Core.select(Bank,new Map(),()=>1),/random/);
 assert.throws(()=>Core.select(Bank,new Map(),()=>NaN),/random/);
});
test('Official primary legislation links and sensitive caveats are present',()=>{
 assert.equal(new URL(Bank.sources.contract.url).hostname,'www.indiacode.nic.in');
 assert.equal(new URL(Bank.sources.specific.url).hostname,'www.indiacode.nic.in');
 assert.ok(Bank.editionNote.includes('not past KSLU'));
 assert.ok(Bank.gradingNotice.includes('not automated'));
 const notice=Bank.cases.find(x=>x.id==='u5-notice');
 assert.ok(notice.outline.rule.includes('thirty days'));
 const mistake=Bank.cases.find(x=>x.id==='u2-mistake');
 assert.ok(mistake.outline.rule.includes('Section 20'));
});
test('App exposes practice route without introducing separate hash navigation or unnecessary data keys',()=>{
 const html=file('index.html'),sw=file('sw.js'),router=file('app-core.js');
 for(const name of ['case-practice-data.js','case-practice-core.js','case-practice-view.js']){
  assert.ok(html.includes(name+'?v=42'),'HTML missing '+name);
  assert.ok(sw.includes(name+'?v=42'),'Offline cache missing '+name);
 }
 assert.ok(html.includes('id="practice-view"'));
 assert.ok(html.includes('data-open="practice"'));
 assert.ok(router.includes('practice:["Contract–I · Exam Practice"'));
 const source=file('case-practice-view.js');
 assert.ok(source.includes('root.LawAppCore.router.subscribe'));
 assert.ok(!source.includes('addEventListener("hashchange"'));
 assert.ok(source.includes('draft.value.trim().length<40'));
 assert.ok(source.includes('model.hidden=false'));
 assert.ok(source.includes('no-upload-sentinel')===false);
});


test('IRAC self-check gives case-specific guidance only for criteria the student did not mark',()=>{
 const sample=Bank.cases.find(c=>c.id==='u2-fraud');
 const none=Core.missingGuidance(sample,[false,false,false,false]);
 assert.equal(none.length,4);
 assert.deepEqual(none.map(x=>x.key),['issue','rule','application','conclusion']);
 assert.ok(none[1].message.includes('Section'));
 assert.ok(none[2].message.includes('seller'));
 const partial=Core.missingGuidance(sample,[true,false,true,false]);
 assert.deepEqual(partial.map(x=>x.key),['rule','conclusion']);
 assert.ok(partial[0].message.includes(sample.outline.rule));
 const complete=Core.missingGuidance(sample,[true,true,true,true]);
 assert.deepEqual(complete,[]);
 assert.throws(()=>Core.missingGuidance(sample,[true,false]),/Invalid/);
 assert.throws(()=>Core.missingGuidance(sample,[true,true,"yes",false]),/Invalid/);
});
test('Student feedback is clearly self-reported rather than an essay score',()=>{
 const view=file('case-practice-view.js');
 assert.ok(view.includes('core.missingGuidance(c,checks)'));
 assert.ok(view.includes('aria-live'));
 assert.ok(view.includes('not an examination mark')||view.includes('Not an examination mark'));
 assert.ok(view.includes('readOnly=true'));
 assert.ok(!view.includes('localStorage.setItem'));
});

import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import vm from 'node:vm';
const root=resolve(import.meta.dirname,'..');
const read=(file)=>readFileSync(resolve(root,file),'utf8');
function load(path,key){
 const ctx={globalThis:{}};
 vm.runInNewContext(read(path),ctx,{timeout:1000});
 return ctx.globalThis[key];
}
const unit=load('contract-unit2-data.js','ContractUnitTwoData');
const ledger=load('content-ledger.js','LawContentLedger');
test('Unit II has ten unique bite-size law lessons with meaningful practice',()=>{
 assert.equal(unit.id,'contract1-unit2');
 assert.equal(unit.unitLabel,'II');
 assert.equal(unit.lessons.length,10);
 assert.equal(new Set(unit.lessons.map(x=>x.id)).size,10);
 for(const x of unit.lessons){
  for(const field of ['title','section','focus','plain','example','pitfall','exam','prompt','why'])
   assert.ok(typeof x[field]==='string'&&x[field].length>12,x.id+' needs '+field);
  assert.equal(x.choices.length,3,x.id+' must have three choices');
  assert.ok(Number.isInteger(x.answer)&&x.answer>=0&&x.answer<3);
  assert.ok(x.why.length>35,'Feedback must teach the reason');
  x.refs.forEach(i=>assert.ok(unit.sources[i],x.id+' invalid source reference'));
 }
});
test('Unit II includes all major syllabus themes and legally accurate boundaries',()=>{
 const combined=unit.lessons.map(x=>x.section+' '+x.focus+' '+x.exam).join(' ');
 for(const text of ['Sections 10–12','Section 11','Sections 13–14','Sections 15–16','Sections 17–18','Sections 19 and 19A','Sections 20–22','Sections 23–24','Sections 25–30','Sections 31–36'])
   assert.ok(combined.includes(text),'Missing statutory coverage '+text);
 assert.ok(unit.lessons.some(x=>x.focus.includes('void from the outset')),'Minority rule missing');
 assert.ok(unit.lessons.some(x=>x.focus.includes('voidable')),'Voidability distinction missing');
 assert.ok(unit.lessons.some(x=>x.focus.includes('wager')),'Wagering distinction missing');
});
test('Official KSLU historical edition and government statutory sources stay separate from cohort approval',()=>{
 const u=ledger.getUnit(1,1);
 assert.equal(u.syllabusStatus,'needs-review');
 assert.ok(u.sourceIds.includes('kslu-2018-p6'));
 assert.ok(u.warnings.some(t=>t.includes('2018–19')));
 assert.equal(new URL(unit.sources[0].url).hostname,'kslu.karnataka.gov.in');
 assert.equal(new URL(unit.sources[1].url).hostname,'www.indiacode.nic.in');
 assert.ok(unit.cohortStatus.includes('admission cohort'));
});
test('Both guided units are discoverable from current app and service worker',()=>{
 const html=read('index.html'),sw=read('sw.js'),nav=read('syllabus-flow.js'),ui=read('contract-unit1-ui.js');
 for(const file of ['contract-unit1-ui.js?v=40','contract-unit2-data.js?v=37','syllabus-flow.js?v=40']){
  assert.ok(html.includes(file),file+' not in HTML');
  assert.ok(sw.includes(file),file+' not offline cached');
 }
 assert.ok(nav.includes('"contract1-unit2"'),'Direct Unit II link missing');
 assert.ok(nav.includes('window.openContractUnitTwo'),'Unit II open method missing');
 assert.ok(ui.includes('root.ContractUnitOneUI=createGuide'),'Shared renderer must support Unit I');
 assert.ok(ui.includes('root.ContractUnitTwoUI=createGuide'),'Shared renderer must support Unit II');
});

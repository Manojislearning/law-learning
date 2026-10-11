import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import vm from 'node:vm';
const root=resolve(import.meta.dirname,'..');
const read=(file)=>readFileSync(resolve(root,file),'utf8');
function load(file,key){
 const context={globalThis:{}};
 vm.runInNewContext(read(file),context,{timeout:1200});
 return context.globalThis[key];
}
const unit=load('contract-unit3-data.js','ContractUnitThreeData');
const ledger=load('content-ledger.js','LawContentLedger');

test('Contract I Unit III has ten individually explained and answerable lessons',()=>{
 assert.equal(unit.id,'contract1-unit3');
 assert.equal(unit.unitLabel,'III');
 assert.equal(unit.lessons.length,10);
 assert.equal(new Set(unit.lessons.map(x=>x.id)).size,10);
 for(const x of unit.lessons){
  for(const field of ['title','section','focus','plain','example','pitfall','exam','prompt','why'])
   assert.ok(typeof x[field]==='string'&&x[field].length>=14,x.id+' missing '+field);
  assert.equal(x.choices.length,3,x.id+' should have three choices');
  assert.ok(Number.isInteger(x.answer)&&x.answer>=0&&x.answer<3);
  assert.ok(x.why.length>45,'Explanatory feedback is too short for '+x.id);
  assert.ok(x.refs.length>=2,x.id+' should cite both curriculum and statute');
  x.refs.forEach(i=>assert.ok(unit.sources[i],x.id+' has unrecognised reference '+i));
 }
});
test('Unit III covers statutory performance and discharge sequence',()=>{
 const all=unit.lessons.map(x=>x.section+' '+x.focus+' '+x.exam).join(' ');
 for(const group of ['37–39','40–45','46–50','51–54','55','59–61','62','63–65','56','39']){
  assert.ok(all.includes(group),'Missing Contract Act section cluster '+group);
 }
 assert.ok(unit.lessons.some(x=>x.id==='frustration'&&x.pitfall.includes('delay')),'Frustration must not be equated to ordinary delay');
 assert.ok(unit.lessons.some(x=>x.id==='breach'&&x.exam.includes('anticipatory')),'Actual vs anticipatory breach missing');
});
test('Historical KSLU edition and legal sources are correctly marked and limited',()=>{
 const u=ledger.getUnit(1,2);
 assert.equal(u.syllabusStatus,'needs-review');
 assert.ok(u.sourceIds.includes('kslu-2018-contract-unit3'));
 assert.ok(u.warnings.some(x=>x.includes('admission cohort')));
 assert.equal(new URL(unit.sources[0].url).hostname,'kslu.karnataka.gov.in');
 assert.equal(new URL(unit.sources[1].url).hostname,'www.indiacode.nic.in');
 assert.ok(unit.cohortStatus.includes('cohort'));
});
test('Unit III route and both previous units are linked in version 38',()=>{
 const html=read('index.html'),sw=read('sw.js'),nav=read('syllabus-flow.js'),ui=read('contract-unit1-ui.js');
 for(const asset of ['contract-unit3-data.js?v=38','contract-unit1-ui.js?v=40','syllabus-flow.js?v=40']){
  assert.ok(html.includes(asset),'Missing HTML asset '+asset);
  assert.ok(sw.includes(asset),'Missing offline asset '+asset);
 }
 assert.ok(nav.includes('contract1-unit3'),'Third unit deep link missing');
 assert.ok(nav.includes('window.openContractUnitThree'),'Third unit open method missing');
 assert.ok(ui.includes('root.ContractUnitOneUI=createGuide'),'Unit I guide missing');
 assert.ok(ui.includes('root.ContractUnitTwoUI=createGuide'),'Unit II guide missing');
 assert.ok(ui.includes('root.ContractUnitThreeUI=createGuide'),'Unit III guide missing');
});

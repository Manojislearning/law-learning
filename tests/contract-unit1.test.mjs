import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import vm from 'node:vm';

const root=resolve(import.meta.dirname,'..');
const read=(p)=>readFileSync(resolve(root,p),'utf8');
function load(name,prop) {
 const ctx={globalThis:{}};
 vm.runInNewContext(read(name),ctx,{timeout:1200});
 return ctx.globalThis[prop];
}
const guide=load('contract-unit1-data.js','ContractUnitOneData');
const ledger=load('content-ledger.js','LawContentLedger');

test('Contract I Unit I has six distinct learn/apply/recall lessons',()=>{
 assert.equal(guide.id,'contract1-unit1');
 assert.equal(guide.lessons.length,6);
 assert.equal(new Set(guide.lessons.map(x=>x.id)).size,6);
 guide.lessons.forEach(lesson=>{
  for(const field of ['title','section','focus','plain','example','pitfall','exam','prompt','why'])
   assert.ok(typeof lesson[field]==='string'&&lesson[field].length>=14,lesson.id+' missing '+field);
  assert.equal(lesson.choices.length,3);
  assert.ok(Number.isInteger(lesson.answer)&&lesson.answer>=0&&lesson.answer<3);
  assert.ok(lesson.refs.length>=2);
  lesson.refs.forEach(n=>assert.ok(guide.sources[n],lesson.id+': invalid source index '+n));
 });
});
test('Sources include official KSLU 2018 curriculum and statutory PDF links',()=>{
 assert.ok(guide.syllabusEdition.includes('2018'));
 assert.ok(guide.cohortStatus.includes('cohort'));
 const urls=guide.sources.map(x=>new URL(x.url));
 assert.equal(urls[0].hostname,'kslu.karnataka.gov.in');
 assert.equal(urls[1].hostname,'www.indiacode.nic.in');
 assert.equal(urls[2].hostname,'www.meity.gov.in');
 assert.ok(urls.every(x=>x.protocol==='https:'));
});
test('Official-source matching does not falsely certify current cohort applicability',()=>{
 const unit=ledger.getUnit(1,0);
 assert.equal(unit.syllabusStatus,'needs-review');
 assert.ok(unit.sourceIds.includes('kslu-2018-p6'));
 assert.ok(unit.warnings.some(w=>w.includes('cohorts')));
 assert.ok(ledger.data.sources['kslu-2018-p6'].url.includes('kslu.karnataka.gov.in'));
});
test('Home, syllabus and offline cache include guided lesson files',()=>{
 const html=read('index.html'),sw=read('sw.js'),syllabus=read('syllabus-flow.js');
 assert.ok(html.includes('id="home-contract-lesson"'));
 for(const x of ['contract-unit1-data','contract-unit1-ui']){
  assert.ok(html.includes(x+'.js?v=36'));
  assert.ok(sw.includes(x+'.js?v=36'));
 }
 assert.ok(syllabus.includes('window.openContractUnitOne'));
 assert.ok(syllabus.includes('window.ContractUnitOneUI.render'));
});

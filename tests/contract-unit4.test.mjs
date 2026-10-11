import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import vm from 'node:vm';
const root=resolve(import.meta.dirname,'..');
const read=p=>readFileSync(resolve(root,p),'utf8');
function load(path,key){const context={globalThis:{}};vm.runInNewContext(read(path),context,{timeout:1200});return context.globalThis[key];}
const unit=load('contract-unit4-data.js','ContractUnitFourData');
const ledger=load('content-ledger.js','LawContentLedger');
test('Contract I Unit IV contains 12 distinct structured lessons and explained questions',()=>{
 assert.equal(unit.id,'contract1-unit4');
 assert.equal(unit.unitLabel,'IV');
 assert.equal(unit.lessons.length,12);
 assert.equal(new Set(unit.lessons.map(x=>x.id)).size,12);
 for(const l of unit.lessons){
  for(const f of ['title','section','focus','plain','example','pitfall','exam','prompt','why']){
   assert.ok(typeof l[f]==='string'&&l[f].length>20,l.id+' has missing '+f);
  }
  assert.equal(l.choices.length,3,l.id+' must offer 3 options');
  assert.ok(Number.isInteger(l.answer)&&l.answer>=0&&l.answer<3);
  assert.ok(l.why.length>45,'Reasoning not explained for '+l.id);
  assert.ok(l.refs.length>=2,'Primary source and syllabus reference absent for '+l.id);
  l.refs.forEach(i=>assert.ok(unit.sources[i],l.id+' has invalid source index'));
 }
});
test('All relevant statutory compensation and restitution provisions appear in lessons',()=>{
 const entries=unit.lessons.map(l=>l.section+' '+l.focus).join(' ');
 for(const s of ['Section 68','Section 69','Section 70','Section 71','Section 72','Section 73','Section 74','Section 75']){
  assert.ok(entries.includes(s),'Missing '+s);
 }
 assert.ok(unit.lessons.some(x=>x.id==='stipulated'&&x.focus.includes('reasonable compensation')),'Penalty clause nuance missing');
 assert.ok(unit.lessons.some(x=>x.id==='special-loss'&&x.focus.includes('remote')),'Remoteness distinction missing');
 assert.ok(unit.lessons.some(x=>x.id==='necessaries'&&x.focus.includes('property')),'Incapable party property remedy missing');
});
test('Contract Unit IV source ledger keeps historical syllabus cohort pending',()=>{
 const source=ledger.getUnit(1,3);
 assert.equal(source.syllabusStatus,'needs-review');
 assert.ok(source.sourceIds.includes('contract-act'));
 assert.ok(source.sourceIds.includes('kslu-2018-contract-unit3'));
 assert.ok(source.warnings.some(x=>x.includes('admission cohort')));
 assert.equal(new URL(unit.sources[0].url).hostname,'kslu.karnataka.gov.in');
 assert.equal(new URL(unit.sources[1].url).hostname,'www.indiacode.nic.in');
 assert.equal(new URL(unit.sources[2].url).hostname,'www.incometaxindia.gov.in');
 assert.ok(unit.cohortStatus.includes('not yet been confirmed'));
});
test('Unit IV guided route, previous units and offline files remain intact',()=>{
 const html=read('index.html'),worker=read('sw.js'),route=read('syllabus-flow.js'),ui=read('contract-unit1-ui.js');
 for(const file of ['contract-unit4-data.js?v=39','contract-unit1-ui.js?v=39','syllabus-flow.js?v=39']){
  assert.ok(html.includes(file),'Missing HTML file '+file);
  assert.ok(worker.includes(file),'Missing offline file '+file);
 }
 for(const name of ['One','Two','Three','Four']){
  assert.ok(ui.includes('root.ContractUnit'+name+'UI=createGuide'),'Guide missing for '+name);
 }
 assert.ok(route.includes('contract1-unit4'),'Unit IV direct link missing');
 assert.ok(route.includes('window.openContractUnitFour'),'Unit IV navigation missing');
});
test('No predictable answer position and optional missed-concept retry mechanism',()=>{
 const ui=read('contract-unit1-ui.js');
 assert.ok(ui.includes('shuffleChoices(info)'), 'Quiz options must be shuffled');
 assert.ok(ui.includes('missed.add(index)'), 'Wrong answers must be tracked in session');
 assert.ok(ui.includes('missed.delete(index)'), 'Correct retry should clear a missed concept');
 assert.ok(ui.includes('Retry')||ui.includes('Review '),'Review missed concepts must be accessible');
 assert.ok(!ui.includes('state.score+=')&&!ui.includes('state.streak+='),'Guided quiz must not inflate app points or false mastery');
});

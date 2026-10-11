import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import vm from 'node:vm';
const root=resolve(import.meta.dirname,'..');
const read=path=>readFileSync(resolve(root,path),'utf8');
function load(path, key){const ctx={globalThis:{}};vm.runInNewContext(read(path),ctx,{timeout:1500});return ctx.globalThis[key];}
const unit=load('contract-unit5-data.js','ContractUnitFiveData');
const ledger=load('content-ledger.js','LawContentLedger');
test('Specific Relief Unit V provides 12 sourced study lessons and 3 IRAC scenarios',()=>{
 assert.equal(unit.id,'contract1-unit5');
 assert.equal(unit.unitLabel,'V');
 assert.equal(unit.lessons.length,12);
 assert.equal(new Set(unit.lessons.map(x=>x.id)).size,12);
 for(const lesson of unit.lessons){
  for(const key of ['title','section','focus','plain','example','pitfall','exam','prompt','why']){
    assert.ok(typeof lesson[key]==='string'&&lesson[key].length>20,lesson.id+' missing '+key);
  }
  assert.equal(lesson.choices.length,3,lesson.id+' must have three responses');
  assert.ok(Number.isInteger(lesson.answer)&&lesson.answer>=0&&lesson.answer<3,lesson.id+' needs correct answer');
  lesson.refs.forEach(i=>assert.ok(unit.sources[i],lesson.id+' has invalid source index'));
 }
 const writings=unit.lessons.filter(x=>x.writing);
 assert.equal(writings.length,3);
 writings.forEach(x=>{
  assert.ok(x.writing.facts.length>75,x.id+' needs a realistic case');
  for(const k of ['issue','rule','application','conclusion'])
   assert.ok(x.writing.outline[k]?.length>35,x.id+' has insufficient '+k+' outline');
 });
});
test('Unit V includes the amended Specific Relief Act protections and remedies',()=>{
 const text=unit.lessons.map(l=>l.section+' '+l.focus+' '+l.exam+' '+l.pitfall).join(' ');
 for(const fragment of ['Section 10','Section 14','Section 16','Section 20','Section 21','Section 24','Section 26','Section 27','Section 31','Section 34','Sections 36–40','Section 41','Section 42'])
  assert.ok(text.includes(fragment),'Missing '+fragment);
 assert.ok(unit.lessons.some(x=>x.id==='substitute'&&x.focus.includes('30 days')),'Substitution notice requirement must be taught');
 assert.ok(unit.lessons.some(x=>x.id==='performance'&&x.pitfall.includes('pre-2018')),'Post-2018 provision must be contrasted');
 assert.ok(unit.lessons.some(x=>x.id==='bars'&&x.pitfall.includes('pre-2018')),'Substituted Section 14 must be contrasted');
});
test('Unit V official statutory authority is HTTPS and imported syllabus remains needs-review',()=>{
 const entry=ledger.getUnit(1,4);
 assert.equal(entry.syllabusStatus,'needs-review');
 assert.ok(entry.sourceIds.includes('specific-relief-amended-pdf'));
 assert.ok(entry.warnings.some(x=>x.includes('2018')));
 assert.ok(entry.warnings.some(x=>x.includes('26')));
 assert.ok(unit.cohortStatus.includes('admission year'));
 assert.equal(new URL(unit.sources[0].url).hostname,'www.indiacode.nic.in');
 assert.ok(unit.sources[0].url.endsWith('.pdf'));
});
test('Version 40 loads guided Unit V and keeps old unit support and offline integrity',()=>{
 const html=read('index.html'),sw=read('sw.js'),nav=read('syllabus-flow.js'),ui=read('contract-unit1-ui.js');
 for(const file of ['contract-unit5-data.js?v=40','contract-unit1-ui.js?v=40','syllabus-flow.js?v=40']){
  assert.ok(html.includes(file),'Missing HTML script '+file);
  assert.ok(sw.includes(file),'Missing offline file '+file);
 }
 for(const number of ['One','Two','Three','Four','Five'])assert.ok(ui.includes('ContractUnit'+number+'UI=createGuide'),'Missing guide '+number);
 assert.ok(nav.includes('contract1-unit5'));
 assert.ok(nav.includes('openContractUnitFive'));
 assert.ok(ui.includes('c1-write')&&ui.includes('c1-model')&&ui.includes('drafts.set'),'Written recall and self-check must exist');
 assert.ok(!ui.includes('localStorage.setItem'),'Do not silently store unsubmitted personal writing');
});

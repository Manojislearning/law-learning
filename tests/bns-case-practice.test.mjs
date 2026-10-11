import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
const require=createRequire(import.meta.url);
const bank=require('../bns-case-practice-data.js');
const torts=require('../torts-case-practice-data.js');
const contract=require('../case-practice-data.js');
const core=require('../case-practice-core.js');
const root=resolve(import.meta.dirname,'..');
const read=path=>readFileSync(resolve(root,path),'utf8');

test('BNS case bank has 15 original statute-linked cases, three in every KSLU BNS unit',()=>{
 assert.equal(bank.subject,'bns');
 assert.equal(bank.cases.length,15);
 assert.equal(core.verify(bank),true);
 const ids=new Set(bank.cases.map(x=>x.id));
 assert.equal(ids.size,15);
 for(let u=1;u<=5;u++)assert.equal(bank.cases.filter(x=>x.unit===u).length,3);
 for(const item of bank.cases){
  assert.ok(item.facts.length>65&&item.task.length>32);
  assert.ok(item.sections.length>=1);
  assert.ok(item.sourceIds.includes('bns'));
  for(const criterion of ['issue','rule','application','conclusion']){
   assert.ok(item.outline[criterion].length>=40,item.id+' lacks '+criterion);
  }
 }
});
test('Official BNS text, KSLU syllabus and MHA commencement notice are safe source links',()=>{
 assert.equal(new URL(bank.sources.bns.url).hostname,'www.indiacode.nic.in');
 assert.equal(new URL(bank.sources.syllabus.url).hostname,'kslu.karnataka.gov.in');
 assert.equal(new URL(bank.sources.commencement.url).hostname,'www.mha.gov.in');
 const unsupported=JSON.parse(JSON.stringify(bank));
 unsupported.sources.bns.url='https://wrong.example/act.pdf';
 assert.throws(()=>core.verify(unsupported),/primary law source/);
 const duplicate=JSON.parse(JSON.stringify(bank));duplicate.cases[1].id=duplicate.cases[0].id;
 assert.throws(()=>core.verify(duplicate),/repeated/);
});
test('Cases distinguish age and exception conditions, attempt, homicide, assembly and property offences',()=>{
 const pick=id=>{const c=bank.cases.find(x=>x.id===id);assert.ok(c,id+' missing');return c;};
 assert.ok(pick('u1-accident-care').outline.rule.includes('proper care and caution'));
 assert.ok(pick('u1-child-understanding').outline.rule.includes('Section 21'));
 assert.ok(pick('u2-conspiracy-agreement').outline.rule.includes('Section 61'));
 assert.ok(pick('u2-cruelty-dowry').outline.rule.includes('Section 80'));
 assert.ok(pick('u3-murder-definition').trap.includes('103'));
 assert.ok(pick('u3-grievous-hurt').outline.rule.includes('tooth'));
 assert.ok(pick('u4-assembly').outline.rule.includes('five-person'));
 assert.ok(pick('u4-rioting').outline.rule.includes('Section 191'));
 assert.ok(pick('u5-snatching').outline.rule.includes('Section 304'));
 assert.ok(pick('u5-trust-cheating').outline.rule.includes('Section 318'));
});
test('A date-specific BNS 106(2) commencement note does not become an unconditional present-day claim',()=>{
 const c=bank.cases.find(x=>x.id==='u3-negligence-commencement');
 assert.ok(c);
 assert.ok(c.facts.includes('10 July 2024'));
 assert.ok(c.outline.rule.includes('S.O. 850(E)'));
 assert.ok(c.outline.rule.includes('except Section 106(2)'));
 assert.ok(c.trap.includes('later notifications'));
 assert.ok(c.sourceIds.includes('commencement'));
});
test('Each BNS practice set covers all units and avoids repeated hypotheticals for three sets',()=>{
 const history=new Map(),collected=[];
 for(let round=0;round<3;round++){
  const chosen=core.select(bank,history,()=>.4);
  assert.deepEqual(chosen.map(x=>x.unit).sort(),[1,2,3,4,5]);
  collected.push(...chosen.map(x=>x.id));
  core.recordUsage(history,chosen);
 }
 assert.equal(new Set(collected).size,15);
 const next=core.select(bank,history,()=>.4);
 assert.equal(next.length,5);
});
test('Legacy Contract I and Torts banks and separate study histories remain valid',()=>{
 assert.equal(core.verify(contract),true);
 assert.equal(core.verify(torts),true);
 const histories={contract:new Map(),torts:new Map(),bns:new Map()};
 const chosen=core.select(bank,histories.bns,()=>.25);
 core.recordUsage(histories.bns,chosen);
 assert.equal(histories.bns.size,5);
 assert.equal(histories.contract.size,0);
 assert.equal(histories.torts.size,0);
});
test('New BNS learning route loads cached files and never stores free-form drafts',()=>{
 const html=read('index.html'),sw=read('sw.js'),view=read('case-practice-view.js'),flow=read('syllabus-flow.js');
 for(const item of ['bns-case-practice-data.js?v=48','case-practice-core.js?v=52','case-practice-view.js?v=52','syllabus-flow.js?v=52']){
  assert.ok(html.includes(item),'index lacks '+item);
  assert.ok(sw.includes(item),'offline cache lacks '+item);
 }
 assert.ok(view.includes('root.LawBnsCaseData'));
 assert.ok(view.includes('bns:new Map()'));
 assert.ok(view.includes('"bns","BNS · Criminal"'));
 assert.ok(flow.includes('open("bns")'));
 assert.ok(!view.includes('localStorage.setItem'));
});

import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
const require=createRequire(import.meta.url);
const root=resolve(import.meta.dirname,'..');
const read=p=>readFileSync(resolve(root,p),'utf8');
const bank=require('../constitution-case-practice-data.js');
const core=require('../case-practice-core.js');
const transfer=require('../case-transfer-data.js');
const transferCore=require('../case-transfer-core.js');
const all={
 contract:require('../case-practice-data.js'),
 torts:require('../torts-case-practice-data.js'),
 bns:require('../bns-case-practice-data.js'),
 constitution:bank
};
test('Fifteen Constitution I hypotheticals have legal reasoning and primary text references',()=>{
 assert.equal(bank.subject,'constitution');
 assert.equal(bank.cases.length,15);
 assert.equal(core.verify(bank),true);
 assert.equal(new Set(bank.cases.map(x=>x.id)).size,15);
 for(let u=1;u<=5;u++)assert.equal(bank.cases.filter(x=>x.unit===u).length,3);
 for(const item of bank.cases){
  assert.ok(item.facts.length>=90&&item.task.length>=35,item.id+' lacks facts or task');
  assert.ok(item.trap.length>=55,item.id+' needs meaningful misconception');
  for(const field of core.criteria)assert.ok(item.outline[field].length>=65,item.id+' lacks '+field);
  assert.ok(item.sourceIds.includes('constitution'),item.id+' needs constitutional text');
  item.sourceIds.forEach(id=>assert.ok(bank.sources[id]?.url.startsWith('https://'),item.id+' source '+id));
 }
});
test('Five units cover citizenship, Articles 12–19, accused rights and remedies',()=>{
 const has=id=>{const x=bank.cases.find(c=>c.id===id);assert.ok(x,'missing '+id);return x;};
 assert.ok(has('u1-birth').sections.some(x=>x.includes('Citizenship Act')));
 assert.ok(has('u2-local-authority').outline.rule.includes('Article 12'));
 assert.ok(has('u2-bylaw').outline.rule.includes('13'));
 assert.ok(has('u2-equality').outline.rule.includes('14'));
 assert.ok(has('u3-shop-entry').outline.rule.includes('15(2)'));
 assert.ok(has('u3-public-jobs').outline.rule.includes('16'));
 assert.ok(has('u3-speech').outline.rule.includes('19(2)'));
 assert.ok(has('u4-retroactive').outline.rule.includes('20(1)'));
 assert.ok(has('u4-arrest').outline.rule.includes('22(2)'));
 assert.ok(has('u4-religion').outline.rule.includes('25'));
 assert.ok(has('u5-writs').outline.rule.includes('226'));
 assert.ok(has('u5-property').outline.rule.includes('300A'));
 assert.ok(has('u5-minority-school').outline.rule.includes('30'));
});
test('Citation provenance uses government-published official texts, not fabricated Supreme Court decisions',()=>{
 const text=new URL(bank.sources.constitution.url);
 const citizenship=new URL(bank.sources.citizenship.url);
 assert.equal(text.hostname,'lddashboard.legislative.gov.in');
 assert.equal(citizenship.hostname,'www.indiacode.nic.in');
 assert.ok(bank.sources.constitution.url.endsWith('COI_2024.pdf'));
 assert.ok(bank.sources.citizenship.url.endsWith('A1955-57Eng.pdf'));
 assert.ok(bank.editionNote.includes('not university past papers'));
 assert.ok(bank.gradingNotice.includes('not automatic evaluation'));
 const forged=structuredClone(bank);
 forged.sources.constitution.url='https://unknown.example/constitution.pdf';
 assert.throws(()=>core.verify(forged),/primary law source/);
});
test('Mixed Constitution sessions sample all five units before repeating previously used cases',()=>{
 const used=new Map(),ids=[];
 for(let round=0;round<3;round++){
  const next=core.select(bank,used,()=>0.37);
  assert.deepEqual(next.map(x=>x.unit).sort(),[1,2,3,4,5]);
  ids.push(...next.map(x=>x.id));
  core.recordUsage(used,next);
 }
 assert.equal(new Set(ids).size,15);
 assert.equal(used.size,15);
});
test('Changed facts cover Constitution units and use the corresponding parent case legal authorities',()=>{
 assert.equal(transfer.items.length,25);
 assert.equal(transferCore.verify(transfer,{...all,hindu:require("../hindu-case-practice-data.js")}),true);
 const variants=transfer.items.filter(x=>x.subject==='constitution');
 assert.equal(variants.length,5);
 const parents=variants.map(v=>bank.cases.find(c=>c.id===v.parentId));
 assert.deepEqual(parents.map(p=>p.unit).sort(),[1,2,3,4,5]);
 for(const x of variants){
  assert.ok(x.changedFacts.length>=75);
  assert.ok(x.rule.length>=75);
  assert.ok(x.application.length>=75);
  assert.ok(x.trap.length>=75);
 }
 assert.equal(transferCore.select(transfer,{...all,hindu:require("../hindu-case-practice-data.js")},'constitution',null,()=>0.32).length,5);
 assert.equal(transferCore.select(transfer,all,'constitution',['u5-writs'],()=>0.32).length,1);
});
test('Version 51 loads four subject modules offline and preserves previous subject choice',()=>{
 const html=read('index.html'),sw=read('sw.js'),sy=read('syllabus-flow.js'),ui=read('case-practice-view.js');
 const assets=['constitution-case-practice-data.js?v=51','case-practice-core.js?v=52','case-transfer-data.js?v=52','case-transfer-core.js?v=52','case-practice-view.js?v=52','syllabus-flow.js?v=52'];
 for(const asset of assets){assert.ok(html.includes(asset),'HTML missing '+asset);assert.ok(sw.includes(asset),'PWA missing '+asset);}
 assert.ok(html.indexOf('constitution-case-practice-data.js?v=51')<html.indexOf('case-practice-view.js?v=52'));
 assert.ok(ui.includes('constitution:root.LawConstitutionCaseData'));
 assert.ok(ui.includes('Constitutional Law–I'));
 assert.ok(sy.includes('open("constitution")'));
 assert.ok(html.includes('75 IRAC cases'));
 assert.ok(!ui.includes('localStorage.setItem'),'Original essays must not be silently persisted');
});

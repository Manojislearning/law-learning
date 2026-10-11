import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
const require=createRequire(import.meta.url);
const root=resolve(import.meta.dirname,'..'),read=p=>readFileSync(resolve(root,p),'utf8');
const hindu=require('../hindu-case-practice-data.js'),core=require('../case-practice-core.js'),transfer=require('../case-transfer-data.js'),transferCore=require('../case-transfer-core.js');
const banks={contract:require('../case-practice-data.js'),torts:require('../torts-case-practice-data.js'),bns:require('../bns-case-practice-data.js'),constitution:require('../constitution-case-practice-data.js'),hindu};
test('Fifteen Hindu Law cases balance all five KSLU units, with rigorous IRAC outlines',()=>{
 assert.equal(hindu.subject,'hindu');assert.equal(core.verify(hindu),true);
 assert.equal(hindu.cases.length,15);assert.equal(new Set(hindu.cases.map(c=>c.id)).size,15);
 for(let i=1;i<=5;i++)assert.equal(hindu.cases.filter(c=>c.unit===i).length,3);
 for(const c of hindu.cases){
  assert.ok(c.facts.length>=75&&c.task.length>=33,c.id+' missing factual detail');
  assert.ok(c.trap.length>=35,c.id+' missing misconception');
  for(const part of core.criteria)assert.ok(c.outline[part].length>=40,c.id+' lacks '+part);
  assert.ok(c.sourceIds.length);
  for(const id of c.sourceIds)assert.ok(hindu.sources[id]?.url.startsWith('https://'),c.id+' source '+id);
 }
});
test('All sources are official India Code or KSLU and no dubious judicial citation is invented',()=>{
 for(const source of Object.values(hindu.sources))
  assert.ok(['www.indiacode.nic.in','kslu.karnataka.gov.in'].includes(new URL(source.url).hostname));
 assert.equal(core.verify(hindu),true);
 const forged=structuredClone(hindu);forged.sources.marriage.url='https://unknown.example/act';
 assert.throws(()=>core.verify(forged),/primary law source/);
 assert.ok(hindu.editionNote.includes('not official KSLU'));
});
test('Statute boundary tests guard common serious Hindu Law exam misconceptions',()=>{
 const get=id=>{const c=hindu.cases.find(c=>c.id===id);assert.ok(c,'Missing '+id);return c;};
 assert.ok(get('u1-coverage').outline.rule.includes('2(2)'), 'Scheduled Tribe exception');
 assert.ok(get('u2-age').outline.rule.includes('5(iii)')&&get('u2-age').outline.rule.includes('Section 11'));
 assert.ok(get('u2-bigamy').outline.rule.includes('11'));
 assert.ok(get('u3-daughter').outline.rule.includes('2005'));
 assert.ok((get('u3-daughter').facts+' '+get('u3-daughter').outline.rule).includes('20 December 2004'));
 assert.ok(get('u3-pious').outline.rule.includes('6(4)'));
 assert.ok(get('u4-class1').outline.rule.includes('Class I'));
 assert.ok(get('u4-woman').outline.rule.includes('14(2)'));
 assert.ok(get('u4-femaleestate').outline.rule.includes('15(2)(a)'));
 assert.ok(get('u5-consent').outline.rule.includes('Section 7'));
 assert.ok(get('u5-sale').outline.rule.includes('voidable'));
 assert.ok(get('u5-maintenance').outline.rule.includes('Section 20'));
});
test('Hindu practice rotates all 15 original cases over three completed five-unit sessions',()=>{
 const history=new Map(),seen=[];
 for(let round=0;round<3;round++){
  const choices=core.select(hindu,history,()=>0.27);
  assert.deepEqual(choices.map(c=>c.unit).sort(),[1,2,3,4,5]);
  seen.push(...choices.map(c=>c.id));core.recordUsage(history,choices);
 }
 assert.equal(new Set(seen).size,15);
});
test('Five Hindu fact changes inherit real parent cases and valid sources',()=>{
 assert.equal(transfer.items.length,25);assert.equal(transferCore.verify(transfer,banks),true);
 const variants=transfer.items.filter(t=>t.subject==='hindu');
 assert.equal(variants.length,5);
 assert.deepEqual(variants.map(x=>hindu.cases.find(c=>c.id===x.parentId).unit).sort(),[1,2,3,4,5]);
 for(const x of variants){
  assert.ok(x.changedFacts.length>=75&&x.rule.length>=75&&x.trap.length>=75);
  assert.ok(x.id==='hindu-'+x.parentId);
 }
 assert.equal(transferCore.select(transfer,banks,'hindu',null,()=>0.29).length,5);
 assert.equal(transferCore.select(transfer,banks,'hindu',['u5-sale'],()=>0.29).length,1);
});
test('New Hindu reading remains in shared router, offline cache and in-memory self-assessment',()=>{
 const html=read('index.html'),worker=read('sw.js'),view=read('case-practice-view.js'),syllabus=read('syllabus-flow.js');
 for(const asset of ['hindu-case-practice-data.js?v=52','case-practice-core.js?v=54','case-transfer-data.js?v=52','case-transfer-core.js?v=52','case-practice-view.js?v=55','syllabus-flow.js?v=63']){
  assert.ok(html.includes(asset),'HTML missing '+asset);assert.ok(worker.includes(asset),'Worker missing '+asset);
 }
 assert.ok(html.includes('75 IRAC cases'));
 assert.ok(view.includes('hindu:root.LawHinduCaseData'));
 assert.ok(view.includes('bankKey==="hindu"'));
 assert.ok(syllabus.includes('open("hindu")'));
 assert.ok(!view.includes('localStorage.setItem'));
 assert.ok(html.indexOf('hindu-case-practice-data.js?v=52')<html.indexOf('case-practice-view.js?v=55'));
});

import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
const require=createRequire(import.meta.url),root=resolve(import.meta.dirname,'..');
const data=require('../case-transfer-data.js'),core=require('../case-transfer-core.js');
const banks={
 contract:require('../case-practice-data.js'),
 torts:require('../torts-case-practice-data.js'),
 bns:require('../bns-case-practice-data.js'),
 constitution:require('../constitution-case-practice-data.js'),
 hindu:require('../hindu-case-practice-data.js')
};
const read=p=>readFileSync(resolve(root,p),'utf8');
test('Exactly 20 original changed-fact prompts map to real original cases, one per unit and course',()=>{
 assert.equal(core.verify(data,banks),true);
 assert.equal(data.items.length,25);
 for(const course of ['contract','torts','bns','constitution','hindu']){
  const rows=data.items.filter(t=>t.subject===course);
  assert.equal(rows.length,5);
  assert.deepEqual(rows.map(t=>banks[course].cases.find(c=>c.id===t.parentId).unit).sort(),[1,2,3,4,5]);
  for(const row of rows){
   assert.ok(row.changedFacts.length>=75,row.id+' needs substantive altered facts');
   assert.ok(row.application.length>=75,row.id+' needs changed-fact application');
   assert.ok(row.trap.length>=75,row.id+' needs contrasting misconception');
  }
 }
});
test('Changed-facts selection avoids fixed order and can target only units needing practice',()=>{
 const all=core.select(data,banks,'torts',null,()=>.21);
 assert.equal(all.length,5);
 assert.notDeepEqual(all.map(x=>banks.torts.cases.find(c=>c.id===x.parentId).unit),[1,2,3,4,5]);
 const selected=core.select(data,banks,'bns',['u2-cruelty-dowry','u5-intimidation'],()=>.47);
 assert.equal(selected.length,2);
 assert.deepEqual(selected.map(x=>banks.bns.cases.find(c=>c.id===x.parentId).unit).sort(),[2,5]);
 const one=core.select(data,banks,'contract',['u1-acceptance'],()=>.2);
 assert.equal(one.length,1);
 assert.equal(one[0].subject,'contract');
});
test('Broken case links or unsupported sources are rejected rather than displayed',()=>{
 const bad=JSON.parse(JSON.stringify(data));
 bad.items[0].parentId='u1-unknown';
 assert.throws(()=>core.verify(bad,banks),/mapping/);
 const dup=JSON.parse(JSON.stringify(data));
 dup.items[1].id=dup.items[0].id;
 assert.throws(()=>core.verify(dup,banks),/Duplicate/);
 assert.throws(()=>core.select(data,banks,'hindu',[],()=>.3),/Unknown subject/);
 assert.throws(()=>core.select(data,banks,'contract',[],()=>1),/Invalid shuffle/);
});
test('Changed facts explicitly contrast high-risk legal mistakes without claims of assured outcomes',()=>{
 const c=data.items.find(x=>x.parentId==='u5-hitrun');
 assert.ok(c.changedFacts.includes('identified'));
 assert.ok(c.application.includes('driver'));
 const a=data.items.find(x=>x.parentId==='u3-hardship');
 assert.ok(a.application.includes('increased cost'));
 const b=data.items.find(x=>x.parentId==='u2-cruelty-dowry');
 assert.ok(b.rule.includes('Section 80'));
 assert.ok(b.trap.includes('automatically'));
 assert.ok(data.disclaimer.toLowerCase().includes('not official kslu'));
});
test('Version 51 loads changed-facts assets before practice reader and precaches both',()=>{
 const html=read('index.html'),sw=read('sw.js'),view=read('case-practice-view.js');
 for(const asset of ['case-transfer-data.js?v=52','case-transfer-core.js?v=52','case-practice-view.js?v=52']){
  assert.ok(html.includes(asset),'Missing browser asset '+asset);
  assert.ok(sw.includes(asset),'Missing offline asset '+asset);
 }
 assert.ok(html.indexOf('case-transfer-core.js?v=52')<html.indexOf('case-practice-view.js?v=52'));
 assert.ok(view.includes('startTransfer'));
 assert.ok(view.includes('finishTransfer'));
 assert.ok(view.includes('essay.value.trim().length<40'),'Reference answer must remain gated');
 assert.ok(!view.includes('localStorage.setItem'),'Practice essays must remain session-only');
});

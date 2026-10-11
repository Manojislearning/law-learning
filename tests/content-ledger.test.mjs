import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import vm from 'node:vm';

const root=resolve(import.meta.dirname,'..');
function source(name){return readFileSync(resolve(root,name),'utf8');}
function loadLedger(){
  const ctx={globalThis:{}};
  vm.runInNewContext(source('content-ledger.js'),ctx,{timeout:1200});
  return ctx.globalThis.LawContentLedger;
}
function imported(){
  const s=source('app.js'),a=s.indexOf('const KSLU_FIRST_SEMESTER = ');
  const b=s.indexOf('\nconst PRACTICE_QUESTIONS',a);
  return JSON.parse(s.slice(a+'const KSLU_FIRST_SEMESTER = '.length,b).trim().replace(/;\s*$/,''));
}
test('A4 ledger indexes all imported first-semester subjects and 30 units',()=>{
  const api=loadLedger(),courses=imported().courses;
  assert.equal(api.data.units.length,30);
  assert.equal(courses.length,6);
  const seen=new Set();
  for(let c=0;c<courses.length;c++)for(let u=0;u<courses[c].units.length;u++){
    const entry=api.getUnit(c,u);
    assert.ok(entry,'Missing ledger entry for '+c+':'+u);
    assert.equal(entry.title,courses[c].units[u].title);
    assert.equal(entry.course,courses[c].name);
    assert.ok(!seen.has(entry.id),'Duplicate unit ID: '+entry.id);
    seen.add(entry.id);
  }
});
test('Unreviewed syllabus wording is never marked verified',()=>{
  const api=loadLedger();
  assert.equal(api.data.publishedForCohort,'unconfirmed');
  api.data.units.forEach(unit=>{
    assert.equal(unit.syllabusStatus,'needs-review');
    assert.equal(unit.lastReviewed,null);
    assert.ok(unit.sourceIds.includes('kslu-index'));
    assert.ok(api.getSources(unit).length>=1);
  });
});
test('Every source is an official government or university HTTPS resource',()=>{
  const ledger=loadLedger().data;
  const allowed=['kslu.karnataka.gov.in','www.indiacode.nic.in','legislative.gov.in'];
  Object.entries(ledger.sources).forEach(([id,s])=>{
    const u=new URL(s.url);
    assert.equal(u.protocol,'https:');
    assert.ok(allowed.includes(u.hostname),'Unexpected source domain in '+id);
    assert.ok(s.title&&s.publisher&&s.verifiedScope);
  });
  ledger.units.forEach(unit=>unit.sourceIds.forEach(id=>assert.ok(ledger.sources[id],'Unknown source ID '+id)));
});
test('Known outdated syllabus references show a prominent warning',()=>{
  const ledger=loadLedger();
  const consumer=ledger.getUnit(2,4);
  assert.ok(consumer.warnings.some(w=>w.includes('1986')&&w.includes('2019')));
  assert.ok(consumer.sourceIds.includes('consumer-2019'));
  assert.ok(ledger.getUnit(1,4).warnings.length>0,'Specific Relief reference needs review');
});
test('Source-checked claims do not upgrade full syllabus units to verified',()=>{
  const ledger=loadLedger();
  assert.ok(ledger.data.verifiedClaims.length>=4);
  ledger.data.verifiedClaims.forEach(claim=>{
    assert.equal(claim.status,'source-checked');
    assert.ok(claim.reviewedOn && claim.claim);
    assert.ok(ledger.getUnit(claim.courseIndex,claim.unitIndex));
    claim.sourceIds.forEach(id=>assert.ok(ledger.data.sources[id]));
  });
  assert.equal(ledger.data.units.filter(x=>x.syllabusStatus==='verified').length,0);
});

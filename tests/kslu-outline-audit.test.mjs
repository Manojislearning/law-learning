import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import vm from 'node:vm';

const folder=resolve(import.meta.dirname,'..');
const read=name=>readFileSync(resolve(folder,name),'utf8');
const ctx={globalThis:{}};
vm.runInNewContext(read('content-ledger.js'),ctx,{timeout:1500});
const {data,getUnit}=ctx.globalThis.LawContentLedger;
const syllabus2018='https://kslu.karnataka.gov.in/storage/pdf-files/';
const curriculum2024='https://kslu.karnataka.gov.in/storage/pdf-files/Syllabusof3NewCriminalLaws.pdf';
const pages=[[4,4,4,4,5],[6,6,6,6,6],[8,8,8,8,8],[10,10,10,10,10],[1,1,1,2,2],[13,13,13,14,14]];

test('All 30 imported Semester I topic outlines have published-edition PDF-page comparisons',()=>{
 assert.equal(data.units.length,30);
 assert.equal(data.units.filter(x=>x.outlineAudit?.status==='published-outline-compared').length,30);
 for(let c=0;c<6;c++)for(let i=0;i<5;i++){
  const row=getUnit(c,i),audit=row.outlineAudit;
  assert.ok(audit,'Missing outline match for '+c+'/'+i);
  assert.equal(audit.printedPage,pages[c][i]);
  assert.equal(audit.sourceId,c===4?'kslu-2024-criminal':'kslu-2018-llb');
  assert.ok(row.sourceIds.includes(audit.sourceId));
  assert.equal(audit.checkedOn,'2026-10-11');
  assert.ok(audit.scope.length>70&&audit.caution.length>35);
 }
});
test('University source links point to correct historical base and 2024 criminal law amendment',()=>{
 const old=data.sources['kslu-2018-llb'],amended=data.sources['kslu-2024-criminal'];
 assert.ok(old.url.startsWith(syllabus2018));assert.ok(old.url.endsWith('.pdf'));
 assert.equal(amended.url,curriculum2024);
 assert.ok(old.verifiedScope.includes('2018'));
 assert.ok(amended.verifiedScope.includes('2024'));
 assert.ok(amended.verifiedScope.includes('BNS'));
});
test('A historical outline match never becomes current-cohort or statutory-content approval',()=>{
 assert.equal(data.publishedForCohort,'unconfirmed');
 assert.equal(data.units.filter(x=>x.syllabusStatus==='verified').length,0);
 for(const u of data.units)assert.equal(u.syllabusStatus,'needs-review');
 assert.ok(data.reviewPolicy.toLowerCase().includes('outline matching only'), 'Source matches cannot certify full legal accuracy');
 assert.ok(getUnit(1,4).outlineAudit.caution.includes('2018'));
 assert.ok(getUnit(2,4).outlineAudit.caution.includes('1986'));
});
test('English conditional paper and modern BNS scheme cannot be misrepresented',()=>{
 assert.ok(getUnit(5,0).warnings.some(x=>x.includes('examinations in Kannada')));
 for(let i=0;i<5;i++)assert.ok(getUnit(4,i).outlineAudit.scope.includes('BNS'));
 assert.ok(getUnit(4,3).outlineAudit.printedPage===2);
 assert.ok(getUnit(4,0).outlineAudit.printedPage===1);
});
test('Version 44 uses a single source dashboard with PDF-page links and offline cache',()=>{
 const html=read('index.html'),sw=read('sw.js'),nav=read('syllabus-flow.js');
 for(const p of ['app.js?v=44','content-ledger.js?v=46','syllabus-flow.js?v=48']){
  assert.ok(html.includes(p),'Index must load '+p);
  assert.ok(sw.includes(p),'Worker must cache '+p);
 }
 assert.ok(html.includes('30 Semester I outlines compared'));
 assert.ok(nav.includes('Syllabus source audit'));
 assert.ok(nav.includes('View corresponding KSLU PDF page'));
 assert.ok(nav.includes('get("sources")')||nav.includes('get("sources")==="1"'));
 assert.ok(nav.includes('current cohort unconfirmed'));
});

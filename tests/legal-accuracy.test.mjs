import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import vm from 'node:vm';
const root=resolve(import.meta.dirname,'..');
const read=file=>readFileSync(resolve(root,file),'utf8');
function load(file,key){const ctx={globalThis:{},URL};vm.runInNewContext(read(file),ctx,{timeout:1800});return ctx.globalThis[key];}
const bank=load('legal-accuracy-data.js','LawAccuracyData');
const core=load('legal-accuracy-core.js','LawAccuracyCore');
const ledger=load('content-ledger.js','LawContentLedger');
test('All law-check lessons have 3 different choices, a legal explanation, and primary-source links',()=>{
 const result=core.verify(bank);
 assert.equal(result.total,24);
 assert.equal(result.counts.bns,8);
 assert.equal(result.counts.consumer,7);
 assert.equal(result.counts.motor,9);
 assert.equal(core.cardsFor(bank,'bns').length,8);
 assert.equal(core.cardsFor(bank,'consumer').length,7);
 assert.equal(core.cardsFor(bank,'motor').length,9);
 assert.throws(()=>core.cardsFor(bank,'ipc'),/Invalid/);
 for(const item of bank.cards){
  assert.ok(item.rule.length>35);
  assert.ok(item.example.length>40);
  assert.ok(item.mistake.length>45);
  assert.ok(item.refs.every(x=>bank.sources[x]?.url.startsWith('https://')));
 }
});
test('BNS section structure and the non-commencement warning remain explicit',()=>{
 const bns=core.cardsFor(bank,'bns');
 for(const s of ['4','61–62','80','100–106','111–113','303–304','316–318']){
  assert.ok(bns.some(x=>x.section.includes(s)),'Missing '+s);
 }
 const notification=bns.find(x=>x.id==='bns-commencement');
 assert.ok(notification.rule.includes('106(2)'));
 assert.ok(notification.rule.includes('except'));
 assert.ok(notification.refs.includes('bns-commence'));
 assert.ok(notification.mistake.includes('recheck later notifications'));
 const distinctions=bns.find(x=>x.id==='bns-homicide');
 assert.ok(distinctions.rule.includes('101'));
 assert.ok(distinctions.rule.includes('103'));
});
test('Modern consumer claims use 2019 Act and 2021 jurisdiction rather than outdated syllabus figures',()=>{
 const consumer=core.cardsFor(bank,'consumer');
 assert.ok(consumer.some(x=>x.rule.includes('1986')&&x.rule.includes('2019')));
 const j=consumer.find(x=>x.id==='consumer-jurisdiction');
 assert.ok(j.section.includes('2021'));
 assert.ok(j.rule.includes('₹50 lakh'));
 assert.ok(j.rule.includes('₹2 crore'));
 assert.ok(j.rule.includes('consideration'));
 assert.ok(j.refs.includes('consumer-jurisdiction'));
 assert.ok(consumer.some(x=>x.section.includes('69')&&x.rule.includes('two years')));
 const source=bank.sources['consumer-jurisdiction'];
 assert.equal(new URL(source.url).hostname,'consumeraffairs.gov.in');
});
test('Outdated official links and tampered answer data cannot pass legal lesson verification',()=>{
 const copy=JSON.parse(JSON.stringify(bank));
 copy.cards[0].refs=['fake'];
 assert.throws(()=>core.verify(copy),/Unknown source/);
 const wrong=JSON.parse(JSON.stringify(bank));
 wrong.sources['consumer-act'].url='http://example.org/tamper';
 assert.throws(()=>core.verify(wrong),/Unofficial/);
 const dup=JSON.parse(JSON.stringify(bank));dup.cards[1].id=dup.cards[0].id;
 assert.throws(()=>core.verify(dup),/Invalid statutory card identifier/);
});
test('All 5 BNS and Torts Consumer units flag partial law checks without falsely verifying the syllabus',()=>{
 const rows=ledger.data.units.filter(x=>x.lawAudit);
 assert.equal(rows.length,6);
 assert.ok(rows.every(x=>x.lawAudit.status==='selected-provisions-checked'));
 assert.ok(rows.every(x=>x.syllabusStatus==='needs-review'));
 assert.equal(ledger.data.publishedForCohort,'unconfirmed');
 assert.ok(ledger.data.sources['bns-commencement-notification'].url.includes('mha.gov.in'));
 assert.ok(ledger.data.sources['consumer-jurisdiction-2021'].url.includes('consumeraffairs.gov.in'));
 assert.ok(ledger.getUnit(4,2).warnings.some(x=>x.includes('106(2)')));
 assert.ok(ledger.getUnit(2,4).warnings.some(x=>x.includes('₹50 lakh')));
});
test('New primary-source experience is one route and precached, without new local storage keys',()=>{
 const html=read('index.html'),sw=read('sw.js'),app=read('app-core.js'),syllabus=read('syllabus-flow.js'),view=read('legal-accuracy-view.js');
 for(const name of ['legal-accuracy-data.js','legal-accuracy-core.js','legal-accuracy-view.js']){
  var version=name==="legal-accuracy-view.js"?63:46;assert.ok(html.includes(name+'?v='+version));assert.ok(sw.includes(name+'?v='+version));
 }
 assert.ok(app.includes('"law-updates":'));
 assert.ok(html.includes('data-open="law-updates"'));
 assert.ok(syllabus.includes('LawAccuracyUI.open'));
 assert.ok(view.includes('LawAppCore.router.subscribe'));
 assert.ok(!view.includes('localStorage.'));
 assert.ok(!view.includes('addEventListener("hashchange"'));
});

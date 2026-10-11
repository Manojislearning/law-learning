import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import vm from 'node:vm';
const req=createRequire(import.meta.url);
const root=resolve(import.meta.dirname,'..');
const read=path=>readFileSync(resolve(root,path),'utf8');
function load(path,key){const ctx={globalThis:{},URL};vm.runInNewContext(read(path),ctx,{timeout:1500});return ctx.globalThis[key];}
const data=load('legal-accuracy-data.js','LawAccuracyData');
const core=load('legal-accuracy-core.js','LawAccuracyCore');
const ledger=load('content-ledger.js','LawContentLedger');
const motor=core.cardsFor(data,'motor');
test('Motor Vehicles mini-course has nine distinct source-linked notes',()=>{
 assert.equal(core.verify(data).total,24);
 assert.equal(motor.length,9);
 assert.equal(new Set(motor.map(c=>c.id)).size,9);
 for(const item of motor){
   assert.ok(item.section.includes('Motor Vehicles Act'));
   assert.ok(item.rule.length>75&&item.example.length>50&&item.mistake.length>60);
   assert.equal(item.choices.length,3);
   assert.ok(item.answer>=0&&item.answer<3);
   assert.ok(item.refs.includes('motor-act'));
 }
});
test('Section 164 no-fault claim is distinguished from section 161 hit-and-run scheme',()=>{
 const noFault=motor.find(x=>x.id==='motor-no-fault');
 const hit=motor.find(x=>x.id==='motor-hit-run');
 assert.ok(noFault.rule.includes('₹5 lakh')&&noFault.rule.includes('₹2.5 lakh'));
 assert.ok(noFault.rule.includes('need not prove wrongful act'));
 assert.ok(hit.rule.includes('₹2 lakh')&&hit.rule.includes('₹50,000'));
 assert.ok(hit.rule.includes('1 April 2022'));
 assert.ok(hit.mistake.includes('unidentified-vehicle criteria'));
 assert.ok(hit.refs.includes('motor-hitrun'));
});
test('Section 162 cashless treatment has distinct dated hospital scheme caps',()=>{
 const x=motor.find(x=>x.id==='motor-cashless');
 assert.ok(x.rule.includes('2025')&&x.rule.includes('₹1.5 lakh'));
 assert.ok(x.rule.includes('seven days'));
 assert.ok(x.rule.includes('not the same'));
 assert.ok(x.refs.includes('motor-2025-scheme'));
});
test('2026 Jan Vishwas amendment study checks distinguish dated Section 166 and ex-gratia provisions',()=>{
 const filing=motor.find(x=>x.id==='motor-2026-limitation');
 assert.ok(filing.rule.includes('166(3)'));
 assert.ok(filing.rule.includes('six-month'));
 assert.ok(filing.rule.includes('further period not exceeding twelve months'));
 assert.ok(filing.rule.includes('sufficient cause'));
 assert.ok(filing.rule.includes('15 August 2026'));
 const ex=motor.find(x=>x.id==='motor-ex-gratia');
 assert.ok(ex.rule.includes('164(4)'));
 assert.ok(ex.rule.includes('163(3)'));
 assert.ok(ex.rule.includes('not reduced'));
 const transfer=motor.find(x=>x.id==='motor-2026-transfer');
 assert.ok(transfer.rule.includes('thirty days'));
 assert.ok(transfer.rule.includes('15 August 2026'));
 for(const c of [filing,ex,transfer])assert.ok(c.refs.includes('motor-2026')&&c.refs.includes('motor-2026-commence'));
});
test('2026 Gazette and 2022/2025 government sources remain official HTTPS links',()=>{
 const required=['motor-act','motor-hitrun','motor-2025-scheme','motor-2026','motor-2026-commence'];
 for(const id of required){
  const u=new URL(data.sources[id].url);
  assert.equal(u.protocol,'https:');
  assert.ok(['www.indiacode.nic.in','www.pib.gov.in','egazette.gov.in'].includes(u.hostname));
 }
 assert.ok(data.sources['motor-2026'].url.endsWith('/271642.pdf'));
 assert.ok(data.sources['motor-2026-commence'].url.endsWith('/274798.pdf'));
});
test('Torts Unit V provenance retains cohort ambiguity and both study routes',()=>{
 const row=ledger.getUnit(2,4);
 assert.equal(row.syllabusStatus,'needs-review');
 assert.equal(ledger.data.publishedForCohort,'unconfirmed');
 assert.ok(row.lawAudit.studyRoutes.includes('motor'));
 assert.ok(row.lawAudit.studyRoutes.includes('consumer'));
 for(const key of ['motor-act','motor-hitrun-2022','motor-cashless-2025','motor-janvishwas-2026','motor-2026-commencement'])
  assert.ok(row.sourceIds.includes(key),'Missing ledger provenance '+key);
 assert.ok(row.warnings.some(w=>w.includes('15 August 2026')));
});
test('Motor Vehicles subject is available from the same offline app, no user storage changed',()=>{
 const html=read('index.html'),sw=read('sw.js'),view=read('legal-accuracy-view.js'),sy=read('syllabus-flow.js');
 for(const file of ['legal-accuracy-data.js?v=46','legal-accuracy-core.js?v=46','legal-accuracy-view.js?v=46','content-ledger.js?v=46','syllabus-flow.js?v=46']){
  assert.ok(html.includes(file),'HTML lacks '+file);
  assert.ok(sw.includes(file),'SW lacks '+file);
 }
 assert.ok(view.includes('topic==="motor"'));
 assert.ok(sy.includes('open("motor")'));
 assert.ok(html.includes('Motor Vehicles 2026'));
 assert.ok(!view.includes('localStorage.'));
});

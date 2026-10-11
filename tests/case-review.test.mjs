import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const C=require('../case-review-core.js');
const Contract=require('../case-practice-data.js'),Torts=require('../torts-case-practice-data.js');
const T=1791734400000,DAY=86400000;
function store(initial={},fails=false){
 const mem=new Map(Object.entries(initial));
 return {getItem:k=>mem.has(k)?mem.get(k):null,setItem(k,v){if(fails)throw Error('storage blocked');mem.set(k,v);},
  removeItem:k=>mem.delete(k),snapshot:()=>Object.fromEntries(mem)};
}
test('Case review saves only a stable case identifier, status and missed IRAC elements',()=>{
 const db=store(),id=Contract.cases[0].id;
 const r=C.note(db,'contract',id,'self-identified gaps',['rule','application'],T);
 assert.equal(r.nextAt,T+DAY);
 assert.equal(r.attempts,1);
 const raw=db.getItem(C.KEY);
 assert.ok(raw);
 assert.ok(!raw.includes(Contract.cases[0].facts),'Never store case facts or essay');
 assert.ok(!raw.includes(Contract.cases[0].outline.issue));
 assert.equal(C.total(db),1);
 assert.equal(C.forSubject(db,'contract',Contract.cases,T).due.length,0);
 assert.equal(C.forSubject(db,'contract',Contract.cases,T+DAY).due.length,1);
 assert.deepEqual(C.forSubject(db,'contract',Contract.cases,T+DAY).due[0].missing,['rule','application']);
});
test('Unanswered and skipped cases are due immediately; successful retry clears only its own flag',()=>{
 const db=store();
 const a=Contract.cases[0],b=Torts.cases[1];
 C.note(db,'contract',a.id,'skipped',[],T);
 C.note(db,'torts',b.id,'not self-assessed',[],T);
 assert.equal(C.forSubject(db,'contract',Contract.cases,T).due.length,1);
 assert.equal(C.forSubject(db,'torts',Torts.cases,T).due.length,1);
 assert.equal(C.clear(db,'contract',a.id),true);
 assert.equal(C.clear(db,'contract',a.id),false);
 assert.equal(C.total(db),1);
 assert.equal(C.forSubject(db,'torts',Torts.cases,T).all.length,1);
});
test('Repeating a weak case updates due time without adding grades or storing essays',()=>{
 const db=store(),id=Torts.cases[0].id;
 C.note(db,'torts',id,'self-identified gaps',['issue'],T);
 const row=C.note(db,'torts',id,'self-identified gaps',['conclusion'],T+DAY);
 assert.equal(row.attempts,2);
 assert.deepEqual(row.missing,['conclusion']);
 assert.equal(row.nextAt,T+2*DAY);
 assert.equal(C.read(db).cases['torts:'+id].status,'self-identified gaps');
});
test('Corrupted or future-version data is rejected and never silently replaced',()=>{
 const original='{"version":2,"cases":{}}',db=store({[C.KEY]:original});
 assert.throws(()=>C.read(db),/Unsupported/);
 assert.throws(()=>C.note(db,'contract',Contract.cases[0].id,'skipped',[],T),/Unsupported/);
 assert.equal(db.getItem(C.KEY),original);
 assert.throws(()=>C.parse('invalid'),/not valid JSON/);
 assert.throws(()=>C.parse('{"version":1,"cases":{"__proto__":{"status":"skipped"}}}'),/Invalid saved case ID/);
});
test('Identity validation rejects invented courses, unsafe IDs and malformed flags',()=>{
 const db=store(),id=Contract.cases[0].id;
 assert.throws(()=>C.note(db,'english',id,'skipped',[],T),/identity/);
 assert.throws(()=>C.note(db,'contract','__proto__','skipped',[],T),/identity/);
 assert.throws(()=>C.note(db,'contract',id,'self-identified gaps',[],T),/Missing/);
 assert.throws(()=>C.note(db,'contract',id,'self-identified gaps',['issue','issue'],T),/Invalid/);
 assert.throws(()=>C.note(db,'contract',id,'skipped',['rule'],T),/Unexpected/);
 assert.throws(()=>C.note(db,'contract',id,'mastered',[],T),/Unknown/);
 assert.equal(db.getItem(C.KEY),null);
});
test('Quota/storage failures leave the original state intact',()=>{
 const db=store(),id=Contract.cases[0].id;
 C.note(db,'contract',id,'skipped',[],T);
 const before=db.getItem(C.KEY);
 const denied=store({[C.KEY]:before},true);
 assert.throws(()=>C.note(denied,'contract',id,'self-identified gaps',['issue'],T+DAY),/storage blocked/);
 assert.equal(denied.getItem(C.KEY),before);
 assert.throws(()=>C.clear(denied,'contract',id),/storage blocked/);
 assert.equal(denied.getItem(C.KEY),before);
});
test('Records are independent across five law subjects',()=>{
 const db=store();let n=0;
 const banks={contract:Contract,torts:Torts,bns:require('../bns-case-practice-data.js'),constitution:require('../constitution-case-practice-data.js'),hindu:require('../hindu-case-practice-data.js')};
 for(const [subject,bank] of Object.entries(banks)){
  const id=bank.cases[0].id;
  C.note(db,subject,id,'skipped',[],T+n++);
  assert.equal(C.forSubject(db,subject,bank.cases,T+DAY).all.length,1);
 }
 assert.equal(C.total(db),5);
 C.clear(db,'hindu',banks.hindu.cases[0].id);
 assert.equal(C.total(db),4);
});

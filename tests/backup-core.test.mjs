import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const Core=require('../backup-core.js');
const Review=require('../review-core.js');
const CaseReview=require('../case-review-core.js');

const PROGRESS='law-learning-progress-v2',NOTES='law-learning-notes-v1',PROFILE='law-learning-profile-v1',REVIEW='law-learning-review-v1',CASES='law-learning-case-review-v1';
const progress={currentWord:8,score:40,learned:[1,3,8],difficult:[5],streak:2};
const profile={nickname:'Law student',goal:'10',language:'English',reduceMotion:true,largeText:false};
function mockStore(initial={},failAt=0){
  const values=new Map(Object.entries(initial));
  let writes=0;
  return {
    getItem:k=>values.has(k)?values.get(k):null,
    setItem(k,v){writes++;if(failAt&&writes===failAt)throw Error('QuotaExceededError');values.set(k,String(v));},
    removeItem:k=>values.delete(k),
    asObject:()=>Object.fromEntries(values)
  };
}
const v1={app:'law-learning',schema:1,created:'2026-01-02T00:00:00.000Z',
 records:{[PROGRESS]:JSON.stringify(progress),[NOTES]:'Private draft: offer vs acceptance',[PROFILE]:JSON.stringify(profile)}};
test('Legacy v1 imports into current version while retaining progress and notes',()=>{
 const b=Core.parseBackup(JSON.stringify(v1));
 assert.equal(b.schema,4);
 assert.equal(b.migratedFrom,1);
 const store=mockStore();
 Core.restoreBackup(store,JSON.stringify(v1));
 assert.deepEqual(JSON.parse(store.getItem(PROGRESS)),progress);
 assert.equal(store.getItem(NOTES),v1.records[NOTES]);
 assert.equal(Core.describe(b).learned,3);
});
test('v4 export round-trip preserves old progress, notes and profile',()=>{
 const initial=mockStore(v1.records);
 const data=Core.exportBackup(initial,'2026-01-02T00:00:00.000Z');
 assert.equal(JSON.parse(data).schema,4);
 const restored=mockStore();
 Core.restoreBackup(restored,data);
 assert.deepEqual(restored.asObject(),initial.asObject());
});
test('Import never deletes omitted or null records',()=>{
 const store=mockStore({[PROGRESS]:'old-progress',[NOTES]:'Important notes',[PROFILE]:'old-profile'});
 const partial=JSON.stringify({app:'law-learning',schema:2,created:'2026-03-01T00:00:00.000Z',
  records:{[PROGRESS]:JSON.stringify(progress),[NOTES]:null}});
 Core.restoreBackup(store,partial);
 assert.equal(store.getItem(NOTES),'Important notes');
 assert.equal(store.getItem(PROFILE),'old-profile');
});
test('Malformed and oversized backups fail before storage writes',()=>{
 const tests=[
 JSON.stringify({app:'law-learning',schema:999,records:v1.records}),
 JSON.stringify({app:'law-learning',schema:2,records:{[PROGRESS]:'{"learned":"all"}'}}),
 JSON.stringify({app:'law-learning',schema:2,records:{[PROGRESS]:'{"score":-1}'}}),
 JSON.stringify({app:'law-learning',schema:2,records:{[PROGRESS]:'{"learned":[3,3.5]}'}}),
 JSON.stringify({app:'law-learning',schema:2,records:{'__proto__':'injection'}}),
 JSON.stringify({app:'law-learning',schema:2,records:{[PROFILE]:'{"language":"unknown"}'}}),
 JSON.stringify({app:'law-learning',schema:2,records:{[NOTES]:'x'.repeat(700001)}}),
 'x'.repeat(1048577)
 ];
 for(const value of tests)assert.throws(()=>Core.parseBackup(value));
});
test('Writes rollback on a partial restore failure',()=>{
 const before={[PROGRESS]:JSON.stringify({score:3}),[NOTES]:'My notes'};
 const store=mockStore(before,2);
 const newBackup={app:'law-learning',schema:2,records:{
   [PROGRESS]:JSON.stringify(progress),[NOTES]:'Overwrite would be harmful'}};
 assert.throws(()=>Core.restoreBackup(store,JSON.stringify(newBackup)),/Previous data restored/);
 assert.deepEqual(store.asObject(),before);
});
test('Import refuses empty datasets and future schemas',()=>{
 assert.throws(()=>Core.parseBackup(JSON.stringify({app:'law-learning',schema:2,records:{}})));
 assert.throws(()=>Core.parseBackup(JSON.stringify({app:'law-learning',schema:5,records:v1.records})));
});

test('Legacy schema-2 backups import without erasing new review dates',()=>{
 const store=mockStore({[REVIEW]:JSON.stringify({version:1,cards:{}}),[NOTES]:'Other notes'});
 const old={app:'law-learning',schema:2,records:{[PROGRESS]:JSON.stringify(progress)}};
 const parsed=Core.parseBackup(JSON.stringify(old));
 assert.equal(parsed.schema,4);assert.equal(parsed.migratedFrom,2);
 Core.restoreBackup(store,JSON.stringify(old));
 assert.equal(store.getItem(REVIEW),JSON.stringify({version:1,cards:{}}));
 assert.equal(store.getItem(NOTES),'Other notes');
});
test('Review schedule round-trip includes due date, stage and typed grading counts',()=>{
 const records={...v1.records};
 const store=mockStore(records),when=1781200000000;
 Review.recognize(store,'contract1-unit1:proposal',false,when);
 Review.recall(store,'contract1-unit2:capacity','good',when+600000);
 const body=Core.exportBackup(store,'2026-10-11T00:00:00.000Z');
 const parsed=Core.parseBackup(body),description=Core.describe(parsed);
 assert.equal(description.hasReview,true);assert.equal(description.reviewCards,2);
 const fresh=mockStore();Core.restoreBackup(fresh,body);
 assert.equal(fresh.getItem(REVIEW),store.getItem(REVIEW));
 assert.equal(JSON.parse(body).schema,4);
});
test('Tampered or corrupt review schedule is rejected before other records are written',()=>{
 const old=mockStore({[NOTES]:'preserve me'});
 const malformed=[
   '{"version":1,"cards":{"constructor":{"stage":2}}}',
   '{"version":2,"cards":{}}',
   '{"version":1,"cards":{"contract1-unit2:capacity":{"stage":999}}}'
 ];
 for(const value of malformed){
   const backup={app:'law-learning',schema:3,records:{[NOTES]:'new notes',[REVIEW]:value}};
   assert.throws(()=>Core.restoreBackup(old,JSON.stringify(backup)));
   assert.equal(old.getItem(NOTES),'preserve me');
 }
});
test('Review history is restored on a partial import failure',()=>{
 const when=1781200000000;
 const seed=mockStore({[NOTES]:'old'});
 Review.recognize(seed,'contract1-unit1:proposal',true,when);
 const original=seed.asObject(),prepared=mockStore();
 Review.recall(prepared,'contract1-unit2:capacity','good',when);
 const backup={app:'law-learning',schema:3,records:{
  [NOTES]:'new notes',[REVIEW]:prepared.getItem(REVIEW)
 }};
 const failing=mockStore(original,2);
 assert.throws(()=>Core.restoreBackup(failing,JSON.stringify(backup)),/Previous data restored/);
 assert.deepEqual(failing.asObject(),original);
});


test('Legacy schema-3 backup migrates to v4 without touching any existing case queue',()=>{
 const pending=mockStore();
 CaseReview.note(pending,'torts','u5-hitrun','self-identified gaps',['rule'],1781200000000);
 const original=pending.getItem(CASES);
 const fromV3={app:'law-learning',schema:3,records:{[NOTES]:'legacy note'}};
 const parsed=Core.parseBackup(JSON.stringify(fromV3));
 assert.equal(parsed.schema,4);assert.equal(parsed.migratedFrom,3);
 Core.restoreBackup(pending,JSON.stringify(fromV3));
 assert.equal(pending.getItem(CASES),original,'Omitted v4 key must not delete old review queue');
});
test('Version 4 backup securely exports and restores weak-case IDs without written answers',()=>{
 const db=mockStore({...v1.records}),time=1781200000000;
 CaseReview.note(db,'torts','u5-hitrun','self-identified gaps',['application','conclusion'],time);
 CaseReview.note(db,'hindu','u2-sapinda-marriage','skipped',[],time);
 const body=Core.exportBackup(db,'2026-10-11T12:00:00.000Z');
 const item=Core.describe(body);
 assert.equal(item.hasCaseReview,true);assert.equal(item.caseReviewCount,2);
 assert.equal(JSON.parse(body).schema,4);
 assert.ok(!body.includes('secret private legal answer'));
 const restored=mockStore();Core.restoreBackup(restored,body);
 assert.equal(restored.getItem(CASES),db.getItem(CASES));
 assert.equal(CaseReview.total(restored),2);
});
test('Invalid case-review records are rejected before any backup restore writes',()=>{
 const store=mockStore({[NOTES]:'protected notes'});
 const invalid=[
  '{"version":2,"cases":{}}',
  '{"version":1,"cases":{"unknown:u1-test":{}}}',
  '{"version":1,"cases":{"torts:u5-hitrun":{"status":"skipped","missing":["rule"],"attempts":1,"updatedAt":1781200000000,"nextAt":1781200000000}}}'
 ];
 invalid.forEach(raw=>{
  const body={app:'law-learning',schema:4,records:{[NOTES]:'overwrite',[CASES]:raw}};
  assert.throws(()=>Core.restoreBackup(store,JSON.stringify(body)));
  assert.equal(store.getItem(NOTES),'protected notes');
 });
});

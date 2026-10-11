import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const Core=require('../backup-core.js');

const PROGRESS='law-learning-progress-v2',NOTES='law-learning-notes-v1',PROFILE='law-learning-profile-v1';
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
 assert.equal(b.schema,2);
 assert.equal(b.migratedFrom,1);
 const store=mockStore();
 Core.restoreBackup(store,JSON.stringify(v1));
 assert.deepEqual(JSON.parse(store.getItem(PROGRESS)),progress);
 assert.equal(store.getItem(NOTES),v1.records[NOTES]);
 assert.equal(Core.describe(b).learned,3);
});
test('v2 round-trip exports notes profile and scores unchanged',()=>{
 const initial=mockStore(v1.records);
 const data=Core.exportBackup(initial,'2026-01-02T00:00:00.000Z');
 assert.equal(JSON.parse(data).schema,2);
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
 assert.throws(()=>Core.parseBackup(JSON.stringify({app:'law-learning',schema:3,records:v1.records})));
});

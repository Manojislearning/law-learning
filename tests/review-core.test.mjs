import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url), R=require('../review-core.js');
const MIN=60000,DAY=86400000,START=1781236800000;
function memory(initial={},failure=false){let m=new Map(Object.entries(initial));return {getItem:k=>m.has(k)?m.get(k):null,setItem(k,v){if(failure)throw Error('storage blocked');m.set(k,v);},removeItem:k=>m.delete(k),snapshot:()=>Object.fromEntries(m)};}
const card="contract1-unit2:capacity",other="contract1-unit1:proposal";
test('Only stable non-user-controlled content identifiers can enter scheduling',()=>{
 assert.equal(R.validId(card),true);
 for(const id of ['__proto__','constructor','contract1-unit8:capacity','contract1-unit2:../../evil','contract1-unit2:','contract1-unit2:bad space'])
  assert.equal(R.validId(id),false,id);
 assert.throws(()=>R.recall(memory(),'__proto__','good',START));
});
test('Guided recognition creates a first review but never grants a recall stage',()=>{
 const store=memory();
 let row=R.recognize(store,card,true,START);
 assert.equal(row.stage,0);assert.equal(row.due,START+DAY);
 row=R.recognize(store,card,true,START+MIN);
 assert.equal(row.stage,0);assert.equal(row.due,START+DAY);
 assert.equal(row.recognitions,2);
 row=R.recognize(store,card,false,START+2*DAY);
 assert.equal(row.due,START+2*DAY+10*MIN,'An overdue failed card must schedule in the future');
 assert.equal(row.misses,1);
});
test('Self-rated retrieval progresses at 1,3,7,14,30,60 days, capped',()=>{
 const store=memory();
 const intervals=[1,3,7,14,30,60,60];
 let when=START;
 intervals.forEach((n,i)=>{
  const row=R.recall(store,card,'good',when);
  assert.equal(row.stage,Math.min(i+1,6));
  assert.equal(row.due,when+n*DAY);
  when=row.due;
 });
 const row=R.read(store).cards[card];
 assert.equal(row.recalls,intervals.length);
 assert.equal(row.recognitions,0);
});
test('Again resets recall stage and returns in 10 minutes, then Good recovers at one day',()=>{
 const store=memory();
 R.recall(store,card,'good',START);
 let row=R.recall(store,card,'again',START+DAY);
 assert.equal(row.stage,0);assert.equal(row.due,START+DAY+10*MIN);
 assert.equal(row.misses,1);
 row=R.recall(store,card,'good',START+DAY+10*MIN);
 assert.equal(row.stage,1);assert.equal(row.due,START+2*DAY+10*MIN);
});
test('Failed writes and malformed persisted data never delete history',()=>{
 const old=memory();
 R.recall(old,card,'good',START);
 const payload=old.getItem(R.KEY);
 const blocked=memory({[R.KEY]:payload},true);
 assert.throws(()=>R.recall(blocked,card,'good',START+DAY),/storage blocked/);
 assert.equal(blocked.getItem(R.KEY),payload);
 const corrupt=memory({[R.KEY]:'{"version":1,"cards":{"__proto__":{"stage":1}}}'});
 assert.throws(()=>R.read(corrupt));
 assert.equal(corrupt.getItem(R.KEY).includes('__proto__'),true);
});
test('Invalid future schemas and inconsistent counts are rejected',()=>{
 const raw={version:1,cards:{[card]:{stage:1,due:START,seen:2,recognitions:2,recalls:2,misses:0,lastAt:START,lastKind:'recall'}}};
 assert.throws(()=>R.parse(JSON.stringify(raw)),/Inconsistent/);
 assert.throws(()=>R.parse(JSON.stringify({version:2,cards:{}})),/Unsupported/);
 assert.throws(()=>R.parse('x'.repeat(700001)),/large/);
});
test('Review lists distinguish unseen, due, future and persist across reloads',()=>{
 const store=memory();
 const items=[{id:card,unit:2},{id:other,unit:1}];
 let list=R.summary(store,items,START);
 assert.equal(list.newCards.length,2);assert.equal(list.due.length,0);
 R.recognize(store,card,true,START);
 list=R.summary(store,items,START+DAY-MIN);
 assert.equal(list.due.length,0);assert.equal(list.upcoming.length,1);
 list=R.summary(store,items,START+DAY);
 assert.equal(list.due.length,1);assert.equal(list.due[0].id,card);
 assert.equal(list.studied,1);
});

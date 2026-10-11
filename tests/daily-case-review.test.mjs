import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
const require=createRequire(import.meta.url), Review=require('../case-review-core.js');
const root=resolve(import.meta.dirname,'..');
const banks={
 contract:require('../case-practice-data.js'),
 torts:require('../torts-case-practice-data.js'),
 bns:require('../bns-case-practice-data.js'),
 constitution:require('../constitution-case-practice-data.js'),
 hindu:require('../hindu-case-practice-data.js')
};
const T=1781200000000,DAY=86400000;
function store(){const m=new Map();return {getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,v),snapshot:()=>Object.fromEntries(m)};}
function insert(s,subject,index,status='skipped',when=T-DAY){
 const c=banks[subject].cases[index];
 Review.note(s,subject,c.id,status,status==='self-identified gaps'?['rule','application']:[],when);
 return c.id;
}
test('Daily summary returns zero due cases on new learner profile without introducing new data keys',()=>{
 const s=store(),summary=Review.dailyPlan(s,banks,T);
 assert.equal(summary.total,0);assert.equal(summary.due,0);assert.equal(summary.upcoming,0);
 assert.deepEqual(summary.queue,[]);
 assert.equal(s.getItem(Review.KEY),null);
});
test('Daily queue includes only due, known saved case IDs; future cases remain scheduled',()=>{
 const s=store();
 const a=insert(s,'contract',0),b=insert(s,'torts',1);
 const future=insert(s,'bns',2,'self-identified gaps',T);
 const snapshot=s.getItem(Review.KEY);
 const result=Review.dailyPlan(s,banks,T,5);
 assert.equal(result.due,2);assert.equal(result.upcoming,1);assert.equal(result.nextAt,T+DAY);
 assert.deepEqual(new Set(result.queue.map(x=>x.subject+':'+x.id)),new Set(['contract:'+a,'torts:'+b]));
 assert.equal(result.bySubject.bns,0);
 assert.ok(!result.queue.some(x=>x.id===future));
 assert.equal(s.getItem(Review.KEY),snapshot,'Reading a daily plan must never mutate the backup');
});
test('Balanced five-item batch contains one item per subject when all have overdue cases',()=>{
 const s=store();
 const subjects=['contract','torts','bns','constitution','hindu'];
 for(const subject of subjects)for(let i=0;i<3;i++)insert(s,subject,i,'skipped',T-DAY*(4-i));
 const result=Review.dailyPlan(s,banks,T,5);
 assert.equal(result.due,15);
 assert.equal(result.queue.length,5);
 assert.deepEqual(new Set(result.queue.map(x=>x.subject)),new Set(subjects));
 assert.ok(result.queue.every(x=>x.nextAt<=T));
 const long=Review.dailyPlan(s,banks,T,10);
 assert.equal(long.queue.length,10);
 assert.equal(new Set(long.queue.slice(0,5).map(x=>x.subject)).size,5);
 assert.equal(new Set(long.queue.slice(5,10).map(x=>x.subject)).size,5);
});
test('Repeated old due items are selected oldest-first within each subject',()=>{
 const s=store();
 const first=insert(s,'torts',0,'skipped',T-5*DAY);
 insert(s,'torts',1,'skipped',T-2*DAY);
 const queue=Review.dailyPlan(s,banks,T,2).queue;
 assert.equal(queue[0].id,first);
 assert.ok(queue[0].nextAt<queue[1].nextAt);
});
test('Completing one due case retains unrelated subject history and clears only the matching case',()=>{
 const s=store(),a=insert(s,'torts',0),b=insert(s,'bns',0);
 assert.equal(Review.dailyPlan(s,banks,T).due,2);
 Review.clear(s,'torts',a);
 const plan=Review.dailyPlan(s,banks,T);
 assert.equal(plan.total,1);assert.equal(plan.due,1);
 assert.equal(plan.queue[0].subject,'bns');assert.equal(plan.queue[0].id,b);
});
test('Bad records, illegal sizes and unknown subjects are not silently normalised',()=>{
 const s=store();insert(s,'torts',0);
 assert.throws(()=>Review.dailyPlan(s,banks,T,0),/Invalid daily/);
 assert.throws(()=>Review.dailyPlan(s,banks,T,26),/Invalid daily/);
 assert.throws(()=>Review.dailyPlan(s,{torts:banks.torts},T),/Missing daily/);
 const bad=store();bad.setItem(Review.KEY,'{"version":999,"cases":{}}');
 assert.throws(()=>Review.dailyPlan(bad,banks,T),/Unsupported/);
 assert.equal(bad.getItem(Review.KEY),'{"version":999,"cases":{}}');
});
test('Daily queue's user-visible scripts preserve original ID references and backup schema',()=>{
 const html=readFileSync(resolve(root,'index.html'),'utf8');
 const sw=readFileSync(resolve(root,'sw.js'),'utf8');
 const ui=readFileSync(resolve(root,'case-practice-view.js'),'utf8');
 for(const asset of ['case-review-core.js?v=55','case-practice-view.js?v=55']){
  assert.ok(html.includes(asset));assert.ok(sw.includes(asset));
 }
 assert.ok(ui.includes('caseReview.dailyPlan(root.localStorage,banks)'));
 assert.ok(ui.includes('function startDaily()'));
 assert.ok(ui.includes('mode==="daily"'));
 assert.ok(!ui.includes('localStorage.setItem'));
 assert.ok(readFileSync(resolve(root,'backup-core.js'),'utf8').includes('VERSION = 4'));
});

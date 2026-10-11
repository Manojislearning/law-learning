/* Version 53: minimal, local and portable case re-practice records.
 * No essays, case facts, grades, words, or personal details are stored.
 * A due date means "worth revisiting", never mastery or exam readiness.
 */
(function(root,factory){
 var api=factory();
 if(typeof module==="object"&&module.exports)module.exports=api;
 if(root)root.LawCaseReviewCore=api;
})(typeof globalThis==="object"?globalThis:this,function(){
"use strict";
var KEY="law-learning-case-review-v1",VERSION=1,DAY=86400000,MAX=200;
var SUBJECTS=["contract","torts","bns","constitution","hindu"];
var CRITERIA=["issue","rule","application","conclusion"];
var STATUSES=["skipped","not self-assessed","self-identified gaps"];
function fail(message){throw Error(message);}
function plain(o){return o!==null&&typeof o==="object"&&!Array.isArray(o)&&(Object.getPrototypeOf(o)===Object.prototype||Object.getPrototypeOf(o)===null);}
function key(subject,id){
 if(!SUBJECTS.includes(subject)||typeof id!=="string"||!/^u[1-5]-[a-z0-9-]{2,64}$/.test(id))fail("Invalid case identity.");
 return subject+":"+id;
}
function timestamp(t){
 var n=t===undefined?Date.now():t;
 if(!Number.isSafeInteger(n)||n<0||n>8640000000000000-DAY)fail("Invalid review time.");
 return n;
}
function validateRecord(r){
 if(!plain(r))fail("Invalid saved case record.");
 var allowed=["status","missing","attempts","updatedAt","nextAt"];
 if(Object.keys(r).some(function(k){return !allowed.includes(k);}))fail("Unknown case record field.");
 if(!STATUSES.includes(r.status)||!Array.isArray(r.missing)||r.missing.length>4)fail("Invalid case self-check.");
 if(new Set(r.missing).size!==r.missing.length||r.missing.some(function(m){return !CRITERIA.includes(m);}))fail("Invalid IRAC elements.");
 if(r.status==="self-identified gaps"&&!r.missing.length)fail("Missing self-check details.");
 if(r.status!=="self-identified gaps"&&r.missing.length)fail("Unexpected missing IRAC details.");
 if(!Number.isSafeInteger(r.attempts)||r.attempts<1||r.attempts>100000)fail("Invalid case attempts.");
 if(!Number.isSafeInteger(r.updatedAt)||r.updatedAt<0||r.updatedAt>8640000000000000-DAY||
    !Number.isSafeInteger(r.nextAt)||r.nextAt<0||r.nextAt>8640000000000000)fail("Invalid case review dates.");
 if(r.nextAt<r.updatedAt)fail("Case review date precedes attempt.");
 return r;
}
function validate(x){
 if(!plain(x)||x.version!==VERSION||!plain(x.cases))fail("Unsupported case-review format.");
 var names=Object.keys(x.cases);
 if(names.length>MAX)fail("Too many case-review records.");
 names.forEach(function(name){
  var parts=/^(contract|torts|bns|constitution|hindu):(u[1-5]-[a-z0-9-]{2,64})$/.exec(name);
  if(!parts)fail("Invalid saved case ID.");
  validateRecord(x.cases[name]);
 });
 return x;
}
function empty(){return {version:VERSION,cases:Object.create(null)};}
function parse(text){
 if(typeof text!=="string"||text.length>60000)fail("Case-review data exceeds limit.");
 var x;try{x=JSON.parse(text);}catch(e){fail("Saved case review is not valid JSON.");}
 return validate(x);
}
function read(storage){
 var raw=storage.getItem(KEY);
 return raw===null?empty():parse(raw); /* Never erase or overwrite malformed data. */
}
function write(storage,state){
 validate(state);
 var body=JSON.stringify(state);
 if(body.length>60000)fail("Case-review data exceeds limit.");
 storage.setItem(KEY,body);return state;
}
function copy(state){return parse(JSON.stringify(state));}
function note(storage,subject,id,status,missing,when){
 var idKey=key(subject,id),now=timestamp(when);
 if(!STATUSES.includes(status))fail("Unknown case status.");
 if(!Array.isArray(missing))fail("Invalid missing IRAC elements.");
 var state=copy(read(storage)),old=state.cases[idKey];
 var record={
  status:status,
  missing:missing.slice(),
  attempts:old?old.attempts+1:1,
  updatedAt:now,
  nextAt:status==="self-identified gaps"?now+DAY:now
 };
 validateRecord(record);
 state.cases[idKey]=record;
 write(storage,state);return record;
}
function clear(storage,subject,id){
 var idKey=key(subject,id),state=copy(read(storage));
 if(!Object.prototype.hasOwnProperty.call(state.cases,idKey))return false;
 delete state.cases[idKey];write(storage,state);return true;
}
function forSubject(storage,subject,cases,when){
 if(!SUBJECTS.includes(subject)||!Array.isArray(cases))fail("Unknown practice course.");
 var now=timestamp(when),state=read(storage),rows=[],valid=new Set();
 cases.forEach(function(c){valid.add(key(subject,c.id));});
 Object.keys(state.cases).forEach(function(name){
  if(!valid.has(name))return;
  var r=state.cases[name],id=name.slice(subject.length+1);
  rows.push({id:id,status:r.status,missing:r.missing.slice(),nextAt:r.nextAt,attempts:r.attempts});
 });
 rows.sort(function(a,b){return a.nextAt-b.nextAt||a.id.localeCompare(b.id);});
 return {all:rows,due:rows.filter(function(r){return r.nextAt<=now;}),later:rows.filter(function(r){return r.nextAt>now;})};
}
/* Cross-subject daily queue. Does not mutate history or invent mastery.
 * Uses only saved stable IDs and timestamps, not private answer text.
 * Round-robin selection prevents a single subject dominating short sessions.
 */
function dailyPlan(storage,banks,when,limit){
 var now=timestamp(when),max=limit===undefined?5:limit;
 if(!Number.isInteger(max)||max<1||max>25||!banks||typeof banks!=="object")fail("Invalid daily review plan.");
 var all=read(storage),groups={},dueTotal=0,upcoming=0,nextAt=null,bySubject={};
 SUBJECTS.forEach(function(subject){
  var bank=banks[subject];
  if(!bank||!Array.isArray(bank.cases))fail("Missing daily review subject.");
  var valid=new Set();
  bank.cases.forEach(function(item){
   key(subject,item.id);
   if(valid.has(item.id))fail("Duplicate daily review case.");
   valid.add(item.id);
  });
  var list=[];
  Object.keys(all.cases).forEach(function(full){
   if(!full.startsWith(subject+":"))return;
   var id=full.slice(subject.length+1),record=all.cases[full];
   if(!valid.has(id))return; // Older / removed case never leaks into the visible queue.
   if(record.nextAt<=now)list.push({subject:subject,id:id,nextAt:record.nextAt,status:record.status,attempts:record.attempts});
   else{upcoming++;if(nextAt===null||record.nextAt<nextAt)nextAt=record.nextAt;}
  });
  list.sort(function(a,b){return a.nextAt-b.nextAt||a.attempts-b.attempts||a.id.localeCompare(b.id);});
  groups[subject]=list;bySubject[subject]=list.length;dueTotal+=list.length;
 });
 var queue=[];
 while(queue.length<max){
  var candidates=SUBJECTS.filter(function(s){return groups[s].length>0;});
  if(!candidates.length)break;
  // Oldest due subject starts each round; take at most one per subject per round.
  candidates.sort(function(a,b){return groups[a][0].nextAt-groups[b][0].nextAt||SUBJECTS.indexOf(a)-SUBJECTS.indexOf(b);});
  for(var subject of candidates){
   if(queue.length>=max)break;
   queue.push(groups[subject].shift());
  }
 }
 return {due:dueTotal,upcoming:upcoming,nextAt:nextAt,bySubject:bySubject,queue:queue,total:Object.keys(all.cases).length};
}
function total(storage){return Object.keys(read(storage).cases).length;}
return {KEY:KEY,VERSION:VERSION,CRITERIA:CRITERIA.slice(),SUBJECTS:SUBJECTS.slice(),
 key:key,parse:parse,read:read,write:write,note:note,clear:clear,forSubject:forSubject,total:total,dailyPlan:dailyPlan};
});

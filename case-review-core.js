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
function total(storage){return Object.keys(read(storage).cases).length;}
return {KEY:KEY,VERSION:VERSION,CRITERIA:CRITERIA.slice(),SUBJECTS:SUBJECTS.slice(),
 key:key,parse:parse,read:read,write:write,note:note,clear:clear,forSubject:forSubject,total:total};
});

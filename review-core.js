/* Law Learning v41 — portable, deterministic review scheduler.
 * Recognition from multiple-choice starts/restarts a review schedule but does not earn recall stages.
 * Genuine recall is SELF-RATED after composing/speaking an answer before seeing feedback.
 * Scheduling is simple (not Anki FSRS), no claims of exam mastery.
 */
(function(root,factory){
 var api=factory();
 if(typeof module==="object"&&module.exports)module.exports=api;
 if(root)root.LawReviewCore=api;
})(typeof globalThis==="object"?globalThis:this,function(){
"use strict";
var KEY="law-learning-review-v1",VERSION=1,DAY=86400000,MINUTE=60000;
var INTERVALS=[DAY,3*DAY,7*DAY,14*DAY,30*DAY,60*DAY];
function validId(id){return typeof id==="string" && /^contract1-unit[1-5]:[a-z0-9-]{1,64}$/.test(id);}
function object(x){return x!==null&&typeof x==="object"&&!Array.isArray(x)&&(Object.getPrototypeOf(x)===Object.prototype||Object.getPrototypeOf(x)===null);}
function integer(n,low,high){return Number.isSafeInteger(n)&&n>=low&&n<=high;}
function checkRecord(rec){
 if(!object(rec))throw Error("Invalid review record.");
 var allowed=["stage","due","seen","recognitions","recalls","misses","lastAt","lastKind"];
 for(var key of Object.keys(rec))if(!allowed.includes(key))throw Error("Unrecognised review attribute.");
 if(!integer(rec.stage,0,6)||!integer(rec.due,0,8640000000000000)||
    !integer(rec.seen,0,100000)||!integer(rec.recognitions,0,100000)||
    !integer(rec.recalls,0,100000)||!integer(rec.misses,0,100000)||
    !integer(rec.lastAt,0,8640000000000000)||
    !["recognition","recall"].includes(rec.lastKind))throw Error("Invalid review attempt or schedule.");
 if(rec.recognitions+rec.recalls!==rec.seen)throw Error("Inconsistent review attempts.");
 if(rec.misses>rec.seen)throw Error("Invalid missed count.");
 return rec;
}
function checkState(x){
 if(!object(x)||x.version!==1||!object(x.cards))throw Error("Unsupported review data format.");
 var keys=Object.keys(x.cards);
 if(keys.length>2000)throw Error("Too many review records.");
 keys.forEach(function(id){if(!validId(id))throw Error("Unrecognised review card ID.");checkRecord(x.cards[id]);});
 return x;
}
function parse(text){
 if(typeof text!=="string"||text.length>700000)throw Error("Review data is too large.");
 var x;try{x=JSON.parse(text);}catch(err){throw Error("Review data is not valid JSON.");}
 return checkState(x);
}
function empty(){return {version:VERSION,cards:Object.create(null)};}
function read(storage){
 var raw=storage.getItem(KEY);
 if(raw===null)return empty();
 return parse(raw); /* Do not silently overwrite corrupt stored data. */
}
function save(storage,state){
 checkState(state);
 var body=JSON.stringify(state);
 if(body.length>700000)throw Error("Review data exceeds safe backup size.");
 storage.setItem(KEY,body);return state;
}
function copy(state){return parse(JSON.stringify(state));}
function fresh(now){return {stage:0,due:now+DAY,seen:0,recognitions:0,recalls:0,misses:0,lastAt:now,lastKind:"recognition"};}
function time(value){var n=value===undefined?Date.now():value;if(!integer(n,0,8640000000000000-60*DAY))throw Error("Invalid timestamp.");return n;}
function recognize(storage,id,correct,when){
 if(!validId(id)||typeof correct!=="boolean")throw Error("Invalid recognition attempt.");
 var now=time(when),state=copy(read(storage)),before=state.cards[id],row=before?Object.assign({},before):fresh(now);
 row.seen++;row.recognitions++;if(!correct)row.misses++;
 row.lastAt=now;row.lastKind="recognition";
 // Once a recall stage is earned, a recognition-only success cannot advance it.
 // Recognition failures flag a short retry without silently erasing the recall record.
 if(!correct){row.due=now+10*MINUTE;}
 else if(!before)row.due=now+DAY;
 state.cards[id]=row;save(storage,state);return row;
}
function recall(storage,id,grade,when){
 if(!validId(id)||!["again","good"].includes(grade))throw Error("Invalid self-rating.");
 var now=time(when),state=copy(read(storage)),row=state.cards[id]?Object.assign({},state.cards[id]):fresh(now);
 row.seen++;row.recalls++;row.lastAt=now;row.lastKind="recall";
 if(grade==="again"){row.stage=0;row.misses++;row.due=now+10*MINUTE;}
 else{row.stage=Math.min(row.stage+1,6);row.due=now+INTERVALS[row.stage-1];}
 state.cards[id]=row;save(storage,state);return row;
}
function catalog(units){
 if(!Array.isArray(units)||units.length!==5)throw Error("Exactly five Contract–I units are required.");
 var list=[],ids=new Set();
 units.forEach(function(unit,index){
  if(!unit||!Array.isArray(unit.lessons))throw Error("Missing Contract–I unit.");
  unit.lessons.forEach(function(lesson){
   var id="contract1-unit"+(index+1)+":"+lesson.id;
   if(!validId(id)||ids.has(id))throw Error("Duplicate or malformed review item.");
   ids.add(id);
   list.push({id:id,unit:index+1,title:lesson.title,question:lesson.prompt,
     answer:lesson.choices[lesson.answer],why:lesson.why,rule:lesson.focus,
     section:lesson.section,exam:lesson.exam});
  });
 });
 return list;
}
function summary(storage,items,when){
 var now=time(when),state=read(storage),due=[],newCards=[],upcoming=[];
 items.forEach(function(item){
  var r=state.cards[item.id];
  if(!r)newCards.push(item);
  else if(r.due<=now)due.push(item);
  else upcoming.push(item);
 });
 // Previously mistaken and overdue cards first; stable by unit and item after due timestamp.
 due.sort(function(a,b){
  var x=state.cards[a.id],y=state.cards[b.id];
  return (x.stage-y.stage)||(x.due-y.due)||(a.unit-b.unit);
 });
 upcoming.sort(function(a,b){return state.cards[a.id].due-state.cards[b.id].due;});
 return {due:due,newCards:newCards,upcoming:upcoming,
   nextDue:upcoming.length?state.cards[upcoming[0].id].due:null,
   studied:items.length-newCards.length,total:items.length};
}
return {KEY:KEY,VERSION:VERSION,DAY:DAY,validId:validId,checkState:checkState,
 parse:parse,read:read,save:save,recognize:recognize,recall:recall,
 catalog:catalog,summary:summary};
});

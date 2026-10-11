/* Standalone testable practice bank and interleaving.
 * Zero persistence: original answers and rubric checks remain in the current page session.
 */
(function(root,factory){
 var api=factory();if(typeof module==="object"&&module.exports)module.exports=api;
 if(root)root.LawCaseCore=api;
})(typeof globalThis==="object"?globalThis:this,function(){
"use strict";
var KEYS=["issue","rule","application","conclusion"];
function validText(s,min){return typeof s==="string"&&s.trim().length>=min&&s.length<=2400;}
function verify(bank){
 if(!bank||bank.schema!==1||!bank.sources||!Array.isArray(bank.cases)||!["contract1","torts","bns","constitution"].includes(bank.subject||"contract1"))throw Error("Unknown practice bank.");
 if(!Array.isArray(bank.cases)||bank.cases.length!==15)throw Error("Practice bank requires fifteen cases.");
 var seen=new Set(),units=[0,0,0,0,0];
 for(var item of bank.cases){
  if(!item||typeof item.id!=="string"||!/^u[1-5]-[a-z0-9-]+$/.test(item.id)||seen.has(item.id))throw Error("Invalid or repeated case identifier.");
  seen.add(item.id);
  if(!Number.isInteger(item.unit)||item.unit<1||item.unit>5)throw Error("Invalid case unit.");
  units[item.unit-1]++;
  if(!validText(item.facts,65)||!validText(item.task,32)||!validText(item.trap,30))throw Error("Incomplete case problem.");
  if(!item.outline||KEYS.some(function(k){return !validText(item.outline[k],40);}))throw Error("Incomplete marking outline.");
  if(!Array.isArray(item.sections)||!item.sections.length||!Array.isArray(item.sourceIds)||!item.sourceIds.length)throw Error("Statute sources missing.");
  item.sourceIds.forEach(function(id){
   var src=bank.sources[id];
   if(!src||!validText(src.title,8)||typeof src.url!=="string")throw Error("Missing primary law source.");
   var url;try{url=new URL(src.url);}catch(e){throw Error("Missing primary law source.");}
   if(url.protocol!=="https:"||!["www.indiacode.nic.in","api.sci.gov.in","www.pib.gov.in","egazette.gov.in","consumeraffairs.gov.in","kslu.karnataka.gov.in","www.mha.gov.in","lddashboard.legislative.gov.in"].includes(url.hostname))throw Error("Missing primary law source.");
  });
 }
 if(units.some(function(n){return n!==3;}))throw Error("Every course unit must have three cases.");
 return true;
}
function randomIndex(length,rng){
 var n=rng();
 if(typeof n!=="number"||!Number.isFinite(n)||n<0||n>=1)throw Error("Invalid random selection.");
 return Math.floor(n*length);
}
function select(bank,history,rng){
 verify(bank);
 var used=history||new Map(),draw=rng||Math.random;
 if(!(used instanceof Map))throw Error("Invalid session history.");
 var picked=[];
 for(var unit=1;unit<=5;unit++){
  var choices=bank.cases.filter(function(item){return item.unit===unit;});
  var least=Math.min.apply(null,choices.map(function(item){
   var n=used.get(item.id)||0;
   if(!Number.isSafeInteger(n)||n<0)throw Error("Invalid practice history.");
   return n;
  }));
  var available=choices.filter(function(item){return (used.get(item.id)||0)===least;});
  picked.push(available[randomIndex(available.length,draw)]);
 }
 // Independent shuffle of units: no fixed-order clue about subject section.
 for(var i=picked.length-1;i>0;i--){
  var j=randomIndex(i+1,draw),a=picked[i];picked[i]=picked[j];picked[j]=a;
 }
 return picked;
}
function recordUsage(history,chosen){
 if(!(history instanceof Map)||!Array.isArray(chosen))throw Error("Invalid practice history.");
 chosen.forEach(function(item){
  var current=history.get(item.id)||0;
  if(!Number.isSafeInteger(current)||current>1000000)throw Error("Invalid practice count.");
  history.set(item.id,current+1);
 });
 return history;
}

/* Provide element-specific, case-grounded study feedback after the student self-checks.
 * Never infer whether an essay is right from characters or checkbox selection.
 */
function missingGuidance(item,checked){
 if(!item||!item.outline||!Array.isArray(checked)||checked.length!==4||checked.some(function(v){return typeof v!=="boolean";}))
  throw Error("Invalid IRAC self-check.");
 var advice={
  issue:"Issue — Frame the legal question: "+item.outline.issue,
  rule:"Rule — Name the governing provision: "+item.outline.rule,
  application:"Application — Work through the supporting facts and possible limits: "+item.outline.application,
  conclusion:"Conclusion — Give a qualified result grounded in your analysis: "+item.outline.conclusion
 };
 return KEYS.filter(function(k,i){return !checked[i];}).map(function(k){return {key:k,message:advice[k]};});
}
return {criteria:KEYS.slice(),verify:verify,select:select,recordUsage:recordUsage,missingGuidance:missingGuidance};
});

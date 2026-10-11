/* Changed-fact transfer checker for original Contract, Torts and BNS practice.
 * Keeps study results in the current page session. No guess-based legal scoring.
 */
(function(root,factory){
 var api=factory();
 if(typeof module==="object"&&module.exports)module.exports=api;
 if(root)root.LawTransferCore=api;
})(typeof globalThis==="object"?globalThis:this,function(){
"use strict";
var keys=["contract","torts","bns","constitution","hindu"];
function verify(data,banks){
 if(!data||data.schema!==1||!Array.isArray(data.items)||data.items.length!==25||!banks)throw Error("Invalid changed-facts bank.");
 var ids=new Set(),counts={contract:0,torts:0,bns:0,constitution:0,hindu:0},unitSets={contract:new Set(),torts:new Set(),bns:new Set(),constitution:new Set(),hindu:new Set()};
 for(var entry of data.items){
  if(!entry||typeof entry.id!=="string"||ids.has(entry.id)||!keys.includes(entry.subject))throw Error("Duplicate or unknown challenge.");
  ids.add(entry.id);counts[entry.subject]++;
  var bank=banks[entry.subject];
  if(!bank||!Array.isArray(bank.cases))throw Error("Missing original law problems.");
  var parent=bank.cases.find(function(c){return c.id===entry.parentId;});
  if(!parent||entry.id!==entry.subject+"-"+entry.parentId||unitSets[entry.subject].has(parent.unit))throw Error("Missing case mapping or repeated unit.");
  unitSets[entry.subject].add(parent.unit);
  for(var k of ["title","changedFacts","question","rule","application","trap"]){
   var value=entry[k];
   if(typeof value!=="string"||value.length<(k==="title"?14:k==="question"?30:75)||value.length>2400)throw Error("Incomplete "+k+" for "+entry.id);
  }
  if(!parent.sourceIds||!parent.sourceIds.length||!bank.sources)throw Error("Original case must have primary sources.");
  parent.sourceIds.forEach(function(id){if(!bank.sources[id]||!bank.sources[id].url)throw Error("Missing referenced legal authority.");});
 }
 for(var course of keys){
  if(counts[course]!==5||unitSets[course].size!==5)throw Error("Every subject requires one transfer case per unit.");
 }
 return true;
}
function select(data,banks,course,weakIds,rng){
 verify(data,banks);
 if(!keys.includes(course))throw Error("Unknown subject.");
 var options=data.items.filter(function(i){return i.subject===course;});
 var chosen=options;
 if(Array.isArray(weakIds)&&weakIds.length){
  var targetUnits=new Set();
  weakIds.forEach(function(id){
   var parent=banks[course].cases.find(function(c){return c.id===id;});
   if(parent)targetUnits.add(parent.unit);
  });
  chosen=options.filter(function(t){
   var item=banks[course].cases.find(function(c){return c.id===t.parentId;});
   return targetUnits.has(item.unit);
  });
 }
 var result=chosen.slice(),random=rng||Math.random;
 for(var j=result.length-1;j>0;j--){
  var n=random();
  if(typeof n!=="number"||!Number.isFinite(n)||n<0||n>=1)throw Error("Invalid shuffle.");
  var at=Math.floor(n*(j+1)),tmp=result[j];result[j]=result[at];result[at]=tmp;
 }
 return result;
}
return {verify:verify,select:select};
});

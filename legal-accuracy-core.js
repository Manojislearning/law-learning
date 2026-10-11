/* Pure validation for selected law accuracy cards. Keeps unsupported URLs or invalid answers from the UI. */
(function(root,factory){var api=factory();if(typeof module==="object"&&module.exports)module.exports=api;if(root)root.LawAccuracyCore=api;})(typeof globalThis==="object"?globalThis:this,function(){
"use strict";
function verify(d){
 if(!d||d.schema!==1||!Array.isArray(d.topics)||d.topics.length!==2||!d.sources||!Array.isArray(d.cards)||d.cards.length<12)throw Error("Invalid statutory revision bank.");
 var ids=new Set(),counts={bns:0,consumer:0};
 d.cards.forEach(function(c){
  if(!c||typeof c.id!=="string"||!(/^(bns|consumer)-[a-z-]+$/.test(c.id))||ids.has(c.id))throw Error("Invalid statutory card identifier.");
  ids.add(c.id);
  if(!Object.prototype.hasOwnProperty.call(counts,c.topic))throw Error("Unknown law topic.");
  counts[c.topic]++;
  ["title","section","rule","example","mistake","question","why"].forEach(function(k){var min=(k==="section"?7:k==="title"?14:27);if(typeof c[k]!=="string"||c[k].length<min)throw Error("Card "+c.id+" lacks "+k);});
  if(!Array.isArray(c.choices)||c.choices.length!==3||new Set(c.choices).size!==3)throw Error("Invalid correction choices.");
  if(!Number.isInteger(c.answer)||c.answer<0||c.answer>2)throw Error("Invalid correction answer.");
  if(!Array.isArray(c.refs)||!c.refs.length)throw Error("Missing primary references.");
  c.refs.forEach(function(r){
   var s=d.sources[r];if(!s)throw Error("Unknown source "+r);
   var u=new URL(s.url);
   var allowed=["www.indiacode.nic.in","www.mha.gov.in","cytrain.ncrb.gov.in","consumeraffairs.gov.in"];
   if(u.protocol!=="https:"||!allowed.includes(u.hostname))throw Error("Unofficial source domain.");
  });
 });
 if(counts.bns<6||counts.consumer<6)throw Error("Incomplete legal subject coverage.");
 return {total:d.cards.length,counts:counts};
}
function cardsFor(data,topic){
 if(topic!=="bns"&&topic!=="consumer")throw Error("Invalid subject.");
 return data.cards.filter(function(c){return c.topic===topic;});
}
return {verify:verify,cardsFor:cardsFor};
});

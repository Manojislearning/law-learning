/* Points and ranks v65 — one place that turns study activity into points and a title.
   Points stay in the existing progress record (law-learning-progress-v2 → score);
   this module only remembers which one-time awards were already given. */
(function(root){
"use strict";
var KEY="law-learning-points-v1";
var RANKS=[
 [0,"Law Fresher"],[100,"Junior Student"],[300,"Moot Court Member"],[700,"Legal Intern"],
 [1500,"Junior Advocate"],[3000,"Advocate"],[6000,"Senior Advocate"],[12000,"Judge"],[25000,"Chief Justice"]
];
function whole(n){return typeof n==="number"&&Number.isFinite(n)&&n>=0?Math.floor(n):0;}
function rankFor(points){
 points=whole(points);var i=0;
 while(i+1<RANKS.length&&points>=RANKS[i+1][0])i++;
 var next=RANKS[i+1]||null;
 return {level:i+1,title:RANKS[i][1],floor:RANKS[i][0],
  next:next?{title:next[1],at:next[0],need:next[0]-points}:null,
  progress:next?(points-RANKS[i][0])/(next[0]-RANKS[i][0]):1};
}
function readAwards(storage){
 try{var v=JSON.parse(storage.getItem(KEY)||"{}");return v&&typeof v.awards==="object"&&!Array.isArray(v.awards)?v.awards:{};}
 catch(e){return {};}
}
function writeAwards(storage,awards){
 var ids=Object.keys(awards);
 if(ids.length>4000){ids.slice(0,ids.length-4000).forEach(function(id){delete awards[id];});}
 try{storage.setItem(KEY,JSON.stringify({awards:awards}));return true;}catch(e){return false;}
}
/* Award `points` once for `id` (a stable string such as "case:contract:c3"). Returns the points given (0 if already given). */
function award(storage,state,id,points){
 points=whole(points);
 if(!state||!id||!points||points>100)return 0;
 var awards=readAwards(storage);
 if(awards[id])return 0;
 awards[id]=1;writeAwards(storage,awards);
 state.score=whole(state.score)+points;
 return points;
}
var api={KEY:KEY,RANKS:RANKS.map(function(r){return {at:r[0],title:r[1]};}),rankFor:rankFor,award:award,readAwards:readAwards};
if(typeof module!=="undefined"&&module.exports)module.exports=api;
root.LawPointsCore=api;

/* Browser helper: award, save, refresh the PTS pill and announce. */
root.LawPoints={
 award:function(id,points){
  if(typeof state==="undefined"||!root.localStorage)return 0;
  var given=award(root.localStorage,state,id,points);
  if(!given)return 0;
  try{root.LawAppCore&&root.LawAppCore.progress&&root.LawAppCore.progress.save(state);}catch(e){}
  try{if(typeof renderStats==="function")renderStats();}catch(e){}
  try{root.dispatchEvent(new root.CustomEvent("law-points",{detail:{id:id,points:given}}));}catch(e){}
  return given;
 },
 total:function(){return typeof state!=="undefined"?whole(state.score):0;},
 rank:function(){return rankFor(typeof state!=="undefined"?state.score:0);}
};
})(typeof window!=="undefined"?window:globalThis);

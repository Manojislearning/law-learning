/* Round picker v69 — every new round starts with a fresh mix.
   Unseen and least-recently-seen items come first; a few missed items return, but never ones shown
   in the last 20 minutes, so leaving a round half-way and starting again does not replay the same cards. */
(function(root){
"use strict";
var RECENT=20*60*1000;
function shuffle(a,rand){rand=rand||Math.random;for(var i=a.length-1;i>0;i--){var j=Math.floor(rand()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
/* opts: size, seen {id:ms}, missed {id:count}, maxMissed, now, rand, groupOf(item) for variety. */
function pick(items,idOf,opts){
 opts=opts||{};var rand=opts.rand||Math.random,now=opts.now||Date.now(),seen=opts.seen||{},missed=opts.missed||{};
 var size=Math.min(opts.size||10,items.length),maxMissed=opts.maxMissed==null?Math.floor(size/4):opts.maxMissed;
 var groupOf=opts.groupOf||function(x){return idOf(x);};
 function recent(x){var t=seen[idOf(x)];return typeof t==="number"&&now-t<RECENT;}
 var picked=[],used={};
 shuffle(items.filter(function(x){return missed[idOf(x)]&&!recent(x);}),rand).slice(0,maxMissed).forEach(function(x){picked.push(x);used[groupOf(x)]=1;});
 /* Order the rest: never seen first, then oldest seen; random jitter breaks ties. */
 var rest=items.filter(function(x){return picked.indexOf(x)<0;}).map(function(x){var t=seen[idOf(x)];return {x:x,k:(typeof t==="number"?t:0)+rand()*60000};})
  .sort(function(a,b){return a.k-b.k;}).map(function(o){return o.x;});
 rest.forEach(function(x){if(picked.length<size&&!used[groupOf(x)]){picked.push(x);used[groupOf(x)]=1;}});
 rest.forEach(function(x){if(picked.length<size&&picked.indexOf(x)<0)picked.push(x);});
 return shuffle(picked,rand);
}
/* Keep the seen map small: drop the oldest entries beyond `limit`. */
function trim(seen,limit){
 var ids=Object.keys(seen||{});if(ids.length<=limit)return seen;
 ids.sort(function(a,b){return seen[a]-seen[b];}).slice(0,ids.length-limit).forEach(function(id){delete seen[id];});
 return seen;
}
var api={pick:pick,trim:trim,shuffle:shuffle,RECENT:RECENT};
if(typeof module!=="undefined"&&module.exports)module.exports=api;
root.LawRounds=api;
})(typeof window!=="undefined"?window:globalThis);

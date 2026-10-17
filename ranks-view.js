/* Ranks v65 — rank card, how-to-earn list and the shared leaderboard on the Profile screen.
   The leaderboard uses Firebase (Google sign-in + Firestore) only when firebase-config.js is filled in;
   otherwise points and titles still work on this device. All text is rendered with textContent. */
(function(root){
"use strict";
var doc=root.document,host=doc.getElementById("profile-root");
if(!host||!root.LawPoints||!root.LawPointsCore)return;
var CFG=root.LAW_FIREBASE_CONFIG&&root.LAW_FIREBASE_CONFIG.apiKey?root.LAW_FIREBASE_CONFIG:null;
var SDK="https://www.gstatic.com/firebasejs/10.12.2/";
var NAME_KEY="law-learning-ranks-v1";
var fb=null,user=null,remote=null,pushTimer=null,lastPushed=-1,sdkPromise=null;

function el(tag,text,cls,parent){var n=doc.createElement(tag);if(cls)n.className=cls;if(text!==undefined&&text!==null)n.textContent=String(text);if(parent)parent.appendChild(n);return n;}
function button(text,cls,parent,fn){var b=el("button",text,cls,parent);b.type="button";if(fn)b.addEventListener("click",fn);return b;}
function fmt(n){return Number(n||0).toLocaleString("en-IN");}
function meta(){try{var v=JSON.parse(root.localStorage.getItem(NAME_KEY)||"{}");return v&&typeof v==="object"?v:{};}catch(e){return {};}}
function setMeta(patch){var v=meta();Object.keys(patch).forEach(function(k){v[k]=patch[k];});try{root.localStorage.setItem(NAME_KEY,JSON.stringify(v));}catch(e){}}
function savedName(){return String(meta().name||"").slice(0,24);}
function storeName(name){setMeta({name:name});}
function cleanName(v){return String(v||"").replace(/[\u0000-\u001f\u007f<>]/g,"").replace(/\s+/g," ").trim().slice(0,24);}
function defaultName(){
 var n=savedName();if(n)return n;
 try{n=cleanName(JSON.parse(root.localStorage.getItem("law-learning-profile-v1")||"{}").nickname);}catch(e){n="";}
 return n||"";
}

/* ---------- Rank card ---------- */
var wrap=el("div",undefined,"rk");
var card=el("section",undefined,"rk-card",wrap);
el("p","Your rank","rk-eyebrow",card);
var titleEl=el("h2","","rk-title",card);
var ptsEl=el("p","","rk-points",card);
var bar=el("div",undefined,"rk-bar",card);bar.setAttribute("role","progressbar");bar.setAttribute("aria-label","Progress to next rank");
bar.setAttribute("aria-valuemin","0");bar.setAttribute("aria-valuemax","100");
var fill=el("span",undefined,"",bar);
var nextEl=el("p","","rk-next",card);
var ladder=el("details",undefined,"rk-ladder",card);
el("summary","All ranks and how to earn points",undefined,ladder);
var earn=el("ul",undefined,"rk-earn",ladder);
[["Learn a new word in Games","+10"],["Get a Confusing Words question right","+3"],["Solve a Marriage Law case correctly","+3"],["Write an answer, then reveal a Case Practice outline","+15 per case"],
 ["Changed-facts case after practice","+10"],["Review a concept honestly (any result)","+5 a day"],
 ["Mark an exam topic ready in Exam Pattern","+2"]].forEach(function(r){var li=el("li",undefined,"",earn);el("span",r[0],"",li);el("strong",r[1],"",li);});
var steps=el("ol",undefined,"rk-steps",ladder);
root.LawPointsCore.RANKS.forEach(function(r){var li=el("li",undefined,"",steps);el("span",r.title,"",li);el("strong",fmt(r.at)+" pts","",li);});

function renderRank(){
 var pts=root.LawPoints.total(),r=root.LawPoints.rank();
 titleEl.textContent=r.title;
 ptsEl.textContent=fmt(pts)+" points · Level "+r.level+" of "+root.LawPointsCore.RANKS.length;
 var pct=Math.round(r.progress*100);fill.style.width=pct+"%";bar.setAttribute("aria-valuenow",String(pct));
 nextEl.textContent=r.next?fmt(r.next.need)+" more points to become "+r.next.title+".":"Top rank reached.";
 var pill=doc.querySelector(".score-pill");if(pill)pill.setAttribute("title",r.title+" · tap to see your rank");
 [].forEach.call(steps.children,function(li,i){li.classList.toggle("is-here",i===r.level-1);});
}

/* ---------- Leaderboard ---------- */
var board=el("section",undefined,"rk-card rk-board",wrap);
el("h3","Leaderboard","rk-h3",board);
var boardIntro=el("p","","rk-muted",board);
var join=el("div",undefined,"rk-join",board);
var listStatus=el("p","","rk-muted",board);listStatus.setAttribute("role","status");listStatus.setAttribute("aria-live","polite");
var list=el("ol",undefined,"rk-list",board);
var mine=el("div",undefined,"rk-mine",board);

function setStatus(t){listStatus.textContent=t||"";}
function friendly(e){
 var c=(e&&e.code)||"";
 if(/popup-closed|cancelled-popup/.test(c))return "Sign-in was closed before finishing.";
 if(/network/.test(c)||/offline/i.test(e&&e.message||""))return "You're offline. The leaderboard needs an internet connection.";
 if(/unauthorized-domain/.test(c))return "Sign-in isn't allowed on this web address yet. The app owner must add it in Firebase → Authentication → Authorised domains.";
 if(/permission-denied/.test(c))return "The leaderboard refused this update. Points can rise by at most 3,000 per save; keep studying and it will catch up.";
 return "Something went wrong: "+((e&&e.message)||"try again.");
}

function loadScript(src){return new Promise(function(ok,fail){var s=doc.createElement("script");s.src=src;s.async=true;s.onload=ok;s.onerror=function(){fail(new Error("Couldn't load the leaderboard. Check your connection."));};doc.head.appendChild(s);});}
function loadSdk(){
 if(sdkPromise)return sdkPromise;
 sdkPromise=loadScript(SDK+"firebase-app-compat.js")
  .then(function(){return Promise.all([loadScript(SDK+"firebase-auth-compat.js"),loadScript(SDK+"firebase-firestore-compat.js")]);})
  .then(function(){
   var app=root.firebase.apps.length?root.firebase.app():root.firebase.initializeApp(CFG);
   fb={auth:app.auth(),db:app.firestore(),fv:root.firebase.firestore.FieldValue,provider:new root.firebase.auth.GoogleAuthProvider()};
   fb.auth.getRedirectResult().catch(function(e){setStatus(friendly(e));});
   fb.auth.onAuthStateChanged(function(u){user=u;remote=null;setMeta({member:!!u});renderJoin();if(u)pullMine().then(loadBoard);else loadBoard();});
   return fb;
  });
 sdkPromise.catch(function(e){sdkPromise=null;setStatus(e.message);});
 return sdkPromise;
}

function renderJoin(){
 join.replaceChildren();
 if(!CFG){boardIntro.textContent="The shared leaderboard opens soon. Your points and rank already count on this phone.";return;}
 if(!user){
  boardIntro.textContent="Sign in with Google to put your points on the shared board. Only the name you choose below is shown; your email stays private.";
  var lab=el("label","Name on the board","rk-label",join);
  var input=el("input",undefined,"rk-input",lab);input.id="rk-name";input.maxLength=24;input.autocomplete="nickname";input.placeholder="e.g. Manoj K";input.value=defaultName();
  var err=el("p","","rk-error",join);
  button("Sign in with Google and join","rk-btn",join,function(){
   var n=cleanName(input.value);
   if(n.length<2){err.textContent="Choose a name of at least 2 characters.";input.focus();return;}
   storeName(n);err.textContent="";setStatus("Opening Google sign-in…");
   loadSdk().then(function(){
    return fb.auth.signInWithPopup(fb.provider).catch(function(e){
     if(/popup-blocked|operation-not-supported/.test(e.code||""))return fb.auth.signInWithRedirect(fb.provider);
     throw e;
    });
   }).then(function(){setStatus("");}).catch(function(e){setStatus(friendly(e));});
  });
  return;
 }
 boardIntro.textContent="You're on the board. Points sync from this phone automatically.";
 var row=el("div",undefined,"rk-row",join);
 var lab2=el("label","Name on the board","rk-label",row);
 var input2=el("input",undefined,"rk-input",lab2);input2.id="rk-name-edit";input2.maxLength=24;input2.value=defaultName()||"";
 button("Save name","rk-btn",row,function(){
  var n=cleanName(input2.value);if(n.length<2){setStatus("Choose a name of at least 2 characters.");return;}
  storeName(n);push(true);
 });
 var actions=el("div",undefined,"rk-actions",join);
 button("Sign out","rk-btn rk-quiet",actions,function(){fb.auth.signOut();});
 button("Remove me from the board","rk-btn rk-quiet",actions,function(){
  if(!user)return;var b=this;
  if(b.dataset.armed!=="1"){b.dataset.armed="1";b.textContent="Tap again to remove";setTimeout(function(){b.dataset.armed="";b.textContent="Remove me from the board";},4000);return;}
  fb.db.collection("leaderboard").doc(user.uid).delete().then(function(){setStatus("Removed from the leaderboard. Your points stay on this phone.");return fb.auth.signOut();}).catch(function(e){setStatus(friendly(e));});
 });
}

function pullMine(){
 if(!user)return Promise.resolve();
 return fb.db.collection("leaderboard").doc(user.uid).get().then(function(snap){
  remote=snap.exists?snap.data():null;
  if(remote&&typeof state!=="undefined"&&remote.points>root.LawPoints.total()){
   state.score=remote.points;
   try{root.LawAppCore.progress.save(state);if(typeof renderStats==="function")renderStats();}catch(e){}
   renderRank();
  }
  if(remote&&remote.name&&!savedName())storeName(cleanName(remote.name));
  lastPushed=remote?remote.points:-1;
  return push(true);
 }).catch(function(e){setStatus(friendly(e));});
}

function push(force){
 if(!fb||!user)return Promise.resolve();
 var name=defaultName();if(name.length<2)name="Student "+user.uid.slice(0,4);
 var local=root.LawPoints.total();
 var base=remote?remote.points:0;
 var pts=Math.min(local,base+3000);
 if(!force&&pts===lastPushed)return Promise.resolve();
 var data={name:name,points:pts,title:root.LawPointsCore.rankFor(pts).title,updatedAt:fb.fv.serverTimestamp()};
 return fb.db.collection("leaderboard").doc(user.uid).set(data).then(function(){
  remote={name:name,points:pts,title:data.title};lastPushed=pts;loadBoard();
  if(pts<local)schedule();
 }).catch(function(e){setStatus(friendly(e));});
}
function schedule(){clearTimeout(pushTimer);pushTimer=setTimeout(function(){push(false);},8000);}

function loadBoard(){
 if(!fb)return;
 setStatus("Loading leaderboard…");
 fb.db.collection("leaderboard").orderBy("points","desc").limit(50).get().then(function(qs){
  list.replaceChildren();mine.replaceChildren();var found=false,i=0;
  qs.forEach(function(d){
   i++;var v=d.data()||{},me=user&&d.id===user.uid;if(me)found=true;
   var li=el("li",undefined,"rk-item"+(me?" is-me":"")+(i<=3?" is-top":""),list);
   el("span",String(i),"rk-pos",li);
   var who=el("span",undefined,"rk-who",li);el("strong",cleanName(v.name)||"Student","",who);el("small",(v.title||"")+(me?" · you":""),"",who);
   el("span",fmt(v.points),"rk-pts",li);
  });
  setStatus(i?"":"No one on the board yet. Sign in to be the first.");
  if(user&&!found&&remote)el("p","You have "+fmt(remote.points)+" points on the board, outside the top 50 for now.","rk-muted",mine);
 }).catch(function(e){setStatus(friendly(e));});
}

/* ---------- Mount ---------- */
host.insertBefore(wrap,host.firstChild);
renderRank();renderJoin();
var scoreEl=doc.getElementById("score");
if(scoreEl&&root.MutationObserver)new root.MutationObserver(function(){renderRank();if(user)schedule();}).observe(scoreEl,{childList:true,characterData:true,subtree:true});
root.addEventListener("law-points",function(){renderRank();if(user)schedule();});

var pill=doc.querySelector(".score-pill");
if(pill){
 pill.setAttribute("role","button");pill.tabIndex=0;pill.style.cursor="pointer";
 var open=function(){if(root.LawAppCore&&root.LawAppCore.router)root.LawAppCore.router.navigate("profile");};
 pill.addEventListener("click",open);
 pill.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();open();}});
}
/* Load Firebase only when someone opens Profile (or is already signed in from an earlier visit). */
var view=doc.getElementById("profile-view");
function maybeLoad(){if(CFG&&view&&view.classList.contains("active"))loadSdk().catch(function(){});}
if(view&&root.MutationObserver)new root.MutationObserver(maybeLoad).observe(view,{attributes:true,attributeFilter:["class"]});
maybeLoad();
if(CFG&&meta().member)loadSdk().catch(function(){});
root.LawRanks={render:renderRank,configured:!!CFG};
})(window);

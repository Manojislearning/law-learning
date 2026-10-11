/* Shared browser application core: one router, progress store and DOM component primitives.
 * Compatible with existing localStorage schema (law-learning-progress-v2).
 * Designed to be testable in Node without a browser.
 */
(function(root,make){
  var core=make();
  if(typeof module==="object"&&module.exports)module.exports=core;
  if(root)root.LawAppCore=core;
})(typeof globalThis==="object"?globalThis:this,function(){
  "use strict";
  var ROUTES={
    home:["3-Year LL.B · Study App","Law Learning"],
    words:["Legal vocabulary","Words"],
    syllabus:["KSLU · 3-Year LL.B","Syllabus"],
    subjects:["KSLU · Legal concepts","Subjects"],
    exam:["Exam preparation","Exam Pattern"],
    papers:["Previous year questions","Past Papers"],
    notes:["Personal study space","Notes"],
    profile:["Local learning profile","Profile"],
    links:["Karnataka · Official resources","Important Links"]
  };
  var KEY="law-learning-progress-v2";
  function nonnegative(n){return typeof n==="number"&&Number.isFinite(n)&&n>=0?n:0;}
  function indexes(list){return new Set((Array.isArray(list)?list:[]).filter(function(v){return Number.isInteger(v)&&v>=0&&v<=100000;}));}
  function loadProgress(storage){
    var saved={};
    try{var raw=storage.getItem(KEY);if(raw){saved=JSON.parse(raw);if(!saved||typeof saved!=="object"||Array.isArray(saved))saved={};}}
    catch(e){saved={};}
    return {
      currentWord:Number.isInteger(saved.currentWord)&&saved.currentWord>=0?saved.currentWord:0,
      score:nonnegative(saved.score),
      learned:indexes(saved.learned),
      difficult:indexes(saved.difficult),
      streak:nonnegative(saved.streak),
      quizTarget:0
    };
  }
  function snapshotProgress(state){
    return {currentWord:Number.isInteger(state.currentWord)&&state.currentWord>=0?state.currentWord:0,
      score:nonnegative(state.score),
      learned:Array.from(indexes(Array.from(state.learned||[]))),
      difficult:Array.from(indexes(Array.from(state.difficult||[]))),
      streak:nonnegative(state.streak)};
  }
  function saveProgress(storage,state){
    try{storage.setItem(KEY,JSON.stringify(snapshotProgress(state)));return true;}
    catch(e){return false;}
  }
  function markProgress(state,index,review,config){
    if(!Number.isInteger(index)||index<0) return false;
    var opt=config||{};
    if(review){
      state.difficult.add(index);
      if(opt.removeLearned!==false)state.learned.delete(index);
      state.streak=0;
      state.score=nonnegative(state.score)+(opt.reviewPoints||0);
    }else{
      var first=!state.learned.has(index);
      state.learned.add(index);
      state.difficult.delete(index);
      state.streak=nonnegative(state.streak)+1;
      state.score=nonnegative(state.score)+(first?(opt.firstPoints??10):(opt.repeatPoints??0));
    }
    return true;
  }
  function createProgress(storage){
    return {key:KEY,load:function(){return loadProgress(storage);},
      save:function(state){return saveProgress(storage,state);},
      snapshot:snapshotProgress,mark:markProgress};
  }

  /* Renderer primitives never interpolate HTML; all authored strings become text. */
  function node(doc,tag,value,cls){
    var n=doc.createElement(tag);
    if(cls)n.className=cls;
    if(value!==undefined)n.textContent=String(value);
    return n;
  }
  function button(doc,label,onClick,cls){
    var b=node(doc,"button",label,cls);
    b.type="button";if(typeof onClick==="function")b.addEventListener("click",onClick);
    return b;
  }
  var ui={node:node,button:button};

  function createRouter(win,doc){
    var subs=new Set(),started=false,current=null;
    function normalize(route){
      var candidate=String(route||"").replace(/^#/,"").split("?")[0].trim();
      return Object.prototype.hasOwnProperty.call(ROUTES,candidate)&&
        (candidate==="home"||!!doc.getElementById(candidate+"-view"))?candidate:"home";
    }
    function show(route,options){
      var next=normalize(route),prior=current;
      var home=doc.getElementById("home-view");
      if(!home)throw Error("Home view is missing.");
      home.classList.toggle("active",next==="home");
      doc.querySelectorAll(".main-view").forEach(function(view){
        view.classList.toggle("active",view.id===next+"-view"&&next!=="home");
      });
      var back=doc.getElementById("back-home");
      if(back)back.hidden=next==="home";
      var kicker=doc.getElementById("section-kicker"),title=doc.getElementById("section-title");
      if(kicker)kicker.textContent=ROUTES[next][0];
      if(title)title.textContent=ROUTES[next][1];
      current=next;
      if(prior!==next){
        subs.forEach(function(callback){try{callback(next,prior);}catch(err){if(win.console)win.console.error("Route subscriber failed",err);}});
        if(options?.scroll!==false&&typeof win.scrollTo==="function"){
          win.scrollTo({top:0,behavior:prior===null?"instant":"smooth"});
        }
      }
      return next;
    }
    function fromHash(){return show(win.location.hash);}
    function navigate(route){
      var next=normalize(route);
      if(win.location.hash!=="#"+next)win.location.hash="#"+next;
      else show(next,{scroll:false});
      return next;
    }
    function onClick(event){
      var target=event.target;
      if(!target||typeof target.closest!=="function")return;
      if(target.closest("#back-home")){event.preventDefault();navigate("home");return;}
      var button=target.closest(".home-card[data-open]");
      if(button){event.preventDefault();navigate(button.dataset.open);}
    }
    function start(){
      if(started)return;started=true;
      doc.addEventListener("click",onClick);
      win.addEventListener("hashchange",fromHash);
      fromHash();
    }
    function subscribe(callback){
      if(typeof callback!=="function")throw TypeError("Route subscriber must be a function");
      subs.add(callback);return function(){subs.delete(callback);};
    }
    return {start:start,navigate:navigate,subscribe:subscribe,show:show,
      current:function(){return current;},normalize:normalize,
      routes:Object.freeze(Object.keys(ROUTES))};
  }
  return {routes:Object.freeze(ROUTES),createProgress:createProgress,createRouter:createRouter,ui:ui};
});

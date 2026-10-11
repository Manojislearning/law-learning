/* Law News v56: attributed headlines and study prompts, no invented legal summaries. */
(function () {
  "use strict";
  var root=document.getElementById("news-root");
  if(!root || !window.LawAppCore || !window.LawAppCore.router) return;
  var STORE="law-learning-news-saved-v1";
  var TABS=["Latest","Important","Supreme Court","Karnataka","Legislation","KSLU","Saved"];
  var state={items:[],tab:"Latest",count:12,updated:null,loading:false,loaded:false,error:""};
  function el(tag,cls,txt){var n=document.createElement(tag);if(cls)n.className=cls;if(txt!==undefined)n.textContent=String(txt);return n;}
  function validLink(value){try{var u=new URL(value);return u.protocol==="https:"&&u.hostname.length>3;}catch(e){return false;}}
  function validItem(item){return item&&typeof item.id==="string"&&/^[a-f0-9]{16}$/.test(item.id)&&typeof item.title==="string"&&item.title.length>=10&&item.title.length<=280&&typeof item.source==="string"&&item.source.length<=90&&validLink(item.url)&&!Number.isNaN(Date.parse(item.publishedAt))&&TABS.includes(item.category);}
  function readSaved(){try{var value=JSON.parse(localStorage.getItem(STORE)||"[]");return Array.isArray(value)?value.filter(function(s){return typeof s==="string"&&/^[a-f0-9]{16}$/.test(s);}).slice(0,200):[];}catch(e){return [];}}
  function saveItem(id){var saved=readSaved();var i=saved.indexOf(id);if(i>=0)saved.splice(i,1);else saved.unshift(id);try{localStorage.setItem(STORE,JSON.stringify(saved.slice(0,200)));}catch(e){state.error="Could not save on this device. Check private browsing or storage settings.";}render();}
  function formatted(iso){try{return new Intl.DateTimeFormat("en-IN",{day:"numeric",month:"short",year:"numeric",hour:"numeric",minute:"2-digit",timeZone:"Asia/Kolkata"}).format(new Date(iso))+" IST";}catch(e){return "Date unavailable";}}
  function selected(){
    var saved=readSaved();
    return state.items.filter(function(a){
      if(state.tab==="Latest")return true;
      if(state.tab==="Important")return a.priority>=2;
      if(state.tab==="Saved")return saved.includes(a.id);
      return a.category===state.tab;
    });
  }
  function paragraph(cls,text){return el("p",cls,text);}
  function render(){
    root.replaceChildren();
    var heading=el("div","news-heading");
    heading.append(el("p","eyebrow","LEGAL CURRENT AFFAIRS"),el("h2","","Law News"),paragraph("muted","Headlines from named publishers. Open the original to confirm facts, court orders and statutory changes."));
    root.append(heading);
    var status=el("div","news-status");status.setAttribute("role","status");
    var timing=state.updated?"Feed updated "+formatted(state.updated):"No completed news update yet";
    status.textContent=state.loading?"Checking for updates…":timing+" · Headlines are not legal advice";
    root.append(status);
    var categories=el("div","news-filters");categories.setAttribute("role","group");categories.setAttribute("aria-label","Filter legal news");
    TABS.forEach(function(tab){
      var button=el("button","news-filter"+(state.tab===tab?" is-active":""),tab);
      button.type="button";button.setAttribute("aria-pressed",String(state.tab===tab));
      button.addEventListener("click",function(){state.tab=tab;state.count=12;render();});
      categories.append(button);
    });
    root.append(categories);
    if(state.error)root.append(paragraph("news-note",state.error));
    var list=selected();
    var summary=el("p","news-count",list.length+" "+(list.length===1?"story":"stories")+(state.tab==="Important"?" · automatically selected, not editorially verified":""));
    root.append(summary);
    if(!list.length){
      var empty=el("div","news-empty");
      empty.append(el("h3","",state.loading?"Loading legal headlines…":state.tab==="Saved"?"No saved stories yet":"No stories in this view"),
        paragraph("muted",state.loading?"The feed is being checked.":state.tab==="Saved"?"Tap Save on any story to keep it in this device's list.":"Try Latest, or return after the next automatic update."));
      if(!state.loading&&state.tab!=="Latest"){
        var all=el("button","news-action","Show latest");all.type="button";all.addEventListener("click",function(){state.tab="Latest";render();});empty.append(all);
      }
      root.append(empty);
    }
    var saved=readSaved();
    list.slice(0,state.count).forEach(function(item){
      var card=el("article","news-story");
      var meta=el("div","news-story-meta");
      meta.append(el("span","news-topic",item.category),el("span","",formatted(item.publishedAt)));
      card.append(meta,el("h3","news-title",item.title));
      if(item.excerpt)card.append(paragraph("news-excerpt",item.excerpt));
      var source=paragraph("news-source","Reported by "+item.source);card.append(source);
      var prompt=el("div","news-prompt");
      var promptTitle=el("p","news-prompt-title","Think like a law student");
      var question=el("p","","Identify the legal issue. Which official judgment, section or notification would you verify before writing an exam answer?");
      question.hidden=true;
      var reveal=el("button","news-quiz-toggle","Practice one question +");reveal.type="button";reveal.setAttribute("aria-expanded","false");
      reveal.addEventListener("click",function(){question.hidden=!question.hidden;reveal.setAttribute("aria-expanded",String(!question.hidden));reveal.textContent=question.hidden?"Practice one question +":"Hide question −";});
      prompt.append(promptTitle,reveal,question);card.append(prompt);
      var actions=el("div","news-actions");
      var link=el("a","news-action news-read","Read at source ↗");
      link.href=item.url;link.target="_blank";link.rel="noopener noreferrer";link.setAttribute("aria-label","Read "+item.title+" at "+item.source);
      var save=el("button","news-action","");save.type="button";save.textContent=saved.includes(item.id)?"Saved ✓":"Save";save.setAttribute("aria-pressed",String(saved.includes(item.id)));save.setAttribute("aria-label",(saved.includes(item.id)?"Remove saved article: ":"Save article: ")+item.title);save.addEventListener("click",function(){saveItem(item.id);});
      actions.append(link,save);card.append(actions);root.append(card);
    });
    if(list.length>state.count){
      var more=el("button","news-more","Show more stories");more.type="button";more.addEventListener("click",function(){state.count+=12;render();});root.append(more);
    }
    var note=paragraph("news-footnote","Publisher attribution and links are provided for research. Headlines can omit context; verify primary legal sources. Saved items are local to this device and are not part of the app backup.");
    root.append(note);
  }
  async function getJSON(url){
    var response=await fetch(url,{cache:"no-store"});
    if(!response.ok)throw Error("Feed unavailable");
    var obj=await response.json();
    if(!obj||obj.schema!==1||!Array.isArray(obj.items))throw Error("Incorrect feed format");
    return obj;
  }
  async function load(){
    if(state.loading)return;
    state.loading=true;render();
    // Raw GitHub updates even when GitHub Pages does not rebuild on automated commits.
    var urls=["https://raw.githubusercontent.com/Manojislearning/law-learning/main/data/news.json","./data/news.json"];
    try{
      if(typeof fetch!=="function")throw Error("Browser fetch unavailable");
      var data=null;
      for(var i=0;i<urls.length;i++){
        try{data=await getJSON(urls[i]+(urls[i].includes("?")?"&":"?")+"v="+Date.now());break;}catch(e){/* Try static/offline copy. */}
      }
      if(!data)throw Error("The latest news feed could not be reached.");
      state.items=data.items.filter(validItem).sort(function(a,b){return Date.parse(b.publishedAt)-Date.parse(a.publishedAt);});
      state.updated=data.generatedAt;
      state.error="";
    }catch(e){state.error="Cannot retrieve updated headlines right now. Connect to the internet and return later.";}
    state.loading=false;state.loaded=true;render();
  }
  window.LawNews={render:render,load:load,validItem:validItem};
  window.LawAppCore.router.subscribe(function(route){if(route==="news")load();});
  if(window.LawAppCore.router.current()==="news")load();else render();
})();
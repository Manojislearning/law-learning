/* Law Notes v77 — the LAW-NOTES vault inside the app (Student → Law Notes).
   Notes come bundled in data/law-notes.json (synced from github.com/Manojislearning/LAW-NOTES by a workflow),
   so they open instantly, work offline once loaded, and never hit GitHub's reading limit.
   Browse: subjects → units → topics. Search all text. Save notes. Previous/next. Topic branch map. Listen.
   Markdown is rendered by reader/markdown.mjs, which escapes all source HTML. */
(function(root){
"use strict";
var doc=root.document,host=doc.getElementById("lawnotes-view");
if(!host)return;
var KEY="law-learning-lawnotes-v1",HOME="00 - Notes.md";
var SUBJECT_KEYS={"Law-of-Torts":"torts","Contract-I":"contract","Criminal-Law-I---BNS-2023":"bns","Constitutional-Law-I":"constitution","Family-Law-I---Hindu-Law":"hindu"};
var MORE=[["03-Case-Law","Case law"],["04-Exam-Answers","Exam answers"],["05-Previous-Year-Questions","Previous year questions"],["06-Statutes-and-Sources","Statutes and sources"],["07-Revision","Revision plan"],["10-Books-and-Reading","Books and reading"],["09-Language-Papers","Language papers"],["00-Dashboard","Dashboard"]];

function el(tag,text,cls,parent){var n=doc.createElement(tag);if(cls)n.className=cls;if(text!==undefined&&text!==null)n.textContent=String(text);if(parent)parent.appendChild(n);return n;}
function btn(text,cls,parent,fn){var b=el("button",text,cls,parent);b.type="button";if(fn)b.addEventListener("click",fn);return b;}
function row(parent,title,sub,fn,badge){
 var b=btn(undefined,"ln-row",parent,fn);
 var t=el("span",undefined,"ln-row-text",b);el("strong",title,"",t);if(sub)el("small",sub,"",t);
 if(badge)el("span",badge,"ln-badge",b);
 el("span","→","ln-arrow",b).setAttribute("aria-hidden","true");
 return b;
}

/* Saved on this device: bookmarks, last note, text size. */
function load(){try{var v=JSON.parse(root.localStorage.getItem(KEY)||"{}")||{};return {saved:Array.isArray(v.saved)?v.saved.filter(function(x){return typeof x==="string";}):[],last:typeof v.last==="string"?v.last:"",size:Number(v.size)>=15&&Number(v.size)<=26?Number(v.size):0};}catch(e){return {saved:[],last:"",size:0};}}
function save(){try{root.localStorage.setItem(KEY,JSON.stringify(prefs));}catch(e){}}
var prefs=load();

var md=null,mapMod=null,data=null,byPath={},paths=[],loading=null;
function ready(){
 if(loading)return loading;
 loading=Promise.all([
  import("./reader/markdown.mjs").then(function(m){md=m;}),
  fetch("./data/law-notes.json",{cache:"no-cache"}).then(function(r){if(!r.ok)throw Error("Notes file missing ("+r.status+")");return r.json();})
 ]).then(function(res){
  data=res[1];
  data.notes.forEach(function(n){byPath[n.p]=n;});
  paths=data.notes.map(function(n){return n.p;});
  return data;
 }).catch(function(err){loading=null;throw err;});
 return loading;
}

/* ───── Names and structure ───── */
function base(p){return p.split("/").pop();}
function dir(p){return p.split("/").slice(0,-1).join("/");}
function pretty(s){return String(s).replace(/\.md$/i,"").replace(/^\d\d - /,"").replace(/---/g," · ").replace(/-+/g," ").replace(/\s+/g," ").trim();}
function subjectName(folder){
 var f=paths.find(function(p){return dir(p)===folder&&/^00 - /.test(base(p))&&!/Books/i.test(p);});
 return f?titleOf(f):pretty(base(folder+".md"));
}
function titleOf(p){
 var n=byPath[p];if(!n)return pretty(base(p));
 if(!n._t){var m=/^#\s+(.+)$/m.exec(md?md.frontmatter(n.c).body:n.c);n._t=m?m[1].replace(/[*_`]/g,"").replace(/\[\[([^|\]]+\|)?([^\]]+)\]\]/g,"$2").trim():pretty(base(p));}
 return n._t;
}
function meta(p){var n=byPath[p];if(!n)return {};if(!n._m)n._m=md.frontmatter(n.c).meta;return n._m;}
/* An outline has only a title, a key-terms line and links — no explanation yet. */
function isOutline(p){
 var n=byPath[p];if(!n)return false;
 if(n._o===undefined){
  var body=md.frontmatter(n.c).body,words=0;
  body.split("\n").forEach(function(l){l=l.trim();if(!l||/^#/.test(l)||/\[\[/.test(l)||/^>/.test(l))return;words+=l.split(/\s+/).length;});
  n._o=meta(p).status==="outline"||words<30;
 }
 return n._o;
}
function units(subject){
 var out=[];
 paths.forEach(function(p){
  var m=/^(.*)\/Units\/(Unit-(\d\d))\/(.+)$/.exec(p);
  if(!m||m[1]!==subject)return;
  var u=out.find(function(x){return x.folder===m[2];});
  if(!u){u={folder:m[2],no:Number(m[3]),overview:"",topics:[]};out.push(u);}
  if(/^00 - /.test(m[4]))u.overview=p;else u.topics.push(p);
 });
 out.sort(function(a,b){return a.no-b.no;});
 out.forEach(function(u){u.title=u.overview?titleOf(u.overview).replace(/^Unit\s*0?\d+\s*[—–:-]\s*/i,""):"Unit "+u.no;u.topics.sort(natural);});
 return out;
}
function natural(a,b){return a.localeCompare(b,undefined,{numeric:true});}
function filesIn(folder,deep){return paths.filter(function(p){return deep?p.indexOf(folder+"/")===0:dir(p)===folder;}).sort(natural);}
function siblings(p){
 var d=dir(p);
 if(/\/Units\/Unit-\d\d$/.test(d))return filesIn(d).filter(function(x){return !/^00 - /.test(base(x));});
 return filesIn(d);
}
function subjectOf(p){var m=/^(0\d-Semester-\d)\/([^/]+)/.exec(p);return m?m[1]+"/"+m[2]:"";}
function unitNo(p){var m=/\/Units\/Unit-(\d\d)\//.exec(p)||/\/Unit-(\d\d) - /.exec(p);if(m)return Number(m[1]);var u=Number(meta(p).unit);return u>0?u:0;}

/* ───── Screens ───── */
var stack=[],current=null,router=root.LawAppCore&&root.LawAppCore.router;
function top(title,kicker){
 host.replaceChildren();
 var wrap=el("div",undefined,"ln",host);
 var back=doc.getElementById("back-home");
 if(back&&router&&router.current()==="lawnotes"){var to=stack.length>1?(stack[stack.length-2].label||"Back"):"Student";if(to.length>10)to="Back";back.textContent="← "+to;back.setAttribute("aria-label","Back to "+to);}
 if(kicker)el("p",kicker,"ln-kicker",wrap);
 if(title){var h=el("h2",title,"ln-title",wrap);h.tabIndex=-1;}
 return wrap;
}
function go(screen,args,label){stack.push({screen:screen,args:args||[],label:label});draw();}
function up(){if(stack.length>1){stack.pop();draw();}else root.LawAppCore.router.navigate("student");}
function draw(){
 var s=stack[stack.length-1];current=s;stopSpeech();
 SCREENS[s.screen].apply(null,s.args);
 try{root.scrollTo({top:0,behavior:"instant"});}catch(e){root.scrollTo(0,0);}
 var h=host.querySelector(".ln-title");if(h)h.focus({preventScroll:true});
}
var SCREENS={
 home:function(){
  var w=top("Law Notes","Your notes · KSLU");
  var f=el("form",undefined,"ln-search",w);f.setAttribute("role","search");
  var input=el("input",undefined,"",f);input.type="search";input.placeholder="Search all notes…";input.setAttribute("aria-label","Search all notes");input.autocomplete="off";
  f.addEventListener("submit",function(e){e.preventDefault();var q=input.value.trim();if(q)go("search",[q],"Search");});
  if(prefs.last&&byPath[prefs.last])row(w,"Continue reading",titleOf(prefs.last),function(){openNote(prefs.last);},"").classList.add("ln-continue");
  var saved=prefs.saved.filter(function(p){return byPath[p];});
  if(saved.length)row(w,"Saved notes",saved.length+(saved.length===1?" note":" notes"),function(){go("saved",[],"Saved");});
  section(w,"Semester I");
  subjectRows(w,"01-Semester-1");
  section(w,"Semester II");
  subjectRows(w,"02-Semester-2");
  section(w,"More");
  var mapNote=filesIn("08-Brain-Branches",true).filter(function(p){return !/Plugin|Integration/i.test(p);});
  MORE.forEach(function(m){var list=filesIn(m[0],true);if(list.length)row(w,m[1],list.length===1?"1 note":list.length+" notes",function(){go("folder",[m[0],m[1]],m[1]);});});
  if(mapNote.length)row(w,"Branch outlines",mapNote.length+" notes",function(){go("folder",["08-Brain-Branches","Branch outlines",true],"Branch outlines");});
  el("p","Notes from your LAW-NOTES vault · "+data.count+" notes · updated "+String(data.syncedAt||"").slice(0,10)+". Saved and read on this phone.","ln-foot",w);
 },
 subject:function(folder){
  var name=subjectName(folder),w=top(name,folder.indexOf("02-")===0?"Semester II":"Semester I");
  var overview=paths.find(function(p){return dir(p)===folder&&/^00 - /.test(base(p))&&!/Books/i.test(p);});
  var us=units(folder);
  if(us.length){
   var written=0,total=0;us.forEach(function(u){u.topics.forEach(function(t){total++;if(!isOutline(t))written++;});});
   el("p",total+" topics in "+us.length+" units"+(written<total?" · "+written+" written in full so far":""),"ln-lead",w);
   us.forEach(function(u){row(w,"Unit "+u.no+" · "+u.title,u.topics.length+" topics",function(){go("unit",[folder,u.folder],"Unit "+u.no);});});
  }else{
   var direct=filesIn(folder).filter(function(p){return p!==overview&&!/Books/i.test(p);});
   if(!direct.length)el("p","No notes for this subject yet.","ln-lead",w);
   direct.forEach(function(p){row(w,titleOf(p),"",function(){openNote(p);},isOutline(p)?"outline":"");});
  }
  var topics=filesIn(folder+"/Topics");
  if(topics.length){section(w,"Key topics");topics.forEach(function(p){row(w,titleOf(p),"",function(){openNote(p);},isOutline(p)?"outline":"");});}
  section(w,"Also");
  if(overview)row(w,"Subject overview","",function(){openNote(overview);});
  var tlKey={"Law-of-Torts":"torts","Contract-I":"contract","Contract-II---Special-Contracts":"contract","Criminal-Law-I---BNS-2023":"criminal","Constitutional-Law-I":"constitution","Constitutional-Law-II":"constitution","Family-Law-I---Hindu-Law":"family","Family-Law-II---Mohammedan-Law-and-Succession":"family","Property-Law":"property","Labour-Law-I":"labour"}[folder.split("/")[1]];
  if(tlKey&&root.LAW_TIMELINES)root.LAW_TIMELINES.list.filter(function(t){return t.subject===tlKey;}).forEach(function(t){row(w,"Timeline: "+t.title,t.kind==="steps"?t.events.length+" steps":t.events[0].when+" → "+t.events[t.events.length-1].when,function(){root.LawTimelines.open(t.id);});});
  var books=paths.find(function(p){return dir(p)===folder&&/Books/i.test(base(p));});
  if(books)row(w,"Books and reading","",function(){openNote(books);});
  practiceButtons(w,folder,0);
 },
 unit:function(folder,unitFolder){
  var u=units(folder).find(function(x){return x.folder===unitFolder;});if(!u){up();return;}
  var w=top(u.title,subjectName(folder)+" · Unit "+u.no);
  var done=u.topics.filter(function(t){return !isOutline(t);}).length;
  el("p",u.topics.length+" topics"+(done<u.topics.length?" · "+done+" written in full":""),"ln-lead",w);
  if(u.overview)row(w,"Start here: unit overview","",function(){openNote(u.overview);});
  var list=el("ol",undefined,"ln-topics",w);
  u.topics.forEach(function(p,i){var li=el("li",undefined,"",list);row(li,titleOf(p),"",function(){openNote(p);},isOutline(p)?"outline":"").querySelector("strong").textContent=(i+1)+". "+titleOf(p);});
  practiceButtons(w,folder,u.no);
 },
 folder:function(folder,label,deep){
  var w=top(label,"Law Notes");
  var list=filesIn(folder,!!deep).filter(function(p){return !/Plugin Guide|Integration Guide/i.test(p);});
  list.forEach(function(p){row(w,titleOf(p),deep||dir(p)!==folder?pretty(base(dir(p)+".md")):"",function(){openNote(p);});});
 },
 saved:function(){
  var w=top("Saved notes","Law Notes");
  var list=prefs.saved.filter(function(p){return byPath[p];});
  if(!list.length)el("p","Tap ☆ Save on any note to keep it here.","ln-lead",w);
  list.forEach(function(p){row(w,titleOf(p),pretty(base(subjectOf(p)+".md")),function(){openNote(p);});});
 },
 search:function(q){
  var w=top("Search","Law Notes");
  var f=el("form",undefined,"ln-search",w);var input=el("input",undefined,"",f);input.type="search";input.value=q;input.setAttribute("aria-label","Search all notes");
  f.addEventListener("submit",function(e){e.preventDefault();var v=input.value.trim();if(v){stack[stack.length-1].args=[v];draw();}});
  var terms=q.toLowerCase().split(/\s+/).filter(Boolean),hits=[];
  data.notes.forEach(function(n){
   if(/^08-Brain-Branches\/.*(Plugin|Integration)/i.test(n.p))return;
   var t=titleOf(n.p).toLowerCase(),c=n.c.toLowerCase(),score=0;
   for(var i=0;i<terms.length;i++){if(t.indexOf(terms[i])>=0)score+=5;else if(c.indexOf(terms[i])>=0)score+=1;else return;}
   if(!isOutline(n.p))score+=1;
   hits.push({p:n.p,s:score,c:n.c});
  });
  hits.sort(function(a,b){return b.s-a.s||natural(a.p,b.p);});
  el("p",hits.length?hits.length+(hits.length===1?" note found":" notes found")+(hits.length>40?" · showing 40":""):"No notes match “"+q+"”.","ln-lead",w).setAttribute("role","status");
  hits.slice(0,40).forEach(function(h){row(w,titleOf(h.p),snippet(h.c,terms[0])||pretty(base(subjectOf(h.p)+".md")),function(){openNote(h.p);},isOutline(h.p)?"outline":"");});
 },
 note:function(p){renderNote(p);}
};
function section(w,text){el("h3",text,"ln-section",w);}
function subjectRows(w,sem){
 var seen={};
 paths.forEach(function(p){var m=new RegExp("^"+sem+"/([^/]+)/").exec(p);if(m)seen[m[1]]=1;});
 Object.keys(seen).sort().forEach(function(s){
  var folder=sem+"/"+s,us=units(folder),n=us.reduce(function(a,u){return a+u.topics.length;},0);
  row(w,subjectName(folder),us.length?us.length+" units · "+n+" topics":"Unit outlines",function(){go("subject",[folder],subjectName(folder));});
 });
}
function snippet(text,term){
 var plain=md.frontmatter(text).body.replace(/\[\[([^|\]]+\|)?([^\]]+)\]\]/g,"$2").replace(/[#*_>`|]/g," ").replace(/\s+/g," ");
 var i=plain.toLowerCase().indexOf(term);if(i<0)return "";
 var s=Math.max(0,i-40);return (s?"…":"")+plain.slice(s,s+110).trim()+"…";
}
function practiceButtons(w,folder,unit){
 var key=SUBJECT_KEYS[folder.split("/")[1]];
 if(!key)return;
 if(key==="torts"&&root.LawTortsPath)btn(unit?"Play Torts Path · Unit "+unit+" →":"Play Torts Path →","cw-secondary ln-practice",w,function(){openTortsPath(unit);});
 if(root.LawCasePracticeUI)btn("Case practice for this subject →","cw-secondary ln-practice",w,function(){root.LawCasePracticeUI.open(key);});
}
function openTortsPath(){root.LawAppCore.router.navigate("words");setTimeout(function(){root.LawTortsPath.open();},0);}

/* ───── Reading a note ───── */
function openNote(p,heading){
 if(!byPath[p]){status("That note is not in your notes yet.");return;}
 if(current&&current.screen==="note"){stack[stack.length-1]={screen:"note",args:[p,heading],label:"Note"};draw();}
 else go("note",[p,heading],"Note");
}
function renderNote(p,heading){
 var n=byPath[p],note=md.renderMarkdown(n.c),title=meta(p).title||titleOf(p);
 prefs.last=p;save();
 var sub=subjectOf(p),u=unitNo(p);
 var w=top(null,null);
 var crumbs=[];if(sub)crumbs.push(subjectName(sub));if(u)crumbs.push("Unit "+u);
 el("p",crumbs.join(" · ")||"Law Notes","ln-kicker",w);
 var tools=el("div",undefined,"ln-tools",w);
 var saved=prefs.saved.indexOf(p)>=0;
 var sv=btn(saved?"★ Saved":"☆ Save","ln-tool"+(saved?" is-on":""),tools,function(){
  var i=prefs.saved.indexOf(p);if(i>=0)prefs.saved.splice(i,1);else prefs.saved.unshift(p);save();
  var on=prefs.saved.indexOf(p)>=0;sv.textContent=on?"★ Saved":"☆ Save";sv.classList.toggle("is-on",on);sv.setAttribute("aria-pressed",String(on));status(on?"Saved on this phone.":"Removed from saved notes.");
 });sv.setAttribute("aria-pressed",String(saved));
 if(md&&isTopicPath(p))btn("◇ Map","ln-tool",tools,function(){openMap(p);});
 if("speechSynthesis" in root){var sp=btn("▶ Listen","ln-tool ln-listen",tools,function(){toggleSpeech(sp,article);});}
 btn("A−","ln-tool ln-size",tools,function(){size(-1);}).setAttribute("aria-label","Smaller text");
 btn("A+","ln-tool ln-size",tools,function(){size(1);}).setAttribute("aria-label","Bigger text");
 var article=el("article",undefined,"ln-article",w);
 if(prefs.size)article.style.fontSize=prefs.size+"px";
 var hasH1=note.toc.some(function(h){return h.level===1;});
 if(!hasH1){var h=el("h1",title,"",article);}
 var toc=note.toc.filter(function(h){return h.level===2;});
 /* Safe: renderMarkdown escapes all source text and only emits its own tags. */
 var body=el("div",undefined,"ln-body",article);body.innerHTML=note.html;
 var h1=article.querySelector("h1");if(h1){h1.classList.add("ln-title");h1.tabIndex=-1;if(h1.parentNode!==article)article.insertBefore(h1,body);}
 if(toc.length>3){
  var d=doc.createElement("details");d.className="ln-toc";el("summary","On this page · "+toc.length+" sections","",d);
  toc.forEach(function(t){var a=btn(t.title.replace(/[*_`]/g,""),"ln-toc-link",d,function(){var x=doc.getElementById(t.id);if(x)x.scrollIntoView({block:"start"});});});
  (h1&&h1.nextSibling)?h1.parentNode.insertBefore(d,h1.nextSibling):article.insertBefore(d,body);
 }
 tidyLinks(body,p);
 if(isOutline(p)){article.classList.add("ln-outline-only");outlineHelp(article,p);}
 /* Previous / next in the same unit or folder. */
 var peers=siblings(p),i=peers.indexOf(p),prev=peers[i-1],next=peers[i+1];
 var nav=el("nav",undefined,"ln-pager",w);nav.setAttribute("aria-label","Previous and next note");
 var a=btn(undefined,"ln-page",nav,function(){if(prev)openNote(prev);});a.disabled=!prev;el("small","← Previous","",a);el("span",prev?titleOf(prev):"Start of section","",a);
 var b=btn(undefined,"ln-page ln-next",nav,function(){if(next)openNote(next);});b.disabled=!next;el("small","Next →","",b);el("span",next?titleOf(next):"End of section","",b);
 var upTo=parentScreenFor(p);
 if(upTo)btn(upTo.text,"cw-secondary ln-practice",w,upTo.fn);
 try{history.replaceState(null,"","#lawnotes?file="+encodeURIComponent(p));}catch(e){}
 if(heading)setTimeout(function(){var x=doc.getElementById(md.slug(heading));if(x)x.scrollIntoView({block:"start"});},0);
}
/* Where "back to the list" goes, even when the note was opened from search or a link. */
function parentScreenFor(p){
 var m=/^(.*)\/Units\/(Unit-\d\d)\//.exec(p);
 if(m&&!(stack.length>1&&stack[stack.length-2].screen==="unit"))return {text:"All topics in this unit →",fn:function(){stack=[stack[0],{screen:"subject",args:[m[1]],label:subjectName(m[1])},{screen:"unit",args:[m[1],m[2]],label:"Unit "+Number(m[2].slice(5))}];draw();}};
 return null;
}
function tidyLinks(body,p){
 body.querySelectorAll("a.wiki").forEach(function(a){
  var target=a.getAttribute("data-target")||"",r=md.resolveLink(target,p,paths);
  if(r&&byPath[r.path]){a.href="#lawnotes?file="+encodeURIComponent(r.path);a.addEventListener("click",function(e){e.preventDefault();if(r.path===p&&r.heading){var x=doc.getElementById(md.slug(r.heading));if(x)x.scrollIntoView({block:"start"});}else openNote(r.path,r.heading);});return;}
  /* Links to Obsidian Canvas maps open the branch map of this topic instead. */
  if(/\.canvas$/i.test(target)&&isTopicPath(p)){a.href="#";a.addEventListener("click",function(e){e.preventDefault();openMap(p);});return;}
  var span=el("span",a.textContent,"ln-deadlink");a.replaceWith(span);
 });
 body.querySelectorAll('a[href*="law-learning/reader/"]').forEach(function(a){a.removeAttribute("target");a.href="#lawnotes";a.addEventListener("click",function(e){e.preventDefault();if(isTopicPath(p))openMap(p);else status("Open a topic, then tap ◇ Map.");});});
}
/* Most notes are still outlines. Show something useful in their place. */
function outlineHelp(w,p){
 var box=el("aside",undefined,"ln-outline",w);
 el("strong","This topic is only an outline so far.","",box);
 var folder=subjectOf(p),key=SUBJECT_KEYS[folder.split("/")[1]],u=unitNo(p);
 var path=root.TORTS_PATH;
 if(key==="torts"&&path&&u&&path.units[u-1]){
  var unit=path.units[u-1];
  el("p","Quick notes for Unit "+u+" — "+unit.title+" (from Torts Path):","",box);
  var ul=el("ul",undefined,"",box);
  unit.lessons.forEach(function(l){l.notes.slice(0,2).forEach(function(t){el("li",t,"",ul);});});
  btn("Play Torts Path →","cw-primary",box,function(){openTortsPath(u);});
 }else{
  el("p","Read the unit overview, or practise this subject while the full note is written.","",box);
  if(key&&root.LawCasePracticeUI)btn("Case practice →","cw-primary",box,function(){root.LawCasePracticeUI.open(key);});
 }
}
function isTopicPath(p){return /\/Units\/Unit-\d\d\/(?:0[1-9]|[1-9]\d) - .+\.md$/i.test(p)||/\/Topics\/[^/]+\.md$/i.test(p);}
function size(d){
 var a=host.querySelector(".ln-article");if(!a)return;
 var now=prefs.size||parseFloat(getComputedStyle(a).fontSize)||18;
 prefs.size=Math.max(15,Math.min(26,Math.round(now+d)));save();a.style.fontSize=prefs.size+"px";status("Text size "+prefs.size+"px");
}
var speaking=false;
function stopSpeech(){if(speaking&&root.speechSynthesis){root.speechSynthesis.cancel();}speaking=false;}
function toggleSpeech(b,article){
 if(speaking){stopSpeech();b.textContent="▶ Listen";return;}
 var t=article.innerText.slice(0,28000);if(!t.trim())return;
 var s=new root.SpeechSynthesisUtterance(t);s.lang="en-IN";s.rate=.95;speaking=true;b.textContent="■ Stop";
 s.onend=s.onerror=function(){speaking=false;b.textContent="▶ Listen";};root.speechSynthesis.speak(s);
}
var statusTimer;
function status(text){var s=doc.getElementById("ln-status");if(!s){s=el("div",undefined,"ln-status",doc.body);s.id="ln-status";s.setAttribute("role","status");}s.textContent=text;s.hidden=false;clearTimeout(statusTimer);statusTimer=setTimeout(function(){s.hidden=true;},2600);}

/* ───── Topic branch map (shared with reader/map.mjs) ───── */
var mapCtl=null;
function mapShell(){
 if(doc.getElementById("map-overlay"))return;
 var link=doc.createElement("link");link.rel="stylesheet";link.href="./reader/map.css?v=77";doc.head.appendChild(link);
 var wrap=el("div",undefined,"app ln-map-host",doc.body);
 var o=el("section",undefined,"map-overlay",wrap);o.id="map-overlay";o.hidden=true;o.setAttribute("aria-label","Topic branch map");
 var head=el("header",undefined,"map-top",o),hd=el("div",undefined,"map-heading",head);el("strong","Topic map","",hd);el("small","TOPIC","",hd).id="map-status";
 var c=el("div",undefined,"map-controls",head);el("span","0","",c).id="map-count";
 [["map-back","← Note","Go back"],["map-zoom-out","−","Zoom out"],["map-zoom-in","+","Zoom in"],["map-fit","Fit","Fit to screen"],["map-close","×","Close map"]].forEach(function(x){var b=btn(x[1],x[0]==="map-close"?"map-exit":"",c);b.id=x[0];b.setAttribute("aria-label",x[2]);});
 var ws=el("div",undefined,"map-workspace",o);
 var NS="http://www.w3.org/2000/svg",svg=doc.createElementNS(NS,"svg");svg.id="map-svg";svg.setAttribute("class","map-canvas");svg.setAttribute("viewBox","0 0 1200 800");svg.setAttribute("role","img");svg.setAttribute("aria-label","Branches of this topic");
 var g=doc.createElementNS(NS,"g");g.id="map-scene";svg.appendChild(g);ws.appendChild(svg);
 var det=el("aside",undefined,"map-detail",ws);det.id="map-details";det.hidden=true;
 var dh=el("div",undefined,"map-detail-head",det);el("strong","Note","",dh).id="map-note-title";btn("×","",dh).id="map-detail-close";
 el("div",undefined,"map-detail-scroll article",det).id="map-note-body";
 btn("Open linked topic ↗","map-read-btn",det).id="map-read-note";
 var foot=el("div",undefined,"map-footer",o);el("span","Tap a branch to open the next level","",foot).id="map-current";el("span","Tap to focus · Pinch to zoom","",foot);
}
function openMap(p){
 (mapMod?Promise.resolve(mapMod):import("./reader/map.mjs").then(function(m){mapMod=m;return m;})).then(function(m){
  mapShell();
  if(!mapCtl)mapCtl=m.mountVaultMap({files:paths,getNote:function(x){return Promise.resolve(byPath[x]?byPath[x].c:"");},readNote:function(x){closeMap();openNote(x);},onClose:function(){}});
  return mapCtl.open(p);
 }).catch(function(){status("The map could not open on this phone.");});
}
function closeMap(){var o=doc.getElementById("map-overlay");if(o&&!o.hidden){var c=doc.getElementById("map-close");if(c)c.click();}}

/* ───── Entry points ───── */
function start(target){
 host.replaceChildren();var w=el("div",undefined,"ln",host);el("p","Opening your notes…","ln-lead",w).setAttribute("role","status");
 return ready().then(function(){
  stack=[{screen:"home",args:[],label:"Notes"}];
  if(target&&target.file&&byPath[target.file]){
   var p=target.file,m=/^(.*)\/Units\/(Unit-\d\d)\//.exec(p);
   if(m)stack.push({screen:"subject",args:[m[1]],label:subjectName(m[1])},{screen:"unit",args:[m[1],m[2]],label:"Unit "+Number(m[2].slice(5))});
   stack.push({screen:"note",args:[p],label:"Note"});
   draw();if(target.map&&isTopicPath(p))openMap(p);return;
  }
  if(target&&target.subject){
   stack.push({screen:"subject",args:[target.subject],label:subjectName(target.subject)});
   var u=units(target.subject).find(function(x){return x.no===target.unit;});
   if(u)stack.push({screen:"unit",args:[target.subject,u.folder],label:"Unit "+u.no});
  }
  if(target&&target.map){
   var first=paths.find(function(x){return /Constitutional-Law-I\/Units\/Unit-01\/01 - /.test(x);})||paths.find(isTopicPath);
   if(first){stack.push({screen:"note",args:[first],label:"Note"});draw();openMap(first);return;}
  }
  draw();
 }).catch(function(err){
  host.replaceChildren();var w=el("div",undefined,"ln",host);
  el("h2","Notes could not open","ln-title",w);el("p","Check your internet once, then try again. ("+err.message+")","ln-lead",w);
  btn("Try again","cw-primary",w,function(){start(target);});
 });
}
function fromHash(){
 var h=location.hash||"",q=h.indexOf("?")>=0?new URLSearchParams(h.slice(h.indexOf("?")+1)):null;
 if(!q)return null;
 var t={file:q.get("file")||"",map:q.get("map")==="1"};
 return t.file||t.map?t:null;
}
var pending=null;
if(router)router.subscribe(function(r){
 if(r!=="lawnotes"){stopSpeech();closeMap();return;}
 var t=pending||fromHash();pending=null;
 if(t||!stack.length)start(t);else draw();
});
/* Back button: step up inside Law Notes before leaving it. */
doc.addEventListener("click",function(e){
 if(!e.target.closest("#back-home")||!router||router.current()!=="lawnotes")return;
 if(stack.length>1){e.preventDefault();e.stopImmediatePropagation();up();}
},true);
function openWith(t){if(router.current()==="lawnotes")start(t);else{pending=t;router.navigate("lawnotes");}}
if(router&&router.current()==="lawnotes")start(fromHash());
root.LawNotes={
 open:function(){router.navigate("lawnotes");},
 openUnit:function(subjectFolder,unit){openWith({subject:"01-Semester-1/"+subjectFolder,unit:unit});},
 openNote:function(p){openWith({file:p});},
 ready:ready
};
})(window);

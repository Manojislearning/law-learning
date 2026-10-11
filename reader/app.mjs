import {esc, slug, renderMarkdown, resolveLink} from './markdown.mjs';
import {mountVaultMap,isTopic} from './map.mjs';

const REPO='Manojislearning/LAW-NOTES';
const API=`https://api.github.com/repos/${REPO}`;
const KEY='kslu-vault-reader-v1';
const DEFAULT_PATH='00 - Notes.md';
const $=s=>document.querySelector(s);
const state={files:[],tree:null,expanded:new Set(['01-Semester-1','00-Dashboard']),notes:new Map(),current:'',saved:new Set(),filter:'all',font:19,warm:true,loading:false,speaking:false,sourceMode:false,rawMarkdown:''};
let scrollSaveAt=0,toastTimer=null,requestedPath='',mapController=null;
try{
 const saved=JSON.parse(localStorage.getItem(KEY)||'{}');
 state.saved=new Set(Array.isArray(saved.saved)?saved.saved:[]);
 state.font=Number.isFinite(saved.font)?Math.max(16,Math.min(26,saved.font)):19;
 state.warm=saved.warm!==false;
 requestedPath=new URLSearchParams(location.search).get('file')||saved.last||DEFAULT_PATH;
}catch{requestedPath=DEFAULT_PATH;}
function settingsSave(){try{localStorage.setItem(KEY,JSON.stringify({saved:[...state.saved],font:state.font,warm:state.warm,last:state.current}))}catch{}}
function toast(message){const el=$('#toast');el.textContent=message;el.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.hidden=true,3800)}
function applyPrefs(){document.documentElement.style.setProperty('--reader-size',state.font+'px');document.body.classList.toggle('cool',!state.warm);$('#font-size').value=state.font;$('#font-size-label').textContent=state.font+'px';$('#warm-toggle').checked=state.warm;$('#saved-number').textContent=state.saved.size;}
applyPrefs();
function setStatus(text,connected=false){const el=$('#status-badge');el.innerHTML='<span></span> '+esc(text);el.classList.toggle('connected',connected)}
async function github(path){
 const headers={'Accept':'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'};
 const res=await fetch(API+path,{
   method:'GET',headers,
   cache:'no-store',credentials:'omit',redirect:'error',referrerPolicy:'no-referrer'
 });
 if(!res.ok){
   if(res.status===401)throw new Error('The notes service denied the request.');
   if(res.status===403)throw new Error('Reading limit reached. Try again later.');
   if(res.status===404)throw new Error('These notes could not be found.');
   throw new Error('GitHub could not load the vault (HTTP '+res.status+').');
 }
 return res.json();
}
function treeFromPaths(paths){
 const root={name:'All notes',path:'',folders:new Map(),files:[],count:0};
 for(const path of paths){const segments=path.split('/');let node=root;node.count++;
   for(const segment of segments.slice(0,-1)){
     if(!node.folders.has(segment))node.folders.set(segment,{name:segment,path:[node.path,segment].filter(Boolean).join('/'),folders:new Map(),files:[],count:0});
     node=node.folders.get(segment);node.count++;
   }
   node.files.push(path);
 }
 return root;
}
function hideFile(path){return !/\.(md|canvas)$/i.test(path)||path.startsWith('.')||path.split('/').some(p=>p.startsWith('.'))||/^(?:untitled|welcome)(?:\s|\.|\/)/i.test(path);}
async function loadTree(){
 const response=await github('/git/trees/main?recursive=1');
 if(response.truncated)throw new Error('GitHub file listing is truncated. A smaller vault is needed.');
 const paths=response.tree.filter(f=>f.type==='blob'&&!hideFile(f.path)).map(f=>f.path).sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}));
 if(!paths.length)throw new Error('GitHub connected, but no Markdown notes were found.');
 state.files=paths;state.tree=treeFromPaths(paths);
 $('#repo-meta').textContent=paths.length+' notes';
 $('#refresh-btn').disabled=false;
 $('#connect-view').hidden=true;$('#reader-view').hidden=false;
 setStatus('Notes ready',true);
 renderSidebar();
}
function loading(message,show=true){
 const el=$('#loading-screen');
 $('#loading-message').textContent=message||'Opening your notes';
 el.hidden=!show;
}
async function connect(){
 const openRequestedMap=new URLSearchParams(location.search).get('map')==='1';
 $('#connect-view').hidden=true;
 loading('Loading library');
 try{
  await loadTree();
  if(!mapController)mapController=mountVaultMap({files:state.files,getNote:loadNote,readNote:openNote,onClose:()=>selectMobileNav('bottom-home')});
  const firstTopic=state.files.find(f=>/\/Constitutional-Law-I\/Units\/Unit-01\/01 - /.test(f))||state.files.find(isTopic);
  const path=openRequestedMap&&!isTopic(requestedPath)?(firstTopic||DEFAULT_PATH):state.files.includes(requestedPath)?requestedPath:state.files.includes(DEFAULT_PATH)?DEFAULT_PATH:state.files[0];
  loading('Opening notes');
  await openNote(path);
  if(openRequestedMap&&isTopic(path))void mapController.open(path);
 }catch(e){
  $('#reader-view').hidden=true;$('#connect-view').hidden=false;
  setStatus('Unavailable');
  $('#connect-error').textContent=e instanceof Error?e.message:'Could not open notes.';
 }finally{
  loading('',false);
 }
}
$('#public-connect-btn').addEventListener('click',()=>void connect());
$('#refresh-btn').addEventListener('click',async()=>{if(!state.files.length)return;try{state.notes.clear();await loadTree();if(state.current)await openNote(state.current);toast('Latest notes loaded from GitHub.')}catch(e){toast(e.message)}});

function iconFolder(name){return name.startsWith('01-')||name.startsWith('02-')?'▱':'▦'}
const unitOneShortTitles={
 '00 - Unit 01 - Constitution, Preamble and citizenship.md':'Unit 1 · Start here',
 '01 - Meaning and definition of Constitution.md':'01 · What is a Constitution?',
 '02 - Kinds of Constitution.md':'02 · Types of Constitutions',
 '03 - Constitutionalism.md':'03 · Constitutionalism',
 '04 - Salient features of the Indian Constitution.md':'04 · Key Indian Features',
 '05 - Preamble- meaning, scope and importance.md':'05 · The Preamble',
 '06 - Preamble- objectives and values.md':'06 · Four Values',
 '07 - Citizenship- acquisition and termination.md':'07 · Citizenship',
 '08 - Unit 1 Quick Revision.md':'08 · Quick Revision',
 '09 - Unit 1 Exam Practice.md':'09 · Exam Practice'
};
function niceName(path){
 const name=path.split('/').pop();
 if(path==='00 - Notes.md')return 'Notes';
 if(path==='01-Semester-1/00 - Semester I Notes.md')return 'Semester I';
 if(path.includes('/Constitutional-Law-I/Units/Unit-01/')){
  if(unitOneShortTitles[name])return unitOneShortTitles[name];
 }
 return name.replace(/\.(md|canvas)$/i,'').replace(/^\d\d - /,'').replace(/-+/g,' ').replace(/\s+/g,' ').trim();
}
function renderSidebar(){
 const area=$('#sidebar-content');if(!state.tree){area.textContent='Connect to GitHub to browse.';return;}
 const term=$('#search').value.trim().toLowerCase();
 if(term){const matches=state.files.filter(f=>(f.toLowerCase().includes(term)||niceName(f).toLowerCase().includes(term))&& (state.filter!=='saved'||state.saved.has(f))).slice(0,90);
   area.innerHTML=`<div class="section-kicker search-kicker">${matches.length} RESULTS${matches.length===90?' (FIRST 90)':''}</div>`+matches.map(f=>`<button type="button" class="search-row${f===state.current?' active':''}" data-note="${esc(f)}" title="${esc(f)}">▤ &nbsp;${esc(niceName(f))}</button>`).join('')+(matches.length===0?'<p class="sidebar-placeholder">No matching notes found.</p>':'');
   return;}
 if(state.filter==='saved'){
   const bookmarks=[...state.saved].filter(f=>state.files.includes(f)).sort((a,b)=>a.localeCompare(b));
   area.innerHTML=bookmarks.length?bookmarks.map(f=>`<button type="button" class="note-row${f===state.current?' active':''}" data-note="${esc(f)}" title="${esc(f)}">${esc(niceName(f))}</button>`).join(''):'<div class="sidebar-placeholder"><strong>No saved notes yet</strong><p>Tap ☆ while reading a note to save it here.</p></div>';
   return;
 }
 const chunks=[];
 const walk=(folder,depth)=>{
  for(const child of [...folder.folders.values()].sort((a,b)=>a.name.localeCompare(b.name,undefined,{numeric:true}))){
    const expanded=state.expanded.has(child.path);
    chunks.push(`<button type="button" class="folder-row${expanded?' open':''}" data-folder="${esc(child.path)}" aria-expanded="${expanded}"><span class="arrow">›</span><span class="folder-icon">${iconFolder(child.name)}</span><span>${esc(child.name.replace(/^\d\d-/,'').replaceAll('-',' '))}</span><span class="count">${child.count}</span></button>`);
    if(expanded){chunks.push('<div class="folder-children">');walk(child,depth+1);chunks.push('</div>');}
  }
  for(const path of folder.files){chunks.push(`<button type="button" class="note-row${state.current===path?' active':''}" data-note="${esc(path)}" title="${esc(path)}">${esc(niceName(path))}</button>`)}
 };
 // Root files first (HOME - Start Here.md, etc.)
 for(const path of state.tree.files)chunks.push(`<button type="button" class="note-row${state.current===path?' active':''}" data-note="${esc(path)}">${esc(niceName(path))}</button>`);
 walk(state.tree,0);area.innerHTML=chunks.join('');
}
$('#sidebar-content').addEventListener('click',event=>{
 const folder=event.target.closest('[data-folder]');if(folder){const path=folder.dataset.folder;if(state.expanded.has(path))state.expanded.delete(path);else state.expanded.add(path);renderSidebar();return;}
 const note=event.target.closest('[data-note]');if(note){void openNote(note.dataset.note);closeSidebar()}
});
$('#search').addEventListener('input',renderSidebar);
$('#search').addEventListener('keydown',event=>{if(event.key==='Enter'){const first=$('#sidebar-content [data-note]');if(first){void openNote(first.dataset.note);closeSidebar();$('#search').blur()}}});
document.addEventListener('keydown',event=>{if(event.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){event.preventDefault();openSidebar();$('#search').focus()}if(event.key==='Escape'){closeSidebar();closePrefs()}});
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{state.filter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(c=>c.classList.toggle('active',c===b));renderSidebar()}));

async function loadNote(path){
 if(state.notes.has(path))return state.notes.get(path);
 const route=path.split('/').map(encodeURIComponent).join('/');
 const payload=await github('/contents/'+route+'?ref=main');
 if(payload.encoding!=='base64'||typeof payload.content!=='string')throw new Error('GitHub did not return Markdown content.');
 const binary=atob(payload.content.replace(/\s/g,'')),buf=Uint8Array.from(binary,c=>c.charCodeAt(0));
 const content=new TextDecoder('utf-8').decode(buf);
 state.notes.set(path,content);return content;
}
function renderCanvas(content,path){
  let map;try{map=JSON.parse(content)}catch{return {meta:{status:'invalid-canvas'},toc:[],html:'<p>This Canvas file is invalid JSON.</p>'}}
  const nodes=Array.isArray(map.nodes)?map.nodes:[],edges=Array.isArray(map.edges)?map.edges:[];
  const nodeById=new Map(nodes.map(n=>[n.id,n]));const incoming=new Set(edges.map(e=>e.toNode));
  const rootNodes=nodes.filter(n=>!incoming.has(n.id));const sorted=[...rootNodes,...nodes];
  const used=new Set(),parts=[];
  const render=(n,depth)=>{
    if(!n||used.has(n.id))return;used.add(n.id);
    if(n.type==='file'&&typeof n.file==='string'){
      const label=niceName(n.file);
      parts.push(`<li class="canvas-item"><a class="wiki" href="#" data-target="${esc(n.file)}">${esc(label)}</a></li>`);
    }else if(n.type==='text'&&typeof n.text==='string'){
      parts.push(`<li class="canvas-item">${esc(n.text.slice(0,190))}</li>`);
    }
    for(const e of edges.filter(e=>e.fromNode===n.id))render(nodeById.get(e.toNode),depth+1);
  };
  for(const n of sorted)render(n,0);
  return {meta:{status:'visual-map-index'},toc:[],text:content,html:`<h1>${esc(niceName(path))}</h1><p>This visual Canvas map is shown as a list of linked notes in reading mode. Tap a topic to read it.</p><ul class="canvas-list">${parts.join('')}</ul>`};
}
function siblingNotes(path){const folder=path.split('/').slice(0,-1).join('/');return state.files.filter(f=>f.split('/').slice(0,-1).join('/')===folder)}
function upLink(path){
 const match=/^(.*\/Units\/Unit-\d\d)\/.+\.md$/i.exec(path);
 if(match){
  const file=path.split('/').pop();
  if(!file.startsWith('00 - '))return state.files.find(f=>f.startsWith(match[1]+'/00 - '))||'';
  const subject=match[1].split('/Units/')[0];
  return state.files.find(f=>f.startsWith(subject+'/00 - ')&&!f.includes('Books'))||'';
 }
 if(path.includes('/Topics/')){
  const dir=path.split('/Topics/')[0];
  return state.files.find(f=>f.startsWith(dir+'/00 - ')&&!f.includes('Books'))||'';
 }
 if(path.startsWith('01-Semester-1/')&&path.split('/').length===3)return '01-Semester-1/00 - Semester I Notes.md';
 if(path.startsWith('01-Semester-1/')&&path.split('/').length===2)return DEFAULT_PATH;
 return '';
}
function navigation(path){const peers=siblingNotes(path),idx=peers.indexOf(path),prev=peers[idx-1],next=peers[idx+1];
 $('#prev-note').disabled=!prev;$('#next-note').disabled=!next;
 $('#bottom-prev').disabled=!prev;$('#bottom-next').disabled=!next;
 $('#bottom-prev').title=prev?'Previous: '+niceName(prev):'No previous note';
 $('#bottom-next').title=next?'Next: '+niceName(next):'No next note';
 $('#bottom-map').disabled=!isTopic(path);
 $('#map-btn').hidden=!isTopic(path);
 const up=upLink(path);
 $('#up-note').hidden=!up||up===path;
 $('#up-note').dataset.note=up||'';
 $('#up-note').textContent=path.includes('/Units/Unit-')&&!path.split('/').pop().startsWith('00 - ')?'← Unit':'← Back';
 $('#prev-title').textContent=prev?niceName(prev):'Beginning of section';
 $('#next-title').textContent=next?niceName(next):'End of section';
 $('#prev-note').dataset.note=prev||'';$('#next-note').dataset.note=next||'';
}
function saveReadingPosition(){if(!state.current)return;const area=$('#reading-scroll'),length=area.scrollHeight-area.clientHeight;
 const fraction=length>0?Math.max(0,Math.min(1,area.scrollTop/length)):1;
 $('#progress-line').style.width=Math.round(fraction*100)+'%';
 if(Date.now()-scrollSaveAt>750){scrollSaveAt=Date.now();try{localStorage.setItem(KEY+':progress:'+state.current,Math.round(fraction*100))}catch{}}
}
function revealHeading(id){
 if(state.sourceMode)showMarkdown(false);
 const target=document.getElementById(id);
 if(!target)return false;
 target.scrollIntoView({behavior:'smooth',block:'start'});
 return true;
}
function showMarkdown(show){
 if(!state.current||!state.rawMarkdown)return;
 state.sourceMode=!!show;
 const button=$('#markdown-btn');
 button.setAttribute('aria-pressed',String(state.sourceMode));
 button.title=state.sourceMode?'Return to rendered notes':'Show original Markdown source';
 button.innerHTML=state.sourceMode?'◉ <span class="tool-word">Preview</span>':'&lt;/&gt; <span class="tool-word">Markdown</span>';
 const article=$('#article');
 if(state.sourceMode){
  article.innerHTML='<div class="markdown-file-chip">Markdown · Read only</div><pre class="markdown-source"><code>'+esc(state.rawMarkdown)+'</code></pre>';
 }else{
  article.innerHTML=state.renderedHtml;
 }
 $('#reading-scroll').scrollTop=0;
}
$('#markdown-btn').addEventListener('click',()=>showMarkdown(!state.sourceMode));

async function openNote(path,heading=''){
 if(!state.files.includes(path)){toast('That note is not available in this vault.');return;}
 if(state.loading)return;
 state.loading=true;
 const article=$('#article');article.innerHTML='<div class="note-skeleton"><i></i><i></i><i></i><i></i></div>';
 try{
  if('speechSynthesis' in window)window.speechSynthesis.cancel();state.speaking=false;$('#speak-btn').innerHTML='▶ <span class="tool-word">Listen</span>';
  const markdown=await loadNote(path),note=/\.canvas$/i.test(path)?renderCanvas(markdown,path):renderMarkdown(markdown),meta=note.meta;
  state.rawMarkdown=markdown;state.sourceMode=false;
  state.current=path;requestedPath=path;
  const title=meta.title || niceName(path);
  const sourceParts=path.split('/');
  $('#breadcrumb').innerHTML='<strong>'+esc(sourceParts.slice(0,-1).join(' / ')||'Vault')+'</strong> &nbsp;/&nbsp; '+esc(title);

  const progress=localStorage.getItem(KEY+':progress:'+path)||'';
  const course=path.endsWith('.canvas')?'CANVAS':path.includes('01-Semester-1')?'SEMESTER I':path.includes('02-Semester-2')?'SEMESTER II':path.includes('10-Books')?'BOOKS':'NOTES';
  const toc=note.toc.filter(h=>h.level<=3);
  const intro=`<div class="note-eyebrow">${course}${progress?' · '+esc(progress)+'% READ':''}</div>`;
  const headingHtml=note.toc.some(h=>h.level===1)?'':`<h1>${esc(title)}</h1>`;
  const tocHtml=toc.length>3?`<details class="toc"><summary>ON THIS PAGE · ${toc.length} SECTIONS</summary>${toc.map(h=>`<a class="${h.level>2?'toc-nested':''}" href="#${esc(h.id)}" data-heading="${esc(h.id)}">${esc(h.title)}</a>`).join('')}</details>`:'';
  state.renderedHtml=intro+headingHtml+tocHtml+note.html;
  article.innerHTML=state.renderedHtml;
  $('#markdown-btn').setAttribute('aria-pressed','false');
  $('#markdown-btn').innerHTML='&lt;/&gt; <span class="tool-word">Markdown</span>';
  $('#markdown-btn').title='Show original Markdown source';
  article.classList.remove('note-enter');
  // Retrigger a short, low-motion page entrance after a successful note change.
  void article.offsetWidth;
  article.classList.add('note-enter');
  $('#reading-scroll').scrollTop=0;$('#progress-line').style.width='0%';
  $('#save-btn').classList.toggle('saved',state.saved.has(path));
  $('#save-btn').innerHTML=state.saved.has(path)?'★ <span class="tool-word">Saved</span>':'☆ <span class="tool-word">Save</span>';
  navigation(path);renderSidebar();settingsSave();
  history.replaceState(null,'',location.pathname+'?file='+encodeURIComponent(path));
  if(heading)requestAnimationFrame(()=>{if(!revealHeading(slug(heading)))toast('Heading not found.')});
 }catch(error){article.innerHTML=`<div class="empty"><h2>Could not open this note</h2><p>${esc(error.message)}</p><button type="button" class="primary-btn" id="retry-note">Retry</button></div>`;$('#retry-note').addEventListener('click',()=>void openNote(path));}
 finally{state.loading=false;}
}
$('#article').addEventListener('click',event=>{
 const link=event.target.closest('a[data-target]');if(!link)return;
 event.preventDefault();const result=resolveLink(link.dataset.target,state.current,state.files);
 if(!result){toast('This link points to another file or an ambiguous note.');return;}
 if(result.path===state.current&&result.heading){revealHeading(slug(result.heading));return;}
 void openNote(result.path,result.heading);
});
$('#article').addEventListener('click',event=>{
 const a=event.target.closest('a[data-heading]');if(!a)return;
 event.preventDefault();revealHeading(a.dataset.heading);
});
$('#prev-note').addEventListener('click',()=>{if($('#prev-note').dataset.note)void openNote($('#prev-note').dataset.note)});
$('#next-note').addEventListener('click',()=>{if($('#next-note').dataset.note)void openNote($('#next-note').dataset.note)});
$('#up-note').addEventListener('click',()=>{const p=$('#up-note').dataset.note;if(p)void openNote(p)});
$('#bottom-prev').addEventListener('click',()=>{const p=$('#prev-note').dataset.note;if(p)void openNote(p)});
$('#bottom-next').addEventListener('click',()=>{const p=$('#next-note').dataset.note;if(p)void openNote(p)});
$('#brand-home').addEventListener('click',()=>{if(state.files.length)void openNote(DEFAULT_PATH)});
$('#reading-scroll').addEventListener('scroll',saveReadingPosition,{passive:true});
$('#save-btn').addEventListener('click',()=>{if(!state.current)return;if(state.saved.has(state.current))state.saved.delete(state.current);else state.saved.add(state.current);
 $('#save-btn').classList.toggle('saved',state.saved.has(state.current));$('#save-btn').innerHTML=state.saved.has(state.current)?'★ <span class="tool-word">Saved</span>':'☆ <span class="tool-word">Save</span>';
 settingsSave();applyPrefs();renderSidebar();toast(state.saved.has(state.current)?'Note saved on this device.':'Removed from saved notes.');
});
$('#speak-btn').addEventListener('click',()=>{
 if(!('speechSynthesis' in window)){toast('Speech is not available on this phone or browser.');return;}
 if(state.speaking){window.speechSynthesis.cancel();state.speaking=false;$('#speak-btn').innerHTML='▶ <span class="tool-word">Listen</span>';return;}
 const text=$('#article').innerText.slice(0,28000);if(!text.trim())return;
 const speech=new SpeechSynthesisUtterance(text);speech.rate=.95;speech.lang='en-IN';state.speaking=true;$('#speak-btn').innerHTML='■ <span class="tool-word">Stop</span>';
 speech.onend=speech.onerror=()=>{state.speaking=false;$('#speak-btn').innerHTML='▶ <span class="tool-word">Listen</span>';};window.speechSynthesis.speak(speech);
});
function selectMobileNav(id){
 document.querySelectorAll('.bottom-nav button').forEach(button=>{
  const active=button.id===id;
  button.classList.toggle('active',active);
  if(active)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');
 });
}
function openSidebar(){if(window.innerWidth>850)return;$('#sidebar').classList.add('open');$('#scrim').hidden=false;selectMobileNav('bottom-home');}
function closeSidebar(){$('#sidebar').classList.remove('open');if($('#prefs').hidden)$('#scrim').hidden=true;selectMobileNav('bottom-home');}
function openPrefs(){$('#prefs').hidden=false;if(window.innerWidth<=850)$('#scrim').hidden=false;}
function closePrefs(){$('#prefs').hidden=true;if(!$('#sidebar').classList.contains('open'))$('#scrim').hidden=true;selectMobileNav('bottom-home');}
$('#menu-btn').addEventListener('click',openSidebar);
$('#close-sidebar').addEventListener('click',closeSidebar);
$('#settings-btn').addEventListener('click',()=>$('#prefs').hidden?openPrefs():closePrefs());
$('#close-prefs').addEventListener('click',closePrefs);
$('#font-btn').addEventListener('click',openPrefs);
$('#scrim').addEventListener('click',()=>{closeSidebar();closePrefs()});
$('#font-size').addEventListener('input',event=>{state.font=Number(event.target.value);applyPrefs();settingsSave()});
$('#warm-toggle').addEventListener('change',event=>{state.warm=event.target.checked;applyPrefs();settingsSave()});
selectMobileNav('bottom-home');
$('#bottom-home').addEventListener('click',()=>{if(state.files.length)void openNote(state.files.includes(DEFAULT_PATH)?DEFAULT_PATH:state.files[0]);else toast('Connect your vault first.')});
const showMap=()=>{if(!isTopic(state.current)){toast('Choose a topic note first.');return;}void mapController?.open(state.current).then(success=>{if(success)selectMobileNav('bottom-map')});};
$('#map-btn').addEventListener('click',showMap);
$('#bottom-map').addEventListener('click',showMap);
window.addEventListener('popstate',()=>{const path=new URLSearchParams(location.search).get('file');if(path&&state.files.includes(path))void openNote(path)});
if('serviceWorker' in navigator&&location.protocol==='https:')navigator.serviceWorker.register('./sw.js',{scope:'./'}).catch(()=>{});
// Public read-only notes load automatically. No GitHub credentials are requested or stored.
void connect();

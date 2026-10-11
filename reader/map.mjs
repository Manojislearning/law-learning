import {frontmatter,renderMarkdown,resolveLink} from './markdown.mjs';
const NS='http://www.w3.org/2000/svg';
const names={'01-Semester-1':'Semester I','02-Semester-2':'Semester II','Constitutional-Law-I':'Constitutional Law I','Contract-I':'Contract I','Law-of-Torts':'Law of Torts','Family-Law-I---Hindu-Law':'Family Law I · Hindu Law','Criminal-Law-I---BNS-2023':'Criminal Law I · BNS','English-For-Kannada-Medium':'English'};
const clean=s=>names[s]||s.replace(/\.(md|canvas)$/i,'').replace(/^\d\d\s*-\s*/,'').replace(/-/g,' ').replace(/\s+/g,' ').trim();
const svg=type=>document.createElementNS(NS,type);
const set=(el,props)=>{for(const [key,val] of Object.entries(props))el.setAttribute(key,String(val));return el};
const txt=(value,x,y,klass)=>{const el=set(svg('text'),{x,y,class:klass});el.textContent=value;return el};
const splitTitle=(value,max=36)=>{const lines=[''];for(const word of String(value).split(/\s+/)){let i=lines.length-1;if((lines[i]+' '+word).trim().length>max&&lines[i])lines.push(word);else lines[i]=(lines[i]+' '+word).trim()}return lines.slice(0,3)};
export function makeVaultTree(files){
 const root={id:'root',label:'LAW NOTES',children:[],parent:null,path:null},nodes=new Map([['root',root]]);
 function add(parent,key,label,file=null){
  const id=parent.id+'/'+key;if(nodes.has(id))return nodes.get(id);
  const item={id,label,path:file,parent,children:[]};nodes.set(id,item);parent.children.push(item);return item;
 }
 for(const file of files.filter(f=>f.toLowerCase().endsWith('.md')).sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}))){
  const parts=file.split('/'),name=parts.pop();let parent=root;
  for(const p of parts.filter(x=>x!=='Units'))parent=add(parent,p,clean(p));
  add(parent,name,clean(name),file);
 }
 return root;
}
export function noteBranches(content){
 const lines=frontmatter(content).body.split(/\r?\n/),out=[];
 for(const line of lines){
  const raw=line.trim();if(!raw||/^[-|:\s]{3,}$/.test(raw))continue;
  const heading=/^#{1,6}\s+(.+)/.exec(raw),bullet=/^(?:[-*+]|\d+[.)])\s+(.+)/.exec(raw),quote=/^>\s*(.+)/.exec(raw);
  let title=(heading?heading[1]:bullet?bullet[1]:quote?quote[1]:raw)
   .replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g,'$2')
   .replace(/\[\[([^\]]+)\]\]/g,'$1').replace(/[*_~]/g,'').trim();
  if(!title||/^\[!/.test(title))continue;
  if(title.length>250)title=title.slice(0,247)+'…';
  out.push({title,kind:heading?'heading':bullet?'point':'text'});
  if(out.length===130)break;
 }
 return out;
}
export function mountVaultMap({files,getNote,readNote}){
 const panel=document.querySelector('#map-overlay'),canvas=document.querySelector('#map-svg'),scene=document.querySelector('#map-scene');
 const filter=document.querySelector('#map-subject'),details=document.querySelector('#map-details'),body=document.querySelector('#map-note-body');
 const title=document.querySelector('#map-note-title'),status=document.querySelector('#map-status'),selectedLabel=document.querySelector('#map-current');
 const root=makeVaultTree(files),all=new Map(),byPath=new Map();let visible=[],scope=root,chosen=null,extra=[],bounds={w:800,h:500};
 let view={x:0,y:0,w:1200,h:800},drag=null,dragged=false;
 const addNode=n=>{all.set(n.id,n);if(n.path)byPath.set(n.path,n);n.children.forEach(addNode)};addNode(root);
 function option(node,label){const el=document.createElement('option');el.value=node.id;el.textContent=label;filter.append(el)}
 option(root,'Entire vault');
 for(const node of root.children){option(node,node.label);if(/^0[12]-Semester/.test(node.id.split('/').pop()))for(const child of node.children.filter(x=>x.children.length))option(child,node.label+' · '+child.label)}
 function layout(){
  visible=[];let leaf=0,max=0;
  function visit(n,depth){
   n.x=35+depth*420;max=Math.max(max,depth);
   const kids=n===chosen?n.children.concat(extra):n.children;
   for(const child of kids)visit(child,depth+1);
   n.y=kids.length?(kids[0].y+kids[kids.length-1].y)/2:45+leaf++*88;
   visible.push(n);
  }
  visit(scope,0);bounds={w:(max+1)*420+90,h:Math.max(180,leaf*88+85)};
  document.querySelector('#map-count').textContent=visible.length+' nodes';
 }
 function applyView(){canvas.setAttribute('viewBox',[view.x,view.y,view.w,view.h].join(' '))}
 function fit(){
  const aspect=Math.max(1,canvas.clientWidth)/Math.max(1,canvas.clientHeight);
  const w=bounds.w+120,h=bounds.h+100;
  view={x:-60,y:-50,w:Math.max(w,h*aspect),h:Math.max(h,w/aspect)};applyView();
 }
 function zoom(factor){
  const cx=view.x+view.w/2,cy=view.y+view.h/2;
  const w=Math.max(280,Math.min(200000,view.w*factor)),h=w*Math.max(1,canvas.clientHeight)/Math.max(1,canvas.clientWidth);
  view={x:cx-w/2,y:cy-h/2,w,h};applyView();
 }
 function paint(reset=false){
  layout();scene.replaceChildren();
  const lines=svg('g'),cards=svg('g');scene.append(lines,cards);
  const setVisible=new Set(visible);
  for(const n of visible){
   if(n.parent&&setVisible.has(n.parent)){
    const p=n.parent;lines.append(set(svg('path'),{d:'M'+(p.x+330)+' '+p.y+' H'+(p.x+360)+' V'+n.y+' H'+n.x,class:'map-link'}));
   }
  }
  for(const n of visible){
   const g=set(svg('g'),{'data-id':n.id,class:'map-node '+(n.path?'file':n.children.length?'folder':'detail')+(chosen===n?' selected':''),role:'button',tabindex:0,'aria-label':n.label});
   g.append(set(svg('rect'),{x:n.x,y:n.y-32,width:330,height:64,rx:14}));
   const lines=splitTitle(n.label);
   lines.forEach((part,i)=>g.append(txt(part,n.x+17,n.y+5+(i-(lines.length-1)/2)*17,'map-text')));
   cards.append(g);
  }
  if(reset)fit();else applyView();
  status.textContent=scope.label;
 }
 function showDetails(yes){details.hidden=!yes;panel.classList.toggle('has-details',yes)}
 async function selectNode(node){
  if(!node)return;
  if(!node.path){
   if(node.id.includes('/text-'))return;
   scope=node;chosen=null;extra=[];showDetails(false);filter.value=all.has(scope.id)&&[...filter.options].some(o=>o.value===scope.id)?scope.id:'root';paint(true);
   return;
  }
  status.textContent='Opening note…';
  try{
   const content=await getNote(node.path);
   chosen=node;selectedLabel.textContent=node.label;title.textContent=node.label;
   body.innerHTML=renderMarkdown(content).html;
   extra=noteBranches(content).map((x,i)=>({id:node.id+'/text-'+i,label:x.title,path:null,parent:node,children:[]}));
   showDetails(true);paint(false);status.textContent='Complete note loaded';
  }catch(error){status.textContent='Could not open note: '+String(error.message||error)}
 }
 scene.addEventListener('click',e=>{const card=e.target.closest('[data-id]');if(!dragged&&card)void selectNode(visible.find(x=>x.id===card.dataset.id))});
 scene.addEventListener('keydown',e=>{const card=e.target.closest('[data-id]');if(card&&(e.key==='Enter'||e.key===' ')){e.preventDefault();void selectNode(visible.find(x=>x.id===card.dataset.id))}});
 canvas.addEventListener('wheel',e=>{e.preventDefault();zoom(e.deltaY>0?1.2:.83)},{passive:false});
 canvas.addEventListener('pointerdown',e=>{if(e.button!==0)return;drag={px:e.clientX,py:e.clientY,x:view.x,y:view.y};dragged=false;canvas.setPointerCapture(e.pointerId)});
 canvas.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.px,dy=e.clientY-drag.py;if(Math.abs(dx)+Math.abs(dy)>7)dragged=true;if(!dragged)return;view.x=drag.x-dx*view.w/Math.max(1,canvas.clientWidth);view.y=drag.y-dy*view.h/Math.max(1,canvas.clientHeight);applyView()});
 const end=()=>{drag=null;setTimeout(()=>{dragged=false},0)};
 canvas.addEventListener('pointerup',end);canvas.addEventListener('pointercancel',end);
 document.querySelector('#map-close').addEventListener('click',close);
 document.querySelector('#map-detail-close').addEventListener('click',()=>showDetails(false));
 document.querySelector('#map-fit').addEventListener('click',fit);
 document.querySelector('#map-zoom-in').addEventListener('click',()=>zoom(.72));
 document.querySelector('#map-zoom-out').addEventListener('click',()=>zoom(1.35));
 document.querySelector('#map-back').addEventListener('click',()=>{scope=scope.parent||root;chosen=null;extra=[];showDetails(false);paint(true)});
 document.querySelector('#map-read-note').addEventListener('click',()=>{if(chosen?.path){const p=chosen.path;close();void readNote(p)}});
 filter.addEventListener('change',()=>{scope=all.get(filter.value)||root;chosen=null;extra=[];showDetails(false);paint(true)});
 body.addEventListener('click',e=>{const a=e.target.closest('a[data-target]');if(!a||!chosen?.path)return;e.preventDefault();const target=resolveLink(a.dataset.target,chosen.path,files);if(!target)return;const n=byPath.get(target.path);if(!n)return;if(!visible.includes(n)){scope=n.parent||root;paint(true)}void selectNode(n)});
 function open(){panel.hidden=false;scope=root;chosen=null;extra=[];filter.value='root';showDetails(false);paint(true);document.querySelector('#map-close').focus()}
 function close(){panel.hidden=true;showDetails(false)}
 return {open,close};
}

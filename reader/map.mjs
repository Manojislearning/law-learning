import {frontmatter,renderMarkdown,resolveLink} from './markdown.mjs';
const NS='http://www.w3.org/2000/svg';
const tag=t=>document.createElementNS(NS,t);
const attrs=(e,o)=>{Object.entries(o).forEach(([k,v])=>e.setAttribute(k,String(v)));return e};
const text=(s,x,y,c)=>{const e=attrs(tag('text'),{x,y,class:c});e.textContent=s;return e};
const COLORS=['#3289cb','#eb8b30','#2ea66c','#d75954','#9369ca','#17a8ad','#bd982f','#d16b9a'];
const clean=s=>String(s||'').replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g,'$2').replace(/\[\[([^\]]+)\]\]/g,'$1').replace(/!?\[([^\]]+)\]\([^)]+\)/g,'$1').replace(/[*_~]/g,'').replace(/\s+/g,' ').trim();
export const isTopic=p=>/\/Units\/Unit-\d\d\/(?:0[1-9]|[1-9]\d) - .+\.md$/i.test(p)||/\/Topics\/[^/]+\.md$/i.test(p);

function node(label,kind,parent,section='',source=''){
 const n={id:(parent?.id||'')+'-'+(parent?.children.length||0),label:clean(label).slice(0,750),kind,parent,children:[],section,source,link:null,collapsed:false,x:0,y:0,width:0,height:0,color:COLORS[0]};
 if(parent)parent.children.push(n);
 return n;
}
function destination(raw,path,paths){
 const wiki=/!?\[\[([^\]]+)\]\]/.exec(raw);
 const md=/\[[^\]]+\]\(([^)]+)\)/.exec(raw);
 const target=wiki?wiki[1].split('|')[0]:md?md[1]:null;
 return target?resolveLink(target,path,paths):null;
}
export function noteBranches(content,path,paths){
 const parsed=frontmatter(content),lines=parsed.body.split(/\r?\n/);
 const title=parsed.meta.title||clean((lines.find(s=>/^#\s+/.test(s))||'').replace(/^#\s+/,''))||path.split('/').pop().replace(/\.md$/,'');
 const root=node(title,'root',null);root.id='root';
 const hasSections=lines.some(l=>/^##\s+/.test(l));
 const stack=[{level:1,n:root}];
 let fenced=false,currentHeading=root,previousList=null,previousIndent=-1,overview=null;
 const addLine=(raw,parent,section)=>{
  const colon=/^\s*\*\*([^*]{1,65}):\*\*\s*(.+)$/.exec(raw)||/^\s*\*\*([^*]{1,65})\*\*:\s*(.+)$/.exec(raw);
  if(colon){
   const name=node(colon[1].trim(),'key',parent,section,raw);
   const detail=node(colon[2].trim(),'point',name,section,colon[2].trim());
   detail.link=destination(colon[2],path,paths);return name;
  }
  const n=node(raw,'point',parent,section,raw);
  n.link=destination(raw,path,paths);
  return n;
 };
 for(const raw of lines){
  const line=raw.trim();
  if(/^(?:`{3,}|~{3,})/.test(line)){fenced=!fenced;continue;}
  if(fenced||!line||/^---+$/.test(line)||/^\|/.test(line)||/^<\w/.test(line))continue;
  if(/^>\s*\[!/.test(line))continue;
  const heading=/^(#{1,6})\s+(.+)/.exec(line);
  if(heading){
   const depth=heading[1].length;
   if(depth===1)continue;
   while(stack.length>1&&stack[stack.length-1].level>=depth)stack.pop();
   const parent=stack[stack.length-1].n;
   const n=node(heading[2],'heading',parent,heading[2],raw);
   stack.push({level:depth,n});
   currentHeading=n;previousList=null;previousIndent=-1;
   continue;
  }
  if(hasSections&&currentHeading===root)continue;
  const bullet=/^(\s*)(?:[-*+]|\d+[.)])\s+(.+)$/.exec(raw);
  const value=bullet?bullet[2].replace(/^\[[ xX]\]\s+/,''):line.replace(/^>\s*/,'');
  if(!value||/^!\[/.test(value))continue;
  let base=currentHeading;
  if(currentHeading===root){
   if(!overview)overview=node('Overview','heading',root,'Overview');
   base=overview;
  }
  if(bullet){
   const ind=bullet[1].replace(/\t/g,'  ').length;
   if(previousList&&ind>previousIndent)base=previousList;
   const n=addLine(value,base,currentHeading===root?'Overview':currentHeading.label);
   previousList=n;previousIndent=ind;
  }else{
   previousList=null;previousIndent=-1;
   addLine(value,base,currentHeading===root?'Overview':currentHeading.label);
  }
 }
 const fold=n=>{n.sourcePath=path;n.collapsed=n!==root&&n.children.length>0;n.children.forEach(fold);};
 fold(root);
 return root;
}
export function visibleBranches(root){
 if(!root)return [];
 const result=[];
 const visit=n=>{result.push(n);if(!n.collapsed)n.children.forEach(visit);};
 visit(root);
 return result;
}
export function toggleBranch(root,id){
 const stack=[root];
 while(stack.length){
  const n=stack.pop();
  if(n?.id===id&&n.children.length){n.collapsed=!n.collapsed;return n.collapsed;}
  if(n)stack.push(...n.children);
 }
 return null;
}
export function measureTree(root){
 const visible=visibleBranches(root);
 const widths=[],ctx=typeof document!=='undefined'&&document.createElement?document.createElement('canvas').getContext('2d'):null;
 for(const n of visible){
  const depth=n===root?0:(n.parent?.depth??0)+1;
  n.depth=depth;
  n.color=depth===0?COLORS[0]:depth===1?COLORS[root.children.indexOf(n)%COLORS.length]:(n.parent?.color||COLORS[0]);
  const px=depth===0?25:depth===1?22:19;
  n.fontSize=px;
  if(ctx)ctx.font=(depth<=1?'700 ':'500 ')+px+'px system-ui';
  const measured=ctx?ctx.measureText(n.label).width:n.label.length*px*.52;
  n.width=Math.max(110,Math.ceil(measured)+34);
  n.height=px+28;
  widths[depth]=Math.max(widths[depth]||0,n.width);
 }
 const x=[40];
 for(let i=1;i<widths.length;i++)x[i]=x[i-1]+widths[i-1]+125;
 const subtree=n=>{
  const children=n.collapsed?[]:n.children;
  n.span=Math.max(n.height+18,children.reduce((sum,c)=>sum+subtree(c),0)+Math.max(0,children.length-1)*14);
  return n.span;
 };
 subtree(root);
 const position=(n,top)=>{
  n.x=x[n.depth];n.y=top+n.span/2;
  if(n.collapsed)return;
  const total=n.children.reduce((sum,c)=>sum+c.span,0)+Math.max(0,n.children.length-1)*14;
  let cursor=top+(n.span-total)/2;
  for(const child of n.children){position(child,cursor);cursor+=child.span+14;}
 };
 position(root,20);
 return {width:Math.max(...visible.map(n=>n.x+n.width))+55,height:root.span+60};
}
export function mountVaultMap({files,getNote,readNote,onClose}){
 const panel=document.querySelector('#map-overlay'),svg=document.querySelector('#map-svg'),scene=document.querySelector('#map-scene');
 const drawer=document.querySelector('#map-details'),body=document.querySelector('#map-note-body'),title=document.querySelector('#map-note-title'),status=document.querySelector('#map-status');
 let root=null,nodes=[],topic='',active=null,bounds={width:1000,height:700},v={x:0,y:0,w:1200,h:800};
 const pointers=new Map();let pinch=null,moved=false;
 const rect=()=>svg.getBoundingClientRect();
 const size=()=>({w:Math.max(1,rect().width),h:Math.max(1,rect().height)});
 const apply=()=>svg.setAttribute('viewBox',[v.x,v.y,v.w,v.h].join(' '));
 function fit(){
  const {w,h}=size(),ratio=w/h,W=bounds.width+110,H=bounds.height+100;
  v={x:-55,y:-50,w:Math.max(W,H*ratio),h:Math.max(H,W/ratio)};apply();
 }
 function zoom(f,x,y){
  const r=rect(),u=Math.max(0,Math.min(1,(x-r.left)/Math.max(1,r.width))),t=Math.max(0,Math.min(1,(y-r.top)/Math.max(1,r.height)));
  const w=Math.max(240,Math.min(90000,v.w*f)),h=w*size().h/size().w;
  v={x:v.x+v.w*u-w*u,y:v.y+v.h*t-h*t,w,h};apply();
 }
 function zoomMiddle(f){const r=rect();zoom(f,r.left+r.width/2,r.top+r.height/2)}
 function showDetails(show){drawer.hidden=!show;panel.classList.toggle('has-details',show)}
 function paint(){
  if(!root)return;
  nodes=visibleBranches(root);
  bounds=measureTree(root);
  const edges=tag('g'),labels=tag('g');
  scene.replaceChildren(edges,labels);
  for(const n of nodes){
   if(n.parent){
    const p=n.parent,x1=p.x+p.width-12,x2=n.x-16,mid=(x1+x2)/2;
    const d='M'+x1+' '+p.y+' C'+mid+' '+p.y+' '+mid+' '+n.y+' '+x2+' '+n.y;
    edges.append(attrs(tag('path'),{class:'map-link',d,style:'stroke:'+n.color}));
   }
   const expanded=n.children.length>0&&!n.collapsed;
   const g=attrs(tag('g'),{'data-id':n.id,role:'button',tabindex:0,'aria-label':n.label,
    'aria-expanded':n.children.length?String(expanded):'',
    class:'map-branch '+(n.kind==='root'?'root-node':n.depth===1?'heading-node':'point-node')+(n===active?' selected':'')});
   // Transparent tap target: SVG has no visual cards.
   g.append(attrs(tag('rect'),{x:n.x-16,y:n.y-n.height/2-7,width:n.width+42,height:n.height+18,rx:4,class:'map-branch-hit'}));
   const name=text(n.label,n.x,n.y+5,'map-branch-text');
   attrs(name,{'font-size':n.fontSize,'font-weight':n.depth===0?800:n.depth===1?700:520});
   g.append(name);
   const underY=n.y+Math.max(12,n.fontSize*.65);
   g.append(attrs(tag('line'),{x1:n.x,y1:underY,x2:n.x+n.width-18,y2:underY,stroke:n.color,'stroke-width':n.depth===0?4:2.2,class:'map-branch-underline'}));
   if(n.children.length){
    const cx=n.x+n.width+5,cy=n.y;
    g.append(attrs(tag('circle'),{cx,cy,r:10,fill:n.collapsed?'#fff':n.color,stroke:n.color,'stroke-width':2.2,class:'map-fold-circle'}));
    if(n.collapsed){
     g.append(attrs(tag('path'),{d:'M'+(cx-4)+' '+cy+' h8 M'+cx+' '+(cy-4)+' v8',stroke:n.color,'stroke-width':1.8,class:'map-fold-mark'}));
    }else{
     g.append(attrs(tag('path'),{d:'M'+(cx-4)+' '+cy+' h8',stroke:'#fff','stroke-width':1.8,class:'map-fold-mark'}));
    }
   }
   labels.append(g);
  }
  document.querySelector('#map-count').textContent=nodes.length+' visible branches';
 }
 const find=id=>nodes.find(n=>n.id===id);
 function close(){panel.hidden=true;showDetails(false);active=null;pointers.clear();pinch=null;moved=false;onClose?.()}
 function read(n){
  if(!n)return;const dest=n.link||{path:n.sourcePath||topic,heading:n.section||''};
  close();void readNote(dest.path,dest.heading||'');
 }
 function select(n){
  if(!n)return;
  active=n;
  title.textContent=n.label;
  body.innerHTML=renderMarkdown(n.source||n.label).html;
  document.querySelector('#map-read-note').textContent=n.link?'Open linked note ↗':'Read this in notes ↗';
  showDetails(true);
  paint();
 }
 async function activate(n){
  if(!n)return;
  if(n.children.length){
   toggleBranch(root,n.id);active=null;showDetails(false);paint();fit();return;
  }
  if(n.link?.path&&n.link.path!==topic&&n.depth<7&&!n.loaded){
   n.loaded=true;
   try{
    const linked=noteBranches(await getNote(n.link.path),n.link.path,files);
    n.children=linked.children.slice(0,55);
    const attach=(child,index,parent)=>{
     child.id=parent.id+'-'+index;
     child.parent=parent;
     child.children.forEach((sub,i)=>attach(sub,i,child));
    };
    n.children.forEach((child,i)=>attach(child,i,n));
    if(n.children.length){n.collapsed=false;active=null;showDetails(false);paint();fit();return;}
   }catch(e){n.loaded=false;console.warn('Could not expand linked note',e);}
  }
  select(n);
 }
 scene.addEventListener('click',e=>{
  if(moved)return;
  const branch=e.target.closest('[data-id]');
  if(branch)void activate(find(branch.dataset.id));
 });
 scene.addEventListener('keydown',e=>{
  if(!['Enter',' '].includes(e.key))return;
  const branch=e.target.closest('[data-id]');
  if(!branch)return;
  e.preventDefault();void activate(find(branch.dataset.id));
 });
 svg.addEventListener('wheel',e=>{e.preventDefault();zoom(e.deltaY>0?1.12:.89,e.clientX,e.clientY)},{passive:false});
 const gesture=(a,b)=>({x:(a.x+b.x)/2,y:(a.y+b.y)/2,d:Math.hypot(a.x-b.x,a.y-b.y)});
 svg.addEventListener('pointerdown',e=>{
  if(e.pointerType==='mouse'&&e.button!==0)return;
  // A fresh tap after a pinch must not inherit the previous gesture's click guard.
  if(pointers.size===0)moved=false;
  pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(pointers.size===2){const [a,b]=[...pointers.values()];pinch=gesture(a,b);moved=true}
 });
 svg.addEventListener('pointermove',e=>{
  if(!pointers.has(e.pointerId))return;
  const prev=pointers.get(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(pointers.size>=2){
   const [a,b]=[...pointers.values()],now=gesture(a,b);
   if(pinch){
    zoom(pinch.d/Math.max(1,now.d),now.x,now.y);
    v.x-=(now.x-pinch.x)*v.w/size().w;v.y-=(now.y-pinch.y)*v.h/size().h;apply();
   }pinch=now;moved=true;return;
  }
  const dx=e.clientX-prev.x,dy=e.clientY-prev.y;
  if(Math.abs(dx)+Math.abs(dy)>2){v.x-=dx*v.w/size().w;v.y-=dy*v.h/size().h;apply();moved=true}
 });
 function finish(e){pointers.delete(e.pointerId);pinch=null;if(!pointers.size)setTimeout(()=>{moved=false},80)}
 svg.addEventListener('pointerup',finish);svg.addEventListener('pointercancel',finish);
 document.querySelector('#map-fit').addEventListener('click',fit);
 document.querySelector('#map-zoom-in').addEventListener('click',()=>zoomMiddle(.75));
 document.querySelector('#map-zoom-out').addEventListener('click',()=>zoomMiddle(1.3));
 document.querySelector('#map-close').addEventListener('click',close);
 document.querySelector('#map-back').addEventListener('click',close);
 document.querySelector('#map-detail-close').addEventListener('click',()=>showDetails(false));
 document.querySelector('#map-read-note').addEventListener('click',()=>read(active||root));
 async function open(path){
  if(!isTopic(path))return false;
  topic=path;panel.hidden=false;showDetails(false);status.textContent='Loading topic…';
  try{
   root=noteBranches(await getNote(path),path,files);
   active=null;paint();fit();status.textContent=root.label;
   document.querySelector('#map-current').textContent='Click a branch to reveal the next level · click again to fold';
   document.querySelector('#map-close').focus();return true;
  }catch(e){status.textContent=String(e.message||e);return false}
 }
 return {open,close,isTopic};
}

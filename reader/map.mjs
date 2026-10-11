
import {frontmatter,renderMarkdown,resolveLink} from './markdown.mjs';
const NS='http://www.w3.org/2000/svg';
const tag=t=>document.createElementNS(NS,t);
const attrs=(e,o)=>{Object.entries(o).forEach(([k,v])=>e.setAttribute(k,String(v)));return e};
const text=(s,x,y,c)=>{const e=attrs(tag('text'),{x,y,class:c});e.textContent=s;return e};
const clean=s=>String(s).replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g,'$2').replace(/\[\[([^\]]+)\]\]/g,'$1').replace(/!?\[([^\]]+)\]\([^)]+\)/g,'$1').replace(/[*_~]/g,'').trim();
export const isTopic=p=>/\/Units\/Unit-\d\d\/(?:0[1-9]|[1-9]\d) - .+\.md$/i.test(p)||/\/Topics\/[^/]+\.md$/i.test(p);
function node(s,kind,parent,section='',source=''){
 const n={id:(parent?.id||'')+'-'+(parent?.children.length||0),label:clean(s).slice(0,260),kind,parent,children:[],section,source,link:null,x:0,y:0,width:354,height:76};
 if(parent)parent.children.push(n);return n;
}
export function noteBranches(content,path,paths){
 const parsed=frontmatter(content),lines=parsed.body.split(/\r?\n/);
 const title=parsed.meta.title||clean((lines.find(s=>/^#\s+/.test(s))||'').replace(/^#\s+/,''))||path.split('/').pop().replace(/\.md$/,'');
 const root=node(title,'root',null);root.id='root';
 let sections=[root],section='',list=null,indent=0;
 for(const source of lines){
  const l=source.trim();if(!l||/^---+$/.test(l))continue;
  const h=/^(#{1,6})\s+(.+)/.exec(l);
  if(h){
   const depth=h[1].length;if(depth===1)continue;
   const parent=sections[Math.min(depth-2,sections.length-1)]||root;
   const n=node(h[2],'heading',parent,h[2],source);
   sections=sections.slice(0,depth-1);sections[depth-1]=n;section=h[2];list=null;continue;
  }
  const bullet=/^(\s*)(?:[-*+]|\d+[.)])\s+(.+)$/.exec(source);
  let value=bullet?bullet[2].replace(/^\[[ xX]\]\s+/,''):l;
  if(/^>\s*\[!/.test(value)||/^>{0,1}\s*$/.test(value)||/^~~~/.test(value)||/^\|[-|:\s]+\|?$/.test(value))continue;
  value=value.replace(/^>\s*/, '');
  const base=bullet&&list&&bullet[1].length>indent?list:sections[sections.length-1]||root;
  const n=node(value,bullet?'point':'text',base,section,value);
  if(!n.label){base.children.pop();continue}
  if(bullet){list=n;indent=bullet[1].length}else list=null;
  const w=/!?\[\[([^\]]+)\]\]/.exec(value),m=/\[[^\]]+\]\(([^)]+)\)/.exec(value);
  const target=w?w[1].split('|')[0]:m?m[1]:null;
  if(target)n.link=resolveLink(target,path,paths);
 }
 return root;
}
function lines(s){
 const out=[''];for(const word of String(s).split(/\s+/)){const i=out.length-1;if((out[i]+' '+word).trim().length>31&&out[i])out.push(word);else out[i]=(out[i]+' '+word).trim()}
 return out.slice(0,4);
}
export function measureTree(root){
 let cy=44,deep=0;
 const visit=(n,d)=>{
  n.x=32+460*d;n.width=350;n.lines=lines(n.label);n.height=Math.max(68,24+18*n.lines.length);deep=Math.max(deep,d);
  n.children.forEach(ch=>visit(ch,d+1));
  if(n.children.length)n.y=(n.children[0].y+n.children[n.children.length-1].y)/2;
  else{n.y=cy+n.height/2;cy+=n.height+25}
 };
 visit(root,0);return {width:(deep+1)*460+80,height:Math.max(350,cy+80)};
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
  const edges=tag('g'),cards=tag('g');scene.replaceChildren(edges,cards);
  for(const n of nodes){
   if(n.parent){
    const p=n.parent,turn=(p.x+p.width+n.x)/2;
    edges.append(attrs(tag('path'),{class:'map-link',d:'M'+(p.x+p.width)+' '+p.y+' H'+turn+' V'+n.y+' H'+n.x}));
   }
   const g=attrs(tag('g'),{'data-id':n.id,role:'button',tabindex:0,'aria-label':n.label,class:'map-node '+(n.kind==='root'?'root-node':n.kind==='heading'?'heading-node':'point-node')+(n===active?' selected':'')});
   g.append(attrs(tag('rect'),{x:n.x,y:n.y-n.height/2,width:n.width,height:n.height,rx:12}));
   n.lines.forEach((line,i)=>g.append(text(line,n.x+17,n.y+5+(i-(n.lines.length-1)/2)*18,'map-text')));
   if(n!==root){
    const link=attrs(tag('g'),{'data-open-note':n.id,role:'button',tabindex:0,'aria-label':'Open source note for '+n.label});
    link.append(attrs(tag('rect'),{x:n.x+n.width-43,y:n.y-22,width:40,height:44,rx:8,class:'map-node-action'}));
    link.append(text('↗',n.x+n.width-31,n.y+7,'map-node-icon'));g.append(link);
   }
   cards.append(g);
  }
  document.querySelector('#map-count').textContent=nodes.length+' branches';
 }
 const find=id=>nodes.find(n=>n.id===id);
 function close(){panel.hidden=true;showDetails(false);active=null;pointers.clear();pinch=null;moved=false;onClose?.()}
 function read(n){
  if(!n)return;const dest=n.link||{path:topic,heading:n.section||''};
  close();void readNote(dest.path,dest.heading||'');
 }
 function select(n){
  if(!n)return;active=n;title.textContent=n.label;body.innerHTML=renderMarkdown(n.kind==='heading'?'## '+n.label:n.source||n.label).html;showDetails(true);paint();
 }
 scene.addEventListener('click',e=>{
  if(moved)return;
  const link=e.target.closest('[data-open-note]'),card=e.target.closest('[data-id]');
  if(link)read(find(link.dataset.openNote));else if(card)select(find(card.dataset.id));
 });
 scene.addEventListener('keydown',e=>{
  if(!['Enter',' '].includes(e.key))return;
  const link=e.target.closest('[data-open-note]'),card=e.target.closest('[data-id]');
  if(!link&&!card)return;e.preventDefault();if(link)read(find(link.dataset.openNote));else select(find(card.dataset.id));
 });
 svg.addEventListener('wheel',e=>{e.preventDefault();zoom(e.deltaY>0?1.12:.89,e.clientX,e.clientY)},{passive:false});
 const gesture=(a,b)=>({x:(a.x+b.x)/2,y:(a.y+b.y)/2,d:Math.hypot(a.x-b.x,a.y-b.y)});
 svg.addEventListener('pointerdown',e=>{
  if(e.pointerType==='mouse'&&e.button!==0)return;
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
   root=noteBranches(await getNote(path),path,files);nodes=[];const walk=n=>{nodes.push(n);n.children.forEach(walk)};walk(root);
   bounds=measureTree(root);paint();fit();status.textContent=root.label;
   document.querySelector('#map-current').textContent='Tap a branch · ↗ opens its Markdown topic';
   document.querySelector('#map-close').focus();return true;
  }catch(e){status.textContent=String(e.message||e);return false}
 }
 return {open,close,isTopic};
}

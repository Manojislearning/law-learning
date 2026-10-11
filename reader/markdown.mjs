// Obsidian-compatible, read-only Markdown subset. All source HTML is escaped.
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const slug = s => String(s).toLowerCase().normalize('NFKD').replace(/[^\p{L}\p{N}\s-]/gu,'').trim().replace(/\s+/g,'-') || 'section';
export function frontmatter(raw) {
  const text = String(raw ?? '').replace(/^\uFEFF/, '');
  const m = /^---\s*\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(text), meta = {};
  if (m) for(const line of m[1].split(/\r?\n/)){const p=/^([\w-]+):\s*(.*)$/.exec(line);if(p)meta[p[1]]=p[2].replace(/^(['"])(.*?)\1$/,'$2');}
  return {meta, body: m ? text.slice(m[0].length) : text};
}
const safeUrl = s => {try {const u=new URL(s);return ['https:','http:'].includes(u.protocol)?u.href:null;}catch{return null;}};
export function inline(value) {
  let s=String(value??''), reserved=[];
  const hold = html => {let i=reserved.push(html)-1;return `\x01${i}\x02`};
  s=s.replace(/`([^`\n]+)`/g,(_,c)=>hold(`<code>${esc(c)}</code>`));
  s=s.replace(/!\[\[([^\]]+)\]\]/g,(_,p)=>hold(`<span class="attachment">Attachment: ${esc(p)}</span>`));
  s=s.replace(/\[\[([^\]]+)\]\]/g,(_,body)=>{const [path,...aliases]=body.split('|');const title=aliases.join('|')||path.split('#')[0].split('/').pop()||path;return hold(`<a href="#" class="wiki" data-target="${esc(path.trim())}">${esc(title)}</a>`)});
  s=s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g,(_,a,u)=>hold(`<span class="attachment">Image: ${esc(a||u)}</span>`));
  s=s.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(_,label,d)=>{const url=d.trim().replace(/^<|>$/g,'').split(/\s+["']/)[0],outside=safeUrl(url);if(outside)return hold(`<a href="${esc(outside)}" target="_blank" rel="noreferrer noopener">${esc(label)}</a>`);if(/^[a-z][\w+.-]*:/i.test(url)||url.startsWith('//'))return esc(label);return hold(`<a href="#" class="wiki" data-target="${esc(url)}" data-relative="true">${esc(label)}</a>`)});
  s=esc(s).replace(/\*\*([^*\n]+)\*\*|__([^_\n]+)__/g,'<strong>$1$2</strong>')
    .replace(/~~([^~\n]+)~~/g,'<del>$1</del>')
    .replace(/(?<!\*)\*([^*\n]+)\*(?!\*)|(?<!_)_([^_\n]+)_(?!_)/g,'<em>$1$2</em>');
  return s.replace(/\x01(\d+)\x02/g,(_,n)=>reserved[+n]||'');
}
function tblCells(s){return s.trim().replace(/^\||\|$/g,'').split('|').map(x=>x.trim());}
function tableRule(s){return /^\s*\|?\s*:?-{3,}:?(?:\s*\|\s*:?-{3,}:?)*\s*\|?\s*$/.test(s)}
export function renderMarkdown(raw){
 const {meta,body}=frontmatter(raw),lines=body.replace(/\r\n/g,'\n').split('\n'),out=[],toc=[];
 let i=0;
 while(i<lines.length){let l=lines[i].trim();if(!l){i++;continue;}
  const fence=/^(`{3,}|~{3,})/.exec(l);
  if(fence){const lang=l.slice(fence[0].length).trim(),code=[];i++;while(i<lines.length&&!lines[i].trim().startsWith(fence[0]))code.push(lines[i++]);if(i<lines.length)i++;out.push(`<pre><span class="code-lang">${esc(lang)}</span><code>${esc(code.join('\n'))}</code></pre>`);continue;}
  const h=/^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(l);
  if(h){const level=h[1].length,header=h[2];let id=slug(header),j=2;while(toc.some(t=>t.id===id))id=slug(header)+'-'+j++;toc.push({level,title:header,id});out.push(`<h${level} id="${esc(id)}">${inline(header)}</h${level}>`);i++;continue;}
  if(/^(?:-{3,}|\*{3,}|_{3,})$/.test(l)){out.push('<hr>');i++;continue;}
  if(i+1<lines.length&&l.includes('|')&&tableRule(lines[i+1])){let a=tblCells(l).map(v=>`<th>${inline(v)}</th>`).join('');i+=2;let rows='';while(i<lines.length&&lines[i].trim()&&lines[i].includes('|')){rows+='<tr>'+tblCells(lines[i++]).map(v=>`<td>${inline(v)}</td>`).join('')+'</tr>';}out.push(`<div class="table-wrap"><table><thead><tr>${a}</tr></thead><tbody>${rows}</tbody></table></div>`);continue;}
  if(/^>/.test(l)){const q=[];while(i<lines.length&&/^\s*>/.test(lines[i]))q.push(lines[i++].replace(/^\s*>\s?/,''));const c=/^\[!([\w-]+)\]\s*(.*)/i.exec(q[0]||'');if(c){const title=c[2]||c[1],kind=/warning|caution|danger|important/i.test(c[1])?'warning':'info';out.push(`<aside class="callout ${kind}"><strong>${esc(title)}</strong>${q.slice(1).filter(Boolean).map(v=>`<p>${inline(v)}</p>`).join('')}</aside>`)}else out.push(`<blockquote>${q.filter(Boolean).map(v=>`<p>${inline(v)}</p>`).join('')}</blockquote>`);continue;}
  if(/^\s*(?:[-*+]\s+|\d+[.)]\s+)/.test(lines[i])){const rows=[];while(i<lines.length&&/^\s*(?:[-*+]\s+|\d+[.)]\s+)/.test(lines[i]))rows.push(lines[i++].trim());const ordered=/^\d+[.)]/.test(rows[0]);let html=`<${ordered?'ol':'ul'}>`;for(const row of rows){let content=row.replace(/^(?:[-*+]\s+|\d+[.)]\s+)/,'');const check=/^\[([ xX])\]\s+/.exec(content);if(check)content=content.slice(check[0].length);html+='<li>'+(check?`<span class="check${check[1].toLowerCase()==='x'?' checked':''}">${check[1].toLowerCase()==='x'?'✓':''}</span>`:'')+inline(content)+'</li>';}out.push(html+`</${ordered?'ol':'ul'}>`);continue;}
  const p=[l];i++;while(i<lines.length){const next=lines[i].trim();if(!next||/^(?:#{1,6}\s|>|`{3,}|~{3,}|[-*+]\s|\d+[.)]\s|(?:-{3,}|\*{3,}|_{3,})$)/.test(next)||i+1<lines.length&&next.includes('|')&&tableRule(lines[i+1]))break;p.push(next);i++;}out.push('<p>'+inline(p.join(' '))+'</p>');
 }
 return {html:out.join('\n'),toc,meta,text:body};
}
export function resolveLink(raw,current,paths){
 let target=String(raw||''),hash='';if(target.includes('#')){const pos=target.indexOf('#');hash=target.slice(pos+1);target=target.slice(0,pos)}
 try{target=decodeURIComponent(target)}catch{};
 if(!target)return {path:current,heading:hash};
 if(/^[a-z][\w+.-]*:/i.test(target)||target.startsWith('//'))return null;
 const norm=s=>{const a=[];for(const p of s.replace(/\\/g,'/').split('/')){if(!p||p==='.')continue;if(p==='..')a.pop();else a.push(p)}return a.join('/')};
 const ext=s=>/\.(md|canvas)$/i.test(s)?s:s+'.md',dir=current.split('/').slice(0,-1).join('/'),byPath=new Map(paths.map(p=>[p.toLowerCase(),p]));
 for(const attempt of [target,dir+'/'+target]){const p=byPath.get(norm(ext(attempt)).toLowerCase());if(p)return {path:p,heading:hash};}
 const basename=ext(target.split('/').pop()).toLowerCase(),found=paths.filter(p=>p.toLowerCase().split('/').pop()===basename);
 return found.length===1?{path:found[0],heading:hash}:null;
}

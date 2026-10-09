/* Progressive KSLU 3-year syllabus tree. Preserve verified Semester I content. */
(function(){
"use strict";
var host=document.getElementById("syllabus-detail");
if(!host)return;
var original=document.createElement("div");
while(host.firstChild) original.appendChild(host.firstChild);
var style=document.createElement("style");
style.textContent=`
#syllabus-view>.section-head{display:none}
#syllabus-detail{max-width:700px;margin:auto}
.syl-title{margin:12px 0 20px;font-size:1.6rem}
.syl-node{background:#fff;border:1px solid var(--line);border-radius:16px;margin:9px 0;overflow:hidden}
.syl-node>.syl-children{padding:0 12px 12px}
.syl-node>summary{list-style:none;display:flex;justify-content:space-between;align-items:center;gap:14px;padding:17px;cursor:pointer;font-weight:750}
.syl-node>summary::-webkit-details-marker{display:none}
.syl-node>summary:after{content:"+";font-size:1.3rem;font-weight:450;color:var(--muted)}
.syl-node[open]>summary:after{content:"−"}
.syl-node[open]>summary{border-bottom:1px solid var(--line)}
.syl-hint{padding:16px;font-size:.84rem;color:var(--muted);line-height:1.5}
.syl-node .semester-summary{margin-top:12px}
@media(prefers-reduced-motion:no-preference){.syl-node[open]>.syl-children{animation:syl-in .2s ease both}@keyframes syl-in{from{opacity:.35;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}}
`;
document.head.appendChild(style);
var heading=document.createElement("h2");heading.className="syl-title";heading.textContent="3-Year LL.B Syllabus";host.appendChild(heading);
function node(title,parent){var d=document.createElement("details");d.className="syl-node";var s=document.createElement("summary");s.textContent=title;var c=document.createElement("div");c.className="syl-children";d.append(s,c);parent.appendChild(d);return c;}
function pending(parent){var p=document.createElement("p");p.className="syl-hint";p.textContent="Detailed syllabus not imported yet. Add the official KSLU course outline to populate subjects and units.";parent.appendChild(p);}
for(var year=1;year<=3;year++){
 var yc=node(["First Year","Second Year","Third Year"][year-1],host);
 for(var sem=(year-1)*2+1;sem<=year*2;sem++){
   var sc=node("Semester "+sem,yc);
   if(sem===1){while(original.firstChild)sc.appendChild(original.firstChild);}
   else pending(sc);
 }
}
})();

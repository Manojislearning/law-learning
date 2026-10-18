/* Paper & pen theme v71 — on by default; a switch in Settings turns it off on this device. */
(function(root){
"use strict";
var KEY="law-learning-theme-v1",doc=root.document;
function read(){try{var v=JSON.parse(root.localStorage.getItem(KEY)||"{}");return v&&typeof v==="object"?v:{};}catch(e){return {};}}
function on(){return read().paper!==false;}
function apply(v){doc.documentElement.classList.toggle("paper",v);var m=doc.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",v?"#f3ead6":"#0d1321");}
function set(v){try{root.localStorage.setItem(KEY,JSON.stringify({paper:!!v}));}catch(e){}apply(v);}
apply(on());
function addSwitch(){
 var form=doc.querySelector("#settings-root .settings63-card");
 if(!form||doc.getElementById("settings-paper"))return;
 var label=doc.createElement("label");label.className="paper-toggle";
 var text=doc.createElement("span");text.textContent="Paper and pen style";
 var box=doc.createElement("input");box.type="checkbox";box.id="settings-paper";box.checked=on();
 box.addEventListener("change",function(){set(box.checked);});
 label.append(text,box);
 form.insertBefore(label,form.firstChild);
}
if(doc.readyState==="loading")doc.addEventListener("DOMContentLoaded",addSwitch);else addSwitch();
root.LawPaperTheme={set:set,on:on,key:KEY};
})(window);

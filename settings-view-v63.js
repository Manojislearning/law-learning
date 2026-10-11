/* Local Settings: shares the existing profile key and never changes backup format. */
(function(){
"use strict";
var host=document.getElementById("settings-root");
if(!host)return;
var key="law-learning-profile-v1";
function element(parent,tag,text,className){
 var node=document.createElement(tag);
 if(typeof text==="string")node.textContent=text;
 if(className)node.className=className;
 parent.appendChild(node);return node;
}
function preference(parent,title,type,id,values){
 var label=element(parent,"label",undefined,"settings63-field");
 if(type==="checkbox"){
  var checkbox=document.createElement("input");checkbox.id=id;checkbox.type="checkbox";
  label.appendChild(checkbox);element(label,"span",title);return checkbox;
 }
 element(label,"span",title);
 var input=element(label,"select");input.id=id;
 values.forEach(function(entry){var opt=element(input,"option",entry[1]);opt.value=entry[0];});
 return input;
}
var wrap=element(host,"div",undefined,"settings63");
element(wrap,"h2","Settings");
var form=element(wrap,"form",undefined,"settings63-card");form.noValidate=true;
var goal=preference(form,"Daily study goal","select","settings63-goal",[["5","5 minutes"],["10","10 minutes"],["15","15 minutes"],["20","20 minutes"],["30","30 minutes"]]);
var language=preference(form,"Explanation language","select","settings63-language",[["English","English"],["Kannada","Kannada"]]);
var font=preference(form,"Larger text","checkbox","settings63-large");
var motion=preference(form,"Reduce animations","checkbox","settings63-motion");
var save=element(form,"button","Save settings","settings63-save");save.type="submit";
var status=element(form,"p","", "settings63-status");status.setAttribute("role","status");status.setAttribute("aria-live","polite");
function read(){
 try{
  var raw=JSON.parse(localStorage.getItem(key)||"{}");
  return raw&&typeof raw==="object"&&!Array.isArray(raw)?raw:{};
 }catch(e){return {};}
}
function load(){
 var data=read(),minutes=String(data.goal||"10");
 goal.value=["5","10","15","20","30"].includes(minutes)?minutes:"10";
 language.value=data.language==="Kannada"?"Kannada":"English";
 font.checked=!!data.largeText;motion.checked=!!data.reduceMotion;
}
form.addEventListener("submit",function(e){
 e.preventDefault();
 var data=Object.assign({},read(),{goal:goal.value,language:language.value,
  largeText:font.checked,reduceMotion:motion.checked});
 try{
  localStorage.setItem(key,JSON.stringify(data));
  document.body.classList.toggle("profile-large-text",data.largeText);
  document.body.classList.toggle("profile-motion-off",data.reduceMotion);
  ["profile-goal","profile-language"].forEach(function(id){
   var field=document.getElementById(id);if(field)field.value=id==="profile-goal"?data.goal:data.language;
  });
  var larger=document.getElementById("profile-text"),reduced=document.getElementById("profile-motion");
  if(larger)larger.checked=data.largeText;if(reduced)reduced.checked=data.reduceMotion;
  status.textContent="Settings saved on this device.";
 }catch(error){status.textContent="Could not save settings in this browser.";}
});
if(window.LawAppCore&&window.LawAppCore.router){
 window.LawAppCore.router.subscribe(function(route){if(route==="settings"){load();status.textContent="";}});
}
load();
})();

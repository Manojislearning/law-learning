/* Profile v1: deliberately local-only. Secure online accounts require a backend. */
(function () {
"use strict";
var host=document.getElementById("profile-root");if(!host)return;
var KEY="law-learning-profile-v1";
var OWNED=["law-learning-progress-v2","law-learning-notes-v1",KEY];
var style=document.createElement("style");
style.textContent='.local-profile{max-width:620px;margin:0 auto 50px}.local-profile h2{font-size:1.55rem;margin:12px 0 5px}.local-profile .muted-note{font-size:.86rem;line-height:1.6;color:var(--muted);margin:8px 0 17px}.local-profile section{border:1px solid var(--line);border-radius:17px;background:#fff;padding:18px;margin:13px 0}.local-profile h3{font-size:1.05rem;margin:0 0 14px}.local-profile label{display:block;margin:13px 0;font-size:.86rem;font-weight:700}.local-profile input:not([type=checkbox]),.local-profile select{display:block;width:100%;padding:11px;margin-top:6px;border:1px solid var(--line);border-radius:11px;font:inherit;font-size:16px;color:var(--text);background:#fff}.local-profile .check{display:flex;gap:12px;align-items:center}.local-profile input[type=checkbox]{width:20px;height:20px}.local-profile button{border:1px solid var(--text);background:var(--text);color:white;border-radius:11px;padding:11px 15px;font:inherit;font-weight:750;cursor:pointer;margin:5px 7px 5px 0}.local-profile button.secondary{background:#fff;color:var(--text)}.local-profile small{display:block;color:var(--muted);font-size:.78rem;line-height:1.55;margin-top:10px}.local-profile #profile-status{font-size:.83rem;font-weight:700;min-height:18px}.profile-motion-off *{animation-duration:0s!important;transition-duration:0s!important;scroll-behavior:auto!important}.profile-large-text{font-size:110%}';
document.head.appendChild(style);
host.innerHTML='<div class="local-profile"><h2>Profile</h2><p class="muted-note">Personalise study on this device. No login or password is required.</p>'+
'<section><h3>Study preferences</h3><label>Preferred name<input id="profile-nickname" type="text" maxlength="40" autocomplete="nickname" placeholder="Optional nickname"></label>'+
'<label>Daily study goal<select id="profile-goal"><option value="5">5 minutes</option><option value="10">10 minutes</option><option value="15">15 minutes</option><option value="20">20 minutes</option><option value="30">30 minutes</option></select></label>'+
'<label>Preferred explanation language<select id="profile-language"><option value="English">English</option><option value="Kannada">Kannada</option></select></label>'+
'<small>This preference does not translate lessons automatically. Verified Kannada lessons will be added later.</small>'+
'<label class="check"><input id="profile-motion" type="checkbox"> Reduce animations</label>'+
'<label class="check"><input id="profile-text" type="checkbox"> Larger text</label>'+
'<button id="profile-save" type="button">Save preferences</button><p id="profile-status" role="status" aria-live="polite"></p></section>'+
'<section><h3>Keep a backup</h3><p class="muted-note">Your progress and personal notes currently stay in this browser. You can export them before changing phones or clearing browser data.</p>'+
'<button id="profile-export" type="button">Export data</button><button class="secondary" id="profile-import-start" type="button">Import backup</button>'+
'<input id="profile-import-file" type="file" accept=".json,application/json" hidden>'+
'<small>Exported backups can contain your private notes. Store them securely and do not share them publicly. Importing replaces existing saved app data after confirmation.</small></section>'+
'<section><h3>Account security</h3><p class="muted-note">Guest mode: data is local to this browser, not encrypted account storage and not synchronised across devices. A genuine password or passkey account will require a trusted authentication server.</p></section></div>';
var $=function(id){return document.getElementById(id);};
var defaults={nickname:"",goal:"10",language:"English",reduceMotion:false,largeText:false};
function parseProfile(){try{return Object.assign({},defaults,JSON.parse(localStorage.getItem(KEY)||"{}"));}catch(e){return Object.assign({},defaults);}}
function apply(profile){
 document.body.classList.toggle("profile-motion-off",!!profile.reduceMotion);
 document.body.classList.toggle("profile-large-text",!!profile.largeText);
}
function loadFields(){
 var p=parseProfile();
 $("profile-nickname").value=p.nickname;
 $("profile-goal").value=String(p.goal);
 $("profile-language").value=p.language==="Kannada"?"Kannada":"English";
 $("profile-motion").checked=!!p.reduceMotion;
 $("profile-text").checked=!!p.largeText;
 apply(p);
}
function status(message){$("profile-status").textContent=message;}
$("profile-save").addEventListener("click",function(){
 var p={nickname:$("profile-nickname").value.trim().slice(0,40),goal:$("profile-goal").value,language:$("profile-language").value,reduceMotion:$("profile-motion").checked,largeText:$("profile-text").checked};
 try{localStorage.setItem(KEY,JSON.stringify(p));apply(p);status("Saved on this device.");}
 catch(e){status("Could not save preferences: browser storage is unavailable.");}
});
$("profile-export").addEventListener("click",function(){
 try{
  var records={};OWNED.forEach(function(k){records[k]=localStorage.getItem(k);});
  var backup={app:"law-learning",schema:1,created:new Date().toISOString(),records:records};
  var blob=new Blob([JSON.stringify(backup,null,2)],{type:"application/json"});
  var link=document.createElement("a");var url=URL.createObjectURL(blob);
  link.href=url;link.download="law-learning-backup-"+new Date().toISOString().slice(0,10)+".json";
  document.body.appendChild(link);link.click();link.remove();
  setTimeout(function(){URL.revokeObjectURL(url);},1000);
  status("Backup exported. Keep the file private.");
 }catch(e){status("Export failed: "+e.message);}
});
$("profile-import-start").addEventListener("click",function(){$("profile-import-file").click();});
$("profile-import-file").addEventListener("change",async function(){
 var f=this.files&&this.files[0];this.value="";
 if(!f)return;
 if(f.size>1024*1024){status("Backup is too large; limit 1 MB.");return;}
 try{
  var backup=JSON.parse(await f.text());
  if(!backup||backup.app!=="law-learning"||backup.schema!==1||!backup.records||typeof backup.records!=="object")throw Error("File is not a valid Law Learning backup.");
  var data={};
  OWNED.forEach(function(k){
   if(!(k in backup.records)||backup.records[k]===null)return;
   if(typeof backup.records[k]!=="string")throw Error("Invalid record type.");
   if(k!== "law-learning-notes-v1")JSON.parse(backup.records[k]);
   data[k]=backup.records[k];
  });
  if(!Object.keys(data).length)throw Error("No recognised study data in backup.");
  if(!window.confirm("Replace the saved progress, notes and preferences on this device with the backup?"))return;
  for(var k in data)localStorage.setItem(k,data[k]);
  status("Backup restored. Reloading the app.");
  window.location.reload();
 }catch(e){status("Import failed: "+e.message);}
});
var open=document.getElementById("profile-open");
if(open)open.addEventListener("click",function(){location.hash="profile";});
loadFields();
})();
/* Law Learning backup format. Pure validators shared between the browser and Node tests.
 * Backups are local files, not encrypted cloud accounts.
 */
(function(root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.LawBackupCore = api;
})(typeof globalThis === "object" ? globalThis : this, function() {
  "use strict";
  var APP = "law-learning", VERSION = 2, MAX_BYTES = 1024 * 1024;
  var KEYS = ["law-learning-progress-v2","law-learning-notes-v1","law-learning-profile-v1"];
  var PROGRESS = KEYS[0], NOTES = KEYS[1], PROFILE = KEYS[2];

  function fail(message) { throw new Error(message); }
  function plain(x) { return x !== null && typeof x === "object" && !Array.isArray(x) &&
    (Object.getPrototypeOf(x) === Object.prototype || Object.getPrototypeOf(x) === null); }
  function finiteNonnegative(n) { return typeof n==="number" && Number.isFinite(n) && n>=0; }
  function checkProgress(s) {
    if(!plain(s))fail("Progress must contain an object.");
    var allowed=["currentWord","score","streak","learned","difficult"];
    Object.keys(s).forEach(function(key){ if(!allowed.includes(key))fail("Unknown progress field: "+key); });
    if("currentWord" in s && (!Number.isInteger(s.currentWord)||s.currentWord<0||s.currentWord>100000))fail("Invalid current word.");
    if("score" in s && !finiteNonnegative(s.score))fail("Invalid score.");
    if("streak" in s && !finiteNonnegative(s.streak))fail("Invalid streak.");
    ["learned","difficult"].forEach(function(key){
      if(!(key in s))return;
      if(!Array.isArray(s[key]) || s[key].length>30000 || s[key].some(function(n){return !Number.isInteger(n)||n<0||n>100000;}))fail("Invalid "+key+" list.");
    });
  }
  function checkProfile(profile) {
    if(!plain(profile))fail("Profile must contain an object.");
    var allowed=["nickname","goal","language","reduceMotion","largeText"];
    Object.keys(profile).forEach(function(k){if(!allowed.includes(k))fail("Unknown profile field: "+k);});
    if("nickname" in profile && (typeof profile.nickname!=="string" || profile.nickname.length>40))fail("Invalid nickname.");
    if("goal" in profile && !["5","10","15","20","30"].includes(String(profile.goal)))fail("Invalid study goal.");
    if("language" in profile && !["English","Kannada"].includes(profile.language))fail("Invalid language preference.");
    ["reduceMotion","largeText"].forEach(function(k){
      if(k in profile && typeof profile[k]!=="boolean")fail("Invalid "+k+" setting.");
    });
  }
  function checkedRecords(raw) {
    if(!plain(raw))fail("Backup data must contain a records object.");
    var out=Object.create(null), count=0;
    Object.keys(raw).forEach(function(key){
      if(!KEYS.includes(key))fail("Backup contains an unrecognised storage key.");
      var value=raw[key];
      if(value===null)return; /* A missing record must not erase device data. */
      if(typeof value!=="string")fail("Invalid record contents.");
      if(value.length>700000)fail("An individual backup record is too large.");
      if(key===PROGRESS)checkProgress(JSON.parse(value));
      if(key===PROFILE)checkProfile(JSON.parse(value));
      out[key]=value;count++;
    });
    if(!count)fail("Backup contains no recognised saved records.");
    return out;
  }
  function parseBackup(input) {
    if(typeof input!=="string" || input.length>MAX_BYTES)fail("The backup must be a JSON file under 1 MB.");
    var parsed;
    try{parsed=JSON.parse(input);}catch(e){fail("The backup is not valid JSON.");}
    if(!plain(parsed)||parsed.app!==APP)fail("This is not a Law Learning backup.");
    if(parsed.schema!==1 && parsed.schema!==VERSION)fail("Unsupported backup version. Update the app first.");
    var records=checkedRecords(parsed.records);
    var created=(typeof parsed.created==="string" && Number.isFinite(Date.parse(parsed.created))) ?
      parsed.created : new Date().toISOString();
    return {app:APP,schema:VERSION,created:created,records:records,migratedFrom:parsed.schema===1?1:null};
  }
  function exportBackup(storage, timestamp) {
    var records=Object.create(null),count=0;
    KEYS.forEach(function(key){var value=storage.getItem(key);if(value!==null){records[key]=value;count++;}});
    if(!count)fail("No saved data to export yet.");
    var payload={app:APP,schema:VERSION,created:timestamp||new Date().toISOString(),records:records};
    var body=JSON.stringify(payload,null,2);
    /* Validate our own export before allowing a download. */
    parseBackup(body);
    return body;
  }
  function describe(backup) {
    var b=typeof backup==="string"?parseBackup(backup):backup;
    var keys=Object.keys(b.records),p=b.records[PROGRESS]?JSON.parse(b.records[PROGRESS]):null;
    return {
      hasProgress:keys.includes(PROGRESS),hasNotes:keys.includes(NOTES),
      hasProfile:keys.includes(PROFILE),
      learned:p&&Array.isArray(p.learned)?p.learned.length:0,
      review:p&&Array.isArray(p.difficult)?p.difficult.length:0,
      migratedFrom:b.migratedFrom
    };
  }
  function restoreBackup(storage, input) {
    var b=typeof input==="string"?parseBackup(input):parseBackup(JSON.stringify(input));
    var before=Object.create(null),changed=[];
    var keys=Object.keys(b.records);
    keys.forEach(function(key){before[key]=storage.getItem(key);});
    try{
      keys.forEach(function(key){storage.setItem(key,b.records[key]);changed.push(key);});
    }catch(err){
      var rolledBack=true;
      for(var i=changed.length-1;i>=0;i--){
        try{
          var key=changed[i];
          if(before[key]===null)storage.removeItem(key);
          else storage.setItem(key,before[key]);
        }catch(restoreError){rolledBack=false;}
      }
      fail(rolledBack?"Import failed. Previous data restored.":"Import failed; restoring previous data also failed. Use your original backup.");
    }
    return describe(b);
  }
  return {VERSION:VERSION,KEYS:KEYS.slice(),parseBackup:parseBackup,exportBackup:exportBackup,
    restoreBackup:restoreBackup,describe:describe};
});

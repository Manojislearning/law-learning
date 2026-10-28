import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
const read=f=>fs.readFileSync(new URL("../"+f,import.meta.url),"utf8");
const ctx={window:{}};
for(const f of ["cases-data.js","cases-data-2.js","case-words-data.js"])vm.runInNewContext(read(f),ctx);
const CASES=ctx.window.LAW_CASES_A.concat(ctx.window.LAW_CASES_B),WORDS=ctx.window.LAW_CASE_WORDS;
const MARK=/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

test("every case has an exam-ready summary",()=>{
 assert.ok(CASES.length>=90,"cases: "+CASES.length);
 const ids=new Set();
 for(const c of CASES){
  assert.ok(!ids.has(c.id),"unique "+c.id);ids.add(c.id);
  for(const f of ["name","cite","court","subject","facts","issue","held","rule","exam"])assert.ok(c[f]&&String(c[f]).trim(),c.id+" "+f);
  assert.ok(Number.isInteger(c.year)&&c.year>1400&&c.year<=2026,c.id+" year");
  assert.ok(c.exam.includes(c.year<1500?"Gloucester":String(c.year))||c.exam.includes("("),c.id+" exam line cites the case");
  assert.ok(c.facts.split(/\s+/).length<=70,c.id+" facts are brief");
  assert.doesNotMatch(JSON.stringify(c),/<[a-z]/i,c.id+" plain text only");
 }
});

test("every marked difficult word has a meaning, and is used by some case",()=>{
 const used=new Set();
 for(const c of CASES)for(const f of ["facts","issue","held","rule","exam"])for(const m of String(c[f]).matchAll(MARK)){const k=m[1].toLowerCase();assert.ok(WORDS[k],c.id+": no meaning for "+k);used.add(k);}
 for(const k of Object.keys(WORDS)){assert.ok(used.has(k),"unused word "+k);assert.ok(WORDS[k].m.split(/\s+/).length<=45,k+" meaning is brief");}
 assert.ok(used.size>=80,"words: "+used.size);
});

test("every case named elsewhere in the app has a summary",()=>{
 const aliases=CASES.flatMap(c=>[c.name,...(c.also||[])]).map(a=>a.toLowerCase().replace(/\s+v\.?\s+/g," v ").replace(/[.\s]+/g," ").trim());
 const files=["torts-path-data.js","timelines-data.js","marriage-law-data.js","past-paper-data.js","past-paper-models-1.js","past-paper-models-2.js","kslu-paper-analysis.js","brain-map.js","confusing-words-data.js","contract-unit2-data.js","torts-case-practice-data.js"];
 const re=/\b([A-Z][A-Za-z.&'-]*(?:\s+(?:[A-Z][A-Za-z.&'-]*|of|&))*?)\s+v\.?\s+([A-Z][A-Za-z.&'-]*(?:\s+(?:[A-Z][A-Za-z.&'-]*|of|&))*)/g;
 const missing=new Set();
 for(const f of files)for(const m of read(f).matchAll(re)){
  const name=(m[1]+" v "+m[2]).replace(/^(In|See|Cf)\s+/,"").replace(/[).,]+$/,"");
  const n=name.toLowerCase().replace(/[.\s]+/g," ").trim();
  if(!aliases.some(a=>n.includes(a)||a.includes(n)))missing.add(name+" ("+f+")");
 }
 const allowed=[...missing].filter(x=>!/^Retd/.test(x));
 assert.deepEqual(allowed,[],"Cases without a summary");
});

test("Case Book is wired into the app",()=>{
 const html=read("index.html"),sw=read("sw.js"),view=read("case-book.js");
 for(const f of ["./cases-data.js?v=81","./cases-data-2.js?v=81","./case-words-data.js?v=81","./case-book.js?v=81","./case-book.css?v=81"])assert.ok(sw.includes(f)&&html.includes(f.slice(2)),f);
 assert.ok(html.indexOf("case-words-data.js")<html.indexOf("case-book.js"));
 assert.ok(html.includes('data-open="cases"')&&html.includes('id="cases-view"'));
 assert.ok(read("app-core.js").includes('cases:["Exam-ready case summaries","Case Book"]'));
 assert.doesNotMatch(view,/innerHTML|addEventListener\("hashchange"|\(\?<[!=]/,"no innerHTML, no own hashchange, no look-behind regex");
 assert.match(view,/rel="noopener noreferrer"/);
});

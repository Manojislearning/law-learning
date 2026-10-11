import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import vm from "node:vm";
const file=name=>readFileSync(new URL("../"+name,import.meta.url),"utf8");

test("Two levels preserve all 415 legal word IDs and append 115 unique answer-writing words",()=>{
  const ctx={window:{}};
  for(let i=1;i<=4;i++)vm.runInNewContext(file("exam-words-"+i+".js"),ctx);
  vm.runInNewContext(file("advanced-english-words.js"),ctx);
  assert.equal(ctx.window.LAW_ADVANCED_ENGLISH_ROWS.length,115);
  const app=file("app.js"),cut=app.indexOf("const KSLU_FIRST_SEMESTER =");
  assert.ok(cut>0);
  const items=vm.runInNewContext(app.slice(0,cut)+"\nWORDS.map(w=>({term:w.term,category:w.category,example:w.examples?.[0],definition:w.definition}));",ctx,{timeout:3000});
  assert.equal(items.length,530);
  assert.equal(items.filter(w=>w.category!=="Advanced English").length,415);
  assert.deepEqual(Array.from(items).slice(0,3).map(w=>w.term),["Affidavit","Appeal","Bail"]);
  assert.equal(items.filter(w=>w.category==="Advanced English").length,115);
  assert.deepEqual(Array.from(items).slice(415,419).map(w=>w.term),["Cogent","Tenable","Untenable","Plausible"]);
  const terms=items.map(w=>w.term.toLowerCase());
  assert.equal(new Set(terms).size,terms.length,"Duplicated spelling across levels");
  for(const item of items.slice(415)){
    assert.ok(item.definition.length>=20,"Missing meaningful definition: "+item.term);
    assert.ok(item.example.includes(" ")&&item.example.length>=35,"Missing legal writing example: "+item.term);
  }
});

test("Existing local review and score indexes remain stable, and each level navigates independently",()=>{
  const js=file("word-experience.js");
  const html=file("index.html"),sw=file("sw.js");
  assert.match(html,/advanced-english-words\.js\?v=58/);
  assert.ok(html.indexOf("advanced-english-words.js")<html.indexOf("app.js?v=58"));
  assert.match(html,/word-experience\.js\?v=62/);
  assert.ok(js.includes('law-learning-word-level-v1'));
  assert.ok(js.includes('LAW_ADVANCED_ENGLISH')===false,"Level selection should be based on normalized word categories");
  assert.ok(js.includes("function nextWordIndex()"));
  assert.ok(js.includes("function previousWord()"));
  assert.ok(js.includes("window.LawAppCore.progress.mark"));
  assert.ok(!js.includes('#home-view .home-card:not('),"Old home filtering must not hide Law News or Case Practice");
  assert.ok(sw.includes("law-learning-v63"));
  for(const asset of ["./advanced-english-words.js?v=58","./readability.css?v=58","./app.js?v=58","./word-experience.js?v=62"])assert.ok(sw.includes(asset),"Missing offline asset "+asset);
});

test("Typography stays readable on small screens and remains anchored to CSS units",()=>{
  const css=file("readability.css");
  assert.match(css,/html\{font-size:17px\}/);
  assert.ok(css.includes(".news-brief .news-excerpt"));
  assert.ok(css.includes(".word-v19 .w-p"));
  assert.ok(css.includes(".w-levels"));
  assert.ok(css.includes("max-width:370px"));
});

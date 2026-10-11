import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=file=>readFileSync(new URL("../"+file,import.meta.url),"utf8");
const html=read("index.html"),word=read("word-experience.js"),css=read("menu-simple.css"),core=read("app-core.js");
test("Home presents concise navigation labels without explanatory subheadlines",()=>{
 const home=html.split('<section id="home-view"')[1].split('<section id="student-view"')[0];
 const grid=home.split('<div class="home-grid">')[1].split("</div>")[0];
 const labels=[...grid.matchAll(/<strong>([^<]+)<\/strong>/g)].map(v=>v[1]);
 assert.deepEqual(labels,["Learn Words","Student","Law Notes","Exam Pattern","Notes","Important Links"]);
 assert.ok(!/<p>|<small>|home-index/.test(grid),"Home navigation must not show secondary subtitles");
 assert.equal((home.match(/data-open="words"/g)||[]).length,1);
 for(const forbidden of ["Two levels:","KSLU · 3-Year LL.B</p>","rounded Markdown cards","Understand how your Semester"])
  assert.ok(!home.includes(forbidden),"Unwanted Home subheading: "+forbidden);
 for(const label of ["Current Law Check","Law News","Case Practice","Review","Continue Contract–I"])
  assert.ok(home.includes(">"+label+"<"),"Home navigation item missing: "+label);
});
test("Student menu lists only the four original destinations and no descriptive lines",()=>{
 const hub=html.split('<section id="student-view"')[1].split('<section id="words-view"')[0];
 const nav=hub.split('<nav class="student-hub-grid"')[1].split("</nav>")[0];
 assert.deepEqual([...nav.matchAll(/<strong>([^<]+)<\/strong>/g)].map(m=>m[1]),[
  "Syllabus","Topic Brain Branches","Subjects","Exam Papers &amp; Answers"
 ]);
 assert.ok(!/<p>|<small>|student-hub-number|student-hub-footnote/.test(nav));
 assert.ok(nav.includes('href="./reader/?map=1"'));
 assert.ok(css.includes("min-height:76px"),"Menu is expected to be compact");
});
test("Learn Words shows Legal Words and Difficult Words without level names, preserving category and progress storage",()=>{
 assert.ok(core.includes('words:["Legal vocabulary","Learn Words"]'));
 assert.ok(word.includes('<strong>Legal Words</strong>'));
 assert.ok(word.includes('<strong>Difficult Words</strong>'));
 assert.ok(!word.includes('<span>LEVEL 1</span>'));
 assert.ok(!word.includes('<span>LEVEL 2</span>'));
 assert.ok(!word.includes('<small>Words for notes & answers</small>'));
 assert.ok(word.includes('law-learning-word-level-v1'));
 assert.ok(word.includes('word.category==="Advanced English"'),"Retain saved index mapping");
 assert.ok(css.includes("#section-kicker{display:none"));
});

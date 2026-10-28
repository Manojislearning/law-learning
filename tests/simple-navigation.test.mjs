import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=file=>readFileSync(new URL("../"+file,import.meta.url),"utf8");
const html=read("index.html"),word=read("word-experience.js"),css=read("menu-simple.css"),core=read("app-core.js");
test("Home presents concise navigation labels without explanatory subheadlines",()=>{
 const home=html.split('<section id="home-view"')[1].split('<section id="student-view"')[0];
 const grid=home.split('<div class="home-grid">')[1].split("</div>")[0];
 const labels=[...grid.matchAll(/<strong>([^<]+)<\/strong>/g)].map(v=>v[1]);
 assert.deepEqual(labels,["Games","Student"]);
 assert.ok(!/<p>|<small>|home-index/.test(grid),"Home navigation must not show secondary subtitles");
 assert.equal((home.match(/data-open="words"/g)||[]).length,1);
 for(const forbidden of ["Two levels:","KSLU · 3-Year LL.B</p>","rounded Markdown cards","Understand how your Semester"])
  assert.ok(!home.includes(forbidden),"Unwanted Home subheading: "+forbidden);
 for(const label of ["Law Updates","Law News","Case Practice","Review"])
  assert.ok(home.includes(">"+label+"<"),"Home navigation item missing: "+label);
});
test("Student menu groups ten destinations without descriptions",()=>{
 const hub=html.split('<section id="student-view"')[1].split('<section id="lawnotes-view"')[0];
 assert.deepEqual([...hub.matchAll(/<h3 class="student-group">([^<]+)<\/h3>/g)].map(m=>m[1]),["Study","Exams","You and links"]);
 assert.deepEqual([...hub.matchAll(/<strong>([^<]+)<\/strong>/g)].map(m=>m[1]),[
  "Law Notes","Timelines","Syllabus","Subjects","Continue Contract–I","Exam Papers &amp; Answers","Exam Pattern","Profile","Settings","Important Links"
 ]);
 assert.ok(!/<p>|<small>|student-hub-number|student-hub-footnote/.test(hub));
 assert.ok(!hub.includes('href="./reader/'),"Law Notes open inside the app, not the separate reader");
 assert.ok(hub.includes('data-open="lawnotes"'));
 assert.ok(hub.includes('data-open="settings"'));
 assert.ok(css.includes("min-height:76px"),"Menu is expected to be compact");
});
test("Learn Words shows Legal Words and Difficult Words without level names, preserving category and progress storage",()=>{
 assert.ok(core.includes('words:["Word games","Games"]'));
 assert.ok(word.includes('<strong>Legal Words</strong>'));
 assert.ok(word.includes('<strong>Difficult Words</strong>'));
 assert.ok(!word.includes('<span>LEVEL 1</span>'));
 assert.ok(!word.includes('<span>LEVEL 2</span>'));
 assert.ok(!word.includes('<small>Words for notes & answers</small>'));
 assert.ok(word.includes('law-learning-word-level-v1'));
 assert.ok(word.includes('word.category==="Advanced English"'),"Retain saved index mapping");
 assert.ok(css.includes("#section-kicker{display:none"));
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import vm from 'node:vm';

const ROOT = resolve(import.meta.dirname, '..');
const file = (name) => readFileSync(join(ROOT, name), 'utf8');
const html = file('index.html');
const sw = file('sw.js');

function localPath(rel) {
  if (!rel.startsWith('./')) return null;
  return rel.slice(2).split('?')[0].split('#')[0];
}
function allJs(directory='') {
  return readdirSync(join(ROOT,directory), {withFileTypes:true}).flatMap(entry => {
    const p=join(directory,entry.name);
    if(entry.isDirectory()) return ['node_modules','.git'].includes(entry.name)?[]:allJs(p);
    return p.endsWith('.js') || p.endsWith('.mjs') ? [p] : [];
  });
}
function getAssets() {
  const match = sw.match(/const ASSETS\s*=\s*(\[[\s\S]*?\])\s*;/);
  assert.ok(match,'Service worker must define a literal ASSETS array');
  return JSON.parse(match[1]);
}

test('Every JavaScript file passes node --check', () => {
  const scripts = allJs();
  assert.ok(scripts.length >= 5, 'Expected the application source files');
  for (const path of scripts) {
    assert.doesNotThrow(() => execFileSync(process.execPath, ['--check', join(ROOT,path)], {stdio:'pipe'}), path);
  }
});

test('Every local HTML script/stylesheet reference exists', () => {
  const matches = [...html.matchAll(/<(?:script|link)\b[^>]*?\b(?:src|href)=["'](\.[^"']+)["']/g)].map(m=>m[1]);
  assert.ok(matches.length >= 9,'Expected linked application assets');
  for(const ref of matches) {
    const path=localPath(ref);
    if(!path)continue;
    assert.ok(existsSync(join(ROOT,path)),'Missing HTML asset: '+ref);
  }
});

test('Service worker assets exist and include linked scripts', () => {
  const assets = getAssets();
  assert.ok(assets.includes('./index.html'),'Missing index in PWA cache');
  for(const ref of assets){
    const path=localPath(ref);
    if(!path)continue;
    assert.ok(existsSync(join(ROOT,path)),'Stale/offline asset missing: '+ref);
  }
  const scripts=[...html.matchAll(/<script[^>]+src=["'](\.[^"']+)["']/g)].map(m=>m[1]);
  for(const ref of scripts){
    assert.ok(assets.includes(ref),'HTML script absent from offline assets: '+ref);
  }
});

test('Every home navigation item points to a real route', () => {
  const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map(m=>m[1]));
  const routes = [...html.matchAll(/\bdata-open=["']([a-z]+)["']/g)].map(m=>m[1]);
  assert.ok(routes.includes('words'));
  assert.ok(routes.includes('syllabus'));
  assert.ok(routes.includes('subjects'));
  for(const route of routes)assert.ok(ids.has(route+'-view'),'Missing view for '+route);
});

test('Static HTML has no duplicate element IDs', () => {
  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map(m=>m[1]);
  const repeated=ids.filter((id,i)=>ids.indexOf(id)!==i);
  assert.deepEqual([...new Set(repeated)],[],'Duplicate IDs cause incorrect UI selectors');
});

test('Four exam word source files load valid unique terms', () => {
  const context={window:{}};
  for(let i=1;i<=4;i++)vm.runInNewContext(file('exam-words-'+i+'.js'),context,{timeout:1500});
  const rows=context.window.EXAM_WORD_ROWS;
  assert.ok(Array.isArray(rows) && rows.length >= 350,'Missing exam word dataset');
  const seen=new Set();
  for(const row of rows){
    assert.ok(Array.isArray(row) && row.length >= 3,'Malformed word row');
    assert.ok(row[0] && row[1] && row[2],'Missing word/definition/category');
    assert.ok(!seen.has(row[0].trim().toLowerCase()),'Duplicate term: '+row[0]);
    seen.add(row[0].trim().toLowerCase());
  }
});

test('KSLU imported Semester I syllabus remains intact', () => {
  const source=file('app.js');
  const start=source.indexOf('const KSLU_FIRST_SEMESTER = ');
  const end=source.indexOf('const PRACTICE_QUESTIONS =',start);
  assert.ok(start>0 && end>start,'Syllabus source could not be found');
  const data=vm.runInNewContext(source.slice(start,end)+'\nKSLU_FIRST_SEMESTER;',{}, {timeout:1000});
  assert.equal(data.courses.length,6);
  data.courses.forEach(course=>{
    assert.ok(course.name);
    assert.equal(course.units.length,5,'Unexpected unit count in '+course.name);
    course.units.forEach(unit=>assert.ok(unit.text && unit.title && unit.unit));
  });
});

test('Model exam answers include sources and substantial coverage', () => {
  const context={window:{}};
  vm.runInNewContext(file('past-paper-data.js'),context,{timeout:1500});
  const papers=context.window.LAW_PAST_ANSWERS;
  assert.ok(papers.length>=2,'Expected two published model answers');
  for(const q of papers){
    assert.ok(q.id&&q.title&&q.paper&&q.unit&&q.marks);
    assert.ok(q.sections.length>=6,'Model answer too shallow');
    assert.ok(q.sources.length>=1);
    assert.ok(q.sources.every(source=>/^https:\/\//.test(source[1])),'Source link must use HTTPS');
  }
});

test('Local learning progress and secure account limitations documented',()=>{
  const app=file('app.js');
  assert.ok(app.includes('localStorage'),'Progress storage behaviour unexpectedly changed');
  const plan=file('docs/kslu-first-year-masterplan.md');
  assert.ok(plan.includes('REQUIRES BACKEND'),'Security dependencies must remain explicit');
});


test('Shared app core loads before app initialization and active scripts have one router',()=>{
  const scripts=[...html.matchAll(/<script[^>]+src=["'](\.[^"']+\.js(?:\?[^"']*)?)["']/g)].map(m=>m[1].slice(2).split('?')[0]);
  const core=scripts.indexOf('app-core.js'),app=scripts.indexOf('app.js');
  assert.ok(core>=0 && app>core,'The shared core must load before app.js');
  assert.equal(scripts.filter(x=>x==='app-core.js').length,1);
  const externalRouters=scripts.filter(x=>x!=='app-core.js').filter(x=>{
    const source=file(x);
    return /addEventListener\s*\(\s*["']hashchange["']/.test(source);
  });
  assert.deepEqual(externalRouters,[],'Feature modules must subscribe to LawAppCore.router');
  assert.ok(file('legacy-study-ui.js').includes('LawAppCore.router.start()'),'Legacy renderer must start the shared router');
  assert.ok(!file('app.js').includes('function setupNavigation('),'App data module must not contain legacy renderer');
  const order=scripts.indexOf('legacy-study-ui.js');
  assert.ok(order>app && order<scripts.indexOf('word-experience.js'),'Legacy renderer must boot after data and before modern study UI');
  assert.ok(file('word-experience.js').includes('LawAppCore.progress.mark'),'Word game must use shared progress reducer');
});

test('Retired duplicate UI scripts are not loaded or cached',()=>{
  const unused=['compact-words.js','syllabus-tree.js','syllabus-learning.js'];
  for(const script of unused){
    assert.ok(!html.includes(script),'Obsolete UI unexpectedly loaded: '+script);
    assert.ok(!sw.includes(script),'Obsolete UI unexpectedly cached: '+script);
  }
});

import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const Core=require('../app-core.js');

function storage(initial){
 const data=new Map(Object.entries(initial||{}));
 return {getItem:k=>data.has(k)?data.get(k):null,
   setItem:(k,v)=>data.set(k,String(v)),
   removeItem:k=>data.delete(k),
   snapshot:()=>Object.fromEntries(data)};
}
function mockBrowser(initial){
 const listeners={hashchange:[],click:[]},els=new Map();
 function view(id){
   const el={id:id,hidden:false,classList:{active:false,
     toggle(name,bool){if(name==='active')this.active=!!bool;}},textContent:''};
   els.set(id,el);return el;
 }
 const home=view('home-view'),words=view('words-view'),syllabus=view('syllabus-view'),
 subjects=view('subjects-view'),profile=view('profile-view'),back=view('back-home'),
 kicker=view('section-kicker'),title=view('section-title');
 const doc={getElementById:(id)=>els.get(id)||null,
    querySelectorAll:(sel)=>sel==='.main-view'?[words,syllabus,subjects,profile]:[],
    addEventListener:(type,callback)=>{(listeners[type]||=[]).push(callback);}};
 const win={_hash:initial||'',scrollCalls:[],console:{error(){return;}},
   addEventListener:(type,cb)=>{(listeners[type]||=[]).push(cb);},
   scrollTo(options){this.scrollCalls.push(options);}};
 win.location={
   get hash(){return win._hash;},
   set hash(value){win._hash=value;listeners.hashchange.forEach(fn=>fn());}
 };
 function click(target){let prevented=false;listeners.click.forEach(fn=>fn({
  target:{closest(selector){if(selector==='#back-home'&&target==='back')return back;
   if(selector==='.home-card[data-open]'&&typeof target==='string'&&target!=='back')
    return {dataset:{open:target}};return null;}},
  preventDefault(){prevented=true;}
 }));return prevented;}
 return {win,doc,home,words,syllabus,subjects,profile,back,kicker,title,click,listeners};
}
test('Progress loader uses existing key and preserves earned points and reviewed word IDs',()=>{
 const key='law-learning-progress-v2';
 const saved={currentWord:17,score:119,learned:[3,9],difficult:[6],streak:4};
 const store=storage({[key]:JSON.stringify(saved)});
 const progress=Core.createProgress(store);
 const state=progress.load();
 assert.equal(state.currentWord,17);
 assert.equal(state.score,119);
 assert.deepEqual([...state.learned],[3,9]);
 assert.deepEqual([...state.difficult],[6]);
 progress.mark(state,18,false,{firstPoints:10});
 assert.equal(state.score,129);
 assert.equal(progress.save(state),true);
 assert.deepEqual(JSON.parse(store.getItem(key)).learned,[3,9,18]);
 assert.equal(JSON.parse(store.getItem(key)).currentWord,17);
});
test('Legacy marking rules retain repeat points and review behaviour',()=>{
 const store=storage();
 const p=Core.createProgress(store),state=p.load();
 p.mark(state,2,false,{firstPoints:10,repeatPoints:3});
 p.mark(state,2,false,{firstPoints:10,repeatPoints:3});
 p.mark(state,2,true,{reviewPoints:1,removeLearned:false});
 assert.equal(state.score,14);assert.equal(state.streak,0);
 assert.equal(state.learned.has(2),true);assert.equal(state.difficult.has(2),true);
 p.mark(state,2,false,{firstPoints:10,repeatPoints:0});
 assert.equal(state.difficult.has(2),false);
});
test('New-game marking clears learned status for future revision',()=>{
 const state=Core.createProgress(storage()).load();
 Core.createProgress(storage()).mark(state,2,false);
 Core.createProgress(storage()).mark(state,2,true);
 assert.equal(state.learned.has(2),false);
 assert.equal(state.difficult.has(2),true);
});
test('Malformed saved JSON and invalid indices cannot crash learning setup',()=>{
 const bad=Core.createProgress(storage({'law-learning-progress-v2':'{"learned":[-3,"abc"],"score":"oops","currentWord":-4}'})).load();
 assert.deepEqual([...bad.learned],[]);
 assert.equal(bad.score,0);assert.equal(bad.currentWord,0);
 const invalid=Core.createProgress(storage({'law-learning-progress-v2':'bad json'})).load();
 assert.equal(invalid.streak,0);
});
test('One router drives home, syllabus and profile and notifies subscribers',()=>{
 const b=mockBrowser('#words'),r=Core.createRouter(b.win,b.doc),events=[];
 const unsubscribe=r.subscribe((to,from)=>events.push([to,from]));
 r.start();r.start();
 assert.equal(b.words.classList.active,true);
 assert.equal(b.home.classList.active,false);
 assert.equal(b.title.textContent,'Words');
 assert.equal(b.listeners.hashchange.length,1,'Only one browser hash listener');
 assert.equal(b.click('syllabus'),true);
 assert.equal(b.syllabus.classList.active,true);
 assert.equal(b.back.hidden,false);
 assert.equal(b.click('back'),true);
 assert.equal(b.home.classList.active,true);
 assert.equal(b.back.hidden,true);
 r.navigate('profile');assert.equal(b.profile.classList.active,true);
 assert.deepEqual(events.at(-1),['profile','home']);
 unsubscribe();r.navigate('words');assert.equal(events.length,4);
});
test('Unknown or missing route safely displays home instead of breaking UI',()=>{
 const b=mockBrowser('#does-not-exist'),r=Core.createRouter(b.win,b.doc);
 r.start();assert.equal(r.current(),'home');
 assert.equal(b.home.classList.active,true);
 assert.equal(r.navigate('brainmap'),'home','Standalone brain map is not an in-page route');
 assert.equal(r.navigate('subjects'),'subjects');
});
test('Core UI primitives use textContent instead of interpreting HTML',()=>{
 const listeners={};
 const doc={createElement(tag){return {tagName:tag,textContent:'',className:'',type:'',addEventListener:(t,cb)=>listeners[t]=cb};}};
 const n=Core.ui.node(doc,'strong','<script>alert(1)</script>','label');
 assert.equal(n.textContent,'<script>alert(1)</script>');
 const b=Core.ui.button(doc,'Open',()=>{},'test');
 assert.equal(b.type,'button');assert.equal(b.textContent,'Open');
 assert.equal(typeof listeners.click,'function');
});

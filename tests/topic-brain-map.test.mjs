import assert from 'node:assert/strict';
import {isTopic,noteBranches,measureTree} from '../reader/map.mjs';
const topic='01-Semester-1/Constitutional-Law-I/Units/Unit-01/01 - Meaning and definition of Constitution.md';
const related='01-Semester-1/Constitutional-Law-I/Units/Unit-01/03 - Constitutionalism.md';
assert.equal(isTopic(topic),true);
assert.equal(isTopic('01-Semester-1/Constitutional-Law-I/Units/Unit-01/00 - Unit 1.md'),false);
assert.equal(isTopic('01-Semester-1/00 - Semester I Notes.md'),false);
assert.equal(isTopic('01-Semester-1/Constitutional-Law-I/Topics/Preamble.md'),true);
const note='# A Constitution\n\n## Meaning\n\n- Fundamental legal framework\n- [[03 - Constitutionalism|Constitutionalism]]\n\n## Rights\n\n- Individual liberty\n- Fundamental rights';
const root=noteBranches(note,topic,[topic,related]);
assert.equal(root.label,'A Constitution');
assert.equal(root.children.length,2);
assert.equal(root.children[0].label,'Meaning');
assert.equal(root.children[1].label,'Rights');
const linked=root.children[0].children.find(n=>n.label==='Constitutionalism');
assert.equal(linked.link.path,related,'Branch link must resolve back to Markdown topic');
assert.equal(linked.section,'Meaning');
const bounds=measureTree(root);
assert.ok(bounds.width>1000 && bounds.height>300);
const nodes=[];const visit=n=>{nodes.push(n);n.children.forEach(visit)};visit(root);
assert.ok(nodes.every(n=>Number.isFinite(n.x)&&Number.isFinite(n.y)));
for(const a of nodes){for(const b of nodes){
 if(a===b||a.x!==b.x)continue;
 assert.ok(Math.abs(a.y-b.y)>=(a.height+b.height)/2,'Same-column branch boxes must not overlap');
}}
console.log('Topic-only brain map: Markdown grouping, source backlinks, depth and collision checks passed.');

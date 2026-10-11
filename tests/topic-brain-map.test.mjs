import assert from 'node:assert/strict';
import {isTopic,noteBranches,measureTree,visibleBranches,toggleBranch,focusBranch} from '../reader/map.mjs';

const topic='01-Semester-1/Constitutional-Law-I/Units/Unit-01/01 - Meaning and definition of Constitution.md';
const related='01-Semester-1/Constitutional-Law-I/Units/Unit-01/03 - Constitutionalism.md';
assert.equal(isTopic(topic),true);
assert.equal(isTopic('01-Semester-1/Constitutional-Law-I/Units/Unit-01/00 - Unit 1.md'),false);
assert.equal(isTopic('01-Semester-1/00 - Semester I Notes.md'),false);
assert.equal(isTopic('01-Semester-1/Constitutional-Law-I/Topics/Preamble.md'),true);

const note=[
 '# A Constitution',
 '*The rulebook of a country*',
 '## Meaning',
 'A constitution is the supreme legal framework.',
 '- **Institutions:** Creates and regulates the judiciary.',
 '- [[03 - Constitutionalism|Constitutionalism]]',
 '## Rights',
 '- Individual liberty',
 '- Fundamental rights',
 '## Write in the exam',
 '**Definition:** The higher framework of law.',
].join('\n');
const root=noteBranches(note,topic,[topic,related]);
assert.equal(root.label,'A Constitution');
assert.equal(root.children.length,3);
assert.deepEqual(root.children.map(n=>n.label),['Meaning','Rights','Write in the exam']);
assert.equal(root.children[0].collapsed,true,'Direct headings start folded');
assert.deepEqual(visibleBranches(root).map(n=>n.label),['A Constitution','Meaning','Rights','Write in the exam'],
 'Opening map reveals only root and immediate branches');
assert.equal(visibleBranches(root).some(n=>n.label==='Institutions'),false);
let b=measureTree(root);
assert.ok(b.width>300&&b.height>220);
let list=visibleBranches(root);
for(const a of list)for(const other of list){
 if(a===other||a.x!==other.x)continue;
 assert.ok(Math.abs(a.y-other.y)>=(a.height+other.height)/2,'Visible same-column branches do not overlap');
}
const focus=focusBranch(root,root.children[0].id);
assert.equal(focus.label,'Meaning');
assert.deepEqual(visibleBranches(focus).map(n=>n.label),
 ['Meaning','A constitution is the supreme legal framework.','Institutions','Constitutionalism']);
assert.equal(focus.depth,1,'An originally nested branch retains source relationship prior to relayout');
const focusedSize=measureTree(focus);
assert.ok(focusedSize.width>100&&focusedSize.height>100);
assert.equal(focus.x,40,'Focused branch starts at the root coordinate');
assert.equal(focus.depth,0,'Focused branch becomes the visual root');
assert.ok(focus.lines.every(line=>line.length>0));
const longBranch=noteBranches('# Issue\\n## Introduction\\n'+
 'Article 14 of the Constitution of India prohibits the State from denying to any person equality before the law and the equal protection of the laws within India. '+
 'This has broad implications for public authorities and administrative decisions.',topic,[]);
const longPoint=longBranch.children[0].children[0];
const longFocus=focusBranch(longBranch,longBranch.children[0].id);
measureTree(longFocus);
assert.ok(longPoint.lines.length>=3,'Long legal text wraps into multiple readable lines');
assert.ok(longPoint.width<=450,'Long legal text must not extend as an unbounded line');
const reset=focusBranch(root,root.id);
assert.equal(reset,root);
assert.deepEqual(visibleBranches(root).map(n=>n.label),['A Constitution','Meaning','Rights','Write in the exam'],
 'Returning to main topic restores immediate branches');
assert.equal(toggleBranch(root,root.children[0].id),false);
list=visibleBranches(root);
assert.equal(list.some(n=>n.label==='Institutions'),true,'Clicking Meaning reveals its immediate subbranches');
assert.equal(list.some(n=>/Creates and regulates/.test(n.label)),false,'Nested text remains hidden');
const key=root.children[0].children.find(n=>n.label==='Institutions');
assert.ok(key);
assert.equal(toggleBranch(root,key.id),false);
assert.equal(visibleBranches(root).some(n=>/Creates and regulates/.test(n.label)),true);
const linked=root.children[0].children.find(n=>n.label==='Constitutionalism');
assert.equal(linked.link.path,related,'Wiki-link resolves to Markdown topic');
assert.equal(linked.sourcePath,topic,'Original source note path is preserved');
assert.equal(toggleBranch(root,root.children[0].id),true);
assert.deepEqual(visibleBranches(root).map(n=>n.label),['A Constitution','Meaning','Rights','Write in the exam']);
assert.equal(toggleBranch(root,root.children[0].id),false,'Reopen previous branch');
assert.equal(visibleBranches(root).some(n=>/Creates and regulates/.test(n.label)),true,
 'Expanded grandchild remains available until that branch is collapsed');
b=measureTree(root);
assert.ok(b.width>600);
console.log('Progressive Brain Branches: first-level only, reveal, collapse, links, colors and layout passed.');

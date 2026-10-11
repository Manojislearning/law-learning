import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {esc, slug, renderMarkdown, resolveLink, frontmatter, inline} from '../reader/markdown.mjs';
const doc=`---
type: syllabus-unit
status: syllabus-mapped-not-exam-ready
---
# Constitutional Law I

> [!warning] Historical source
> Verify current statute.

## Unit I — Preamble

- [ ] Define Constitution
- [x] Explain [[Constitutionalism|constitutionalism]]
- Refer to [[01-Semester-1/Constitutional-Law-I/Unit-01 - Constitution and Preamble]]

| Topic | Page |
| --- | --- |
| Rights | 12 |

\`\`\`js
const x = '<script>alert(1)</script>'
\`\`\`

[Open official law](https://legislative.gov.in)
<script>alert('hacked')</script>
[malicious](javascript:alert(1))
`;
const result=renderMarkdown(doc);
assert.equal(result.meta.status,'syllabus-mapped-not-exam-ready');
assert.equal(result.toc.length,2);
assert.match(result.html,/class="callout warning"/);
assert.match(result.html,/class="wiki"/);
assert.match(result.html,/<table>/);
assert.match(result.html,/class="check checked"/);
assert.match(result.html,/&lt;script&gt;alert/);
assert.doesNotMatch(result.html,/<script>/);
assert.doesNotMatch(result.html,/href="javascript:/);
assert.match(result.html,/https:\/\/legislative.gov.in/);
assert.equal(slug('Article 14 — Equality'), 'article-14-equality');
assert.equal(esc('"<p>&'), '&quot;&lt;p&gt;&amp;');
assert.match(inline('[[Contract Law|Contract]]'),/>Contract<\/a>/);
assert.equal(frontmatter('No YAML').body,'No YAML');
const paths=['HOME - Start Here.md','01-Semester-1/Constitutional-Law-I/Unit-01 - Constitution and Preamble.md','01-Semester-1/Constitutional-Law-I/Topics/Constitutionalism.md','08-Brain-Branches/First-Year Brain Branches.canvas'];
assert.equal(resolveLink('01-Semester-1/Constitutional-Law-I/Topics/Constitutionalism','HOME - Start Here.md',paths).path,paths[2]);
assert.equal(resolveLink('Constitutionalism#Rule of law',paths[1],paths).heading,'Rule of law');
assert.equal(resolveLink('08-Brain-Branches/First-Year Brain Branches.canvas',paths[1],paths).path,paths[3]);
assert.equal(resolveLink('https://bad.com',paths[1],paths),null);
assert.equal(resolveLink('javascript:alert(1)',paths[1],paths),null);
const html=readFileSync(new URL('../reader/index.html',import.meta.url),'utf8');
const app=readFileSync(new URL('../reader/app.mjs',import.meta.url),'utf8');
const sw=readFileSync(new URL('../reader/sw.js',import.meta.url),'utf8');
assert.match(html,/Content-Security-Policy/);
assert.match(html,/connect-src https:\/\/api.github.com/);
assert.doesNotMatch(app,/sessionStorage\.setItem\('kslu-reader-token'/);
assert.doesNotMatch(app,/localStorage\.setItem\([^\n]*token/i);
assert.match(app,/credentials:'omit'/);
assert.match(app,/cache:'no-store'/);
assert.match(sw,/Never cache GitHub API/);
assert.doesNotMatch(sw,/api\.github\.com/);
console.log('Reader tests passed: Markdown, calls, tables, checklists, links, XSS defenses, credentials and privacy.');

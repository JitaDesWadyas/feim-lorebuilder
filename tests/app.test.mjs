import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import vm from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';

const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const source=readFileSync(join(root,'app.js'),'utf8');
const at=source.indexOf("document.addEventListener('click',");
assert.ok(at>0,'The application should have a clear bootstrap section');
const src=source.slice(0,at);
const runtime=vm.runInNewContext(src+"\n({baseCategories,normWorkspace,escapeHtml,entryCard,categoryCard,defaultGuide})");

test('generic public catalog has all empty creative paths',()=>{
 const cats=runtime.baseCategories();
 assert.equal(cats.length,26);
 assert.ok(cats.every(c=>c.guide.questions.length>0));
 assert.ok(!src.includes('Bura’Ka')&&!src.includes('Bango'),'Private lore must not be shipped in public app');
});

test('import restores default paths, preserves private category guides and normalizes entries',()=>{
 const data={format:'feim-atlas',project:{name:'Private test'},categories:[{id:'personaggi',title:'My personal creative path',guide:{goal:'A private idea',questions:['Question?']}}],entries:[{id:'1',categoryId:'personaggi',title:'Private test idea'}],ideas:[]};
 const value=runtime.normWorkspace(data);
 assert.equal(value.categories.length,26);
 assert.equal(value.entries[0].title,'Private test idea');
 assert.equal(value.categories.find(x=>x.id==='personaggi').guide.goal,'A private idea');
});

test('import rejects unexpected files',()=>{
 assert.throws(()=>runtime.normWorkspace({hello:'world'}));
 assert.throws(()=>runtime.normWorkspace({format:'another-format',categories:[],entries:[]}));
});

test('user-provided HTML is escaped in rendered cards',()=>{
 const value=runtime.normWorkspace({format:'feim-atlas',categories:[],entries:[{id:'1',categoryId:'mappa',title:'<img onerror=alert(1)>',summary:'<script>bad</script>'}]});
 const html=runtime.entryCard(value.entries[0]);
 assert.match(html,/&lt;img/);
 assert.doesNotMatch(html,/<script>/);
 assert.doesNotMatch(html,/<img onerror/);
});

test('categories have inline SVG illustration without remote assets',()=>{
 const html=runtime.categoryCard(runtime.baseCategories()[0]);
 assert.match(html,/<svg/);
 assert.match(html,/category-symbol/);
});

test('private data is not embedded into public project files',()=>{
 const page=readFileSync(join(root,'index.html'),'utf8');
 const sw=readFileSync(join(root,'sw.js'),'utf8');
 assert.doesNotMatch(page,/Bura.Ka|Bango|minerale grigio/i);
 assert.doesNotMatch(source,/Bura.Ka|Bango|minerale grigio/i);
 assert.doesNotMatch(sw,/fetch\(['"]https?:/i);
});

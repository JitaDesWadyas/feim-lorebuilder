import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';

const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const read=name=>readFileSync(join(root,name),'utf8');
const reference=read('reference.js'),experience=read('experience.js'),page=read('index.html'),sw=read('sw.js');

function catalog(){
 const context=vm.createContext({window:{}});
 vm.runInContext(reference,context);
 return context.window.FEIM_REFERENCE;
}
test('reference has a complete coherent FEIM Next information architecture',()=>{
 const data=catalog();
 assert.equal(data.format,'feim-atlas-seed');
 assert.ok(data.entries.length>=74);
 assert.equal(data.categories.length,11);
 const ids=new Set(data.entries.map(e=>e.id));
 assert.equal(ids.size,data.entries.length,'article ids must be unique');
 const categories=new Set(data.categories.map(c=>c.id));
 for(const e of data.entries){
   assert.ok(categories.has(e.categoryId),e.title+' category missing');
   assert.ok(e.summary.length>=50,e.title+' has no substantive summary');
   assert.ok(['confermato','proposta'].includes(e.origin),e.title+' invalid provenance');
   assert.ok(['definito','in_discussione','da_validare','da_esplorare','archiviato'].includes(e.status));
   for(const link of e.links||[])assert.ok(ids.has(link),e.title+' has broken link '+link);
 }
 assert.ok(ids.has('feim-visione')&&ids.has('feim-bango')&&ids.has('feim-stagioni')&&ids.has('feim-ricerca')&&ids.has('feim-stato-tecnico'));
 for (const id of ['feim-forgia-percorso','feim-focolare-carbone','feim-camera-riduzione','feim-materiali-fantastici','feim-cartellino-oggetto','feim-bango-domande','feim-bango-bibita','feim-magia-gesti','feim-bango-minatori','feim-trasporti','feim-animali-fantastici','feim-criminalita','feim-stato-forgia-20261016']) assert.ok(ids.has(id),id+' is missing');
 assert.ok(data.revision>=20261016);
});
test('notes and technical implementation are not mistaken for finalized lore',()=>{
 const data=catalog();
 const pages=new Map(data.entries.map(e=>[e.id,e]));
 assert.match(pages.get('feim-stato-tecnico').summary,/vertical slice/i);
 assert.match(JSON.stringify(pages.get('feim-stato-tecnico').sections),/non implementato/i);
 assert.equal(pages.get('feim-artigianato').origin,'proposta');
 assert.match(pages.get('feim-stagioni').properties['Stato tecnico'],/Non implementato/);
 assert.equal(pages.get('feim-magie-inventate')?.origin,undefined);
 assert.equal(pages.get('feim-bango-bibita').origin,'proposta');
 assert.equal(pages.get('feim-magia-gesti').origin,'proposta');
 assert.match(pages.get('feim-cartellino-oggetto').summary,/attaccato/i);
 assert.match(JSON.stringify(pages.get('feim-stato-forgia-20261016')),/playtest/i);
});
test('PWA loads the reference before the reader and caches the complete offline shell',()=>{
 const scripts=[...page.matchAll(/<script defer src="([^"]+)"/g)].map(x=>x[1]);
 assert.deepEqual(scripts,['./reference.js','./app.js','./experience.js']);
 assert.match(page,/experience\.css/);
 for(const f of ['reference.js','experience.js','experience.css'])assert.ok(sw.includes("'./"+f+"'"),f+' missing offline cache');
 assert.match(sw,/shell-v4/);
 assert.doesNotMatch(experience,/fetch\(['"]https?:/);
});
test('reader syntax is valid and reference merges without erasing notebook entries',async()=>{
 new vm.Script(experience,{filename:'experience.js'});
 const src=read('app.js'),point=src.indexOf("document.addEventListener('click',");
 assert.ok(point>0);
 const context=vm.createContext({
   document:{querySelector:()=>null,querySelectorAll:()=>[],addEventListener:()=>{}},
   location:{hash:''},history:{pushState:()=>{}},
   navigator:{},localStorage:{},setTimeout:()=>0,clearTimeout:()=>{},
   console:{error:()=>{}},window:null
 });
 context.window=context;
 vm.runInContext(reference,context);
 vm.runInContext(src.slice(0,point),context);
 vm.runInContext('render=function(){};globalThis.FEIM_APP_INIT=Promise.resolve()',context);
 vm.runInContext(experience,context);
 await new Promise(r=>setImmediate(r));
 const count=vm.runInContext('workspace.entries.length',context);
 assert.equal(count,catalog().entries.length);
 assert.equal(vm.runInContext('workspace.categories.length',context),11);
 vm.runInContext("workspace.ideas.push(normIdea({id:'private-note',title:'New idea',content:'Work from phone',stage:'approfondire'}));workspace.entries.find(e=>e.id==='feim-visione').notes='Keep this';render();",context);
 assert.equal(vm.runInContext('workspace.ideas.length',context),1);
 assert.equal(vm.runInContext("workspace.entries.find(e=>e.id==='feim-visione').notes",context),'Keep this');
 assert.equal(vm.runInContext('workspace.entries.length',context),count,'render does not duplicate reference');
});

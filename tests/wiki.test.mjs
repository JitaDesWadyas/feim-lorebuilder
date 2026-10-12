import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import vm from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';

const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const script=readFileSync(join(root,'app.js'),'utf8');
const point=script.indexOf("document.addEventListener('click',");
assert.ok(point>0);
const internals=vm.runInNewContext(script.slice(0,point)+"\n({normWorkspace,articleView,categoryView,homeView,entryView,catEntries,item,categories,assign:x=>{workspace=x},entryCard,wikiParagraphs})");
const fixture=internals.normWorkspace({
 format:'feim-atlas',version:1,project:{name:'Test wiki'},
 categories:[{id:'mappa',title:'Regione di prova',summary:'Descrizione scritta',guide:{goal:'Scopo',method:'Testo guida',questions:[]}}],
 entries:[
  {id:'one',categoryId:'mappa',title:'Prima voce',summary:'Testo con contenuto chiaro.',origin:'confermato',status:'definito',properties:{Tipo:'Luogo',Funzione:'Esplorazione'},links:['two'],sections:[{heading:'La visione',body:'Testo con contenuto chiaro.'}],favorite:true},
  {id:'two',categoryId:'mappa',title:'Seconda voce',summary:'Un altro articolo.',origin:'proposta',status:'da_validare',links:[]}
 ],ideas:[]});
internals.assign(fixture);

test('wiki article has substantive reading page separate from editor',()=>{
 const html=internals.articleView('one');
 assert.match(html,/Prima voce/);
 assert.match(html,/Testo con contenuto chiaro/);
 assert.match(html,/Già discusso/);
 assert.match(html,/Scheda rapida/);
 assert.match(html,/Esplorazione/);
 assert.match(html,/Collegamenti nella wiki/);
 assert.match(html,/Seconda voce/);
 assert.match(html,/data-action="article-edit"/);
 assert.match(html,/data-article-notes="one"/);
 assert.doesNotMatch(html,/data-field="summary"/);
});
test('wiki editor has properties and linked pages',()=>{
 const html=internals.entryView('one');
 assert.match(html,/data-field="propertiesText"/);
 assert.match(html,/Tipo: Luogo/);
 assert.match(html,/data-field="linksText"/);
 assert.match(html,/Seconda voce/);
 assert.match(html,/data-field="summary"/);
});
test('chapter includes editorial intro and displays canon separately',()=>{
 const html=internals.categoryView('mappa');
 assert.match(html,/Descrizione scritta/);
 assert.match(html,/Già discusso/);
 assert.match(html,/Proposte/);
 assert.match(html,/Prima voce/);
 assert.match(html,/Seconda voce/);
});
test('article prose is escaped rather than executable HTML',()=>{
 const html=internals.wikiParagraphs('<script>alert(1)</script>');
 assert.match(html,/&lt;script&gt;/);
 assert.doesNotMatch(html,/<script>/);
});
test('homepage explains how to use the wiki',()=>{
 const html=internals.homeView();
 assert.match(html,/Come si usa questa wiki/);
 assert.match(html,/Leggi/);
 assert.match(html,/Esplora i collegamenti/);
 assert.match(html,/Contribuisci/);
});

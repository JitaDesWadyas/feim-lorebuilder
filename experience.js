/* FEIM Next — reading, thinking and offline handoff. */
'use strict';
(function(){
 const REF=globalThis.FEIM_REFERENCE;
 if(!REF || !Array.isArray(REF.entries))return;
 const $a=(sel)=>document.querySelector(sel);
 const icon2=(n)=>icon(n);
 const safe=(s)=>esc(s);
 const stageNames={spunto:'Spunto',approfondire:'Da approfondire',confrontare:'Confronto aperto',da_decidere:'Decisione da verificare'};
 const config={
   fondamenti:['compass','violet','base'],storia:['scroll','coral','base'],
   personaggi:['users','teal','luoghi'],insediamenti:['home','sand','luoghi'],
   professioni:['hammer','amber','vita'],crafting:['wrench','coral','sistemi'],
   magia:['wand','blue','sistemi'],combattimento:['shield','pink','sistemi'],
   societa:['book','teal','vita'],eventi:['zap','amber','vita'],produzione:['check','sand','produzione']
 };
 const newNormIdea=(v)=>Object.assign({id:uid(),title:'Nuova idea',content:'',categoryId:'',stage:'spunto',question:'',alternatives:'',consequences:'',updatedAt:now()},v||{});
 globalThis.normIdea=newNormIdea;
 function mergeReference(){
   let changed=false;
   const refIDs=new Set(REF.categories.map(c=>c.id));
   const oldEntries=new Set(workspace.entries.map(e=>e.categoryId));
   const legacyNames=new Map(categoryDefs.map(c=>[c[0],c]));
   const before=workspace.categories.length;
   workspace.categories=workspace.categories.filter(c=>{
     if(refIDs.has(c.id)||oldEntries.has(c.id)||!legacyNames.has(c.id))return true;
     const d=legacyNames.get(c.id),isUntouched=c.title===d[1]&&c.subtitle===d[2]&&!c.notes&&!c.summary&&(!c.guide?.goal||c.guide.goal.startsWith('Definire una visione'));
     return !isUntouched;
   });
   if(workspace.categories.length!==before)changed=true;
   const current=new Map(workspace.categories.map(c=>[c.id,c]));
   for(const [index,r] of REF.categories.entries()){
     const p=config[r.id]||['compass','teal','base'];
     const base={id:r.id,title:r.title,subtitle:r.subtitle,summary:r.summary||'',icon:p[0],tone:p[1],group:p[2],order:index,guide:Object.assign(defaultGuide(r.title),r.guide||{}),notes:''};
     const existing=current.get(r.id);
     if(!existing){workspace.categories.push(base);changed=true}
     else if(!existing.__userEdited && (!existing.__referenceRevision||existing.__referenceRevision<REF.revision) && (existing.__referenceRevision || !legacyNames.has(r.id) || (existing.title===legacyNames.get(r.id)[1]&&existing.subtitle===legacyNames.get(r.id)[2]&&(!existing.guide?.goal||existing.guide.goal.startsWith('Definire una visione'))))){
       Object.assign(existing,base,{notes:existing.notes||'',__referenceRevision:REF.revision});changed=true;
     }
   }
   const prior=new Map(workspace.entries.map(e=>[e.id,e]));
   for(const fresh of REF.entries){
     const existing=prior.get(fresh.id);
     if(!existing){workspace.entries.push(normEntry(fresh));changed=true}
     else if(existing.__seedRevision && existing.__seedRevision<fresh.__seedRevision&&!existing.__localEdited){
       const notes=existing.notes||'',favorite=existing.favorite;
       Object.assign(existing,normEntry(fresh),{notes,favorite});changed=true;
     }
   }
   if(!workspace.project?.name||['FEIM · Atlas','FEIM Atlas'].includes(workspace.project.name)){
     workspace.project=Object.assign({},workspace.project||{},{name:'FEIM Next · Atlante',description:'Archivio della visione, dei sistemi e delle decisioni. Appunti personali soltanto in locale.'});changed=true;
   }
   return changed;
 }
 const nativeRender=render;
 globalThis.render=function(){if(mergeReference())scheduleSave();return nativeRender()};
 const nativeHandleAction=handleAction;
 globalThis.handleAction=function(button,event){
   const action=button.dataset.action, id=button.dataset.id||'';
   if(action==='save-category'){const categoryId=$a('#cat-id')?.value;const result=nativeHandleAction(button,event);const record=cat(categoryId);if(record){record.__userEdited=true;scheduleSave()}return result;}
   if(action==='export-handoff'){exportHandoff();return}
   if(action==='copy-handoff'){copyText(handoffInstructions());return}
   if(action==='copy-idea-prompt'){const x=idea(id);if(x)copyText(ideaPrompt(x));return}
   if(action==='save-idea'){
     const raw=$a('#idea-content')?.value.trim()||'';
     if(!raw){toast('Inserisci il contenuto dell’idea.','error');return}
     const title=$a('#idea-title')?.value.trim()||raw.split('\n')[0].slice(0,80)||'Nuova idea';
     const eid=$a('#idea-id')?.value||'';
     const data={title,content:raw,categoryId:$a('#idea-category')?.value||'',stage:$a('#idea-stage')?.value||'spunto',question:$a('#idea-question')?.value.trim()||'',alternatives:$a('#idea-alternatives')?.value.trim()||'',consequences:$a('#idea-consequences')?.value.trim()||'',updatedAt:now()};
     const existing=idea(eid);
     if(existing)Object.assign(existing,data);else workspace.ideas.push(newNormIdea({id:uid(),...data}));
     scheduleSave();closeModal();if(route.page==='search')navigate('ideas');else render();toast('Idea salvata sul dispositivo');return;
   }
   return nativeHandleAction(button,event);
 };
 globalThis.navigation=function(){
   const links=[['home','Inizio','home'],['explore','Atlante','book'],['ideas','Idee','note'],['vault','Esporta','download']];
   const active=['category','entry','edit','search'].includes(route.page)?'explore':route.page;
   for(const [selector,mobile] of [['#bottom-nav',true],['#side-nav',false]]){
     const el=$a(selector);if(!el)continue;
     el.innerHTML=links.map(([id,title,ic])=>mobile?'<button class="bottom-item'+(active===id?' active':'')+'" data-action="go" data-page="'+id+'" aria-current="'+(active===id?'page':'false')+'"><span class="nav-icon">'+icon2(ic)+'</span><span>'+title+'</span></button>':'<button class="side-link'+(active===id?' active':'')+'" data-action="go" data-page="'+id+'" aria-current="'+(active===id?'page':'false')+'">'+icon2(ic)+title+'</button>').join('');
   }
   const count=$a('#side-count');if(count)count.textContent=workspace.entries.length+' voci consultabili';
 };
 globalThis.headline=function(){
   const labels={home:['WORLD DESIGN REFERENCE','FEIM Next'],explore:['ENCICLOPEDIA','Atlante'],ideas:['THINKING & NOTEBOOK','Idee'],vault:['BACKUP & HANDOFF','Esporta'],category:['CAPITOLO',cat(route.id)?.title||'Capitolo'],entry:['ENCICLOPEDIA','Articolo'],edit:['REVISIONE LOCALE','Editor'],search:['RICERCA','Cerca']};
   const v=labels[route.page]||labels.home;
   $a('#page-eyebrow').textContent=v[0];$a('#page-title').textContent=v[1];
   $a('#back-button').classList.toggle('hidden',!['category','entry','edit','search'].includes(route.page));
   $a('#top-add').classList.remove('hidden');
   const label=$a('#top-add span');if(label)label.textContent='Nuova idea';
 };
 globalThis.homeView=function(){
   const order=['feim-visione','feim-bango','feim-minaccia','feim-stagioni','feim-armi-libere','feim-ricerca'];
   const featured=order.map(item).filter(Boolean),statsNow=stats();
   return '<div class="stack atlas-home">'+
    '<section class="atlas-hero"><div class="hero-inner"><span class="eyebrow">FEIM NEXT · WORLD DESIGN REFERENCE</span><h2>Un mondo da vivere.<br><em>Una storia da cambiare.</em></h2><p>Un archivio navigabile di visione, lore e sistemi. Decisioni, proposte e limiti tecnici sono separati. Le nuove idee si sviluppano nel taccuino locale.</p><div class="btn-row"><button class="btn btn-primary" data-action="entry" data-id="feim-visione">'+icon2('book')+' Leggi la visione</button><button class="btn btn-ghost" data-action="go" data-page="ideas">'+icon2('plus')+' Cattura un’idea</button></div></div><div class="hero-artwork" aria-hidden="true">'+heroArt()+'</div></section>'+
    '<div class="atlas-counters"><div><strong>'+statsNow.total+'</strong><span>Voci</span></div><div><strong>'+REF.categories.length+'</strong><span>Capitoli</span></div><div><strong>'+statsNow.ideas+'</strong><span>Idee locali</span></div></div>'+
    '<section class="section-block"><div class="section-head"><div><span class="eyebrow">IL PERCORSO ESSENZIALE</span><h2>Sei letture per iniziare</h2></div><button class="plain-link" data-action="go" data-page="explore">Indice completo '+icon2('chevron')+'</button></div><div class="atlas-reading">'+featured.map((e,i)=>'<button class="reading-link" data-action="entry" data-id="'+safe(e.id)+'"><span class="reading-number">'+String(i+1).padStart(2,'0')+'</span><span class="reading-detail"><strong>'+safe(e.title)+'</strong><small>'+safe(e.summary.slice(0,132))+(e.summary.length>132?'…':'')+'</small></span>'+icon2('chevron')+'</button>').join('')+'</div></section>'+
    '<section class="atlas-double"><div class="atlas-panel"><span class="eyebrow">CONSULTA</span><h3>Tutto ciò che è stato discusso.</h3><p>Capitoli brevi, schede collegate, ricerca e distinzioni chiare tra visione e implementazione.</p><button class="btn btn-soft" data-action="go" data-page="explore">Esplora l’atlante '+icon2('chevron')+'</button></div><div class="atlas-panel"><span class="eyebrow">SVILUPPA</span><h3>Le idee nuove hanno uno spazio.</h3><p>Annota al volo, confronta alternative e passa il materiale a ChatGPT in un unico export.</p><button class="btn btn-soft" data-action="go" data-page="ideas">Apri il taccuino '+icon2('chevron')+'</button></div></section>'+
    '<section class="wiki-how"><div class="section-head"><h2>Come si usa questa wiki</h2><span class="count-pill">Tre passaggi</span></div><div class="how-grid"><div class="how-card"><span class="step-index">01</span><strong>Leggi</strong><p>Capisci le decisioni e il loro contesto.</p></div><div class="how-card"><span class="step-index">02</span><strong>Esplora i collegamenti</strong><p>Trova relazioni tra sistemi, luoghi e personaggi.</p></div><div class="how-card"><span class="step-index">03</span><strong>Contribuisci</strong><p>Raccogli idee locali e prepara un aggiornamento.</p></div></div></section>'+
    '<div class="local-privacy">'+icon2('lock')+' La conoscenza di riferimento è pubblica. Appunti e modifiche personali restano su questo dispositivo finché non vengono esportati.</div></div>';
 };
 globalThis.exploreView=function(){
   const tabs=[['tutti','Tutti'],['base','Visione e storia'],['luoghi','Luoghi e Bango'],['vita','Società e attività'],['sistemi','Meccaniche'],['produzione','Stato tecnico']];
   const shown=categories().filter(c=>group==='tutti'||groupOf(c)===group);
   return '<div class="stack atlas-index"><div class="page-intro"><span class="eyebrow">KNOWLEDGE LIBRARY</span><h2>Un capitolo alla volta.</h2><p>Un indice breve, contenuti già scritti e collegamenti tra gli argomenti. Le proposte non vengono confuse con le decisioni.</p><button class="btn btn-soft" data-action="go" data-page="search">'+icon2('search')+' Cerca in tutta la wiki</button></div>'+
    '<div class="filter-row">'+tabs.map(([k,t])=>'<button class="filter-chip'+(group===k?' active':'')+'" data-action="group" data-id="'+k+'">'+t+'</button>').join('')+'</div>'+
    '<div class="atlas-directory">'+shown.map(c=>'<button class="directory-row" data-action="category" data-id="'+safe(c.id)+'"><span class="directory-symbol" data-tone="'+safe(c.tone)+'">'+icon2(c.icon)+'</span><span class="directory-description"><strong>'+safe(c.title)+'</strong><small>'+safe(c.subtitle)+'</small></span><span class="directory-count">'+catEntries(c.id).length+' voci</span>'+icon2('chevron')+'</button>').join('')+'</div>'+
    '<p class="local-privacy"><b>Già discusso</b> descrive una decisione della visione; <b>Proposta</b> indica una possibilità ancora aperta. Lo stato tecnico si consulta separatamente e non è implicato da questi indicatori.</p></div>';
 };
 globalThis.ideasView=function(){
   const all=[...workspace.ideas].filter(x=>ideaFilter==='tutti'||x.categoryId===ideaFilter).sort((a,b)=>(b.updatedAt||'').localeCompare(a.updatedAt||''));
   return '<div class="stack atlas-ideas"><section class="ideas-lead"><span class="eyebrow">CAPTURE / OFFLINE FIRST</span><h2>Annota adesso.<br><em>Ragiona dopo.</em></h2><p>Una frase basta per iniziare. Nessuna domanda obbligatoria.</p><textarea id="quick-idea-text" class="quick-textarea" placeholder="Una meccanica, un luogo, una domanda, una situazione di gioco…" aria-label="Nuovo spunto"></textarea><div class="btn-row"><button class="btn btn-primary" data-action="save-quick-idea">'+icon2('plus')+' Salva spunto</button><button class="btn btn-ghost" data-action="idea-modal">Scheda approfondita '+icon2('chevron')+'</button></div></section>'+
    '<section class="section-block"><div class="section-head"><h2>Da intuizione a decisione</h2></div><div class="thinking-grid"><div><span>01 / IDEA</span><strong>Che esperienza crea?</strong><p>Descrivi cosa succede davvero a chi gioca.</p></div><div><span>02 / ALTERNATIVE</span><strong>Quali altre strade?</strong><p>Confronta scelte, rischi e conseguenze.</p></div><div><span>03 / REVISIONE</span><strong>Cosa tenere?</strong><p>Un’idea non diventa canon senza approvazione.</p></div></div></section>'+
    '<section class="section-block"><div class="section-head"><div><span class="eyebrow">ARCHIVIO LOCALE</span><h2>Idee salvate</h2></div><span class="count-pill">'+all.length+' idee</span></div>'+
    '<div class="filter-row"><button class="filter-chip'+(ideaFilter==='tutti'?' active':'')+'" data-action="idea-filter" data-id="tutti">Tutte</button>'+categories().filter(c=>workspace.ideas.some(x=>x.categoryId===c.id)).map(c=>'<button class="filter-chip'+(ideaFilter===c.id?' active':'')+'" data-action="idea-filter" data-id="'+safe(c.id)+'">'+safe(c.title)+'</button>').join('')+'</div>'+
    (all.length?'<div class="idea-list">'+all.map(x=>'<article class="idea-card"><div class="idea-head"><strong>'+safe(x.title)+'</strong><span class="idea-state">'+safe(stageNames[x.stage]||'Spunto')+'</span></div><p>'+safe(x.content)+'</p>'+(x.question?'<p class="idea-question"><b>Da chiarire:</b> '+safe(x.question)+'</p>':'')+'<div class="idea-foot"><span class="tag">'+safe(cat(x.categoryId)?.title||'Senza capitolo')+'</span><small>'+formattedDate(x.updatedAt)+'</small></div><div class="idea-controls"><button class="btn btn-soft" data-action="edit-idea" data-id="'+safe(x.id)+'">'+icon2('edit')+' Approfondisci</button><button class="btn btn-ghost" data-action="copy-idea-prompt" data-id="'+safe(x.id)+'">'+icon2('chat')+' Discuti</button></div></article>').join('')+'</div>':emptyBlock('sparkles','Nessun appunto ancora','Il taccuino è pronto a raccogliere le prime idee.'))+'</section></div>';
 };
 globalThis.ideaModal=function(id){
   const x=id?idea(id):null,opts=(value)=>Object.entries(stageNames).map(([k,name])=>'<option value="'+k+'"'+(value===k?' selected':'')+'>'+safe(name)+'</option>').join('');
   modal('<div class="field"><label for="idea-title">Titolo</label><input id="idea-title" value="'+attr(x?.title||'')+'" placeholder="Un nome breve"></div>'+
    '<div class="field"><label for="idea-content">Idea</label><textarea id="idea-content" class="large" placeholder="Che cosa fa il giocatore? Perché è interessante?">'+safe(x?.content||'')+'</textarea></div>'+
    '<div class="field-grid"><div class="field"><label for="idea-category">Capitolo (facoltativo)</label><select id="idea-category">'+categoryOpts(x?.categoryId||'',true)+'</select></div><div class="field"><label for="idea-stage">Stato di riflessione</label><select id="idea-stage">'+opts(x?.stage||'spunto')+'</select></div></div>'+
    '<details class="idea-expand" '+(x&&(x.question||x.alternatives||x.consequences)?'open':'')+'><summary>Approfondimento facoltativo '+icon2('chevron')+'</summary><div class="field"><label for="idea-question">Domanda aperta</label><textarea id="idea-question" placeholder="Che cosa resta da decidere?">'+safe(x?.question||'')+'</textarea></div><div class="field"><label for="idea-alternatives">Alternative</label><textarea id="idea-alternatives" placeholder="Quali soluzioni alternative ci sono?">'+safe(x?.alternatives||'')+'</textarea></div><div class="field"><label for="idea-consequences">Conseguenze e rischi</label><textarea id="idea-consequences" placeholder="Che effetti ha sugli altri sistemi e sul giocatore?">'+safe(x?.consequences||'')+'</textarea></div></details>'+
    '<input id="idea-id" type="hidden" value="'+attr(id||'')+'"><div class="modal-actions"><button class="btn btn-ghost" data-action="close-modal">Chiudi</button><button class="btn btn-primary" data-action="save-idea">'+icon2('check')+' Salva</button></div>'+
    (x?'<div class="idea-extra-actions"><button class="btn btn-ghost" data-action="copy-idea-prompt" data-id="'+safe(x.id)+'">'+icon2('chat')+' Copia per ChatGPT</button><button class="btn btn-danger" data-action="delete-idea" data-id="'+safe(x.id)+'">'+icon2('trash')+' Elimina</button></div>':''),
    'Scheda di riflessione');
 };
 globalThis.vaultView=function(){
   return '<div class="stack atlas-vault"><div class="page-intro"><span class="eyebrow">EXPORT / HANDOFF</span><h2>Dall’idea all’archivio.</h2><p>Un pacchetto completo per continuare il ragionamento con ChatGPT, più backup locale per non perdere appunti e modifiche.</p></div>'+
    '<section class="handoff-main"><span class="eyebrow">PER CHATGPT</span><h3>Pacchetto di aggiornamento</h3><p>Include gli articoli, le informazioni sul loro stato, gli appunti personali e le nuove idee. Il file distingue proposte e decisioni; può essere allegato a una conversazione futura.</p><button class="btn btn-primary btn-block" data-action="export-handoff">'+icon2('download')+' Esporta per ChatGPT (.md)</button><button class="btn btn-ghost btn-block" data-action="copy-handoff">'+icon2('copy')+' Copia istruzioni per l’aggiornamento</button></section>'+
    '<div class="handoff-options"><section class="vault-card"><div class="vault-icon">'+icon2('archive')+'</div><h3>Backup integrale</h3><p>Un JSON con tutti i dati locali: articoli, collegamenti, idee, categorie e note. È il formato ripristinabile.</p><button class="btn btn-soft btn-block" data-action="export">'+icon2('download')+' Esporta JSON</button></section><section class="vault-card"><div class="vault-icon">'+icon2('upload')+'</div><h3>Ripristino e unione</h3><p>Importa un backup da questo o da un altro dispositivo. Puoi unire o sostituire i dati, dopo aver visto l’anteprima.</p><button class="btn btn-soft btn-block" data-action="trigger-import">'+icon2('upload')+' Importa JSON</button></section></div>'+
    '<section class="vault-card"><h3>Salvataggio locale</h3><p>'+workspace.entries.length+' articoli · '+workspace.ideas.length+' idee · '+workspace.entries.filter(x=>x.notes?.trim()).length+' articoli annotati.</p><p id="save-status">Archivio sul dispositivo: '+(storage==='indexeddb'?'IndexedDB':storage==='localstorage'?'localStorage':'memoria temporanea')+'</p><p class="small-note">La conoscenza di riferimento è pubblica su GitHub. Le annotazioni restano sul dispositivo. Cancellare dati del sito o disinstallare l’app può eliminarle: conserva il backup JSON.</p></section>'+
    '<section class="vault-card archive-reset"><h3>Ripristina il materiale di riferimento</h3><p>Elimina tutte le modifiche e idee locali, mantenendo le voci pubblicate nella wiki.</p><button class="btn btn-danger" data-action="reset">'+icon2('trash')+' Ripristina archivio locale</button></section></div>';
 };
 function handoffInstructions(){
   return ['FEIM NEXT — AGGIORNAMENTO DELLA WIKI','Leggi prima il materiale allegato. Distingui (1) decisioni e visione già discusse, (2) proposte aperte, (3) stato tecnico verificato, (4) note e idee locali da validare.',
   'Agisci da game designer critico: valuta esempi concreti, alternative, conseguenze, profondità e fattibilità; non inventare decisioni e non promuovere automaticamente le idee a canon.',
   'Dopo la discussione e le conferme esplicite, aggiorna reference.js nel repository feim-lorebuilder, preservando gli ID delle voci e distinguendo progettazione da implementazione.',
   'Non confondere FEIM Next con NOT IN SYNC o E POI?. Mantieni la lettura mobile, l’archivio locale e le esportazioni.'].join('\n\n');
 }
 function ideaPrompt(x){
   return [handoffInstructions(),'IDEA DA DISCUTERE','Titolo: '+x.title,'Capitolo: '+(cat(x.categoryId)?.title||'Nessuno'),'Stato locale: '+(stageNames[x.stage]||'Spunto'),'Descrizione: '+x.content,'Domande: '+(x.question||'Non inserite'),'Alternative: '+(x.alternatives||'Da esplorare'),'Conseguenze: '+(x.consequences||'Da esplorare'),'Confronta opzioni e problemi di design prima di prendere decisioni.'].join('\n\n');
 }
 function handoffMarkdown(){
   const out=['# FEIM Next · Pacchetto di aggiornamento','','Data: '+now(),'','## Istruzioni','',''+handoffInstructions(),'','## Indice del materiale','','Voci: '+workspace.entries.length,'Idee locali: '+workspace.ideas.length,'','## Enciclopedia e note'];
   for(const e of workspace.entries){
     out.push('','### '+e.title,'','ID: '+e.id,'Capitolo: '+(cat(e.categoryId)?.title||e.categoryId),'Origine: '+(e.origin==='confermato'?'Già discusso':'Proposta'),'Stato progettuale: '+(statusNames[e.status]||e.status),'',e.summary||'');
     for(const s of e.sections||[])if(s?.body&&s.body!==e.summary)out.push('','#### '+(s.heading||'Approfondimento'),'',s.body);
     out.push('','Proprietà: '+JSON.stringify(e.properties||{}),'Voci collegate: '+(e.links||[]).join(', '));
     if(e.notes?.trim())out.push('','#### NOTE LOCALI — NON CONFERMATE','',e.notes);
     if(e.__localEdited)out.push('','> Testo modificato localmente: verificare prima di riportarlo nella fonte.');
   }
   out.push('','## Nuove idee e riflessioni');
   for(const x of workspace.ideas){
     out.push('','### '+x.title,'','ID: '+x.id,'Stato: '+(stageNames[x.stage]||'Spunto'),'Capitolo: '+(cat(x.categoryId)?.title||'Nessuno'),'Data: '+x.updatedAt,'',x.content);
     if(x.question)out.push('','**Domande**',x.question);
     if(x.alternatives)out.push('','**Alternative**',x.alternatives);
     if(x.consequences)out.push('','**Conseguenze e rischi**',x.consequences);
   }
   out.push('','## Principio editoriale','','Le nuove idee non diventano decisioni finché non vengono esplicitamente approvate. Questo export non modifica automaticamente il sito pubblico.');
   return out.join('\n');
 }
 function downloadText(value,filename,type){
   const url=URL.createObjectURL(new Blob([value],{type:type||'text/plain;charset=utf-8'}));
   const a=document.createElement('a');a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();
   setTimeout(()=>URL.revokeObjectURL(url),60000);
 }
 function exportHandoff(){downloadText(handoffMarkdown(),'FEIM-NEXT-ChatGPT-'+new Date().toISOString().slice(0,10)+'.md','text/markdown;charset=utf-8');toast('Pacchetto di aggiornamento esportato');}
 document.addEventListener('input',e=>{
   const field=e.target?.dataset?.field;
   if(route.page==='edit' && field && field!=='notes'){
     const current=item(route.id);if(current){current.__localEdited=true;scheduleSave()}
   }
 });
 document.addEventListener('change',e=>{
   if(route.page==='edit'&&e.target?.dataset?.field){
     const current=item(route.id);if(current){current.__localEdited=true;scheduleSave()}
   }
 });
 Promise.resolve(globalThis.FEIM_APP_INIT).then(()=>{if(mergeReference())scheduleSave();render();}).catch(e=>{console.error('Atlas initialization failed',e)});
})();

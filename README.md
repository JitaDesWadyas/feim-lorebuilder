# FEIM Next · Atlante di world design

Enciclopedia mobile-first per consultare la visione di **FEIM Next**, sviluppare idee e passare un contesto strutturato a ChatGPT. Applicazione statica, senza account, utilizzabile come PWA su GitHub Pages, anche offline dopo il primo caricamento.

## Come è organizzata

La pagina **Inizio** propone sei letture essenziali e una panoramica sintetica. **Atlante** raccoglie 11 capitoli e 116 voci di world design, con collegamenti, proprietà, approfondimenti e ricerca. **Idee** consente di catturare appunti in un solo campo o svilupparli in una scheda facoltativa con domanda, alternative e conseguenze. **Esporta** produce un pacchetto Markdown per ChatGPT e un backup JSON ripristinabile.

L'archivio comprende la premessa degli evocati e dei Bango, Bura'Ka, la minaccia comune, le stagioni, i raid, la magia elementale, la ricerca senza ricette ufficiali, le armi fisiche, le professioni, il commercio di conoscenze, la comunicazione tramite piccioni e il gameplay sociale persistente. Include anche lo stato tecnico effettivo del prototipo.

### Aggiornamento storico 16 ottobre 2026

Al 16 ottobre il progetto documentava 74 voci: ferro e riduzione allo stato solido, accensione e propagazione del calore nel carbone, camera di caricamento accessibile, colata semplificata, materiali fantastici e prestazioni MMO; oltre a scontrini attaccati agli oggetti e copiati nel diario, inventario da progettare, rune, gesti magici, Bango lavoratori con bisogni e conoscenze, acqua frizzante al limone (proposta), fauna originale, logistica, lingua inglese, traduzione futura, chat vocale e conseguenze sociali del combattimento.

Il branch **`feim-next/feat/playable-forge-rebuild`** contiene codice consistente, ma **il playtest Android del 16 ottobre non ha completato un ciclo di crafting**. La wiki separa l'implementato, i test automatici, i problemi verificati manualmente e le proposte ancora aperte. I nomi dei materiali citati sono provvisori. Nessun contenuto locale o spoiler narrativo privato è pubblicato.

### Aggiornamento 20 ottobre 2026

L'Atlante passa a **94 schede in 11 capitoli**: 20 nuove pagine e 17 esistenti revisionate (37 pagine con revisione 20261020), mantenendo gli ID stabili e rispettando le note locali dell'utente. Il sito non chiede login e non pubblica automaticamente appunti o spoiler dal dispositivo.

**Gameplay e progressione:** STR, DEX, MAG, CON, END, WIS restano sei capacità del personaggio, non bonus numerici diretti ai danni. STR applica forza fisica a oggetti e armi; DEX regola moderatamente agilità, movimento, salto e futuri archi/lanci senza rovinare i controlli ai personaggi iniziali; END regola stamina e recupero; CON traumi; MAG/WIS ancora da progettare a livello magico. Stamina da lavoro muscolare e carico reale, non costo fisso per ogni input. Progressione prevalentemente orizzontale con crescita verticale contenuta e non punitiva.

**Combattimento e armature:** traiettoria, velocità effettiva, orientamento del filo, massa, contatto e punto anatomico devono determinare gli urti; niente bonus STR «+danno». Le armature proteggono zone effettive in base a spessore, materiale, rigidità e ingombro. Produzione futura da tessuti/imbottiture a piastre/brigantine e molto dopo maglia; indossamento fisico assistito, collider aggregati, lavorazioni riutilizzabili e crafting facoltativo. Non sono sistemi ancora giocabili.

**Codice e stato verificati al 20/10** (le PR draft sono **codice in prova**, non funzionalità rilasciate):

| Area | Stato accertato |
| --- | --- |
| Soccorso Bango fisico, messaggeri, due portatori, barella e cura presso Uru | [PR #14](https://github.com/JitaDesWadyas/feim-next/pull/14) **merged** su main; edificio ospedale e barella rigid-body assenti |
| Audio V3 (passi, ambientazione, musica generativa, oggetti) | [PR #17](https://github.com/JitaDesWadyas/feim-next/pull/17) **merged** su main; verifica d'ascolto dispositivo da completare |
| Replica rete ottimizzata e indici spaziali senza cambiare il solver | [PR #20](https://github.com/JitaDesWadyas/feim-next/pull/20) **merged**; Performance Foundation V2 completa [#19](https://github.com/JitaDesWadyas/feim-next/pull/19) **non merged** |
| Commercio fisico fra giocatori, tavoli e Bango | [PR #15](https://github.com/JitaDesWadyas/feim-next/pull/15) **aperta**, playtest PC richiesto |
| Dialoghi dinamici, memoria episodica, gossip e fiducia Bango | [PR #18](https://github.com/JitaDesWadyas/feim-next/pull/18) **aperta**, dipende da #15 |
| Material Playground: calore, recipienti, deformazione, tagli e giunti | [PR #21](https://github.com/JitaDesWadyas/feim-next/pull/21) **aperta**, percorso artigianale completo non accettato |
| Audio V4: acustica degli interni, materiali e natura arricchita | [PR #22](https://github.com/JitaDesWadyas/feim-next/pull/22) **aperta**, prova Android/termica richiesta |
| Zaino diegetico precedente | [PR #13](https://github.com/JitaDesWadyas/feim-next/pull/13) **abbandonata**, niente merge; riprogettazione fisica 3D da main |
| Mano e strumenti coerenti con muri e presa | [PR #10](https://github.com/JitaDesWadyas/feim-next/pull/10) **aperta**, stabilizzazione ancora necessaria |

Priorità di integrazione progettuale: stabilizzare mani e armi, testare colpi e creature, sviluppare STR/END e sforzo fisico, poi DEX/CON; armature prima già costruite e infine produzione; progettare la magia prima di implementare MAG/WIS. La chat vocale vera, gli archi, le schivate e l'ospedale restano futuri e non vengono descritti come implementati.

Le sezioni precedenti datate 16 ottobre restano come documentazione storica delle osservazioni e dei bug, non come fotografia dell'ultima build.

### Aggiornamento 21 ottobre 2026

L'Atlante conta ora **116 schede in 11 capitoli**: 22 nuove voci, 12 voci già presenti aggiornate e revisione di riferimento `20261021`. L'aggiornamento non pubblica appunti personali locali.

**Game design e priorità:** sequenza iniziale diegetica, primo loop completo Bura'Ka → risorse → lavorazione/scambio → esplorazione → rischio → ritorno, regioni e densità del mondo, un primo combattimento completo, creature geometriche e animazioni organiche, grammatica della magia ancora aperta. Le proposte sono chiaramente distinte dalle decisioni confermate.

**Società sistemica:** bisogni e incarichi offline dei Bango, economia oltre il gesto fisico dello scambio, mestieri basati su materiali/geometria/trasformazioni condivisi, regole di proprietà e PvP, organizzazione dei giocatori, valore delle informazioni, storia reattiva e costi della simulazione fuori dalla vista del giocatore.

**Esperienza mobile:** il precedente pannello rettangolare Bango è respinto. Dialogo in **rotella radiale centrata**, comandi leggibili in inglese; quando inizia uno scambio, entra una **modalità fisica separata** con giocatore/NPC fermi, mani controllabili e HUD superfluo nascosto. Nessun merge dei branch #15/#18 è approvato solo perché i test passano.

**Arte e suono:** il feedback del 21 ottobre critica cielo, nuvole, scatto giorno/notte, lampioni, targhe e senso di vuoto. La PR #26 è in prova (continuità del cielo, nuvole procedurali, applique, targhe su facciata), **non merged** e soggetta a playtest PC/Android. Gli effetti ambientali sono distinti dalle nuove melodie, ancora respinte per frammentazione, scarso legato e riverbero.

**Stato GitHub controllato il 21 ottobre:** sono integrate le PR #14, #17, #20, **#22 (Audio V4)**, **#23 (ottimizzazione fisica conservativa)** e **#25 (ambiente, fotografia locale, diagnostica)**. Restano aperte **#10, #11, #12, #15, #18, #21, #24 e #26**. La fotografia della PR #25 non è ancora integrazione delle foto nel diario. Il vecchio inventario PR #13 è stato respinto. I cicli completi mano/forgia/commercio richiedono ancora test manuali; *merged* non significa *accettato*. **Il proprietario autorizza i merge FEIM Next dopo verifica**, non in anticipo.

**Lavori dalla chat senza Codex o Blender:** prototipi contenuti di dialoghi/UX, mini-economia Bango, piccole aree esplorabili e creature procedurali, atmosfera e diagnostica; le grosse riscritture di mano, forgiatura e armature sono da trattare separatamente e con prove sul dispositivo.

### Creazione fisica senza simulatore universale

Le nuove schede fissano il principio architetturale: **cinque sistemi riutilizzabili** (materiali, geometria, connessioni, trasformazioni e interazioni), simulazione per eventi, oggetti dormienti e dati di rete compatti. Le proprietà di spade, asce, picconi e utensili dovrebbero derivare dalla costruzione, invece di aggiungere una ricetta o un comportamento hardcoded per ogni oggetto. Sono descritti anche minerali e metallurgia, fonderia e colata, stampi costruibili, mola, affilatura, manici e fissaggi, oltre al controllo indipendente di mano e telecamera.

**Gerarchia di prodotto:** FEIM Next resta prima di tutto un MMORPG sociale, di avventura e RPG. La lavorazione artigianale è facoltativa, con accesso rapido tramite oggetti comprati, trovati o commissionati, e maggiore profondità per chi vuole specializzarsi. Queste voci sono decisioni di design e proposte tecniche, non una dichiarazione di feature già implementate.

**Origine e stato tecnico sono assi distinti:** `Già discusso` indica una decisione emersa nella visione, non una feature sviluppata. `Proposta` indica una possibilità da valutare. Le schede documentano ciò che è già verificato, simulato o ancora assente. Gli esempi narrativi non diventano automaticamente lore definitiva.

## Come leggere le fonti

Le revisioni versionate confrontano conversazioni, `feim-next` (branch, codice, documenti) e playtest reali. `Già discusso` non vuol dire `implementato`; `Proposta` non vuol dire `canon`. Sono mantenuti gli ID di articolo e le note locali dell'utente. Il repository resta pubblico: non riversare segreti narrativi o appunti privati in `reference.js`.

## Flusso da telefono a ChatGPT

1. Aprire **Idee**, inserire lo spunto e salvarlo. Nessun campo avanzato è obbligatorio.
2. All'occorrenza, aprire **Approfondisci** per aggiungere domanda, alternative, conseguenze e stato di riflessione. Tutti questi stati sono locali: non rendono canon un'idea.
3. Aprire **Esporta → Esporta per ChatGPT (.md)** e allegare il file alla futura conversazione.
4. Dopo la discussione e le conferme esplicite, aggiornare il file versionato `reference.js` del repository. Lo stesso sito si aggiornerà al caricamento; gli articoli non modificati localmente ricevono le nuove revisioni.
5. Esportare regolarmente anche il **backup JSON** per recuperare tutte le modifiche e le note sul dispositivo.

L'app non trasmette il documento automaticamente a ChatGPT, GitHub o altri servizi.

## Pubblico e privato: distinzione esplicita

**Il repository è pubblico.** `reference.js` contiene visione e lore di riferimento accessibili a chiunque navighi o cloni il repository, compresi eventuali spoiler di progetto. Non inserire in questo file segreti da proteggere prima del lancio.

**Le note personali restano locali**, in IndexedDB con fallback localStorage. Importare un backup non pubblica automaticamente le note su GitHub. Cancellare i dati del sito, cambiare telefono o rimuovere la PWA può cancellare i dati locali; conservare periodicamente un JSON su uno spazio controllato.

## Compatibilità

L'archivio mantiene il formato `feim-atlas` versione 1 e l'originale database locale `feim-atlas`: i backup precedenti si possono importare e i contenuti esistenti vengono mantenuti. Le voci pubblicate hanno ID stabili e una revisione. Le modifiche locali alle pagine devono essere verificate prima di riversarle nella fonte pubblica. Non viene effettuato alcun invio automatico al repository.

## Pubblicazione

GitHub Pages → Settings → Pages → **Deploy from a branch** → `main` → `/(root)`.

Sito: https://jitadeswadyas.github.io/feim-lorebuilder/

Nessuna build necessaria. `index.html` carica `reference.js`, `app.js` ed `experience.js`, con `styles.css` e `experience.css`. `sw.js` gestisce la cache della shell e dei dati statici, non i backup.

Test: `node --test tests/*.test.mjs`. La CI verifica struttura, compatibilità e coerenza dei riferimenti.

---

**Ambito:** FEIM Next. NOT IN SYNC ed E POI? sono prodotti separati dello studio; non mescolare i rispettivi universi narrativi.

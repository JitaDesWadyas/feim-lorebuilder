# FEIM Next · Atlante di world design

Enciclopedia mobile-first per consultare la visione di **FEIM Next**, sviluppare idee e passare un contesto strutturato a ChatGPT. Applicazione statica, senza account, utilizzabile come PWA su GitHub Pages, anche offline dopo il primo caricamento.

## Come è organizzata

La pagina **Inizio** propone sei letture essenziali e una panoramica sintetica. **Atlante** raccoglie 11 capitoli e 49 voci di world design, con collegamenti, proprietà, approfondimenti e ricerca. **Idee** consente di catturare appunti in un solo campo o svilupparli in una scheda facoltativa con domanda, alternative e conseguenze. **Esporta** produce un pacchetto Markdown per ChatGPT e un backup JSON ripristinabile.

L'archivio comprende la premessa degli evocati e dei Bango, Bura'Ka, la minaccia comune, le stagioni, i raid, la magia elementale, la ricerca senza ricette ufficiali, le armi fisiche, le professioni, il commercio di conoscenze, la comunicazione tramite piccioni e il gameplay sociale persistente. Include anche lo stato tecnico effettivo del prototipo.

### Creazione fisica senza simulatore universale

Le nuove schede fissano il principio architetturale: **cinque sistemi riutilizzabili** (materiali, geometria, connessioni, trasformazioni e interazioni), simulazione per eventi, oggetti dormienti e dati di rete compatti. Le proprietà di spade, asce, picconi e utensili dovrebbero derivare dalla costruzione, invece di aggiungere una ricetta o un comportamento hardcoded per ogni oggetto. Sono descritti anche minerali e metallurgia, fonderia e colata, stampi costruibili, mola, affilatura, manici e fissaggi, oltre al controllo indipendente di mano e telecamera.

**Gerarchia di prodotto:** FEIM Next resta prima di tutto un MMORPG sociale, di avventura e RPG. La lavorazione artigianale è facoltativa, con accesso rapido tramite oggetti comprati, trovati o commissionati, e maggiore profondità per chi vuole specializzarsi. Queste voci sono decisioni di design e proposte tecniche, non una dichiarazione di feature già implementate.

**Origine e stato tecnico sono assi distinti:** `Già discusso` indica una decisione emersa nella visione, non una feature sviluppata. `Proposta` indica una possibilità da valutare. Le schede documentano ciò che è già verificato, simulato o ancora assente. Gli esempi narrativi non diventano automaticamente lore definitiva.

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

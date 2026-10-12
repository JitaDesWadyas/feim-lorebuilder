# FEIM Wiki — enciclopedia privata del progetto

Applicazione statica, mobile-first e utilizzabile offline. L'interfaccia e le **26 categorie generiche vuote** sono pubbliche. Tutta la vera conoscenza di FEIM — visione, Bura'Ka, Bango, meccaniche, articoli, proposte, segreti e idee — si trova soltanto nel **JSON privato** che va importato manualmente. **Non committare quel file su questo repository pubblico.**

## Come funziona

1. Apri il sito da Android o Safari su iPhone. Puoi aggiungerlo alla schermata Home.
2. Nella pagina **Wiki**, tocca **Importa la wiki privata** e seleziona il JSON ricevuto dal creatore di FEIM.
3. Ora trovi subito articoli già scritti. Da **Indice** scegli un capitolo e apri una voce.
4. Leggi prima il testo dell'articolo. Il badge **Già discusso** indica che l'idea fa parte della visione concordata; **Proposta** significa che è una possibilità creativa ancora da approvare. **Non indica lo stato di implementazione tecnica del gioco.**
5. La **Scheda rapida** mostra proprietà, tipo, ambito e informazioni rilevanti. **Collegamenti nella wiki** permette di seguire altri articoli correlati.
6. Scrivi contributi nel campo **I tuoi appunti**, che è separato dal testo principale e si salva automaticamente.
7. Quando vuoi proporre modifiche al testo, usa **Modifica articolo**: puoi cambiare contenuto, proprietà e collegamenti (titoli esatti, uno per riga). In alternativa, **Discuti con ChatGPT** copia un contesto per ragionare insieme sul tema; l'app **non invia automaticamente** nulla a ChatGPT.
8. Puoi aggiungere appunti veloci in **Taccuino**.
9. Usa **Archivio → Esporta backup JSON** regolarmente. Puoi importare un backup o unirlo al progetto attuale.

### Private-by-design

Non ci sono account, cloud, analytics, font remoti, script esterni o sincronizzazione. I dati personali sono in IndexedDB (con fallback localStorage) e non vengono inviati a un server. Se cancelli i dati del browser o disinstalli la PWA, **puoi perdere tutte le modifiche**: conserva un JSON esportato. Importare il JSON privato non pubblica nulla su GitHub.

### GitHub Pages

Settings → Pages → Deploy from a branch → **main** → **/(root)**. L'app non richiede build. Indirizzo previsto: `https://jitadeswadyas.github.io/feim-lorebuilder/`.

### Sviluppo e test

App in HTML/CSS/JavaScript senza dipendenze runtime, PWA opzionale. Test statici: `node --test tests/*.test.mjs`. Le Actions controllano gli articoli, la sicurezza del rendering, la privacy e la correttezza dei principali componenti della wiki.

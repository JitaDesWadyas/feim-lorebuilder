# FEIM · Atlas

A polished, mobile-first, offline-first creative studio for collaboratively designing an imaginative game world. Fully static: no backend, account or build tools.

## Important: privacy

**This repository is public and contains only the generic app, empty creative paths, and public methodology. It contains NO private worldbuilding starter JSON or user notes.**

All personal material stays inside the device browser (IndexedDB; localStorage fallback) and can be exported as JSON. Nothing syncs to GitHub, no analytics, no remote fonts, no external scripts or image requests. There is no automatic cloud backup: clearing browser data or deleting an installed PWA may lose your drafts. Keep exported JSON files somewhere safe.

## For the creative collaborator

1. Open the GitHub Pages site on Android or iPhone. On iPhone use Safari → Share → **Add to Home Screen**; on Android use **Install app / Add to Home Screen** where available.
2. Go to **Archivio → Importa JSON** and select the private starter file shared with you. Do **not** commit the private JSON to the public repository.
3. From **Esplora**, choose an illustrated category, expand **Guida per questo percorso**, and select a card.
4. Use **Copia per ChatGPT** to start an actual conversation with your ChatGPT. The app does not send notes to ChatGPT automatically. Share only material you intend to share.
5. Write down ideas in **Appunti**, mark the state as **Da esplorare / In discussione / Da validare / Definito**, and capture stray thoughts under **Idee**.
6. Download regular backups via **Archivio → Esporta backup JSON**. Import a backup when changing devices. You can also merge JSON backups or replace the current workspace after reading the preview.

The starter is an editable checklist and collection of discussion prompts. Its “Già discusso” labels refer to previous discussions, **not implemented features**; other cards are proposals to review. It deliberately contains more possibilities than the team will necessarily decide to build.

## Deploy to GitHub Pages

- GitHub repo **Settings → Pages**.
- Choose **Deploy from a branch** → **main** → **/(root)** → **Save**.
- The site will be available at `https://jitadeswadyas.github.io/feim-lorebuilder/` once Pages is enabled and publication has completed.
- All asset links use relative paths, so the same files work under a GitHub Pages project subpath. No secret data should be deployed.

## Tech / checks

HTML, CSS and native JavaScript, IndexedDB, JSON import/export, inline SVG illustrations, optional installable PWA with an offline service worker. No dependency installation needed.

Run `node --test tests/app.test.mjs` for static tests, or just serve the folder through any local static server.

## Creative workflow

This tool is not meant to replace conversations with another human or ChatGPT. Use cards as starting points, compare ideas, challenge assumptions and record decisions. Canon, hypotheses and technology implementation are separate concerns.

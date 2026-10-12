# FEIM · Atlas

Mobile-first offline creative workspace for collaborative game-world design.

## Privacy by design

**This public repository contains the application only. It does not contain the private FEIM worldbuilding starter file or any user's notes.** All imported projects, drafts, decisions and personal notes remain in the browser's IndexedDB (with localStorage fallback where necessary), until the user explicitly exports them to a local JSON file. There is no account, analytics, cloud sync or telemetry.

## Use

Open the static site from GitHub Pages, install it from the browser when supported, and import your private JSON through **Archivio → Importa JSON**. Alternatively start from an empty generic catalog. Use **Esporta backup** regularly; clearing browser data, switching phones, or deleting a PWA can erase local notes.

## GitHub Pages

This is a zero-build static application: serve the repository root from the `main` branch with GitHub Pages. If Pages is not enabled yet, choose **Settings → Pages → Deploy from a branch → main / (root)**. Nothing needs to be built server-side.

## Technology

Vanilla HTML/CSS/JavaScript, IndexedDB, local JSON import/export, installable PWA where supported. All application assets are local.

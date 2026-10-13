/* App assets only. User projects are never fetched, synced, or cached here. */
const CACHE_NAME = 'feim-wiki-shell-v3';
const CORE = ['./','./index.html','./styles.css','./app.js','./reference.js','./experience.js','./experience.css','./manifest.webmanifest','./assets/icon.svg','./assets/icon-apple.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>(k.startsWith('feim-atlas-shell-')||k.startsWith('feim-wiki-shell-'))&&k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET')return;
 const url=new URL(request.url);
 if(url.origin!==self.location.origin)return;
 if(!url.pathname.startsWith(new URL(self.registration.scope).pathname))return;
 event.respondWith(fetch(request).then(response=>{
  if(response.ok&&response.type==='basic'){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(request,copy)).catch(()=>{})}
  return response;
 }).catch(async()=>{const cached=await caches.match(request);return cached||Response.error()}))
});
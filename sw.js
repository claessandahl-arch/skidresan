const VERSION='v1';const C='skidresan-'+VERSION;
const SHELL=['/skidresan/','/skidresan/manifest.webmanifest','/skidresan/icon-192.png','/skidresan/apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET')return;
 // Network-first for everything (sheet data always live); cache only own origin as offline fallback
 e.respondWith(fetch(e.request).then(r=>{if(u.origin===location.origin&&r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request)))});

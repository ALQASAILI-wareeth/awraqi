const CACHE='awraqi-stable-4.5.7',CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./pdf.mjs','./pdf.worker.mjs','./xlsx-worker.js','./xlsx.full.min.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('awraqi-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==location.origin||!u.href.startsWith(self.registration.scope))return;
 const save=res=>{if(res&&res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(r,copy)).catch(()=>{})}return res};
 if(/\.(mjs|png)$/.test(u.pathname)){e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(save)));return}
 e.respondWith(fetch(r).then(save).catch(()=>caches.match(r).then(hit=>hit||(r.mode==='navigate'?caches.match('./index.html'):Response.error()))));
});

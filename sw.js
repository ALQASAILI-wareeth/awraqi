const V="awraqi-v6",CORE=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./apple-touch-icon.png","./pdf.mjs","./pdf.worker.mjs"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET")return;
  const u=new URL(r.url);if(u.origin!==location.origin)return;
  const save=res=>{if(res&&res.ok){const c=res.clone();caches.open(V).then(x=>x.put(r,c))}return res};
  if(/\.(mjs|png)$/.test(u.pathname)){e.respondWith(caches.match(r).then(h=>h||fetch(r).then(save)));return}
  e.respondWith(fetch(r).then(save).catch(()=>caches.match(r).then(h=>h||caches.match("./index.html"))));
});

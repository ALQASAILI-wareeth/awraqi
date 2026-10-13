const V="awraqi-v2",CORE=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  const u=new URL(e.request.url),same=u.origin===location.origin;
  if(!same&&u.hostname!=="cdnjs.cloudflare.com")return;
  const save=r=>{if(r&&(r.ok||r.type==="opaque")){const c=r.clone();caches.open(V).then(x=>x.put(e.request,c))}return r};
  if(same){e.respondWith(fetch(e.request).then(save).catch(()=>caches.match(e.request).then(h=>h||caches.match("./index.html"))))}
  else{e.respondWith(caches.match(e.request).then(h=>h||fetch(e.request).then(save)))}
});

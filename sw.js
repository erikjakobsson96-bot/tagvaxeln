// Tågväxeln – service worker: gör appen spelbar offline.
// Höj versionen när du ändrar filerna så att telefonen hämtar den nya versionen.
const CACHE = "tagvaxeln-v7";
const FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/maskable-512.png"
];

// Hämta alltid färska filer från servern (förbi webbläsarens vanliga cache),
// annars kan en 10 minuter gammal kopia från GitHub Pages hamna i den nya cachen.
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(cache => Promise.all(FILES.map(f =>
        fetch(new Request(f, { cache: "reload" })).then(res => {
          if (!res.ok) throw new Error(f + " " + res.status);
          return cache.put(f, res);
        }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Visa cachad version direkt (snabbt, fungerar offline) och kontrollera mot servern i bakgrunden.
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    caches.open(CACHE).then(async cache => {
      const cached = await cache.match(e.request, { ignoreSearch: true });
      const network = fetch(e.request, { cache: "no-cache" })
        .then(res => { if (res.ok) cache.put(e.request, res.clone()); return res; })
        .catch(() => cached);
      return cached || network;
    })
  );
});

/* PainBridge service worker — offline-first for the app shell.
   No user-entered data is ever cached or transmitted by this worker;
   demo state lives only in page memory. */
const CACHE = "painbridge-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./science.html",
  "./site.css",
  "./manifest.webmanifest",
  "./demo/index.html",
  "./demo/styles.css",
  "./demo/app.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-180.png",
  "./icons/icon.svg"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* cache-first with network fallback + background refresh */
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(cached => {
      const fetched = fetch(e.request)
        .then(res => {
          if (res.ok && new URL(e.request.url).origin === self.location.origin) {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || fetched;
    })
  );
});

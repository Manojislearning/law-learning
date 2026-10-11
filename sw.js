/* Network-first application worker: keep user data in localStorage, never cache stale navigations. */
const CACHE = "law-learning-v32";
const ASSETS = [
  "./",
  "./index.html",
  "./backup-core.js?v=29",
  "./profile-local.js?v=29",
  "./refresh.html",
  "./styles.css?v=14",
  "./brain-map.css?v=1",
  "./brain-map.js?v=1",
  "./brain-map.html",
  "./app-core.js?v=32",
  "./app.js?v=32",
  "./legacy-study-ui.js?v=32",
  "./word-experience.js?v=32",
  "./content-ledger.js?v=32",
  "./syllabus-flow.js?v=32",
  "./subjects-library.js?v=32",
  "./comparison-guide.js?v=32",
  "./past-paper-data.js?v=25",
  "./past-paper-view.js?v=32",
  "./exam-words-1.js",
  "./exam-words-2.js",
  "./exam-words-3.js",
  "./exam-words-4.js",
  "./manifest.webmanifest",
  "./icon.svg"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(ASSETS);
    }).then(function() { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(key) {
        return key.startsWith("law-learning-") && key !== CACHE;
      }).map(function(key) { return caches.delete(key); }));
    }).then(function() {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function(event) {
  if (event.request.method !== "GET") return;
  var url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request, { cache: "no-store" })
      .then(function(response) {
        if (response.ok) {
          var copy = response.clone();
          event.waitUntil(caches.open(CACHE).then(function(cache) {
            return cache.put(event.request, copy);
          }));
        }
        return response;
      }).catch(function() {
        return caches.match(event.request).then(function(cached) {
          if (cached) return cached;
          if (event.request.mode === "navigate") return caches.match("./index.html");
          return Response.error();
        });
      })
  );
});

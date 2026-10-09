const CACHE = "law-learning-v19";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./styles.css?v=14",
  "./app.js",
  "./app.js?v=14",
  "./compact-words.js",
  "./syllabus-tree.js",
  "./syllabus-tree.js?v=19",
  "./word-experience.js",
  "./word-experience.js?v=19",
  "./exam-words-1.js",
  "./exam-words-2.js",
  "./exam-words-3.js",
  "./exam-words-4.js",
  "./manifest.webmanifest",
  "./icon.svg"
];

self.addEventListener("install", function(event) {
  event.waitUntil(caches.open(CACHE).then(function(cache) { return cache.addAll(ASSETS); }));
  self.skipWaiting();
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys()
      .then(function(keys) {
        return Promise.all(keys.filter(function(key) { return key !== CACHE; }).map(function(key) { return caches.delete(key); }));
      })
      .then(function() {
        return self.clients.claim();
      })
      .then(function() {
        return self.clients.matchAll({ type: "window" });
      })
      .then(function(clients) {
        clients.forEach(function(client) {
          if (client.url) client.navigate(client.url);
        });
      })
  );
});

self.addEventListener("fetch", function(event) {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request).then(function(response) {
      var copy = response.clone();
      caches.open(CACHE).then(function(cache) { cache.put(event.request, copy); });
      return response;
    }).catch(function() {
      return caches.match(event.request).then(function(cached) {
        return cached || caches.match("./index.html");
      });
    })
  );
});
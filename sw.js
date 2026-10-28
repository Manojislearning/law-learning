/* Network-first application worker: keep user data in localStorage, never cache stale navigations. */
const CACHE = "law-learning-v81";
const ASSETS = [
  "./",
  "./index.html",
  "./data/news.json",
  "./news.css?v=57",
  "./readability.css?v=58",
  "./exam-papers.css?v=59",
  "./student-menu.css?v=60",
  "./menu-simple.css?v=61",
  "./word-game-v62.css?v=62",
  "./navigation-v63.css?v=63",
  "./settings-view-v63.js?v=63",
  "./advanced-english-words.js?v=58",
  "./news-feed.js?v=57",
  "./case-review-core.js?v=55",
  "./backup-core.js?v=53",
  "./profile-local.js?v=53",
  "./refresh.html",
  "./styles.css?v=42",
  "./brain-map.css?v=1",
  "./brain-map.js?v=1",
  "./brain-map.html",
  "./app-core.js?v=63",
  "./app.js?v=58",
  "./legacy-study-ui.js?v=35",
  "./word-experience.js?v=62",
  "./content-ledger.js?v=46",
  "./contract-unit1-data.js?v=36",
  "./contract-unit2-data.js?v=37",
  "./contract-unit3-data.js?v=38",
  "./contract-unit4-data.js?v=39",
  "./contract-unit5-data.js?v=40",
  "./review-core.js?v=41",
  "./contract-unit1-ui.js?v=41",
  "./review-view.js?v=41",
  "./case-practice-data.js?v=42",
  "./torts-case-practice-data.js?v=47",
  "./bns-case-practice-data.js?v=48",
  "./constitution-case-practice-data.js?v=51",
  "./hindu-case-practice-data.js?v=52",
  "./case-practice-core.js?v=54",
  "./case-transfer-data.js?v=52",
  "./case-transfer-core.js?v=52",
  "./case-practice-view.js?v=55",
  "./legal-accuracy-data.js?v=46",
  "./legal-accuracy-core.js?v=46",
  "./legal-accuracy-view.js?v=63",
  "./syllabus-flow.js?v=63",
  "./subjects-library.js?v=32",
  "./comparison-guide.js?v=62",
  "./past-paper-data.js?v=25",
  "./past-paper-models-1.js?v=59",
  "./past-paper-models-2.js?v=59",
  "./past-paper-view.js?v=59",
  "./kslu-paper-analysis.js?v=64",
  "./exam-pattern.js?v=64",
  "./exam-pattern.css?v=64",
  "./points-core.js?v=65",
  "./firebase-config.js?v=65",
  "./ranks-view.js?v=65",
  "./ranks.css?v=65",
  "./game-rounds.js?v=70",
  "./paper-theme.css?v=75",
  "./paper-theme.js?v=71",
  "./paper-grain.png",
  "./paper-grain-light.png",
  "./fonts/PatrickHand-Regular.woff",
  "./confusing-words-data.js?v=66",
  "./confusing-words.js?v=70",
  "./confusing-words.css?v=68",
  "./marriage-law-data.js?v=70",
  "./marriage-law-game.js?v=70",
  "./torts-path-data.js?v=78",
  "./torts-path-game.js?v=79",
  "./torts-path.css?v=79",
  "./law-notes-view.js?v=77",
  "./law-notes.css?v=77",
  "./timelines-data.js?v=80",
  "./timelines-view.js?v=80",
  "./timelines.css?v=80",
  "./cases-data.js?v=81",
  "./cases-data-2.js?v=81",
  "./case-words-data.js?v=81",
  "./case-book.js?v=81",
  "./case-book.css?v=81",
  "./data/law-notes.json",
  "./reader/markdown.mjs",
  "./reader/map.mjs",
  "./reader/map.css?v=77",
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

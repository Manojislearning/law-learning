/* Cache only the public app shell. Never cache GitHub API requests or private notes. */
const VERSION='kslu-reader-shell-v4';
const SHELL=['./','./index.html','./style.css','./minimal.css?v=3','./app.mjs','./markdown.mjs','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(VERSION).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('kslu-reader-shell-')&&k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{const u=new URL(event.request.url);if(u.origin!==self.location.origin||event.request.method!=='GET'||!u.pathname.includes('/reader/'))return;event.respondWith(fetch(event.request).catch(()=>caches.match(event.request)));});

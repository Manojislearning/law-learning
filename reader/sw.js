/* The separate reader has moved into the main app. This worker removes the old reader cache and unregisters itself. */
self.addEventListener("install",function(){self.skipWaiting();});
self.addEventListener("activate",function(event){
  event.waitUntil(caches.keys().then(function(keys){return Promise.all(keys.filter(function(k){return k.indexOf("law-learning-")!==0;}).map(function(k){return caches.delete(k);}));})
    .then(function(){return self.registration.unregister();})
    .then(function(){return self.clients.matchAll();})
    .then(function(clients){clients.forEach(function(c){c.navigate(c.url);});}));
});

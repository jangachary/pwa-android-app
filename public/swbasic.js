const filesToCache = ["/", "web-dev.png"];

console.log("from swbasic");

var cacheName = "hello-pwa";

self.addEventListener("activate", (evt) =>
  evt.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cn) => {
          if (cacheName !== cn) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  )
);
/* Start the service worker and cache all of the app's content */
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache).then(function () {
        console.log("cached!");
        self.skipWaiting();
      });
    })
  );
  //self.skipWaiting();
});

/* Serve cached content when offline */
self.addEventListener("fetch", function (event) {
  console.log("fetch from serviceworker", event.request.toString());

  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetchAndCache(event.request);
    })
  );
});

function fetchAndCache(url) {
  return fetch(url)
    .then(function (response) {
      // Check if we received a valid response
      if (url.method == "POST") {
        return response;
      }
      return caches.open(cacheName).then(function (cache) {
        cache.put(url, response.clone());
        console.log("service worker");
        return response;
      });
      // return response;
    })
    .catch(function (error) {
      console.error("Request failed:", error);
      // You could return a custom offline 404 page here
    });
}

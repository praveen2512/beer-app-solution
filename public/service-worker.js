const CACHE_NAME = "beer-wiki-cache";
const urlsToCache = [
  "/",
  "/index.html",
  "/favicon.ico",
  "/manifest.json",
  "/static/js/bundle.js",
  "/static/js/main.98d4ec01.js",
  // "/static/js/951.b661d212.chunk.js",
  // "/static/js/425.7135a90d.chunk.js",
  // "/static/js/761.8dae56b8.chunk.js",
  // "/static/js/793.4a20a9f3.chunk.js",
  // "/static/js/6.d6850eaa.chunk.js",
  // "/static/js/391.76108858.chunk.js",
  // "/static/js/750.972c6730.chunk.js",
  // "/static/js/165.99184d01.chunk.js",
  // "/static/js/379.2d5973de.chunk.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("fetch", (event) => {
  try {
    event.respondWith(
      caches.match(event.request).then((response) => {
        try {
          if (response) {
            return response;
          } else {
            return fetch(event.request);
          }
        } catch (error) {
          console.error("Error in returning cache :: ", error);
        }
      })
    );
  } catch (error) {
    console.error("Error in fetching cache :: ", error);
  }
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    })
  );
});
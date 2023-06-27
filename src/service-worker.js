/// <reference types="@sveltejs/kit" />
import { build, files, version } from '$service-worker';

// Service Worker version
//const version = "1.0.1";

// Cache name
const CACHE = `cache-${version}`;

// Files to cache
const ASSETS = [
  ...build, // the app itself
  ...files  // everything in `static`
];


// Install event
self.addEventListener('install', (event) => {
  // Create a new cache and add all files to it
  async function addFilesToCache() {
      const cache = await caches.open(CACHE);
      await cache.addAll(ASSETS);
  }

  event.waitUntil(addFilesToCache());
});

self.addEventListener('activate', (event) => {
  // Remove previous cached data from disk
  async function deleteOldCaches() {
      for (const key of await caches.keys()) {
          if (key !== CACHE) await caches.delete(key);
      }
  }

  event.waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', (event) => {
  // ignore POST requests etc
  if (event.request.method !== 'GET') return;

  async function respond() {
      const url = new URL(event.request.url);
      const cache = await caches.open(CACHE);

      // `build`/`files` can always be served from the cache
      if (ASSETS.includes(url.pathname)) {
          return cache.match(url.pathname);
      }

      // for everything else, try the network first, but
      // fall back to the cache if we're offline
      try {
          const response = await fetch(event.request);

          if (response.status === 200) {
              cache.put(event.request, response.clone());
          }

          return response;
      } catch {
          return cache.match(event.request);
      }
  }

  event.respondWith(respond());
});



// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(cacheName).then((cache) => {
//       return cache.addAll(cacheAssets);
//     })
//   );
// });

// // Activate event
// self.addEventListener("activate", (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames
//           .filter((name) => name !== cacheName)
//           .map((name) => caches.delete(name))
//       );
//     })
//   );
// });

// // Fetch event
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request);
//     })
//   );
// });

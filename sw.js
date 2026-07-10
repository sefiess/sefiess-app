const CACHE_NAME = "sefiess-cache-v4";
const APP_SHELL = [
  "./index.html",
  "./app.js?v=4",
  "./manifest.json?v=2",
  "./icons/icon-192.png?v=2",
  "./icons/icon-512.png?v=2",
  // Librerías externas: se precachean desde la instalación para que el arranque
  // no dependa de la red para cargarlas. (Ya NO se incluye Babel: no se usa.)
  "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
  "https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js",
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js",
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js",
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      // Se cachea archivo por archivo (no con addAll) para que si UNO falla
      // (un CDN caído un instante) no se cancele el cacheo de todo lo demás.
      .then((c) => Promise.allSettled(APP_SHELL.map((url) => c.add(url))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Estrategia mixta:
//  • index.html y navegaciones (sin ?v)  -> RED PRIMERO: los cambios que subas se ven al instante;
//    si no hay señal, usa la copia guardada.
//  • app.js?v=, iconos?v=, librerías CDN  -> CACHÉ PRIMERO: cargan al instante. Como app.js
//    cambia de ?v al desplegar, la versión nueva se baja sola cuando el index nuevo la pide.
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  const mismoOrigen = url.origin === self.location.origin;
  const versionado = url.search.includes("v=");
  const navegacion =
    req.mode === "navigate" ||
    url.pathname.endsWith("/") ||
    url.pathname.endsWith("index.html");

  // RED PRIMERO para la página principal y tus archivos propios sin versión
  if (navegacion || (mismoOrigen && !versionado)) {
    e.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(req, clone));
          }
          return res;
        })
        .catch(() =>
          caches.match(req).then((c) => c || caches.match("./index.html"))
        )
    );
    return;
  }

  // CACHÉ PRIMERO (y actualiza en segundo plano) para librerías y archivos versionados
  e.respondWith(
    caches.match(req).then((cached) => {
      const fetchAndUpdate = fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(req, clone));
          }
          return res;
        })
        .catch(() => cached);
      return cached || fetchAndUpdate;
    })
  );
});

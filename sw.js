/* ─── Dedo de trompetista — Service Worker ─── */

const STATIC_CACHE = 'dedo-trompetista-static-v1';
const MUSIC_CACHE  = 'dedo-trompetista-music-v1';

/* Recursos do app shell que devem estar disponíveis offline */
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

/* ─── Instalação: pré-cache do app shell ─── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

/* ─── Ativação: remove caches antigos ─── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== STATIC_CACHE && k !== MUSIC_CACHE)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

/* ─── Fetch: estratégia por tipo de recurso ─── */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  /* Ignora requisições que não sejam GET */
  if (request.method !== 'GET') return;

  /* Arquivos de música (.xml, .mxl) — Network-first, cache de apoio */
  if (isMusicFile(url)) {
    event.respondWith(networkFirstWithCache(request, MUSIC_CACHE));
    return;
  }

  /* Recursos de CDN / fontes — Cache-first, atualiza em background */
  if (isCdnResource(url)) {
    event.respondWith(cacheFirstWithNetworkFallback(request, STATIC_CACHE));
    return;
  }

  /* App shell e recursos locais — Cache-first */
  if (url.origin === self.location.origin) {
    event.respondWith(cacheFirstWithNetworkFallback(request, STATIC_CACHE));
    return;
  }
});

/* ─── Helpers ─── */

function isMusicFile(url) {
  return /\.(xml|mxl|musicxml)$/i.test(url.pathname);
}

function isCdnResource(url) {
  const cdnHosts = [
    'cdn.jsdelivr.net',
    'cdnjs.cloudflare.com',
    'surikov.github.io',
    'fonts.googleapis.com',
    'fonts.gstatic.com',
  ];
  return cdnHosts.includes(url.hostname);
}

/** Cache-first: serve do cache, faz fallback para a rede e atualiza o cache. */
async function cacheFirstWithNetworkFallback(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (_) {
    return new Response('Recurso indisponível offline.', { status: 503 });
  }
}

/** Network-first: tenta a rede, usa cache se offline. */
async function networkFirstWithCache(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (_) {
    const cached = await cache.match(request);
    if (cached) return cached;
    return new Response('Arquivo indisponível offline.', { status: 503 });
  }
}

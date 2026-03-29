(function () {
  if (typeof window === 'undefined') return;

  function applyGalleryRouteClass() {
    var isGalleryRoute = /^\/gallery(\/|$)/.test(window.location.pathname);
    document.documentElement.classList.toggle('mk-gallery-route', isGalleryRoute);
    if (document.body) {
      document.body.classList.toggle('mk-gallery-route', isGalleryRoute);
    }
  }

  function notifyRouteChanged() {
    window.dispatchEvent(new PopStateEvent('popstate'));
    applyGalleryRouteClass();
  }

  window.addEventListener('message', function (event) {
    if (event.origin !== window.location.origin) return;
    var data = event.data || {};
    if (data.type !== 'mk-gallery-navigate' || !data.path) return;
    if (window.location.pathname === data.path) return;
    window.history.pushState({}, '', data.path);
    notifyRouteChanged();
  });

  applyGalleryRouteClass();
  window.addEventListener('popstate', applyGalleryRouteClass);

  var isLikelyMobile =
    (window.matchMedia('(max-width: 1024px)').matches &&
      (window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0)) ||
    /Android|iPhone|iPad|iPod|Mobile|HarmonyOS/i.test(navigator.userAgent);

  if (!isLikelyMobile) return;

  var pathname = window.location.pathname;
  if (pathname.startsWith('/gallery') || pathname.startsWith('/~demos')) return;

  var componentMatch = pathname.match(/^\/components\/([^/]+)\/?$/);
  var target = '/gallery';

  if (componentMatch && componentMatch[1]) {
    target = '/gallery/' + componentMatch[1];
  }

  if (pathname !== target) {
    window.location.replace(target + window.location.search + window.location.hash);
  }
})();

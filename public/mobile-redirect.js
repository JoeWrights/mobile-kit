(function () {
  if (typeof window === 'undefined') return;

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

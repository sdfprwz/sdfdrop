/* sdfdrop landing behaviour */
(function () {
  'use strict';

  // Room/share links (e.g. /?room=BEACH42 from QR codes) belong to the app —
  // forward them before anything renders.
  try {
    var s = location.search || '';
    if (/(?:^|[?&])(room|ws)=/i.test(s)) {
      location.replace('app.html' + s + (location.hash || ''));
      return;
    }
  } catch (e) { /* ignore */ }

  // Sticky nav shadow.
  var nav = document.getElementById('topnav');
  function onScroll() {
    if (nav) nav.style.boxShadow = window.scrollY > 8 ? '0 8px 24px rgba(37,99,235,.10)' : 'none';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu.
  var btn = document.getElementById('menubtn');
  var links = document.getElementById('navlinks');
  if (btn && links) {
    btn.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? '✕' : '☰';
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.textContent = '☰';
      }
    });
  }

  // Footer year.
  var y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());
})();

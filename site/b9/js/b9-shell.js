(function () {
  'use strict';

  function isLoginPage() {
    return document.body.classList.contains('b9-login');
  }

  function renderSiteHeader() {
    var mount = document.getElementById('b9-site-header');
    if (!mount) return;

    mount.innerHTML =
      '<header id="site-header">' +
      '<nav class="nav" aria-label="Site navigation">' +
      '<div class="nav-inner">' +
      '<a href="/" class="nav-logo" aria-label="Andrew Dean Martin, home">ADM</a>' +
      (isLoginPage()
        ? ''
        : '<ul class="nav-links" id="b9-site-nav-links" role="list">' +
          '<li><a href="/#about">About</a></li>' +
          '<li><a href="/#capabilities">What I Do</a></li>' +
          '<li><a href="/#demos">Demos</a></li>' +
          '<li><a href="/#connect">Connect</a></li>' +
          '</ul>') +
      '<div class="nav-actions">' +
      '<button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode" type="button">' +
      '<span class="theme-toggle-indicator"><span class="theme-toggle-icon">☀</span></span>' +
      '</button>' +
      (isLoginPage()
        ? ''
        : '<button class="nav-hamburger" id="b9-nav-hamburger" aria-label="Open navigation menu" aria-expanded="false" aria-controls="b9-site-nav-links" type="button">' +
          '<span></span><span></span><span></span>' +
          '</button>') +
      '</div></div></nav></header>';

    if (window.B9Theme) B9Theme.bindToggle();

    var hamburger = document.getElementById('b9-nav-hamburger');
    var links = document.getElementById('b9-site-nav-links');
    if (hamburger && links) {
      hamburger.addEventListener('click', function () {
        var open = links.classList.toggle('open');
        hamburger.classList.toggle('open', open);
        hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
        hamburger.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      });
      links.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          links.classList.remove('open');
          hamburger.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  function renderSiteFooter() {
    var mount = document.getElementById('b9-site-footer');
    if (!mount || isLoginPage()) return;

    mount.innerHTML =
      '<footer class="footer">' +
      '<div class="container">' +
      '<div class="footer-inner">' +
      '<p class="footer-cta-text">B9 AI Transformation — facilitated by Andrew Dean Martin</p>' +
      '<a href="/#connect" class="btn btn-primary footer-cta-btn">Get in Touch</a>' +
      '<p>&copy; ' + new Date().getFullYear() + ' Andrew Dean Martin</p>' +
      '<p class="footer-disclaimer">Private client guide. Views on this site are my own and do not represent PwC.</p>' +
      '</div></div></footer>';
  }

  function init() {
    renderSiteHeader();
    renderSiteFooter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.B9Shell = { init: init };
})();

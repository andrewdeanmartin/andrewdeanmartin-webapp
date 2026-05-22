(function () {
  'use strict';

  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/b9/service-worker.js', { scope: '/b9/' })
      .catch(function () {
        /* SW optional — app works without it */
      });
  });

  var deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    var btn = document.getElementById('b9-install-btn');
    if (btn) btn.hidden = false;
  });

  window.B9Pwa = {
    promptInstall: function () {
      if (!deferredPrompt) return Promise.resolve(false);
      deferredPrompt.prompt();
      return deferredPrompt.userChoice.then(function (choice) {
        deferredPrompt = null;
        return choice.outcome === 'accepted';
      });
    },
  };
})();

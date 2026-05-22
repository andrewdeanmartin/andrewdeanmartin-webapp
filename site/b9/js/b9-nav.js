(function () {
  function pageHref(path) {
    if (typeof window === 'undefined') return path;
    var isLocal =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1';
    if (!isLocal) return path;
    if (path === '/b9/') return '/b9/index.html';
    if (path.indexOf('.') === path.lastIndexOf('.')) return path + '.html';
    return path;
  }

  function renderNav(active) {
    var role = window.B9Auth && window.B9Auth.getRole();
    var links = [
      { href: pageHref('/b9/'), label: 'Start Here', id: 'home' },
      { href: pageHref('/b9/processes'), label: 'Process Map', id: 'processes' },
      { href: pageHref('/b9/tools'), label: 'Tools', id: 'tools' },
      { href: pageHref('/b9/discover'), label: 'Discover', id: 'discover' },
      { href: pageHref('/b9/plan'), label: 'Your Plan', id: 'plan' },
    ];
    if (role === 'admin') {
      links.push({ href: pageHref('/b9/admin'), label: 'Admin', id: 'admin' });
    }
    var nav = document.getElementById('b9-nav');
    if (!nav) return;

    var linkHtml = links
      .map(function (l) {
        var cls = l.id === active ? ' class="active"' : '';
        return '<a href="' + l.href + '"' + cls + '>' + l.label + '</a>';
      })
      .join('');

    nav.innerHTML =
      '<div class="b9-subnav__inner">' +
      '<span class="b9-subnav__brand">B9 <em>Transformation</em></span>' +
      '<div class="b9-subnav__links">' +
      linkHtml +
      '</div>' +
      '<div class="b9-subnav__actions">' +
      '<button type="button" class="b9-subnav__install" id="b9-install-btn" hidden>Add to home screen</button>' +
      '<button type="button" id="b9-logout-btn">Sign out</button>' +
      '</div></div>';

    var logoutBtn = document.getElementById('b9-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function () {
        window.B9Auth.logout();
      });
    }

    var installBtn = document.getElementById('b9-install-btn');
    if (installBtn && window.B9Pwa) {
      installBtn.addEventListener('click', function () {
        B9Pwa.promptInstall();
      });
    }
  }

  window.B9Nav = { render: renderNav, pageHref: pageHref };
})();

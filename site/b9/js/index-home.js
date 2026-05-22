(function () {
  B9Nav.render('home');
  B9Workspace.setLastVisited({ page: 'home' });

  var role = B9Auth.getRole() || 'guest';
  var names = { pete: 'Pete', brenda: 'Brenda', staff: 'Team', admin: 'Andrew', guest: 'Guest' };
  if (role && role !== 'guest') {
    document.getElementById('welcome-sub').textContent =
      'Signed in as ' +
      (names[role] || role) +
      '. Map what B9 has, where you want to go, and a plan — by business process.';
  }

  var sessionId = localStorage.getItem('b9_session_id');
  if (sessionId) {
    document.getElementById('discover-progress').textContent =
      'In progress — session ' + sessionId.slice(0, 8) + '…';
  }
  if (localStorage.getItem('b9_outcome_id')) {
    document.getElementById('plan-status').textContent = 'Ready — view Your Plan';
  }

  B9Workspace.load().then(function (ws) {
    var lines = [];
    var lv = ws.lastVisited || {};
    var tomCount = Object.keys(ws.tomTargets || {}).filter(function (k) {
      return ws.tomTargets[k];
    }).length;
    var customCount = Object.keys(ws.processCustom || {}).length;
    var bl = ws.baselines || {};
    var hasBaselines = bl.quoteTurnaround || bl.inboxResponse || bl.coordinatorHours;

    if (lv.page === 'processes' && lv.processId) {
      lines.push('Process map — last viewed <strong>' + lv.processId + '</strong>');
    } else if (tomCount) {
      lines.push('Target Operating Model — <strong>' + tomCount + '</strong> processes set');
    }
    if (customCount) lines.push('<strong>' + customCount + '</strong> process map edits saved');
    if (hasBaselines) lines.push('Baseline metrics captured');
    if (sessionId) lines.push('Discover session in progress');
    if (localStorage.getItem('b9_outcome_id')) lines.push('Plan generated');

    var el = document.getElementById('continue-summary');
    if (lines.length) {
      el.innerHTML = '<ul class="b9-checklist">' + lines.map(function (l) { return '<li>' + l + '</li>'; }).join('') + '</ul>';
      var href = B9Nav.pageHref('/b9/processes');
      if (lv.page === 'discover') href = B9Nav.pageHref('/b9/discover');
      if (lv.page === 'plan' || localStorage.getItem('b9_outcome_id')) href = B9Nav.pageHref('/b9/plan');
      document.getElementById('continue-cta').href = href;
      document.getElementById('continue-card').style.display = 'block';
    }
  });

  document.getElementById('export-pack-btn').addEventListener('click', function () {
    var btn = document.getElementById('export-pack-btn');
    btn.disabled = true;
    B9Export.downloadFacilitationPack()
      .catch(function (e) {
        alert('Export failed: ' + (e.message || 'API unavailable'));
      })
      .finally(function () {
        btn.disabled = false;
      });
  });
})();

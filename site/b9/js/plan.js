(function () {
  B9Nav.render('plan');
  if (window.B9Workspace) B9Workspace.setLastVisited({ page: 'plan' });

  function bindComplianceGates() {
    B9Workspace.load().then(function (ws) {
      var g = ws.complianceGate || {};
      document.getElementById('gate-counsel').checked = !!g.counselReviewed;
      document.getElementById('gate-internal').checked = !!g.pilotInternalOnly;
      document.getElementById('gate-talent').checked = !!g.talentCommsAcknowledged;
    });

    function saveGate() {
      B9Workspace.patch({
        complianceGate: {
          counselReviewed: document.getElementById('gate-counsel').checked,
          pilotInternalOnly: document.getElementById('gate-internal').checked,
          talentCommsAcknowledged: document.getElementById('gate-talent').checked,
        },
      });
      document.getElementById('gate-status').textContent = 'Saved for the team.';
    }

    ['gate-counsel', 'gate-internal', 'gate-talent'].forEach(function (id) {
      document.getElementById(id).addEventListener('change', saveGate);
    });
  }

  if (document.getElementById('gate-counsel')) bindComplianceGates();

  var exportPlanBtn = document.getElementById('export-pack-plan');
  if (exportPlanBtn) {
    exportPlanBtn.addEventListener('click', function () {
      B9Export.downloadFacilitationPack().catch(function (e) {
        alert('Export failed: ' + (e.message || ''));
      });
    });
  }
  var exportEmptyBtn = document.getElementById('export-pack-empty');
  if (exportEmptyBtn) {
    exportEmptyBtn.addEventListener('click', function () {
      B9Export.downloadFacilitationPack().catch(function (e) {
        alert('Export failed: ' + (e.message || ''));
      });
    });
  }

  var params = new URLSearchParams(window.location.search);
  var sessionId = params.get('session') || localStorage.getItem('b9_outcome_id') || localStorage.getItem('b9_session_id');

  if (!sessionId) return;

  B9Api.getOutcome(sessionId)
    .then(function (outcome) {
      document.getElementById('plan-empty').style.display = 'none';
      document.getElementById('plan-content').style.display = 'block';

      document.getElementById('snapshot').textContent =
        outcome.snapshot || 'See full markdown export for details.';
      document.getElementById('branch-badge').textContent = 'Branch ' + outcome.branch;
      document.getElementById('branch-rationale').textContent = outcome.branchRationale || '';

      var three = document.getElementById('three-start');
      three.innerHTML = (outcome.threeToStart || [])
        .map(function (item, i) {
          return (
            '<div class="b9-use-case-card"><h3>' +
            (i + 1) +
            '. ' +
            item.title +
            ' <span class="b9-muted">(' +
            item.useCaseId +
            ')</span></h3><p>' +
            item.why +
            '</p><p class="b9-muted">Effort: ' +
            item.effort +
            ' · 90-day success: ' +
            item.success90d +
            '</p></div>'
          );
        })
        .join('');

      var checklist = document.getElementById('checklist');
      var pc = outcome.phase1Checklist || {};
      checklist.innerHTML = Object.keys(pc)
        .map(function (key) {
          var block = pc[key];
          return (
            '<h3>' +
            block.label +
            '</h3><ul class="b9-checklist">' +
            block.items.map(function (item) { return '<li>' + item + '</li>'; }).join('') +
            '</ul>'
          );
        })
        .join('');

      var flags = outcome.complianceFlags || [];
      if (flags.length) {
        document.getElementById('compliance-section').style.display = 'block';
        document.getElementById('compliance-list').innerHTML = flags
          .map(function (f) { return '<li><strong>' + f.title + ':</strong> ' + f.message + '</li>'; })
          .join('');
      }

      var notNow = outcome.notNow || [];
      document.getElementById('not-now').innerHTML = notNow
        .map(function (n) { return '<li>' + n + '</li>'; })
        .join('');

      var cp = outcome.connectorPlaybook;
      if (cp && cp.patterns && cp.patterns.length) {
        document.getElementById('connector-section').style.display = 'block';
        document.getElementById('connector-intro').textContent = cp.intro || '';
        document.getElementById('connector-patterns').innerHTML = cp.patterns
          .map(function (p) {
            var levels = (p.levels || [])
              .map(function (lv) {
                return '<li><strong>' + lv.level + ' (' + lv.label + '):</strong> ' + lv.detail + '</li>';
              })
              .join('');
            var gates = p.gates && p.gates.length
              ? '<p class="b9-muted"><strong>Gates:</strong> ' + p.gates.join(' · ') + '</p>'
              : '';
            return (
              '<div class="b9-use-case-card" style="margin-top:1rem"><h3>' +
              p.title +
              '</h3><p>' +
              p.summary +
              '</p><ul class="b9-checklist">' +
              levels +
              '</ul>' +
              gates +
              '</div>'
            );
          })
          .join('');
      }

      document.getElementById('download-md').addEventListener('click', function () {
        B9Api.downloadMarkdown(sessionId).then(function (md) {
          var blob = new Blob([md], { type: 'text/markdown' });
          var a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'b9-transformation-plan.md';
          a.click();
        });
      });
      document.getElementById('print-plan').addEventListener('click', function () {
        window.print();
      });
    })
    .catch(function () {
      document.getElementById('plan-subtitle').textContent =
        'Complete Discover and generate your plan, or check that the API is running.';
    });
})();

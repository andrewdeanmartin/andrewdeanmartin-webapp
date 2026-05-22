(function () {
  if (B9Auth.getRole() !== 'admin') {
    window.location.replace('/b9/?err=admin');
    return;
  }
  B9Nav.render('admin');

  var selectedId = null;

  function loadSessions() {
    B9Api.adminListSessions()
      .then(function (data) {
        var tbody = document.getElementById('sessions-body');
        tbody.innerHTML = (data.sessions || [])
          .map(function (s) {
            var d = new Date(s.createdAt).toLocaleDateString();
            return (
              '<tr><td>' +
              d +
              '</td><td>' +
              s.role +
              '</td><td>' +
              s.track +
              '</td><td>' +
              (s.branch || '—') +
              '</td><td>' +
              (s.answerCount || 0) +
              '</td><td>' +
              s.status +
              '</td><td><button type="button" data-id="' +
              s.id +
              '">View</button></td></tr>'
            );
          })
          .join('');
        tbody.querySelectorAll('button[data-id]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            openSession(btn.getAttribute('data-id'));
          });
        });
      })
      .catch(function (e) {
        document.getElementById('sessions-body').innerHTML =
          '<tr><td colspan="7">Could not load sessions: ' + (e.message || '') + '</td></tr>';
      });
  }

  function openSession(id) {
    selectedId = id;
    B9Api.adminGetSession(id).then(function (session) {
      document.getElementById('detail').style.display = 'block';
      document.getElementById('detail-json').textContent = JSON.stringify(session, null, 2);
      document.getElementById('admin-notes').value = session.outcome?.adminNotes || '';
      document.getElementById('reviewed').checked = !!session.outcome?.reviewedByAdmin;
    });
  }

  document.getElementById('save-notes').addEventListener('click', function () {
    if (!selectedId) return;
    B9Api.adminUpdateOutcome(selectedId, {
      adminNotes: document.getElementById('admin-notes').value,
      reviewedByAdmin: document.getElementById('reviewed').checked,
    }).then(function () {
      loadSessions();
    });
  });

  document.getElementById('regenerate').addEventListener('click', function () {
    if (!selectedId) return;
    B9Api.adminRegenerate(selectedId, {
      adminNotes: document.getElementById('admin-notes').value,
    }).then(function () {
      openSession(selectedId);
      loadSessions();
    });
  });

  loadSessions();

  B9Api.getStackProfile()
    .then(function (data) {
      var el = document.getElementById('stack-profile-json');
      if (data.profile && Object.keys(data.profile).length) {
        el.textContent = JSON.stringify(data.profile, null, 2);
      } else {
        el.textContent = 'No stack profile saved yet.';
      }
    })
    .catch(function (e) {
      document.getElementById('stack-profile-json').textContent =
        'Could not load stack profile: ' + (e.message || '');
    });

  document.getElementById('admin-backup').addEventListener('click', function () {
    B9Api.adminExportBackup()
      .then(function (data) {
        var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'b9-store-backup-' + new Date().toISOString().slice(0, 10) + '.json';
        a.click();
      })
      .catch(function (e) {
        alert('Backup failed: ' + (e.message || ''));
      });
  });

  document.getElementById('admin-reset').addEventListener('click', function () {
    var status = document.getElementById('admin-reset-status');
    if (
      !window.confirm(
        'Reset all B9 data on the server? This removes sessions, plans, stack survey, TOM, and baselines. This cannot be undone.'
      )
    ) {
      return;
    }
    status.textContent = 'Resetting…';
    status.className = 'b9-msg';
    B9Api.adminResetAll()
      .then(function (result) {
        status.textContent =
          'Reset complete — ' +
          (result.sessionsRemoved || 0) +
          ' session(s) cleared. Pete will see a clean workspace on next visit.';
        status.className = 'b9-msg b9-msg--ok';
        document.getElementById('stack-profile-json').textContent = 'No stack profile saved yet.';
        document.getElementById('detail').style.display = 'none';
        selectedId = null;
        loadSessions();
      })
      .catch(function (e) {
        status.textContent = 'Reset failed: ' + (e.message || '');
        status.className = 'b9-msg b9-msg--error';
      });
  });
})();

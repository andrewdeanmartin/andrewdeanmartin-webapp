(function () {
  B9Nav.render('decide');

  var prefs = JSON.parse(localStorage.getItem('b9_tradeoff_prefs') || '{}');
  var tradeoffs = [];

  function render() {
    var el = document.getElementById('tradeoffs');
    el.innerHTML = tradeoffs
      .map(function (t) {
        var sel = prefs[t.id] || t.recommendation;
        if (t.recommendation === 'both' && !prefs[t.id]) sel = 'A';
        return (
          '<div class="b9-card" data-id="' +
          t.id +
          '"><h2>' +
          t.title +
          '</h2><p class="b9-muted">' +
          t.question +
          '</p>' +
          '<div class="b9-tradeoff-options">' +
          optionHtml(t, 'A', sel) +
          optionHtml(t, 'B', sel) +
          '</div><p><strong>Recommendation:</strong> ' +
          t.recommendationText +
          '</p></div>'
        );
      })
      .join('');

    el.querySelectorAll('.b9-tradeoff-option').forEach(function (opt) {
      opt.addEventListener('click', function () {
        var card = opt.closest('[data-id]');
        var tid = card.getAttribute('data-id');
        var choice = opt.getAttribute('data-choice');
        prefs[tid] = choice;
        card.querySelectorAll('.b9-tradeoff-option').forEach(function (o) {
          o.classList.toggle('selected', o.getAttribute('data-choice') === choice);
        });
      });
    });
  }

  function optionHtml(t, key, sel) {
    var o = key === 'A' ? t.optionA : t.optionB;
    var selected = sel === key ? ' selected' : '';
    return (
      '<div class="b9-tradeoff-option' +
      selected +
      '" data-choice="' +
      key +
      '"><strong>' +
      o.label +
      '</strong><p class="b9-muted" style="margin:0.35rem 0 0">' +
      o.summary +
      '</p></div>'
    );
  }

  document.getElementById('save-prefs').addEventListener('click', function () {
    localStorage.setItem('b9_tradeoff_prefs', JSON.stringify(prefs));
    if (window.B9Workspace) B9Workspace.patch({ tradeoffPrefs: prefs });
    document.getElementById('save-msg').textContent = 'Saved locally.';
    var sessionId = localStorage.getItem('b9_session_id');
    if (sessionId && window.B9Api) {
      B9Api.saveTradeoffs(sessionId, prefs)
        .then(function () {
          document.getElementById('save-msg').textContent = 'Saved to your session.';
        })
        .catch(function () {
          document.getElementById('save-msg').textContent = 'Saved locally (API unavailable).';
        });
    }
  });

  fetch('/b9/knowledge/tradeoffs.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      tradeoffs = data.tradeoffs;
      render();
    });
})();

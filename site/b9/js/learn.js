(function () {
  B9Nav.render('learn');

  var modules = [];
  var currentId = null;

  function renderList() {
    document.getElementById('module-view').style.display = 'none';
    var el = document.getElementById('module-list');
    el.innerHTML = modules
      .map(function (m) {
        return (
          '<div class="b9-card" style="cursor:pointer" data-id="' +
          m.id +
          '">' +
          '<h3>' +
          m.title +
          '</h3>' +
          '<p class="b9-muted">' +
          m.durationMin +
          ' min — ' +
          m.summary +
          '</p></div>'
        );
      })
      .join('');
    el.querySelectorAll('[data-id]').forEach(function (card) {
      card.addEventListener('click', function () {
        showModule(card.getAttribute('data-id'));
      });
    });
    el.style.display = 'block';
  }

  function showModule(id) {
    currentId = id;
    var m = modules.find(function (x) { return x.id === id; });
    if (!m) return;
    document.getElementById('module-list').style.display = 'none';
    document.getElementById('module-view').style.display = 'block';
    document.getElementById('module-badge').textContent = m.id + ' · ' + m.durationMin + ' min';
    document.getElementById('module-title').textContent = m.title;
    document.getElementById('module-summary').textContent = m.summary;
    document.getElementById('module-sections').innerHTML = m.sections
      .map(function (s) {
        return '<h3>' + s.heading + '</h3><p>' + s.body + '</p>';
      })
      .join('');
  }

  document.getElementById('btn-back-list').addEventListener('click', renderList);

  fetch('/b9/knowledge/learn-modules.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      modules = data.modules;
      renderList();
    });
})();

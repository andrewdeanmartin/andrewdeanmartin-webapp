(function () {
  B9Nav.render('discover');

  var sessionId = localStorage.getItem('b9_session_id');
  var currentQuestion = null;
  var currentTrackId = null;
  var includeStrategy = false;

  var urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('strategy') === '1') includeStrategy = true;

  var urlWorkflows = (urlParams.get('workflows') || '')
    .split(',')
    .map(function (s) { return s.trim(); })
    .filter(Boolean);

  var defaultWorkflows = ['wf_comms_automation', 'wf_discovery', 'wf_proposal', 'wf_post_event'];

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function renderWorkflowPicker(tracks) {
    var el = document.getElementById('workflows');
    var saved = urlWorkflows.length
      ? urlWorkflows
      : JSON.parse(localStorage.getItem('b9_selected_workflows') || 'null');
    var selected = saved || defaultWorkflows.slice();

    el.innerHTML = Object.keys(tracks)
      .filter(function (id) { return tracks[id].kind === 'workflow'; })
      .map(function (id) {
        var t = tracks[id];
        var isOn = selected.indexOf(id) !== -1;
        return (
          '<button type="button" class="' +
          (isOn ? 'selected' : '') +
          '" data-workflow="' +
          id +
          '" title="' +
          escapeHtml(t.description || '') +
          '">' +
          escapeHtml(t.label) +
          '</button>'
        );
      })
      .join('');

    el.querySelectorAll('[data-workflow]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        btn.classList.toggle('selected');
        persistWorkflowSelection(el);
      });
    });
  }

  function persistWorkflowSelection(el) {
    var ids = [];
    el.querySelectorAll('[data-workflow].selected').forEach(function (btn) {
      ids.push(btn.getAttribute('data-workflow'));
    });
    localStorage.setItem('b9_selected_workflows', JSON.stringify(ids));
  }

  function getSelectedWorkflows() {
    var ids = [];
    document.querySelectorAll('#workflows [data-workflow].selected').forEach(function (btn) {
      ids.push(btn.getAttribute('data-workflow'));
    });
    return ids;
  }

  function buildTrackList() {
    var workflows = getSelectedWorkflows();
    var tracks = ['setup'].concat(workflows);
    if (includeStrategy) tracks.push('strategy');
    return tracks;
  }

  function showQaPanel() {
    document.getElementById('track-picker').style.display = 'none';
    document.getElementById('qa-panel').style.display = 'grid';
  }

  function renderAnswerInput(q) {
    var area = document.getElementById('answer-area');
    if (q.type === 'select') {
      area.innerHTML =
        '<select class="b9-select" id="answer-input">' +
        q.options.map(function (o) { return '<option value="' + o + '">' + o + '</option>'; }).join('') +
        '</select>';
    } else if (q.type === 'scale') {
      area.innerHTML =
        '<input type="number" class="b9-select" id="answer-input" min="' +
        (q.min || 1) +
        '" max="' +
        (q.max || 5) +
        '" value="3">';
    } else {
      area.innerHTML = '<textarea class="b9-textarea" id="answer-input" rows="5"></textarea>';
    }
  }

  function loadLearning() {
    if (!sessionId) return;
    B9Api.getLearning(sessionId)
      .then(function (data) {
        var list = document.getElementById('learning-list');
        var notes = data.notes || [];
        if (!notes.length) {
          list.innerHTML = '<li class="b9-muted">Answers will appear here…</li>';
          return;
        }
        list.innerHTML = notes
          .map(function (n) {
            return '<li><strong>' + n.category + ':</strong> ' + escapeHtml(n.content) + '</li>';
          })
          .join('');
      })
      .catch(function () {});
  }

  function showQuestion(payload) {
    if (payload.complete) {
      generatePlan();
      return;
    }
    currentQuestion = payload.question;
    currentTrackId = payload.trackId;
    var prog = payload.progress || { answered: 0, total: 1, track: { index: 1, total: 1 } };
    var trackProg = prog.track || { index: (prog.answered || 0) + 1, total: prog.total || 1 };
    var pct = prog.total ? (prog.answered / prog.total) * 100 : 0;
    var section = payload.trackLabel ? payload.trackLabel + ' · ' : '';
    document.getElementById('progress-text').textContent =
      section +
      'Question ' +
      trackProg.index +
      ' of ' +
      trackProg.total +
      (prog.total > trackProg.total
        ? ' · ' + prog.answered + ' of ' + prog.total + ' overall'
        : '');
    document.getElementById('qa-bar').style.width = pct + '%';
    document.getElementById('why-asking').textContent = currentQuestion.why
      ? 'Why we ask: ' + currentQuestion.why
      : '';
    document.getElementById('question-text').textContent = currentQuestion.text;
    renderAnswerInput(currentQuestion);
  }

  function loadNext() {
    return B9Api.getNextQuestion(sessionId).then(showQuestion);
  }

  function generatePlan() {
    var prefs = JSON.parse(localStorage.getItem('b9_tradeoff_prefs') || '{}');
    B9Api.saveTradeoffs(sessionId, prefs)
      .catch(function () {})
      .then(function () {
        return B9Api.synthesize(sessionId);
      })
      .then(function () {
        localStorage.setItem('b9_outcome_id', sessionId);
        window.location.href = (window.B9Nav && window.B9Nav.pageHref
          ? window.B9Nav.pageHref('/b9/plan')
          : '/b9/plan.html') + '?session=' + sessionId;
      })
      .catch(function (e) {
        document.getElementById('qa-error').textContent =
          'Could not generate plan. Is the API running? ' + (e.message || '');
      });
  }

  document.getElementById('strategy-toggle').querySelector('button').addEventListener('click', function () {
    includeStrategy = !includeStrategy;
    this.classList.toggle('selected', includeStrategy);
  });

  document.getElementById('start-session').addEventListener('click', function () {
    document.getElementById('start-error').textContent = '';
    var workflows = getSelectedWorkflows();
    if (!workflows.length) {
      document.getElementById('start-error').textContent = 'Pick at least one workflow to explore.';
      return;
    }

    var tracks = buildTrackList();
    var role = B9Auth.getRole() || 'guest';

    if (sessionId) {
      localStorage.removeItem('b9_session_id');
      localStorage.removeItem('b9_outcome_id');
      sessionId = null;
    }

    B9Api.createSession({ role: role, tracks: tracks })
      .then(function (session) {
        sessionId = session.id;
        localStorage.setItem('b9_session_id', sessionId);
        if (window.B9Workspace) B9Workspace.setLastVisited({ page: 'discover', sessionId: sessionId });
        showQaPanel();
        return loadNext();
      })
      .then(loadLearning)
      .catch(function (e) {
        document.getElementById('start-error').textContent =
          e.message || 'Could not start session. Check API connection.';
      });
  });

  document.getElementById('submit-answer').addEventListener('click', function () {
    if (!currentQuestion || !sessionId) return;
    var input = document.getElementById('answer-input');
    var raw = input.value.trim();
    if (!raw) {
      document.getElementById('qa-error').textContent = 'Please enter an answer.';
      return;
    }
    document.getElementById('qa-error').textContent = '';
    B9Api.submitAnswer(sessionId, {
      questionId: currentQuestion.id,
      trackId: currentTrackId,
      questionText: currentQuestion.text,
      rawAnswer: raw,
    })
      .then(function () {
        loadLearning();
        return loadNext();
      })
      .catch(function (e) {
        document.getElementById('qa-error').textContent = e.message || 'Submit failed.';
      });
  });

  document.getElementById('finish-early').addEventListener('click', generatePlan);

  B9Api.fetchKnowledge('question-tracks')
    .then(function (data) {
      renderWorkflowPicker(data.tracks || {});
      if (urlParams.get('strategy') === '1') {
        includeStrategy = true;
        var stratBtn = document.querySelector('#strategy-toggle button');
        if (stratBtn) stratBtn.classList.add('selected');
      }
      if (urlParams.get('autostart') === '1' && !sessionId) {
        document.getElementById('start-session').click();
      }
    })
    .catch(function () {
      document.getElementById('start-error').textContent = 'Could not load workflow list.';
    });

  if (sessionId) {
    showQaPanel();
    loadNext().catch(function () {
      sessionId = null;
      localStorage.removeItem('b9_session_id');
      document.getElementById('track-picker').style.display = 'block';
      document.getElementById('qa-panel').style.display = 'none';
    });
    loadLearning();
  }
})();

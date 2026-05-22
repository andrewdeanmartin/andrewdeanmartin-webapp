(function () {
  B9Nav.render('processes');

  var STORAGE_CUSTOM = 'b9_process_map_custom';
  var STORAGE_TOM = 'b9_tom_targets';
  var mapData = null;
  var maturityData = null;
  var useCases = {};
  var selectedId = null;
  var custom = loadJson(STORAGE_CUSTOM, {});
  var tomTargets = loadJson(STORAGE_TOM, {});

  var PRESETS = {
    'all-low': function (ids) {
      var o = {};
      ids.forEach(function (id) { o[id] = 'low'; });
      return o;
    },
    balanced: function (ids) {
      var o = {};
      ids.forEach(function (id) { o[id] = 'low'; });
      o['discovery-scoping'] = 'medium';
      o['proposal-quote-pricing'] = 'medium';
      o['post-event-recap'] = 'medium';
      o['finance-admin'] = 'low';
      return o;
    },
    'pete-wiring': function (ids) {
      var o = {};
      ids.forEach(function (id) { o[id] = 'low'; });
      o['comms-automation'] = 'medium';
      o['event-day-ops'] = 'medium';
      o['discovery-scoping'] = 'medium';
      o['post-event-recap'] = 'medium';
      return o;
    },
  };

  function loadJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key) || 'null') || fallback;
    } catch (e) {
      return fallback;
    }
  }

  function saveCustom() {
    localStorage.setItem(STORAGE_CUSTOM, JSON.stringify(custom));
    if (window.B9Workspace) B9Workspace.patch({ processCustom: custom });
    document.getElementById('reset-custom').style.display =
      Object.keys(custom).length ? 'inline-block' : 'none';
  }

  function saveTom() {
    localStorage.setItem(STORAGE_TOM, JSON.stringify(tomTargets));
    if (window.B9Workspace) B9Workspace.patch({ tomTargets: tomTargets });
    renderTomPanel();
  }

  function pageHref(path) {
    return window.B9Nav && window.B9Nav.pageHref ? window.B9Nav.pageHref(path) : path;
  }

  function discoverHref(track) {
    return pageHref('/b9/discover') + '?workflows=' + encodeURIComponent(track || '');
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function fmtCost(range) {
    if (!range) return '—';
    return '$' + range.min.toLocaleString() + '–$' + range.max.toLocaleString();
  }

  function getProcess(id) {
    return (mapData.processes || []).find(function (p) { return p.id === id; });
  }

  function getTargetLevel(processId) {
    return tomTargets[processId] || 'low';
  }

  function getMaturity(processId, level) {
    var block = maturityData.byProcess && maturityData.byProcess[processId];
    return block ? block[level] : null;
  }

  function allProcessIds() {
    return (mapData.processes || []).map(function (p) { return p.id; });
  }

  function mergedStep(process, step) {
    var key = process.id + ':' + step.id;
    var c = custom[key] || {};
    return {
      label: c.label || step.label,
      detail: c.detail !== undefined ? c.detail : step.detail,
      aiHidden: !!c.aiHidden,
      ai: step.ai,
    };
  }

  function mergedNotes(process) {
    return (custom[process.id] && custom[process.id].notes) || '';
  }

  function renderMaturitySelector(process) {
    var levels = maturityData.levels || {};
    var current = getTargetLevel(process.id);
    var cards = ['low', 'medium', 'high']
      .map(function (lv) {
        var meta = levels[lv] || { label: lv };
        var mat = getMaturity(process.id, lv);
        if (!mat) return '';
        var selected = current === lv ? ' is-selected' : '';
        return (
          '<label class="b9-maturity-card' +
          selected +
          '">' +
          '<input type="radio" name="maturity-' +
          process.id +
          '" value="' +
          lv +
          '"' +
          (selected ? ' checked' : '') +
          '>' +
          '<span class="b9-maturity-card__label">' +
          escapeHtml(meta.label) +
          '</span>' +
          '<span class="b9-maturity-card__tagline">' +
          escapeHtml(meta.tagline || '') +
          '</span>' +
          '<span class="b9-maturity-card__cost">' +
          fmtCost(mat.costMonthly) +
          '/mo · setup ' +
          fmtCost(mat.costSetup) +
          '</span></label>'
        );
      })
      .join('');

    var mat = getMaturity(process.id, current);
    var detail = '';
    if (mat) {
      detail =
        '<div class="b9-maturity-detail">' +
        '<p><strong>Target:</strong> ' +
        escapeHtml(mat.summary) +
        '</p>' +
        '<p><strong>Technologies:</strong> ' +
        escapeHtml((mat.technologies || []).join(' · ')) +
        '</p>' +
        '<p class="b9-muted"><strong>People:</strong> ' +
        escapeHtml(mat.peopleImpact || '') +
        '</p>' +
        (mat.setupNote
          ? '<p class="b9-muted"><strong>Setup:</strong> ' + escapeHtml(mat.setupNote) + '</p>'
          : '') +
        '</div>';
    }

    return (
      '<div class="b9-maturity-section">' +
      '<h3>Target maturity for this process</h3>' +
      '<p class="b9-muted">Low = assist-first · Medium = connected workflows · High = agentic with human gates</p>' +
      '<div class="b9-maturity-grid">' +
      cards +
      '</div>' +
      detail +
      '</div>'
    );
  }

  function renderPipeline(containerId, groupId) {
    var el = document.getElementById(containerId);
    var items = (mapData.processes || [])
      .filter(function (p) { return p.group === groupId; })
      .sort(function (a, b) { return a.order - b.order; });

    el.innerHTML = items
      .map(function (p) {
        var aiCount = (p.steps || []).filter(function (s) { return s.ai; }).length;
        var lv = getTargetLevel(p.id);
        var lvLabel = (maturityData.levels[lv] && maturityData.levels[lv].label) || lv;
        return (
          '<button type="button" class="b9-pipeline-node b9-pipeline-node--' +
          lv +
          (selectedId === p.id ? ' is-selected' : '') +
          '" data-process="' +
          p.id +
          '" role="tab">' +
          '<span class="b9-pipeline-node__order">' +
          (p.order + 1) +
          '</span>' +
          '<span class="b9-pipeline-node__name">' +
          escapeHtml(p.name) +
          '</span>' +
          '<span class="b9-pipeline-node__meta">' +
          lvLabel.split('—')[0].trim() +
          ' · ' +
          (p.steps || []).length +
          ' steps' +
          (aiCount ? ' · ' + aiCount + ' AI' : '') +
          '</span></button>'
        );
      })
      .join('');

    el.querySelectorAll('[data-process]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectProcess(btn.getAttribute('data-process'));
      });
    });
  }

  function selectProcess(id) {
    selectedId = id;
    if (window.B9Workspace) {
      B9Workspace.setLastVisited({ page: 'processes', processId: id });
    }
    renderPipeline('pipeline-client', 'client');
    renderPipeline('pipeline-talent', 'talent');
    renderPipeline('pipeline-overlay', 'overlay');
    renderDetail();
    renderTomPanel();
    var p = getProcess(id);
    if (p && p.discoverTrack) {
      document.getElementById('discover-from-map').href = discoverHref(p.discoverTrack);
    }
  }

  function renderDetail() {
    var el = document.getElementById('map-detail');
    var p = getProcess(selectedId);
    if (!p) {
      el.innerHTML = '<p class="b9-muted">Select a process above to view steps and set target maturity.</p>';
      return;
    }

    var showAi = document.getElementById('ai-overlay').checked;
    var editMode = document.getElementById('edit-mode').checked;
    var notes = mergedNotes(p);

    var stepsHtml = (p.steps || [])
      .map(function (step, idx) {
        var m = mergedStep(p, step);
        var aiBlock = '';
        if (showAi && m.ai && !m.aiHidden) {
          var modeLabel =
            m.ai.mode === 'automate_later' ? 'Automate later' : 'Assist (human review)';
          var gate = m.ai.gate ? ' · Gate: ' + m.ai.gate : '';
          var pills = (m.ai.useCaseIds || [])
            .map(function (id) {
              return '<span class="b9-pill" title="' + escapeHtml(useCases[id] || id) + '">' + id + '</span>';
            })
            .join('');
          aiBlock =
            '<div class="b9-ai-overlay">' +
            '<span class="b9-ai-overlay__tag">AI · ' +
            escapeHtml(modeLabel) +
            '</span>' +
            '<strong>' +
            escapeHtml(m.ai.label) +
            '</strong>' +
            '<span class="b9-muted"> Phase ' +
            m.ai.rolloutPhase +
            ' · ' +
            m.ai.confidence +
            gate +
            '</span>' +
            '<div class="b9-pills">' +
            pills +
            '</div>' +
            (editMode
              ? '<label class="b9-muted"><input type="checkbox" data-hide-ai="' +
                step.id +
                '"> Not applicable for B9</label>'
              : '') +
            '</div>';
        } else if (editMode && m.ai) {
          aiBlock =
            '<p class="b9-muted"><label><input type="checkbox" data-show-ai="' +
            step.id +
            '"' +
            (m.aiHidden ? '' : ' checked') +
            '> Show AI suggestion</label></p>';
        }

        if (editMode) {
          return (
            '<li class="b9-map-step b9-map-step--edit">' +
            '<span class="b9-map-step__num">' +
            (idx + 1) +
            '</span>' +
            '<div class="b9-map-step__body">' +
            '<input type="text" class="b9-select" data-step-label="' +
            step.id +
            '" value="' +
            escapeHtml(m.label) +
            '">' +
            '<textarea class="b9-textarea" rows="2" data-step-detail="' +
            step.id +
            '">' +
            escapeHtml(m.detail) +
            '</textarea>' +
            aiBlock +
            '</div></li>'
          );
        }

        return (
          '<li class="b9-map-step">' +
          '<span class="b9-map-step__num">' +
          (idx + 1) +
          '</span>' +
          '<div class="b9-map-step__body">' +
          '<strong>' +
          escapeHtml(m.label) +
          '</strong>' +
          '<p class="b9-muted">' +
          escapeHtml(m.detail) +
          '</p>' +
          aiBlock +
          '</div></li>'
        );
      })
      .join('');

    el.innerHTML =
      '<div class="b9-map-detail__head">' +
      '<div><h2 style="margin:0">' +
      escapeHtml(p.name) +
      '</h2>' +
      '<p class="b9-muted">' +
      escapeHtml(p.summary) +
      '</p>' +
      '<p class="b9-muted"><strong>Typical owner:</strong> ' +
      escapeHtml(p.ownerHint || '—') +
      '</p></div>' +
      '<a class="b9-btn b9-btn--gold b9-btn--sm" href="' +
      discoverHref(p.discoverTrack) +
      '">Q&amp;A this process</a></div>' +
      renderMaturitySelector(p) +
      (editMode
        ? '<label><strong>Your notes</strong></label>' +
          '<textarea class="b9-textarea" id="process-notes" rows="3">' +
          escapeHtml(notes) +
          '</textarea>'
        : notes
          ? '<div class="b9-map-notes"><strong>Your notes:</strong> ' + escapeHtml(notes) + '</div>'
          : '') +
      '<h3 style="margin-top:1.5rem">Current-state steps</h3>' +
      '<ol class="b9-map-steps">' +
      stepsHtml +
      '</ol>';

    el.querySelectorAll('input[name="maturity-' + p.id + '"]').forEach(function (radio) {
      radio.addEventListener('change', function () {
        tomTargets[p.id] = radio.value;
        saveTom();
        renderPipeline('pipeline-client', 'client');
        renderPipeline('pipeline-talent', 'talent');
        renderPipeline('pipeline-overlay', 'overlay');
        renderDetail();
      });
    });

    if (editMode) {
      el.querySelectorAll('[data-step-label]').forEach(function (input) {
        input.addEventListener('change', function () {
          var key = p.id + ':' + input.getAttribute('data-step-label');
          custom[key] = custom[key] || {};
          custom[key].label = input.value;
          saveCustom();
        });
      });
      el.querySelectorAll('[data-step-detail]').forEach(function (ta) {
        ta.addEventListener('change', function () {
          var key = p.id + ':' + ta.getAttribute('data-step-detail');
          custom[key] = custom[key] || {};
          custom[key].detail = ta.value;
          saveCustom();
        });
      });
      el.querySelectorAll('[data-hide-ai]').forEach(function (cb) {
        cb.addEventListener('change', function () {
          var key = p.id + ':' + cb.getAttribute('data-hide-ai');
          custom[key] = custom[key] || {};
          custom[key].aiHidden = cb.checked;
          saveCustom();
          renderDetail();
        });
      });
      el.querySelectorAll('[data-show-ai]').forEach(function (cb) {
        cb.addEventListener('change', function () {
          var key = p.id + ':' + cb.getAttribute('data-show-ai');
          custom[key] = custom[key] || {};
          custom[key].aiHidden = !cb.checked;
          saveCustom();
          renderDetail();
        });
      });
      var notesEl = document.getElementById('process-notes');
      if (notesEl) {
        notesEl.addEventListener('change', function () {
          custom[p.id] = custom[p.id] || {};
          custom[p.id].notes = notesEl.value;
          saveCustom();
        });
      }
    }
  }

  function computeTotals() {
    var monthlyMin = 0;
    var monthlyMax = 0;
    var setupMin = 0;
    var setupMax = 0;
    var rows = [];

    (mapData.processes || []).forEach(function (p) {
      var lv = getTargetLevel(p.id);
      var mat = getMaturity(p.id, lv);
      if (!mat) return;
      monthlyMin += mat.costMonthly.min;
      monthlyMax += mat.costMonthly.max;
      setupMin += mat.costSetup.min;
      setupMax += mat.costSetup.max;
      rows.push({ process: p, level: lv, mat: mat });
    });

    return { monthlyMin: monthlyMin, monthlyMax: monthlyMax, setupMin: setupMin, setupMax: setupMax, rows: rows };
  }

  function buildTomMarkdown() {
    var totals = computeTotals();
    var levels = maturityData.levels || {};
    var lines = [
      '# B9 Target Operating Model (Draft)',
      '',
      '_Generated from Process Map configuration — directional only, not a vendor quote._',
      '',
      '## Summary',
      '',
      '- **Monthly run-rate (range):** $' +
        totals.monthlyMin.toLocaleString() +
        ' – $' +
        totals.monthlyMax.toLocaleString() +
        '/mo',
      '- **One-time setup (range):** $' +
        totals.setupMin.toLocaleString() +
        ' – $' +
        totals.setupMax.toLocaleString(),
      '',
      '_Note: Ranges sum per-process estimates and may double-count shared tools (e.g. ChatGPT Teams). Realistic Year 1 budget is often 40–60% of the monthly high sum plus setup._',
      '',
      '## Process targets',
      '',
    ];

    totals.rows.forEach(function (row) {
      var lvMeta = levels[row.level] || {};
      lines.push('### ' + row.process.name);
      lines.push('');
      lines.push('- **Target maturity:** ' + (lvMeta.label || row.level));
      lines.push('- **Operating model:** ' + row.mat.summary);
      lines.push('- **Technologies:** ' + (row.mat.technologies || []).join(', '));
      lines.push('- **Monthly:** ' + fmtCost(row.mat.costMonthly));
      lines.push('- **Setup:** ' + fmtCost(row.mat.costSetup) + ' — ' + (row.mat.setupNote || ''));
      lines.push('- **People impact:** ' + (row.mat.peopleImpact || ''));
      var notes = mergedNotes(row.process);
      if (notes) lines.push('- **B9 notes:** ' + notes);
      lines.push('');
    });

    lines.push('## Shared technology themes');
    lines.push('');
    lines.push('- Chat workspace for drafting (ChatGPT Teams / Claude for Work)');
    lines.push('- StaffConnect as ops system of record (extend, don\'t replace)');
    lines.push('- Zapier/Make for first wiring experiments');
    lines.push('- Twilio / unified inbox only after assist-first pilots prove value');
    lines.push('');
    lines.push('---');
    lines.push('*Validate with Discover Q&A and Brenda sign-off before hiring integrators.*');
    return lines.join('\n');
  }

  function renderTomPanel() {
    if (!mapData || !maturityData) return;
    var totals = computeTotals();
    var el = document.getElementById('tom-summary');
    var levels = maturityData.levels || {};

    var tableRows = totals.rows
      .map(function (row) {
        var lvMeta = levels[row.level] || {};
        return (
          '<tr><td>' +
          escapeHtml(row.process.name) +
          '</td><td><span class="b9-tom-lv b9-tom-lv--' +
          row.level +
          '">' +
          escapeHtml((lvMeta.label || row.level).split('—')[0].trim()) +
          '</span></td><td>' +
          fmtCost(row.mat.costMonthly) +
          '/mo</td><td>' +
          fmtCost(row.mat.costSetup) +
          '</td></tr>'
        );
      })
      .join('');

    el.innerHTML =
      '<table class="b9-tom-table"><thead><tr><th>Process</th><th>Target</th><th>Monthly</th><th>Setup</th></tr></thead><tbody>' +
      tableRows +
      '</tbody><tfoot><tr><td colspan="2"><strong>Total (directional)</strong></td><td><strong>' +
      fmtCost({ min: totals.monthlyMin, max: totals.monthlyMax }) +
      '/mo</strong></td><td><strong>' +
      fmtCost({ min: totals.setupMin, max: totals.setupMax }) +
      '</strong></td></tr></tfoot></table>';

    document.getElementById('tom-cost-disclaimer').textContent =
      maturityData.disclaimer || '';
  }

  document.getElementById('ai-overlay').addEventListener('change', renderDetail);
  document.getElementById('edit-mode').addEventListener('change', function () {
    renderDetail();
    document.getElementById('reset-custom').style.display =
      document.getElementById('edit-mode').checked && Object.keys(custom).length
        ? 'inline-block'
        : 'none';
  });

  document.getElementById('reset-custom').addEventListener('click', function () {
    if (!window.confirm('Reset all your process map edits?')) return;
    custom = {};
    localStorage.removeItem(STORAGE_CUSTOM);
    if (window.B9Workspace) B9Workspace.patch({ processCustom: {} });
    renderDetail();
    document.getElementById('reset-custom').style.display = 'none';
  });

  document.querySelectorAll('[data-preset]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var preset = PRESETS[btn.getAttribute('data-preset')];
      if (!preset) return;
      tomTargets = preset(allProcessIds());
      saveTom();
      renderPipeline('pipeline-client', 'client');
      renderPipeline('pipeline-talent', 'talent');
      renderPipeline('pipeline-overlay', 'overlay');
      if (selectedId) renderDetail();
    });
  });

  document.getElementById('export-tom').addEventListener('click', function () {
    var md = buildTomMarkdown();
    var blob = new Blob([md], { type: 'text/markdown' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'b9-target-operating-model.md';
    a.click();
  });

  document.getElementById('copy-tom').addEventListener('click', function () {
    var md = buildTomMarkdown();
    navigator.clipboard.writeText(md).then(function () {
      var btn = document.getElementById('copy-tom');
      var prev = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(function () { btn.textContent = prev; }, 2000);
    });
  });

  B9Workspace.load().then(function (ws) {
    if (ws.tomTargets && Object.keys(ws.tomTargets).length) tomTargets = ws.tomTargets;
    if (ws.processCustom && Object.keys(ws.processCustom).length) custom = ws.processCustom;
    return Promise.all([
      B9Api.fetchKnowledge('process-map'),
      B9Api.fetchKnowledge('process-maturity'),
      B9Api.fetchKnowledge('use-cases'),
    ]);
  })
    .then(function (results) {
      mapData = results[0];
      maturityData = results[1];
      (results[2].useCases || []).forEach(function (u) {
        useCases[u.id] = u.name;
      });
      if (mapData.disclaimer) {
        document.getElementById('process-disclaimer').textContent = mapData.disclaimer;
      }
      allProcessIds().forEach(function (id) {
        if (!tomTargets[id]) tomTargets[id] = 'low';
      });
      renderPipeline('pipeline-client', 'client');
      renderPipeline('pipeline-talent', 'talent');
      renderPipeline('pipeline-overlay', 'overlay');
      renderTomPanel();
      var first = (mapData.processes || []).find(function (p) { return p.group === 'client'; });
      if (first) selectProcess(first.id);
    })
    .catch(function () {
      document.getElementById('process-hint').textContent = 'Could not load process map.';
    });
})();

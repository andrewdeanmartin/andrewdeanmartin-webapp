(function () {
  B9Nav.render('tools');

  var FIT_LABEL = { good: 'Good fit', possible: 'Possible', skip: 'Skip' };
  var STACK_KEY = 'b9_stack_profile';

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  B9Api.fetchKnowledge('tools-landscape')
    .then(function (data) {
      if (data.intro) document.getElementById('tools-intro').textContent = data.intro;
      if (data.disclaimer) document.getElementById('tools-disclaimer').textContent = data.disclaimer;

      document.getElementById('survey-questions').innerHTML = (data.surveyQuestions || [])
        .map(function (q) { return '<li>' + escapeHtml(q) + '</li>'; })
        .join('');

      document.getElementById('stack-scenarios').innerHTML = (data.stackScenarios || [])
        .map(function (s) {
          return (
            '<article class="b9-process-card">' +
            '<h3>' +
            escapeHtml(s.label) +
            '</h3>' +
            '<p><strong>' +
            escapeHtml(s.monthly) +
            '</strong></p>' +
            '<ul class="b9-checklist">' +
            (s.items || []).map(function (i) { return '<li>' + escapeHtml(i) + '</li>'; }).join('') +
            '</ul></article>'
          );
        })
        .join('');

      document.getElementById('tool-categories').innerHTML = (data.categories || [])
        .map(function (cat) {
          var rows = (cat.tools || [])
            .map(function (t) {
              return (
                '<tr class="b9-tool-row b9-tool-row--' +
                (t.fit || 'possible') +
                '"><td><strong>' +
                escapeHtml(t.name) +
                '</strong><br><span class="b9-muted">' +
                escapeHtml(t.purpose) +
                '</span></td><td>' +
                escapeHtml(t.pricing) +
                '</td><td><span class="b9-fit b9-fit--' +
                t.fit +
                '">' +
                escapeHtml(FIT_LABEL[t.fit] || t.fit) +
                '</span></td><td class="b9-muted">' +
                escapeHtml(t.notes) +
                '</td></tr>'
              );
            })
            .join('');

          return (
            '<section class="b9-card" style="margin-top:1rem">' +
            '<h2>' +
            escapeHtml(cat.label) +
            '</h2>' +
            '<p class="b9-muted"><strong>When:</strong> ' +
            escapeHtml(cat.when) +
            '</p>' +
            '<div class="b9-table-wrap"><table class="b9-tools-table">' +
            '<thead><tr><th>Tool</th><th>Pricing</th><th>Fit</th><th>Notes</th></tr></thead>' +
            '<tbody>' +
            rows +
            '</tbody></table></div></section>'
          );
        })
        .join('');
    })
    .catch(function () {
      document.getElementById('tools-intro').textContent = 'Could not load tools landscape.';
    });

  function readLocalStack() {
    try {
      return JSON.parse(localStorage.getItem(STACK_KEY) || '{}');
    } catch (e) {
      return {};
    }
  }

  function writeLocalStack(profile) {
    localStorage.setItem(STACK_KEY, JSON.stringify(profile));
  }

  function renderStackForm(schema, values) {
    document.getElementById('stack-title').textContent = schema.title || 'Current stack survey';
    document.getElementById('stack-intro').textContent = schema.intro || '';
    document.getElementById('stack-form').innerHTML = (schema.fields || [])
      .map(function (field) {
        var val = values[field.id] != null ? values[field.id] : '';
        if (field.type === 'select') {
          var opts = (field.options || [])
            .map(function (opt) {
              return (
                '<option value="' +
                escapeHtml(opt) +
                '"' +
                (val === opt ? ' selected' : '') +
                '>' +
                escapeHtml(opt) +
                '</option>'
              );
            })
            .join('');
          return (
            '<label for="stack-' +
            field.id +
            '">' +
            escapeHtml(field.label) +
            '</label>' +
            '<select class="b9-input" id="stack-' +
            field.id +
            '" name="' +
            field.id +
            '">' +
            '<option value="">—</option>' +
            opts +
            '</select>'
          );
        }
        if (field.type === 'textarea') {
          return (
            '<label for="stack-' +
            field.id +
            '">' +
            escapeHtml(field.label) +
            '</label>' +
            '<textarea class="b9-textarea" id="stack-' +
            field.id +
            '" name="' +
            field.id +
            '" rows="3" placeholder="' +
            escapeHtml(field.placeholder || '') +
            '">' +
            escapeHtml(val) +
            '</textarea>'
          );
        }
        return (
          '<label for="stack-' +
          field.id +
          '">' +
          escapeHtml(field.label) +
          '</label>' +
          '<input class="b9-input" type="text" id="stack-' +
          field.id +
          '" name="' +
          field.id +
          '" value="' +
          escapeHtml(val) +
          '" placeholder="' +
          escapeHtml(field.placeholder || '') +
          '">'
        );
      })
      .join('');
  }

  function collectStackForm(schema) {
    var profile = { updatedAt: new Date().toISOString() };
    (schema.fields || []).forEach(function (field) {
      var el = document.getElementById('stack-' + field.id);
      if (el) profile[field.id] = el.value.trim();
    });
    return profile;
  }

  B9Api.fetchKnowledge('current-stack')
    .then(function (schema) {
      var local = readLocalStack();
      renderStackForm(schema, local);

      B9Api.getStackProfile()
        .then(function (data) {
          if (data.profile && Object.keys(data.profile).length) {
            renderStackForm(schema, data.profile);
            writeLocalStack(data.profile);
            document.getElementById('stack-sync-hint').textContent = 'Loaded from server.';
          }
        })
        .catch(function () {
          document.getElementById('stack-sync-hint').textContent =
            'Offline — saved locally until API is connected.';
        });

      document.getElementById('stack-save').addEventListener('click', function () {
        var profile = collectStackForm(schema);
        writeLocalStack(profile);
        var status = document.getElementById('stack-status');
        status.textContent = 'Saved locally.';
        status.className = 'b9-msg b9-msg--ok';

        B9Api.saveStackProfile(profile)
          .then(function () {
            status.textContent = 'Saved locally and synced to server.';
            document.getElementById('stack-sync-hint').textContent = 'Synced ' + new Date().toLocaleString();
          })
          .catch(function (e) {
            status.textContent =
              'Saved locally. Server sync failed: ' + (e.message || 'API unavailable');
            status.className = 'b9-msg';
          });
      });
    })
    .catch(function () {
      document.getElementById('stack-intro').textContent = 'Could not load stack survey form.';
    });

  function renderFieldsForm(schema, values, prefix) {
    return (schema.fields || [])
      .map(function (field) {
        var val = values[field.id] != null ? values[field.id] : '';
        var fid = prefix + field.id;
        if (field.type === 'textarea') {
          return (
            '<label for="' + fid + '">' + escapeHtml(field.label) + '</label>' +
            '<textarea class="b9-textarea" id="' + fid + '" rows="3" placeholder="' +
            escapeHtml(field.placeholder || '') + '">' + escapeHtml(val) + '</textarea>'
          );
        }
        return (
          '<label for="' + fid + '">' + escapeHtml(field.label) + '</label>' +
          '<input class="b9-input" type="text" id="' + fid + '" value="' +
          escapeHtml(val) + '" placeholder="' + escapeHtml(field.placeholder || '') + '">'
        );
      })
      .join('');
  }

  function collectFieldsForm(schema, prefix) {
    var out = {};
    (schema.fields || []).forEach(function (field) {
      var el = document.getElementById(prefix + field.id);
      if (el) out[field.id] = el.value.trim();
    });
    return out;
  }

  B9Workspace.load().then(function (ws) {
    return B9Api.fetchKnowledge('baselines').then(function (schema) {
      document.getElementById('baselines-title').textContent = schema.title || 'Baseline metrics';
      document.getElementById('baselines-intro').textContent = schema.intro || '';
      document.getElementById('baselines-form').innerHTML = renderFieldsForm(schema, ws.baselines || {}, 'baseline-');

      document.getElementById('baselines-save').addEventListener('click', function () {
        var baselines = collectFieldsForm(schema, 'baseline-');
        B9Workspace.patch({ baselines: baselines });
        var status = document.getElementById('baselines-status');
        status.textContent = 'Baselines saved — synced for the whole team.';
        status.className = 'b9-msg b9-msg--ok';
      });
    });
  }).catch(function () {
    document.getElementById('baselines-intro').textContent = 'Could not load baseline form.';
  });
})();

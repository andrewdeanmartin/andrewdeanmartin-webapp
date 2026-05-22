(function () {
  function baseUrl() {
    return (window.B9_CONFIG && window.B9_CONFIG.apiUrl) || '';
  }

  function headers() {
    const h = { 'Content-Type': 'application/json' };
    const token = window.B9Auth && window.B9Auth.getToken();
    if (token) h.Authorization = 'Bearer ' + token;
    return h;
  }

  async function request(method, path, body) {
    const url = baseUrl() + path;
    const opts = { method, headers: headers() };
    if (body !== undefined) opts.body = JSON.stringify(body);
    const res = await fetch(url, opts);
    const data = await res.json().catch(function () { return {}; });
    if (!res.ok) {
      const err = new Error(data.error || res.statusText || 'Request failed');
      err.status = res.status;
      err.data = data;
      throw err;
    }
    return data;
  }

  window.B9Api = {
    health: function () { return request('GET', '/health'); },
    createSession: function (payload) { return request('POST', '/v1/sessions', payload); },
    getSession: function (id) { return request('GET', '/v1/sessions/' + id); },
    getNextQuestion: function (id) { return request('GET', '/v1/sessions/' + id + '/next-question'); },
    submitAnswer: function (id, payload) { return request('POST', '/v1/sessions/' + id + '/answers', payload); },
    getLearning: function (id) { return request('GET', '/v1/sessions/' + id + '/learning'); },
    synthesize: function (id, payload) { return request('POST', '/v1/sessions/' + id + '/synthesize', payload || {}); },
    getOutcome: function (id) { return request('GET', '/v1/sessions/' + id + '/outcome'); },
    saveTradeoffs: function (id, prefs) { return request('POST', '/v1/sessions/' + id + '/tradeoffs', { prefs }); },
    adminListSessions: function () { return request('GET', '/v1/admin/sessions'); },
    adminGetSession: function (id) { return request('GET', '/v1/admin/sessions/' + id); },
    adminUpdateOutcome: function (id, payload) { return request('PATCH', '/v1/admin/sessions/' + id + '/outcome', payload); },
    adminRegenerate: function (id, payload) { return request('POST', '/v1/admin/sessions/' + id + '/regenerate', payload || {}); },
    downloadMarkdown: function (id) {
      return fetch(baseUrl() + '/v1/sessions/' + id + '/outcome/markdown', { headers: headers() })
        .then(function (r) { return r.text(); });
    },
    getStackProfile: function () { return request('GET', '/v1/client/stack-profile'); },
    saveStackProfile: function (profile) {
      return request('PUT', '/v1/client/stack-profile', { profile: profile });
    },
    getWorkspace: function () { return request('GET', '/v1/client/workspace'); },
    saveWorkspace: function (workspace) {
      return request('PUT', '/v1/client/workspace', { workspace: workspace });
    },
    getFacilitationPack: function () { return request('GET', '/v1/client/facilitation-pack'); },
    getFacilitationPackMarkdown: function () {
      return fetch(baseUrl() + '/v1/client/facilitation-pack?format=markdown', { headers: headers() })
        .then(function (r) {
          if (!r.ok) throw new Error('Export failed');
          return r.text();
        });
    },
    adminExportBackup: function () {
      return fetch(baseUrl() + '/v1/admin/backup', { headers: headers() })
        .then(function (r) { return r.json(); });
    },
    fetchKnowledge: function (name) {
      return fetch('/b9/knowledge/' + name + '.json').then(function (r) { return r.json(); });
    },
  };
})();

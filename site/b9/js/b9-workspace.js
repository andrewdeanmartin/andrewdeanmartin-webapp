(function () {
  'use strict';

  var STORAGE_KEY = 'b9_workspace_cache';
  var DEBOUNCE_MS = 600;
  var timer = null;
  var cache = null;

  function readCache() {
    if (cache) return cache;
    try {
      cache = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    } catch (e) {
      cache = null;
    }
    return cache;
  }

  function mirrorLegacyKeys(data) {
    if (data.tomTargets) localStorage.setItem('b9_tom_targets', JSON.stringify(data.tomTargets));
    if (data.processCustom) localStorage.setItem('b9_process_map_custom', JSON.stringify(data.processCustom));
    if (data.tradeoffPrefs) localStorage.setItem('b9_tradeoff_prefs', JSON.stringify(data.tradeoffPrefs));
  }

  function writeCache(data) {
    cache = data;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    mirrorLegacyKeys(data);
  }

  function loadFromLegacy() {
    function parse(key) {
      try {
        return JSON.parse(localStorage.getItem(key) || 'null') || {};
      } catch (e) {
        return {};
      }
    }
    return {
      tomTargets: parse('b9_tom_targets'),
      processCustom: parse('b9_process_map_custom'),
      tradeoffPrefs: parse('b9_tradeoff_prefs'),
      baselines: {},
      complianceGate: {
        counselReviewed: false,
        pilotInternalOnly: false,
        talentCommsAcknowledged: false,
      },
      lastVisited: {},
    };
  }

  window.B9Workspace = {
    load: function () {
      if (!window.B9Api || !B9Api.getWorkspace) {
        var legacy = loadFromLegacy();
        writeCache(legacy);
        return Promise.resolve(legacy);
      }
      return B9Api.getWorkspace()
        .then(function (res) {
          var ws = res.workspace || {};
          writeCache(ws);
          return ws;
        })
        .catch(function () {
          var legacy = loadFromLegacy();
          writeCache(legacy);
          return legacy;
        });
    },

    get: function () {
      return readCache() || loadFromLegacy();
    },

    patch: function (partial) {
      var cur = readCache() || loadFromLegacy();
      var next = Object.assign({}, cur, partial);
      if (partial.complianceGate) {
        next.complianceGate = Object.assign({}, cur.complianceGate || {}, partial.complianceGate);
      }
      if (partial.baselines) {
        next.baselines = Object.assign({}, cur.baselines || {}, partial.baselines);
      }
      if (partial.lastVisited) {
        next.lastVisited = Object.assign({}, cur.lastVisited || {}, partial.lastVisited);
      }
      writeCache(next);
      clearTimeout(timer);
      if (window.B9Api && B9Api.saveWorkspace) {
        timer = setTimeout(function () {
          B9Api.saveWorkspace(next).catch(function () {});
        }, DEBOUNCE_MS);
      }
      return next;
    },

    setLastVisited: function (info) {
      return this.patch({
        lastVisited: Object.assign({ updatedAt: new Date().toISOString() }, info),
      });
    },
  };
})();

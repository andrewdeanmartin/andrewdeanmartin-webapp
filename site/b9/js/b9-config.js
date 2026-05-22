window.B9_CONFIG = {
  apiUrl:
    typeof window !== 'undefined' && window.location.hostname === 'localhost'
      ? 'http://localhost:3001'
      : window.B9_API_URL || '/b9-api',
};

(function () {
  if (typeof window === 'undefined' || window.location.hostname !== 'localhost') return;
  if (localStorage.getItem('b9_api_token')) return;
  fetch(window.B9_CONFIG.apiUrl + '/dev/token?role=pete')
    .then(function (r) { return r.json(); })
    .then(function (d) {
      if (d.token) {
        localStorage.setItem('b9_api_token', d.token);
        localStorage.setItem('b9_role', d.role || 'pete');
      }
    })
    .catch(function () {});
})();

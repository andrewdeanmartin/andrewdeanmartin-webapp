(function () {
  const TOKEN_KEY = 'b9_api_token';
  const ROLE_KEY = 'b9_role';

  function getToken() {
    return localStorage.getItem(TOKEN_KEY) || '';
  }

  function getRole() {
    return localStorage.getItem(ROLE_KEY) || '';
  }

  function setSession(token, role) {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    if (role) localStorage.setItem(ROLE_KEY, role);
  }

  function clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
  }

  function logout() {
    return fetch('/api/b9-logout', { method: 'POST', credentials: 'same-origin' })
      .finally(function () {
        clearSession();
        window.location.href = '/b9/login.html';
      });
  }

  window.B9Auth = {
    getToken,
    getRole,
    setSession,
    clearSession,
    logout,
  };
})();

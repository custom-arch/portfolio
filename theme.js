(function () {
  const root = document.documentElement;
  const KEY = 'theme';
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)');
  const saved = localStorage.getItem(KEY);

  function setTheme(t) {
    root.setAttribute('data-theme', t);
    localStorage.setItem(KEY, t);
    document.querySelectorAll('[data-theme-btn]').forEach(btn => {
      btn.textContent = t === 'light' ? '☀️' : '🌙';
      btn.setAttribute('aria-label', t === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    });
  }

  // initial
  setTheme(saved || (prefersLight.matches ? 'light' : 'dark'));

  // click toggle
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-theme-btn]');
    if (!btn) return;
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(next);
  });

  // sync across tabs/pages
  window.addEventListener('storage', (e) => {
    if (e.key === KEY && e.newValue) setTheme(e.newValue);
  });
})();
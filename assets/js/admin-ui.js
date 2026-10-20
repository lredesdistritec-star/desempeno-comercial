
/* Ajuste de interfaz: Admin solo consulta. No modifica datos ni formularios de asesores. */
(function () {
  function isAdmin() {
    var name = document.getElementById('sideName');
    var role = document.getElementById('sideRole');
    var n = name ? name.textContent.trim() : '';
    var r = role ? role.textContent.trim() : '';
    return /^admin(?:istrador)?$/i.test(n) || /\badmin(?:istrador)?\b/i.test(r);
  }
  function syncAdminView() {
    var app = document.getElementById('app');
    var active = app && !app.classList.contains('hidden');
    var admin = !!active && isAdmin();
    document.body.classList.toggle('admin-readonly', admin);
    if (admin) {
      var form = document.getElementById('form');
      if (form && !form.classList.contains('hidden') && typeof window.show === 'function') {
        var dash = document.querySelector('.nav button[data-view="dashboard"]');
        window.show('dashboard', dash);
      }
    }
  }
  document.addEventListener('DOMContentLoaded', function () {
    var app = document.getElementById('app');
    var name = document.getElementById('sideName');
    var role = document.getElementById('sideRole');
    var observer = new MutationObserver(syncAdminView);
    [app, name, role].forEach(function (el) {
      if (el) observer.observe(el, { attributes: true, childList: true, characterData: true, subtree: true });
    });
    syncAdminView();
  });
  /* Impide abrir el formulario desde la navegación cuando la sesión es Admin. */
  document.addEventListener('click', function (event) {
    var btn = event.target.closest && event.target.closest('.nav button[data-view="form"]');
    if (btn && isAdmin()) { event.preventDefault(); event.stopImmediatePropagation(); }
  }, true);
})();

/* Login, cadastro, sessão e permissões. */
window.App = window.App || {};
App.auth = {
  user() { const id = App.store.get('session', null); return App.db.users.all().find(u => u.id === id) || null; },
  login(email, pass) {
    const u = App.db.users.all().find(x => x.email === email.trim().toLowerCase() && x.pass === pass);
    if (!u) return { error: 'E-mail ou senha incorretos.' };
    App.store.set('session', u.id); return { user: u };
  },
  signup(name, email, pass) {
    const r = App.users.validate(name, email, pass); if (r.error) return r;
    const u = App.users.create(name, email, pass, null);
    App.store.set('session', u.id); return { user: u };
  },
  logout() { App.store.set('session', null); },
  tabsFor(user) { return App.config.tabs.filter(t => user.role && t.roles.includes(user.role)); }
};

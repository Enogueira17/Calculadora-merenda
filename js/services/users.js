/* Gestão de usuários (uso do administrador). */
window.App = window.App || {};
App.users = {
  all() { return App.db.users.all(); },
  validate(name, email, pass) {
    email = (email || '').trim().toLowerCase();
    if (!name.trim() || !email.includes('@')) return { error: 'Informe o nome e um e-mail válido.' };
    if (pass.length < App.config.minPassword) return { error: 'A senha precisa ter pelo menos ' + App.config.minPassword + ' caracteres.' };
    if (this.all().some(u => u.email === email)) return { error: 'Este e-mail já tem conta.' };
    return {};
  },
  create(name, email, pass, role) {
    const list = this.all(), u = { id: App.uid(), name: name.trim(), email: email.trim().toLowerCase(), pass, role: role || null };
    list.push(u); App.db.users.save(list); return u;
  },
  setRole(id, role) {
    const list = this.all(), u = list.find(x => x.id === id);
    if (!u || u.system) return; u.role = role || null; App.db.users.save(list);
  },
  remove(id) { App.db.users.save(this.all().filter(u => u.id !== id || u.system)); }
};

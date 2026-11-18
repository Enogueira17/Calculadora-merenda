/* Camada de dados. Hoje usa localStorage; na etapa 4 troque só este arquivo pelo Firebase. */
window.App = window.App || {};
App.store = {
  prefix: 'merenda:',
  get(k, d) { try { const v = localStorage.getItem(this.prefix + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(this.prefix + k, JSON.stringify(v)); } catch (e) {} }
};
const repo = name => ({ all: () => App.store.get(name, []), save: list => App.store.set(name, list) });
App.db = { users: repo('users'), meals: repo('meals'), students: repo('students') };

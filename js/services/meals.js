/* Cardápio: cadastro, validação e cálculo de ingredientes. */
window.App = window.App || {};
App.meals = {
  all() { return App.db.meals.all(); },
  get(id) { return this.all().find(m => m.id === id); },
  byPeriod(p) { return this.all().filter(m => m.period === p); },
  save(f) {
    const ings = f.ings.filter(i => i.n.trim() || i.q !== '').map(i => ({ n: i.n.trim(), q: parseFloat(i.q), u: i.u }));
    if (!f.period) return { error: 'Escolha o momento do dia.' };
    if (!f.name.trim()) return { error: 'Informe o nome da refeição.' };
    if (!ings.length) return { error: 'Adicione pelo menos 1 ingrediente.' };
    if (ings.length > App.config.maxIngredients) return { error: 'O máximo é de ' + App.config.maxIngredients + ' ingredientes.' };
    if (ings.some(i => !i.n || !(i.q > 0))) return { error: 'Cada ingrediente precisa de nome e de uma quantidade maior que zero.' };
    const m = { id: f.id || App.uid(), period: f.period, name: f.name.trim(), ings }, list = this.all();
    const x = list.findIndex(y => y.id === m.id); if (x >= 0) list[x] = m; else list.push(m);
    App.db.meals.save(list); return { meal: m };
  },
  remove(id) { App.db.meals.save(this.all().filter(m => m.id !== id)); },
  restore() { App.db.meals.save(App.seed.buildMeals()); },
  /** Total de cada ingrediente para n alunos. */
  report(meal, n) { return meal.ings.map(i => ({ n: i.n, per: i.q, u: i.u, total: i.q * n })); }
};

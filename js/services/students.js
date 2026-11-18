/* Total de alunos informado pela secretaria. */
window.App = window.App || {};
App.students = {
  history() { return App.db.students.all().slice().reverse(); },
  today() { const d = new Date().toDateString(); return this.history().find(c => new Date(c.at).toDateString() === d); },
  add(total, obs, by) {
    if (!(total > 0)) return { error: 'Informe um total de alunos maior que zero.' };
    const list = App.db.students.all(); list.push({ id: App.uid(), total, obs: obs.trim(), by, at: Date.now() });
    App.db.students.save(list); return {};
  }
};

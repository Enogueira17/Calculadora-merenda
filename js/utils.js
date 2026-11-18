/* Funções utilitárias sem regra de negócio. */
window.App = window.App || {};
App.$ = id => document.getElementById(id);
App.esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
App.uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
App.fmtN = n => (Math.round(n * 100) / 100).toLocaleString('pt-BR');
App.fmtQ = (q, u) => {
  if (u === 'g' && q >= 1000) return App.fmtN(q / 1000) + ' kg';
  if (u === 'ml' && q >= 1000) return App.fmtN(q / 1000) + ' L';
  return App.fmtN(q) + ' ' + u;
};
App.todayLabel = () => new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });

/* Inicialização, estado global, navegação e layout. */
(function () {
  const A = window.App, C = A.config, esc = A.esc;
  A.resetCalc = () => { A.state.calc = { total: '', period: null, meal: null, report: false }; };
  A.state = { tab: null, authMode: 'login', msg: null };
  A.resetCalc();

  A.flash = (t, m) => { A.state.msg = { t, m }; A.render(); };
  A.msgHtml = () => A.state.msg ? `<div class="${A.state.msg.t}">${esc(A.state.msg.m)}</div>` : '';
  A.go = tab => { A.state.tab = tab; A.state.msg = null; A.render(); };
  A.logout = () => { A.auth.logout(); A.state.msg = null; A.state.authMode = 'login'; A.render(); };

  A.render = () => {
    const root = A.$('app'), u = A.auth.user();
    if (!u) { root.innerHTML = A.V.auth.render(); return; }
    if (!u.role) {
      root.innerHTML = `<div class="auth"><div class="card"><h1>Aguardando liberação</h1>
        <p class="sub">Sua conta (${esc(u.email)}) foi criada, mas o administrador ainda não liberou um perfil de acesso. Peça a liberação e entre de novo.</p>
        <button class="btn p" onclick="App.logout()">Sair</button></div></div>`;
      return;
    }
    const tabs = A.auth.tabsFor(u);
    if (!tabs.find(t => t.id === A.state.tab)) A.state.tab = tabs[0].id;
    root.innerHTML = `<header class="noprint"><div class="top"><div class="brand">Calculadora de Merenda<small>Sistema interno</small></div>
      <div class="who"><span class="badge">${C.roles[u.role]}</span><span>${esc(u.name)}</span><a onclick="App.logout()">Sair</a></div></div>
      <nav>${tabs.map(t => `<button class="${A.state.tab === t.id ? 'on' : ''}" onclick="App.go('${t.id}')">${t.label}</button>`).join('')}</nav></header>
      <main>${A.V[A.state.tab].render()}</main>`;
  };

  A.seed.run();
  A.render();
})();

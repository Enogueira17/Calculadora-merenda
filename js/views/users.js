/* Tela 4: usuários e acessos (somente administrador). */
(function () {
  const A = window.App, C = A.config, esc = A.esc, $ = A.$;
  A.V = A.V || {};
  const roleSelect = (id, cur, extra) => `<select ${id ? `id="${id}"` : ''} ${extra || ''}><option value="">Sem acesso</option>${Object.entries(C.roles).map(([k, v]) => `<option value="${k}" ${cur === k ? 'selected' : ''}>${v}</option>`).join('')}</select>`;
  A.V.usr = {
    render() {
      const me = A.auth.user(), users = A.users.all();
      return `<h1>Usuários e acessos</h1><p class="sub">Crie contas e defina o perfil de cada pessoa. Quem se cadastra sozinho na tela de login aparece aqui como "Sem acesso" até você liberar um perfil.</p>
      <div class="card"><h2>Criar usuário</h2><div class="row">
        <input id="un" placeholder="Nome" aria-label="Nome">
        <input id="ue" type="email" placeholder="pessoa@escola.gov.br" aria-label="E-mail">
        <input id="up" type="password" placeholder="Senha inicial" aria-label="Senha inicial">
        ${roleSelect('ur', 'auxiliar', 'aria-label="Perfil"')}
        <button class="btn p" onclick="App.V.usr.create()">Criar usuário</button></div>${A.msgHtml()}</div>
      <h2>Usuários cadastrados (${users.length})</h2>
      <div class="card tw"><table><tr><th>Nome</th><th>E-mail</th><th>Perfil</th><th></th></tr>
      ${users.map(u => `<tr><td>${esc(u.name)}${u.id === me.id ? ' <small>(você)</small>' : ''}</td><td>${esc(u.email)}</td>
        <td>${u.system ? '<span class="badge">Administrador</span>' : roleSelect('', u.role, `onchange="App.V.usr.setRole('${u.id}',this.value)" aria-label="Perfil de ${esc(u.name)}"`)}</td>
        <td>${u.system || u.id === me.id ? '' : `<button class="btn s d" onclick="App.V.usr.remove('${u.id}')">Remover</button>`}</td></tr>`).join('')}</table></div>
      <div class="hint">O administrador padrão não pode ser alterado nem removido.</div>`;
    },
    create() {
      const n = $('un').value, e = $('ue').value, p = $('up').value, r = A.users.validate(n, e, p);
      if (r.error) return A.flash('err', r.error);
      A.users.create(n, e, p, $('ur').value); A.flash('ok', 'Usuário criado: ' + e.trim().toLowerCase() + '.');
    },
    setRole(id, role) { A.users.setRole(id, role); A.render(); },
    remove(id) { if (confirm('Remover este usuário?')) { A.users.remove(id); A.render(); } }
  };
})();

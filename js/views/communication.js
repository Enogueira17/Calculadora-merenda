/* Tela 3: comunicação do total de alunos. */
(function () {
  const A = window.App, esc = A.esc;
  A.V = A.V || {};
  A.V.com = {
    render() {
      const hist = A.students.history();
      return `<h1>Comunicação do total de alunos</h1><p class="sub">A secretaria informa quantos alunos terão aula hoje. O chefe de cozinha pode ajustar esse número aqui mesmo, perto da hora da refeição.</p>
      <div class="card"><h2>Informar o total de alunos de hoje</h2><div class="row">
        <input id="ct" type="number" min="1" placeholder="Ex.: 320" style="width:110px" aria-label="Total de alunos">
        <input id="co" placeholder="Observação (opcional)" style="flex:1;min-width:160px" aria-label="Observação">
        <button class="btn p" onclick="App.V.com.send()">Enviar para a cozinha</button></div>${A.msgHtml()}</div>
      <h2>Histórico</h2>
      ${hist.length ? `<div class="card tw"><table><tr><th>Data e hora</th><th>Enviado por</th><th class="n">Alunos</th><th>Observação</th></tr>${hist.map(c =>
        `<tr><td>${new Date(c.at).toLocaleString('pt-BR')}</td><td>${esc(c.by)}</td><td class="n"><b>${c.total}</b></td><td>${esc(c.obs || '—')}</td></tr>`).join('')}</table></div>`
        : '<div class="empty">Nenhum registro ainda.</div>'}`;
    },
    send() {
      const r = A.students.add(parseInt(A.$('ct').value, 10), A.$('co').value, A.auth.user().name);
      if (r.error) return A.flash('err', r.error);
      A.flash('ok', 'Total enviado para a cozinha.');
    }
  };
})();

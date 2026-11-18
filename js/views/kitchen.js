/* Painel da cozinha: resumo do dia. */
(function () {
  const A = window.App, esc = A.esc;
  A.V = A.V || {};
  A.V.painel = {
    render() {
      const com = A.students.today(), c = A.state.calc, ok = c.report && A.meals.get(c.meal);
      return `<h1>Painel da cozinha</h1><p class="sub">Resumo do dia para quem está no preparo. ${A.todayLabel()}.</p>
      <div class="card"><div class="lb" style="margin-top:0">Alunos hoje</div>${com ? `<div class="big">${com.total}</div><div class="hint">Enviado por ${esc(com.by)} às ${new Date(com.at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}${com.obs ? ' · ' + esc(com.obs) : ''}</div>`
       : '<div class="empty">A secretaria ainda não informou o total de hoje.</div>'}</div>
      ${ok ? A.V.calc.report() : `<div class="empty">Nenhum relatório gerado. Vá em Cálculo do dia, escolha a refeição e clique em Gerar relatório.<br><br><button class="btn p" onclick="App.go('calc')">Ir para Cálculo do dia</button></div>`}`;
    }
  };
})();

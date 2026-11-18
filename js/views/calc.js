/* Tela 1: cálculo do dia + relatório de ingredientes. */
(function () {
  const A = window.App, C = A.config, $ = A.$, esc = A.esc, fmtN = A.fmtN;
  A.V = A.V || {};
  A.V.calc = {
    render() {
      const c = A.state.calc, com = A.students.today();
      if (c.total === '' && com) c.total = com.total;
      const ok = c.total > 0, ms = c.period ? A.meals.byPeriod(c.period) : [];
      return `<h1>Cálculo do dia</h1><p class="sub">Escolha a refeição de hoje para calcular quanto separar de cada ingrediente.</p>
      <div class="card"><h2>1. Total de alunos</h2><div class="row"><input id="tt" type="number" min="1" placeholder="Ex.: 320" value="${c.total}" style="width:120px" aria-label="Total de alunos">
       <button class="btn" onclick="App.V.calc.confirmTotal()">Confirmar total</button></div>
       <div class="hint">${ok ? (com && com.total === c.total ? `Total informado pela secretaria hoje: ${com.total} alunos. Você pode ajustar.` : `Calculando para ${c.total} alunos.`) : 'Nenhum total foi informado pela secretaria ainda. Informe um valor acima.'}</div></div>
      <div class="card ${ok ? '' : 'off'}"><h2>2. Tipo de refeição</h2><div class="row">${Object.entries(C.periods).map(([k, v]) => `<button class="chip ${c.period === k ? 'on' : ''}" onclick="App.V.calc.pick('period','${k}')">${v}</button>`).join('')}</div></div>
      <div class="card ${c.period ? '' : 'off'}"><h2>3. Refeição do cardápio</h2>
       ${!c.period ? '<div class="hint">Escolha primeiro o tipo de refeição.</div>' : ms.length ? `<div class="row">${ms.map(m => `<button class="chip ${c.meal === m.id ? 'on' : ''}" onclick="App.V.calc.pick('meal','${m.id}')">${esc(m.name)}</button>`).join('')}</div>`
       : '<div class="hint">Nenhuma refeição cadastrada neste momento do dia. Cadastre em Cadastro de refeições.</div>'}</div>
      <button class="btn p" ${ok && c.meal ? '' : 'disabled'} onclick="App.state.calc.report=true;App.render()">Gerar relatório</button>
      ${c.report && c.meal ? this.report() : ''}`;
    },
    confirmTotal() { const t = parseInt($('tt').value, 10); A.state.calc.total = t > 0 ? t : ''; A.state.calc.report = false; A.render(); },
    pick(k, v) { const c = A.state.calc; c[k] = v; if (k === 'period') c.meal = null; c.report = false; A.render(); },
    report() {
      const c = A.state.calc, m = A.meals.get(c.meal), n = c.total; if (!m) return '';
      return `<div class="card" style="margin-top:24px"><div class="row" style="justify-content:space-between"><div><h2 style="margin:0">Relatório de ingredientes</h2>
       <div class="hint" style="margin:2px 0 0">${C.periods[m.period]}: <b>${esc(m.name)}</b> · ${n} alunos · ${A.todayLabel()}</div></div><button class="btn s noprint" onclick="print()">Imprimir</button></div>
       <div class="tw"><table style="margin-top:12px"><tr><th>Ingrediente</th><th class="n">Por pessoa</th><th class="n">Total para ${n} alunos</th></tr>
       ${A.meals.report(m, n).map(r => `<tr><td>${esc(r.n)}</td><td class="n">${fmtN(r.per)} ${r.u}</td><td class="n"><b>${A.fmtQ(r.total, r.u)}</b></td></tr>`).join('')}</table></div></div>`;
    }
  };
})();

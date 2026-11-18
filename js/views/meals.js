/* Tela 2: cadastro de refeições. */
(function () {
  const A = window.App, C = A.config, $ = A.$, esc = A.esc, fmtN = A.fmtN;
  A.V = A.V || {};
  const blank = () => ({ id: null, period: null, name: '', ings: [{ n: '', q: '', u: 'g' }] });
  let form = blank();
  function sync() {
    if (!$('fn')) return;
    form.name = $('fn').value;
    document.querySelectorAll('.ing').forEach((row, x) => row.querySelectorAll('[data-f]').forEach(el => { form.ings[x][el.dataset.f] = el.value; }));
  }
  A.V.cad = {
    render() {
      const f = form, editing = !!f.id, all = A.meals.all();
      const list = Object.keys(C.periods).map(p => {
        const ms = A.meals.byPeriod(p);
        return `<div class="grp">${C.periods[p]}<small>${ms.length} refeições</small></div>` + (ms.length ? ms.map(m => `<div class="card" style="padding:14px 16px;margin-bottom:10px"><div class="meal">
          <div><b>${esc(m.name)}</b><small>${m.ings.length} ingredientes</small>
          <details><summary>Ver ingredientes (por pessoa)</summary><ul>${m.ings.map(i => `<li>${esc(i.n)}: ${fmtN(i.q)} ${i.u}</li>`).join('')}</ul></details></div>
          <div class="row" style="flex-wrap:nowrap"><button class="btn s" onclick="App.V.cad.edit('${m.id}')">Editar</button><button class="btn s d" onclick="App.V.cad.del('${m.id}')">Excluir</button></div></div></div>`).join('')
          : '<div class="empty">Nenhuma refeição neste momento do dia.</div>');
      }).join('');
      return `<h1>Cadastro de refeições</h1><p class="sub">Cadastre as refeições do cardápio com os ingredientes de cada uma. As quantidades são sempre para uma pessoa.</p>
      <div class="card"><h2>${editing ? 'Editar refeição' : 'Nova refeição'}</h2>
       <div class="lb">Momento do dia</div><div class="row">${Object.entries(C.periods).map(([k, v]) => `<button class="chip ${f.period === k ? 'on' : ''}" onclick="App.V.cad.setPeriod('${k}')">${v}</button>`).join('')}</div>
       <label for="fn">Nome da refeição</label><input id="fn" value="${esc(f.name)}" placeholder="Ex.: Arroz, feijão e frango assado" style="width:100%;max-width:380px">
       <div class="lb">Ingredientes</div><div class="hint" style="margin:0 0 8px">Informe a quantidade de cada ingrediente para uma pessoa. Unidades: g (gramas), ml (mililitros) e un (unidades).</div>
       ${f.ings.map((i, x) => `<div class="ing"><input data-f="n" value="${esc(i.n)}" placeholder="Nome do ingrediente" aria-label="Ingrediente ${x + 1}">
         <input data-f="q" type="number" min="0" step="any" value="${i.q}" placeholder="Por pessoa" aria-label="Quantidade por pessoa">
         <select data-f="u" aria-label="Unidade">${['g', 'ml', 'un'].map(u => `<option ${i.u === u ? 'selected' : ''}>${u}</option>`).join('')}</select>
         <button class="btn s" ${f.ings.length === 1 ? 'disabled' : ''} onclick="App.V.cad.rm(${x})" aria-label="Remover ingrediente">✕</button></div>`).join('')}
       <div class="row"><button class="btn s" ${f.ings.length >= C.maxIngredients ? 'disabled' : ''} onclick="App.V.cad.add()">Adicionar ingrediente</button><span class="hint" style="margin:0">${f.ings.length} de ${C.maxIngredients} ingredientes</span></div>
       ${A.msgHtml()}
       <div class="row" style="margin-top:18px"><button class="btn p" onclick="App.V.cad.save()">${editing ? 'Salvar alterações' : 'Cadastrar refeição'}</button><button class="btn" onclick="App.V.cad.clear()">${editing ? 'Cancelar' : 'Limpar campos'}</button></div></div>
      <div class="row" style="justify-content:space-between;margin-top:30px"><h2 style="margin:0;font-size:20px">Refeições cadastradas (${all.length})</h2>
       <a class="lnk" onclick="App.V.cad.restore()">Restaurar cardápio de exemplo</a></div>${list}`;
    },
    setPeriod(p) { sync(); form.period = p; A.render(); },
    add() { sync(); if (form.ings.length < C.maxIngredients) form.ings.push({ n: '', q: '', u: 'g' }); A.render(); },
    rm(x) { sync(); form.ings.splice(x, 1); A.render(); },
    clear() { form = blank(); A.state.msg = null; A.render(); },
    save() {
      sync(); const r = A.meals.save(form); if (r.error) return A.flash('err', r.error);
      const ed = !!form.id; form = blank();
      A.flash('ok', 'Refeição ' + (ed ? 'atualizada' : 'cadastrada') + '. Ela já aparece em Cálculo do dia.');
    },
    edit(id) { form = JSON.parse(JSON.stringify(A.meals.get(id))); A.state.msg = null; A.render(); scrollTo(0, 0); },
    del(id) {
      const m = A.meals.get(id); if (!confirm('Excluir "' + m.name + '"?')) return;
      A.meals.remove(id); if (A.state.calc.meal === id) A.resetCalc(); A.render();
    },
    restore() { if (confirm('Restaurar o cardápio de exemplo? As refeições atuais serão substituídas.')) { A.meals.restore(); form = blank(); A.resetCalc(); A.render(); } }
  };
})();

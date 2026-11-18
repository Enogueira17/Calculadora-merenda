/* Dados iniciais de demonstração (usuários e cardápio). Roda só na primeira abertura. */
window.App = window.App || {};
App.seed = {
  users: [
    { name: 'Administrador',       email: 'admin@escola.com',      pass: 'admin123',      role: 'admin', system: true },
    { name: 'Maria Secretaria',    email: 'secretaria@escola.com', pass: 'secretaria123', role: 'secretaria' },
    { name: 'Chefe de Cozinha',    email: 'cozinha@escola.com',    pass: 'cozinha123',    role: 'cozinha' },
    { name: 'Auxiliar de Cozinha', email: 'auxiliar@escola.com',   pass: 'auxiliar123',   role: 'auxiliar' },
    { name: 'Analista de QA',      email: 'qa@escola.com',         pass: 'qa123456',      role: 'qa' }
  ],
  meals: [
    'Cuscuz com ovo e leite|cafe|Cuscuz (flocão):40:g;Ovo:50:g;Leite:100:ml;Margarina:5:g;Açúcar:5:g',
    'Pão com margarina e achocolatado|cafe|Pão francês:50:g;Margarina:8:g;Achocolatado em pó:15:g;Leite:150:ml',
    'Mingau de aveia com banana|cafe|Aveia em flocos:25:g;Leite:150:ml;Banana:1:un;Açúcar:8:g',
    'Arroz, feijão e frango assado|almoco|Arroz:60:g;Feijão:50:g;Frango (coxa/sobrecoxa):120:g;Cebola:10:g;Alho:2:g;Óleo:5:ml',
    'Macarrão à bolonhesa com salada|almoco|Macarrão:80:g;Carne moída:60:g;Molho de tomate:50:g;Cebola:10:g;Alface:20:g;Tomate:30:g;Óleo:5:ml',
    'Baião de dois com carne de sol|almoco|Arroz:50:g;Feijão-de-corda:40:g;Carne de sol:70:g;Queijo coalho:20:g;Cebola:10:g;Coentro:2:g',
    'Peixe ao molho com arroz e legumes|almoco|Filé de peixe:110:g;Arroz:60:g;Cenoura:30:g;Chuchu:30:g;Molho de tomate:30:g;Óleo:5:ml',
    'Bolo de cenoura com suco|lanche|Farinha de trigo:30:g;Cenoura:25:g;Ovo:0.3:un;Açúcar:15:g;Óleo:5:ml;Suco de fruta (polpa):50:g',
    'Fruta com biscoito|lanche|Fruta (banana ou maçã):1:un;Biscoito:20:g',
    'Iogurte com granola|lanche|Iogurte:120:ml;Granola:20:g;Mel:5:g'
  ],
  buildMeals() {
    return this.meals.map(s => {
      const [name, period, ings] = s.split('|');
      return { id: App.uid(), name, period, ings: ings.split(';').map(x => { const [n, q, u] = x.split(':'); return { n, q: +q, u }; }) };
    });
  },
  run() {
    if (App.store.get('seeded', false)) return;
    App.db.users.save(this.users.map(u => ({ ...u, id: App.uid() })));
    App.db.meals.save(this.buildMeals());
    App.store.set('seeded', true);
  }
};

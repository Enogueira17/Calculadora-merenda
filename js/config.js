/* Configuração central: perfis, permissões por tela e limites. */
window.App = window.App || {};
App.config = {
  periods: { cafe: 'Café da manhã', almoco: 'Almoço', lanche: 'Lanche da tarde' },
  roles: {
    admin: 'Administrador', secretaria: 'Secretaria', cozinha: 'Chefe de Cozinha',
    auxiliar: 'Auxiliar de Cozinha', qa: 'QA'
  },
  // Quais perfis enxergam cada tela (a ordem define a ordem das abas).
  tabs: [
    { id: 'com',    label: 'Comunicação de alunos', roles: ['admin', 'secretaria', 'cozinha', 'qa'] },
    { id: 'cad',    label: 'Cadastro de refeições', roles: ['admin', 'cozinha', 'qa'] },
    { id: 'calc',   label: 'Cálculo do dia',        roles: ['admin', 'cozinha', 'auxiliar', 'qa'] },
    { id: 'painel', label: 'Painel da cozinha',     roles: ['admin', 'cozinha', 'auxiliar', 'qa'] },
    { id: 'usr',    label: 'Usuários',              roles: ['admin'] }
  ],
  maxIngredients: 20,
  minPassword: 6
};

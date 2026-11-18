# Calculadora de Merenda (protótipo)

Calcula quanto separar de cada ingrediente da merenda para X alunos. Protótipo sem banco de dados:
os dados ficam no navegador (localStorage).

## Como rodar
Abra `index.html` no navegador, ou sirva a pasta:

    npx serve .          # ou: python -m http.server 5173

## Estrutura

    index.html            página única, carrega os scripts na ordem correta
    css/styles.css        estilos
    js/config.js          perfis, permissões por tela, limites
    js/utils.js           funções auxiliares (formatação, escape de HTML)
    js/store.js           camada de dados (localStorage). Trocar pelo Firebase na etapa 4
    js/seed.js            usuários e cardápio de exemplo
    js/services/          regras de negócio: auth, users, meals (cálculo), students
    js/views/             telas: auth, communication, meals, calc, kitchen, users
    js/app.js             estado, navegação e layout

Regra de dependência: views → services → store. As telas nunca acessam o localStorage diretamente.

## Usuários de teste

| Perfil              | E-mail                  | Senha         | Telas                                           |
|---------------------|-------------------------|---------------|-------------------------------------------------|
| Administrador       | admin@escola.com        | admin123      | todas                                           |
| Secretaria          | secretaria@escola.com   | secretaria123 | Comunicação de alunos                           |
| Chefe de Cozinha    | cozinha@escola.com      | cozinha123    | Comunicação, Cadastro, Cálculo, Painel          |
| Auxiliar de Cozinha | auxiliar@escola.com     | auxiliar123   | Cálculo do dia, Painel                          |
| QA                  | qa@escola.com           | qa123456      | todas, exceto Usuários                          |

Atenção: senhas em texto puro só valem para o protótipo. Na etapa 4 a autenticação passa para o Firebase Authentication.

## Para limpar os dados de teste
No navegador: F12 > Application > Local Storage > apagar as chaves `merenda:*`.

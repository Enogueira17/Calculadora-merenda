/* Tela 5: login e criar conta. */
(function () {
  const A = window.App, S = () => A.state, v = id => A.$(id).value;
  A.V = A.V || {};
  A.V.auth = {
    render() {
      const login = S().authMode === 'login';
      return `<div class="auth"><div class="card">
        <h1>Calculadora de Merenda</h1>
        <p class="sub" style="margin-bottom:8px">${login ? 'Entre com seu e-mail e senha.' : 'Crie sua conta. Depois, peça para o administrador liberar seu perfil de acesso.'}</p>
        ${login ? '' : '<label for="an">Nome</label><input id="an" placeholder="Seu nome">'}
        <label for="ae">E-mail</label><input id="ae" type="email" placeholder="voce@escola.gov.br" autocomplete="username">
        <label for="ap">Senha</label><input id="ap" type="password" placeholder="Digite sua senha" autocomplete="current-password" onkeydown="if(event.key==='Enter')App.V.auth.${login ? 'login' : 'signup'}()">
        ${A.msgHtml()}
        <div style="margin-top:18px"><button class="btn p" onclick="App.V.auth.${login ? 'login' : 'signup'}()">${login ? 'Entrar' : 'Criar conta'}</button></div>
        <p style="margin-top:18px"><a class="lnk" onclick="App.V.auth.toggle()">${login ? 'Não tem conta? Criar uma agora' : 'Já tem conta? Entrar'}</a></p>
      </div></div>`;
    },
    login() { const r = A.auth.login(v('ae'), v('ap')); if (r.error) return A.flash('err', r.error); S().tab = null; S().msg = null; A.render(); },
    signup() { const r = A.auth.signup(v('an'), v('ae'), v('ap')); if (r.error) return A.flash('err', r.error); S().tab = null; S().msg = null; A.render(); },
    toggle() { S().authMode = S().authMode === 'login' ? 'signup' : 'login'; S().msg = null; A.render(); }
  };
})();

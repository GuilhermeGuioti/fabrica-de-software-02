// 1. Importar os hooks do React e o cliente Supabase
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

// Seus imports de ícones e CSS
import './AuthPage.css';

const AuthPage = () => {
  // 2. Criar os estados para guardar o que o usuário digita e controlar o loading
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook para redirecionar o usuário
  const { login } = useAuth();

  // 3. Criar a função que lida com o login
  const handleLogin = async (event) => {
    event.preventDefault(); // Impede que a página recarregue
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      login(data.user);
      alert('Login realizado com sucesso!');
      navigate('/admin');
    }
    setLoading(false);
    setPassword('');
    setEmail('');
  };

  return (
    <div className="auth-body">
      <div className="container" id="container">
        <div className="form-container sign-in">
          {/* 4. Conectar a função ao onSubmit do formulário */}
          <form onSubmit={handleLogin}>
            <h1>Entrar</h1>
            <span>Digite seu e-mail e senha</span>

            {/* 5. Conectar os inputs ao estado (value e onChange) */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <a href="#">Esqueceu sua senha?</a>

            {/* 6. Mudar o tipo do botão e desabilitá-lo durante o loading */}
            <button type="submit" className="button-form" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-right">
              <h1>Área Administrativa</h1>
              <p>
                Este é um sistema de acesso restrito. Por favor, utilize suas
                credenciais para entrar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

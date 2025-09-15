// 1. Importar os hooks do React e o cliente Supabase
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient.jsx'; // Verifique se o caminho está correto

// Seus imports de ícones e CSS
import './AuthPage.css';
import { FaGoogle } from 'react-icons/fa';
import { FaFacebookF } from 'react-icons/fa6';

const AuthPage = () => {
  // 2. Criar os estados para guardar o que o usuário digita e controlar o loading
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook para redirecionar o usuário

  // 3. Criar a função que lida com o login
  const handleLogin = async (event) => {
    event.preventDefault(); // Impede que a página recarregue
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      alert('Login realizado com sucesso!');
      navigate('/catalogo'); // Redireciona para a página do catálogo
    }
    setLoading(false);
  };

  return (
    <div className="auth-body">
      <div className="container" id="container">
        <div className="form-container sign-in">
          {/* 4. Conectar a função ao onSubmit do formulário */}
          <form onSubmit={handleLogin}>
            <h1>Entrar</h1>
            <div className="social-icons">
              <a href="#" className="icon">
                <FaGoogle />
              </a>
              <a href="#" className="icon">
                <FaFacebookF />
              </a>
            </div>
            <span>ou use seu e-mail e senha</span>

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
              <h1>Olá, Amigo!</h1>
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

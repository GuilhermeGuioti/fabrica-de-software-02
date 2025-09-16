import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const ProtectedRoute = ({ children }) => {
  // Pega o status de autenticação do nosso contexto
  const { isAuthenticated } = useAuth();

  // Se o usuário NÃO estiver autenticado...
  if (!isAuthenticated) {
    // ...redirecione-o para a página de login.
    return <Navigate to="/login" replace />;
  }

  // Se o usuário ESTIVER autenticado...
  // ...renderize o componente que foi passado como filho (no caso, a AdminPage).
  return children;
};

export default ProtectedRoute;

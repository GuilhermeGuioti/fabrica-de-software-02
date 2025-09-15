import React from 'react';
import { Link } from 'react-router-dom';
import '../Header/Header.css';

function Header() {
  // const location = useLocation();
  // const isHomePage = location.pathname === '/';
  // const headerClasses = `main-header ${isHomePage ? 'transparent-header' : ''}`;

  return (
    <header className="main-header transparent-header">
      <div className="logo">
        <Link to="/">PARKMOVEIS</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/catalogo">Catálogo</Link>
          </li>
          <li>
            <Link to="/sobre">Sobre Nós</Link>
          </li>
          <li>
            <Link to="/contato">Contato</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
      <div className="header-actions">
        <a href="https://wa.me/5516991480055" target="_blank">
          Fale Conosco
        </a>
      </div>
    </header>
  );
}

export default Header;

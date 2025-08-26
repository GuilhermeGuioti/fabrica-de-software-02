import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Header/Header.css';

function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const headerClasses = `main-header ${isHomePage ? 'transparent-header' : ''}`;

  return (
    <header className={headerClasses}>
      <div className="logo">
        <Link to="/">PARKMOVEIS</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/catalogo">Catálogo</Link>
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
            <Link to="/contato">Contato</Link>
          </li>
        </ul>
      </nav>
      <div className="header-actions">
        <Link to="/contato" className="contact-button">
          Fale Conosco
        </Link>
      </div>
    </header>
  );
}

export default Header;

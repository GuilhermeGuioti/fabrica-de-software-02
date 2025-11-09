import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Header/Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Controlar scroll do body quando menu abrir
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    // Cleanup
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="main-header transparent-header">
      <div className="header-container">
        
        {/* 1. Logo (Esquerda) */}
        <div className="logo">
          <Link to="/" onClick={closeMenu}>PARKMOVEIS</Link>
        </div>

        {/* 2. Menu Desktop (Centro) */}
        {/* Note que o botão "Fale Conosco" NÃO está mais aqui dentro */}
        <nav className="desktop-menu">
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
          </ul>
        </nav>

        {/* 3. Botão "Fale Conosco" (Direita) - APENAS DESKTOP */}
        {/* Este é o novo elemento que separamos */}
        <div className="header-actions-desktop">
          <a
            href="https://wa.me/5516991480055"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fale Conosco
          </a>
        </div>

        {/* 4. Botão Hambúrguer (Mobile) */}
        <button
          className={`hamburger-icon ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Abrir menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* 5. Menu Mobile (Oculto) */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <nav className="nav-mobile">
            <ul>
              <li>
                <Link to="/" onClick={closeMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/catalogo" onClick={closeMenu}>
                  Catálogo
                </Link>
              </li>
              <li>
                <Link to="/sobre" onClick={closeMenu}>
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contato" onClick={closeMenu}>
                  Contato
                </Link>
              </li>
            </ul>
            {/* O botão "Fale Conosco" do mobile continua aqui, intacto */}
            <div className="header-actions-mobile">
              <a
                href="https://wa.me/5516991480055"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                Fale Conosco
              </a>
            </div>
          </nav>
        </div>
        
      </div>
    </header>
  );
}

export default Header;
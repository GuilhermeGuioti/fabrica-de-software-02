import React from 'react';
import { Link } from 'react-router-dom';
import './HeroContent.css';

function HeroContent() {
  // Este é o bloco exato do seu código original
  return (
    <div className="hero-content">
      <h1 className="hero-title">Design & Sofisticação</h1>
      <p className="hero-subtitle">
        Móveis e Planejados entregues por quem entende do assunto há mais de 60
        anos.
      </p>
      <Link to="/catalogo" className="hero-button">Confira Nossos Produtos</Link>
    </div>
  );
}

export default HeroContent;

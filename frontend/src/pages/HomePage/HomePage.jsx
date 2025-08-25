import React from 'react';
import './HomePage.css';

// Importe a sua imagem de fundo aqui
import heroBackgroundImage from '../../assets/ImageHero.png';

import HeroContent from '../../components/HeroContent/HeroContent.jsx';
import StatsBar from '../../components/StatsBar/StatsBar.jsx';

function HomePage() {
  // Objeto de estilo para aplicar a imagem de fundo dinamicamente
  const heroStyle = {
    backgroundImage: `url(${heroBackgroundImage})`,
  };

  return (
    <section className="hero-section" style={heroStyle}>
      <div className="hero-overlay"></div>

      {/* E aqui chamamos os componentes que contêm o resto do código */}
      <HeroContent />
      <StatsBar />
    </section>
  );
}

export default HomePage;

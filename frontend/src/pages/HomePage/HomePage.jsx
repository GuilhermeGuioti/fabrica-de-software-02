import React from 'react';
import './HomePage.css';

import heroBackgroundImage from '../../assets/ImageHero.png';

import HeroContent from '../../components/HeroContent/HeroContent.jsx';
import StatsBar from '../../components/StatsBar/StatsBar.jsx';
import Intro from '../../components/Intro/Intro.jsx';
import CategoryContent from '../../components/CategoryContent/CategoryContent.jsx';

function HomePage() {
  const heroStyle = {
    backgroundImage: `url(${heroBackgroundImage})`,
  };

  return (
    <>
      <section className="hero-section" style={heroStyle}>
        <div className="hero-overlay"></div>
        <HeroContent />
        <StatsBar />
      </section>
      <section className="intro-section">
        <Intro />
      </section>
      <section className="category-section">
        <CategoryContent />
      </section>
    </>
  );
}

export default HomePage;

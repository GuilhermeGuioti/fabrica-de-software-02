import React from 'react';
import './HomePage.css';

import heroBackgroundImage from '../../assets/ImageHero.png';

import HeroContent from '../../components/HeroContent/HeroContent.jsx';
import StatsBar from '../../components/StatsBar/StatsBar.jsx';
import Intro from '../../components/Intro/Intro.jsx';

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
    </>
  );
}

export default HomePage;

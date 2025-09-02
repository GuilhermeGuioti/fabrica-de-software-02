import React from 'react';
import './HeroSecond.css';

function HeroSecond({ title, subtitle }) {
  return (
    <section className="hero-second-container">
      <div className="hero-second-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  );
}

export default HeroSecond;

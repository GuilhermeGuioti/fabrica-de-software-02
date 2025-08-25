import React from 'react';
import './StatsBar.css';

function StatsBar() {
  // Este é o bloco exato do seu código original
  return (
    <div className="stats-bar">
      <div className="stat-item">
        <span className="stat-number">35K</span>
        <p className="stat-description">Lares Impactados</p>
      </div>
      <div className="stat-item">
        <span className="stat-number">48K</span>
        <p className="stat-description">Clientes Satisfeitos</p>
      </div>
      <div className="stat-item">
        <span className="stat-number">4.8</span>
        <p className="stat-description">Google</p>
      </div>
      <div className="stat-item">
        <span className="stat-number">65+</span>
        <p className="stat-description">Anos de Experiência</p>
      </div>
    </div>
  );
}

export default StatsBar;

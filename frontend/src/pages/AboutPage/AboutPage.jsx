import React from 'react';
import './AboutPage.css';

import HeroSecond from '../../components/HeroSecond/HeroSecond';
import ValuesSection from '../../components/Values/Values.jsx';

function AboutPage() {
  return (
    <>
      <HeroSecond
        title="Sobre-nós"
        subtitle="Venha conhecer um pouco mais da nossa longa história na área, com mais de 15 anos de experiência e destaque no cenário"
      />
      <div className="about-section">
        <div className="about-title">
          <h3>Sobre nós</h3>
          <h2>Conheça a Parkmoveis</h2>
        </div>

        <div className="about-info-container">
          <div className="about-info-txt">
            <p>
              Desde a nossa fundação, a PARKMOVEIS nasceu de uma paixão:
              transformar casas em lares. Com anos de tradição no mercado
              moveleiro, nossa missão sempre foi unir design atemporal,
              materiais de alta qualidade e um acabamento impecável em cada peça
              que criamos. Acreditamos que móveis são mais do que simples
              objetos; são o cenário das memórias que você irá construir. Por
              isso, cada item em nosso catálogo é selecionado com o máximo
              rigor, pensando na durabilidade, no conforto e na funcionalidade
              que sua família merece. Nossa equipe é formada por especialistas
              dedicados a ajudar você a encontrar a solução perfeita para seu
              espaço. Do atendimento inicial à entrega, nosso compromisso é com
              a sua total satisfação. Seja bem-vindo à nossa família.
            </p>
          </div>
        </div>
        <ValuesSection />
      </div>
    </>
  );
}

export default AboutPage;
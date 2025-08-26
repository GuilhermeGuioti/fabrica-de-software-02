import React from 'react';
import './Intro.css';
import introImg from '../../assets/introducao.jpg';

const Intro = () => {
  return (
    <div className="intro-container">
      {' '}
      {/* Um container para centralizar o conteúdo */}
      {/* Coluna da Esquerda com os Textos */}
      <div className="intro-text-column">
        <h2>Nossas peças, seu estilo</h2>
        <h3>Design que inspira e transforma ambientes</h3>
        <p>
          Explore coleções que unem conforto, funcionalidade e design atemporal.
        </p>
        <div className="intro-highlights">
          <span>Curadoria Especial</span>
          <span>Materiais de Alta Qualidade</span>
        </div>
        <button className="intro-cta-button">Explorar Catálogo Completo</button>
      </div>
      {/* Coluna da Direita com a Imagem */}
      <div className="intro-image-column">
        <img src={introImg} alt="Ambiente sofisticado com móveis da loja" />
      </div>
    </div>
  );
};

export default Intro;

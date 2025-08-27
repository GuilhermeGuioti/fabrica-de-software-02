import React from 'react';
import './CategoryContent.css';
import { FaCrown } from 'react-icons/fa';
import { cardsInfo } from '../../data/category.js';

import Card from '../Card/Card.jsx';

function CategoryContent() {
  return (
    <div className="category-content">
      <div className="category-title">
        <FaCrown className="icon-crow" />
        <h2>Nossas Categorias</h2>
        <h3>Venha conhecer algumas de nossas categorias de móveis</h3>
      </div>
      <div className="category-card-container">
        {cardsInfo.map((card) => (
          <Card
            key={card.id}
            imagem={card.imagem}
            titulo={card.titulo}
            descricao={card.descricao}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryContent;

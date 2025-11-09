import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

const Card = ({ imagem, titulo, descricao }) => {
  return (
    <div className="card">
      <img src={imagem} alt={titulo} className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{titulo}</h2>
        <p className="card-description">{descricao}</p>
        <Link to="/catalogo" className="card-button">Conheça Agora</Link>
      </div>
    </div>
  );
};

export default Card;
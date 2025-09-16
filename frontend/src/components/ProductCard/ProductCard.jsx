import React from 'react';
import './ProductCard.css';

// Você receberá os dados do produto via props
const ProductCard = ({ imagemUrl, categoria, nome, dimensoes, preco }) => {
  return (
    <div className="product-card">
      <div className="product-card__image-container">
        <img src={imagemUrl} alt={nome} className="product-card__image" />
        <span className="product-card__category-tag">{categoria}</span>
      </div>
      <div className="product-card__info">
        <h3 className="product-card__name">{nome}</h3>
        <p className="product-card__dimensions">{dimensoes}</p>
        <p className="product-card__price">{preco}</p>
        <button className="product-card__button">Ver Detalhes</button>
      </div>
    </div>
  );
};

export default ProductCard;

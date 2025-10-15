import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';
import { useProdutos } from '../../hooks/useProdutos.jsx';
import './CatalogPage.css';

import { FaSearch } from 'react-icons/fa';
import HeroSecond from '../../components/HeroSecond/HeroSecond.jsx';

const CatalogPage = () => {
  const { products, loading } = useProdutos();

  if (loading) {
    return <p>Carregando catálogo...</p>;
  }

  return (
    <div className="catalog-page">
      <HeroSecond title={'Catálogo'} />

      <div className="catalog-container">
        <header className="catalog-header">
          <div className="catalog-header__title">
            <h2>Todos os Produtos</h2>
            <p>Encontre o móvel perfeito para você</p>
          </div>
          <div className="catalog-header__search">
            <input type="text" placeholder="Buscar no catálogo..." />
            <button className='btn-search'>
              <FaSearch />
            </button>
          </div>
        </header>

        <main className="catalog-main-content">
          <section className="catalog-page__grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                imagemUrl={product.imageUrl}
                categoria={product.category}
                nome={product.name}
                dimensoes={product.dimensions}
                preco={product.price}
                id = {product.id}
              />
            ))}
          </section>
        </main>
      </div>
    </div>
  );
};

export default CatalogPage;

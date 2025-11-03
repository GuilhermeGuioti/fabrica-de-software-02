import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';
import { useProdutos } from '../../hooks/useProdutos.jsx';
import './CatalogPage.css';

import { FaSearch } from 'react-icons/fa';
import { IoFilter } from "react-icons/io5";
import HeroSecond from '../../components/HeroSecond/HeroSecond.jsx';

const CatalogPage = () => {
  const { products, loading } = useProdutos();
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) {
    return (
      <div className="catalog-page">
        <HeroSecond title={'Catálogo'} />
        <div className="catalog-container">
          <p>Carregando Informacoes...</p>
        </div>
      </div>
    );
  }

  const filteredProducts = products.filter((product) => {
    const searchTermLower = searchTerm.toLocaleLowerCase();

    const nameMatches = product.name.toLocaleLowerCase().includes(searchTermLower);

    return nameMatches;
  })

  return (
    <div className="catalog-page">
      <HeroSecond title={'Catálogo'} />

      <div className="catalog-container">
        <header className="catalog-header">
          <div className="catalog-header__title">
            <h2>Todos os Produtos</h2>
            <p>Encontre o móvel perfeito para você</p>
          </div>
          <div className="catalog-header-container__search">
            <div className="catalog-header__search">
              <input 
                type="text" 
                placeholder="Buscar no catálogo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
              <button className='btn-search'>
                <FaSearch />
              </button>
            </div>
              <button className='btn-filter'>
                <IoFilter />
              </button>
          </div>
        </header>

        <main className="catalog-main-content">
          <section className="catalog-page__grid">
            {filteredProducts.map((product) => (
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

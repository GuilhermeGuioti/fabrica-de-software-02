import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';
import { useProdutos } from '../../hooks/useProdutos.jsx';
import { mockProdutos } from '../../data/mockProdutos.js';
import './CatalogPage.css';

// Importe um ícone de busca, se estiver usando uma biblioteca como react-icons
import { FaSearch } from 'react-icons/fa';
import HeroSecond from '../../components/HeroSecond/HeroSecond.jsx';

const CatalogPage = () => {
  const { produtos, loading } = useProdutos();

  if (loading) {
    return <p>Carregando catálogo...</p>;
  }

  return (
    // O container geral da página agora só serve para o alinhamento
    <div className="catalog-page">
      {/* 1. O BANNER MARROM QUE VOCÊ JÁ TEM */}
      <HeroSecond title={'Catálogo'} />

      {/* 2. O NOVO CONTAINER "FLUTUANTE" */}
      <div className="catalog-container">
        {/* 3. O NOVO CABEÇALHO COM TÍTULO E BUSCA */}
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
            {produtos.map((produto) => (
              <ProductCard
                key={produto.id}
                imagemUrl={produto.imagemUrl}
                categoria={produto.categoria}
                nome={produto.nome}
                dimensoes={produto.dimensoes}
                preco={produto.preco}
              />
            ))}
          </section>
        </main>
      </div>
    </div>
  );
};

export default CatalogPage;

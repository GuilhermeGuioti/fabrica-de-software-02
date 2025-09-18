import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';
import { mockProdutos } from '../../data/mockProdutos.js';
import './CatalogPage.css';

// Importe um ícone de busca, se estiver usando uma biblioteca como react-icons
import { FaSearch } from 'react-icons/fa';
import HeroSecond from '../../components/HeroSecond/HeroSecond.jsx';

const CatalogPage = () => {
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
            <button>
              <FaSearch />
            </button>
          </div>
        </header>

        {/* O conteúdo principal que já tínhamos */}
        <main className="catalog-main-content">
          <aside className="filters-aside">
            {/* --- Seção de Categorias --- */}
            <div className="filter-group">
              <h4>Categorias</h4>
              <ul className="category-list">
                <li><a href="#">Salas de Jantar</a></li>
                <li><a href="#" className="active">Salas de Estar</a></li>
                <li><a href="#">Quartos</a></li>
                <li><a href="#">Cozinhas</a></li>
                <li><a href="#">Escritório</a></li>
              </ul>
            </div>

            {/* --- Seção de Faixa de Preço (Exemplo) --- */}
            <div className="filter-group">
              <h4>Faixa de Preço</h4>
              <div className="price-range-input">
                <input type="range" min="50" max="5000" defaultValue="2500" />
                <div className="price-display">
                  <span>R$ 50</span>
                  <span>R$ 5000</span>
                </div>
              </div>
            </div>

            {/* --- Seção de Cores (Exemplo) --- */}
            <div className="filter-group">
              <h4>Cores</h4>
              <div className="color-swatches">
                <span className="color-swatch" style={{ backgroundColor: '#8B4513' }} title="Marrom"></span>
                <span className="color-swatch" style={{ backgroundColor: '#36454F' }} title="Cinza Chumbo"></span>
                <span className="color-swatch" style={{ backgroundColor: '#F5F5DC' }} title="Bege"></span>
                <span className="color-swatch active" style={{ backgroundColor: '#000000' }} title="Preto"></span>
                <span className="color-swatch" style={{ backgroundColor: '#FFFFFF' }} title="Branco"></span>
              </div>
            </div>
            
            {/* --- Botão de Ação --- */}
            <div className="filter-actions">
                <button className="filter-button">Aplicar Filtros</button>
            </div>
          </aside>

          <section className="catalog-page__grid">
            {mockProdutos.map((produto) => (
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

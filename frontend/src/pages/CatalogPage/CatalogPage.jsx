import React, { useState } from 'react'; // REMOVIDO: useMemo
import ProductCard from '../../components/ProductCard/ProductCard.jsx';
import { useProdutos } from '../../hooks/useProdutos.jsx';
import './CatalogPage.css';

import { FaSearch } from 'react-icons/fa';
import { IoFilter } from "react-icons/io5";
import HeroSecond from '../../components/HeroSecond/HeroSecond.jsx';
import FilterModal from '../../components/FilterModal/FilterModal.jsx';

const CatalogPage = () => {
  const { products, loading } = useProdutos();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // ATUALIZADO: Apenas o estado dos filtros ATIVOS
  const [activeCategories, setActiveCategories] = useState([]);
  
  // REMOVIDO: estado 'selectedCategories' (agora está no modal)

  const openFilterModal = () => setIsFilterModalOpen(true);
  const closeFilterModal = () => setIsFilterModalOpen(false);

  // ATUALIZADO: Esta é a função que o modal vai chamar.
  // Ela recebe as categorias do modal e as define como ativas.
  const handleApplyFilters = (selected) => {
    setActiveCategories(selected);
    // O modal já se fecha sozinho
  };

  // REMOVIDO: 'handleCategoryToggle' (agora está no modal)
  // REMOVIDO: 'allCategories' e 'useMemo'

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

  // ATUALIZADO: A lógica de filtragem continua a mesma
  const filteredProducts = products.filter((product) => {
    const searchTermLower = searchTerm.toLocaleLowerCase();
    const nameMatches = product.name.toLocaleLowerCase().includes(searchTermLower);

    const categoryMatches = activeCategories.length === 0
      ? true
      : activeCategories.includes(product.category);

    return nameMatches && categoryMatches;
  });

  return (
    <div className="catalog-page">
      <HeroSecond title={'Catálogo'} />

      <div className="catalog-container">
        <header className="catalog-header">
          {/* ... seu header de busca ... */}
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
            <button className='btn-filter' onClick={openFilterModal}> 
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

      {/* ATUALIZADO: Passa as novas props para o modal. Não tem mais 'children' */}
      <FilterModal 
        isOpen={isFilterModalOpen} 
        onClose={closeFilterModal}
        onApply={handleApplyFilters}
        activeCategories={activeCategories}
      />
    </div>
  );
};

export default CatalogPage;
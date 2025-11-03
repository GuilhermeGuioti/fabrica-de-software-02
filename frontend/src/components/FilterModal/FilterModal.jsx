import React, { useState, useEffect } from 'react';
import './FilterModal.css';
import { IoClose } from 'react-icons/io5';
import { useCategories } from '../../hooks/useCategories'; // NOVO: Importar o hook

const FilterModal = ({ isOpen, onClose, onApply, activeCategories }) => {
  // NOVO: Estado interno para as seleções *dentro* do modal
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  // NOVO: Busca as categorias do banco
  const { categories, loading, error } = useCategories();

  // NOVO: Sincroniza o estado interno com os filtros ativos QUANDO o modal abre
  useEffect(() => {
    if (isOpen) {
      setSelectedCategories(activeCategories);
    }
  }, [isOpen, activeCategories]); // Depende de 'isOpen'

  if (!isOpen) {
    return null;
  }

  // NOVO: Função interna para marcar/desmarcar
  const handleToggle = (categoryName) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  // NOVO: Função do botão "Aplicar"
  const handleApply = () => {
    onApply(selectedCategories); // Envia as seleções para o 'pai' (CatalogPage)
    onClose(); // Fecha o modal
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  // NOVO: Renderiza o conteúdo dinamicamente
  const renderContent = () => {
    if (loading) {
      return <p>Carregando categorias...</p>;
    }
    if (error) {
      return <p>Erro ao carregar filtros.</p>;
    }
    return categories.map((category) => (
      <div key={category} className="filter-option">
        <input
          type="checkbox"
          id={`filter-${category}`}
          name={category}
          checked={selectedCategories.includes(category)}
          onChange={() => handleToggle(category)}
        />
        <label htmlFor={`filter-${category}`}>{category}</label>
      </div>
    ));
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={handleContentClick}>
        <header className="modal-header">
          <h2>Filtros</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <IoClose size={24} />
          </button>
        </header>

        <div className="modal-body">
          <h3>Categorias</h3>
          {renderContent()} {/* NOVO: Renderiza o conteúdo dinâmico */}
        </div>

        {/* NOVO: Botão de aplicar chama a função interna */}
        <button className="btn-apply-filters" onClick={handleApply}>
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
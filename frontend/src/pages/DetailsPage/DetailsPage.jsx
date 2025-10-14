import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductById } from '../../hooks/useProductById.jsx';
import { useProdutos } from '../../hooks/useProdutos.jsx';      
import ProductCard from '../../components/ProductCard/ProductCard.jsx';               
import HeroSecond from '../../components/HeroSecond/HeroSecond.jsx'; 

import './DetailsPage.css';

const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // --- BUSCANDO DADOS REAIS DO SUPABASE ---
  const { product, loading } = useProductById(id);
  const { produtos: allProducts } = useProdutos(); 
    
  const [activeImageUrl, setActiveImageUrl] = useState(null);

  useEffect(() => {
    // Verifica se o produto existe e tem imagens
    if (product && product.images && product.images.length > 0) {
      // Procura a imagem marcada como 'is_principal' ou, se não houver, usa a primeira da lista
      const mainImage = product.images.find(img => img.is_principal) || product.images[0];
      // Define a URL da imagem encontrada como a imagem ativa
      setActiveImageUrl(mainImage.url_imagem);
    }
  }, [product]); // A lista de dependências diz: "rode este código sempre que 'product' mudar"

  // --- LÓGICA DO BOTÃO DE VOLTAR ---
  const handleGoBack = () => {
    navigate(-1); 
  };

  // --- LÓGICA PARA PRODUTOS RELACIONADOS (100% DINÂMICO) ---
  const relatedProducts = useMemo(() => {
    if (!product || !allProducts) return [];
    
    // Filtra para pegar da mesma categoria, excluindo o atual, e limitando a 4
    return allProducts
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product, allProducts]);

  // --- MOSTRAR MENSAGEM DE CARREGAMENTO ---
  if (loading) {
    return <div className="loading-overlay">Carregando produto...</div>;
  }

  // --- MOSTRAR MENSAGEM DE ERRO SE NÃO ENCONTRAR O PRODUTO ---
  if (!product) {
    return <div className="error-overlay">Produto não encontrado!</div>;
  }

  // --- LÓGICA DO BOTÃO WHATSAPP ---
  const YOUR_PHONE_NUMBER = '5516991480055'; // <-- IMPORTANTE: MUDE PARA O SEU NÚMERO REAL
  const message = `Olá! Tenho interesse no produto: *${product.name}`;
  const whatsappUrl = `https://wa.me/${YOUR_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;

  // Função para formatar o preço
  const formatPrice = (value) => {
    return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <>
      {/* SEU COMPONENTE HERO ENTRA AQUI, PASSANDO O NOME DO PRODUTO COMO TÍTULO */}
      {/* DESCOMENTE A LINHA ABAIXO APÓS AJUSTAR O CAMINHO DO IMPORT */}
      <HeroSecond title={product.name} /> 
      
      <main className="details-page-content-wrapper">
        <button onClick={handleGoBack} className="back-button">
          &larr; Voltar ao catálogo
        </button>

        <div className="product-main-details-section">
          <div className="product-image-gallery">
            {/* 3. A imagem principal agora usa a URL do nosso estado 'activeImageUrl' */}
            <img 
              src={activeImageUrl} 
              alt={product.name} 
              className="main-product-image" 
              key={activeImageUrl} // Key para forçar re-renderização com animações
            />
            {/* 4. Renderizamos a lista de miniaturas clicáveis */}
            {product.images.length > 1 && (
              <div className="product-thumbnail-gallery">
                {product.images.map((image) => (
                  <img
                    key={image.id}
                    src={image.url_imagem}
                    alt={`${product.name} miniatura`}
                    // Define a classe 'active' se a URL da miniatura for a mesma da imagem ativa
                    className={`thumbnail-image ${image.url_imagem === activeImageUrl ? 'active' : ''}`}
                    // Ao clicar, atualiza o estado da imagem ativa
                    onClick={() => setActiveImageUrl(image.url_imagem)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="product-info-block">
            <span className="product-category">{product.category}</span>
            <h1 className="product-name">{product.name}</h1>
            
            <p className="product-price">{formatPrice(product.price)}</p>
            
            {/* Se você tiver 'descricao_completa', exiba-a aqui */}
            {product.fullDescription && (
              <div className="product-full-description">
                <h4>Detalhes do Produto:</h4>
                <p>{product.fullDescription}</p>
              </div>
            )}

            <div className="product-actions">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="whatsapp-cta-button">
                Fale com um Vendedor
              </a>
            </div>
          </div>
        </div>

        {/* --- SEÇÃO DE PRODUTOS RELACIONADOS --- */}
        {relatedProducts.length > 0 && (
          <section className="related-products-section">
            <h2 className="related-products-title">Você também pode gostar</h2>
            <div className="related-products-grid">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default DetailsPage;
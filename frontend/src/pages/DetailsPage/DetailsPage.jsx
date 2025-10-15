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

  const { product, loading } = useProductById(id);
  const { products: allProducts } = useProdutos(); 
    
  const [activeImageUrl, setActiveImageUrl] = useState(null);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      const mainImage = product.images.find(img => img.is_principal) || product.images[0];
      setActiveImageUrl(mainImage.url_imagem);
    }
  }, [product])

  const handleGoBack = () => {
    navigate(-1); 
  };

  const relatedProducts = useMemo(() => {
    if (!product || !allProducts) return [];
    
    return allProducts
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product, allProducts]);

  if (loading) {
    return <div className="loading-overlay">Carregando produto...</div>;
  }

  if (!product) {
    return <div className="error-overlay">Produto não encontrado!</div>;
  }

  const YOUR_PHONE_NUMBER = '5516991480055';
  const message = `Olá! Tenho interesse no produto: *${product.name}`;
  const whatsappUrl = `https://wa.me/${YOUR_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;

  const formatPrice = (value) => {
    return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <>
      <HeroSecond title={product.name} /> 
      
      <main className="details-page-content-wrapper">
        <button onClick={handleGoBack} className="back-button">
          &larr; Voltar ao catálogo
        </button>

        <div className="product-main-details-section">
          <div className="product-image-gallery">
            <img 
              src={activeImageUrl} 
              alt={product.name} 
              className="main-product-image" 
              key={activeImageUrl}
            />
            {product.images.length > 1 && (
              <div className="product-thumbnail-gallery">
                {product.images.map((image) => (
                  <img
                    key={image.id}
                    src={image.url_imagem}
                    alt={`${product.name} miniatura`}
                    className={`thumbnail-image ${image.url_imagem === activeImageUrl ? 'active' : ''}`}
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

        {relatedProducts.length > 0 && (
          <section className="related-products-section">
            <h2 className="related-products-title">Você também pode gostar</h2>
            <div className="related-products-grid">
              {relatedProducts.map(relatedProduct => (
                <ProductCard 
                  key={relatedProduct.id} 
                  imagemUrl={relatedProduct.imageUrl}
                  categoria={relatedProduct.category}
                  nome={relatedProduct.name}
                  dimensoes={relatedProduct.dimensions}
                  preco={relatedProduct.price}
                  id={relatedProduct.id}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default DetailsPage;
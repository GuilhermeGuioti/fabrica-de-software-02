import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient.jsx';

export function useProdutos() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProdutos() {
      const { data, error } = await supabase
        .from('produtos')
        .select(`
          id,
          nome,
          descricao_curta,
          preco,
          categorias ( nome ),
          imagensprodutos ( url_imagem, is_principal )
        `);

      if (error) {
        console.error('Erro ao buscar produtos:', error);
        setLoading(false);
        return;
      }
      
      const formattedProducts = data.map(product => ({
        id: product.id,
        imageUrl: product.imagensprodutos.find(img => img.is_principal)?.url_imagem || product.ImagensProdutos[0]?.url_imagem,
        category: product.categorias.nome,
        name: product.nome,
        dimensions: product.descricao_curta,
        price: product.preco
      }));
      
      setProducts(formattedProducts);
      setLoading(false);
    }

    getProdutos();
  }, []);

  return { products, loading };
}
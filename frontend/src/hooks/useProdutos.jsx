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
      
      // --- DIAGNÓSTICO ADICIONADO ---
      // Abra o console (F12) e veja o que está sendo retornado aqui.
      console.log('Dados brutos do Supabase:', data);
      // ---------------------------------
      
      const formattedProducts = data.map(product => {
        // Esta lógica está CORRETA.
        const imageUrl = product.imagensprodutos?.find(img => img.is_principal)?.url_imagem || 
                         product.imagensprodutos?.[0]?.url_imagem || 
                         ''; // Fallback para uma string vazia

        return {
          id: product.id,
          imageUrl: imageUrl,
          category: product.categorias?.nome || 'Sem Categoria', 
          name: product.nome,
          dimensions: product.descricao_curta,
          price: product.preco
        };
      });
      
      setProducts(formattedProducts);
      setLoading(false);
    }

    getProdutos();
  }, []);

  return { products, loading };
}
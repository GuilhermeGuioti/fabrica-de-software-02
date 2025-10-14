import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient.jsx';

export function useProductById(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    async function getProduct() {
      const { data, error } = await supabase
        .from('produtos')
        .select(`
          id,
          nome,
          descricao_curta,
          descricao_longa,
          preco,
          categorias ( nome ),
          imagensprodutos ( * )
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Erro ao buscar o produto:', error);
        setLoading(false);
        return;
      }

      if (data) {
        const formattedProduct = {
          id: data.id,
          images: data.imagensprodutos, 
          category: data.categorias.nome,
          name: data.nome,
          description: data.descricao_curta,
          dimensions: data.descricao_curta,
          fullDescription: data.descricao_longa || null,
          price: data.preco
        };
        setProduct(formattedProduct);
      }
      
      setLoading(false);
    }

    getProduct();
  }, [id]);

  return { product, loading };
}
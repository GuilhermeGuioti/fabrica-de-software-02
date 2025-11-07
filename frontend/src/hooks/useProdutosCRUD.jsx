import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient.jsx';

export function useProdutosCRUD() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProdutos = useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true);

    const { data, error } = await supabase
      .from('produtos')
      .select(`
        id,
        nome,
        sku,
        descricao_curta,
        descricao_longa,
        preco,
        preco_promocional,
        estoque,
        ativo,
        id_categoria,
        
        categorias ( id, nome ),
        
        imagensprodutos ( id, url_imagem, alt_texto, is_principal )
      `)
      .order('id', { ascending: false });

    if (error) {
      console.error('Erro ao buscar produtos:', error);
      setLoading(false);
      return;
    }

    const formattedProducts = data.map(product => ({
      ...product, // Mantém todos os dados originais do produto
      
      // Campos formatados para exibição na tabela
      displayCategoryName: product.categorias?.nome || 'Sem Categoria',
      displayImageUrl: 
        product.imagensprodutos.find(img => img.is_principal)?.url_imagem || 
        product.imagensprodutos[0]?.url_imagem || 
        '',
    }));

    setProducts(formattedProducts);
    setLoading(false);
  }, []);

  // Efeito para buscar os produtos quando o hook é montado
  useEffect(() => {
    getProdutos();
  }, [getProdutos]);

  // --- FUNÇÕES CRUD ---

  const createProduct = async (productData) => {
    const { data, error } = await supabase
      .from('produtos')
      .insert(productData)
      .select()
      .single(); // Retorna o produto criado

    if (error) {
      console.error('Erro ao criar produto:', error);
      return { error };
    }
    // REMOVIDO: await getProdutos(false); 
    return { data }; // Retorna o produto para pegarmos o ID
  };

  const updateProduct = async (id, productData) => {
    const { data, error } = await supabase
      .from('produtos')
      .update(productData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar produto:', error);
      return { error };
    }
    // REMOVIDO: await getProdutos(false);
    return { data };
  };

  const deleteProduct = async (id) => {
    const { error } = await supabase
      .from('produtos')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao deletar produto:', error);
      return { error };
    }
    // REMOVIDO: await getProdutos(false);
    return { data: true };
  };

  // Expõe o estado, as funções E o getProdutos
  return { 
    products, 
    loading, 
    getProdutos, // <-- EXPORTADO
    createProduct, 
    updateProduct, 
    deleteProduct 
  };
}
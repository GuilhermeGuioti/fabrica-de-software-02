import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient.jsx';

export function useProdutosCRUD() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProdutos = useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true);

    // --- CORREÇÃO AQUI ---
    // Trocamos o "*" por uma lista explícita de colunas da tabela 'produtos'
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
        imagensprodutos ( url_imagem, is_principal )
      `)
      .order('id', { ascending: false }); // Mostra os mais novos primeiro
    // --- FIM DA CORREÇÃO ---

    if (error) {
      // O erro 400 estava acontecendo aqui
      console.error('Erro ao buscar produtos:', error);
      setLoading(false);
      return;
    }

    // Formatamos os dados, mas MANTEMOS os dados originais
    // (como id_categoria) para facilitar a edição.
    const formattedProducts = data.map(product => ({
      ...product, // Mantém: id, nome, preco, estoque, id_categoria, etc.
      
      // Adiciona campos formatados para EXIBIÇÃO na tabela
      displayCategoryName: product.categorias?.nome || 'Sem Categoria',
      displayImageUrl: 
        product.imagensprodutos.find(img => img.is_principal)?.url_imagem || 
        product.imagensprodutos[0]?.url_imagem || 
        '', // Fallback para nenhuma imagem
    }));

    setProducts(formattedProducts);
    setLoading(false);
  }, []);

  // Efeito para buscar os produtos quando o hook é montado
  useEffect(() => {
    getProdutos();
  }, [getProdutos]);

  // --- FUNÇÕES CRUD (Sem alterações, já estavam corretas) ---

  const createProduct = async (productData) => {
    const { data, error } = await supabase
      .from('produtos')
      .insert(productData)
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar produto:', error);
      return { error };
    }
    await getProdutos(false); 
    return { data };
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
    await getProdutos(false);
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
    await getProdutos(false);
    return { data: true };
  };

  // Expõe o estado e as funções
  return { products, loading, createProduct, updateProduct, deleteProduct };
}
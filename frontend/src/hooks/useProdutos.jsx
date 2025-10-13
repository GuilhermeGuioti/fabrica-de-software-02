import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient.jsx';

export function useProdutos() {
  const [produtos, setProdutos] = useState([]);
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
      
      const produtosFormatados = data.map(produto => ({
        id: produto.id,
        // Procura a imagem marcada como principal, se não achar, usa a primeira da lista
        imagemUrl: produto.imagensprodutos.find(img => img.is_principal)?.url_imagem || produto.ImagensProdutos[0]?.url_imagem,
        categoria: produto.categorias.nome,
        nome: produto.nome,
        dimensoes: produto.descricao_curta,
        preco: produto.preco
      }));
      
      setProdutos(produtosFormatados);
      setLoading(false);
    }

    getProdutos();
  }, []);

  // O hook retorna o estado que o componente precisa
  return { produtos, loading };
}
// src/hooks/useCategorias.js
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient.jsx';

export function useCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  // Usamos o useCallback para a função ser estável
  const getCategorias = useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true);
    
    const { data, error } = await supabase
      .from('categorias')
      .select('id, nome')
      .order('nome', { ascending: true });

    if (error) {
      console.error('Erro ao buscar categorias:', error);
    } else {
      setCategorias(data);
    }
    setLoading(false);
  }, []); // O array vazio significa que a função NUNCA muda

  // Roda o getCategorias quando o componente monta
  useEffect(() => {
    getCategorias(true);
  }, [getCategorias]);

  // AQUI ESTÁ A MUDANÇA: Retornamos a função para o componente poder usá-la
  return { categorias, loading, refetchCategorias: getCategorias };
}
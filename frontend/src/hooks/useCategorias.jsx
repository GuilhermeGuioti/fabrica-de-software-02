// src/hooks/useCategorias.js

import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient.jsx';

export function useCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCategorias() {
      const { data, error } = await supabase
        .from('categorias')
        .select('id, nome')
        .order('nome', { ascending: true }); // Ordena por nome

      if (error) {
        console.error('Erro ao buscar categorias:', error);
      } else {
        setCategorias(data);
      }
      setLoading(false);
    }

    getCategorias();
  }, []);

  return { categorias, loading };
}
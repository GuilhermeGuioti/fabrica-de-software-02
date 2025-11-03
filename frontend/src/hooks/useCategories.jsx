import { useState, useEffect } from 'react';
// Ajuste o caminho se for diferente
import { supabase } from '../supabaseClient.jsx'; 

export function useCategories() {
  // O estado inicial é um array vazio, já que vamos mapear os resultados
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // É uma boa prática retornar o erro

  useEffect(() => {
    // Função async interna, igual ao seu padrão
    async function getCategories() {
      
      // Buscamos direto da tabela 'categorias'
      const { data, error } = await supabase
        .from('categorias')
        .select('nome'); // Queremos apenas a coluna 'nome'

      if (error) {
        console.error('Erro ao buscar categorias:', error);
        setError(error.message); // Armazena o erro no estado
        setLoading(false);
        return;
      }

      if (data) {
        // O 'data' virá como: [{ nome: 'Sofás' }, { nome: 'Mesas' }, ...]
        // Precisamos formatar para: ['Mesas', 'Sofás', ...] (um array de strings)
        
        const formattedCategories = data
          .map(item => item.nome) // Extrai apenas o nome
          .sort(); // Ordena alfabeticamente

        setCategories(formattedCategories);
      }
      
      setLoading(false);
    }

    getCategories();
  }, []); // O array de dependências vazio faz o hook rodar apenas uma vez

  // Retorna um objeto, igual ao seu padrão
  return { categories, loading, error };
}
// src/hooks/useCreateCategoria.js
import { useState } from 'react';
import { supabase } from '../supabaseClient.jsx';

// Função para criar um 'slug' (ex: "Sala de Jantar" -> "sala-de-jantar")
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD') // Remove acentos
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-') // Substitui espaços por -
    .replace(/[^\w-]+/g, '') // Remove caracteres não-alfanuméricos
    .replace(/--+/g, '-'); // Remove hífens duplicados
}

export function useCreateCategoria() {
  const [isCreating, setIsCreating] = useState(false);

  const createCategoria = async (nome) => {
    if (!nome) return { error: { message: "Nome não pode ser vazio" } };
    
    setIsCreating(true);
    const slug = slugify(nome); // Gera o slug
    
    const { data, error } = await supabase
      .from('categorias')
      .insert({ nome: nome, slug: slug })
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar categoria:', error);
      setIsCreating(false);
      return { error };
    }
    
    setIsCreating(false);
    return { data };
  };

  return { isCreating, createCategoria };
}
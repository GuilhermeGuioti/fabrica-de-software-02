import { createClient } from '@supabase/supabase-js';

// Cole a URL e a Chave que você pegou no Passo 1
const supabaseUrl = 'https://bqnwfykvxlqydkwznqjr.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxbndmeWt2eGxxeWRrd3pucWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5NjEwMDcsImV4cCI6MjA3MzUzNzAwN30.0f9_6Gmn0pLm6MoJ59rCeLS4SlfC2fgKkl7lgu0WcK8';

// Cria e exporta o cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);

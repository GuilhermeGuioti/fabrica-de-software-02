import { createClient } from '@supabase/supabase-js';


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASEKEY;

// Cria e exporta o cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);

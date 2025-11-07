import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { v4 as uuidv4 } from 'uuid'; // Instale: npm install uuid

// IMPORTANTE: Coloque aqui o nome exato do seu Bucket no Supabase Storage
const BUCKET_NAME = 'imagens-produtos'; // <-- CONFIRME ESTE NOME

export function useProductStorage() {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file, productId, onUploadSuccess) => {
    if (!file || !productId) return;

    setUploading(true);
    
    console.log('CLIENTE SUPABASE URL:', supabase.storageUrl);

    const fileExt = file.name.split('.').pop();
    const fileName = `${productId}/${uuidv4()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file);

    if (uploadError) {
      console.error('Erro no upload da imagem:', uploadError);
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    if (!publicUrlData) {
      console.error('Erro ao pegar URL pública');
      setUploading(false);
      return;
    }
    
    const publicUrl = publicUrlData.publicUrl;

    const { error: dbError } = await supabase
      .from('imagensprodutos')
      .insert({
        id_produto: productId,
        url_imagem: publicUrl,
        alt_texto: file.name,
        is_principal: false, 
      });

    if (dbError) {
      console.error('Erro ao salvar imagem no banco:', dbError);
    } else {
      if (onUploadSuccess) onUploadSuccess();
    }
    
    setUploading(false);
  };

  const deleteImage = async (image, onDeleteSuccess) => {
    if (!image) return;

    const fileName = image.url_imagem.split(`${BUCKET_NAME}/`).pop();

    if (!fileName) {
        console.error("Não foi possível extrair o nome do arquivo da URL.");
        return;
    }

    const { error: storageError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([fileName]);
      
    if (storageError) {
      console.error('Erro ao deletar do Storage:', storageError);
    }

    const { error: dbError } = await supabase
      .from('imagensprodutos')
      .delete()
      .eq('id', image.id);

    if (dbError) {
      console.error('Erro ao deletar do banco:', dbError);
    } else {
      if (onDeleteSuccess) onDeleteSuccess();
    }
  };
  

  return { uploading, uploadImage, deleteImage };
}
import React, { useState } from 'react';
import {
  Container, Typography, Button, Box, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton, Modal, TextField,
  Backdrop, Fade, CircularProgress, Switch, FormControlLabel, MenuItem,
  Select, InputLabel, FormControl, InputAdornment, List, ListItem,
  ListItemText, ListItemIcon, ListItemSecondaryAction, Divider, 
  ImageList, ImageListItem, ImageListItemBar
} from '@mui/material';
import {
  Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon,
  Search as SearchIcon, Close as CloseIcon, Image as ImageIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';

// 1. Importar seus hooks
import { useProdutosCRUD } from '../../hooks/useProdutosCRUD'; // Ajuste o caminho
import { useCategorias } from '../../hooks/useCategorias'; // Ajuste o caminho
import { useProductStorage } from '../../hooks/useProductStorage'; // Ajuste o caminho
import HeroSecond from '../../components/HeroSecond/HeroSecond.jsx'; // Ajuste o caminho

// Estilo do Modal de ADICIONAR/EDITAR
const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '600px',
  maxHeight: '90vh',
  overflowY: 'hidden', 
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: 0, 
  display: 'flex',
  flexDirection: 'column',
};

// Estilo do Modal de EXCLUIR
const styleDeleteModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '400px',
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: { xs: 3, md: 4 }, 
};

// Estado inicial para um novo produto
const initialState = {
  id: null,
  nome: '',
  sku: '',
  descricao_curta: '',
  descricao_longa: '',
  preco: 0,
  preco_promocional: null,
  estoque: 0,
  ativo: true,
  id_categoria: '',
  imagensprodutos: [], // Garante que é um array
};

// --- COMPONENTE PRINCIPAL DO PAINEL ---
function ProductAdmin() {
  // --- Hooks e Estados ---
  const { 
    products, 
    loading, 
    getProdutos, // <-- AGORA IMPORTADO
    createProduct, 
    updateProduct, 
    deleteProduct 
  } = useProdutosCRUD();
    
  const { categorias, loading: loadingCategorias } = useCategorias();
  const { uploading, uploadImage, deleteImage } = useProductStorage();

  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(initialState);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [filesToUpload, setFilesToUpload] = useState([]);

  // --- Handlers ---

  const handleOpenModal = () => {
    setIsEditing(false);
    setCurrentProduct(initialState);
    setFilesToUpload([]);
    setOpenModal(true);
  };

  const handleOpenEditModal = (product) => {
    setIsEditing(true);
    // Garante que o estado inicial tenha todos os campos
    setCurrentProduct({
      ...initialState, 
      ...product,
      // Garante que campos nulos não quebrem os inputs
      sku: product.sku || '',
      descricao_curta: product.descricao_curta || '',
      descricao_longa: product.descricao_longa || '',
      preco_promocional: product.preco_promocional || '',
      id_categoria: product.id_categoria || '',
    });
    setFilesToUpload([]);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setCurrentProduct((prev) => ({ ...prev, [name]: checked }));
      return;
    }
    let finalValue = value;
    // Converte para null se o campo numérico for apagado
    if (type === 'number' && value === '') {
      finalValue = null;
    } else if (type === 'number') {
      finalValue = parseFloat(value);
    }
    // Permite "limpar" o preço promocional
    if (name === 'preco_promocional' && value === '') {
      finalValue = null; 
    }
    
    setCurrentProduct((prev) => ({ ...prev, [name]: finalValue }));
  };
  
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFilesToUpload(Array.from(e.target.files));
    }
  };

  const handleRemoveNewFile = (fileName) => {
    setFilesToUpload(filesToUpload.filter(file => file.name !== fileName));
  };

  const handleDeleteExistingImage = async (image) => {
    if (window.confirm("Tem certeza que deseja deletar esta imagem?")) {
      await deleteImage(image, () => {
        // 1. Atualiza a UI do modal instantaneamente
        setCurrentProduct(prev => ({
          ...prev,
          imagensprodutos: prev.imagensprodutos.filter(img => img.id !== image.id)
        }));
        // 2. Atualiza a lista principal (em background)
        if(getProdutos) getProdutos(false); 
      });
    }
  };

  // --- LÓGICA DE SUBMIT (COM UPDATE CORRIGIDO) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uploading) return;

    // 1. PREPARA OS DADOS
    // Pega o ID e o resto dos dados
    const { id, ...dataToSave } = currentProduct;
    
    // 2. *** A CORREÇÃO DO UPDATE ESTÁ AQUI ***
    // Removemos os objetos aninhados que não pertencem à tabela 'produtos'
    // Isso é o que quebra o seu 'update'
    delete dataToSave.categorias;
    delete dataToSave.imagensprodutos;
    delete dataToSave.displayCategoryName;
    delete dataToSave.displayImageUrl;

    // 3. Garante que campos vazios sejam 'null' e não '0' ou ''
    dataToSave.preco_promocional = dataToSave.preco_promocional || null;
    dataToSave.sku = dataToSave.sku || null;
    dataToSave.descricao_curta = dataToSave.descricao_curta || null;
    dataToSave.descricao_longa = dataToSave.descricao_longa || null;

    try {
      if (isEditing) {
        // --- LÓGICA DE UPDATE ---
        await updateProduct(id, dataToSave);
        
        // Faz o upload de novas imagens (se houver)
        if (filesToUpload.length > 0) {
          for (const file of filesToUpload) {
            await uploadImage(file, id, null); 
          }
        }
      } else {
        // --- LÓGICA DE CREATE ---
        delete dataToSave.id;
        
        // 1. Cria o produto e pega o ID de volta
        const { data: newProduct, error } = await createProduct(dataToSave);
        
        if (error || !newProduct) {
          throw new Error("Erro ao criar o produto.");
        }
        
        const newProductId = newProduct.id;
        
        // 2. Se houver arquivos, faz o upload deles com o novo ID
        if (filesToUpload.length > 0) {
          for (const file of filesToUpload) {
            await uploadImage(file, newProductId, null);
          }
        }
      }
      
      // 3. SUCESSO: Recarrega a lista e fecha o modal
      if(getProdutos) getProdutos(false); 
      handleCloseModal();
      
    } catch (err) {
      console.error("Falha no handleSubmit:", err);
    }
  };
  
  // --- LÓGICA DE DELETE (CORRIGIDA) ---
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setProductToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      await deleteProduct(productToDelete.id);
      if(getProdutos) getProdutos(false); // <-- Recarrega a lista
      handleCloseDeleteModal();
    }
  };

  const filteredProducts = products.filter((product) =>
    product.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- RENDERIZAÇÃO DO COMPONENTE ---
  return (
    <>
      <HeroSecond title={'Painel Administrativo'} /> 
      
      <Container maxWidth="lg" sx={{ mt: { xs: '-50px', md: '-100px' }, position: 'relative', zIndex: 10, mb: 4 }}>
        <Paper
          elevation={6}
          sx={{
            borderRadius: '20px',
            padding: { xs: 2, md: 4 },
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
          }}
        >
          {/* --- CABEÇALHO (HEADER) --- */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', md: 'center' },
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
              mb: 4,
              pb: 3,
              borderBottom: '1px solid #e0e0e0',
            }}
          >
            <Typography variant="h4" component="h1" sx={{ fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
              Gerenciador de Produtos
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', width: { xs: '100%', md: 'auto' } }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Buscar na produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: ( <InputAdornment position="start"> <SearchIcon /> </InputAdornment> ),
                  sx: { borderRadius: '8px' },
                }}
                sx={{ flex: 1, minWidth: '200px' }} 
              />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenModal}
                sx={{
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  width: { xs: '100%', sm: 'auto' },
                }}
              >
                Adicionar Produto
              </Button>
            </Box>
          </Box>

          {/* --- TABELA DE PRODUTOS (READ) --- */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer
              sx={{
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.07)',
              }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow sx={{ background: 'linear-gradient(90deg, #8B4513, #a0522d)' }} >
                    <TableCell sx={headCell}>Produto</TableCell>
                    <TableCell sx={headCell}>Categoria</TableCell>
                    <TableCell sx={headCell} align="right">Preço (R$)</TableCell>
                    <TableCell sx={{ ...headCell, display: { xs: 'none', md: 'table-cell' } }} align="right"> Estoque </TableCell>
                    <TableCell sx={{ ...headCell, display: { xs: 'none', sm: 'table-cell' } }} align="center"> Ativo </TableCell>
                    <TableCell sx={headCell} align="center">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: '#fdf5ef' }, }} >
                      <TableCell component="th" scope="row">{product.nome}</TableCell>
                      <TableCell>{product.displayCategoryName}</TableCell>
                      <TableCell align="right">{product.preco}</TableCell>
                      <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }} align="right"> {product.estoque} </TableCell>
                      <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }} align="center"> {product.ativo ? 'Sim' : 'Não'} </TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" onClick={() => handleOpenEditModal(product)} > <EditIcon /> </IconButton>
                        <IconButton color="error" onClick={() => handleDeleteClick(product)} > <DeleteIcon /> </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>

        {/* --- MODAL DE ADICIONAR/EDITAR (ATUALIZADO) --- */}
        <Modal open={openModal} onClose={handleCloseModal} closeAfterTransition BackdropComponent={Backdrop} >
          <Fade in={openModal}>
            <Box component="form" onSubmit={handleSubmit} sx={styleModal}>
              
              {/* 1. CABEÇALHO DO MODAL */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid #e0e0e0' }}>
                <Typography variant="h6" component="h2">
                  {isEditing ? 'Editar Produto' : 'Adicionar Novo Produto'}
                </Typography>
                <IconButton onClick={handleCloseModal}><CloseIcon /></IconButton>
              </Box>

              {/* 2. CONTEÚDO DO MODAL (FORMULÁRIO) */}
              <Box sx={{ p: 3, overflowY: 'auto' }}>
                <TextField fullWidth label="Nome do Produto" name="nome" value={currentProduct.nome} onChange={handleChange} margin="normal" required />
                <FormControl fullWidth margin="normal" required>
                  <InputLabel id="categoria-select-label">Categoria</InputLabel>
                  <Select labelId="categoria-select-label" label="Categoria" name="id_categoria" value={currentProduct.id_categoria} onChange={handleChange}>
                    {loadingCategorias ? ( <MenuItem value="">Carregando...</MenuItem> ) : (
                      categorias.map((cat) => ( <MenuItem key={cat.id} value={cat.id}>{cat.nome}</MenuItem> ))
                    )}
                  </Select>
                </FormControl>
                <TextField fullWidth label="SKU (Opcional)" name="sku" value={currentProduct.sku} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="Descrição Curta" name="descricao_curta" value={currentProduct.descricao_curta} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="Descrição Longa (Opcional)" name="descricao_longa" value={currentProduct.descricao_longa} onChange={handleChange} margin="normal" multiline rows={3} />
                
                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                  <TextField label="Preço" name="preco" type="number" value={currentProduct.preco} onChange={handleChange} margin="normal" required sx={{ flex: 1 }} />
                  <TextField label="Preço Promocional (Opcional)" name="preco_promocional" type="number" value={currentProduct.preco_promocional || ''} onChange={handleChange} margin="normal" sx={{ flex: 1 }} />
                  <TextField label="Estoque" name="estoque" type="number" value={currentProduct.estoque} onChange={handleChange} margin="normal" required sx={{ flex: 1 }} />
                </Box>
                
                <FormControlLabel control={<Switch checked={currentProduct.ativo} onChange={handleChange} name="ativo" />} label="Produto Ativo" sx={{ mt: 1 }} />
                
                {/* --- SEÇÃO DE IMAGENS --- */}
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" gutterBottom> Imagens </Typography>

                {/* IMAGENS EXISTENTES (SÓ APARECE NO MODO DE EDIÇÃO) */}
                {isEditing && currentProduct.imagensprodutos?.length > 0 && (
                  <>
                    <Typography variant="subtitle2" color="text.secondary">Imagens Atuais</Typography>
                    <ImageList sx={{ width: '100%', height: 180 }} cols={4} rowHeight={160}>
                      {currentProduct.imagensprodutos.map((image) => (
                        <ImageListItem key={image.id}>
                          <img
                            src={`${image.url_imagem}?w=160&h=160&fit=crop&auto=format`}
                            alt={image.alt_texto || ''}
                            loading="lazy"
                            style={{ borderRadius: '8px' }}
                          />
                          <ImageListItemBar
                            position="top"
                            sx={{ background: 'none' }}
                            actionIcon={
                              <IconButton
                                sx={{ color: 'white', background: 'rgba(0,0,0,0.3)', p: 0.5 }}
                                onClick={() => handleDeleteExistingImage(image)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            }
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </>
                )}
                
                {/* UPLOAD DE NOVAS IMAGENS */}
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>Adicionar Novas Imagens</Typography>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                  >
                    Selecionar Arquivos
                    <input 
                      type="file" 
                      hidden 
                      multiple
                      accept="image/png, image/jpeg, image/webp"
                      onChange={handleFileChange} 
                    />
                  </Button>
                </Box>
                
                {filesToUpload.length > 0 && (
                  <List dense>
                    {filesToUpload.map((file, index) => (
                      <ListItem key={index} disableGutters>
                        <ListItemIcon sx={{minWidth: '32px'}}><ImageIcon fontSize="small" /></ListItemIcon>
                        <ListItemText
                          primary={file.name}
                          secondary={`${(file.size / 1024).toFixed(1)} KB`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" onClick={() => handleRemoveNewFile(file.name)}>
                            <DeleteIcon color="error" fontSize="small" />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                )}

              </Box>

              {/* 3. RODAPÉ DO MODAL */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 2,
                  p: 2,
                  borderTop: '1px solid #e0e0e0',
                }}
              >
                <Button variant="outlined" color="inherit" onClick={handleCloseModal}>
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  variant="contained" 
                  disabled={uploading}
                >
                  {uploading ? <CircularProgress size={24} color="inherit" /> : 'Salvar'}
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>

        {/* --- MODAL DE CONFIRMAÇÃO DE EXCLUSÃO --- */}
        <Modal open={openDeleteModal} onClose={handleCloseDeleteModal} closeAfterTransition BackdropComponent={Backdrop} >
          <Fade in={openDeleteModal}>
            <Box sx={styleDeleteModal}>
              <Typography variant="h6" component="h2"> Confirmar Exclusão </Typography>
              <Typography sx={{ mt: 2 }}>
                Tem certeza que deseja excluir o produto:
                <strong> {productToDelete?.nome}</strong>?
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                Esta ação não pode ser desfeita.
              </Typography>
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="outlined" color="inherit" onClick={handleCloseDeleteModal}>
                  Cancelar
                </Button>
                <Button variant="contained" color="error" onClick={handleConfirmDelete}>
                  Excluir
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      
      </Container>
    </> 
  );
}

// Objeto de estilo para os cabeçalhos da tabela
const headCell = {
  color: 'white',
  fontWeight: 600,
  fontSize: '0.85rem',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  borderBottom: 'none',
  borderRight: '1px solid rgba(255, 255, 255, 0.15)',
  '&:last-child': {
    borderRight: 'none',
  },
};

export default ProductAdmin;
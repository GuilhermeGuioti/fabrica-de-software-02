import React, { useState } from 'react';
import {
  Container, Typography, Button, Box, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton, Modal, TextField,
  Backdrop, Fade, CircularProgress, Switch, FormControlLabel, MenuItem,
  Select, InputLabel, FormControl, InputAdornment, List, ListItem,
  ListItemText, ListItemIcon, ListItemSecondaryAction, Divider, 
  ImageList, ImageListItem, ImageListItemBar,
  // NOVO: Imports para o mini-modal
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon,
  Search as SearchIcon, Close as CloseIcon, Image as ImageIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';

// 1. Importar seus hooks
import { useProdutosCRUD } from '../../hooks/useProdutosCRUD';
// ATUALIZADO: Precisa dos hooks corretos
import { useCategorias } from '../../hooks/useCategorias'; // Precisa ser o hook que exporta 'refetchCategorias'
import { useCreateCategoria } from '../../hooks/useCreateCategoria'; // Precisa deste novo hook
import { useProductStorage } from '../../hooks/useProductStorage';
import HeroSecond from '../../components/HeroSecond/HeroSecond.jsx';

// ... (styleModal, styleDeleteModal, initialState - sem alteração) ...
const styleModal = {
  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
  width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'hidden', 
  bgcolor: 'background.paper', borderRadius: '12px', boxShadow: 24, p: 0, 
  display: 'flex', flexDirection: 'column',
};
const styleDeleteModal = {
  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
  width: '90%', maxWidth: '400px', bgcolor: 'background.paper', borderRadius: '12px',
  boxShadow: 24, p: { xs: 3, md: 4 }, 
};
const initialState = {
  id: null, nome: '', sku: '', descricao_curta: '', descricao_longa: '',
  preco: 0, preco_promocional: null, estoque: 0, ativo: true,
  id_categoria: '', imagensprodutos: [],
};


// --- COMPONENTE PRINCIPAL DO PAINEL ---
function ProductAdmin() {
  // --- Hooks e Estados ---
  const { 
    products, 
    loading, 
    getProdutos,
    createProduct, 
    updateProduct, 
    deleteProduct 
  } = useProdutosCRUD();
    
  // ATUALIZADO: Pega o 'refetchCategorias' do hook
  const { categorias, loading: loadingCategorias, refetchCategorias } = useCategorias();
  const { uploading, uploadImage, deleteImage } = useProductStorage();
  
  // NOVO: Hook para criar a categoria
  const { isCreating, createCategoria } = useCreateCategoria();

  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(initialState);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [filesToUpload, setFilesToUpload] = useState([]);

  // NOVO: Estados para o mini-modal de categoria
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  // --- Handlers ---
  const handleOpenModal = () => { setIsEditing(false); setCurrentProduct(initialState); setFilesToUpload([]); setOpenModal(true); };
  const handleOpenEditModal = (product) => { setIsEditing(true); setCurrentProduct({ ...initialState, ...product, sku: product.sku || '', descricao_curta: product.descricao_curta || '', descricao_longa: product.descricao_longa || '', preco_promocional: product.preco_promocional || '', id_categoria: product.id_categoria || '', }); setFilesToUpload([]); setOpenModal(true); };
  const handleCloseModal = () => { setOpenModal(false); };
  const handleChange = (e) => { const { name, value, type, checked } = e.target; if (type === 'checkbox') { setCurrentProduct((prev) => ({ ...prev, [name]: checked })); return; } let finalValue = value; if (type === 'number' && value === '') { finalValue = null; } else if (type === 'number') { finalValue = parseFloat(value); } if (name === 'preco_promocional' && value === '') { finalValue = null; } setCurrentProduct((prev) => ({ ...prev, [name]: finalValue })); };
  const handleFileChange = (e) => { if (e.target.files) { setFilesToUpload(Array.from(e.target.files)); } };
  const handleRemoveNewFile = (fileName) => { setFilesToUpload(filesToUpload.filter(file => file.name !== fileName)); };
  const handleDeleteExistingImage = async (image) => { if (window.confirm("Tem certeza que deseja deletar esta imagem?")) { await deleteImage(image, () => { setCurrentProduct(prev => ({ ...prev, imagensprodutos: prev.imagensprodutos.filter(img => img.id !== image.id) })); if(getProdutos) getProdutos(false); }); } };
  
  // --- CORREÇÃO AQUI ---
  // Esta é a sua lógica original de handleSubmit, que funciona com o seu hook.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uploading) return;

    const { id, ...dataToSave } = currentProduct;
    
    delete dataToSave.categorias;
    delete dataToSave.imagensprodutos;
    delete dataToSave.displayCategoryName;
    delete dataToSave.displayImageUrl;

    dataToSave.preco_promocional = dataToSave.preco_promocional || null;
    dataToSave.sku = dataToSave.sku || null;
    dataToSave.descricao_curta = dataToSave.descricao_curta || null;
    dataToSave.descricao_longa = dataToSave.descricao_longa || null;

    try {
      if (isEditing) {
        // --- LÓGICA DE UPDATE ---
        await updateProduct(id, dataToSave);
        
        if (filesToUpload.length > 0) {
          for (const file of filesToUpload) {
            // Chamada com 3 argumentos (compatível com seu hook original)
            await uploadImage(file, id, null); 
          }
        }
      } else {
        // --- LÓGICA DE CREATE ---
        delete dataToSave.id;
        const { data: newProduct, error } = await createProduct(dataToSave);
        
        if (error || !newProduct) {
          throw new Error("Erro ao criar o produto.");
        }
        
        const newProductId = newProduct.id;
        
        if (filesToUpload.length > 0) {
          for (const file of filesToUpload) {
            // Chamada com 3 argumentos (compatível com seu hook original)
            await uploadImage(file, newProductId, null);
          }
        }
      }
      
      if(getProdutos) getProdutos(false); 
      handleCloseModal();
      
    } catch (err) {
      console.error("Falha no handleSubmit:", err);
    }
  };
  // --- FIM DA CORREÇÃO ---
  
  const handleDeleteClick = (product) => { setProductToDelete(product); setOpenDeleteModal(true); };
  const handleCloseDeleteModal = () => { setOpenDeleteModal(false); setProductToDelete(null); };
  const handleConfirmDelete = async () => { if (productToDelete) { await deleteProduct(productToDelete.id); if(getProdutos) getProdutos(false); handleCloseDeleteModal(); } };

  // NOVO: Handlers para o mini-modal de categoria
  const handleOpenCategoryModal = () => {
    setNewCategoryName("");
    setOpenCategoryModal(true);
  };
  
  const handleCloseCategoryModal = () => {
    setOpenCategoryModal(false);
  };
  
  const handleCreateCategory = async () => {
    const { data, error } = await createCategoria(newCategoryName);
    if (!error) {
      handleCloseCategoryModal();
      refetchCategorias(false); // Re-busca a lista de categorias
      setCurrentProduct(prev => ({ ...prev, id_categoria: data.id })); 
    } else {
      console.error("Erro ao criar categoria:", error.message);
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
          {/* ... (Cabeçalho da Página e Tabela - sem alteração) ... */}
           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 4, pb: 3, borderBottom: '1px solid #e0e0e0', }}>
            <Typography variant="h4" component="h1" sx={{ fontSize: { xs: '1.75rem', md: '2.125rem' } }}> Gerenciador de Produtos </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', width: { xs: '100%', md: 'auto' } }}>
              <TextField variant="outlined" size="small" placeholder="Buscar na produtos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: ( <InputAdornment position="start"> <SearchIcon /> </InputAdornment> ), sx: { borderRadius: '8px' }, }} sx={{ flex: 1, minWidth: '200px' }} />
              <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenModal} sx={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', width: { xs: '100%', sm: 'auto' }, }} > Adicionar Produto </Button>
            </Box>
          </Box>
          {loading ? ( <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}> <CircularProgress /> </Box> ) : (
            <TableContainer sx={{ borderRadius: '12px', overflowX: 'auto', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.07)', }} >
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
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid #e0e0e0' }}>
                <Typography variant="h6" component="h2">
                  {isEditing ? 'Editar Produto' : 'Adicionar Novo Produto'}
                </Typography>
                <IconButton onClick={handleCloseModal}><CloseIcon /></IconButton>
              </Box>

              <Box sx={{ p: 3, overflowY: 'auto' }}>
                <TextField fullWidth label="Nome do Produto" name="nome" value={currentProduct.nome} onChange={handleChange} margin="normal" required />
                
                {/* NOVO: Box para o Dropdown e o Botão "+" */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, mb: 1 }}>
                  <FormControl fullWidth required>
                    <InputLabel id="categoria-select-label">Categoria</InputLabel>
                    <Select labelId="categoria-select-label" label="Categoria" name="id_categoria" value={currentProduct.id_categoria} onChange={handleChange}>
                      {loadingCategorias ? ( <MenuItem value="">Carregando...</MenuItem> ) : (
                        categorias.map((cat) => ( <MenuItem key={cat.id} value={cat.id}>{cat.nome}</MenuItem> ))
                      )}
                    </Select>
                  </FormControl>
                  <IconButton color="primary" onClick={handleOpenCategoryModal} title="Adicionar nova categoria">
                    <AddIcon />
                  </IconButton>
                </Box>
                
                {/* O resto dos campos: SKU, Descrição, etc. */}
                <TextField fullWidth label="SKU" name="sku" value={currentProduct.sku} onChange={handleChange} margin="normal" required/>
                <TextField fullWidth label="Descrição Curta" name="descricao_curta" value={currentProduct.descricao_curta} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="Descrição Longa (Opcional)" name="descricao_longa" value={currentProduct.descricao_longa} onChange={handleChange} margin="normal" multiline rows={3} />
                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                  <TextField label="Preço" name="preco" type="number" value={currentProduct.preco} onChange={handleChange} margin="normal" required sx={{ flex: 1 }} />
                  <TextField label="Preço Promocional (Opcional)" name="preco_promocional" type="number" value={currentProduct.preco_promocional || ''} onChange={handleChange} margin="normal" sx={{ flex: 1 }} />
                  <TextField label="Estoque" name="estoque" type="number" value={currentProduct.estoque} onChange={handleChange} margin="normal" required sx={{ flex: 1 }} />
                </Box>
                <FormControlLabel control={<Switch checked={currentProduct.ativo} onChange={handleChange} name="ativo" />} label="Produto Ativo" sx={{ mt: 1 }} />
                
                {/* --- SEÇÃO DE IMAGENS (Esta é a sua versão original, sem D&D) --- */}
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" gutterBottom> Imagens </Typography>
                {isEditing && currentProduct.imagensprodutos?.length > 0 && (
                  <>
                    <Typography variant="subtitle2" color="text.secondary">Imagens Atuais</Typography>
                    <ImageList sx={{ width: '100%', height: 180 }} cols={4} rowHeight={160}>
                      {currentProduct.imagensprodutos.map((image) => (
                        <ImageListItem key={image.id}>
                          <img src={`${image.url_imagem}?w=160&h=160&fit=crop&auto=format`} alt={image.alt_texto || ''} loading="lazy" style={{ borderRadius: '8px' }} />
                          <ImageListItemBar position="top" sx={{ background: 'none' }} actionIcon={
                              <IconButton sx={{ color: 'white', background: 'rgba(0,0,0,0.3)', p: 0.5 }} onClick={() => handleDeleteExistingImage(image)}>
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            }
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </>
                )}
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>Adicionar Novas Imagens</Typography>
                  <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />} >
                    Selecionar Arquivos
                    <input type="file" hidden multiple accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
                  </Button>
                </Box>
                {filesToUpload.length > 0 && (
                  <List dense>
                    {filesToUpload.map((file, index) => (
                      <ListItem key={index} disableGutters>
                        <ListItemIcon sx={{minWidth: '32px'}}><ImageIcon fontSize="small" /></ListItemIcon>
                        <ListItemText primary={file.name} secondary={`${(file.size / 1024).toFixed(1)} KB`} />
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

              {/* RODAPÉ DO MODAL */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, p: 2, borderTop: '1px solid #e0e0e0', }} >
                <Button variant="outlined" color="inherit" onClick={handleCloseModal}> Cancelar </Button>
                <Button type="submit" variant="contained" disabled={uploading} >
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
              <Typography sx={{ mt: 2 }}> Tem certeza que deseja excluir o produto: <strong> {productToDelete?.nome}</strong>? </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}> Esta ação não pode ser desfeita. </Typography>
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="outlined" color="inherit" onClick={handleCloseDeleteModal}> Cancelar </Button>
                <Button variant="contained" color="error" onClick={handleConfirmDelete}> Excluir </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
        
        {/* NOVO: O MINI-MODAL PARA ADICIONAR CATEGORIA */}
        <Dialog open={openCategoryModal} onClose={handleCloseCategoryModal}>
          <DialogTitle>Adicionar Nova Categoria</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Nome da Categoria"
              type="text"
              fullWidth
              variant="standard"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCategoryModal}>Cancelar</Button>
            <Button 
              onClick={handleCreateCategory} 
              disabled={isCreating}
            >
              {isCreating ? <CircularProgress size={24} /> : "Salvar"}
            </Button>
          </DialogActions>
        </Dialog>
      
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
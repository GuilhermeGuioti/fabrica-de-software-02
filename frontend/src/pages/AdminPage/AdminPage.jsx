import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Modal,
  TextField,
  Backdrop,
  Fade,
  CircularProgress,
  Switch,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Close as CloseIcon, 
} from '@mui/icons-material';

// 1. Importar seus hooks
import { useProdutosCRUD } from '../../hooks/useProdutosCRUD';
import { useCategorias } from '../../hooks/useCategorias';
import HeroSecond from '../../components/HeroSecond/HeroSecond.jsx';

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

// NOVO: Estilo do Modal de EXCLUIR (mais simples)
const styleDeleteModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '400px', // Modal menor
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4, // Padding simples
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
};

// --- COMPONENTE PRINCIPAL DO PAINEL ---
function ProductAdmin() {
  // --- Hooks e Estados ---
  const { products, loading, createProduct, updateProduct, deleteProduct } =
    useProdutosCRUD();
  const { categorias, loading: loadingCategorias } = useCategorias();

  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(initialState);
  const [searchTerm, setSearchTerm] = useState('');

  // NOVO: Estados para o modal de exclusão
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null); // Guarda o produto a ser deletado

  // --- Handlers ---

  const handleOpenModal = () => {
    setIsEditing(false);
    setCurrentProduct(initialState);
    setOpenModal(true);
  };

  const handleOpenEditModal = (product) => {
    setIsEditing(true);
    setCurrentProduct({
      ...initialState,
      ...product,
      preco_promocional: product.preco_promocional || '',
      id_categoria: product.id_categoria || '',
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (e) => {
    // ... (código original sem alteração)
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setCurrentProduct((prev) => ({ ...prev, [name]: checked }));
      return;
    }
    let finalValue = value;
    if (type === 'number') {
      finalValue = value === '' ? null : parseFloat(value);
    }
    if (name === 'preco_promocional' && value === '') {
      finalValue = null;
    }
    setCurrentProduct((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = async (e) => {
    // ... (código original sem alteração)
    e.preventDefault();
    const { id, ...dataToSave } = currentProduct;
    dataToSave.preco_promocional = dataToSave.preco_promocional || null;
    dataToSave.sku = dataToSave.sku || null;
    if (isEditing) {
      await updateProduct(id, dataToSave);
    } else {
      delete dataToSave.id;
      await createProduct(dataToSave);
    }
    handleCloseModal();
  };
  
  // --- NOVOS HANDLERS PARA EXCLUSÃO ---

  // 1. Chamado ao clicar no ícone da lixeira
  const handleDeleteClick = (product) => {
    setProductToDelete(product); // Guarda qual produto será deletado
    setOpenDeleteModal(true); // Abre o modal de confirmação
  };

  // 2. Chamado ao fechar o modal de exclusão (no "Cancelar" ou fora)
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setProductToDelete(null); // Limpa o produto
  };

  // 3. Chamado ao clicar no botão "Excluir" dentro do modal
  const handleConfirmDelete = async () => {
    if (productToDelete) {
      await deleteProduct(productToDelete.id);
      handleCloseDeleteModal(); // Fecha o modal após a exclusão
    }
  };

  // --- FIM DOS NOVOS HANDLERS ---

  const filteredProducts = products.filter((product) =>
    product.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- RENDERIZAÇÃO DO COMPONENTE ---
  return (
    <>
      <HeroSecond title={'Painel Administrativo'} /> 
      
      {/* A MUDANÇA ESTÁ AQUI. 
        Aplicamos o 'margin-top' negativo (mt) e o zIndex
        exatamente como no seu CSS '.catalog-container'.
        Usei os breakpoints do MUI (md) para replicar seu '@media (max-width:992px)'.
      */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          // mt: 4, mb: 4, // <-- REMOVIDO
          
          // NOVO: Estilos de sobreposição
          mt: { xs: '-50px', md: '-100px' }, // -50px abaixo de 900px, -100px acima
          position: 'relative',
          zIndex: 10,
          mb: 4 // Mantém a margem inferior
        }}
      >
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
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
              mb: 4,
              pb: 3,
              borderBottom: '1px solid #e0e0e0',
            }}
          >
            <Typography variant="h4" component="h1">
              Gerenciador de Produtos
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Buscar na produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: '8px' },
                }}
              />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenModal}
                sx={{
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
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
                  <TableRow
                    sx={{
                      background: 'linear-gradient(90deg, #8B4513, #a0522d)',
                    }}
                  >
                    <TableCell sx={headCell}>Produto</TableCell>
                    <TableCell sx={headCell}>Categoria</TableCell>
                    <TableCell sx={headCell} align="right">Preço (R$)</TableCell>
                    <TableCell sx={headCell} align="right">Estoque</TableCell>
                    <TableCell sx={headCell} align="center">Ativo</TableCell>
                    <TableCell sx={headCell} align="center">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow
                      key={product.id}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        '&:hover': { backgroundColor: '#fdf5ef' },
                      }}
                    >
                      <TableCell component="th" scope="row">{product.nome}</TableCell>
                      <TableCell>{product.displayCategoryName}</TableCell>
                      <TableCell align="right">{product.preco}</TableCell>
                      <TableCell align="right">{product.estoque}</TableCell>
                      <TableCell align="center">{product.ativo ? 'Sim' : 'Não'}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenEditModal(product)}
                        >
                          <EditIcon />
                        </IconButton>
                        {/* MUDANÇA AQUI: Chamando o novo handler */}
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteClick(product)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>

        {/* --- MODAL DE ADICIONAR/EDITAR --- */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
        >
          <Fade in={openModal}>
            <Box sx={styleModal}>
              {/* 1. CABEÇALHO DO MODAL */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 2,
                  borderBottom: '1px solid #e0e0e0',
                }}
              >
                <Typography variant="h6" component="h2">
                  {isEditing ? 'Editar Produto' : 'Adicionar Novo Produto'}
                </Typography>
                <IconButton onClick={handleCloseModal}>
                  <CloseIcon />
                </IconButton>
              </Box>

              {/* 2. CONTEÚDO DO MODAL (FORMULÁRIO) */}
              <Box
                component="form"
                onSubmit={handleSubmit} // O 'onSubmit' vai no form
                sx={{ p: 3, overflowY: 'auto' }}
              >
                {/* ... (Todo o formulário aqui, sem alteração) ... */}
                <TextField fullWidth label="Nome do Produto" name="nome" value={currentProduct.nome} onChange={handleChange} margin="normal" required />
                <FormControl fullWidth margin="normal" required>
                  <InputLabel id="categoria-select-label">Categoria</InputLabel>
                  <Select labelId="categoria-select-label" label="Categoria" name="id_categoria" value={currentProduct.id_categoria} onChange={handleChange}>
                    {loadingCategorias ? (
                      <MenuItem value="">Carregando...</MenuItem>
                    ) : (
                      categorias.map((cat) => (
                        <MenuItem key={cat.id} value={cat.id}>{cat.nome}</MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
                <TextField fullWidth label="SKU (Opcional)" name="sku" value={currentProduct.sku || ''} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="Descrição Curta" name="descricao_curta" value={currentProduct.descricao_curta || ''} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="Descrição Longa (Opcional)" name="descricao_longa" value={currentProduct.descricao_longa || ''} onChange={handleChange} margin="normal" multiline rows={3} />
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField label="Preço" name="preco" type="number" value={currentProduct.preco} onChange={handleChange} margin="normal" required sx={{ flex: 1 }} />
                  <TextField label="Preço Promocional (Opcional)" name="preco_promocional" type="number" value={currentProduct.preco_promocional || ''} onChange={handleChange} margin="normal" sx={{ flex: 1 }} />
                  <TextField label="Estoque" name="estoque" type="number" value={currentProduct.estoque} onChange={handleChange} margin="normal" required sx={{ flex: 1 }} />
                </Box>
                <FormControlLabel control={<Switch checked={currentProduct.ativo} onChange={handleChange} name="ativo" />} label="Produto Ativo" sx={{ mt: 1 }} />
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
                {/* O botão de submit precisa estar FORA do <form> ou ter type="button" 
                    para não ser acionado pelo 'Enter' no form. 
                    Vamos acionar o handleSubmit manualmente. 
                    *Correção*: O melhor é o form ter um 'id' e o botão um 'form' attribute,
                    ou, mais simples, acionar o submit do form.
                    Vou manter sua lógica original do <Box component="form">
                */}
                {/* *Correção 2*: O handleSubmit no <Box> não funciona. 
                    Ele deve estar no <form> real. 
                    Vou envolver o conteúdo em <form> e o rodapé fica fora.
                */}
                {/* *RE-CORREÇÃO* (desculpe): A sua lógica com `Box component="form"`
                    está correta. O problema é que o botão "Salvar" está
                    FORA desse Box. 
                    Vou mover o `handleSubmit` para o botão "Salvar".
                */}
                <Button variant="contained" onClick={handleSubmit}>
                  Salvar
                </Button>
              </Box>

            </Box>
          </Fade>
        </Modal>

        {/* --- NOVO MODAL DE CONFIRMAÇÃO DE EXCLUSÃO --- */}
        <Modal
          open={openDeleteModal}
          onClose={handleCloseDeleteModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
        >
          <Fade in={openDeleteModal}>
            <Box sx={styleDeleteModal}>
              <Typography variant="h6" component="h2">
                Confirmar Exclusão
              </Typography>
              <Typography sx={{ mt: 2 }}>
                Tem certeza que deseja excluir o produto:
                {/* Mostra o nome do produto a ser deletado */}
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
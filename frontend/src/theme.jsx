import { createTheme } from '@mui/material/styles';

// Cores da sua marca (AGORA BASEADAS no estilo "Agenda")
const corPrimaria = '#8B4513'; // O marrom principal (SaddleBrown) do seu CSS
const corPrimariaEscura = '#a0522d'; // O tom mais escuro do gradiente
const corSecundaria = '#FF7043'; // O laranja "aconchego" (mantido)
const corErro = '#dc3545'; // O vermelho do botão "delete" do seu CSS
const fundoHover = '#fdf5ef'; // A cor do table hover do seu CSS

const theme = createTheme({
  palette: {
    // Define a paleta de cores
    primary: {
      main: corPrimaria,
      dark: corPrimariaEscura, // Usado em alguns componentes
    },
    secondary: {
      main: corSecundaria,
    },
    error: {
      main: corErro, // Agora o <IconButton color="error"> usará este vermelho
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    // Adicionando cores de ação customizadas
    action: {
      // O MUI já tem um 'hover', mas podemos definir um customizado
      // ou apenas saber que ele existe. A cor '#fdf5ef' é bem específica.
      // Vamos mantê-la no componente por enquanto, mas o 'error' e 'primary' funcionarão.
      hover: fundoHover, // Podemos referenciar isso se quisermos
    },
  },
  typography: {
    // Define as fontes do site
    fontFamily: [
      'Poppins', // Correto!
      'Roboto',
      '"Helvetica"',
      'Arial',
      'sans-serif',
    ].join(','),

    // Deixar os títulos h4 (como o do painel) mais fortes
    h4: {
      fontWeight: 700,
    },
  },
  shape: {
    // Define o arredondamento dos cantos
    borderRadius: 8, // Botões e inputs ficarão um pouco mais arredondados
  },
});

export default theme;
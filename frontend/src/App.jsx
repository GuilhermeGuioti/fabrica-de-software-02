import './App.css';

import HomePage from './pages/HomePage/HomePage.jsx';
import ContactPage from './pages/ContactPage/ContactPage.jsx';
import AboutPage from './pages/AboutPage/AboutPage.jsx';
import CatalogPage from './pages/CatalogPage/CatalogPage.jsx';
import AuthPage from './pages/AuthPage/AuthPage.jsx';
import AdminPage from './pages/AdminPage/AdminPage.jsx';
import DetailsPage from './pages/DetailsPage/DetailsPage.jsx';

import { Routes, Route, useLocation } from 'react-router-dom';

import MainLayout from './components/MainLayout/MainLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'; 

import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton.jsx';

function App() {
  const location = useLocation();
  const isProtectPage = location.pathname.startsWith('/admin') || location.pathname.startsWith('/login');

  return (
    <>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <ThemeProvider theme={theme}>
                <CssBaseline /> 
                <AdminPage />
              </ThemeProvider>
            </ProtectedRoute>
          }
        />
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/catalogo" element={<CatalogPage />} />

          <Route path="/produto/:id" element={<DetailsPage />} />
        </Route>    
      </Routes>

      {!isProtectPage && <WhatsAppButton />}    
    </>
  );
}

export default App;
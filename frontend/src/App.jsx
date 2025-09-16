import './App.css';

import HomePage from './pages/HomePage/HomePage.jsx';
import ContactPage from './pages/ContactPage/ContactPage.jsx';
import AboutPage from './pages/AboutPage/AboutPage.jsx';
import CatalogPage from './pages/CatalogPage/CatalogPage.jsx';
import AuthPage from './pages/AuthPage/AuthPage.jsx';
import AdminPage from './pages/AdminPage/AdminPage.jsx';

import { Routes, Route } from 'react-router-dom';

import MainLayout from './components/MainLayout/MainLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';

function App() {
  return (
    // O <Header /> e <Footer /> são removidos daqui
    <Routes>
      {/* Rota especial SEM header e footer */}
      <Route path="/login" element={<AuthPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />

      {/* Rotas que terão header e footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/contato" element={<ContactPage />} />
        <Route path="/sobre" element={<AboutPage />} />
        <Route path="/catalogo" element={<CatalogPage />} />
      </Route>
    </Routes>
  );
}

export default App;

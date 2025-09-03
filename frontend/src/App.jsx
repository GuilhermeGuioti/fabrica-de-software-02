import './App.css';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';

import HomePage from './pages/HomePage/HomePage.jsx';
import ContactPage from './pages/ContactPage/ContactPage.jsx';
import AboutPage from './pages/AboutPage/AboutPage.jsx';
import CatalogPage from './pages/CatalogPage/CatalogPage.jsx';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contato" element={<ContactPage />} />
        <Route path="/sobre" element={<AboutPage />} />
        <Route path="/catalogo" element={<CatalogPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

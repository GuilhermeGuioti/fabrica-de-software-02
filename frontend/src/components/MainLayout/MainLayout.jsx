import React from 'react';
import { Outlet } from 'react-router-dom';

// Supondo que seus componentes Header e Footer estejam na mesma pasta
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';

const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        {/* As páginas (Home, Contato, etc.) serão renderizadas aqui */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;

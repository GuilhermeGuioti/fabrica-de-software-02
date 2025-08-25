import './App.css';
import Header from './components/Header/Header.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;

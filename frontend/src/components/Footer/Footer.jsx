import React, { useState } from 'react';
import './Footer.css';

import { supabase } from '../../supabaseClient';

import { Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { BsFillTelephoneFill, BsSend } from 'react-icons/bs';

function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!email) {
      alert("Por favor insira um email");
      return;
    }

    setStatus('loading');

    const { data, error } = await supabase
      .from('inscricoes')
      .insert([
        { email: email },
      ]);  
    
    if(error){
      console.error('Erro do Supabase:', error.message);
      if(error.code == '23505') {
        setStatus('duplicate');
      } else {
        setEmail('error')
      }
    } else{
      console.log('Inscrito com sucesso:', data);
      setStatus('success');
      setEmail('');
    } 
  }

  return (
    <footer>
      <div className="footer-content">
        {/* Coluna 1: Logo e Redes Sociais */}
        <div className="footer-column">
          <div className="logo logo-footer">
            <Link to="/">PARKMOVEIS</Link>
          </div>
          <div className="footer-logos">
            <a
              href="https://www.instagram.com/park.moveis?igsh=MTl4YngzaGdydTZsNw=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/5516991480055"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Whatsapp"
            >
              <FaWhatsapp />
            </a>
            <a
              href="mailto:parkmoveis2014@hotmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
            >
              <MdOutlineEmail />
            </a>
            <a
              href="tel:+5516991480055"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telefone"
            >
              <BsFillTelephoneFill />
            </a>
          </div>
        </div>

        {/* Coluna 3: Contatos */}
        <div className="footer-column">
          <h3>Contatos</h3>
          <ul className="footer-links">
            <li>
              <span>
                Av. Arlíndo Silva Pimenta, 63 - Parque Ribeirão, Ribeirão Preto
              </span>
            </li>
            <li>
              <span>parkmoveis2014@hotmail.com</span>
            </li>
            <li>
              <span>+55 (16) 99148-0055</span>
            </li>
          </ul>
        </div>

        {/* Coluna 2: Menu de Navegação */}
        <div className="footer-column">
          <h3>Menu</h3>
          <ul className="footer-links">
            <li>
              <a href="/">Início</a>
            </li>
            <li>
              <a href="/catalogo">Catálogo</a>
            </li>
            <li>
              <a href="/sobre">Sobre Nós</a>
            </li>
            <li>
              <a href="/contato">Contato</a>
            </li>
            <li>
              <Link to="/login">Admin</Link>
            </li>
          </ul>
        </div>

        {/* Coluna 4: Inscrição */}
        <div className="footer-column">
          <h3>Inscreva-se</h3>
          <p>Receba nossas novidades e promoções por e-mail.</p>
          <form className="subscribe-form" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Seu melhor e-mail" 
              name='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" aria-label="Inscrever-se" disabled={status == 'loading'}>
              <BsSend />
            </button>
          </form>
          {status === 'success' && <p className='feedback-message feedback-success'>Inscrito com sucesso!</p>}
          {status === 'duplicate' && <p className='feedback-message feedback-warning'>Este e-mail já está inscrito.</p>}
          {status === 'error' && <p className='feedback-message feedback-error'>Ocorreu um erro. Tente novamente.</p>}
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2024 Parkmoveis - Todos os direitos reservados</span>
      </div>
    </footer>
  );
}

export default Footer;

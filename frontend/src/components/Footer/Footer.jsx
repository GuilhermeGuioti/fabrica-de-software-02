import React from 'react';
import './Footer.css';

import { Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { BsFillTelephoneFill, BsSend } from 'react-icons/bs'; // Adicionei o ícone de envio

function Footer() {
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
          </ul>
        </div>

        {/* Coluna 4: Inscrição */}
        <div className="footer-column">
          <h3>Inscreva-se</h3>
          <p>Receba nossas novidades e promoções por e-mail.</p>
          <form className="subscribe-form">
            <input type="email" placeholder="Seu melhor e-mail" />
            <button type="submit" aria-label="Inscrever-se">
              <BsSend />
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2024 Parkmoveis - Todos os direitos reservados</span>
      </div>
    </footer>
  );
}

export default Footer;

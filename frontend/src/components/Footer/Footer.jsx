import React from 'react';
import './Footer.css';

import { FaInstagram } from 'react-icons/fa';
import { FaFacebookF } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { BsFillTelephoneFill } from 'react-icons/bs';

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-left">
          <h2>PARKMOVEIS</h2>
        </div>
        <div className="footer-right">
          <i>
            <a>
              <FaInstagram />
            </a>
          </i>
          <i>
            <a>
              <FaFacebookF />
            </a>
          </i>
          <i>
            <a>
              <FaWhatsapp />
            </a>
          </i>
          <i>
            <a>
              <MdOutlineEmail />
            </a>
          </i>
          <i>
            <a>
              <BsFillTelephoneFill />
            </a>
          </i>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2025 Parkmoveis - Todos os direitos reservados</span>
      </div>
    </footer>
  );
}

export default Footer;

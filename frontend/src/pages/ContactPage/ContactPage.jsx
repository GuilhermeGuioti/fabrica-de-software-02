import React from 'react';
import './ContactPage.css';

import HeroSecond from '../../components/HeroSecond/HeroSecond';
import Map from '../../components/Map/Map.jsx';
import QuoteForm from '../../components/QuoteForm/QuoteForm';

import { FaInstagram } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import { MdOutlineSubdirectoryArrowRight } from 'react-icons/md';

function ContactPage() {
  const mapEmbedUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.711431806998!2d-47.8433372!3d-21.2036194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b9bddc1375bbbd%3A0xeb4b832cdf760bed!2sPark%20M%C3%B3veis!5e0!3m2!1spt-BR!2sbr!4v1756834539230!5m2!1spt-BR!2sbr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade';

  const handleNavigate = (url) => {
    if (!url) return;

    if (url.startsWith('mailto:') || url.startsWith('tel:')) {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <HeroSecond
        title="Contato"
        subtitle="Estamos sempre disponíveis para conversar. Seja para tirar dúvidas ou solicitar um orçamento, utilize os canais abaixo para falar conosco."
      />
      <div className="contact-section">
        <div className="contact-title">
          <h3>Contatos</h3>
          <h2>Fale com nossa equipe</h2>
          <p>
            Nossa equipe está à disposição para tirar suas dúvidas e ajudar a
            transformar seu projeto em realidade.
          </p>
        </div>
        <div className="contact-cards-container">
          <div
            className="contact-card"
            onClick={() => handleNavigate('https://wa.me/5516991480055')}
          >
            <a>
              <FaWhatsapp />
            </a>
            <h2>Whatsapp</h2>
            <span>+55 16 99148-0055</span>
          </div>
          <div
            className="contact-card"
            onClick={() => handleNavigate('mailto:parkmoveis2014@hotmail.com')}
          >
            <a>
              <MdOutlineEmail />
            </a>
            <h2>Email</h2>
            <span>parkmoveis2014@hotmail.com</span>
          </div>
          <div
            className="contact-card"
            onClick={() =>
              handleNavigate(
                'https://www.instagram.com/park.moveis?igsh=MTl4YngzaGdydTZsNw=='
              )
            }
          >
            <a>
              <FaInstagram />
            </a>
            <h2>Instagram</h2>
            <span>@park.moveis</span>
          </div>
          <div
            className="contact-card"
            onClick={() =>
              handleNavigate(
                'https://maps.app.goo.gl/DDf7PzaNu2mUkML9A?g_st=ipc'
              )
            }
          >
            <a>
              <FaLocationDot />
            </a>
            <h2>Localização</h2>
            <span>Av. Arlíndo Silva Pimenta, 63</span>
          </div>
        </div>
        <div className="contact-map">
          <Map embedUrl={mapEmbedUrl} />
        </div>
        <div className="contact-quote">
          <div className="contact-quote-left">
            <div className="contact-quote-title">
              <h3>Formulário</h3>
              <h2>Fale conosco agora</h2>
              <p>
                Preencha o formulário abaixo e nossa equipe de especialistas
                responderá o mais breve possível.
              </p>
              <div className="arrow-right">
                <MdOutlineSubdirectoryArrowRight />
              </div>
            </div>
          </div>
          <div className="contact-quote-right">
            <QuoteForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactPage;

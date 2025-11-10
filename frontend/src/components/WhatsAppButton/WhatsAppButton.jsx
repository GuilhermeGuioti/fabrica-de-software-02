import React from 'react';
import './WhatsAppButton.css';
import { FaWhatsapp } from 'react-icons/fa'; // Importa o ícone

const WhatsAppButton = () => {
    const numeroWhatsApp = '5516991480055';
    const mensagemPadrao = 'Olá! Gostaria de mais informações sobre os móveis.';

    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagemPadrao)}`;

    return (
        <a
            href={linkWhatsApp}
            className="whatsapp-float"
            target="_blank"
            rel="noopener noreferrer"
        >
            <FaWhatsapp className="whatsapp-icon" />
        </a>
    );
};

export default WhatsAppButton;
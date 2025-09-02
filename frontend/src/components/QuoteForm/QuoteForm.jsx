import React, { useState } from 'react';
import emailjs from '@emailjs/browser'; // 1. Importamos a biblioteca do EmailJS
import './QuoteForm.css'; // O CSS continua o mesmo

function QuoteForm() {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    interest_type: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 2. A função de envio agora é REAL
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('enviando');

    // --- 3. SUAS CHAVES DO EMAILJS VÃO AQUI ---
    const serviceID = 'SEU_SERVICE_ID';
    const templateID = 'SEU_TEMPLATE_ID';
    const publicKey = 'SUA_PUBLIC_KEY';
    // ------------------------------------------

    // Trava de segurança para não enviar sem as chaves
    if (
      serviceID === 'SEU_SERVICE_ID' ||
      templateID === 'SEU_TEMPLATE_ID' ||
      publicKey === 'SUA_PUBLIC_KEY'
    ) {
      console.error('As chaves do EmailJS não foram configuradas.');
      setStatus('erro_config');
      return;
    }

    // 4. Lógica de envio do EmailJS
    emailjs.send(serviceID, templateID, formData, publicKey).then(
      (response) => {
        console.log(
          'E-mail enviado com sucesso!',
          response.status,
          response.text
        );
        setStatus('sucesso');
        // Limpa o formulário
        setFormData({
          user_name: '',
          user_email: '',
          user_phone: '',
          interest_type: '',
          message: '',
        });
      },
      (err) => {
        console.error('Falha no envio do e-mail:', err);
        setStatus('erro');
      }
    );
  };

  return (
    <section className="quote-form-container">
      <form onSubmit={handleSubmit} className="quote-form">
        <div className="form-row">
          <input
            type="text"
            name="user_name"
            placeholder="Nome Completo"
            value={formData.user_name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="user_email"
            placeholder="E-mail"
            value={formData.user_email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <input
            type="tel"
            name="user_phone"
            placeholder="Telefone / WhatsApp"
            value={formData.user_phone}
            onChange={handleChange}
            required
          />
          <select
            name="interest_type"
            value={formData.interest_type}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Tenho interesse em...
            </option>
            <option value="Móvel Sob Medida">
              Orçamento para Móvel Sob Medida
            </option>
            <option value="Produto do Catálogo">Produto do Catálogo</option>
            <option value="Projeto de Decoração">
              Projeto de Decoração de Ambiente
            </option>
            <option value="Dúvidas Gerais">Dúvidas Gerais</option>
          </select>
        </div>
        <div className="form-row">
          <textarea
            name="message"
            placeholder="Sua Mensagem..."
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" disabled={status === 'enviando'}>
          {status === 'enviando' ? 'Enviando...' : 'Obter Orçamento'}
        </button>
      </form>
      {status === 'sucesso' && (
        <p className="submit-status success">
          Mensagem enviada com sucesso! Entraremos em contato em breve.
        </p>
      )}
      {status === 'erro' && (
        <p className="submit-status error">
          Ocorreu um erro. Por favor, tente novamente mais tarde.
        </p>
      )}
      {status === 'erro_config' && (
        <p className="submit-status error">
          O formulário de contato não está ativo no momento. Por favor, tente
          mais tarde.
        </p>
      )}
    </section>
  );
}

export default QuoteForm;

import React from 'react';
import './Values.css';

// Importando os ícones que vamos usar da biblioteca react-icons
import { FaHandshake, FaAward, FaBalanceScale } from 'react-icons/fa';

// Dados dos cards. Manter em um array facilita a adição de novos valores no futuro.
const valuesData = [
  {
    icon: <FaHandshake />,
    title: 'CONFIANÇA',
    text: 'Sobre ela estruturamos todas as nossas atitudes, buscando fortalecê-la a cada dia através de um trabalho íntegro e de qualidade.',
  },
  {
    icon: <FaAward />,
    title: 'CREDIBILIDADE',
    text: 'Uma qualidade que se conquista com um trabalho de excelência oferecido de maneira uniforme a todos os nossos clientes.',
  },
  {
    icon: <FaBalanceScale />,
    title: 'ÉTICA',
    text: 'Um pilar fundamental baseado em nossos valores que norteia as ações de nossa equipe, definindo critérios para a manipulação de informações de nossos clientes.',
  },
];

function ValuesSection() {
  return (
    <div className="values-section">
      <div className="values-container">
        {valuesData.map((value, index) => (
          <div className="value-card" key={index}>
            <div className="icon-wrapper">{value.icon}</div>
            <h3>{value.title}</h3>
            <p>{value.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ValuesSection;

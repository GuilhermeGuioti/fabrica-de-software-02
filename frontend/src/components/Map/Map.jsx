import React from 'react';
import './Map.css';

function Map({ embedUrl }) {
  return (
    <div className="map-container">
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        referrerPolicy="no-referrer-when-downgrade"
        title="Localização da Loja no Google Maps"
      ></iframe>
    </div>
  );
}

export default Map;

import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ message = 'Cargando...' }) => {
  return (
    <div className="loading-spinner-container">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
      {message && <p className="loading-message mt-3">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;

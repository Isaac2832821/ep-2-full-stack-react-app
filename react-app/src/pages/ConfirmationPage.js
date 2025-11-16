import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, formatDateTime } from '../utils/formatters';
import './ConfirmationPage.css';

const ConfirmationPage = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Get the most recent order
    const orders = JSON.parse(localStorage.getItem('ventas') || '[]');
    if (orders.length > 0) {
      setOrder(orders[0]);
    }
  }, []);

  if (!order) {
    return (
      <div className="confirmation-page">
        <div className="container py-5">
          <div className="text-center">
            <i className="fas fa-exclamation-circle fa-4x text-warning mb-3"></i>
            <h2>No se encontró información del pedido</h2>
            <Link to="/productos" className="btn btn-primary mt-3">
              Ir a Productos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-page">
      {/* Breadcrumb */}
      <section className="breadcrumb-section bg-light py-3">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/carrito">Carrito</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Confirmación
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Confirmation Content */}
      <section className="confirmation-section py-5">
        <div className="container">
          <div className="confirmation-card">
            {/* Success Icon */}
            <div className="confirmation-icon">
              <i className="fas fa-check-circle fa-5x text-success"></i>
            </div>

            {/* Success Message */}
            <h1 className="confirmation-title">¡Gracias por tu compra!</h1>
            <p className="confirmation-message">
              Tu pedido ha sido registrado correctamente y está siendo procesado.
            </p>

            {/* Order Details */}
            <div className="order-details">
              <h3 className="order-details-title">Detalles del Pedido</h3>
              
              <div className="order-info">
                <div className="info-row">
                  <span className="info-label">Número de Pedido:</span>
                  <span className="info-value">#{order.id}</span>
                </div>
                
                <div className="info-row">
                  <span className="info-label">Fecha:</span>
                  <span className="info-value">{formatDateTime(order.fecha)}</span>
                </div>
                
                <div className="info-row">
                  <span className="info-label">Estado:</span>
                  <span className="badge bg-warning text-dark">Pendiente</span>
                </div>
                
                <div className="info-row">
                  <span className="info-label">Total:</span>
                  <span className="info-value fw-bold text-primary">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              {order.items && order.items.length > 0 && (
                <div className="order-items mt-4">
                  <h4 className="mb-3">Productos Ordenados:</h4>
                  <div className="list-group">
                    {order.items.map((item, index) => (
                      <div key={index} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-1">{item.nombre}</h6>
                            <small className="text-muted">
                              Cantidad: {item.cantidad} x {formatPrice(item.precio)}
                            </small>
                          </div>
                          <span className="fw-bold">
                            {formatPrice(item.precio * item.cantidad)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Next Steps */}
            <div className="next-steps mt-4">
              <h4 className="mb-3">¿Qué sigue?</h4>
              <ul className="steps-list">
                <li>
                  <i className="fas fa-envelope text-primary me-2"></i>
                  Recibirás un email de confirmación con los detalles de tu pedido
                </li>
                <li>
                  <i className="fas fa-box text-primary me-2"></i>
                  Procesaremos tu pedido en las próximas 24 horas
                </li>
                <li>
                  <i className="fas fa-truck text-primary me-2"></i>
                  Te notificaremos cuando tu pedido sea enviado
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="confirmation-actions">
              <Link to="/productos" className="btn btn-outline-primary btn-lg">
                <i className="fas fa-shopping-bag me-2"></i>
                Seguir Comprando
              </Link>
              <Link to="/mi-cuenta" className="btn btn-primary btn-lg">
                <i className="fas fa-user me-2"></i>
                Ver Mis Pedidos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConfirmationPage;

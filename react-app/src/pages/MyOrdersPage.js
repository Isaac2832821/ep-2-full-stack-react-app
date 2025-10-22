import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { formatPrice, formatDate } from '../utils/formatters';
import './MyOrdersPage.css';

const MyOrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user) {
      // Load user's orders from localStorage
      const allOrders = JSON.parse(localStorage.getItem('ventas') || '[]');
      const userOrders = allOrders.filter(order => 
        order.userId === user.id || 
        order.customer?.email === user.email
      );
      setOrders(userOrders);
    }
  }, [user]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: 'Pendiente', class: 'warning' },
      processing: { label: 'Procesando', class: 'info' },
      shipped: { label: 'Enviado', class: 'primary' },
      completed: { label: 'Completado', class: 'success' },
      cancelled: { label: 'Cancelado', class: 'danger' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    return <span className={`badge bg-${config.class}`}>{config.label}</span>;
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  if (!user) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning text-center">
          <h3>Debes iniciar sesión</h3>
          <p>Para ver tus pedidos, por favor inicia sesión</p>
          <Link to="/login" className="btn btn-primary">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="my-orders-page">
      {/* Breadcrumb */}
      <section className="breadcrumb-section bg-light py-3">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/mi-cuenta">Mi Cuenta</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Mis Pedidos
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Orders Content */}
      <section className="orders-section py-4">
        <div className="container">
          <h2 className="mb-4">
            <i className="fas fa-shopping-bag me-2"></i>
            Mis Pedidos
          </h2>

          {orders.length === 0 ? (
            <div className="card">
              <div className="card-body text-center py-5">
                <i className="fas fa-shopping-bag fa-3x text-muted mb-3"></i>
                <h4>No tienes pedidos aún</h4>
                <p className="text-muted">Cuando realices una compra, aparecerá aquí</p>
                <Link to="/productos" className="btn btn-primary mt-3">
                  <i className="fas fa-shopping-cart me-2"></i>
                  Ir a Comprar
                </Link>
              </div>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-card card mb-3">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-12 col-md-3 mb-3 mb-md-0">
                        <div className="order-info">
                          <small className="text-muted">Pedido</small>
                          <div className="fw-bold">{order.id}</div>
                          <small className="text-muted">
                            {formatDate(order.date || order.fecha)}
                          </small>
                        </div>
                      </div>
                      <div className="col-12 col-md-3 mb-3 mb-md-0">
                        <div className="order-status">
                          <small className="text-muted d-block mb-1">Estado</small>
                          {getStatusBadge(order.status || order.estado)}
                        </div>
                      </div>
                      <div className="col-12 col-md-3 mb-3 mb-md-0">
                        <div className="order-total">
                          <small className="text-muted d-block mb-1">Total</small>
                          <div className="fw-bold text-primary">
                            {formatPrice(order.total)}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-3 text-md-end">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => handleViewOrder(order)}
                        >
                          <i className="fas fa-eye me-1"></i>
                          Ver Detalle
                        </button>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="order-items-preview mt-3 pt-3 border-top">
                      <small className="text-muted">Productos:</small>
                      <div className="d-flex flex-wrap gap-2 mt-2">
                        {order.items?.slice(0, 3).map((item, index) => (
                          <span key={index} className="badge bg-light text-dark">
                            {item.quantity}x {item.nombre || item.name}
                          </span>
                        ))}
                        {order.items?.length > 3 && (
                          <span className="badge bg-light text-dark">
                            +{order.items.length - 3} más
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Order Detail Modal */}
      {showModal && selectedOrder && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Detalle del Pedido {selectedOrder.id}</h3>
              <button className="btn-close" onClick={() => setShowModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="row mb-4">
                <div className="col-md-6">
                  <h5>Información de Envío</h5>
                  <p className="mb-1">
                    <strong>Nombre:</strong> {selectedOrder.customer?.nombre}
                  </p>
                  <p className="mb-1">
                    <strong>Dirección:</strong>{' '}
                    {selectedOrder.shippingAddress ||
                      `${selectedOrder.shipping?.direccion}, ${selectedOrder.shipping?.comuna}`}
                  </p>
                  <p className="mb-1">
                    <strong>Teléfono:</strong> {selectedOrder.customer?.telefono}
                  </p>
                </div>
                <div className="col-md-6">
                  <h5>Estado del Pedido</h5>
                  <p className="mb-1">
                    <strong>Fecha:</strong> {formatDate(selectedOrder.date || selectedOrder.fecha)}
                  </p>
                  <p className="mb-1">
                    <strong>Estado:</strong> {getStatusBadge(selectedOrder.status || selectedOrder.estado)}
                  </p>
                  <p className="mb-1">
                    <strong>Método de Pago:</strong>{' '}
                    {selectedOrder.payment?.method === 'credit-card' ? 'Tarjeta de Crédito' : 'Otro'}
                  </p>
                </div>
              </div>

              <h5>Productos</h5>
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.nombre || item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{formatPrice(item.precio || item.price)}</td>
                        <td>{formatPrice((item.precio || item.price) * item.quantity)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3" className="text-end">
                        <strong>Subtotal:</strong>
                      </td>
                      <td>
                        <strong>{formatPrice(selectedOrder.subtotal)}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="3" className="text-end">
                        <strong>IVA (19%):</strong>
                      </td>
                      <td>
                        <strong>{formatPrice(selectedOrder.iva)}</strong>
                      </td>
                    </tr>
                    <tr className="table-primary">
                      <td colSpan="3" className="text-end">
                        <strong>Total:</strong>
                      </td>
                      <td>
                        <strong>{formatPrice(selectedOrder.total)}</strong>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;

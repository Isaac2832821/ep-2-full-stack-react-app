import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';

const CheckoutPageSimple = () => {
  const navigate = useNavigate();
  const cartContext = useCart();
  const { items: cart, getTotal, clearCart } = cartContext;
  const [isProcessing, setIsProcessing] = useState(false);

  console.log('CheckoutPageSimple - Cart Context:', cartContext);
  console.log('CheckoutPageSimple - Cart items:', cart);

  const subtotal = cart && cart.length > 0 ? getTotal() : 0;
  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    cardNumber: '',
    cardName: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const order = {
        id: `ORD-${Date.now()}`,
        date: new Date().toISOString(),
        items: cart,
        customer: formData,
        total
      };

      localStorage.setItem('lastOrder', JSON.stringify(order));
      clearCart();
      setIsProcessing(false);
      navigate('/confirmacion', { state: { order } });
    }, 1500);
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning text-center">
          <h3>Tu carrito está vacío</h3>
          <p className="text-muted">Debug: {JSON.stringify({ hasCart: !!cart, cartLength: cart?.length, cartType: typeof cart })}</p>
          <Link to="/carrito" className="btn btn-secondary me-2">
            Ver Carrito
          </Link>
          <Link to="/productos" className="btn btn-primary">
            Ver Productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Finalizar Compra</h1>

      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header">
              <h4>Información de Envío</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre Completo *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Teléfono *</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Dirección *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    required
                  />
                </div>

                <h5 className="mt-4 mb-3">Información de Pago</h5>

                <div className="mb-3">
                  <label className="form-label">Número de Tarjeta *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Nombre en la Tarjeta *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Procesando...' : 'Confirmar Pago'}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h4>Resumen</h4>
            </div>
            <div className="card-body">
              {cart.map(item => (
                <div key={item.id} className="d-flex mb-2">
                  <img src={item.imagen} alt={item.nombre} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                  <div className="ms-2 flex-grow-1">
                    <p className="mb-0 small">{item.nombre}</p>
                    <small>Cant: {item.cantidad}</small>
                  </div>
                  <p className="mb-0">{formatPrice(item.precio * item.cantidad)}</p>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between">
                <span>Subtotal:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>IVA:</span>
                <span>{formatPrice(iva)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total:</strong>
                <strong className="text-primary">{formatPrice(total)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPageSimple;

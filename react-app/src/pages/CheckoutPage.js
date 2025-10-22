import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/formatters';
import { validateRequired, validateEmail, validateRUN } from '../utils/validators';
import { REGIONES_COMUNAS } from '../utils/constants';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    nombre: user?.nombre || '',
    email: user?.email || '',
    telefono: user?.telefono || '',
    rut: user?.rut || '',
    direccion: user?.direccion || '',
    region: user?.region || '',
    comuna: user?.comuna || '',
    // Payment info
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCVV: '',
    paymentMethod: 'credit-card'
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getCartTotal();
  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Shipping info validation
    if (!validateRequired(formData.nombre)) newErrors.nombre = 'El nombre es requerido';
    if (!validateRequired(formData.email)) {
      newErrors.email = 'El email es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!validateRequired(formData.telefono)) newErrors.telefono = 'El teléfono es requerido';
    if (!validateRequired(formData.rut)) {
      newErrors.rut = 'El RUT es requerido';
    } else if (!validateRUN(formData.rut)) {
      newErrors.rut = 'RUT inválido';
    }
    if (!validateRequired(formData.direccion)) newErrors.direccion = 'La dirección es requerida';
    if (!validateRequired(formData.region)) newErrors.region = 'La región es requerida';
    if (!validateRequired(formData.comuna)) newErrors.comuna = 'La comuna es requerida';

    // Payment validation
    if (formData.paymentMethod === 'credit-card') {
      if (!validateRequired(formData.cardNumber)) {
        newErrors.cardNumber = 'El número de tarjeta es requerido';
      } else if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
        newErrors.cardNumber = 'Número de tarjeta inválido';
      }
      if (!validateRequired(formData.cardName)) newErrors.cardName = 'El nombre es requerido';
      if (!validateRequired(formData.cardExpiry)) newErrors.cardExpiry = 'La fecha es requerida';
      if (!validateRequired(formData.cardCVV)) {
        newErrors.cardCVV = 'El CVV es requerido';
      } else if (formData.cardCVV.length !== 3) {
        newErrors.cardCVV = 'CVV inválido';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Create order
      const order = {
        id: `ORD-${Date.now()}`,
        date: new Date().toISOString(),
        items: cart,
        customer: {
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          rut: formData.rut
        },
        shipping: {
          direccion: formData.direccion,
          region: formData.region,
          comuna: formData.comuna
        },
        payment: {
          method: formData.paymentMethod,
          lastFourDigits: formData.cardNumber.slice(-4)
        },
        subtotal,
        iva,
        total,
        status: 'pending'
      };

      // Save order to localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));

      // Clear cart
      clearCart();

      setIsProcessing(false);

      // Redirect to confirmation
      navigate('/confirmacion', { state: { order } });
    }, 2000);
  };

  const comunas = formData.region ? REGIONES_COMUNAS[formData.region] || [] : [];

  if (cart.length === 0) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning text-center">
          <h3>Tu carrito está vacío</h3>
          <p>Agrega productos antes de proceder al pago</p>
          <button className="btn btn-primary" onClick={() => navigate('/productos')}>
            Ver Productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      {/* Breadcrumb */}
      <section className="breadcrumb-section bg-light py-3">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="/carrito">Carrito</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Checkout
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <div className="container py-5">
        <h1 className="mb-4">Finalizar Compra</h1>

        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Left Column - Forms */}
            <div className="col-12 col-lg-8 mb-4">
              {/* Shipping Information */}
              <div className="card mb-4">
                <div className="card-header">
                  <h4 className="mb-0">
                    <i className="fas fa-shipping-fast me-2"></i>
                    Información de Envío
                  </h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Nombre Completo *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                      />
                      {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">RUT *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.rut ? 'is-invalid' : ''}`}
                        name="rut"
                        value={formData.rut}
                        onChange={handleChange}
                        placeholder="12.345.678-9"
                      />
                      {errors.rut && <div className="invalid-feedback">{errors.rut}</div>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Teléfono *</label>
                      <input
                        type="tel"
                        className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="+56 9 1234 5678"
                      />
                      {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Dirección *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.direccion ? 'is-invalid' : ''}`}
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleChange}
                      placeholder="Calle, número, depto/casa"
                    />
                    {errors.direccion && <div className="invalid-feedback">{errors.direccion}</div>}
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Región *</label>
                      <select
                        className={`form-select ${errors.region ? 'is-invalid' : ''}`}
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                      >
                        <option value="">Seleccionar región</option>
                        {Object.keys(REGIONES_COMUNAS).map(region => (
                          <option key={region} value={region}>{region}</option>
                        ))}
                      </select>
                      {errors.region && <div className="invalid-feedback">{errors.region}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Comuna *</label>
                      <select
                        className={`form-select ${errors.comuna ? 'is-invalid' : ''}`}
                        name="comuna"
                        value={formData.comuna}
                        onChange={handleChange}
                        disabled={!formData.region}
                      >
                        <option value="">Seleccionar comuna</option>
                        {comunas.map(comuna => (
                          <option key={comuna} value={comuna}>{comuna}</option>
                        ))}
                      </select>
                      {errors.comuna && <div className="invalid-feedback">{errors.comuna}</div>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="card">
                <div className="card-header">
                  <h4 className="mb-0">
                    <i className="fas fa-credit-card me-2"></i>
                    Información de Pago
                  </h4>
                </div>
                <div className="card-body">
                  {/* Payment Method Selection */}
                  <div className="mb-4">
                    <label className="form-label">Método de Pago</label>
                    <div className="payment-methods">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          id="creditCard"
                          value="credit-card"
                          checked={formData.paymentMethod === 'credit-card'}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="creditCard">
                          <i className="fas fa-credit-card me-2"></i>
                          Tarjeta de Crédito/Débito
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          id="transfer"
                          value="transfer"
                          checked={formData.paymentMethod === 'transfer'}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="transfer">
                          <i className="fas fa-university me-2"></i>
                          Transferencia Bancaria
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Credit Card Form */}
                  {formData.paymentMethod === 'credit-card' && (
                    <>
                      <div className="mb-3">
                        <label className="form-label">Número de Tarjeta *</label>
                        <input
                          type="text"
                          className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                        />
                        {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Nombre en la Tarjeta *</label>
                        <input
                          type="text"
                          className={`form-control ${errors.cardName ? 'is-invalid' : ''}`}
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          placeholder="JUAN PEREZ"
                        />
                        {errors.cardName && <div className="invalid-feedback">{errors.cardName}</div>}
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Fecha de Expiración *</label>
                          <input
                            type="text"
                            className={`form-control ${errors.cardExpiry ? 'is-invalid' : ''}`}
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            placeholder="MM/AA"
                            maxLength="5"
                          />
                          {errors.cardExpiry && <div className="invalid-feedback">{errors.cardExpiry}</div>}
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">CVV *</label>
                          <input
                            type="text"
                            className={`form-control ${errors.cardCVV ? 'is-invalid' : ''}`}
                            name="cardCVV"
                            value={formData.cardCVV}
                            onChange={handleChange}
                            placeholder="123"
                            maxLength="3"
                          />
                          {errors.cardCVV && <div className="invalid-feedback">{errors.cardCVV}</div>}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Transfer Instructions */}
                  {formData.paymentMethod === 'transfer' && (
                    <div className="alert alert-info">
                      <h6>Instrucciones para Transferencia:</h6>
                      <p className="mb-1"><strong>Banco:</strong> Banco de Chile</p>
                      <p className="mb-1"><strong>Cuenta Corriente:</strong> 123456789</p>
                      <p className="mb-1"><strong>RUT:</strong> 12.345.678-9</p>
                      <p className="mb-0"><strong>Nombre:</strong> PasoxPaso SpA</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="col-12 col-lg-4">
              <div className="card sticky-top" style={{ top: '100px' }}>
                <div className="card-header">
                  <h4 className="mb-0">Resumen del Pedido</h4>
                </div>
                <div className="card-body">
                  {/* Cart Items */}
                  <div className="order-items mb-3">
                    {cart.map(item => (
                      <div key={item.id} className="order-item d-flex mb-2">
                        <img src={item.imagen} alt={item.nombre} className="order-item-img" />
                        <div className="flex-grow-1 ms-2">
                          <p className="mb-0 small">{item.nombre}</p>
                          <small className="text-muted">Cantidad: {item.cantidad}</small>
                        </div>
                        <p className="mb-0 fw-semibold">{formatPrice(item.precio * item.cantidad)}</p>
                      </div>
                    ))}
                  </div>

                  <hr />

                  {/* Totals */}
                  <div className="order-totals">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal:</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>IVA (19%):</span>
                      <span>{formatPrice(iva)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Envío:</span>
                      <span className="text-success">GRATIS</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mb-3">
                      <strong>Total:</strong>
                      <strong className="text-primary fs-4">{formatPrice(total)}</strong>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Procesando...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-lock me-2"></i>
                        Confirmar Pago
                      </>
                    )}
                  </button>

                  <div className="text-center mt-3">
                    <small className="text-muted">
                      <i className="fas fa-shield-alt me-1"></i>
                      Pago seguro y encriptado
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;

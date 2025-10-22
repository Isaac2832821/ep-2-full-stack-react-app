import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../../utils/formatters';
import { TAX_RATE } from '../../../utils/constants';
import './CartSummary.css';

const CartSummary = ({ items, onCheckout }) => {
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const navigate = useNavigate();

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  const tax = subtotal * TAX_RATE;
  const discountAmount = subtotal * discount;
  const total = subtotal + tax - discountAmount;

  const handleApplyCoupon = () => {
    // Simple coupon validation (can be expanded)
    const validCoupons = {
      'DESCUENTO10': 0.10,
      'DESCUENTO20': 0.20,
      'PRIMERACOMPRA': 0.15
    };

    const upperCoupon = couponCode.toUpperCase();
    
    if (validCoupons[upperCoupon]) {
      setDiscount(validCoupons[upperCoupon]);
      setCouponError('');
      alert(`¡Cupón aplicado! ${validCoupons[upperCoupon] * 100}% de descuento`);
    } else if (couponCode.trim()) {
      setCouponError('Cupón inválido');
      setDiscount(0);
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    // Call the checkout handler
    if (onCheckout) {
      onCheckout();
    }

    // Navigate to checkout page
    navigate('/checkout');
  };

  return (
    <div className="cart-summary">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title mb-4">Resumen del Pedido</h4>

          {/* Subtotal */}
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          {/* Tax */}
          <div className="summary-row">
            <span>IVA (19%):</span>
            <span>{formatPrice(tax)}</span>
          </div>

          {/* Discount */}
          {discount > 0 && (
            <div className="summary-row text-success">
              <span>Descuento ({discount * 100}%):</span>
              <span>-{formatPrice(discountAmount)}</span>
            </div>
          )}

          {/* Divider */}
          <hr className="my-3" />

          {/* Total */}
          <div className="summary-row summary-total">
            <span className="fw-bold">TOTAL:</span>
            <span className="fw-bold text-primary">{formatPrice(total)}</span>
          </div>

          {/* Coupon Section */}
          <div className="coupon-section mt-4">
            <label className="form-label">¿Tienes un cupón de descuento?</label>
            <div className="input-group">
              <input
                type="text"
                className={`form-control ${couponError ? 'is-invalid' : ''}`}
                placeholder="Código de cupón"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value);
                  setCouponError('');
                }}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleApplyCoupon}
              >
                Aplicar
              </button>
            </div>
            {couponError && (
              <div className="invalid-feedback d-block">{couponError}</div>
            )}
            <small className="text-muted d-block mt-2">
              Cupones disponibles: DESCUENTO10, DESCUENTO20, PRIMERACOMPRA
            </small>
          </div>

          {/* Checkout Button */}
          <button
            className="btn btn-primary btn-lg w-100 mt-4"
            onClick={handleCheckout}
            disabled={items.length === 0}
          >
            <i className="fas fa-credit-card me-2"></i>
            Proceder al Pago
          </button>

          {/* Continue Shopping Link */}
          <div className="text-center mt-3">
            <a href="/productos" className="text-decoration-none">
              <i className="fas fa-arrow-left me-2"></i>
              Continuar Comprando
            </a>
          </div>
        </div>
      </div>

      {/* Security Info */}
      <div className="security-info mt-3">
        <div className="d-flex align-items-center justify-content-center gap-3 text-muted">
          <div>
            <i className="fas fa-lock me-1"></i>
            <small>Pago Seguro</small>
          </div>
          <div>
            <i className="fas fa-truck me-1"></i>
            <small>Envío Gratis</small>
          </div>
          <div>
            <i className="fas fa-undo me-1"></i>
            <small>Devolución Fácil</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;

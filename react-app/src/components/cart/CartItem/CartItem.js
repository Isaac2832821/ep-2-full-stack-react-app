import React from 'react';
import { formatPrice } from '../../../utils/formatters';
import './CartItem.css';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const handleDecrease = () => {
    if (item.cantidad > 1) {
      onUpdateQuantity(item.id, item.cantidad - 1);
    }
  };

  const handleIncrease = () => {
    onUpdateQuantity(item.id, item.cantidad + 1);
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  const itemTotal = item.precio * item.cantidad;

  return (
    <div className="cart-item">
      <div className="row align-items-center g-3">
        {/* Product Image */}
        <div className="col-12 col-sm-3 col-md-2">
          <div className="cart-item-image">
            <img
              src={item.imagen}
              alt={item.nombre}
              className="img-fluid rounded"
              onError={(e) => {
                e.target.src = '/imagenes/placeholder.jpg';
              }}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="col-12 col-sm-5 col-md-4">
          <div className="cart-item-details">
            <h5 className="cart-item-title">{item.nombre}</h5>
            <p className="cart-item-price text-muted mb-0">
              {formatPrice(item.precio)} c/u
            </p>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="col-6 col-sm-4 col-md-3">
          <div className="cart-item-quantity">
            <div className="input-group">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleDecrease}
                disabled={item.cantidad <= 1}
              >
                <i className="fas fa-minus"></i>
              </button>
              <input
                type="text"
                className="form-control text-center"
                value={item.cantidad}
                readOnly
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleIncrease}
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Item Total */}
        <div className="col-4 col-sm-6 col-md-2">
          <div className="cart-item-total">
            <p className="fw-bold mb-0">{formatPrice(itemTotal)}</p>
          </div>
        </div>

        {/* Remove Button */}
        <div className="col-2 col-sm-6 col-md-1">
          <button
            className="btn btn-outline-danger btn-sm w-100"
            onClick={handleRemove}
            title="Eliminar producto"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

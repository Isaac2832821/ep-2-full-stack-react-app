import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../utils/formatters';
import { truncateText } from '../../../utils/formatters';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100 product-card">
        <Link to={`/producto/${product.id}`} className="text-decoration-none">
          <div className="product-image-container">
            <img
              src={product.imagen}
              className="card-img-top product-image"
              alt={product.nombre}
              onError={(e) => {
                e.target.src = '/imagenes/placeholder.jpg';
              }}
            />
            {product.stock <= 5 && product.stock > 0 && (
              <span className="badge bg-warning text-dark stock-badge">
                ¡Últimas unidades!
              </span>
            )}
            {product.stock === 0 && (
              <span className="badge bg-danger stock-badge">
                Agotado
              </span>
            )}
          </div>
        </Link>

        <div className="card-body d-flex flex-column">
          <Link to={`/producto/${product.id}`} className="text-decoration-none">
            <h5 className="card-title product-title">
              {truncateText(product.nombre, 60)}
            </h5>
          </Link>
          
          <p className="card-text product-description text-muted flex-grow-1">
            {truncateText(product.descripcion, 80)}
          </p>
          
          <div className="product-footer mt-auto">
            <p className="product-price mb-2">
              {formatPrice(product.precio)}
            </p>
            
            <button
              className="btn btn-primary w-100"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? (
                <>
                  <i className="fas fa-times-circle me-2"></i>
                  Agotado
                </>
              ) : (
                <>
                  <i className="fas fa-cart-plus me-2"></i>
                  Añadir al Carrito
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

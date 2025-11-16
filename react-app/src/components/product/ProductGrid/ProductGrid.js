import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import './ProductGrid.css';

const ProductGrid = ({ products, loading, onAddToCart }) => {
  if (loading) {
    return <LoadingSpinner message="Cargando productos..." />;
  }

  if (!products || products.length === 0) {
    return (
      <div className="empty-products">
        <div className="empty-products-icon">
          <i className="fas fa-box-open fa-4x text-muted"></i>
        </div>
        <h3 className="mt-3">No se encontraron productos</h3>
        <p className="text-muted">
          Intenta ajustar los filtros o buscar con otros términos.
        </p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      <div className="row">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;

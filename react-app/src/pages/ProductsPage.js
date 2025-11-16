import React from 'react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import ProductFilter from '../components/product/ProductFilter/ProductFilter';
import ProductGrid from '../components/product/ProductGrid/ProductGrid';
import './ProductsPage.css';

const ProductsPage = () => {
  const {
    filteredProducts,
    loading,
    filters,
    filterByCategory,
    filterByPrice,
    searchProducts,
    clearFilters
  } = useProducts();

  const { addItem } = useCart();

  const handleAddToCart = (product) => {
    addItem(product, 1);
    // Show success message (could be improved with toast notification)
    alert(`${product.nombre} añadido al carrito`);
  };

  return (
    <div className="products-page">
      {/* Breadcrumb */}
      <section className="breadcrumb-section bg-light py-3">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Productos
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="products-section py-4">
        <div className="container">
          <div className="section-header mb-4">
            <h1 className="section-title">Nuestros Productos</h1>
            <p className="section-subtitle text-muted">
              Descubre nuestra colección de zapatillas de alta calidad
            </p>
          </div>

          {/* Filters */}
          <ProductFilter
            filters={filters}
            onCategoryChange={filterByCategory}
            onPriceChange={filterByPrice}
            onSearchChange={searchProducts}
            onClearFilters={clearFilters}
            productCount={filteredProducts.length}
          />

          {/* Product Grid */}
          <div className="mt-4">
            <ProductGrid
              products={filteredProducts}
              loading={loading}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;

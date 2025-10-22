import React from 'react';
import { CATEGORIES, PRICE_RANGES } from '../../../utils/constants';
import './ProductFilter.css';

const ProductFilter = ({ 
  filters, 
  onCategoryChange, 
  onPriceChange, 
  onSearchChange,
  onClearFilters,
  productCount 
}) => {
  const handleCategoryChange = (e) => {
    onCategoryChange(e.target.value);
  };

  const handlePriceChange = (e) => {
    onPriceChange(e.target.value);
  };

  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
  };

  const hasActiveFilters = filters.category || filters.priceRange || filters.searchQuery;

  return (
    <div className="product-filter mb-4">
      <div className="row g-3">
        {/* Search */}
        <div className="col-12 col-md-4">
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar productos..."
              value={filters.searchQuery || ''}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="col-12 col-sm-6 col-md-3">
          <select
            className="form-select"
            value={filters.category || ''}
            onChange={handleCategoryChange}
          >
            <option value="">Todas las categorías</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="col-12 col-sm-6 col-md-3">
          <select
            className="form-select"
            value={filters.priceRange || ''}
            onChange={handlePriceChange}
          >
            <option value="">Todos los precios</option>
            {PRICE_RANGES.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        <div className="col-12 col-md-2">
          <button
            className="btn btn-outline-secondary w-100"
            onClick={onClearFilters}
            disabled={!hasActiveFilters}
          >
            <i className="fas fa-times me-2"></i>
            Limpiar
          </button>
        </div>
      </div>

      {/* Results count */}
      <div className="filter-results mt-3">
        <p className="text-muted mb-0">
          <i className="fas fa-box me-2"></i>
          {productCount} {productCount === 1 ? 'producto encontrado' : 'productos encontrados'}
        </p>
      </div>
    </div>
  );
};

export default ProductFilter;

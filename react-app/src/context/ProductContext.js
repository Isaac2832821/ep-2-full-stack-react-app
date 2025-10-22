import React, { createContext, useContext, useState, useEffect } from 'react';
import { productos as initialProducts } from '../data/products';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    searchQuery: ''
  });

  // Apply filters whenever products or filters change
  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (filters.category) {
      result = result.filter(p => p.categoria === filters.category);
    }

    // Filter by price range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (max) {
        result = result.filter(p => p.precio >= min && p.precio <= max);
      } else {
        result = result.filter(p => p.precio >= min);
      }
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(p =>
        p.nombre.toLowerCase().includes(query) ||
        p.descripcion.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(result);
  }, [products, filters]);

  const filterByCategory = (category) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const filterByPrice = (priceRange) => {
    setFilters(prev => ({ ...prev, priceRange }));
  };

  const searchProducts = (query) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: '',
      searchQuery: ''
    });
  };

  const getProductById = (id) => {
    return products.find(p => p.id === parseInt(id));
  };

  const value = {
    products,
    filteredProducts,
    loading,
    filters,
    filterByCategory,
    filterByPrice,
    searchProducts,
    clearFilters,
    getProductById
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

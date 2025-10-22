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
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    searchQuery: ''
  });

  // Load products from localStorage or use initial products
  useEffect(() => {
    const savedProducts = localStorage.getItem('productos');
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts);
        setProducts(parsed);
        setFilteredProducts(parsed);
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts(initialProducts);
        setFilteredProducts(initialProducts);
        localStorage.setItem('productos', JSON.stringify(initialProducts));
      }
    } else {
      // First time: save initial products to localStorage
      setProducts(initialProducts);
      setFilteredProducts(initialProducts);
      localStorage.setItem('productos', JSON.stringify(initialProducts));
    }
  }, []);

  // Listen for storage changes (when admin updates products or checkout updates stock)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'productos' && e.newValue) {
        try {
          const updatedProducts = JSON.parse(e.newValue);
          setProducts(updatedProducts);
        } catch (error) {
          console.error('Error parsing updated products:', error);
        }
      }
    };

    // Listen for both cross-window and same-window storage events
    window.addEventListener('storage', handleStorageChange);
    
    // Also check localStorage periodically for same-window updates
    const intervalId = setInterval(() => {
      const savedProducts = localStorage.getItem('productos');
      if (savedProducts) {
        try {
          const parsed = JSON.parse(savedProducts);
          // Only update if products actually changed
          if (JSON.stringify(parsed) !== JSON.stringify(products)) {
            setProducts(parsed);
          }
        } catch (error) {
          console.error('Error checking products:', error);
        }
      }
    }, 2000); // Check every 2 seconds

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, [products]);

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

  const updateProduct = (updatedProduct) => {
    const updatedProducts = products.map(p =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    setProducts(updatedProducts);
    localStorage.setItem('productos', JSON.stringify(updatedProducts));
  };

  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: Date.now()
    };
    const updatedProducts = [...products, productWithId];
    setProducts(updatedProducts);
    localStorage.setItem('productos', JSON.stringify(updatedProducts));
    return productWithId;
  };

  const deleteProduct = (productId) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem('productos', JSON.stringify(updatedProducts));
  };

  const value = {
    products,
    filteredProducts,
    filters,
    filterByCategory,
    filterByPrice,
    searchProducts,
    clearFilters,
    getProductById,
    updateProduct,
    addProduct,
    deleteProduct
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

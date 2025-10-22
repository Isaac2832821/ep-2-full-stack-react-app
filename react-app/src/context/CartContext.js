import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('carrito');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(items));
  }, [items]);

  const addItem = (product, quantity = 1) => {
    setLoading(true);
    try {
      setItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === product.id);
        
        if (existingItem) {
          const updated = prevItems.map(item =>
            item.id === product.id
              ? { ...item, cantidad: item.cantidad + quantity }
              : item
          );
          console.log('Updated cart:', updated);
          return updated;
        }
        
        const newCart = [...prevItems, {
          id: product.id,
          nombre: product.nombre,
          precio: product.precio,
          cantidad: quantity,
          imagen: product.imagen
        }];
        console.log('New cart:', newCart);
        return newCart;
      });
    } finally {
      setLoading(false);
    }
  };

  const removeItem = (productId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, cantidad: quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotal = () => {
    return items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  const itemCount = items.reduce((count, item) => count + item.cantidad, 0);

  const value = {
    items,
    loading,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
    itemCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from './ProductCard';
import '../../../setupTestsJasmine';

// Mock product data
const mockProduct = {
  id: 1,
  nombre: 'Test Product',
  precio: 50000,
  descripcion: 'Test description for product',
  imagen: '/test-image.jpg',
  stock: 10
};

const mockProductOutOfStock = {
  ...mockProduct,
  stock: 0
};

// Wrapper component for Router
const RouterWrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('ProductCard Component (Jasmine)', () => {
  let mockAddToCart;

  beforeEach(() => {
    mockAddToCart = jasmine.createSpy('mockAddToCart');
  });

  it('should render product information correctly', () => {
    render(
      <RouterWrapper>
        <ProductCard product={mockProduct} onAddToCart={mockAddToCart} />
      </RouterWrapper>
    );

    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/Test description/i)).toBeInTheDocument();
    expect(screen.getByText(/50\.000/)).toBeInTheDocument();
  });

  it('should call onAddToCart when button is clicked', () => {
    render(
      <RouterWrapper>
        <ProductCard product={mockProduct} onAddToCart={mockAddToCart} />
      </RouterWrapper>
    );

    const addButton = screen.getByRole('button', { name: /Añadir al Carrito/i });
    fireEvent.click(addButton);

    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('should display formatted price', () => {
    render(
      <RouterWrapper>
        <ProductCard product={mockProduct} onAddToCart={mockAddToCart} />
      </RouterWrapper>
    );

    // Check that price is formatted (contains $ and formatted number)
    const priceElement = screen.getByText(/\$/);
    expect(priceElement).toBeInTheDocument();
  });

  it('should disable button when product is out of stock', () => {
    render(
      <RouterWrapper>
        <ProductCard product={mockProductOutOfStock} onAddToCart={mockAddToCart} />
      </RouterWrapper>
    );

    const addButton = screen.getByRole('button', { name: /Agotado/i });
    expect(addButton).toBeDisabled();
  });

  it('should show stock badge when stock is low', () => {
    const lowStockProduct = { ...mockProduct, stock: 3 };
    
    render(
      <RouterWrapper>
        <ProductCard product={lowStockProduct} onAddToCart={mockAddToCart} />
      </RouterWrapper>
    );

    expect(screen.getByText(/Últimas unidades/i)).toBeInTheDocument();
  });

  it('should show out of stock badge when stock is 0', () => {
    render(
      <RouterWrapper>
        <ProductCard product={mockProductOutOfStock} onAddToCart={mockAddToCart} />
      </RouterWrapper>
    );

    expect(screen.getAllByText(/Agotado/i).length).toBeGreaterThan(0);
  });

  it('should have link to product detail page', () => {
    render(
      <RouterWrapper>
        <ProductCard product={mockProduct} onAddToCart={mockAddToCart} />
      </RouterWrapper>
    );

    const links = screen.getAllByRole('link');
    const productLink = links.find(link => link.getAttribute('href') === `/producto/${mockProduct.id}`);
    expect(productLink).toBeInTheDocument();
  });
});

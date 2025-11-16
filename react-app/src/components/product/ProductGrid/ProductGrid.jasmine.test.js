import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductGrid from './ProductGrid';
import '../../../setupTestsJasmine';

const mockProducts = [
  {
    id: 1,
    nombre: 'Product 1',
    precio: 50000,
    descripcion: 'Description 1',
    imagen: '/image1.jpg',
    stock: 10
  },
  {
    id: 2,
    nombre: 'Product 2',
    precio: 75000,
    descripcion: 'Description 2',
    imagen: '/image2.jpg',
    stock: 5
  }
];

const RouterWrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('ProductGrid Component (Jasmine)', () => {
  let mockAddToCart;

  beforeEach(() => {
    mockAddToCart = jasmine.createSpy('mockAddToCart');
  });

  it('should render loading spinner when loading is true', () => {
    render(
      <RouterWrapper>
        <ProductGrid products={[]} loading={true} onAddToCart={mockAddToCart} />
      </RouterWrapper>
    );

    expect(screen.getByText(/Cargando productos/i)).toBeInTheDocument();
  });

  it('should render empty state when no products', () => {
    render(
      <RouterWrapper>
        <ProductGrid products={[]} loading={false} onAddToCart={mockAddToCart} />
      </RouterWrapper>
    );

    expect(screen.getByText(/No se encontraron productos/i)).toBeInTheDocument();
  });

  it('should render all products when provided', () => {
    render(
      <RouterWrapper>
        <ProductGrid products={mockProducts} loading={false} onAddToCart={mockAddToCart} />
      </RouterWrapper>
    );

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('should render correct number of product cards', () => {
    const { container } = render(
      <RouterWrapper>
        <ProductGrid products={mockProducts} loading={false} onAddToCart={mockAddToCart} />
      </RouterWrapper>
    );

    const productCards = container.querySelectorAll('.product-card');
    expect(productCards.length).toBe(mockProducts.length);
  });
});

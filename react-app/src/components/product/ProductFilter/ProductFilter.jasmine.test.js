import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductFilter from './ProductFilter';
import '../../../setupTestsJasmine';

describe('ProductFilter Component (Jasmine)', () => {
  const mockFilters = {
    category: '',
    priceRange: '',
    searchQuery: ''
  };

  let mockHandlers;

  beforeEach(() => {
    mockHandlers = {
      onCategoryChange: jasmine.createSpy('onCategoryChange'),
      onPriceChange: jasmine.createSpy('onPriceChange'),
      onSearchChange: jasmine.createSpy('onSearchChange'),
      onClearFilters: jasmine.createSpy('onClearFilters')
    };
  });

  it('should render all filter controls', () => {
    render(
      <ProductFilter
        filters={mockFilters}
        {...mockHandlers}
        productCount={10}
      />
    );

    expect(screen.getByPlaceholderText(/Buscar productos/i)).toBeInTheDocument();
    expect(screen.getByText(/Todas las categorías/i)).toBeInTheDocument();
    expect(screen.getByText(/Todos los precios/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Limpiar/i })).toBeInTheDocument();
  });

  it('should call onSearchChange when search input changes', () => {
    render(
      <ProductFilter
        filters={mockFilters}
        {...mockHandlers}
        productCount={10}
      />
    );

    const searchInput = screen.getByPlaceholderText(/Buscar productos/i);
    fireEvent.change(searchInput, { target: { value: 'test search' } });

    expect(mockHandlers.onSearchChange).toHaveBeenCalledWith('test search');
  });

  it('should call onCategoryChange when category is selected', () => {
    render(
      <ProductFilter
        filters={mockFilters}
        {...mockHandlers}
        productCount={10}
      />
    );

    const categorySelect = screen.getByDisplayValue(/Todas las categorías/i);
    fireEvent.change(categorySelect, { target: { value: 'vans' } });

    expect(mockHandlers.onCategoryChange).toHaveBeenCalledWith('vans');
  });

  it('should call onPriceChange when price range is selected', () => {
    render(
      <ProductFilter
        filters={mockFilters}
        {...mockHandlers}
        productCount={10}
      />
    );

    const priceSelect = screen.getByDisplayValue(/Todos los precios/i);
    fireEvent.change(priceSelect, { target: { value: '0-50000' } });

    expect(mockHandlers.onPriceChange).toHaveBeenCalledWith('0-50000');
  });

  it('should call onClearFilters when clear button is clicked', () => {
    const filtersWithValues = {
      category: 'vans',
      priceRange: '0-50000',
      searchQuery: 'test'
    };

    render(
      <ProductFilter
        filters={filtersWithValues}
        {...mockHandlers}
        productCount={5}
      />
    );

    const clearButton = screen.getByRole('button', { name: /Limpiar/i });
    fireEvent.click(clearButton);

    expect(mockHandlers.onClearFilters).toHaveBeenCalled();
  });

  it('should disable clear button when no filters are active', () => {
    render(
      <ProductFilter
        filters={mockFilters}
        {...mockHandlers}
        productCount={10}
      />
    );

    const clearButton = screen.getByRole('button', { name: /Limpiar/i });
    expect(clearButton).toBeDisabled();
  });

  it('should display correct product count', () => {
    render(
      <ProductFilter
        filters={mockFilters}
        {...mockHandlers}
        productCount={15}
      />
    );

    expect(screen.getByText(/15 productos encontrados/i)).toBeInTheDocument();
  });

  it('should display singular form for single product', () => {
    render(
      <ProductFilter
        filters={mockFilters}
        {...mockHandlers}
        productCount={1}
      />
    );

    expect(screen.getByText(/1 producto encontrado/i)).toBeInTheDocument();
  });
});

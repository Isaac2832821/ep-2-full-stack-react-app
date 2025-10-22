import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from './CartItem';

const mockItem = {
  id: 1,
  nombre: 'Test Product',
  precio: 50000,
  cantidad: 2,
  imagen: '/test-image.jpg'
};

describe('CartItem Component', () => {
  let mockUpdateQuantity;
  let mockRemove;

  beforeEach(() => {
    mockUpdateQuantity = jest.fn();
    mockRemove = jest.fn();
  });

  it('should render item information correctly', () => {
    render(
      <CartItem
        item={mockItem}
        onUpdateQuantity={mockUpdateQuantity}
        onRemove={mockRemove}
      />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
  });

  it('should call onUpdateQuantity when increase button is clicked', () => {
    render(
      <CartItem
        item={mockItem}
        onUpdateQuantity={mockUpdateQuantity}
        onRemove={mockRemove}
      />
    );

    const increaseButton = screen.getByRole('button', { name: '' }).parentElement.querySelector('.fa-plus').parentElement;
    fireEvent.click(increaseButton);

    expect(mockUpdateQuantity).toHaveBeenCalledWith(mockItem.id, 3);
  });

  it('should call onUpdateQuantity when decrease button is clicked', () => {
    render(
      <CartItem
        item={mockItem}
        onUpdateQuantity={mockUpdateQuantity}
        onRemove={mockRemove}
      />
    );

    const decreaseButton = screen.getByRole('button', { name: '' }).parentElement.querySelector('.fa-minus').parentElement;
    fireEvent.click(decreaseButton);

    expect(mockUpdateQuantity).toHaveBeenCalledWith(mockItem.id, 1);
  });

  it('should disable decrease button when quantity is 1', () => {
    const itemWithQuantity1 = { ...mockItem, cantidad: 1 };
    
    render(
      <CartItem
        item={itemWithQuantity1}
        onUpdateQuantity={mockUpdateQuantity}
        onRemove={mockRemove}
      />
    );

    const decreaseButton = screen.getByRole('button', { name: '' }).parentElement.querySelector('.fa-minus').parentElement;
    expect(decreaseButton).toBeDisabled();
  });

  it('should call onRemove when remove button is clicked', () => {
    render(
      <CartItem
        item={mockItem}
        onUpdateQuantity={mockUpdateQuantity}
        onRemove={mockRemove}
      />
    );

    const removeButton = screen.getByTitle('Eliminar producto');
    fireEvent.click(removeButton);

    expect(mockRemove).toHaveBeenCalledWith(mockItem.id);
  });

  it('should display correct item total', () => {
    render(
      <CartItem
        item={mockItem}
        onUpdateQuantity={mockUpdateQuantity}
        onRemove={mockRemove}
      />
    );

    // Total should be 50000 * 2 = 100000
    expect(screen.getByText(/100\.000/)).toBeInTheDocument();
  });
});

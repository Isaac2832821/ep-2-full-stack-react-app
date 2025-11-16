import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CartSummary from './CartSummary';
import '../../../setupTestsJasmine';

const mockItems = [
  {
    id: 1,
    nombre: 'Product 1',
    precio: 50000,
    cantidad: 2
  },
  {
    id: 2,
    nombre: 'Product 2',
    precio: 30000,
    cantidad: 1
  }
];

const RouterWrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('CartSummary Component (Jasmine)', () => {
  let mockCheckout;

  beforeEach(() => {
    mockCheckout = jasmine.createSpy('mockCheckout');
  });

  it('should render summary with correct totals', () => {
    render(
      <RouterWrapper>
        <CartSummary items={mockItems} onCheckout={mockCheckout} />
      </RouterWrapper>
    );

    expect(screen.getByText(/Resumen del Pedido/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Subtotal:/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/IVA/i)).toBeInTheDocument();
    expect(screen.getAllByText(/TOTAL:/i).length).toBeGreaterThan(0);
  });

  it('should calculate subtotal correctly', () => {
    render(
      <RouterWrapper>
        <CartSummary items={mockItems} onCheckout={mockCheckout} />
      </RouterWrapper>
    );

    // Subtotal should be (50000 * 2) + (30000 * 1) = 130000
    expect(screen.getByText(/130\.000/)).toBeInTheDocument();
  });

  it('should have coupon input field', () => {
    render(
      <RouterWrapper>
        <CartSummary items={mockItems} onCheckout={mockCheckout} />
      </RouterWrapper>
    );

    const couponInput = screen.getByPlaceholderText(/Código de cupón/i);
    expect(couponInput).toBeInTheDocument();
  });

  it('should have checkout button', () => {
    render(
      <RouterWrapper>
        <CartSummary items={mockItems} onCheckout={mockCheckout} />
      </RouterWrapper>
    );

    const checkoutButton = screen.getByRole('button', { name: /Proceder al Pago/i });
    expect(checkoutButton).toBeInTheDocument();
  });

  it('should disable checkout button when cart is empty', () => {
    render(
      <RouterWrapper>
        <CartSummary items={[]} onCheckout={mockCheckout} />
      </RouterWrapper>
    );

    const checkoutButton = screen.getByRole('button', { name: /Proceder al Pago/i });
    expect(checkoutButton).toBeDisabled();
  });

  it('should show security info', () => {
    render(
      <RouterWrapper>
        <CartSummary items={mockItems} onCheckout={mockCheckout} />
      </RouterWrapper>
    );

    expect(screen.getByText(/Pago Seguro/i)).toBeInTheDocument();
    expect(screen.getByText(/Envío Gratis/i)).toBeInTheDocument();
    expect(screen.getByText(/Devolución Fácil/i)).toBeInTheDocument();
  });
});

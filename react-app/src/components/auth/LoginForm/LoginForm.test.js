import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import { AuthProvider } from '../../../context/AuthContext';

const RouterWrapper = ({ children }) => (
  <BrowserRouter>
    <AuthProvider>{children}</AuthProvider>
  </BrowserRouter>
);

describe('LoginForm Component', () => {
  it('should render login form with all fields', () => {
    render(
      <RouterWrapper>
        <LoginForm />
      </RouterWrapper>
    );

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeInTheDocument();
  });

  it('should show validation errors for empty fields', async () => {
    render(
      <RouterWrapper>
        <LoginForm />
      </RouterWrapper>
    );

    const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/El email es requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/La contraseña es requerida/i)).toBeInTheDocument();
    });
  });

  it('should show error for invalid email', async () => {
    render(
      <RouterWrapper>
        <LoginForm />
      </RouterWrapper>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Email inválido/i)).toBeInTheDocument();
    });
  });

  it('should have link to register page', () => {
    render(
      <RouterWrapper>
        <LoginForm />
      </RouterWrapper>
    );

    const registerLink = screen.getByText(/Regístrate aquí/i);
    expect(registerLink).toBeInTheDocument();
    expect(registerLink.closest('a')).toHaveAttribute('href', '/registro');
  });

  it('should have forgot password link', () => {
    render(
      <RouterWrapper>
        <LoginForm />
      </RouterWrapper>
    );

    expect(screen.getByText(/¿Olvidaste tu contraseña?/i)).toBeInTheDocument();
  });
});

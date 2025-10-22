import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import { AuthProvider } from '../../../context/AuthContext';

const RouterWrapper = ({ children }) => (
  <BrowserRouter>
    <AuthProvider>{children}</AuthProvider>
  </BrowserRouter>
);

describe('RegisterForm Component', () => {
  it('should render register form with all required fields', () => {
    render(
      <RouterWrapper>
        <RegisterForm />
      </RouterWrapper>
    );

    expect(screen.getByLabelText(/Nombre Completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/RUN/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Región/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Comuna/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Dirección/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Contraseña/i).length).toBeGreaterThan(0);
  });

  it('should show validation errors for empty required fields', async () => {
    render(
      <RouterWrapper>
        <RegisterForm />
      </RouterWrapper>
    );

    const submitButton = screen.getByRole('button', { name: /Crear Cuenta/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/El nombre es requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/El RUN es requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/El email es requerido/i)).toBeInTheDocument();
    });
  });

  it('should show error when passwords do not match', async () => {
    render(
      <RouterWrapper>
        <RegisterForm />
      </RouterWrapper>
    );

    const passwordInputs = screen.getAllByLabelText(/Contraseña/i);
    const passwordInput = passwordInputs[0];
    const confirmPasswordInput = screen.getByLabelText(/Confirmar Contraseña/i);

    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password456' } });

    const submitButton = screen.getByRole('button', { name: /Crear Cuenta/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Las contraseñas no coinciden/i)).toBeInTheDocument();
    });
  });

  it('should have link to login page', () => {
    render(
      <RouterWrapper>
        <RegisterForm />
      </RouterWrapper>
    );

    const loginLink = screen.getByText(/Inicia sesión aquí/i);
    expect(loginLink).toBeInTheDocument();
    expect(loginLink.closest('a')).toHaveAttribute('href', '/login');
  });

  it('should have region select with options', () => {
    render(
      <RouterWrapper>
        <RegisterForm />
      </RouterWrapper>
    );

    const regionSelect = screen.getByLabelText(/Región/i);
    expect(regionSelect).toBeInTheDocument();
    expect(regionSelect.tagName).toBe('SELECT');
  });
});

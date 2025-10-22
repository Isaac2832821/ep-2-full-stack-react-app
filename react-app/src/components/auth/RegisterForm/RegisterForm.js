import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { validateEmail, validateRUN, validatePhone, validatePassword, validateRequired } from '../../../utils/validators';
import { REGIONES } from '../../../utils/constants';
import './RegisterForm.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    run: '',
    email: '',
    telefono: '',
    region: '',
    comuna: '',
    direccion: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setServerError('');
  };

  const validateForm = () => {
    const newErrors = {};

    // Nombre
    if (!validateRequired(formData.nombre)) {
      newErrors.nombre = 'El nombre es requerido';
    }

    // RUN
    if (!validateRequired(formData.run)) {
      newErrors.run = 'El RUN es requerido';
    } else if (!validateRUN(formData.run)) {
      newErrors.run = 'RUN inválido';
    }

    // Email
    if (!validateRequired(formData.email)) {
      newErrors.email = 'El email es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    // Teléfono (opcional pero si se ingresa debe ser válido)
    if (formData.telefono && !validatePhone(formData.telefono)) {
      newErrors.telefono = 'Teléfono inválido';
    }

    // Región
    if (!validateRequired(formData.region)) {
      newErrors.region = 'La región es requerida';
    }

    // Comuna
    if (!validateRequired(formData.comuna)) {
      newErrors.comuna = 'La comuna es requerida';
    }

    // Dirección
    if (!validateRequired(formData.direccion)) {
      newErrors.direccion = 'La dirección es requerida';
    }

    // Password
    if (!validateRequired(formData.password)) {
      newErrors.password = 'La contraseña es requerida';
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.message;
      }
    }

    // Confirm Password
    if (!validateRequired(formData.confirmPassword)) {
      newErrors.confirmPassword = 'Debes confirmar la contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validateForm()) {
      return;
    }

    // Remove confirmPassword before sending
    const { confirmPassword, ...userData } = formData;
    
    const result = await register(userData);

    if (result.success) {
      navigate('/');
    } else {
      setServerError(result.error || 'Error al registrar usuario');
    }
  };

  return (
    <div className="register-form-container">
      <div className="register-form-card">
        <div className="register-form-header">
          <h2>Crear Cuenta</h2>
          <p className="text-muted">Regístrate en PasoxPaso</p>
        </div>

        {serverError && (
          <div className="alert alert-danger" role="alert">
            <i className="fas fa-exclamation-circle me-2"></i>
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Personal Information */}
          <h5 className="section-title">Información Personal</h5>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre Completo <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.nombre && (
                <div className="invalid-feedback">{errors.nombre}</div>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="run" className="form-label">
                RUN <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.run ? 'is-invalid' : ''}`}
                id="run"
                name="run"
                value={formData.run}
                onChange={handleChange}
                placeholder="12.345.678-9"
                disabled={loading}
              />
              {errors.run && (
                <div className="invalid-feedback">{errors.run}</div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="email" className="form-label">
                Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                disabled={loading}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="telefono" className="form-label">
                Teléfono
              </label>
              <input
                type="tel"
                className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="+56 9 1234 5678"
                disabled={loading}
              />
              {errors.telefono && (
                <div className="invalid-feedback">{errors.telefono}</div>
              )}
            </div>
          </div>

          {/* Address Information */}
          <h5 className="section-title mt-4">Dirección</h5>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="region" className="form-label">
                Región <span className="text-danger">*</span>
              </label>
              <select
                className={`form-select ${errors.region ? 'is-invalid' : ''}`}
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Selecciona una región</option>
                {REGIONES.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              {errors.region && (
                <div className="invalid-feedback">{errors.region}</div>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="comuna" className="form-label">
                Comuna <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.comuna ? 'is-invalid' : ''}`}
                id="comuna"
                name="comuna"
                value={formData.comuna}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.comuna && (
                <div className="invalid-feedback">{errors.comuna}</div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="direccion" className="form-label">
              Dirección <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.direccion ? 'is-invalid' : ''}`}
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              placeholder="Calle, número, depto/casa"
              disabled={loading}
            />
            {errors.direccion && (
              <div className="invalid-feedback">{errors.direccion}</div>
            )}
          </div>

          {/* Password */}
          <h5 className="section-title mt-4">Contraseña</h5>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
              <small className="text-muted">
                Mínimo 6 caracteres, una mayúscula y un número
              </small>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirmar Contraseña <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 mb-3 mt-3"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Registrando...
              </>
            ) : (
              <>
                <i className="fas fa-user-plus me-2"></i>
                Crear Cuenta
              </>
            )}
          </button>

          {/* Login Link */}
          <div className="text-center">
            <p className="mb-0">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="text-decoration-none fw-bold">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

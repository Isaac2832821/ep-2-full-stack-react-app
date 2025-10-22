import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout/AdminLayout';
import { validateEmail, validateRequired, validateRUN } from '../utils/validators';
import { REGIONES_COMUNAS } from '../utils/constants';
import './AdminNewUserPage.css';

const AdminNewUserPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('cliente');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    rut: '',
    direccion: '',
    region: '',
    comuna: '',
    password: '',
    confirmPassword: '',
    // Employee specific fields
    cargo: '',
    departamento: '',
    salario: ''
  });
  const [errors, setErrors] = useState({});

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
  };

  const validateForm = () => {
    const newErrors = {};

    if (!validateRequired(formData.nombre)) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!validateRequired(formData.email)) {
      newErrors.email = 'El email es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!validateRequired(formData.telefono)) {
      newErrors.telefono = 'El teléfono es requerido';
    }

    if (!validateRequired(formData.rut)) {
      newErrors.rut = 'El RUT es requerido';
    } else if (!validateRUN(formData.rut)) {
      newErrors.rut = 'RUT inválido';
    }

    if (userType === 'cliente') {
      if (!validateRequired(formData.direccion)) {
        newErrors.direccion = 'La dirección es requerida';
      }
      if (!validateRequired(formData.region)) {
        newErrors.region = 'La región es requerida';
      }
      if (!validateRequired(formData.comuna)) {
        newErrors.comuna = 'La comuna es requerida';
      }
    }

    if (userType === 'empleado') {
      if (!validateRequired(formData.cargo)) {
        newErrors.cargo = 'El cargo es requerido';
      }
      if (!validateRequired(formData.departamento)) {
        newErrors.departamento = 'El departamento es requerido';
      }
    }

    if (!validateRequired(formData.password)) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // In a real app, this would save to backend
    const newUser = {
      ...formData,
      id: Date.now(),
      tipo: userType,
      fechaRegistro: new Date().toISOString().split('T')[0],
      estado: 'activo'
    };

    // Save to localStorage
    if (userType === 'cliente') {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      alert('Cliente creado exitosamente');
      navigate('/admin/users');
    } else {
      alert('Empleado creado exitosamente');
      navigate('/admin/employees');
    }
  };

  const comunas = formData.region ? REGIONES_COMUNAS[formData.region] || [] : [];

  return (
    <AdminLayout>
      <div className="new-user-page">
        {/* Page Header */}
        <div className="page-header">
          <h2>
            <i className="fas fa-user-plus me-2"></i>
            Crear Nuevo Usuario
          </h2>
        </div>

        <div className="row">
          <div className="col-12 col-lg-8 mx-auto">
            <div className="card">
              <div className="card-body">
                {/* User Type Selector */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Tipo de Usuario</label>
                  <div className="btn-group w-100" role="group">
                    <input
                      type="radio"
                      className="btn-check"
                      name="userType"
                      id="typeCliente"
                      value="cliente"
                      checked={userType === 'cliente'}
                      onChange={(e) => setUserType(e.target.value)}
                    />
                    <label className="btn btn-outline-primary" htmlFor="typeCliente">
                      <i className="fas fa-user me-2"></i>
                      Cliente
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="userType"
                      id="typeEmpleado"
                      value="empleado"
                      checked={userType === 'empleado'}
                      onChange={(e) => setUserType(e.target.value)}
                    />
                    <label className="btn btn-outline-primary" htmlFor="typeEmpleado">
                      <i className="fas fa-user-tie me-2"></i>
                      Empleado
                    </label>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Basic Information */}
                  <h5 className="mb-3">Información Básica</h5>
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Nombre Completo *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                      />
                      {errors.nombre && (
                        <div className="invalid-feedback">{errors.nombre}</div>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">RUT *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.rut ? 'is-invalid' : ''}`}
                        name="rut"
                        value={formData.rut}
                        onChange={handleChange}
                        placeholder="12.345.678-9"
                      />
                      {errors.rut && (
                        <div className="invalid-feedback">{errors.rut}</div>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Teléfono *</label>
                      <input
                        type="tel"
                        className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="+56 9 1234 5678"
                      />
                      {errors.telefono && (
                        <div className="invalid-feedback">{errors.telefono}</div>
                      )}
                    </div>
                  </div>

                  {/* Cliente specific fields */}
                  {userType === 'cliente' && (
                    <>
                      <h5 className="mb-3 mt-4">Información de Dirección</h5>
                      
                      <div className="mb-3">
                        <label className="form-label">Dirección *</label>
                        <input
                          type="text"
                          className={`form-control ${errors.direccion ? 'is-invalid' : ''}`}
                          name="direccion"
                          value={formData.direccion}
                          onChange={handleChange}
                        />
                        {errors.direccion && (
                          <div className="invalid-feedback">{errors.direccion}</div>
                        )}
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Región *</label>
                          <select
                            className={`form-select ${errors.region ? 'is-invalid' : ''}`}
                            name="region"
                            value={formData.region}
                            onChange={handleChange}
                          >
                            <option value="">Seleccionar región</option>
                            {Object.keys(REGIONES_COMUNAS).map(region => (
                              <option key={region} value={region}>{region}</option>
                            ))}
                          </select>
                          {errors.region && (
                            <div className="invalid-feedback">{errors.region}</div>
                          )}
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label">Comuna *</label>
                          <select
                            className={`form-select ${errors.comuna ? 'is-invalid' : ''}`}
                            name="comuna"
                            value={formData.comuna}
                            onChange={handleChange}
                            disabled={!formData.region}
                          >
                            <option value="">Seleccionar comuna</option>
                            {comunas.map(comuna => (
                              <option key={comuna} value={comuna}>{comuna}</option>
                            ))}
                          </select>
                          {errors.comuna && (
                            <div className="invalid-feedback">{errors.comuna}</div>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Employee specific fields */}
                  {userType === 'empleado' && (
                    <>
                      <h5 className="mb-3 mt-4">Información Laboral</h5>
                      
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Cargo *</label>
                          <input
                            type="text"
                            className={`form-control ${errors.cargo ? 'is-invalid' : ''}`}
                            name="cargo"
                            value={formData.cargo}
                            onChange={handleChange}
                          />
                          {errors.cargo && (
                            <div className="invalid-feedback">{errors.cargo}</div>
                          )}
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label">Departamento *</label>
                          <select
                            className={`form-select ${errors.departamento ? 'is-invalid' : ''}`}
                            name="departamento"
                            value={formData.departamento}
                            onChange={handleChange}
                          >
                            <option value="">Seleccionar departamento</option>
                            <option value="Administración">Administración</option>
                            <option value="Ventas">Ventas</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Logística">Logística</option>
                            <option value="Servicio al Cliente">Servicio al Cliente</option>
                            <option value="Tecnología">Tecnología</option>
                          </select>
                          {errors.departamento && (
                            <div className="invalid-feedback">{errors.departamento}</div>
                          )}
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Salario (opcional)</label>
                        <input
                          type="number"
                          className="form-control"
                          name="salario"
                          value={formData.salario}
                          onChange={handleChange}
                          placeholder="$0"
                        />
                      </div>
                    </>
                  )}

                  {/* Password */}
                  <h5 className="mb-3 mt-4">Credenciales de Acceso</h5>
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Contraseña *</label>
                      <input
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      {errors.password && (
                        <div className="invalid-feedback">{errors.password}</div>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Confirmar Contraseña *</label>
                      <input
                        type="password"
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                      {errors.confirmPassword && (
                        <div className="invalid-feedback">{errors.confirmPassword}</div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="d-flex gap-2 justify-content-end mt-4">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => navigate(-1)}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary">
                      <i className="fas fa-save me-2"></i>
                      Crear Usuario
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNewUserPage;

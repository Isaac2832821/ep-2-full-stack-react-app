import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/admin/AdminLayout/AdminLayout';
import { formatDate } from '../utils/formatters';
import './AdminEmployeesPage.css';

const AdminEmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    // Mock employee data
    const mockEmployees = [
      {
        id: 1,
        nombre: 'María González',
        email: 'maria.gonzalez@pasoxpaso.cl',
        cargo: 'Gerente General',
        departamento: 'Administración',
        telefono: '+56 9 1234 5678',
        fechaIngreso: '2020-01-15',
        estado: 'activo'
      },
      {
        id: 2,
        nombre: 'Carlos Rodríguez',
        email: 'carlos.rodriguez@pasoxpaso.cl',
        cargo: 'Jefe de Ventas',
        departamento: 'Ventas',
        telefono: '+56 9 8765 4321',
        fechaIngreso: '2020-06-01',
        estado: 'activo'
      },
      {
        id: 3,
        nombre: 'Ana Martínez',
        email: 'ana.martinez@pasoxpaso.cl',
        cargo: 'Encargada de Atención al Cliente',
        departamento: 'Servicio al Cliente',
        telefono: '+56 9 5555 6666',
        fechaIngreso: '2021-03-10',
        estado: 'activo'
      },
      {
        id: 4,
        nombre: 'Pedro Silva',
        email: 'pedro.silva@pasoxpaso.cl',
        cargo: 'Encargado de Bodega',
        departamento: 'Logística',
        telefono: '+56 9 7777 8888',
        fechaIngreso: '2021-09-20',
        estado: 'activo'
      },
      {
        id: 5,
        nombre: 'Laura Fernández',
        email: 'laura.fernandez@pasoxpaso.cl',
        cargo: 'Diseñadora Gráfica',
        departamento: 'Marketing',
        telefono: '+56 9 9999 0000',
        fechaIngreso: '2022-02-14',
        estado: 'inactivo'
      }
    ];
    setEmployees(mockEmployees);
    setFilteredEmployees(mockEmployees);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = employees.filter(emp =>
        emp.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.cargo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(employees);
    }
  }, [searchTerm, employees]);

  const getStatusBadge = (estado) => {
    return estado === 'activo' ? (
      <span className="badge bg-success">Activo</span>
    ) : (
      <span className="badge bg-secondary">Inactivo</span>
    );
  };

  return (
    <AdminLayout>
      <div className="employees-page">
        {/* Page Header */}
        <div className="page-header">
          <h2>
            <i className="fas fa-users-cog me-2"></i>
            Gestión de Empleados
          </h2>
          <button className="btn btn-primary">
            <i className="fas fa-user-plus me-2"></i>
            Nuevo Empleado
          </button>
        </div>

        {/* Stats */}
        <div className="row mb-4">
          <div className="col-6 col-md-3 mb-3">
            <div className="stat-card">
              <div className="stat-icon bg-primary">
                <i className="fas fa-users"></i>
              </div>
              <div className="stat-content">
                <div className="stat-label">Total Empleados</div>
                <div className="stat-value">{employees.length}</div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3 mb-3">
            <div className="stat-card">
              <div className="stat-icon bg-success">
                <i className="fas fa-user-check"></i>
              </div>
              <div className="stat-content">
                <div className="stat-label">Activos</div>
                <div className="stat-value">
                  {employees.filter(e => e.estado === 'activo').length}
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3 mb-3">
            <div className="stat-card">
              <div className="stat-icon bg-warning">
                <i className="fas fa-briefcase"></i>
              </div>
              <div className="stat-content">
                <div className="stat-label">Departamentos</div>
                <div className="stat-value">
                  {new Set(employees.map(e => e.departamento)).size}
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3 mb-3">
            <div className="stat-card">
              <div className="stat-icon bg-info">
                <i className="fas fa-user-plus"></i>
              </div>
              <div className="stat-content">
                <div className="stat-label">Nuevos (Este Año)</div>
                <div className="stat-value">2</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="card mb-4">
          <div className="card-body">
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por nombre, email o cargo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Employees Table */}
        <div className="card">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Cargo</th>
                    <th>Departamento</th>
                    <th>Teléfono</th>
                    <th>Fecha Ingreso</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center py-4 text-muted">
                        No se encontraron empleados
                      </td>
                    </tr>
                  ) : (
                    filteredEmployees.map((employee) => (
                      <tr key={employee.id}>
                        <td className="fw-semibold">{employee.id}</td>
                        <td>{employee.nombre}</td>
                        <td>{employee.email}</td>
                        <td>{employee.cargo}</td>
                        <td>
                          <span className="badge bg-secondary">
                            {employee.departamento}
                          </span>
                        </td>
                        <td>{employee.telefono}</td>
                        <td>{formatDate(employee.fechaIngreso)}</td>
                        <td>{getStatusBadge(employee.estado)}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-1">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-secondary me-1">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-danger">
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminEmployeesPage;

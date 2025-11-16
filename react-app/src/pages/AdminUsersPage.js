import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/admin/AdminLayout/AdminLayout';
import { formatDate } from '../utils/formatters';
import './AdminUsersPage.css';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    // Load users from localStorage or use mock data
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      const parsedUsers = JSON.parse(savedUsers);
      setUsers(parsedUsers);
      setFilteredUsers(parsedUsers);
    } else {
      // Mock user data
      const mockUsers = [
        {
          id: 1,
          nombre: 'Juan Pérez',
          email: 'juan.perez@example.com',
          telefono: '+56 9 1234 5678',
          region: 'Metropolitana',
          comuna: 'Santiago',
          fechaRegistro: '2023-01-15',
          totalCompras: 8,
          estado: 'activo'
        },
        {
          id: 2,
          nombre: 'María González',
          email: 'maria.gonzalez@example.com',
          telefono: '+56 9 8765 4321',
          region: 'Metropolitana',
          comuna: 'Providencia',
          fechaRegistro: '2023-03-20',
          totalCompras: 6,
          estado: 'activo'
        },
        {
          id: 3,
          nombre: 'Carlos Rodríguez',
          email: 'carlos.rodriguez@example.com',
          telefono: '+56 9 5555 6666',
          region: 'Valparaíso',
          comuna: 'Viña del Mar',
          fechaRegistro: '2023-05-10',
          totalCompras: 5,
          estado: 'activo'
        },
        {
          id: 4,
          nombre: 'Ana Martínez',
          email: 'ana.martinez@example.com',
          telefono: '+56 9 7777 8888',
          region: 'Metropolitana',
          comuna: 'Las Condes',
          fechaRegistro: '2023-07-22',
          totalCompras: 4,
          estado: 'activo'
        },
        {
          id: 5,
          nombre: 'Pedro Silva',
          email: 'pedro.silva@example.com',
          telefono: '+56 9 9999 0000',
          region: 'Biobío',
          comuna: 'Concepción',
          fechaRegistro: '2023-09-05',
          totalCompras: 3,
          estado: 'inactivo'
        }
      ];
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      localStorage.setItem('users', JSON.stringify(mockUsers));
    }
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = users.filter(user =>
        user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  const getStatusBadge = (estado) => {
    return estado === 'activo' ? (
      <span className="badge bg-success">Activo</span>
    ) : (
      <span className="badge bg-secondary">Inactivo</span>
    );
  };

  const handleExportExcel = () => {
    alert('Exportando clientes a Excel...');
  };

  return (
    <AdminLayout>
      <div className="users-page">
        {/* Page Header */}
        <div className="page-header">
          <h2>
            <i className="fas fa-users me-2"></i>
            Gestión de Clientes
          </h2>
          <div className="header-actions">
            <button className="btn btn-success me-2" onClick={handleExportExcel}>
              <i className="fas fa-file-excel me-2"></i>
              Exportar Excel
            </button>
            <button className="btn btn-primary">
              <i className="fas fa-user-plus me-2"></i>
              Nuevo Cliente
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="row mb-4">
          <div className="col-6 col-md-3 mb-3">
            <div className="stat-card">
              <div className="stat-icon bg-primary">
                <i className="fas fa-users"></i>
              </div>
              <div className="stat-content">
                <div className="stat-label">Total Clientes</div>
                <div className="stat-value">{users.length}</div>
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
                  {users.filter(u => u.estado === 'activo').length}
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3 mb-3">
            <div className="stat-card">
              <div className="stat-icon bg-info">
                <i className="fas fa-shopping-bag"></i>
              </div>
              <div className="stat-content">
                <div className="stat-label">Con Compras</div>
                <div className="stat-value">
                  {users.filter(u => u.totalCompras > 0).length}
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3 mb-3">
            <div className="stat-card">
              <div className="stat-icon bg-warning">
                <i className="fas fa-user-plus"></i>
              </div>
              <div className="stat-content">
                <div className="stat-label">Nuevos (Este Mes)</div>
                <div className="stat-value">12</div>
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
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="card">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Ubicación</th>
                    <th>Fecha Registro</th>
                    <th>Compras</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center py-4 text-muted">
                        No se encontraron clientes
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="fw-semibold">{user.id}</td>
                        <td>{user.nombre}</td>
                        <td>{user.email}</td>
                        <td>{user.telefono}</td>
                        <td>
                          <small>{user.comuna}, {user.region}</small>
                        </td>
                        <td>{formatDate(user.fechaRegistro)}</td>
                        <td>
                          <span className="badge bg-info">{user.totalCompras}</span>
                        </td>
                        <td>{getStatusBadge(user.estado)}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-1">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-secondary me-1">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-danger">
                            <i className="fas fa-ban"></i>
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

export default AdminUsersPage;

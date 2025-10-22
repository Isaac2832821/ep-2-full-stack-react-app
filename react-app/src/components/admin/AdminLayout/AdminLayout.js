import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/admin', icon: 'fa-tachometer-alt', label: 'Panel' },
    { path: '/admin/orders', icon: 'fa-shopping-cart', label: 'Pedidos' },
    { path: '/admin/inventory', icon: 'fa-boxes', label: 'Inventario' },
    { path: '/admin/reports', icon: 'fa-chart-bar', label: 'Informes' },
    { path: '/admin/employees', icon: 'fa-users-cog', label: 'Empleados' },
    { path: '/admin/users', icon: 'fa-users', label: 'Clientes' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="brand-icon">
            <i className="fas fa-store"></i>
          </div>
          {!sidebarCollapsed && <span className="brand-text">PasoxPaso</span>}
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            >
              <i className={`fas ${item.icon}`}></i>
              {!sidebarCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            {!sidebarCollapsed && <span>Cerrar sesión</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="header-left">
            <button
              className="sidebar-toggle"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <i className="fas fa-bars"></i>
            </button>
            <h1>¡Hola {user?.nombre || 'Administrador'}!</h1>
          </div>
          <div className="header-right">
            <button className="header-btn">
              <i className="fas fa-bell"></i>
              <span className="badge">3</span>
            </button>
            <Link to="/" className="header-btn" title="Ver sitio">
              <i className="fas fa-home"></i>
            </Link>
          </div>
        </header>

        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

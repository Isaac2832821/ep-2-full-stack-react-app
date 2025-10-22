import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro que deseas cerrar sesión?')) {
      logout();
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="profile-page">
      {/* Breadcrumb */}
      <section className="breadcrumb-section bg-light py-3">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Mi Cuenta
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Profile Content */}
      <section className="profile-section py-4">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-12 col-lg-3 mb-4">
              <div className="profile-sidebar">
                <div className="profile-avatar">
                  <i className="fas fa-user-circle fa-5x text-primary"></i>
                </div>
                <h4 className="profile-name">{user.nombre}</h4>
                <p className="profile-email text-muted">{user.email}</p>
                
                <div className="profile-menu">
                  <Link to="/mi-cuenta" className="profile-menu-item active">
                    <i className="fas fa-user me-2"></i>
                    Mi Perfil
                  </Link>
                  <Link to="/mis-pedidos" className="profile-menu-item">
                    <i className="fas fa-shopping-bag me-2"></i>
                    Mis Pedidos
                  </Link>
                  <Link to="/mis-direcciones" className="profile-menu-item">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    Direcciones
                  </Link>
                  <button onClick={handleLogout} className="profile-menu-item text-danger">
                    <i className="fas fa-sign-out-alt me-2"></i>
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-12 col-lg-9">
              <div className="profile-content">
                <h2 className="content-title">Información Personal</h2>
                
                <div className="info-card">
                  <h5 className="info-card-title">Datos Personales</h5>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">Nombre Completo:</span>
                      <span className="info-value">{user.nombre}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">RUT:</span>
                      <span className="info-value">{user.rut || 'No especificado'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Email:</span>
                      <span className="info-value">{user.email}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Teléfono:</span>
                      <span className="info-value">{user.telefono || 'No especificado'}</span>
                    </div>
                  </div>
                </div>

                <div className="info-card mt-4">
                  <h5 className="info-card-title">Dirección</h5>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">Región:</span>
                      <span className="info-value">{user.region}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Comuna:</span>
                      <span className="info-value">{user.comuna}</span>
                    </div>
                    <div className="info-item full-width">
                      <span className="info-label">Dirección:</span>
                      <span className="info-value">{user.direccion}</span>
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="info-card mt-4">
                  <h5 className="info-card-title">Pedidos Recientes</h5>
                  <div className="orders-list">
                    <p className="text-muted text-center py-4">
                      No tienes pedidos recientes
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="profile-actions mt-4">
                  <button className="btn btn-outline-primary">
                    <i className="fas fa-edit me-2"></i>
                    Editar Perfil
                  </button>
                  <button className="btn btn-outline-secondary">
                    <i className="fas fa-key me-2"></i>
                    Cambiar Contraseña
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;

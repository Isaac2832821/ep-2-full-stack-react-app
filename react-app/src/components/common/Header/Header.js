import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();
  const { isAuthenticated, isAdmin } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <h1 className="mb-0">PasoxPaso</h1>
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
            aria-controls="navbarNav"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation */}
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/')}`} to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/productos')}`} to="/productos">
                  Productos
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/nosotros')}`} to="/nosotros">
                  Nosotros
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/blogs')}`} to="/blogs">
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/contacto')}`} to="/contacto">
                  Contacto
                </Link>
              </li>
            </ul>

            {/* User actions */}
            <div className="d-flex align-items-center gap-2">
              {/* Cart link */}
              <Link to="/carrito" className="btn btn-outline-primary position-relative">
                🛒 Carrito
                {itemCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {itemCount}
                    <span className="visually-hidden">items en carrito</span>
                  </span>
                )}
              </Link>

              {/* Auth links */}
              {isAuthenticated ? (
                <>
                  <Link to="/mi-cuenta" className="btn btn-outline-secondary">
                    👤 Mi Cuenta
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" className="btn btn-outline-dark">
                      Panel Admin
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline-secondary">
                    Iniciar Sesión
                  </Link>
                  <Link to="/registro" className="btn btn-primary">
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer bg-dark text-white">
      <div className="container py-5">
        <div className="row">
          {/* Company Info */}
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <h3 className="footer-title">PasoxPaso</h3>
            <p className="footer-description">
              Tu tienda de confianza para calzados de alta calidad.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <h3 className="footer-title">Enlaces Rápidos</h3>
            <ul className="footer-links list-unstyled">
              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/productos" className="footer-link">
                  Productos
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="footer-link">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="footer-link">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="footer-link">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-12 col-md-4">
            <h3 className="footer-title">Información de Contacto</h3>
            <div className="contact-info-footer">
              <div className="contact-item-footer mb-3">
                <span className="footer-emoji">📍</span>
                <div>
                  <strong>DIRECCIÓN</strong>
                  <p className="mb-0">Av. Providencia 1234, Santiago, Chile</p>
                </div>
              </div>
              
              <div className="contact-item-footer mb-3">
                <span className="footer-emoji">📞</span>
                <div>
                  <strong>TELÉFONO</strong>
                  <p className="mb-0">+56 2 2345 6789</p>
                  <p className="mb-0">+56 9 8765 4321</p>
                </div>
              </div>
              
              <div className="contact-item-footer mb-3">
                <span className="footer-emoji">✉️</span>
                <div>
                  <strong>EMAIL</strong>
                  <p className="mb-0">info@techmarket.cl</p>
                  <p className="mb-0">soporte@pasoxpaso.cl</p>
                </div>
              </div>
              
              <div className="contact-item-footer">
                <span className="footer-emoji">🕒</span>
                <div>
                  <strong>HORARIO DE ATENCIÓN</strong>
                  <p className="mb-0">Lunes a Viernes: 9:00 - 18:00</p>
                  <p className="mb-0">Sábado: 10:00 - 14:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom bg-darker py-3">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <p className="mb-0">
                &copy; {new Date().getFullYear()} PasoxPaso. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

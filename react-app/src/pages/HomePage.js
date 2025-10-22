import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import ProductGrid from '../components/product/ProductGrid/ProductGrid';
import './HomePage.css';

const HomePage = () => {
  const { products, loading } = useProducts();
  const { addItem } = useCart();

  // Show only first 3 products as featured
  const featuredProducts = products.slice(0, 3);

  const handleAddToCart = (product) => {
    addItem(product, 1);
    alert(`${product.nombre} añadido al carrito`);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-lg-6 mb-4 mb-lg-0">
              <div className="hero-content">
                <h1 className="hero-title">TIENDA ONLINE</h1>
                <p className="hero-text">
                  Bienvenido a PasoxPaso – Tu tienda de zapatillas para cada paso que das.
                  En PasoxPaso creemos que cada paso cuenta, por eso ofrecemos zapatillas que 
                  combinan estilo, comodidad y actitud. Ya sea que busques un par para la calle, 
                  el gimnasio o el día a día, aquí encontrarás lo que necesitas para avanzar con confianza.
                </p>
                <p className="hero-text">
                  Trabajamos con modelos exclusivos, clásicos y urbanos, seleccionados para personas 
                  que marcan tendencia y caminan con identidad.
                </p>
                <Link to="/productos" className="btn btn-primary btn-lg">
                  📥 Ver Productos
                </Link>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="hero-image">
                <img 
                  src="/imagenes/portada.jpeg" 
                  alt="Zapatillas en promoción" 
                  className="img-fluid rounded shadow"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products-section py-5">
        <div className="container">
          <div className="section-header text-center mb-4">
            <h2 className="section-title">Productos Destacados</h2>
            <p className="section-subtitle text-muted">
              Descubre nuestras zapatillas más populares
            </p>
          </div>

          <ProductGrid
            products={featuredProducts}
            loading={loading}
            onAddToCart={handleAddToCart}
          />

          <div className="text-center mt-4">
            <Link to="/productos" className="btn btn-outline-primary btn-lg">
              Ver Todos los Productos
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section bg-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 mb-4 mb-md-0">
              <h3>PasoxPaso</h3>
              <div className="social-links mt-3">
                <button className="btn btn-outline-primary me-2" onClick={() => alert('Próximamente')}>📘</button>
                <button className="btn btn-outline-info me-2" onClick={() => alert('Próximamente')}>🐦</button>
                <button className="btn btn-outline-danger" onClick={() => alert('Próximamente')}>📷</button>
              </div>
            </div>
            <div className="col-12 col-md-4 mb-4 mb-md-0">
              <h4>Categorías</h4>
              <div className="d-flex flex-column gap-2 mt-3">
                <Link to="/productos" className="text-decoration-none">Zapatillas</Link>
                <Link to="/productos" className="text-decoration-none">Ropa</Link>
                <Link to="/productos" className="text-decoration-none">Accesorios</Link>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <h4>Mantente Informado</h4>
              <p className="text-muted">Suscríbete a nuestro newsletter</p>
              <div className="input-group mt-3">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Tu email"
                />
                <button className="btn btn-primary">Suscribirse</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

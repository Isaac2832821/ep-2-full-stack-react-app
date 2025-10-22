import React from 'react';
import { Link } from 'react-router-dom';
import './BlogPage.css';

const BlogPage = () => {
  return (
    <div className="blog-page">
      {/* Breadcrumb */}
      <section className="breadcrumb-section bg-light py-3">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Blog
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Blog Content */}
      <section className="blog-section py-5">
        <div className="container">
          <div className="blog-header text-center mb-5">
            <h1>NOTICIAS IMPORTANTES</h1>
            <p className="text-muted">Descubre curiosidades y noticias del mundo del calzado</p>
          </div>

          <div className="row">
            {/* Blog Post 1 */}
            <div className="col-12 mb-4">
              <div className="blog-card">
                <div className="row g-0">
                  <div className="col-md-8">
                    <div className="blog-content">
                      <h2>El zapato más caro del mundo</h2>
                      <p>El par más caro jamás creado se llama "Passion Diamond Shoes", valuado en 17 millones de dólares. Están hechos con oro, cuero y diamantes reales. Fueron presentados en Dubái en 2018... ¡y solo existe un par!</p>
                      <button className="btn btn-primary">VER CASO</button>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="blog-image">
                      <img src="/imagenes/mascaro.jpeg" alt="Zapato más caro" className="img-fluid" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Post 2 */}
            <div className="col-12 mb-4">
              <div className="blog-card">
                <div className="row g-0">
                  <div className="col-md-8">
                    <div className="blog-content">
                      <h2>El origen del tacón no era femenino</h2>
                      <p>Aunque hoy se asocia con moda femenina, los tacones fueron usados originalmente por jinetes persas hombres en el siglo IX para mantener el pie firme en el estribo. Más tarde, los adoptaron nobles europeos como símbolo de estatus.</p>
                      <button className="btn btn-primary">VER CASO</button>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="blog-image">
                      <img src="/imagenes/jinetes.jpeg" alt="Historia del tacón" className="img-fluid" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="blog-cta text-center mt-5">
            <h3>¿Te gustaron estas historias?</h3>
            <p>Descubre nuestros productos y encuentra tu par perfecto</p>
            <Link to="/productos" className="btn btn-primary btn-lg">Ver Productos</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;

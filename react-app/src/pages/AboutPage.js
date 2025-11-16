import React from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Breadcrumb */}
      <section className="breadcrumb-section bg-light py-3">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Nosotros
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* About Content */}
      <section className="about-section py-5">
        <div className="container">
          <div className="about-header text-center mb-5">
            <h1>Nuestra Historia</h1>
            <p className="subtitle text-muted">Conoce más sobre PasoxPaso y nuestra pasión por el calzado</p>
          </div>

          <div className="row align-items-center mb-5">
            <div className="col-12 col-md-6 mb-4 mb-md-0">
              <img src="/imagenes/quien.jpeg" alt="Nuestra historia" className="img-fluid rounded shadow" />
            </div>
            <div className="col-12 col-md-6">
              <h2>Quiénes Somos</h2>
              <p>En PasoxPaso nos apasiona el calzado que combina estilo, comodidad y calidad. Ofrecemos zapatos únicos para acompañarte en cada paso de tu día a día. Trabajamos con dedicación para brindarte la mejor experiencia al caminar con nosotros.</p>
              <p>Nuestro equipo está formado por apasionados del calzado que se dedican a seleccionar los mejores productos y ofrecer un servicio excepcional a nuestros clientes.</p>
            </div>
          </div>

          <div className="mission-section mb-5">
            <h2>Nuestra Misión</h2>
            <p>Nuestra misión en PasoxPaso es ofrecer calzado de calidad que combine diseño, confort y durabilidad. Buscamos acompañar a cada persona en su camino, con productos que se adapten a su estilo de vida. Trabajamos con pasión para brindar una experiencia de compra cercana, confiable y única.</p>
          </div>

          <div className="values-section mb-5">
            <h2>Nuestros Valores</h2>
            <ul className="values-list">
              <li><i className="fas fa-check-circle text-success me-2"></i><strong>Calidad:</strong> Seleccionamos cuidadosamente cada producto que ofrecemos.</li>
              <li><i className="fas fa-check-circle text-success me-2"></i><strong>Innovación:</strong> Nos mantenemos a la vanguardia de las últimas tendencias.</li>
              <li><i className="fas fa-check-circle text-success me-2"></i><strong>Servicio al cliente:</strong> Tu satisfacción es nuestra prioridad número uno.</li>
              <li><i className="fas fa-check-circle text-success me-2"></i><strong>Integridad:</strong> Transparencia en cada transacción y relación comercial.</li>
              <li><i className="fas fa-check-circle text-success me-2"></i><strong>Sostenibilidad:</strong> Comprometidos con prácticas comerciales responsables con el medio ambiente.</li>
            </ul>
          </div>

          <div className="team-section">
            <h2 className="text-center mb-4">Nuestro Equipo</h2>
            <div className="row">
              <div className="col-12 col-md-4 mb-4">
                <div className="team-card text-center">
                  <div className="team-avatar mb-3">
                    <i className="fas fa-user-circle fa-5x text-primary"></i>
                  </div>
                  <h3>Juan Pérez</h3>
                  <p className="team-role text-muted">CEO & Fundador</p>
                  <p>Con más de 15 años de experiencia en el sector, lidera nuestra visión estratégica.</p>
                </div>
              </div>
              <div className="col-12 col-md-4 mb-4">
                <div className="team-card text-center">
                  <div className="team-avatar mb-3">
                    <i className="fas fa-user-circle fa-5x text-primary"></i>
                  </div>
                  <h3>María González</h3>
                  <p className="team-role text-muted">Directora de Operaciones</p>
                  <p>María asegura que cada pedido se procese con eficiencia y llegue a tiempo.</p>
                </div>
              </div>
              <div className="col-12 col-md-4 mb-4">
                <div className="team-card text-center">
                  <div className="team-avatar mb-3">
                    <i className="fas fa-user-circle fa-5x text-primary"></i>
                  </div>
                  <h3>Carlos Rodríguez</h3>
                  <p className="team-role text-muted">Jefe de Tecnología</p>
                  <p>Carlos evalúa y selecciona los productos más innovadores para nuestra tienda.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="cta-section text-center mt-5">
            <h2>¿Listo para conocer nuestros productos?</h2>
            <p>Descubre nuestra amplia selección de calzado de alta calidad.</p>
            <Link to="/productos" className="btn btn-primary btn-lg">Ver Productos</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

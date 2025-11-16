import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { validateEmail, validateRequired } from '../utils/validators';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

    if (!validateRequired(formData.asunto)) {
      newErrors.asunto = 'El asunto es requerido';
    }

    if (!validateRequired(formData.mensaje)) {
      newErrors.mensaje = 'El mensaje es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Simulate form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="contact-page">
      {/* Breadcrumb */}
      <section className="breadcrumb-section bg-light py-3">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Contacto
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-section py-5">
        <div className="container">
          <div className="contact-header text-center mb-5">
            <h1>Contáctanos</h1>
            <p className="subtitle text-muted">Estamos aquí para ayudarte con cualquier consulta</p>
          </div>

          <div className="row">
            {/* Contact Form */}
            <div className="col-12 col-lg-7 mb-4">
              <div className="contact-form-card">
                <h2 className="mb-4">Envíanos un mensaje</h2>

                {submitted && (
                  <div className="alert alert-success" role="alert">
                    <i className="fas fa-check-circle me-2"></i>
                    ¡Mensaje enviado exitosamente! Te responderemos pronto.
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="nombre" className="form-label">
                        Nombre <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                      />
                      {errors.nombre && (
                        <div className="invalid-feedback">{errors.nombre}</div>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="asunto" className="form-label">
                      Asunto <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.asunto ? 'is-invalid' : ''}`}
                      id="asunto"
                      name="asunto"
                      value={formData.asunto}
                      onChange={handleChange}
                    />
                    {errors.asunto && (
                      <div className="invalid-feedback">{errors.asunto}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="mensaje" className="form-label">
                      Mensaje <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className={`form-control ${errors.mensaje ? 'is-invalid' : ''}`}
                      id="mensaje"
                      name="mensaje"
                      rows="5"
                      value={formData.mensaje}
                      onChange={handleChange}
                    ></textarea>
                    {errors.mensaje && (
                      <div className="invalid-feedback">{errors.mensaje}</div>
                    )}
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg w-100">
                    <i className="fas fa-paper-plane me-2"></i>
                    Enviar Mensaje
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-12 col-lg-5">
              <div className="contact-info-card">
                <h3 className="mb-4">Información de Contacto</h3>

                <div className="contact-item mb-4">
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h5>Dirección</h5>
                    <p>Av. Providencia 1234, Santiago, Chile</p>
                  </div>
                </div>

                <div className="contact-item mb-4">
                  <div className="contact-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <h5>Teléfono</h5>
                    <p>+56 2 2345 6789</p>
                    <p>+56 9 8765 4321</p>
                  </div>
                </div>

                <div className="contact-item mb-4">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h5>Email</h5>
                    <p>info@techmarket.cl</p>
                    <p>soporte@techmarket.cl</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div>
                    <h5>Horario de Atención</h5>
                    <p>Lunes a Viernes: 9:00 - 18:00</p>
                    <p>Sábado: 10:00 - 14:00</p>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="map-card mt-4">
                <h5 className="mb-3">
                  <i className="fas fa-map-marker-alt me-2"></i>
                  Encuéntranos
                </h5>
                <div className="map-container">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.2089489856847!2d-70.61116492346795!3d-33.42494097340089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf5c8eb5f0e5%3A0x8d5f8f8f8f8f8f8f!2sAv.%20Providencia%2C%20Providencia%2C%20Regi%C3%B3n%20Metropolitana%2C%20Chile!5e0!3m2!1ses!2scl!4v1234567890123!5m2!1ses!2scl"
                    width="100%"
                    height="400"
                    style={{ border: 0, borderRadius: '12px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de PasoxPaso"
                  ></iframe>
                </div>
                <div className="mt-3 text-center">
                  <a
                    href="https://www.google.com/maps/search/Av.+Providencia+1234,+Santiago,+Chile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary btn-sm"
                  >
                    <i className="fas fa-directions me-2"></i>
                    Cómo llegar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

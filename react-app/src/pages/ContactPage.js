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

              {/* Map Placeholder */}
              <div className="map-card mt-4">
                <div className="map-placeholder">
                  <i className="fas fa-map fa-3x text-muted"></i>
                  <p className="mt-3 text-muted">Mapa de ubicación</p>
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

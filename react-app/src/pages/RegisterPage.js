import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm/RegisterForm';
import './RegisterPage.css';

const RegisterPage = () => {
  return (
    <div className="register-page">
      {/* Breadcrumb */}
      <section className="breadcrumb-section bg-light py-3">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Registro
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Register Form */}
      <section className="register-section">
        <div className="container">
          <RegisterForm />
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;

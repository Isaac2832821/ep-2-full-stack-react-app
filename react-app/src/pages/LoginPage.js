import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm/LoginForm';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-page">
      {/* Breadcrumb */}
      <section className="breadcrumb-section bg-light py-3">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Iniciar Sesión
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Login Form */}
      <section className="login-section">
        <div className="container">
          <LoginForm />
        </div>
      </section>
    </div>
  );
};

export default LoginPage;

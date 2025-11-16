import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Header />
      
      <main className="app-main">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;

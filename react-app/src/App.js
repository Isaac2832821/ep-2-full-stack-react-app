import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import Layout from './components/common/Layout/Layout';
import './App.css';

// Pages - will be implemented in subsequent tasks
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ConfirmationPage from './pages/ConfirmationPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import AdminInventoryPage from './pages/AdminInventoryPage';
import AdminReportsPage from './pages/AdminReportsPage';
import AdminEmployeesPage from './pages/AdminEmployeesPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminNewUserPage from './pages/AdminNewUserPage';
import MyOrdersPage from './pages/MyOrdersPage';
import ProtectedRoute from './components/auth/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <Layout>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/productos" element={<ProductsPage />} />
                <Route path="/producto/:id" element={<ProductDetailPage />} />
                <Route path="/carrito" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/confirmacion" element={<ConfirmationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registro" element={<RegisterPage />} />
                <Route path="/mi-cuenta" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="/mis-pedidos" element={
                  <ProtectedRoute>
                    <MyOrdersPage />
                  </ProtectedRoute>
                } />
                <Route path="/nosotros" element={<AboutPage />} />
                <Route path="/blogs" element={<BlogPage />} />
                <Route path="/contacto" element={<ContactPage />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminDashboardPage />
                  </ProtectedRoute>
                } />
                <Route path="/admin/orders" element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminOrdersPage />
                  </ProtectedRoute>
                } />
                <Route path="/admin/inventory" element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminInventoryPage />
                  </ProtectedRoute>
                } />
                <Route path="/admin/reports" element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminReportsPage />
                  </ProtectedRoute>
                } />
                <Route path="/admin/employees" element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminEmployeesPage />
                  </ProtectedRoute>
                } />
                <Route path="/admin/users" element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminUsersPage />
                  </ProtectedRoute>
                } />
                <Route path="/admin/new-user" element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminNewUserPage />
                  </ProtectedRoute>
                } />
              </Routes>
            </Layout>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

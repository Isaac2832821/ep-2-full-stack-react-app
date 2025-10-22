import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/admin/AdminLayout/AdminLayout';
import { formatPrice, formatDate } from '../utils/formatters';
import './AdminDashboardPage.css';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    newOrders: 0,
    activeCustomers: 0,
    productsInStock: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    // Simulate loading dashboard data
    // In a real app, this would fetch from an API
    setStats({
      totalSales: 2450000,
      newOrders: 12,
      activeCustomers: 156,
      productsInStock: 48
    });

    setRecentOrders([
      {
        id: 'ORD-001',
        customer: 'Juan Pérez',
        date: '2024-01-20',
        status: 'pending',
        total: 89990
      },
      {
        id: 'ORD-002',
        customer: 'María González',
        date: '2024-01-20',
        status: 'processing',
        total: 129990
      },
      {
        id: 'ORD-003',
        customer: 'Carlos Rodríguez',
        date: '2024-01-19',
        status: 'shipped',
        total: 79990
      },
      {
        id: 'ORD-004',
        customer: 'Ana Martínez',
        date: '2024-01-19',
        status: 'completed',
        total: 159990
      },
      {
        id: 'ORD-005',
        customer: 'Pedro Silva',
        date: '2024-01-18',
        status: 'cancelled',
        total: 99990
      }
    ]);
  }, []);

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: 'Pendiente', class: 'warning' },
      processing: { label: 'Procesando', class: 'info' },
      shipped: { label: 'Enviado', class: 'primary' },
      completed: { label: 'Completado', class: 'success' },
      cancelled: { label: 'Cancelado', class: 'danger' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    return <span className={`badge bg-${config.class}`}>{config.label}</span>;
  };

  return (
    <AdminLayout>
      <div className="dashboard-page">
        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-12 col-sm-6 col-xl-3 mb-3">
            <div className="stat-card stat-card-primary">
              <div className="stat-icon">
                <i className="fas fa-dollar-sign"></i>
              </div>
              <div className="stat-content">
                <h3 className="stat-title">Ventas Totales</h3>
                <p className="stat-value">{formatPrice(stats.totalSales)}</p>
                <small className="stat-change text-success">
                  <i className="fas fa-arrow-up"></i> +12.5% vs mes anterior
                </small>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-xl-3 mb-3">
            <div className="stat-card stat-card-success">
              <div className="stat-icon">
                <i className="fas fa-shopping-bag"></i>
              </div>
              <div className="stat-content">
                <h3 className="stat-title">Pedidos Nuevos</h3>
                <p className="stat-value">{stats.newOrders}</p>
                <small className="stat-change text-success">
                  <i className="fas fa-arrow-up"></i> +8.2% vs semana anterior
                </small>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-xl-3 mb-3">
            <div className="stat-card stat-card-info">
              <div className="stat-icon">
                <i className="fas fa-user-check"></i>
              </div>
              <div className="stat-content">
                <h3 className="stat-title">Clientes Activos</h3>
                <p className="stat-value">{stats.activeCustomers}</p>
                <small className="stat-change text-success">
                  <i className="fas fa-arrow-up"></i> +15 nuevos este mes
                </small>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-xl-3 mb-3">
            <div className="stat-card stat-card-warning">
              <div className="stat-icon">
                <i className="fas fa-box"></i>
              </div>
              <div className="stat-content">
                <h3 className="stat-title">Productos en Stock</h3>
                <p className="stat-value">{stats.productsInStock}</p>
                <small className="stat-change text-warning">
                  <i className="fas fa-exclamation-triangle"></i> 5 con stock bajo
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h2 className="card-title mb-0">
                  <i className="fas fa-shopping-cart me-2"></i>
                  Pedidos Recientes
                </h2>
                <button className="btn btn-primary btn-sm">
                  Ver todos
                </button>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>ID Pedido</th>
                        <th>Cliente</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Total</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center py-4 text-muted">
                            No hay pedidos recientes
                          </td>
                        </tr>
                      ) : (
                        recentOrders.map((order) => (
                          <tr key={order.id}>
                            <td className="fw-semibold">{order.id}</td>
                            <td>{order.customer}</td>
                            <td>{formatDate(order.date)}</td>
                            <td>{getStatusBadge(order.status)}</td>
                            <td className="fw-semibold">{formatPrice(order.total)}</td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary me-1">
                                <i className="fas fa-eye"></i>
                              </button>
                              <button className="btn btn-sm btn-outline-secondary">
                                <i className="fas fa-edit"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title mb-0">
                  <i className="fas fa-bolt me-2"></i>
                  Acciones Rápidas
                </h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-6 col-md-3 mb-3">
                    <button className="quick-action-btn">
                      <i className="fas fa-plus-circle"></i>
                      <span>Nuevo Producto</span>
                    </button>
                  </div>
                  <div className="col-6 col-md-3 mb-3">
                    <button className="quick-action-btn">
                      <i className="fas fa-user-plus"></i>
                      <span>Nuevo Cliente</span>
                    </button>
                  </div>
                  <div className="col-6 col-md-3 mb-3">
                    <button className="quick-action-btn">
                      <i className="fas fa-file-invoice"></i>
                      <span>Ver Reportes</span>
                    </button>
                  </div>
                  <div className="col-6 col-md-3 mb-3">
                    <button className="quick-action-btn">
                      <i className="fas fa-cog"></i>
                      <span>Configuración</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;

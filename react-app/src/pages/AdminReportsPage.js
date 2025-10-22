import React, { useState } from 'react';
import AdminLayout from '../components/admin/AdminLayout/AdminLayout';
import { formatPrice } from '../utils/formatters';
import './AdminReportsPage.css';

const AdminReportsPage = () => {
  const [reportType, setReportType] = useState('sales');
  const [dateRange, setDateRange] = useState('month');

  // Mock data for reports
  const salesData = {
    total: 2450000,
    orders: 45,
    avgOrder: 54444,
    growth: 12.5
  };

  const topProducts = [
    { id: 1, name: 'Zapatillas Nike Air Max', sales: 25, revenue: 2249750 },
    { id: 2, name: 'Zapatillas Adidas Ultraboost', sales: 18, revenue: 2339820 },
    { id: 3, name: 'Zapatillas Puma RS-X', sales: 15, revenue: 1199850 },
    { id: 4, name: 'Zapatillas New Balance 574', sales: 12, revenue: 1079880 },
    { id: 5, name: 'Zapatillas Reebok Classic', sales: 10, revenue: 699900 }
  ];

  const topCustomers = [
    { id: 1, name: 'Juan Pérez', orders: 8, total: 719920 },
    { id: 2, name: 'María González', orders: 6, total: 539940 },
    { id: 3, name: 'Carlos Rodríguez', orders: 5, total: 449950 },
    { id: 4, name: 'Ana Martínez', orders: 4, total: 359960 },
    { id: 5, name: 'Pedro Silva', orders: 3, total: 269970 }
  ];

  const handleExportExcel = (type) => {
    // In a real app, this would generate and download an Excel file
    alert(`Exportando reporte de ${type} a Excel...`);
  };

  const handleExportPDF = (type) => {
    // In a real app, this would generate and download a PDF file
    alert(`Exportando reporte de ${type} a PDF...`);
  };

  return (
    <AdminLayout>
      <div className="reports-page">
        {/* Page Header */}
        <div className="page-header">
          <h2>
            <i className="fas fa-chart-bar me-2"></i>
            Informes y Reportes
          </h2>
          <div className="header-actions">
            <button className="btn btn-success me-2" onClick={() => handleExportExcel(reportType)}>
              <i className="fas fa-file-excel me-2"></i>
              Exportar Excel
            </button>
            <button className="btn btn-danger" onClick={() => handleExportPDF(reportType)}>
              <i className="fas fa-file-pdf me-2"></i>
              Exportar PDF
            </button>
          </div>
        </div>

        {/* Report Type Selector */}
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 mb-3 mb-md-0">
                <label className="form-label">Tipo de Reporte</label>
                <select
                  className="form-select"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <option value="sales">Ventas</option>
                  <option value="products">Productos</option>
                  <option value="customers">Clientes</option>
                  <option value="inventory">Inventario</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Período</label>
                <select
                  className="form-select"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="today">Hoy</option>
                  <option value="week">Esta Semana</option>
                  <option value="month">Este Mes</option>
                  <option value="year">Este Año</option>
                  <option value="custom">Personalizado</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Sales Summary */}
        <div className="row mb-4">
          <div className="col-12 col-sm-6 col-xl-3 mb-3">
            <div className="report-card report-card-primary">
              <div className="report-icon">
                <i className="fas fa-dollar-sign"></i>
              </div>
              <div className="report-content">
                <div className="report-label">Ventas Totales</div>
                <div className="report-value">{formatPrice(salesData.total)}</div>
                <div className="report-change text-success">
                  <i className="fas fa-arrow-up"></i> +{salesData.growth}%
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xl-3 mb-3">
            <div className="report-card report-card-success">
              <div className="report-icon">
                <i className="fas fa-shopping-bag"></i>
              </div>
              <div className="report-content">
                <div className="report-label">Total Pedidos</div>
                <div className="report-value">{salesData.orders}</div>
                <div className="report-change text-success">
                  <i className="fas fa-arrow-up"></i> +8.2%
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xl-3 mb-3">
            <div className="report-card report-card-info">
              <div className="report-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="report-content">
                <div className="report-label">Ticket Promedio</div>
                <div className="report-value">{formatPrice(salesData.avgOrder)}</div>
                <div className="report-change text-success">
                  <i className="fas fa-arrow-up"></i> +5.3%
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xl-3 mb-3">
            <div className="report-card report-card-warning">
              <div className="report-icon">
                <i className="fas fa-percentage"></i>
              </div>
              <div className="report-content">
                <div className="report-label">Tasa de Conversión</div>
                <div className="report-value">3.2%</div>
                <div className="report-change text-danger">
                  <i className="fas fa-arrow-down"></i> -1.1%
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Top Products */}
          <div className="col-12 col-lg-6 mb-4">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="card-title mb-0">
                  <i className="fas fa-trophy me-2 text-warning"></i>
                  Productos Más Vendidos
                </h3>
                <button
                  className="btn btn-sm btn-outline-success"
                  onClick={() => handleExportExcel('products')}
                >
                  <i className="fas fa-file-excel"></i>
                </button>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Producto</th>
                        <th>Ventas</th>
                        <th>Ingresos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topProducts.map((product, index) => (
                        <tr key={product.id}>
                          <td className="fw-semibold">{index + 1}</td>
                          <td>{product.name}</td>
                          <td>{product.sales}</td>
                          <td className="fw-semibold">{formatPrice(product.revenue)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Top Customers */}
          <div className="col-12 col-lg-6 mb-4">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="card-title mb-0">
                  <i className="fas fa-star me-2 text-warning"></i>
                  Mejores Clientes
                </h3>
                <button
                  className="btn btn-sm btn-outline-success"
                  onClick={() => handleExportExcel('customers')}
                >
                  <i className="fas fa-file-excel"></i>
                </button>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Cliente</th>
                        <th>Pedidos</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topCustomers.map((customer, index) => (
                        <tr key={customer.id}>
                          <td className="fw-semibold">{index + 1}</td>
                          <td>{customer.name}</td>
                          <td>{customer.orders}</td>
                          <td className="fw-semibold">{formatPrice(customer.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sales Chart Placeholder */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title mb-0">
              <i className="fas fa-chart-area me-2"></i>
              Tendencia de Ventas
            </h3>
          </div>
          <div className="card-body">
            <div className="chart-placeholder">
              <i className="fas fa-chart-line fa-3x text-muted mb-3"></i>
              <p className="text-muted">
                Gráfico de ventas - Integración con librería de gráficos pendiente
              </p>
              <small className="text-muted">
                (Chart.js, Recharts, o similar)
              </small>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminReportsPage;

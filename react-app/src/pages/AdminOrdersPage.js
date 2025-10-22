import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/admin/AdminLayout/AdminLayout';
import { formatPrice, formatDate } from '../utils/formatters';
import './AdminOrdersPage.css';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Load orders from localStorage (check both 'orders' and 'ventas')
    const savedOrders = localStorage.getItem('orders');
    const savedVentas = localStorage.getItem('ventas');
    
    if (savedOrders || savedVentas) {
      const ordersData = savedOrders ? JSON.parse(savedOrders) : [];
      const ventasData = savedVentas ? JSON.parse(savedVentas) : [];
      const allOrders = [...ordersData, ...ventasData];
      setOrders(allOrders);
      setFilteredOrders(allOrders);
    } else {
      // Mock data
      const mockOrders = [
        {
          id: 'ORD-001',
          customer: 'Juan Pérez',
          email: 'juan@example.com',
          phone: '+56 9 1234 5678',
          date: '2024-01-20',
          status: 'pending',
          total: 89990,
          items: [
            { name: 'Zapatillas Nike Air Max', quantity: 1, price: 89990 }
          ],
          shippingAddress: 'Av. Providencia 1234, Santiago'
        },
        {
          id: 'ORD-002',
          customer: 'María González',
          email: 'maria@example.com',
          phone: '+56 9 8765 4321',
          date: '2024-01-20',
          status: 'processing',
          total: 129990,
          items: [
            { name: 'Zapatillas Adidas Ultraboost', quantity: 1, price: 129990 }
          ],
          shippingAddress: 'Calle Los Leones 456, Providencia'
        },
        {
          id: 'ORD-003',
          customer: 'Carlos Rodríguez',
          email: 'carlos@example.com',
          phone: '+56 9 5555 6666',
          date: '2024-01-19',
          status: 'shipped',
          total: 79990,
          items: [
            { name: 'Zapatillas Puma RS-X', quantity: 1, price: 79990 }
          ],
          shippingAddress: 'Av. Apoquindo 789, Las Condes'
        }
      ];
      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
      localStorage.setItem('orders', JSON.stringify(mockOrders));
    }
  }, []);

  useEffect(() => {
    let filtered = orders;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => (order.status || order.estado) === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(order => {
        const customerName = typeof order.customer === 'object' ? order.customer.nombre : order.customer;
        return order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
               customerName.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    setFilteredOrders(filtered);
  }, [statusFilter, searchTerm, orders]);

  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus, estado: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleSimulateOrder = () => {
    const newOrder = {
      id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      customer: 'Cliente Simulado',
      email: 'simulado@example.com',
      phone: '+56 9 0000 0000',
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      total: 99990,
      items: [
        { name: 'Producto Simulado', quantity: 1, price: 99990 }
      ],
      shippingAddress: 'Dirección de prueba'
    };
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

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

  const getStatusCount = (status) => {
    return orders.filter(order => (order.status || order.estado) === status).length;
  };

  return (
    <AdminLayout>
      <div className="orders-page">
        {/* Page Header */}
        <div className="page-header">
          <h2>
            <i className="fas fa-shopping-cart me-2"></i>
            Gestión de Pedidos
          </h2>
          <div className="header-actions">
            <button className="btn btn-success me-2" onClick={handleSimulateOrder}>
              <i className="fas fa-plus me-2"></i>
              Simular Pedido
            </button>
            <button className="btn btn-primary">
              <i className="fas fa-plus me-2"></i>
              Nuevo Pedido
            </button>
          </div>
        </div>

        {/* Status Filter Cards */}
        <div className="row mb-4">
          <div className="col-6 col-md-4 col-lg-2 mb-3">
            <div
              className={`status-filter-card ${statusFilter === 'all' ? 'active' : ''}`}
              onClick={() => setStatusFilter('all')}
            >
              <div className="status-count">{orders.length}</div>
              <div className="status-label">Todos</div>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-2 mb-3">
            <div
              className={`status-filter-card status-pending ${statusFilter === 'pending' ? 'active' : ''}`}
              onClick={() => setStatusFilter('pending')}
            >
              <div className="status-count">{getStatusCount('pending')}</div>
              <div className="status-label">Pendientes</div>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-2 mb-3">
            <div
              className={`status-filter-card status-processing ${statusFilter === 'processing' ? 'active' : ''}`}
              onClick={() => setStatusFilter('processing')}
            >
              <div className="status-count">{getStatusCount('processing')}</div>
              <div className="status-label">Procesando</div>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-2 mb-3">
            <div
              className={`status-filter-card status-shipped ${statusFilter === 'shipped' ? 'active' : ''}`}
              onClick={() => setStatusFilter('shipped')}
            >
              <div className="status-count">{getStatusCount('shipped')}</div>
              <div className="status-label">Enviados</div>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-2 mb-3">
            <div
              className={`status-filter-card status-completed ${statusFilter === 'completed' ? 'active' : ''}`}
              onClick={() => setStatusFilter('completed')}
            >
              <div className="status-count">{getStatusCount('completed')}</div>
              <div className="status-label">Completados</div>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-2 mb-3">
            <div
              className={`status-filter-card status-cancelled ${statusFilter === 'cancelled' ? 'active' : ''}`}
              onClick={() => setStatusFilter('cancelled')}
            >
              <div className="status-count">{getStatusCount('cancelled')}</div>
              <div className="status-label">Cancelados</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por ID o cliente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="card">
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
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-muted">
                        No se encontraron pedidos
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="fw-semibold">{order.id}</td>
                        <td>{typeof order.customer === 'object' ? order.customer.nombre : order.customer}</td>
                        <td>{formatDate(order.date || order.fecha)}</td>
                        <td>
                          <select
                            className="form-select form-select-sm"
                            value={order.status || order.estado}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          >
                            <option value="pending">Pendiente</option>
                            <option value="processing">Procesando</option>
                            <option value="shipped">Enviado</option>
                            <option value="completed">Completado</option>
                            <option value="cancelled">Cancelado</option>
                          </select>
                        </td>
                        <td className="fw-semibold">{formatPrice(order.total)}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary me-1"
                            onClick={() => handleViewOrder(order)}
                          >
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

        {/* Order Detail Modal */}
        {showModal && selectedOrder && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Detalle del Pedido {selectedOrder.id}</h3>
                <button className="btn-close" onClick={() => setShowModal(false)}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <h5>Información del Cliente</h5>
                    <p><strong>Nombre:</strong> {typeof selectedOrder.customer === 'object' ? selectedOrder.customer.nombre : selectedOrder.customer}</p>
                    <p><strong>Email:</strong> {typeof selectedOrder.customer === 'object' ? selectedOrder.customer.email : selectedOrder.email}</p>
                    <p><strong>Teléfono:</strong> {typeof selectedOrder.customer === 'object' ? selectedOrder.customer.telefono : selectedOrder.phone}</p>
                  </div>
                  <div className="col-md-6">
                    <h5>Información del Pedido</h5>
                    <p><strong>Fecha:</strong> {formatDate(selectedOrder.date || selectedOrder.fecha)}</p>
                    <p><strong>Estado:</strong> {getStatusBadge(selectedOrder.status || selectedOrder.estado)}</p>
                    <p><strong>Dirección:</strong> {selectedOrder.shippingAddress || (selectedOrder.shipping ? `${selectedOrder.shipping.direccion}, ${selectedOrder.shipping.comuna}, ${selectedOrder.shipping.region}` : 'N/A')}</p>
                  </div>
                </div>
                <h5>Productos</h5>
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{formatPrice(item.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="2" className="text-end"><strong>Total:</strong></td>
                      <td><strong>{formatPrice(selectedOrder.total)}</strong></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminOrdersPage;

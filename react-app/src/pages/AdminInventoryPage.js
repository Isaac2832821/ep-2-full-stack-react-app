import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/admin/AdminLayout/AdminLayout';
import { useProducts } from '../context/ProductContext';
import { formatPrice } from '../utils/formatters';
import './AdminInventoryPage.css';

const AdminInventoryPage = () => {
  const { products, updateProduct, addProduct, deleteProduct } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    precio: '',
    stock: '',
    descripcion: '',
    imagen: ''
  });

  useEffect(() => {
    let filtered = products;

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(p => p.categoria === categoryFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toString().includes(searchTerm)
      );
    }

    setFilteredProducts(filtered);
  }, [products, categoryFilter, searchTerm]);

  const categories = [...new Set(products.map(p => p.categoria))];

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      nombre: product.nombre,
      categoria: product.categoria,
      precio: product.precio,
      stock: product.stock,
      descripcion: product.descripcion,
      imagen: product.imagen
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({
      nombre: '',
      categoria: '',
      precio: '',
      stock: '',
      descripcion: '',
      imagen: '/imagenes/p1.jpeg'
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const productData = {
      ...formData,
      precio: parseFloat(formData.precio),
      stock: parseInt(formData.stock)
    };

    if (editingProduct) {
      // Update existing product
      updateProduct({ ...productData, id: editingProduct.id });
      alert('✅ Producto actualizado correctamente');
    } else {
      // Add new product
      addProduct(productData);
      alert('✅ Producto creado correctamente');
    }
    
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleDelete = (productId) => {
    if (window.confirm('¿Estás seguro de eliminar este producto? Esta acción no se puede deshacer.')) {
      deleteProduct(productId);
      alert('✅ Producto eliminado correctamente');
    }
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { label: 'Sin stock', class: 'danger' };
    if (stock < 10) return { label: 'Stock bajo', class: 'warning' };
    return { label: 'En stock', class: 'success' };
  };

  return (
    <AdminLayout>
      <div className="inventory-page">
        {/* Page Header */}
        <div className="page-header">
          <h2>
            <i className="fas fa-boxes me-2"></i>
            Gestión de Inventario
          </h2>
          <button className="btn btn-primary" onClick={handleAdd}>
            <i className="fas fa-plus me-2"></i>
            Nuevo Producto
          </button>
        </div>

        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-6 col-md-3 mb-3">
            <div className="stat-card">
              <div className="stat-icon bg-primary">
                <i className="fas fa-box"></i>
              </div>
              <div className="stat-content">
                <div className="stat-label">Total Productos</div>
                <div className="stat-value">{products.length}</div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3 mb-3">
            <div className="stat-card">
              <div className="stat-icon bg-success">
                <i className="fas fa-check-circle"></i>
              </div>
              <div className="stat-content">
                <div className="stat-label">En Stock</div>
                <div className="stat-value">
                  {products.filter(p => p.stock > 10).length}
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3 mb-3">
            <div className="stat-card">
              <div className="stat-icon bg-warning">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <div className="stat-content">
                <div className="stat-label">Stock Bajo</div>
                <div className="stat-value">
                  {products.filter(p => p.stock > 0 && p.stock <= 10).length}
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3 mb-3">
            <div className="stat-card">
              <div className="stat-icon bg-danger">
                <i className="fas fa-times-circle"></i>
              </div>
              <div className="stat-content">
                <div className="stat-label">Sin Stock</div>
                <div className="stat-value">
                  {products.filter(p => p.stock === 0).length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 mb-3 mb-md-0">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por nombre o ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <select
                  className="form-select"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">Todas las categorías</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="card">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-4 text-muted">
                        No se encontraron productos
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => {
                      const stockStatus = getStockStatus(product.stock);
                      return (
                        <tr key={product.id}>
                          <td className="fw-semibold">{product.id}</td>
                          <td>
                            <img
                              src={product.imagen}
                              alt={product.nombre}
                              className="product-thumbnail"
                            />
                          </td>
                          <td>{product.nombre}</td>
                          <td>
                            <span className="badge bg-secondary">
                              {product.categoria}
                            </span>
                          </td>
                          <td className="fw-semibold">{formatPrice(product.precio)}</td>
                          <td>{product.stock}</td>
                          <td>
                            <span className={`badge bg-${stockStatus.class}`}>
                              {stockStatus.label}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-primary me-1"
                              onClick={() => handleEdit(product)}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(product.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Product Form Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h3>
                <button className="btn-close" onClick={() => setShowModal(false)}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Nombre del Producto</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Categoría</label>
                    <select
                      className="form-select"
                      value={formData.categoria}
                      onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                      required
                    >
                      <option value="">Seleccionar categoría</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Precio</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.precio}
                        onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Stock</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={formData.descripcion}
                      onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">URL de Imagen</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.imagen}
                      onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                    />
                  </div>
                  <div className="d-flex gap-2 justify-content-end">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editingProduct ? 'Actualizar' : 'Crear'} Producto
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminInventoryPage;

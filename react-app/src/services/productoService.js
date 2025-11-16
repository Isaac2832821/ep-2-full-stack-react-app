import api from './api';

const productoService = {
  // Obtener todos los productos con filtros opcionales
  getAll: async (filtros = {}) => {
    try {
      const params = new URLSearchParams();
      
      if (filtros.categoria) params.append('categoria', filtros.categoria);
      if (filtros.precioMin) params.append('precioMin', filtros.precioMin);
      if (filtros.precioMax) params.append('precioMax', filtros.precioMax);
      if (filtros.busqueda) params.append('busqueda', filtros.busqueda);
      
      const response = await api.get(`/productos?${params.toString()}`);
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error al obtener productos';
    }
  },

  // Obtener producto por ID
  getById: async (id) => {
    try {
      const response = await api.get(`/productos/${id}`);
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error al obtener producto';
    }
  },

  // Obtener productos destacados
  getDestacados: async () => {
    try {
      const response = await api.get('/productos/destacados');
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error al obtener productos destacados';
    }
  },

  // Crear producto (Admin)
  create: async (producto) => {
    try {
      const response = await api.post('/productos', producto);
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error al crear producto';
    }
  },

  // Actualizar producto (Admin)
  update: async (id, producto) => {
    try {
      const response = await api.put(`/productos/${id}`, producto);
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error al actualizar producto';
    }
  },

  // Eliminar producto (Admin)
  delete: async (id) => {
    try {
      const response = await api.delete(`/productos/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error al eliminar producto';
    }
  }
};

export default productoService;

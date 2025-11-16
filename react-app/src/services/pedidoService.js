import api from './api';

const pedidoService = {
  // Obtener pedidos del usuario autenticado
  getMisPedidos: async () => {
    try {
      const response = await api.get('/pedidos');
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error al obtener pedidos';
    }
  },

  // Obtener detalle de un pedido
  getById: async (id) => {
    try {
      const response = await api.get(`/pedidos/${id}`);
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error al obtener pedido';
    }
  },

  // Crear nuevo pedido
  create: async (pedidoData) => {
    try {
      const response = await api.post('/pedidos', pedidoData);
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error al crear pedido';
    }
  },

  // Obtener todos los pedidos (Admin)
  getAllAdmin: async () => {
    try {
      const response = await api.get('/pedidos/admin/todos');
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error al obtener pedidos';
    }
  },

  // Actualizar estado de pedido (Admin)
  updateEstado: async (id, estado) => {
    try {
      const response = await api.put(`/pedidos/${id}/estado?estado=${estado}`);
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error al actualizar estado';
    }
  }
};

export default pedidoService;

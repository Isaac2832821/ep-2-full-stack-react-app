// URL base de la API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Función helper para hacer requests con fetch
const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, config);

    // Si es 401, limpiar sesión y redirigir
    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      throw new Error('No autorizado');
    }

    // Si no es exitoso, lanzar error
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

// API object con métodos similares a axios
const api = {
  get: (url, config = {}) => fetchWithAuth(url, { ...config, method: 'GET' }),
  
  post: (url, data, config = {}) => fetchWithAuth(url, {
    ...config,
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  put: (url, data, config = {}) => fetchWithAuth(url, {
    ...config,
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  delete: (url, config = {}) => fetchWithAuth(url, { ...config, method: 'DELETE' }),
};

export default api;

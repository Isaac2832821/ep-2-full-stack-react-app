import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Initialize default admin user and load current user
  useEffect(() => {
    // Create default admin user if it doesn't exist
    const users = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const adminExists = users.some(u => u.email === 'admin@pasoxpaso.cl');
    
    if (!adminExists) {
      const defaultAdmin = {
        id: 1,
        nombre: 'Administrador',
        email: 'admin@pasoxpaso.cl',
        password: 'admin123',
        telefono: '+56 9 1234 5678',
        rut: '12.345.678-9',
        direccion: 'Av. Providencia 1234',
        region: 'Región Metropolitana',
        comuna: 'Santiago',
        rol: 'admin',
        fechaRegistro: new Date().toISOString()
      };
      
      users.push(defaultAdmin);
      localStorage.setItem('usuarios', JSON.stringify(users));
      console.log('✅ Usuario admin creado por defecto');
      console.log('📧 Email: admin@pasoxpaso.cl');
      console.log('🔑 Password: admin123');
    }
    
    // Load current user from localStorage
    const savedUser = localStorage.getItem('usuarioActual');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
      }
    }
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('usuarios') || '[]');
      
      // Find user with matching credentials
      const foundUser = users.find(
        u => u.email === credentials.email && u.password === credentials.password
      );

      if (foundUser) {
        // Remove password before storing
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('usuarioActual', JSON.stringify(userWithoutPassword));
        return { success: true };
      }

      return { success: false, error: 'Credenciales inválidas' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Error al iniciar sesión' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      // Get existing users
      const users = JSON.parse(localStorage.getItem('usuarios') || '[]');
      
      // Check if email already exists
      if (users.some(u => u.email === userData.email)) {
        return { success: false, error: 'El email ya está registrado' };
      }

      // Create new user with ID
      const newUser = {
        ...userData,
        id: Date.now(),
        isAdmin: false
      };

      // Save to localStorage
      users.push(newUser);
      localStorage.setItem('usuarios', JSON.stringify(users));

      // Auto-login after registration
      const { password, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('usuarioActual', JSON.stringify(userWithoutPassword));

      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Error al registrar usuario' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('usuarioActual');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

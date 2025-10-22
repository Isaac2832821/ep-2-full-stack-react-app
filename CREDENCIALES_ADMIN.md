# 🔐 Credenciales de Acceso - PasoxPaso

## 👤 Usuario Administrador

El sistema crea automáticamente un usuario administrador cuando se inicia por primera vez.

### **Credenciales de Admin:**

```
📧 Email:    admin@pasoxpaso.cl
🔑 Password: admin123
```

---

## 🚀 Cómo Acceder al Panel de Administración

### **Paso 1: Ir al Login**
- URL: `https://tu-sitio.vercel.app/login`
- O click en "Iniciar Sesión" en el menú

### **Paso 2: Ingresar Credenciales**
- **Email:** `admin@pasoxpaso.cl`
- **Password:** `admin123`
- Click en "Iniciar Sesión"

### **Paso 3: Acceder al Panel**
Una vez logueado, puedes acceder al panel de dos formas:

**Opción A:** URL directa
- `https://tu-sitio.vercel.app/admin`

**Opción B:** Desde el menú
- Después de iniciar sesión, verás un enlace "Admin" en el menú superior

---

## 📍 Rutas del Panel de Administración

Una vez dentro del panel, puedes navegar a:

| Ruta | Descripción |
|------|-------------|
| `/admin` | Dashboard principal con estadísticas |
| `/admin/orders` | Gestión de pedidos |
| `/admin/inventory` | Gestión de inventario/productos |
| `/admin/reports` | Reportes y exportación a Excel |
| `/admin/employees` | Gestión de empleados |
| `/admin/users` | Gestión de clientes |
| `/admin/new-user` | Crear nuevo usuario/empleado |

---

## 👥 Usuario de Prueba (Cliente)

También puedes crear un usuario cliente normal para probar la experiencia de compra:

### **Opción 1: Registrarse**
1. Ve a `/registro`
2. Completa el formulario
3. Inicia sesión con tus credenciales

### **Opción 2: Usuario de prueba**
Puedes crear uno manualmente con estos datos:

```
📧 Email:    cliente@example.com
🔑 Password: cliente123
👤 Nombre:   Cliente de Prueba
```

---

## 🔒 Seguridad

### **Cambiar Contraseña del Admin:**

1. Inicia sesión como admin
2. Ve a "Mi Cuenta" (`/mi-cuenta`)
3. Cambia la contraseña en la sección de perfil

### **Crear Nuevos Administradores:**

1. Inicia sesión como admin
2. Ve a `/admin/new-user`
3. Selecciona tipo "Empleado"
4. Asigna rol de administrador

---

## ⚠️ Notas Importantes

1. **Primera Carga:** El usuario admin se crea automáticamente la primera vez que alguien visita el sitio
2. **localStorage:** Los datos se guardan en el navegador (localStorage)
3. **Producción:** En un entorno real, deberías:
   - Cambiar la contraseña por defecto
   - Implementar autenticación con backend
   - Usar JWT o sesiones seguras
   - Encriptar contraseñas

---

## 🧪 Probar en Local

```bash
cd react-app
npm start
```

Luego ve a: http://localhost:3000/login

---

## 🌐 Probar en Vercel

Una vez desplegado en Vercel:

1. Ve a tu URL de Vercel: `https://tu-proyecto.vercel.app/login`
2. Ingresa las credenciales de admin
3. Accede al panel en `/admin`

---

## 📝 Resumen Rápido

**Para acceder como ADMIN:**
- Email: `admin@pasoxpaso.cl`
- Password: `admin123`
- URL: `/login` → luego `/admin`

**El usuario admin se crea automáticamente al iniciar la app por primera vez.**

¡Listo para usar! 🎉

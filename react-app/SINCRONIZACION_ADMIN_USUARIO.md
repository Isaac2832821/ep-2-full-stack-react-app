# Sincronización Admin ↔ Usuario

## ✅ Cómo Funciona

Todos los cambios que hagas en el **Panel de Administración** se reflejan **automáticamente** en la **Web de Usuario**.

### 🔄 Sincronización en Tiempo Real

#### 1. **Productos (Inventario)**
- ✅ **Agregar producto** → Aparece inmediatamente en la tienda
- ✅ **Editar producto** → Los cambios se ven al instante
- ✅ **Eliminar producto** → Desaparece de la tienda
- ✅ **Actualizar stock** → El stock se actualiza en tiempo real
- ✅ **Cambiar precio** → El nuevo precio se muestra inmediatamente

#### 2. **Pedidos**
- ✅ **Cambiar estado** → El usuario ve el estado actualizado
- ✅ **Nuevos pedidos** → Aparecen automáticamente en el panel

#### 3. **Usuarios**
- ✅ **Crear usuario** → Puede hacer login inmediatamente
- ✅ **Modificar datos** → Los cambios se reflejan en el perfil

## 🛠️ Tecnología Utilizada

### LocalStorage + Context API
Todos los datos se almacenan en `localStorage` y se gestionan mediante React Context:

```javascript
// ProductContext sincroniza productos
localStorage.setItem('productos', JSON.stringify(products));

// AuthContext sincroniza usuarios
localStorage.setItem('usuarios', JSON.stringify(users));

// CartContext sincroniza el carrito
localStorage.setItem('carrito', JSON.stringify(cart));
```

### Listeners de Cambios
El sistema escucha cambios en localStorage:

```javascript
window.addEventListener('storage', (e) => {
  if (e.key === 'productos') {
    // Actualizar productos automáticamente
  }
});
```

## 📋 Ejemplo de Flujo

### Escenario: Admin actualiza el stock de un producto

1. **Admin** entra al panel → `/admin/inventory`
2. **Admin** edita un producto y cambia stock de 10 a 5
3. **Admin** guarda los cambios
4. ✅ El cambio se guarda en `localStorage.productos`
5. ✅ El `ProductContext` detecta el cambio
6. ✅ Todos los componentes que usan productos se actualizan
7. ✅ **Usuario** ve el nuevo stock sin recargar la página

## 🔍 Verificar Sincronización

### Prueba Manual:
1. Abre dos pestañas del navegador
2. En una pestaña: entra como **admin** (`/admin`)
3. En otra pestaña: navega como **usuario** (`/productos`)
4. Modifica un producto en el panel de admin
5. ✅ Verás el cambio reflejado en la pestaña de usuario

### Consola del Navegador:
```javascript
// Ver productos actuales
console.log(JSON.parse(localStorage.getItem('productos')));

// Ver usuarios
console.log(JSON.parse(localStorage.getItem('usuarios')));

// Ver pedidos
console.log(JSON.parse(localStorage.getItem('ventas')));
```

## ⚠️ Importante

- Los cambios son **persistentes** (se mantienen al recargar)
- Los cambios son **locales** (solo en tu navegador)
- Para producción, esto se conectaría a una API/Base de datos real

## 🚀 Funciones Disponibles en ProductContext

```javascript
const {
  products,           // Lista de productos
  updateProduct,      // Actualizar producto
  addProduct,         // Agregar producto
  deleteProduct       // Eliminar producto
} = useProducts();

// Ejemplo de uso en Admin:
updateProduct({
  id: 1,
  nombre: 'Nuevo nombre',
  precio: 99990,
  stock: 15
});
```

## 📝 Notas

- Todos los contextos (Product, Auth, Cart) funcionan de la misma manera
- Los cambios se propagan automáticamente a todos los componentes
- No necesitas recargar la página para ver los cambios

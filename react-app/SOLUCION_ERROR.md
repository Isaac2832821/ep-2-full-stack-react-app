# Solución al Error "Objects are not valid as a React child"

## El Problema
El error indica que se está intentando renderizar un objeto directamente en React en lugar de una propiedad específica del objeto.

## Solución Rápida

### Opción 1: Limpiar localStorage (Recomendado)
Abre la consola del navegador (F12) y ejecuta:

```javascript
// Limpiar todo el localStorage
localStorage.clear();

// Recargar la página
location.reload();
```

### Opción 2: Limpiar solo los datos problemáticos
```javascript
// Limpiar pedidos
localStorage.removeItem('orders');

// Limpiar usuarios
localStorage.removeItem('usuarios');
localStorage.removeItem('usuarioActual');

// Recargar
location.reload();
```

## ¿Por qué ocurre?
El error ocurre cuando hay datos antiguos en localStorage que tienen una estructura diferente a la esperada. Al limpiar el localStorage, la aplicación creará nuevos datos con la estructura correcta.

## Después de limpiar
1. La aplicación creará automáticamente el usuario admin
2. Podrás hacer login con:
   - Email: `admin@pasoxpaso.cl`
   - Password: `admin123`
3. Serás redirigido automáticamente al panel de administración

## Si el error persiste
Verifica que no haya ningún `console.log(user)` o similar que esté intentando renderizar el objeto completo en el JSX.

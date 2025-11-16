# PasoxPaso React Application

Aplicación e-commerce de zapatillas migrada a React con Bootstrap y Jasmine/Karma para testing.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 16 o superior) - [Descargar aquí](https://nodejs.org/)
- **npm** (viene incluido con Node.js)

Para verificar si tienes Node.js instalado:
```bash
node --version
npm --version
```

## 🚀 Instalación

### 1. Instalar Node.js (si no lo tienes)

1. Ve a https://nodejs.org/
2. Descarga la versión LTS (recomendada)
3. Ejecuta el instalador
4. Reinicia tu terminal/PowerShell
5. Verifica la instalación con `node --version`

### 2. Instalar dependencias del proyecto

Una vez que tengas Node.js instalado, ejecuta:

```bash
cd react-app
npm install
```

Esto instalará todas las dependencias necesarias:
- React y React DOM
- React Router para navegación
- Bootstrap y React-Bootstrap para diseño responsivo
- Jasmine y Karma para testing
- Testing Library para pruebas de componentes

## 🎯 Scripts Disponibles

### Desarrollo

```bash
npm start
```
Inicia el servidor de desarrollo en [http://localhost:3000](http://localhost:3000)
La página se recargará automáticamente cuando hagas cambios.

### Testing

```bash
npm test
```
Ejecuta las pruebas en modo interactivo.

```bash
npm run test:karma
```
Ejecuta las pruebas con Karma (se configurará en la tarea 7).

### Producción

```bash
npm run build
```
Crea una versión optimizada para producción en la carpeta `build/`.

## 📁 Estructura del Proyecto

```
react-app/
├── public/              # Archivos estáticos
├── src/
│   ├── components/      # Componentes React
│   │   ├── common/      # Componentes comunes (Header, Footer, Layout)
│   │   ├── product/     # Componentes de productos
│   │   ├── cart/        # Componentes del carrito
│   │   ├── auth/        # Componentes de autenticación
│   │   └── admin/       # Componentes del panel admin
│   ├── context/         # Context API (estado global)
│   ├── hooks/           # Custom hooks
│   ├── pages/           # Páginas de la aplicación
│   ├── services/        # Servicios de datos
│   ├── utils/           # Utilidades y helpers
│   ├── data/            # Datos de productos
│   ├── styles/          # Estilos globales
│   └── __tests__/       # Pruebas unitarias
├── package.json         # Dependencias y scripts
└── README.md           # Este archivo
```

## 🎨 Tecnologías Utilizadas

- **React 18** - Framework de UI
- **React Router 6** - Navegación
- **Bootstrap 5** - Framework CSS responsivo
- **React-Bootstrap** - Componentes Bootstrap para React
- **Jasmine** - Framework de testing
- **Karma** - Test runner
- **Testing Library** - Utilidades para testing de React

## 📝 Estado de Implementación

Este proyecto está siendo desarrollado siguiendo un plan de tareas estructurado:

- ✅ **Tarea 1**: Configuración del proyecto React y estructura base
- ⏳ **Tarea 2**: Componentes de layout (Header, Footer)
- ⏳ **Tarea 3**: Sistema de productos
- ⏳ **Tarea 4**: Carrito de compras
- ⏳ **Tarea 5**: Autenticación de usuarios
- ⏳ **Tarea 6**: Panel de administración
- ⏳ **Tarea 7**: Configuración de testing (Jasmine + Karma)
- ⏳ **Tarea 8**: Páginas adicionales
- ⏳ **Tarea 9**: Optimización y finalización

## 🔧 Próximos Pasos

1. Instalar Node.js si aún no lo tienes
2. Ejecutar `npm install` en la carpeta `react-app`
3. Ejecutar `npm start` para ver la aplicación
4. Continuar con la implementación de componentes según el plan de tareas

## 📞 Soporte

Para más información sobre el proyecto, consulta:
- Documentación de requisitos: `.kiro/specs/react-migration/requirements.md`
- Documentación de diseño: `.kiro/specs/react-migration/design.md`
- Plan de tareas: `.kiro/specs/react-migration/tasks.md`

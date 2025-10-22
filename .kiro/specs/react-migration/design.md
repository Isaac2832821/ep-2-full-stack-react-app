# Design Document

## Overview

This design document outlines the architecture and implementation approach for migrating the PasoxPaso e-commerce website from vanilla HTML/CSS/JavaScript to a modern React-based application. The design ensures all existing functionality is preserved while implementing modern development practices, responsive design with Bootstrap, and comprehensive testing with Jasmine and Karma.

## Architecture

### High-Level Architecture

The React application will follow a component-based architecture with the following layers:

```
┌─────────────────────────────────────────┐
│              Presentation Layer          │
│  (React Components + Bootstrap UI)      │
├─────────────────────────────────────────┤
│              Business Logic Layer       │
│     (Custom Hooks + Context API)       │
├─────────────────────────────────────────┤
│              Data Layer                 │
│    (LocalStorage + Mock API Services)  │
└─────────────────────────────────────────┘
```

### Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Layout/
│   │   └── LoadingSpinner/
│   ├── product/
│   │   ├── ProductCard/
│   │   ├── ProductGrid/
│   │   ├── ProductFilter/
│   │   └── ProductDetail/
│   ├── cart/
│   │   ├── CartItem/
│   │   ├── CartSummary/
│   │   └── CartPage/
│   ├── auth/
│   │   ├── LoginForm/
│   │   ├── RegisterForm/
│   │   └── UserProfile/
│   ├── admin/
│   │   ├── AdminSidebar/
│   │   ├── AdminNavbar/
│   │   ├── DashboardCards/
│   │   ├── ProductManagement/
│   │   ├── UserManagement/
│   │   ├── OrderManagement/
│   │   ├── EmployeeManagement/
│   │   ├── ReportsManagement/
│   │   └── ExcelExport/
│   ├── pages/
│   │   ├── ProductDetail/
│   │   ├── AboutUs/
│   │   ├── BlogPost/
│   │   ├── ContactForm/
│   │   └── OrderConfirmation/
├── hooks/
│   ├── useCart.js
│   ├── useAuth.js
│   ├── useProducts.js
│   └── useLocalStorage.js
├── context/
│   ├── CartContext.js
│   ├── AuthContext.js
│   └── ProductContext.js
├── services/
│   ├── productService.js
│   ├── cartService.js
│   └── authService.js
├── utils/
│   ├── formatters.js
│   ├── validators.js
│   └── constants.js
├── pages/
│   ├── HomePage.js
│   ├── ProductsPage.js
│   ├── ProductDetailPage.js
│   ├── CartPage.js
│   ├── ConfirmationPage.js
│   ├── LoginPage.js
│   ├── RegisterPage.js
│   ├── ProfilePage.js
│   ├── AboutPage.js
│   ├── BlogPage.js
│   ├── ContactPage.js
│   ├── AdminDashboardPage.js
│   ├── AdminOrdersPage.js
│   ├── AdminInventoryPage.js
│   ├── AdminReportsPage.js
│   ├── AdminEmployeesPage.js
│   ├── AdminUsersPage.js
│   └── AdminNewUserPage.js
├── styles/
│   ├── components/
│   └── global.css
└── __tests__/
    ├── components/
    ├── hooks/
    └── utils/
```

## Components and Interfaces

### Core Components

#### 1. Layout Components

**Header Component**
- Props: `user`, `cartCount`
- State: `isMenuOpen`
- Responsibilities: Navigation, user actions, cart indicator
- Bootstrap classes: `navbar`, `navbar-expand-lg`, `container`

**Footer Component**
- Props: None
- State: None
- Responsibilities: Static footer content, links
- Bootstrap classes: `footer`, `container`, `row`, `col`

**Layout Component**
- Props: `children`
- State: None
- Responsibilities: Wrap pages with header/footer
- Bootstrap classes: `main`, `container-fluid`

#### 2. Product Components

**ProductCard Component**
```javascript
interface ProductCardProps {
  product: {
    id: number;
    nombre: string;
    precio: number;
    imagen: string;
    descripcion: string;
  };
  onAddToCart: (productId: number) => void;
}
```
- Bootstrap classes: `card`, `card-img-top`, `card-body`, `btn`

**ProductGrid Component**
```javascript
interface ProductGridProps {
  products: Product[];
  loading: boolean;
}
```
- Bootstrap classes: `row`, `col-md-4`, `col-lg-3`

**ProductFilter Component**
```javascript
interface ProductFilterProps {
  categories: string[];
  onCategoryChange: (category: string) => void;
  onPriceChange: (priceRange: string) => void;
}
```
- Bootstrap classes: `form-select`, `mb-3`

#### 3. Cart Components

**CartItem Component**
```javascript
interface CartItemProps {
  item: {
    id: number;
    nombre: string;
    precio: number;
    cantidad: number;
    imagen: string;
  };
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}
```
- Bootstrap classes: `d-flex`, `align-items-center`, `btn-outline-secondary`

**CartSummary Component**
```javascript
interface CartSummaryProps {
  items: CartItem[];
  onCheckout: () => void;
}
```
- Bootstrap classes: `card`, `card-body`, `btn-primary`, `btn-lg`

#### 4. Authentication Components

**LoginForm Component**
```javascript
interface LoginFormProps {
  onLogin: (credentials: LoginCredentials) => void;
  loading: boolean;
  error: string | null;
}
```
- Bootstrap classes: `form-control`, `form-group`, `is-invalid`, `invalid-feedback`

**RegisterForm Component**
```javascript
interface RegisterFormProps {
  onRegister: (userData: RegisterData) => void;
  loading: boolean;
  error: string | null;
}
```
- Bootstrap classes: `form-control`, `form-group`, `row`, `col-md-6`

### Custom Hooks

#### useCart Hook
```javascript
const useCart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const addItem = (product, quantity = 1) => { /* implementation */ };
  const removeItem = (productId) => { /* implementation */ };
  const updateQuantity = (productId, quantity) => { /* implementation */ };
  const clearCart = () => { /* implementation */ };
  const getTotal = () => { /* implementation */ };
  
  return {
    items,
    loading,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
    itemCount: items.reduce((sum, item) => sum + item.cantidad, 0)
  };
};
```

#### useAuth Hook
```javascript
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const login = async (credentials) => { /* implementation */ };
  const register = async (userData) => { /* implementation */ };
  const logout = () => { /* implementation */ };
  
  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };
};
```

#### useProducts Hook
```javascript
const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const filterByCategory = (category) => { /* implementation */ };
  const filterByPrice = (priceRange) => { /* implementation */ };
  const searchProducts = (query) => { /* implementation */ };
  
  return {
    products,
    filteredProducts,
    loading,
    filterByCategory,
    filterByPrice,
    searchProducts
  };
};
```

## Data Models

### Product Model
```javascript
interface Product {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: string;
  stock: number;
  imagen: string;
}
```

### Cart Item Model
```javascript
interface CartItem {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen: string;
}
```

### User Model
```javascript
interface User {
  id: number;
  nombre: string;
  email: string;
  run: string;
  telefono?: string;
  region: string;
  comuna: string;
  direccion: string;
  isAdmin?: boolean;
}
```

### Order Model
```javascript
interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  fecha: string;
  shippingAddress: Address;
}
```

## Bootstrap Integration Strategy

### Responsive Breakpoints
- **Mobile**: `col-12` (< 576px)
- **Tablet**: `col-md-6`, `col-lg-4` (576px - 992px)
- **Desktop**: `col-lg-3`, `col-xl-3` (> 992px)

### Component-Specific Bootstrap Classes

#### Product Grid Responsiveness
```javascript
// ProductCard component classes
<div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
  <div className="card h-100">
    <img className="card-img-top" />
    <div className="card-body d-flex flex-column">
      <h5 className="card-title">
      <p className="card-text flex-grow-1">
      <div className="mt-auto">
        <button className="btn btn-primary w-100">
```

#### Navigation Responsiveness
```javascript
// Header component classes
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container">
    <button className="navbar-toggler d-lg-none">
    <div className="collapse navbar-collapse">
      <ul className="navbar-nav me-auto">
      <div className="d-flex">
```

#### Form Responsiveness
```javascript
// Registration form classes
<div className="row">
  <div className="col-md-6 mb-3">
    <input className="form-control" />
  </div>
  <div className="col-md-6 mb-3">
    <select className="form-select" />
  </div>
</div>
```

## Error Handling

### Component Error Boundaries
```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">¡Oops! Algo salió mal</h4>
          <p>Ha ocurrido un error inesperado. Por favor, recarga la página.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
```

### Service Error Handling
```javascript
// Error handling in services
const handleServiceError = (error) => {
  console.error('Service Error:', error);
  
  if (error.name === 'NetworkError') {
    return 'Error de conexión. Verifica tu internet.';
  }
  
  if (error.status === 404) {
    return 'Recurso no encontrado.';
  }
  
  return 'Ha ocurrido un error inesperado.';
};
```

## Testing Strategy

### Unit Testing Approach

#### Component Testing with Jasmine
```javascript
// Example test structure
describe('ProductCard Component', () => {
  let component;
  let mockProduct;
  let mockAddToCart;
  
  beforeEach(() => {
    mockProduct = {
      id: 1,
      nombre: 'Test Product',
      precio: 50000,
      imagen: 'test.jpg'
    };
    mockAddToCart = jasmine.createSpy('addToCart');
  });
  
  it('should render product information correctly', () => {
    // Test implementation
  });
  
  it('should call onAddToCart when button is clicked', () => {
    // Test implementation
  });
  
  it('should display formatted price', () => {
    // Test implementation
  });
});
```

#### Hook Testing
```javascript
describe('useCart Hook', () => {
  it('should add items to cart', () => {
    // Test implementation using renderHook
  });
  
  it('should calculate total correctly', () => {
    // Test implementation
  });
  
  it('should persist cart to localStorage', () => {
    // Test implementation with localStorage mock
  });
});
```

#### Service Testing
```javascript
describe('ProductService', () => {
  beforeEach(() => {
    // Mock localStorage
    spyOn(localStorage, 'getItem').and.returnValue('[]');
    spyOn(localStorage, 'setItem');
  });
  
  it('should load products from localStorage', () => {
    // Test implementation
  });
  
  it('should filter products by category', () => {
    // Test implementation
  });
});
```

### Karma Configuration
```javascript
// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'src/**/*.js',
      'src/**/*.test.js'
    ],
    preprocessors: {
      'src/**/*.js': ['webpack', 'coverage']
    },
    webpack: {
      // React webpack configuration
    },
    browsers: ['Chrome', 'ChromeHeadless'],
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'html',
      dir: 'coverage/',
      subdir: '.'
    }
  });
};
```

### Test Coverage Goals
- **Components**: 90% coverage for rendering and user interactions
- **Hooks**: 85% coverage for state management logic
- **Services**: 80% coverage for data operations
- **Utils**: 95% coverage for pure functions

### Mock Strategy
```javascript
// Mock implementations for testing
const mockLocalStorage = {
  getItem: jasmine.createSpy('getItem'),
  setItem: jasmine.createSpy('setItem'),
  removeItem: jasmine.createSpy('removeItem')
};

const mockProducts = [
  { id: 1, nombre: 'Test Product 1', precio: 50000 },
  { id: 2, nombre: 'Test Product 2', precio: 75000 }
];

// Context mocks
const mockCartContext = {
  items: [],
  addItem: jasmine.createSpy('addItem'),
  removeItem: jasmine.createSpy('removeItem')
};
```

## Performance Considerations

### Code Splitting
```javascript
// Lazy loading for admin components
const AdminPage = React.lazy(() => import('./pages/AdminPage'));

// Route-based code splitting
<Suspense fallback={<LoadingSpinner />}>
  <Route path="/admin" component={AdminPage} />
</Suspense>
```

### Memoization
```javascript
// Memoize expensive calculations
const ProductGrid = React.memo(({ products, onAddToCart }) => {
  const memoizedProducts = useMemo(() => 
    products.map(product => ({
      ...product,
      formattedPrice: formatPrice(product.precio)
    })), [products]
  );
  
  return (
    <div className="row">
      {memoizedProducts.map(product => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
});
```

### Image Optimization
```javascript
// Lazy loading images
const LazyImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <div className={`image-container ${className}`}>
      {!loaded && <div className="placeholder-shimmer" />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        style={{ display: loaded ? 'block' : 'none' }}
      />
    </div>
  );
};
```

This design provides a comprehensive foundation for migrating the PasoxPaso e-commerce site to React while maintaining all existing functionality and implementing modern development practices.
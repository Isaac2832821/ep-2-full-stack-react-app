# 🧪 Guía de Testing - PasoxPaso React

## 📚 Stack de Testing

Tu proyecto usa el stack estándar de React:
- **Jest** - Framework de testing
- **React Testing Library** - Para testear componentes React
- **@testing-library/jest-dom** - Matchers adicionales para Jest

> **Nota:** Jasmine y Karma son para Angular. En React usamos Jest + React Testing Library.

## 🚀 Comandos de Testing

### Ejecutar todos los tests
```bash
npm test
```

### Ejecutar tests una sola vez (sin watch mode)
```bash
npm test -- --watchAll=false
```

### Ejecutar tests con cobertura
```bash
npm test -- --coverage --watchAll=false
```

### Ejecutar un test específico
```bash
npm test -- LoginForm.test.js
```

### Ejecutar tests en modo watch (desarrollo)
```bash
npm test
```

## 📝 Estructura de un Test

### Ejemplo Básico

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MiComponente from './MiComponente';

describe('MiComponente', () => {
  it('debe renderizar correctamente', () => {
    render(
      <BrowserRouter>
        <MiComponente />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Hola Mundo')).toBeInTheDocument();
  });

  it('debe manejar clicks', () => {
    render(
      <BrowserRouter>
        <MiComponente />
      </BrowserRouter>
    );
    
    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);
    
    expect(screen.getByText('Clicked!')).toBeInTheDocument();
  });
});
```

## 🎯 Ejemplos de Tests por Tipo

### 1. Test de Componente Simple

```javascript
// ProductCard.test.js
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from './ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    nombre: 'Zapatillas Nike',
    precio: 89990,
    imagen: '/img/product.jpg',
    stock: 10
  };

  it('debe mostrar el nombre del producto', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Zapatillas Nike')).toBeInTheDocument();
  });

  it('debe mostrar el precio formateado', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/\$89\.990/)).toBeInTheDocument();
  });
});
```

### 2. Test de Formulario

```javascript
// LoginForm.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../context/AuthContext';
import LoginForm from './LoginForm';

const RouterWrapper = ({ children }) => (
  <BrowserRouter>
    <AuthProvider>
      {children}
    </AuthProvider>
  </BrowserRouter>
);

describe('LoginForm', () => {
  it('debe mostrar errores de validación', async () => {
    render(
      <RouterWrapper>
        <LoginForm />
      </RouterWrapper>
    );
    
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/el email es requerido/i)).toBeInTheDocument();
    });
  });

  it('debe permitir escribir en los campos', () => {
    render(
      <RouterWrapper>
        <LoginForm />
      </RouterWrapper>
    );
    
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    
    expect(emailInput.value).toBe('test@test.com');
  });
});
```

### 3. Test de Context/Hook

```javascript
// CartContext.test.js
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';

describe('CartContext', () => {
  it('debe agregar items al carrito', () => {
    const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;
    const { result } = renderHook(() => useCart(), { wrapper });
    
    const product = { id: 1, nombre: 'Test', precio: 1000 };
    
    act(() => {
      result.current.addToCart(product, 2);
    });
    
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
  });
});
```

### 4. Test de Utilidades

```javascript
// formatters.test.js
import { formatPrice, formatDate } from './formatters';

describe('formatters', () => {
  describe('formatPrice', () => {
    it('debe formatear precios correctamente', () => {
      expect(formatPrice(89990)).toBe('$89.990');
      expect(formatPrice(1000)).toBe('$1.000');
    });
  });

  describe('formatDate', () => {
    it('debe formatear fechas correctamente', () => {
      expect(formatDate('2024-01-15')).toBe('15/01/2024');
    });
  });
});
```

### 5. Test de Validadores

```javascript
// validators.test.js
import { validateEmail, validateRUN, validatePassword } from './validators';

describe('validators', () => {
  describe('validateEmail', () => {
    it('debe validar emails correctos', () => {
      expect(validateEmail('test@test.com')).toBe(true);
      expect(validateEmail('invalid')).toBe(false);
    });
  });

  describe('validateRUN', () => {
    it('debe validar RUNs chilenos', () => {
      expect(validateRUN('12.345.678-9')).toBe(true);
      expect(validateRUN('invalid')).toBe(false);
    });
  });
});
```

## 🔍 Queries Comunes

### Por Rol (Recomendado)
```javascript
screen.getByRole('button', { name: /submit/i })
screen.getByRole('textbox', { name: /email/i })
screen.getByRole('heading', { name: /title/i })
```

### Por Label
```javascript
screen.getByLabelText(/email/i)
screen.getByLabelText(/password/i)
```

### Por Texto
```javascript
screen.getByText(/hello world/i)
screen.getByText('Exact text')
```

### Por Test ID
```javascript
screen.getByTestId('custom-element')
```

## 🎭 Matchers Útiles

```javascript
// Existencia
expect(element).toBeInTheDocument()
expect(element).not.toBeInTheDocument()

// Visibilidad
expect(element).toBeVisible()
expect(element).not.toBeVisible()

// Contenido
expect(element).toHaveTextContent('text')
expect(element).toHaveValue('value')

// Atributos
expect(element).toHaveAttribute('href', '/path')
expect(element).toHaveClass('active')

// Estado
expect(element).toBeDisabled()
expect(element).toBeEnabled()
expect(element).toBeChecked()
```

## 🎨 Mocking

### Mock de localStorage
```javascript
beforeEach(() => {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
  };
  global.localStorage = localStorageMock;
});
```

### Mock de fetch
```javascript
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'test' })
  })
);
```

### Mock de módulos
```javascript
jest.mock('../services/api', () => ({
  fetchProducts: jest.fn(() => Promise.resolve([]))
}));
```

## 📊 Cobertura de Código

### Ver reporte de cobertura
```bash
npm test -- --coverage --watchAll=false
```

### Configurar umbrales mínimos
En `package.json`:
```json
{
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

## 🐛 Debugging Tests

### Ver qué se está renderizando
```javascript
import { render, screen } from '@testing-library/react';

render(<MyComponent />);
screen.debug(); // Imprime el HTML actual
```

### Ver un elemento específico
```javascript
const element = screen.getByText('Hello');
screen.debug(element);
```

## 📁 Estructura de Archivos de Test

```
src/
├── components/
│   ├── ProductCard/
│   │   ├── ProductCard.js
│   │   ├── ProductCard.css
│   │   └── ProductCard.test.js  ← Test aquí
│   └── ...
├── utils/
│   ├── formatters.js
│   └── formatters.test.js  ← Test aquí
└── setupTests.js  ← Configuración global
```

## ✅ Mejores Prácticas

1. **Testea comportamiento, no implementación**
   ```javascript
   // ❌ Malo
   expect(component.state.count).toBe(5);
   
   // ✅ Bueno
   expect(screen.getByText('Count: 5')).toBeInTheDocument();
   ```

2. **Usa queries accesibles**
   ```javascript
   // ❌ Malo
   screen.getByTestId('submit-button')
   
   // ✅ Bueno
   screen.getByRole('button', { name: /submit/i })
   ```

3. **Espera cambios asíncronos**
   ```javascript
   // ✅ Bueno
   await waitFor(() => {
     expect(screen.getByText('Loaded')).toBeInTheDocument();
   });
   ```

4. **Limpia después de cada test**
   ```javascript
   afterEach(() => {
     jest.clearAllMocks();
     localStorage.clear();
   });
   ```

## 🎯 Tests Existentes en el Proyecto

Ya tienes tests creados para:
- ✅ `LoginForm.test.js`
- ✅ `RegisterForm.test.js`
- ✅ `ProductCard.test.js`
- ✅ `ProductFilter.test.js`
- ✅ `ProductGrid.test.js`
- ✅ `CartItem.test.js`
- ✅ `CartSummary.test.js`

## 🚀 Próximos Pasos

1. Ejecuta los tests: `npm test -- --watchAll=false`
2. Revisa los tests existentes como ejemplos
3. Crea tests para nuevos componentes
4. Mantén una cobertura > 80%

## 📚 Recursos

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [Common Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

// Setup file for Jasmine tests
import { setupJasmineMatchers } from './test-helpers/jasmine-matchers';

// Setup custom matchers
setupJasmineMatchers();

// Mock localStorage (only if not already defined)
if (typeof global.localStorage === 'undefined') {
  const localStorageMock = {
    getItem: jasmine.createSpy('getItem').and.returnValue(null),
    setItem: jasmine.createSpy('setItem'),
    removeItem: jasmine.createSpy('removeItem'),
    clear: jasmine.createSpy('clear'),
    length: 0,
    key: jasmine.createSpy('key')
  };
  
  Object.defineProperty(global, 'localStorage', {
    value: localStorageMock,
    writable: true
  });
}

// Reset localStorage before each test
beforeEach(() => {
  if (global.localStorage && global.localStorage.getItem && global.localStorage.getItem.calls) {
    global.localStorage.getItem.calls.reset();
    global.localStorage.setItem.calls.reset();
    global.localStorage.removeItem.calls.reset();
    global.localStorage.clear.calls.reset();
    global.localStorage.getItem.and.returnValue(null);
  }
});

// Cleanup after each test
afterEach(() => {
  // Clean up the DOM
  document.body.innerHTML = '';
});

// Suppress console warnings in tests
const originalWarn = console.warn;
const originalError = console.error;

beforeAll(() => {
  console.warn = (...args) => {
    const message = args[0];
    if (
      typeof message === 'string' &&
      (message.includes('React Router Future Flag Warning') ||
       message.includes('Not implemented: HTMLFormElement.prototype.submit'))
    ) {
      return;
    }
    originalWarn.apply(console, args);
  };

  console.error = (...args) => {
    const message = args[0];
    if (
      typeof message === 'string' &&
      message.includes('Not implemented')
    ) {
      return;
    }
    originalError.apply(console, args);
  };
});

afterAll(() => {
  console.warn = originalWarn;
  console.error = originalError;
});

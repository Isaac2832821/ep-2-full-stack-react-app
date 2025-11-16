// Custom Jasmine matchers to mimic Jest/Testing Library behavior

export function setupJasmineMatchers() {
  beforeEach(() => {
    jasmine.addMatchers({
      toBeInTheDocument: () => ({
        compare: (actual) => {
          const pass = actual !== null && document.body.contains(actual);
          return {
            pass,
            message: pass
              ? `Expected element not to be in the document`
              : `Expected element to be in the document`
          };
        }
      }),

      toHaveTextContent: () => ({
        compare: (actual, expected) => {
          const actualText = actual.textContent || '';
          const pass = typeof expected === 'string'
            ? actualText.includes(expected)
            : expected.test(actualText);
          return {
            pass,
            message: pass
              ? `Expected element not to have text content "${expected}"`
              : `Expected element to have text content "${expected}", but got "${actualText}"`
          };
        }
      }),

      toHaveAttribute: () => ({
        compare: (actual, attr, value) => {
          const actualValue = actual.getAttribute(attr);
          const pass = value === undefined
            ? actual.hasAttribute(attr)
            : actualValue === value;
          return {
            pass,
            message: pass
              ? `Expected element not to have attribute ${attr}="${value}"`
              : `Expected element to have attribute ${attr}="${value}", but got "${actualValue}"`
          };
        }
      }),

      toHaveClass: () => ({
        compare: (actual, className) => {
          const pass = actual.classList.contains(className);
          return {
            pass,
            message: pass
              ? `Expected element not to have class "${className}"`
              : `Expected element to have class "${className}"`
          };
        }
      }),

      toHaveValue: () => ({
        compare: (actual, expected) => {
          const pass = actual.value === expected;
          return {
            pass,
            message: pass
              ? `Expected element not to have value "${expected}"`
              : `Expected element to have value "${expected}", but got "${actual.value}"`
          };
        }
      }),

      toBeDisabled: () => ({
        compare: (actual) => {
          const pass = actual.disabled === true;
          return {
            pass,
            message: pass
              ? `Expected element not to be disabled`
              : `Expected element to be disabled`
          };
        }
      }),

      toBeEnabled: () => ({
        compare: (actual) => {
          const pass = actual.disabled === false;
          return {
            pass,
            message: pass
              ? `Expected element not to be enabled`
              : `Expected element to be enabled`
          };
        }
      }),

      toBeVisible: () => ({
        compare: (actual) => {
          const pass = actual.offsetParent !== null;
          return {
            pass,
            message: pass
              ? `Expected element not to be visible`
              : `Expected element to be visible`
          };
        }
      })
    });
  });
}

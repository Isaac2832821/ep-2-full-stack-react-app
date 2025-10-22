import { productos as initialProducts } from '../data/products';
import { STORAGE_KEYS } from '../utils/constants';

/**
 * Product Service
 * Handles all product-related data operations
 */

class ProductService {
  /**
   * Get all products
   * @returns {Array} Array of products
   */
  getAllProducts() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (stored) {
        return JSON.parse(stored);
      }
      // Initialize with default products if none exist
      this.saveProducts(initialProducts);
      return initialProducts;
    } catch (error) {
      console.error('Error loading products:', error);
      return initialProducts;
    }
  }

  /**
   * Get product by ID
   * @param {number} id - Product ID
   * @returns {Object|null} Product object or null if not found
   */
  getProductById(id) {
    const products = this.getAllProducts();
    return products.find(p => p.id === parseInt(id)) || null;
  }

  /**
   * Filter products by category
   * @param {string} category - Category to filter by
   * @returns {Array} Filtered products
   */
  filterByCategory(category) {
    const products = this.getAllProducts();
    if (!category) return products;
    return products.filter(p => p.categoria === category);
  }

  /**
   * Filter products by price range
   * @param {string} priceRange - Price range (e.g., "0-50000" or "100000-")
   * @returns {Array} Filtered products
   */
  filterByPriceRange(priceRange) {
    const products = this.getAllProducts();
    if (!priceRange) return products;

    const [min, max] = priceRange.split('-').map(Number);
    
    if (max) {
      return products.filter(p => p.precio >= min && p.precio <= max);
    } else {
      return products.filter(p => p.precio >= min);
    }
  }

  /**
   * Search products by query
   * @param {string} query - Search query
   * @returns {Array} Matching products
   */
  searchProducts(query) {
    const products = this.getAllProducts();
    if (!query) return products;

    const lowerQuery = query.toLowerCase();
    return products.filter(p =>
      p.nombre.toLowerCase().includes(lowerQuery) ||
      p.descripcion.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Apply multiple filters
   * @param {Object} filters - Filter object with category, priceRange, and searchQuery
   * @returns {Array} Filtered products
   */
  applyFilters(filters) {
    let products = this.getAllProducts();

    // Apply category filter
    if (filters.category) {
      products = products.filter(p => p.categoria === filters.category);
    }

    // Apply price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (max) {
        products = products.filter(p => p.precio >= min && p.precio <= max);
      } else {
        products = products.filter(p => p.precio >= min);
      }
    }

    // Apply search query filter
    if (filters.searchQuery) {
      const lowerQuery = filters.searchQuery.toLowerCase();
      products = products.filter(p =>
        p.nombre.toLowerCase().includes(lowerQuery) ||
        p.descripcion.toLowerCase().includes(lowerQuery)
      );
    }

    return products;
  }

  /**
   * Save products to localStorage
   * @param {Array} products - Products array to save
   */
  saveProducts(products) {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (error) {
      console.error('Error saving products:', error);
    }
  }

  /**
   * Add new product (admin function)
   * @param {Object} product - Product object to add
   * @returns {Object} Added product with ID
   */
  addProduct(product) {
    const products = this.getAllProducts();
    const newProduct = {
      ...product,
      id: Date.now() // Generate unique ID
    };
    products.push(newProduct);
    this.saveProducts(products);
    return newProduct;
  }

  /**
   * Update existing product (admin function)
   * @param {number} id - Product ID
   * @param {Object} updates - Product updates
   * @returns {Object|null} Updated product or null if not found
   */
  updateProduct(id, updates) {
    const products = this.getAllProducts();
    const index = products.findIndex(p => p.id === parseInt(id));
    
    if (index === -1) return null;
    
    products[index] = { ...products[index], ...updates };
    this.saveProducts(products);
    return products[index];
  }

  /**
   * Delete product (admin function)
   * @param {number} id - Product ID
   * @returns {boolean} True if deleted, false if not found
   */
  deleteProduct(id) {
    const products = this.getAllProducts();
    const filtered = products.filter(p => p.id !== parseInt(id));
    
    if (filtered.length === products.length) return false;
    
    this.saveProducts(filtered);
    return true;
  }

  /**
   * Update product stock
   * @param {number} id - Product ID
   * @param {number} quantity - Quantity to add/subtract
   * @returns {Object|null} Updated product or null if not found
   */
  updateStock(id, quantity) {
    const products = this.getAllProducts();
    const index = products.findIndex(p => p.id === parseInt(id));
    
    if (index === -1) return null;
    
    products[index].stock += quantity;
    this.saveProducts(products);
    return products[index];
  }

  /**
   * Check if product is in stock
   * @param {number} id - Product ID
   * @param {number} quantity - Quantity to check
   * @returns {boolean} True if in stock
   */
  isInStock(id, quantity = 1) {
    const product = this.getProductById(id);
    return product && product.stock >= quantity;
  }
}

// Export singleton instance
export default new ProductService();

import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import CartItem from '../components/cart/CartItem/CartItem';
import CartSummary from '../components/cart/CartSummary/CartSummary';
import ProductCard from '../components/product/ProductCard/ProductCard';
import './CartPage.css';

const CartPage = () => {
  const { items, updateQuantity, removeItem, clearCart, addItem } = useCart();
  const { products } = useProducts();

  // Get related products (random 4 products)
  const relatedProducts = products
    .filter(p => !items.some(item => item.id === p.id))
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  const handleCheckout = () => {
    // Don't clear cart here - it will be cleared after payment confirmation
    // Just let CartSummary navigate to checkout
    console.log('CartPage handleCheckout called - NOT clearing cart');
  };

  const handleAddToCart = (product) => {
    addItem(product, 1);
  };

  return (
    <div className="cart-page">
      {/* Breadcrumb */}
      <section className="breadcrumb-section bg-light py-3">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Carrito
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="cart-section py-4">
        <div className="container">
          <div className="cart-header mb-4">
            <h1 className="cart-title">Mi Carrito de Compras</h1>
            <p className="cart-subtitle text-muted">
              Revisa y gestiona tus productos seleccionados
            </p>
          </div>

          {items.length === 0 ? (
            /* Empty Cart State */
            <div className="empty-cart">
              <div className="empty-cart-icon">
                <i className="fas fa-shopping-cart fa-5x text-muted"></i>
              </div>
              <h2 className="mt-4">Tu carrito está vacío</h2>
              <p className="text-muted">
                Parece que aún no has añadido productos a tu carrito.
              </p>
              <Link to="/productos" className="btn btn-primary btn-lg mt-3">
                <i className="fas fa-shopping-bag me-2"></i>
                Ver Productos
              </Link>
            </div>
          ) : (
            /* Cart with Items */
            <div className="row">
              {/* Cart Items */}
              <div className="col-12 col-lg-8 mb-4">
                <div className="cart-items-header mb-3">
                  <h5 className="mb-0">
                    Productos ({items.length} {items.length === 1 ? 'item' : 'items'})
                  </h5>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={clearCart}
                  >
                    <i className="fas fa-trash me-2"></i>
                    Vaciar Carrito
                  </button>
                </div>

                <div className="cart-items-list">
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </div>
              </div>

              {/* Cart Summary */}
              <div className="col-12 col-lg-4">
                <CartSummary items={items} onCheckout={handleCheckout} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products */}
      {items.length > 0 && relatedProducts.length > 0 && (
        <section className="related-products-section bg-light py-5">
          <div className="container">
            <h2 className="section-title text-center mb-4">
              También te puede interesar
            </h2>
            <div className="row">
              {relatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default CartPage;

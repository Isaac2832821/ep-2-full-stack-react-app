import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { formatPrice } from '../utils/formatters';
import ProductCard from '../components/product/ProductCard/ProductCard';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products } = useProducts();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    // Find the product by ID
    const foundProduct = products.find(p => p.id === parseInt(id));
    
    if (foundProduct) {
      setProduct(foundProduct);
      setMainImage(foundProduct.imagen);
      
      // Set default size if available
      if (foundProduct.tallas && foundProduct.tallas.length > 0) {
        setSelectedSize(foundProduct.tallas[0]);
      }
      
      // Find related products (same category, excluding current product)
      const related = products
        .filter(p => p.categoria === foundProduct.categoria && p.id !== foundProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);
      
      // Update page title
      document.title = `${foundProduct.nombre} - PasoxPaso`;
    } else {
      setProduct(null);
    }
  }, [id, products]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    if (product.tallas && product.tallas.length > 0 && !selectedSize) {
      alert('Por favor selecciona una talla');
      return;
    }
    
    addToCart(product, quantity, selectedSize);
    
    // Show success message
    alert(`${product.nombre} agregado al carrito`);
  };

  const handleBuyNow = () => {
    if (!product) return;
    
    if (product.tallas && product.tallas.length > 0 && !selectedSize) {
      alert('Por favor selecciona una talla');
      return;
    }
    
    addToCart(product, quantity, selectedSize);
    navigate('/carrito');
  };

  if (!product) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning text-center">
          <h3>Producto no encontrado</h3>
          <p>El producto que buscas no existe o ha sido eliminado.</p>
          <Link to="/productos" className="btn btn-primary">
            Ver todos los productos
          </Link>
        </div>
      </div>
    );
  }

  const thumbnails = [product.imagen, product.imagen, product.imagen];

  return (
    <div className="product-detail-page">
      {/* Breadcrumb */}
      <section className="breadcrumb-section bg-light py-3">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/productos">Productos</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {product.nombre}
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Product Detail */}
      <section className="product-detail-section py-5">
        <div className="container">
          <div className="row">
            {/* Product Images */}
            <div className="col-12 col-lg-6 mb-4">
              <div className="product-images">
                <div className="main-image">
                  <img src={mainImage} alt={product.nombre} className="img-fluid" />
                  {product.descuento > 0 && (
                    <span className="discount-badge">-{product.descuento}%</span>
                  )}
                </div>
                <div className="image-thumbnails">
                  {thumbnails.map((img, index) => (
                    <div
                      key={index}
                      className={`thumbnail ${mainImage === img ? 'active' : ''}`}
                      onClick={() => setMainImage(img)}
                    >
                      <img src={img} alt={`${product.nombre} ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="col-12 col-lg-6">
              <div className="product-info">
                <h1 className="product-title">{product.nombre}</h1>
                
                <div className="product-rating mb-3">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star ${i < 4 ? 'text-warning' : 'text-muted'}`}
                      ></i>
                    ))}
                  </div>
                  <span className="rating-text ms-2">(4.0) 128 reseñas</span>
                </div>

                <div className="product-price mb-4">
                  {product.descuento > 0 ? (
                    <>
                      <span className="current-price">{formatPrice(product.precioFinal)}</span>
                      <span className="original-price ms-2">{formatPrice(product.precio)}</span>
                    </>
                  ) : (
                    <span className="current-price">{formatPrice(product.precio)}</span>
                  )}
                </div>

                <div className="product-description mb-4">
                  <h5>Descripción</h5>
                  <p>{product.descripcion}</p>
                  <p>
                    Estas zapatillas combinan estilo y comodidad para el uso diario. 
                    Fabricadas con materiales de alta calidad que garantizan durabilidad 
                    y confort durante todo el día. Perfectas para cualquier ocasión.
                  </p>
                </div>

                {/* Size Selection */}
                {product.tallas && product.tallas.length > 0 && (
                  <div className="size-selection mb-4">
                    <h5>Talla</h5>
                    <div className="size-options">
                      {product.tallas.map((size) => (
                        <button
                          key={size}
                          className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Selection */}
                <div className="quantity-selection mb-4">
                  <h5>Cantidad</h5>
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <input
                      type="number"
                      className="quantity-input"
                      value={quantity}
                      readOnly
                    />
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stock}
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                  <small className="text-muted">Stock disponible: {product.stock}</small>
                </div>

                {/* Action Buttons */}
                <div className="product-actions">
                  <button
                    className="btn btn-primary btn-lg me-2"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                  >
                    <i className="fas fa-shopping-cart me-2"></i>
                    Agregar al Carrito
                  </button>
                  <button
                    className="btn btn-success btn-lg"
                    onClick={handleBuyNow}
                    disabled={product.stock === 0}
                  >
                    <i className="fas fa-bolt me-2"></i>
                    Comprar Ahora
                  </button>
                </div>

                {/* Product Features */}
                <div className="product-features mt-4">
                  <div className="feature-item">
                    <i className="fas fa-truck text-primary"></i>
                    <div>
                      <strong>Envío Gratis</strong>
                      <p>En compras sobre $50.000</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-undo text-primary"></i>
                    <div>
                      <strong>Devolución Gratis</strong>
                      <p>30 días para cambios</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-shield-alt text-primary"></i>
                    <div>
                      <strong>Compra Segura</strong>
                      <p>Protección garantizada</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="related-products-section py-5 bg-light">
          <div className="container">
            <h2 className="section-title mb-4">Productos Relacionados</h2>
            <div className="row">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="col-6 col-md-4 col-lg-3 mb-4">
                  <ProductCard product={relatedProduct} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;

// Base de datos de productos simulada
const productos = [
    {
        id: 1,
        nombre: "Zapatillas Adidas Superstar Adv Unisex Negro",
        precio: 89990,
        descripcion: "Un ícono actualizado para el skate",
        categoria: "vans",
        stock: 10,
        imagen: "imagenes/adv unisex.jpeg"
    },
    {
        id: 2,
        nombre: "PZapatillas Puma Suede Xl Unisex Verde",
        precio: 60000,
        descripcion: "Esta reinvención del clásico Suede se inspira en la herencia del breakdance",
        categoria: "vans",
        stock: 15,
        imagen: "imagenes/p2.jpeg"
    },
    {
        id: 3,
        nombre: "Zapatilla Palladium Palla Ace Unisex Negro",
        precio: 55000,
        descripcion: "La marca francesa Palladium, ha tomado parte del ADN del diseño del modelo Pampa",
        categoria: "vans",
        stock: 8,
        imagen: "imagenes/p3.jpeg"
    },
    {
        id: 4,
        nombre: "Zapatillas Adidas Tekkira Cup Hombre Blanco",
        precio: 299990,
        descripcion: "Una zapatilla de skate contemporánea inspirada en la estética de la cancha de tenis y la tecnología del running",
        categoria: "vans",
        stock: 5,
        imagen: "imagenes/p4.jpeg"
    },
    {
        id: 5,
        nombre: "Zapatillas Vans Knu Skool Sue Unisex Burdeo",
        precio: 89990,
        descripcion: "Las Knu Skool son un modelo reeditado de los años 90",
        categoria: "vans",
        stock: 20,
        imagen: "imagenes/p5.jpeg"
    },
    {
        id: 6,
        nombre: "Ace City Shell Chuk 2 Unisex Negro",
        precio: 45990,
        descripcion: "Lámpara LED inteligente con control remoto",
        categoria: "vans",
        stock: 12,
        imagen: "imagenes/p6.jpeg"
    }, 
    {
        id: 7,
        nombre: "Zapatillas Adidas Grand Court Alpha 00S Hombre Burdeo",
        precio: 45990,
        descripcion: "Elegantes, deportivas y fáciles de combinar.",
        categoria: "vans",
        stock: 12,
        imagen: "imagenes/p7.png"
    },
    {
        id: 8,
        nombre: "Zapatillas Vans knu ",
        precio: 45990,
        descripcion: "Elegantes, deportivas y fáciles de combinar.",
        categoria: "vans",
        stock: 12,
        imagen: "imagenes/p8.jpeg"
    }
];

// Función para formatear precio
function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(precio);
}

// Función para crear tarjeta de producto
function crearTarjetaProducto(producto) {
    return `
        <div class="product-card" data-id="${producto.id}">
            <div class="product-image">
                <img src="${producto.imagen}" alt="${producto.nombre}" />
            </div>
            <h3>${producto.nombre}</h3>
            <p class="product-price">${formatearPrecio(producto.precio)}</p>
            <p>${producto.descripcion}</p>
            <div class="product-actions">
                <button class="btn-primary add-to-cart" data-id="${producto.id}">
                    Añadir al Carrito
                </button>
                <a href="producto.html?id=${producto.id}" class="btn-secondary">
                    Ver Detalles
                </a>
            </div>
        </div>
    `;
}

// Función para mostrar productos
function mostrarProductos(productosAMostrar = productos) {
    const grid = document.getElementById('products-grid') || document.getElementById('featured-products');
    if (!grid) return;
    
    if (productosAMostrar.length === 0) {
        grid.innerHTML = '<p>No se encontraron productos.</p>';
        return;
    }
    
    grid.innerHTML = productosAMostrar.map(crearTarjetaProducto).join('');
    
    // Agregar event listeners para botones de añadir al carrito
    grid.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            añadirAlCarrito(productId);
        });
    });
}

// Función para obtener producto por ID
function obtenerProductoPorId(id) {
    return productos.find(producto => producto.id === parseInt(id));
}

// Función para filtrar productos
function filtrarProductos() {
    const categoriaFiltro = document.getElementById('category-filter')?.value || '';
    const precioFiltro = document.getElementById('price-filter')?.value || '';
    
    let productosFiltrados = productos;
    
    // Filtrar por categoría
    if (categoriaFiltro) {
        productosFiltrados = productosFiltrados.filter(producto => 
            producto.categoria === categoriaFiltro
        );
    }
    
    // Filtrar por precio
    if (precioFiltro) {
        const [min, max] = precioFiltro.split('-').map(Number);
        productosFiltrados = productosFiltrados.filter(producto => {
            if (precioFiltro.includes('+')) {
                return producto.precio >= min;
            }
            return producto.precio >= min && producto.precio <= max;
        });
    }
    
    mostrarProductos(productosFiltrados);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar productos destacados en home (solo 3)
    if (document.getElementById('featured-products')) {
        mostrarProductos(productos.slice(0, 3));
    }
    
    // Mostrar todos los productos en página de productos
    if (document.getElementById('products-grid')) {
        mostrarProductos();
        
        // Agregar event listeners para filtros
        const categoryFilter = document.getElementById('category-filter');
        const priceFilter = document.getElementById('price-filter');
        
        if (categoryFilter) {
            categoryFilter.addEventListener('change', filtrarProductos);
        }
        
        if (priceFilter) {
            priceFilter.addEventListener('change', filtrarProductos);
        }
    }
});
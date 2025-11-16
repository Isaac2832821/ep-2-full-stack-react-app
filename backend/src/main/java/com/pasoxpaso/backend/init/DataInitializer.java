package com.pasoxpaso.backend.init;

import com.pasoxpaso.backend.entity.Producto;
import com.pasoxpaso.backend.entity.Usuario;
import com.pasoxpaso.backend.repository.ProductoRepository;
import com.pasoxpaso.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {
    
    private final UsuarioRepository usuarioRepository;
    private final ProductoRepository productoRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) {
        log.info("Inicializando datos...");
        
        // Crear usuario admin
        if (!usuarioRepository.existsByEmail("admin@pasoxpaso.cl")) {
            Usuario admin = new Usuario();
            admin.setNombre("Administrador");
            admin.setEmail("admin@pasoxpaso.cl");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRut("11111111-1");
            admin.setTelefono("+56912345678");
            admin.setDireccion("Av. Principal 123");
            admin.setRegion("Metropolitana");
            admin.setComuna("Santiago");
            admin.setRol(Usuario.Rol.ADMIN);
            admin.setActivo(true);
            usuarioRepository.save(admin);
            log.info("✅ Usuario admin creado: admin@pasoxpaso.cl / admin123");
        }
        
        // Crear productos si no existen
        if (productoRepository.count() == 0) {
            List<Producto> productos = crearProductos();
            productoRepository.saveAll(productos);
            log.info("✅ {} productos creados", productos.size());
        }
        
        log.info("✅ Inicialización completada");
    }
    
    private List<Producto> crearProductos() {
        List<Producto> productos = new ArrayList<>();
        
        // Nike
        productos.add(crearProducto("Nike Air Max 270", "Zapatillas deportivas con tecnología Air Max", 
                new BigDecimal("89990"), "nike", "Nike", 15, "/imagenes/p2.jpeg", true));
        productos.add(crearProducto("Nike Revolution 6", "Zapatillas de running cómodas", 
                new BigDecimal("54990"), "nike", "Nike", 20, "/imagenes/p3.jpeg", false));
        productos.add(crearProducto("Nike Court Vision", "Zapatillas estilo urbano", 
                new BigDecimal("64990"), "nike", "Nike", 12, "/imagenes/p4.jpeg", true));
        productos.add(crearProducto("Nike Downshifter 12", "Zapatillas para correr", 
                new BigDecimal("49990"), "nike", "Nike", 18, "/imagenes/p5.jpeg", false));
        
        // Adidas
        productos.add(crearProducto("Adidas Ultraboost 21", "Zapatillas de running premium", 
                new BigDecimal("129990"), "adidas", "Adidas", 10, "/imagenes/p6.jpeg", true));
        productos.add(crearProducto("Adidas Superstar", "Clásicas zapatillas urbanas", 
                new BigDecimal("74990"), "adidas", "Adidas", 25, "/imagenes/p7.png", false));
        productos.add(crearProducto("Adidas Stan Smith", "Zapatillas icónicas de tenis", 
                new BigDecimal("69990"), "adidas", "Adidas", 15, "/imagenes/p8.jpeg", true));
        productos.add(crearProducto("Adidas NMD R1", "Zapatillas urbanas modernas", 
                new BigDecimal("94990"), "adidas", "Adidas", 8, "/imagenes/adv unisex.jpeg", false));
        
        // Puma
        productos.add(crearProducto("Puma RS-X", "Zapatillas retro futuristas", 
                new BigDecimal("79990"), "puma", "Puma", 12, "/imagenes/portada.jpeg", true));
        productos.add(crearProducto("Puma Suede Classic", "Zapatillas clásicas de gamuza", 
                new BigDecimal("59990"), "puma", "Puma", 20, "/imagenes/quien.jpeg", false));
        productos.add(crearProducto("Puma Cali Sport", "Zapatillas deportivas urbanas", 
                new BigDecimal("69990"), "puma", "Puma", 15, "/imagenes/mascaro.jpeg", false));
        productos.add(crearProducto("Puma Future Rider", "Zapatillas running retro", 
                new BigDecimal("64990"), "puma", "Puma", 10, "/imagenes/jinetes.jpeg", true));
        
        // Vans
        productos.add(crearProducto("Vans Old Skool", "Zapatillas skate clásicas", 
                new BigDecimal("54990"), "vans", "Vans", 30, "/imagenes/p2.jpeg", true));
        productos.add(crearProducto("Vans Authentic", "Zapatillas casuales icónicas", 
                new BigDecimal("49990"), "vans", "Vans", 25, "/imagenes/p3.jpeg", false));
        productos.add(crearProducto("Vans Sk8-Hi", "Zapatillas altas de skate", 
                new BigDecimal("59990"), "vans", "Vans", 18, "/imagenes/p4.jpeg", false));
        productos.add(crearProducto("Vans Era", "Zapatillas skate versátiles", 
                new BigDecimal("52990"), "vans", "Vans", 22, "/imagenes/p5.jpeg", true));
        
        // Converse
        productos.add(crearProducto("Converse Chuck Taylor All Star", "Zapatillas clásicas de lona", 
                new BigDecimal("44990"), "converse", "Converse", 35, "/imagenes/p6.jpeg", true));
        productos.add(crearProducto("Converse Chuck 70", "Versión premium del clásico", 
                new BigDecimal("59990"), "converse", "Converse", 20, "/imagenes/p7.png", false));
        productos.add(crearProducto("Converse One Star", "Zapatillas retro de gamuza", 
                new BigDecimal("54990"), "converse", "Converse", 15, "/imagenes/p8.jpeg", false));
        productos.add(crearProducto("Converse Run Star Hike", "Zapatillas con plataforma", 
                new BigDecimal("69990"), "converse", "Converse", 12, "/imagenes/adv unisex.jpeg", true));
        
        return productos;
    }
    
    private Producto crearProducto(String nombre, String descripcion, BigDecimal precio, 
                                   String categoria, String marca, Integer stock, 
                                   String imagen, Boolean destacado) {
        Producto producto = new Producto();
        producto.setNombre(nombre);
        producto.setDescripcion(descripcion);
        producto.setPrecio(precio);
        producto.setCategoria(categoria);
        producto.setMarca(marca);
        producto.setStock(stock);
        producto.setImagen(imagen);
        producto.setDestacado(destacado);
        producto.setDescuento(0);
        producto.setActivo(true);
        return producto;
    }
}

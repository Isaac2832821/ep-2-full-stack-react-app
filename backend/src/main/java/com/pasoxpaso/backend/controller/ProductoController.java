package com.pasoxpaso.backend.controller;

import com.pasoxpaso.backend.dto.response.ApiResponse;
import com.pasoxpaso.backend.entity.Producto;
import com.pasoxpaso.backend.service.ProductoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/productos")
@RequiredArgsConstructor
@Tag(name = "Productos", description = "Gestión de productos")
@CrossOrigin(origins = "*")
public class ProductoController {
    
    private final ProductoService productoService;
    
    @GetMapping
    @Operation(summary = "Obtener todos los productos")
    public ResponseEntity<ApiResponse<List<Producto>>> obtenerTodos(
            @RequestParam(required = false) String categoria,
            @RequestParam(required = false) BigDecimal precioMin,
            @RequestParam(required = false) BigDecimal precioMax,
            @RequestParam(required = false) String busqueda
    ) {
        List<Producto> productos;
        
        if (categoria != null || precioMin != null || precioMax != null || busqueda != null) {
            productos = productoService.buscarProductos(categoria, precioMin, precioMax, busqueda);
        } else {
            productos = productoService.obtenerTodos();
        }
        
        return ResponseEntity.ok(ApiResponse.success(productos));
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Obtener producto por ID")
    public ResponseEntity<ApiResponse<Producto>> obtenerPorId(@PathVariable Long id) {
        try {
            Producto producto = productoService.obtenerPorId(id);
            return ResponseEntity.ok(ApiResponse.success(producto));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/destacados")
    @Operation(summary = "Obtener productos destacados")
    public ResponseEntity<ApiResponse<List<Producto>>> obtenerDestacados() {
        List<Producto> productos = productoService.obtenerDestacados();
        return ResponseEntity.ok(ApiResponse.success(productos));
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Crear nuevo producto (Solo Admin)")
    public ResponseEntity<ApiResponse<Producto>> crear(@RequestBody Producto producto) {
        try {
            Producto nuevoProducto = productoService.crear(producto);
            return ResponseEntity.ok(ApiResponse.success("Producto creado exitosamente", nuevoProducto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Actualizar producto (Solo Admin)")
    public ResponseEntity<ApiResponse<Producto>> actualizar(
            @PathVariable Long id,
            @RequestBody Producto producto
    ) {
        try {
            Producto productoActualizado = productoService.actualizar(id, producto);
            return ResponseEntity.ok(ApiResponse.success("Producto actualizado exitosamente", productoActualizado));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Eliminar producto (Solo Admin)")
    public ResponseEntity<ApiResponse<Void>> eliminar(@PathVariable Long id) {
        try {
            productoService.eliminar(id);
            return ResponseEntity.ok(ApiResponse.success("Producto eliminado exitosamente", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}

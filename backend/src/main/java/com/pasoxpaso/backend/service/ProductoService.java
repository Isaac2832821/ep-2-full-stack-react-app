package com.pasoxpaso.backend.service;

import com.pasoxpaso.backend.entity.Producto;
import com.pasoxpaso.backend.exception.ResourceNotFoundException;
import com.pasoxpaso.backend.repository.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductoService {
    
    private final ProductoRepository productoRepository;
    
    public List<Producto> obtenerTodos() {
        return productoRepository.findByActivoTrue();
    }
    
    public Producto obtenerPorId(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));
    }
    
    public List<Producto> buscarProductos(String categoria, BigDecimal precioMin, 
                                          BigDecimal precioMax, String busqueda) {
        return productoRepository.buscarProductos(categoria, precioMin, precioMax, busqueda);
    }
    
    public List<Producto> obtenerDestacados() {
        return productoRepository.findByDestacadoTrue();
    }
    
    @Transactional
    public Producto crear(Producto producto) {
        producto.setActivo(true);
        return productoRepository.save(producto);
    }
    
    @Transactional
    public Producto actualizar(Long id, Producto productoActualizado) {
        Producto producto = obtenerPorId(id);
        
        if (productoActualizado.getNombre() != null) {
            producto.setNombre(productoActualizado.getNombre());
        }
        if (productoActualizado.getDescripcion() != null) {
            producto.setDescripcion(productoActualizado.getDescripcion());
        }
        if (productoActualizado.getPrecio() != null) {
            producto.setPrecio(productoActualizado.getPrecio());
        }
        if (productoActualizado.getStock() != null) {
            producto.setStock(productoActualizado.getStock());
        }
        if (productoActualizado.getCategoria() != null) {
            producto.setCategoria(productoActualizado.getCategoria());
        }
        if (productoActualizado.getImagen() != null) {
            producto.setImagen(productoActualizado.getImagen());
        }
        if (productoActualizado.getDescuento() != null) {
            producto.setDescuento(productoActualizado.getDescuento());
        }
        
        return productoRepository.save(producto);
    }
    
    @Transactional
    public void eliminar(Long id) {
        Producto producto = obtenerPorId(id);
        producto.setActivo(false);
        productoRepository.save(producto);
    }
    
    @Transactional
    public void descontarStock(Long productoId, Integer cantidad) {
        Producto producto = obtenerPorId(productoId);
        
        if (producto.getStock() < cantidad) {
            throw new RuntimeException("Stock insuficiente");
        }
        
        producto.setStock(producto.getStock() - cantidad);
        productoRepository.save(producto);
    }
}

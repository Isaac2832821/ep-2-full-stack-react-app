package com.pasoxpaso.backend.service;

import com.pasoxpaso.backend.dto.request.CrearPedidoRequest;
import com.pasoxpaso.backend.entity.Pedido;
import com.pasoxpaso.backend.entity.PedidoItem;
import com.pasoxpaso.backend.entity.Producto;
import com.pasoxpaso.backend.entity.Usuario;
import com.pasoxpaso.backend.exception.ResourceNotFoundException;
import com.pasoxpaso.backend.repository.PedidoRepository;
import com.pasoxpaso.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PedidoService {
    
    private final PedidoRepository pedidoRepository;
    private final UsuarioRepository usuarioRepository;
    private final ProductoService productoService;
    
    public List<Pedido> obtenerPorUsuario(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        return pedidoRepository.findByUsuarioOrderByFechaDesc(usuario);
    }
    
    public Pedido obtenerPorId(Long id) {
        return pedidoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido no encontrado"));
    }
    
    public List<Pedido> obtenerTodos() {
        return pedidoRepository.findAll();
    }
    
    @Transactional
    public Pedido crear(String email, CrearPedidoRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        
        Pedido pedido = new Pedido();
        pedido.setNumero(generarNumeroPedido());
        pedido.setUsuario(usuario);
        pedido.setDireccionEnvio(request.getDireccionEnvio());
        pedido.setRegionEnvio(request.getRegionEnvio());
        pedido.setComunaEnvio(request.getComunaEnvio());
        pedido.setCodigoPostalEnvio(request.getCodigoPostalEnvio());
        pedido.setMetodoPago(request.getMetodoPago());
        pedido.setNotas(request.getNotas());
        pedido.setEstado(Pedido.EstadoPedido.PENDIENTE);
        
        // Procesar items
        for (CrearPedidoRequest.PedidoItemRequest itemRequest : request.getItems()) {
            Producto producto = productoService.obtenerPorId(itemRequest.getProductoId());
            
            // Verificar stock
            if (producto.getStock() < itemRequest.getCantidad()) {
                throw new RuntimeException("Stock insuficiente para: " + producto.getNombre());
            }
            
            PedidoItem item = new PedidoItem();
            item.setPedido(pedido);
            item.setProducto(producto);
            item.setCantidad(itemRequest.getCantidad());
            item.setPrecioUnitario(producto.getPrecio());
            item.setTalla(itemRequest.getTalla());
            item.setColor(itemRequest.getColor());
            item.calcularSubtotal();
            
            pedido.getItems().add(item);
            
            // Descontar stock
            productoService.descontarStock(producto.getId(), itemRequest.getCantidad());
        }
        
        // Calcular totales
        pedido.calcularTotales();
        
        // Guardar últimos 4 dígitos de tarjeta
        if (request.getNumeroTarjeta() != null && request.getNumeroTarjeta().length() >= 4) {
            pedido.setUltimos4Digitos(
                request.getNumeroTarjeta().substring(request.getNumeroTarjeta().length() - 4)
            );
        }
        
        return pedidoRepository.save(pedido);
    }
    
    @Transactional
    public Pedido actualizarEstado(Long id, Pedido.EstadoPedido nuevoEstado) {
        Pedido pedido = obtenerPorId(id);
        pedido.setEstado(nuevoEstado);
        return pedidoRepository.save(pedido);
    }
    
    private String generarNumeroPedido() {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        return "PED-" + timestamp;
    }
    
    public Long contarPorEstado(Pedido.EstadoPedido estado) {
        return pedidoRepository.countByEstado(estado);
    }
}

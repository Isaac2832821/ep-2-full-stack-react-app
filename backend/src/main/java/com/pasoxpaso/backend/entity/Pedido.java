package com.pasoxpaso.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pedidos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pedido {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String numero;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
    
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PedidoItem> items = new ArrayList<>();
    
    @Column(nullable = false)
    private BigDecimal subtotal;
    
    @Column(nullable = false)
    private BigDecimal iva;
    
    @Column(nullable = false)
    private BigDecimal total;
    
    private BigDecimal descuento = BigDecimal.ZERO;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoPedido estado = EstadoPedido.PENDIENTE;
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime fecha;
    
    // Dirección de envío
    private String direccionEnvio;
    private String regionEnvio;
    private String comunaEnvio;
    private String codigoPostalEnvio;
    
    // Método de pago
    private String metodoPago;
    private String ultimos4Digitos;
    
    private String notas;
    
    public enum EstadoPedido {
        PENDIENTE,
        PROCESANDO,
        EN_CAMINO,
        ENTREGADO,
        CANCELADO
    }
    
    public void calcularTotales() {
        this.subtotal = items.stream()
            .map(PedidoItem::getSubtotal)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        this.iva = subtotal.multiply(new BigDecimal("0.19"));
        this.total = subtotal.add(iva).subtract(descuento);
    }
}

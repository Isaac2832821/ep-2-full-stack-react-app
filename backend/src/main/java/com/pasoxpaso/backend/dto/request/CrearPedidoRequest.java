package com.pasoxpaso.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class CrearPedidoRequest {
    
    @NotEmpty(message = "El pedido debe tener al menos un item")
    private List<PedidoItemRequest> items;
    
    @NotBlank(message = "La dirección de envío es requerida")
    private String direccionEnvio;
    
    @NotBlank(message = "La región es requerida")
    private String regionEnvio;
    
    @NotBlank(message = "La comuna es requerida")
    private String comunaEnvio;
    
    private String codigoPostalEnvio;
    
    @NotBlank(message = "El método de pago es requerido")
    private String metodoPago;
    
    private String numeroTarjeta;
    private String nombreTitular;
    private String notas;
    
    @Data
    public static class PedidoItemRequest {
        private Long productoId;
        private Integer cantidad;
        private Integer talla;
        private String color;
    }
}

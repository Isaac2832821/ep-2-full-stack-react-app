package com.pasoxpaso.backend.controller;

import com.pasoxpaso.backend.dto.request.CrearPedidoRequest;
import com.pasoxpaso.backend.dto.response.ApiResponse;
import com.pasoxpaso.backend.entity.Pedido;
import com.pasoxpaso.backend.service.PedidoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@RequiredArgsConstructor
@Tag(name = "Pedidos", description = "Gestión de pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {
    
    private final PedidoService pedidoService;
    
    @GetMapping
    @Operation(summary = "Obtener pedidos del usuario autenticado")
    public ResponseEntity<ApiResponse<List<Pedido>>> obtenerMisPedidos(Authentication authentication) {
        String email = authentication.getName();
        List<Pedido> pedidos = pedidoService.obtenerPorUsuario(email);
        return ResponseEntity.ok(ApiResponse.success(pedidos));
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Obtener detalle de un pedido")
    public ResponseEntity<ApiResponse<Pedido>> obtenerPorId(@PathVariable Long id) {
        try {
            Pedido pedido = pedidoService.obtenerPorId(id);
            return ResponseEntity.ok(ApiResponse.success(pedido));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping
    @Operation(summary = "Crear nuevo pedido")
    public ResponseEntity<ApiResponse<Pedido>> crear(
            @Valid @RequestBody CrearPedidoRequest request,
            Authentication authentication
    ) {
        try {
            String email = authentication.getName();
            Pedido pedido = pedidoService.crear(email, request);
            return ResponseEntity.ok(ApiResponse.success("Pedido creado exitosamente", pedido));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @GetMapping("/admin/todos")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Obtener todos los pedidos (Solo Admin)")
    public ResponseEntity<ApiResponse<List<Pedido>>> obtenerTodos() {
        List<Pedido> pedidos = pedidoService.obtenerTodos();
        return ResponseEntity.ok(ApiResponse.success(pedidos));
    }
    
    @PutMapping("/{id}/estado")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Actualizar estado de pedido (Solo Admin)")
    public ResponseEntity<ApiResponse<Pedido>> actualizarEstado(
            @PathVariable Long id,
            @RequestParam Pedido.EstadoPedido estado
    ) {
        try {
            Pedido pedido = pedidoService.actualizarEstado(id, estado);
            return ResponseEntity.ok(ApiResponse.success("Estado actualizado exitosamente", pedido));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}

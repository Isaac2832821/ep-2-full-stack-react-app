package com.pasoxpaso.backend.repository;

import com.pasoxpaso.backend.entity.Pedido;
import com.pasoxpaso.backend.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByUsuarioOrderByFechaDesc(Usuario usuario);
    List<Pedido> findByEstadoOrderByFechaDesc(Pedido.EstadoPedido estado);
    Long countByEstado(Pedido.EstadoPedido estado);
}

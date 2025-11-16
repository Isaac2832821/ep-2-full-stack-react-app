package com.pasoxpaso.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private UsuarioResponse usuario;
    
    @Data
    @AllArgsConstructor
    public static class UsuarioResponse {
        private Long id;
        private String nombre;
        private String email;
        private String rol;
    }
}

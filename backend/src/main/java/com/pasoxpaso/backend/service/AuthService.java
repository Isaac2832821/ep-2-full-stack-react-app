package com.pasoxpaso.backend.service;

import com.pasoxpaso.backend.dto.request.LoginRequest;
import com.pasoxpaso.backend.dto.request.RegisterRequest;
import com.pasoxpaso.backend.dto.response.AuthResponse;
import com.pasoxpaso.backend.entity.Usuario;
import com.pasoxpaso.backend.repository.UsuarioRepository;
import com.pasoxpaso.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    
    public AuthResponse register(RegisterRequest request) {
        // Verificar si el email ya existe
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }
        
        // Verificar si el RUT ya existe
        if (request.getRut() != null && usuarioRepository.existsByRut(request.getRut())) {
            throw new RuntimeException("El RUT ya está registrado");
        }
        
        // Crear nuevo usuario
        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setEmail(request.getEmail());
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        usuario.setRut(request.getRut());
        usuario.setTelefono(request.getTelefono());
        usuario.setDireccion(request.getDireccion());
        usuario.setRegion(request.getRegion());
        usuario.setComuna(request.getComuna());
        usuario.setCodigoPostal(request.getCodigoPostal());
        usuario.setRol(Usuario.Rol.USUARIO);
        usuario.setActivo(true);
        
        usuarioRepository.save(usuario);
        
        // Generar token
        UserDetails userDetails = userDetailsService.loadUserByUsername(usuario.getEmail());
        String token = jwtUtil.generateToken(userDetails);
        
        return new AuthResponse(
                token,
                new AuthResponse.UsuarioResponse(
                        usuario.getId(),
                        usuario.getNombre(),
                        usuario.getEmail(),
                        usuario.getRol().name()
                )
        );
    }
    
    public AuthResponse login(LoginRequest request) {
        // Autenticar
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        
        // Obtener usuario
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        // Generar token
        UserDetails userDetails = userDetailsService.loadUserByUsername(usuario.getEmail());
        String token = jwtUtil.generateToken(userDetails);
        
        return new AuthResponse(
                token,
                new AuthResponse.UsuarioResponse(
                        usuario.getId(),
                        usuario.getNombre(),
                        usuario.getEmail(),
                        usuario.getRol().name()
                )
        );
    }
}

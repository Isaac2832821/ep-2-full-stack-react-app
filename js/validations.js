document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando validaciones...');
    
    const registroForm = document.getElementById('registro-form');
    const loginForm = document.getElementById('login-form');
    const contactForm = document.getElementById('contact-form');
    
    console.log('Formularios detectados:', { 
        registro: registroForm !== null, 
        login: loginForm !== null, 
        contacto: contactForm !== null 
    });
    
    if (registroForm) {
        configurarValidacionRegistro();
        console.log('Validación de registro configurada');
    } 
    
    if (loginForm) {
        configurarValidacionLogin();
        console.log('Validación de login configurada');
    } 
    
    if (contactForm) {
        configurarValidacionContacto();
        console.log('Validación de contacto configurada');
    }
    
    function configurarValidacionRegistro() {
        const form = document.getElementById('registro-form');
        const nombreInput = document.getElementById('nombre');
        const runInput = document.getElementById('run');
        const emailInput = document.getElementById('email');
        const telefonoInput = document.getElementById('telefono');
        const regionSelect = document.getElementById('region');
        const comunaSelect = document.getElementById('comuna');
        const direccionInput = document.getElementById('direccion');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirm-password');
        
        runInput.addEventListener('input', function() {
            const start = this.selectionStart;
            const end = this.selectionEnd;
            const valorOriginal = this.value;
            
            this.value = formatearRUN(valorOriginal);
            
            if (valorOriginal !== this.value) {
                const diff = this.value.length - valorOriginal.length;
                this.setSelectionRange(start + diff, end + diff);
            }
        });
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            if (!nombreInput.value.trim()) {
                mostrarError(nombreInput, 'El nombre es obligatorio');
                isValid = false;
            } else if (nombreInput.value.length > 100) {
                mostrarError(nombreInput, 'El nombre no puede exceder los 100 caracteres');
                isValid = false;
            } else {
                limpiarError(nombreInput);
            }
            
            if (!runInput.value.trim()) {
                mostrarError(runInput, 'El RUN es obligatorio');
                isValid = false;
            } else if (!validarRUN(runInput.value)) {
                mostrarError(runInput, 'El RUN no es válido');
                isValid = false;
            } else {
                limpiarError(runInput);
            }
            
            if (!emailInput.value.trim()) {
                mostrarError(emailInput, 'El email es obligatorio');
                isValid = false;
            } else if (!validarEmail(emailInput.value)) {
                mostrarError(emailInput, 'El email no es válido o no tiene un dominio permitido');
                isValid = false;
            } else {
                limpiarError(emailInput);
            }
            
            if (telefonoInput.value.trim() && !validarTelefono(telefonoInput.value)) {
                mostrarError(telefonoInput, 'El formato del teléfono no es válido');
                isValid = false;
            } else {
                limpiarError(telefonoInput);
            }
            
            if (!regionSelect.value) {
                mostrarError(regionSelect, 'Debe seleccionar una región');
                isValid = false;
            } else {
                limpiarError(regionSelect);
            }
            
            if (!comunaSelect.value) {
                mostrarError(comunaSelect, 'Debe seleccionar una comuna');
                isValid = false;
            } else {
                limpiarError(comunaSelect);
            }
            
            if (!direccionInput.value.trim()) {
                mostrarError(direccionInput, 'La dirección es obligatoria');
                isValid = false;
            } else if (direccionInput.value.length > 300) {
                mostrarError(direccionInput, 'La dirección no puede exceder los 300 caracteres');
                isValid = false;
            } else {
                limpiarError(direccionInput);
            }
            
            if (!passwordInput.value) {
                mostrarError(passwordInput, 'La contraseña es obligatoria');
                isValid = false;
            } else if (passwordInput.value.length < 6) {
                mostrarError(passwordInput, 'La contraseña debe tener al menos 6 caracteres');
                isValid = false;
            } else {
                limpiarError(passwordInput);
            }
            
            if (!confirmPasswordInput.value) {
                mostrarError(confirmPasswordInput, 'Debe confirmar la contraseña');
                isValid = false;
            } else if (confirmPasswordInput.value !== passwordInput.value) {
                mostrarError(confirmPasswordInput, 'Las contraseñas no coinciden');
                isValid = false;
            } else {
                limpiarError(confirmPasswordInput);
            }
            
            if (isValid) {
                const usuario = {
                    nombre: nombreInput.value.trim(),
                    run: runInput.value.trim(),
                    email: emailInput.value.trim(),
                    telefono: telefonoInput.value.trim() || 'No proporcionado',
                    region: regionSelect.value,
                    comuna: comunaSelect.value,
                    direccion: direccionInput.value.trim(),
                    password: passwordInput.value, 
                    fechaRegistro: new Date().toISOString()
                };
                
                guardarUsuarioEnLocalStorage(usuario);
                
                
                alert('Registro exitoso! Los datos han sido guardados.');
                form.reset();
            }
        });
        
    }
    
    function configurarValidacionLogin() {
        const loginForm = document.getElementById('login-form');
        const verificationForm = document.getElementById('verification-form');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const verificationCodeInput = document.getElementById('verification-code');
        const verificationEmailSpan = document.getElementById('verification-email');
        const resendCodeBtn = document.getElementById('resend-code');
        const backToLoginBtn = document.getElementById('back-to-login');
        
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            let isValid = true;
            
            if (!emailInput.value.trim()) {
                mostrarError(emailInput, 'El email es obligatorio');
                isValid = false;
            } else if (!validarEmail(emailInput.value)) {
                mostrarError(emailInput, 'El email no es válido o no tiene un dominio permitido');
                isValid = false;
            } else {
                limpiarError(emailInput);
            }
            
            if (!passwordInput.value) {
                mostrarError(passwordInput, 'La contraseña es obligatoria');
                isValid = false;
            } else {
                limpiarError(passwordInput);
            }
            
            if (isValid) {
                const usuarios = obtenerUsuariosDeLocalStorage();
                const usuario = usuarios.find(u => u.email === emailInput.value.trim() && u.password === passwordInput.value);
                
                if (usuario) {
                    try {
                        const submitBtn = loginForm.querySelector('button[type="submit"]');
                        const originalText = submitBtn.textContent;
                        submitBtn.disabled = true;
                        submitBtn.textContent = 'Verificando...';
                        
                        console.log('Iniciando autenticación de dos factores para:', usuario.email);
                        
                        await window.twoFactorAuth.iniciarAutenticacionDosFactores(usuario);
                        
                        console.log('Autenticación de dos factores iniciada correctamente');
                        
                        loginForm.classList.remove('active');
                        loginForm.classList.add('hidden');
                        verificationForm.classList.remove('hidden');
                        verificationForm.classList.add('active');
                        
                        verificationEmailSpan.textContent = emailInput.value.trim();
                        
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                    } catch (error) {
                        console.error('Error al iniciar autenticación de dos factores:', error);
                        alert('Ha ocurrido un error al enviar el código de verificación. Por favor, intente nuevamente.');
                    }
                } else {
                    const emailExiste = usuarios.some(u => u.email === emailInput.value.trim());
                    if (emailExiste) {
                        alert('Contraseña incorrecta. Por favor, intente nuevamente.');
                    } else {
                        alert('Usuario no registrado. Por favor, regístrese antes de iniciar sesión.');
                    }
                }
            }
        });
        
        if (verificationForm) {
            verificationForm.addEventListener('submit', function(e) {
                e.preventDefault();
                let isValid = true;
                
                const codigo = verificationCodeInput.value.trim();
                if (!codigo) {
                    mostrarError(verificationCodeInput, 'El código de verificación es obligatorio');
                    isValid = false;
                } else if (!/^\d{6}$/.test(codigo)) {
                    mostrarError(verificationCodeInput, 'El código debe contener 6 dígitos');
                    isValid = false;
                } else {
                    limpiarError(verificationCodeInput);
                }
                
                if (isValid) {
                    if (window.twoFactorAuth.verificarCodigo(codigo)) {
                        const usuario = window.twoFactorAuth.completarAutenticacion();
                        if (usuario) {
                            alert(`Bienvenido ${usuario.nombre}! Inicio de sesión exitoso.`);
                            verificationForm.reset();
                            window.location.href = 'mi-cuenta.html';
                        } else {
                            alert('Ha ocurrido un error. Por favor, intente iniciar sesión nuevamente.');
                            volverAInicioSesion();
                        }
                    } else {
                        mostrarError(verificationCodeInput, 'Código incorrecto o expirado');
                    }
                }
            });
            
            if (resendCodeBtn) {
                resendCodeBtn.addEventListener('click', async function() {
                    const tfaData = window.twoFactorAuth.obtenerDatosVerificacion();
                    if (!tfaData) {
                        alert('La sesión ha expirado. Por favor, inicie sesión nuevamente.');
                        volverAInicioSesion();
                        return;
                    }
                    
                    try {
                        resendCodeBtn.disabled = true;
                        resendCodeBtn.textContent = 'Enviando...';
                        
                        await window.twoFactorAuth.iniciarAutenticacionDosFactores(tfaData.usuario);
                        
                        alert('Se ha enviado un nuevo código de verificación.');
                        
                        resendCodeBtn.disabled = false;
                        resendCodeBtn.textContent = 'Reenviar código';
                    } catch (error) {
                        console.error('Error al reenviar código:', error);
                        alert('Ha ocurrido un error al reenviar el código. Por favor, intente nuevamente.');
                        resendCodeBtn.disabled = false;
                        resendCodeBtn.textContent = 'Reenviar código';
                    }
                });
            }
            
            if (backToLoginBtn) {
                backToLoginBtn.addEventListener('click', volverAInicioSesion);
            }
            
            function volverAInicioSesion() {
                window.twoFactorAuth.limpiarDatosVerificacion();
                
                verificationForm.classList.remove('active');
                verificationForm.classList.add('hidden');
                loginForm.classList.remove('hidden');
                loginForm.classList.add('active');
                
                verificationForm.reset();
            }
        }
    }
    
    function configurarValidacionContacto() {
        const form = document.getElementById('contact-form');
        const nombreInput = document.getElementById('nombre');
        const emailInput = document.getElementById('email');
        const asuntoInput = document.getElementById('asunto');
        const mensajeInput = document.getElementById('mensaje');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            if (!nombreInput.value.trim()) {
                mostrarError(nombreInput, 'El nombre es obligatorio');
                isValid = false;
            } else {
                limpiarError(nombreInput);
            }
            
            if (!emailInput.value.trim()) {
                mostrarError(emailInput, 'El email es obligatorio');
                isValid = false;
            } else if (!validarEmail(emailInput.value)) {
                mostrarError(emailInput, 'El email no es válido');
                isValid = false;
            } else {
                limpiarError(emailInput);
            }
            
            // Validar asunto
            if (!asuntoInput.value.trim()) {
                mostrarError(asuntoInput, 'El asunto es obligatorio');
                isValid = false;
            } else {
                limpiarError(asuntoInput);
            }
            
            // Validar mensaje
            if (!mensajeInput.value.trim()) {
                mostrarError(mensajeInput, 'El mensaje es obligatorio');
                isValid = false;
            } else {
                limpiarError(mensajeInput);
            }
            
            if (isValid) {
                alert('Mensaje enviado con éxito!');
                form.reset();
            }
        });
    }
    
    // Funciones auxiliares
    function mostrarError(input, mensaje) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        formGroup.classList.add('error');
        errorMessage.textContent = mensaje;
    }
    
    function limpiarError(input) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
        errorMessage.textContent = '';
    }
    
    function validarEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
        return regex.test(email);
    }
    
    function validarTelefono(telefono) {
        const regex = /^\+?56?[0-9]{9}$/;
        return regex.test(telefono);
    }
    
    function validarRUN(run) {
        try {
            // Importar la función desde run-validator.js si está disponible
            if (typeof window.validarRUN === 'function') {
                return window.validarRUN(run);
            } else {
                // Validación básica como respaldo
                const regex = /^\d{1,2}\.?\d{3}\.?\d{3}-[0-9kK]$/;
                return regex.test(run);
            }
        } catch (error) {
            console.error('Error al validar RUN:', error);
            return false;
        }
    }
    
    // Funciones para manejo de localStorage y generación de archivo TXT
    function guardarUsuarioEnLocalStorage(usuario) {
        // Obtener usuarios existentes
        const usuarios = obtenerUsuariosDeLocalStorage();
        
        // Verificar si el usuario ya existe (por RUN o email)
        const usuarioExistente = usuarios.findIndex(u => u.run === usuario.run || u.email === usuario.email);
        
        if (usuarioExistente >= 0) {
            // Actualizar usuario existente
            usuarios[usuarioExistente] = usuario;
        } else {
            // Agregar nuevo usuario
            usuarios.push(usuario);
        }
        
        // Guardar en localStorage
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
    
    function obtenerUsuariosDeLocalStorage() {
        const usuariosJSON = localStorage.getItem('usuarios');
        return usuariosJSON ? JSON.parse(usuariosJSON) : [];
    }
    
    function generarArchivoTextoUsuarios() {
        const usuarios = obtenerUsuariosDeLocalStorage();
        
        if (usuarios.length === 0) {
            alert('No hay usuarios registrados para generar el archivo.');
            return;
        }
        
        let contenido = 'REGISTRO DE USUARIOS\n';
        contenido += '===================\n\n';
        
        usuarios.forEach((usuario, index) => {
            contenido += `USUARIO ${index + 1}\n`;
            contenido += `Nombre: ${usuario.nombre}\n`;
            contenido += `RUN: ${usuario.run}\n`;
            contenido += `Email: ${usuario.email}\n`;
            contenido += `Teléfono: ${usuario.telefono}\n`;
            contenido += `Región: ${usuario.region}\n`;
            contenido += `Comuna: ${usuario.comuna}\n`;
            contenido += `Dirección: ${usuario.direccion}\n`;
            contenido += `Fecha de registro: ${new Date(usuario.fechaRegistro).toLocaleString('es-CL')}\n`;
            contenido += '-------------------\n\n';
        });
        
        // Crear blob y enlace de descarga
        const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'usuarios_registrados.txt';
        document.body.appendChild(a);
        a.click();
        
        // Limpiar
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 0);
    }
});
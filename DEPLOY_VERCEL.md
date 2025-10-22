# 🚀 Guía de Deployment en Vercel - PasoxPaso

## ✅ Opción Recomendada: Deploy desde GitHub (Más Fácil)

### Paso 1: Preparar el Repositorio en GitHub

1. **Crear repositorio en GitHub**
   - Ve a https://github.com/new
   - Nombre: `pasoxpaso-react` (o el que prefieras)
   - Público o Privado (tu elección)
   - NO inicialices con README (ya tienes archivos)

2. **Subir tu código a GitHub**
   ```bash
   # Desde la raíz de tu proyecto (donde está la carpeta react-app)
   git init
   git add .
   git commit -m "Initial commit - PasoxPaso React App"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/pasoxpaso-react.git
   git push -u origin main
   ```

### Paso 2: Crear Cuenta en Vercel

1. Ve a https://vercel.com/signup
2. Regístrate con tu cuenta de GitHub (recomendado)
3. Autoriza a Vercel para acceder a tus repositorios

### Paso 3: Importar Proyecto en Vercel

1. **En Vercel Dashboard:**
   - Click en "Add New..." → "Project"
   - Selecciona "Import Git Repository"
   - Busca tu repositorio `pasoxpaso-react`
   - Click en "Import"

2. **Configurar el Proyecto:**
   ```
   Framework Preset: Create React App
   Root Directory: react-app
   Build Command: npm run build
   Output Directory: build
   Install Command: npm install
   ```

3. **Variables de Entorno (Opcional):**
   - Si necesitas variables de entorno, agrégalas aquí
   - Por ahora no son necesarias

4. **Deploy:**
   - Click en "Deploy"
   - Espera 2-3 minutos mientras Vercel hace el build
   - ¡Listo! Tu sitio estará en línea

### Paso 4: Obtener tu URL

Tu sitio estará disponible en:
```
https://pasoxpaso-react.vercel.app
```

O el nombre que Vercel le asigne automáticamente.

---

## 🎯 Opción Alternativa: Deploy con Vercel CLI

### Paso 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Paso 2: Login en Vercel

```bash
vercel login
```

Sigue las instrucciones en tu navegador para autenticarte.

### Paso 3: Deploy

```bash
# Navega a la carpeta react-app
cd react-app

# Deploy (primera vez)
vercel

# Responde las preguntas:
# Set up and deploy? Yes
# Which scope? (tu cuenta)
# Link to existing project? No
# What's your project's name? pasoxpaso-react
# In which directory is your code located? ./
# Want to override the settings? No

# Deploy a producción
vercel --prod
```

---

## 📝 Archivo de Configuración (Opcional pero Recomendado)

Crea `react-app/vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "devCommand": "npm start",
  "installCommand": "npm install",
  "framework": "create-react-app",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Este archivo asegura que todas las rutas de React Router funcionen correctamente.

---

## 🔄 Deploy Automático

Una vez conectado con GitHub, cada vez que hagas `git push`:
1. Vercel detectará los cambios automáticamente
2. Creará un nuevo build
3. Desplegará la nueva versión
4. Te enviará un email con el resultado

```bash
# Hacer cambios en tu código
git add .
git commit -m "Actualización de la aplicación"
git push

# Vercel desplegará automáticamente
```

---

## 🌐 Configurar Dominio Personalizado

### Opción 1: Usar Dominio de Vercel (Gratis)

1. En tu proyecto en Vercel
2. Ve a "Settings" → "Domains"
3. Cambia el nombre: `tu-nombre.vercel.app`

### Opción 2: Usar tu Propio Dominio

1. En "Settings" → "Domains"
2. Click en "Add"
3. Ingresa tu dominio: `www.pasoxpaso.cl`
4. Sigue las instrucciones para configurar DNS:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

---

## ⚙️ Variables de Entorno en Vercel

Si necesitas agregar variables de entorno:

1. Ve a tu proyecto en Vercel
2. "Settings" → "Environment Variables"
3. Agrega las variables:
   ```
   REACT_APP_API_URL=https://api.pasoxpaso.cl
   REACT_APP_ENV=production
   ```
4. Redeploy para aplicar cambios

---

## 🔍 Monitoreo y Analytics

Vercel incluye analytics gratis:

1. Ve a tu proyecto
2. Click en "Analytics"
3. Verás:
   - Visitas
   - Performance
   - Errores
   - Países de origen

---

## 🐛 Troubleshooting

### Problema: Build falla

**Solución:**
```bash
# Probar build localmente primero
cd react-app
npm install
npm run build

# Si funciona localmente, el problema puede ser:
# 1. Vercel no encuentra la carpeta correcta
#    → Verifica que Root Directory sea "react-app"
# 2. Dependencias faltantes
#    → Verifica package.json
```

### Problema: Rutas 404 al refrescar

**Solución:** Asegúrate de tener el archivo `vercel.json` con los rewrites.

### Problema: Imágenes no se cargan

**Solución:** 
- Las imágenes deben estar en `react-app/public/imagenes/`
- Las rutas deben ser `/imagenes/nombre.jpg` (sin `public`)

---

## 📊 Comandos Útiles de Vercel CLI

```bash
# Ver lista de deployments
vercel ls

# Ver logs del último deployment
vercel logs

# Eliminar un deployment
vercel rm [deployment-url]

# Ver información del proyecto
vercel inspect

# Abrir el proyecto en el navegador
vercel open
```

---

## ✅ Checklist Pre-Deploy

- [ ] Código subido a GitHub
- [ ] `npm run build` funciona sin errores
- [ ] Todas las rutas funcionan localmente
- [ ] Imágenes en `public/imagenes/`
- [ ] Archivo `vercel.json` creado
- [ ] Variables de entorno configuradas (si es necesario)

---

## 🎉 Pasos Rápidos (Resumen)

```bash
# 1. Subir a GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TU-USUARIO/pasoxpaso-react.git
git push -u origin main

# 2. Ir a Vercel
# https://vercel.com/new

# 3. Importar repositorio
# - Seleccionar tu repo
# - Root Directory: react-app
# - Click Deploy

# ¡Listo! Tu sitio estará en línea en 2-3 minutos
```

---

## 🔗 Enlaces Útiles

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Documentación:** https://vercel.com/docs
- **Soporte:** https://vercel.com/support
- **Status:** https://vercel-status.com

---

## 💡 Tips Adicionales

1. **Preview Deployments:** Cada branch y PR crea un preview automático
2. **Rollback:** Puedes volver a versiones anteriores con un click
3. **Edge Network:** Tu sitio se sirve desde CDN global (muy rápido)
4. **HTTPS:** Automático y gratis
5. **Logs en Tiempo Real:** Puedes ver los logs de build en vivo

---

## 🚀 ¡Tu Sitio Estará en Línea en Minutos!

Vercel es extremadamente rápido y fácil. Una vez configurado, cada `git push` desplegará automáticamente tu aplicación.

**URL de ejemplo:** `https://pasoxpaso-react-tu-usuario.vercel.app`

¡Buena suerte con tu deployment! 🎉

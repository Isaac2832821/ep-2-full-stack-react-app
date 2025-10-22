# 🚀 Deployment en Vercel - Guía Rápida

## 📋 Opción 1: Deploy Automático desde GitHub (RECOMENDADO)

### Pasos:

1. **Sube tu código a GitHub:**
   ```bash
   # Desde la raíz del proyecto (donde está react-app)
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/TU-USUARIO/pasoxpaso-react.git
   git push -u origin main
   ```

2. **Ve a Vercel:**
   - https://vercel.com/signup
   - Regístrate con GitHub

3. **Importa tu proyecto:**
   - Click en "Add New..." → "Project"
   - Selecciona tu repositorio
   - Configuración:
     - **Root Directory:** `react-app`
     - **Framework:** Create React App
     - **Build Command:** `npm run build`
     - **Output Directory:** `build`
   - Click "Deploy"

4. **¡Listo!** Tu sitio estará en línea en 2-3 minutos

---

## 📋 Opción 2: Deploy con Vercel CLI

### Pasos:

1. **Instala Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   cd react-app
   vercel --prod
   ```

### O usa el script automático (Windows):
```bash
cd react-app
deploy-vercel.bat
```

---

## ✅ Verificación Pre-Deploy

Antes de desplegar, asegúrate de que todo funcione:

```bash
cd react-app
npm install
npm run build
npx serve -s build
```

Abre http://localhost:3000 y verifica que todo funcione correctamente.

---

## 🔄 Actualizar tu Sitio

Una vez desplegado con GitHub:

```bash
# Haz cambios en tu código
git add .
git commit -m "Actualización"
git push

# Vercel desplegará automáticamente
```

---

## 🌐 Tu URL

Tu sitio estará disponible en:
```
https://pasoxpaso-react-[tu-usuario].vercel.app
```

---

## 📞 ¿Problemas?

1. Revisa `DEPLOY_VERCEL.md` para guía detallada
2. Verifica que `vercel.json` exista en `react-app/`
3. Asegúrate de que el build funcione localmente primero

---

## 🎉 ¡Eso es todo!

Tu aplicación React estará en línea y accesible desde cualquier parte del mundo.

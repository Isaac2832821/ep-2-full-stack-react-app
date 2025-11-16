@echo off
echo ========================================
echo   PasoxPaso - Deploy en Vercel
echo ========================================
echo.

REM Verificar si estamos en la carpeta correcta
if not exist "package.json" (
    echo ERROR: No se encontro package.json
    echo Ejecuta este script desde la carpeta react-app
    pause
    exit /b 1
)

echo [1/4] Instalando dependencias...
call npm install
if errorlevel 1 (
    echo ERROR: Fallo la instalacion de dependencias
    pause
    exit /b 1
)

echo.
echo [2/4] Creando build de produccion...
call npm run build
if errorlevel 1 (
    echo ERROR: Fallo el build
    pause
    exit /b 1
)

echo.
echo [3/4] Verificando Vercel CLI...
where vercel >nul 2>nul
if errorlevel 1 (
    echo Instalando Vercel CLI...
    call npm install -g vercel
)

echo.
echo [4/4] Desplegando en Vercel...
echo.
echo IMPORTANTE: Si es tu primera vez, sigue las instrucciones:
echo - Set up and deploy? YES
echo - Which scope? (selecciona tu cuenta)
echo - Link to existing project? NO
echo - Project name? pasoxpaso-react
echo - In which directory is your code? ./
echo - Want to override settings? NO
echo.
pause

call vercel --prod

echo.
echo ========================================
echo   Deployment Completado!
echo ========================================
echo.
echo Tu sitio esta disponible en la URL mostrada arriba
echo.
pause

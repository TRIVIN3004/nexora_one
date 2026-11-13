@echo off
echo ============================================================
echo   NEXORA ONE — MULTI-PLATFORM UNIFIED APP BUILD SCRIPT
echo ============================================================
echo.
cd /d "%~dp0"
echo [1/3] Compiling TypeScript & Building Web + PWA Bundle...
call npm run build
if %errorlevel% neq 0 (
  echo [ERROR] Web build failed.
  pause
  exit /b %errorlevel%
)
echo.
echo [2/3] Synchronizing Native Android & iOS Platforms...
call npx cap sync
if %errorlevel% neq 0 (
  echo [ERROR] Capacitor sync failed.
  pause
  exit /b %errorlevel%
)
echo.
echo [3/3] Synchronization Succeeded!
echo - Android: Synced to android/app/src/main/assets/public
echo - iOS:     Synced to ios/App/App/public
echo - Desktop: Built in dist/ (Electron ready)
echo.
echo ============================================================
echo   ALL 5 PORTALS COMPILED AND SYNCED SUCCESSFULLY!
echo ============================================================
pause


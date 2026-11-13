@echo off
echo Starting Nexora One Desktop Workstation...
cd /d "%~dp0"
if exist "dist_desktop\win-unpacked\Nexora One.exe" (
  start "" "dist_desktop\win-unpacked\Nexora One.exe"
) else (
  call npm run desktop
)

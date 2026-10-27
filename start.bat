@echo off
title Velvet Brew Cafe Launcher
echo ===================================================
echo   Starting Velvet Brew Cafe Full-Stack Services
echo ===================================================
echo.
echo Starting Backend Server on http://localhost:5000 ...
start "Velvet Brew - Backend (Port 5000)" cmd /k "cd /d %~dp0server && node server.js"

echo Starting Frontend Dev Server on http://localhost:5173 ...
start "Velvet Brew - Frontend (Port 5173)" cmd /k "cd /d %~dp0client && npm run dev"

echo.
echo ===================================================
echo   Services are running!
echo   Frontend : http://localhost:5173
echo   Backend  : http://localhost:5000
echo ===================================================

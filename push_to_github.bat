@echo off
title Push Naveenraja Portfolio to GitHub
color 0b

echo ========================================================
echo       Naveenraja K - Portfolio GitHub Deployment
echo ========================================================
echo.
echo Please enter your GitHub Username (e.g., naveenraja-k):
set /p GH_USER="GitHub Username: "

if "%GH_USER%"=="" (
    echo Username cannot be empty!
    pause
    exit /b
)

echo.
echo Adding remote: https://github.com/%GH_USER%/portfolio.git
git remote remove origin 2>nul
git remote add origin https://github.com/%GH_USER%/portfolio.git
git branch -M main

echo.
echo Pushing code to GitHub...
echo (A browser popup may appear asking you to Sign in to GitHub)
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================================
    echo SUCCESS! Your portfolio code is uploaded to GitHub!
    echo.
    echo Next Step:
    echo 1. Go to: https://github.com/%GH_USER%/portfolio/settings/pages
    echo 2. Under 'Branch', select 'main' and click 'Save'.
    echo 3. Your Live Website will be ready in 1 minute at:
    echo    https://%GH_USER%.github.io/portfolio
    echo ========================================================
) else (
    echo.
    echo Make sure you have created the repository 'portfolio' on https://github.com/new first!
)

echo.
pause

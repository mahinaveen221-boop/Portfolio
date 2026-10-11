@echo off
title Push Naveenraja Portfolio to GitHub
color 0b

echo ========================================================
echo       Naveenraja K - Portfolio GitHub Deployment
echo ========================================================
echo.
echo Current Username default: mahinaveen221-boop
echo (If you changed it on GitHub, type your new username below, e.g. mahinaveen221)
echo.
set /p GH_USER="Enter your GitHub Username [Press Enter for mahinaveen221-boop]: "

if "%GH_USER%"=="" (
    set GH_USER=mahinaveen221-boop
)

echo.
echo Connecting to: https://github.com/%GH_USER%/portfolio.git
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
    echo NOTE: Make sure you created a new repository named 'portfolio'
    echo on https://github.com/new first!
)

echo.
pause

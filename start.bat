@echo off
title Handyman App

:: ── Set paths ────────────────────────────────────────────────────────────────
set PATH=%PATH%;C:\Program Files\nodejs;C:\Users\avasq\AppData\Local\Android\Sdk\platform-tools
set ANDROID_HOME=C:\Users\avasq\AppData\Local\Android\Sdk

:: ── Boot the emulator if none is running ─────────────────────────────────────
adb devices | findstr "emulator" >nul 2>&1
if errorlevel 1 (
    echo Starting Android emulator...
    start "" "%ANDROID_HOME%\emulator\emulator.exe" -avd Pixel_8 -no-snapshot-load
    echo Waiting for emulator to boot...
    timeout /t 20 /nobreak >nul
)

:: ── Start Expo ────────────────────────────────────────────────────────────────
echo Starting Expo...
cd /d C:\Users\avasq\Handyman
node node_modules/expo/bin/cli start --android

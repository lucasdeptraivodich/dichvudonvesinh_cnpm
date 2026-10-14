@echo off
REM ============================================================
REM  Mo firewall cho port 3000 de may khac trong cung WiFi
REM  vao duoc web Cleanova.
REM
REM  CACH DUNG:
REM   1. Bam chuot phai vao file nay
REM   2. Chon "Run as administrator"
REM ============================================================

net session >nul 2>&1
if %errorlevel% neq 0 (
    echo [LOI] Ban phai chay file nay bang quyen Administrator!
    echo       Bam chuot phai -^> Run as administrator
    echo.
    pause
    exit /b 1
)

echo Dang mo firewall cho port 3000...
netsh advfirewall firewall delete rule name="Cleanova Port 3000" >nul 2>&1
netsh advfirewall firewall add rule name="Cleanova Port 3000" dir=in action=allow protocol=TCP localport=3000

if %errorlevel% equ 0 (
    echo.
    echo [THANH CONG] Da mo port 3000.
    echo Bay gio may khac trong cung WiFi co the vao bang dia chi:
    echo    http://192.168.1.8:3000
) else (
    echo.
    echo [LOI] Khong mo duoc. Thu lai bang quyen Administrator.
)

echo.
pause

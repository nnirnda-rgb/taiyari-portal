@echo off
chcp 65001 >nul
title Yuva Shiksha Portal - Private Admin Gateway [Abhishek Fanat]
color 0b
cls
echo ======================================================================
echo    युवा शिक्षा पोर्टल | ॥ निःशुल्क जन-शिक्षा संकल्प ॥
echo    Authorized Administrator Gateway: Abhishek Fanat (abhishekfanat7@gmail.com)
echo ======================================================================
echo.
echo  [*] Verifying Authorized Admin Credentials...
echo  [*] Target Access: Abhishek Fanat Private Management Hub
echo  [*] Whitelist Account: abhishekfanat7@gmail.com
echo  [*] Launching Secure Admin Window: https://taiyari-portal.vercel.app/admin
echo.
start https://taiyari-portal.vercel.app/admin
echo  [✓] Secure Admin Window Launched!
echo ======================================================================
timeout /t 4 >nul
exit

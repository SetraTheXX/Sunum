@echo off
rem Sunumu internet ve kurulum olmadan acar: Windows'un yerlesik PowerShell'i dist\ klasorunu http://localhost:8000 adresinden sunar.
title Sunum - yerel sunucu (kapatinca sunum durur)
cd /d "%~dp0"
if not exist "%~dp0dist\index.html" (
  echo dist klasoru bulunamadi. Bu dosyayi ZIP'ten cikarilan Sunum-final-backup klasorunde calistirin.
  pause
  exit /b 1
)
rem PowerShell is called by its fixed system path so a changed PATH cannot hide it.
rem The script is loaded as text so a restrictive script-execution policy does not block it; no administrator rights are needed.
"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -ExecutionPolicy Bypass -Command "$s = [scriptblock]::Create([IO.File]::ReadAllText('%~dp0offline\serve.ps1', [Text.Encoding]::UTF8)); & $s -Root '%~dp0dist' -NoBrowser:($env:SUNUM_NO_BROWSER -eq '1')"
if errorlevel 1 (
  echo.
  echo Yerel sunucu baslatilamadi. README-OFFLINE.txt dosyasindaki "Sorun olursa" bolumune bakin.
  pause
)

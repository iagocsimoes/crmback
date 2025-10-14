@echo off
echo ========================================
echo  SETUP DO BANCO DE DADOS - VERT CRM
echo ========================================
echo.

echo [1/4] Limpando banco de dados...
del /F prisma\dev.db 2>nul
echo OK - Banco removido

echo.
echo [2/4] Criando estrutura do banco...
call npx prisma migrate dev --name init
echo OK - Estrutura criada

echo.
echo [3/4] Importando dados do Excel...
call node import-data.js
echo OK - Dados importados

echo.
echo [4/4] Iniciando servidor...
echo.
echo ========================================
echo  SERVIDOR INICIANDO NA PORTA 3333
echo ========================================
echo.
call npm start

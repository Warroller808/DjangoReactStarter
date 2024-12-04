@echo off
echo Activating virtual environment...
call ..\env\Scripts\activate.bat

echo Starting Django development server...
python manage.py runserver 0.0.0.0:8000

rem Vérifier le code de retour de la commande runserver
if errorlevel 1 (
    echo Error occurred. Press any key to exit...
    pause >nul
) else (
    echo Deactivating virtual environment...
    deactivate
    echo Press any key to exit...
    pause >nul
)
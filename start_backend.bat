@echo off
echo ========================================================
echo Starting MVIT Autonomous Agent Backend (FastAPI)...
echo ========================================================
cd /d "%~dp0agent_backend"
if exist "venv\Scripts\python.exe" (
    venv\Scripts\python.exe -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
) else (
    echo [ERROR] Virtual environment not found at agent_backend\venv!
    pause
)

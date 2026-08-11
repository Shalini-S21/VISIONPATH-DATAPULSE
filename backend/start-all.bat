@echo off
echo =====================================================
echo   VisionPath Backend Startup Script
echo   Starts all 12 services + API Gateway
echo =====================================================
echo.
echo IMPORTANT: MySQL must be running before starting services.
echo.

set BASE_DIR=%~dp0

echo [1/13] Starting API Gateway (port 8080)...
start "API-Gateway" cmd /k "cd /d %BASE_DIR%api-gateway && mvn spring-boot:run"
timeout /t 5 /nobreak > nul

echo [2/13] Starting Auth Service (port 8081)...
start "Auth-Service" cmd /k "cd /d %BASE_DIR%auth-service && mvn spring-boot:run"
timeout /t 5 /nobreak > nul

echo [3/13] Starting Student Service (port 8082)...
start "Student-Service" cmd /k "cd /d %BASE_DIR%student-service && mvn spring-boot:run"
timeout /t 5 /nobreak > nul

echo [4/13] Starting Career Service (port 8083)...
start "Career-Service" cmd /k "cd /d %BASE_DIR%career-service && mvn spring-boot:run"
timeout /t 5 /nobreak > nul

echo [5/13] Starting Education Service (port 8084)...
start "Education-Service" cmd /k "cd /d %BASE_DIR%education-service && mvn spring-boot:run"
timeout /t 5 /nobreak > nul

echo [6/13] Starting Jobs Service (port 8085)...
start "Jobs-Service" cmd /k "cd /d %BASE_DIR%jobs-service && mvn spring-boot:run"
timeout /t 5 /nobreak > nul

echo [7/13] Starting Assessment Service (port 8086)...
start "Assessment-Service" cmd /k "cd /d %BASE_DIR%assessment-service && mvn spring-boot:run"
timeout /t 5 /nobreak > nul

echo [8/13] Starting AI Mentor Service (port 8087)...
start "AI-Mentor-Service" cmd /k "cd /d %BASE_DIR%ai-mentor-service && mvn spring-boot:run"
timeout /t 5 /nobreak > nul

echo [9/13] Starting Study Plan Service (port 8088)...
start "Study-Plan-Service" cmd /k "cd /d %BASE_DIR%study-plan-service && mvn spring-boot:run"
timeout /t 5 /nobreak > nul

echo [10/13] Starting Progress Service (port 8089)...
start "Progress-Service" cmd /k "cd /d %BASE_DIR%progress-service && mvn spring-boot:run"
timeout /t 5 /nobreak > nul

echo [11/13] Starting Counselor Service (port 8090)...
start "Counselor-Service" cmd /k "cd /d %BASE_DIR%counselor-service && mvn spring-boot:run"
timeout /t 5 /nobreak > nul

echo [12/13] Starting Notification Service (port 8091)...
start "Notification-Service" cmd /k "cd /d %BASE_DIR%notification-service && mvn spring-boot:run"
timeout /t 5 /nobreak > nul

echo [13/13] Starting Admin Service (port 8092)...
start "Admin-Service" cmd /k "cd /d %BASE_DIR%admin-service && mvn spring-boot:run"

echo.
echo =====================================================
echo   All services started! Wait 90 seconds for all
echo   services to fully start, then test:
echo.
echo   API Gateway:   http://localhost:8080/actuator/health
echo   Auth Swagger:  http://localhost:8081/swagger-ui/index.html
echo   Admin Stats:   http://localhost:8080/api/admin/stats
echo =====================================================
echo.
pause

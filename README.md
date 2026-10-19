<!--
  Module: Documentation
  Description: Execution and architecture guide for Community E-commerce SaaS Platform
  Created: 2026-10-19
  by: Bastian Proboste :D

  Changelog:
  - 2026-10-19 [v1.0.0]: Initial comprehensive deployment and execution guide.
-->

# Plataforma E-commerce SaaS Comunitaria (Sprint 1)

Arquitectura modular para plataforma de comercio electronico SaaS orientada a comunidades y cooperativas de artesanos y productores locales. Diseno basado en Arquitectura Hexagonal y base de datos hibrida (PostgreSQL para transacciones y MongoDB para catalogo polimorfico).

---

## 1. Opcion A: Ejecucion Rapida con Docker (Recomendado)

Asegurate de tener instalado y en ejecucion **Docker Desktop**.

### Paso 1: Configurar Variables de Entorno
Abre una terminal (PowerShell o CMD) en la raiz del proyecto y copia la plantilla:
```powershell
Copy-Item .env.example .env
```
*(En CMD tradicional puedes usar `copy .env.example .env`)*.

### Paso 2: Construir y Levantar Contenedores
Ejecuta el siguiente comando en la raiz:
```bash
docker compose up --build -d
```

### Paso 3: Verificar Estado de los Servicios
Verifica que los 4 contenedores esten saludables (`healthy`) y en ejecucion:
```bash
docker compose ps
```

### Paso 4: Probar la Plataforma
- **Frontend (Web Application)**: [http://localhost:3000](http://localhost:3000)
- **Backend API (Django REST Framework)**: [http://localhost:8000/api/](http://localhost:8000/api/)
- **Endpoints de Verificacion**:
  - Tiendas: [http://localhost:8000/api/stores/](http://localhost:8000/api/stores/)
  - Catalogo: [http://localhost:8000/api/products/](http://localhost:8000/api/products/)

### Paso 5: Detener Contenedores
Para detener todos los servicios:
```bash
docker compose down
```

---

## 2. Opcion B: Ejecucion Nativa en Windows (Paso a Paso)

Si no dispones de Docker o deseas ejecutar el frontend y backend directamente en tu entorno Windows.

### Requisitos Previos en Windows
1. **Python 3.10+**: Comprueba con `python --version`.
2. **Node.js 18+ y npm**: Comprueba con `node --version` y `npm --version`.
3. **Bases de Datos**:
   - **PostgreSQL 16** o utilizar el modo de respaldo SQLite (`USE_SQLITE=True`).
   - **MongoDB Community Server** en ejecucion local (`localhost:27017`).

---

### Procedimiento Backend (Terminal 1)

1. **Abrir PowerShell en la raiz del proyecto** y configurar variables de entorno:
   ```powershell
   Copy-Item .env.example .env
   ```
   *(Si no tienes PostgreSQL instalado localmente, edita `.env` y agrega `USE_SQLITE=True`)*.

2. **Acceder al directorio del backend**:
   ```powershell
   cd backend
   ```

3. **Crear y activar el entorno virtual de Python**:
   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```
   *(Si PowerShell bloquea la ejecucion de scripts, ejecuta previamente: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`)*.

4. **Instalar dependencias**:
   ```powershell
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

5. **Aplicar migraciones de base de datos**:
   ```powershell
   python manage.py migrate
   ```

6. **Poblar datos iniciales de catalogo y tiendas**:
   ```powershell
   python manage.py seed_catalog
   ```

7. **Iniciar servidor de desarrollo**:
   ```powershell
   python manage.py runserver 0.0.0.0:8000
   ```
   *El backend estara disponible en [http://localhost:8000](http://localhost:8000)*.

---

### Procedimiento Frontend (Terminal 2)

1. **Abrir una segunda ventana de PowerShell en la raiz del proyecto**.

2. **Acceder al directorio del frontend**:
   ```powershell
   cd frontend
   ```

3. **Instalar dependencias de Node.js**:
   ```powershell
   npm install
   ```

4. **Iniciar servidor de desarrollo Vite**:
   ```powershell
   npm run dev
   ```
   *El frontend estara disponible en [http://localhost:5173](http://localhost:5173) (o el puerto indicado en la consola).*

---

## 3. Ejecucion de Pruebas Automatizadas

Para validar la suite completa de pruebas unitarias y de integracion:

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
pytest
```

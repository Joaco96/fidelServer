# 📌 Estructura y Arquitectura del Proyecto

Este documento describe la estructura del proyecto y las tecnologías utilizadas.

## 🛠️ Tecnologías Utilizadas
- **Frontend:** React
- **Backend:** Node.js con Express
- **Base de Datos:** PostgreSQL
- **Autenticación:** Auth0

---

# 📁 Estructura de Carpetas

## 🏗️ Backend (Node.js + Express)

```
/backend
│── /src
│   │── /config       # Configuración global (DB, Auth0, CORS, etc.)
│   │── /controllers  # Controladores que manejan la lógica de cada endpoint
│   │── /models       # Modelos de la BD (usando Prisma/Sequelize/TypeORM)
│   │── /routes       # Definición de rutas (API endpoints)
│   │── /services     # Lógica de negocio independiente de los controladores
│   │── /middlewares  # Middlewares como autenticación, validaciones, logs
│   │── /utils        # Funciones utilitarias reutilizables
│   │── /tests        # Pruebas unitarias e integración
│   │── index.js      # Archivo principal que arranca el servidor
│── /migrations       # Archivos de migraciones de la base de datos
│── .env              # Variables de entorno
│── package.json      # Dependencias y scripts del proyecto
│── README.md         # Documentación inicial
```

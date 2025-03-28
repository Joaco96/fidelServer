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
│   │── /domain          # Capa de dominio
│   │   │── /entities    # Entidades (clases con reglas de negocio)
│   │   │── /repositories # Interfaces de los repositorios
│   │── /application     # Capa de aplicación
│   │   │── /use-cases   # Casos de uso de la aplicación
│   │── /infrastructure  # Capa de infraestructura
│   │   │── /db          # Configuración de la BD (Prisma, Sequelize, etc.)
│   │   │── /repositories # Implementaciones de los repositorios
│   │── /presentation    # Capa de presentación (API)
│   │   │── /controllers # Controladores que manejan la API
│   │   │── /routes      # Definición de rutas
│   │   │── /middlewares # Middlewares de autenticación, validaciones, etc.
│   │── /config          # Configuración general (DB, Auth0, CORS, etc.)
│   │── /utils           # Funciones utilitarias reutilizables
│   │── /tests           # Pruebas unitarias e integración
│   │── index.js         # Archivo principal que arranca el servidor
│── /migrations          # Archivos de migraciones de la base de datos
│── .env                 # Variables de entorno
│── package.json         # Dependencias y scripts del proyecto
│── README.md            # Documentación inicial
```

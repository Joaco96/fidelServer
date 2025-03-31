import { Dialect, Sequelize } from "sequelize";
import dbConfig from "../../config/db.config";

// Usamos la connection string desde las variables de entorno (o directamente)
const databaseUrl = dbConfig.url || "postgres://user:password@localhost:5432/mydb";

export const sequelize = new Sequelize(databaseUrl, {
  dialect: dbConfig.dialect as Dialect || "postgres",
  dialectOptions: {
    ssl: {
      require: true, // Necesario si estás usando una base de datos en la nube (Ej. Heroku)
      rejectUnauthorized: false, // Evita errores de SSL si es necesario
    },
  },
  logging: false,
});

import "../db/models"; 

// Función para probar la conexión
export const testDBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a PostgreSQL en la nube con Sequelize");
  } catch (error) {
    console.error("❌ Error conectando a PostgreSQL:", error);
  }
};

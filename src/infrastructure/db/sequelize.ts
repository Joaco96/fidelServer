import { Dialect, Sequelize } from "sequelize";
import dbConfig from "../../config/db.config";

// Usamos la connection string desde las variables de entorno (o directamente)
const databaseUrl = dbConfig.url || "";

export const sequelize = new Sequelize(databaseUrl, {
  dialect: dbConfig.dialect as Dialect || "",
  dialectOptions: {
    ssl: {
      require: dbConfig.sslRequire, // Necesario si estás usando una base de datos en la nube (Ej. Heroku)
      rejectUnauthorized: dbConfig.sslRejectUnauthorized, // Evita errores de SSL si es necesario
    },
  },
  logging: dbConfig.logging,
});

// Función para probar la conexión
export const testDBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a PostgreSQL en la nube con Sequelize");
  } catch (error) {
    console.error("❌ Error conectando a PostgreSQL:", error);
  }
};

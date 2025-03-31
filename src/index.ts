import express from "express";
import { sequelize, testDBConnection } from "./infrastructure/db/sequelize";
import serverConfig from "./config/server.config";

const app = express();
app.use(express.json());

const PORT = serverConfig.port || 3000;
const bootstrapServer = async () => {
  await testDBConnection();  // Verifica la conexión

  await sequelize.sync({alter: true});  // Sincroniza modelos con la BD
  console.log("📌 Base de datos sincronizada");

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
};

bootstrapServer();
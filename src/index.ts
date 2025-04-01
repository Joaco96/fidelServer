import express from "express";
import { sequelize, testDBConnection } from "./infrastructure/db/sequelize";
import serverConfig from "./config/server.config";
import models from "./infrastructure/db/models";

const app = express();
app.use(express.json());

const PORT = serverConfig.port || 3000;
const bootstrapServer = async () => {
  await testDBConnection();  // Verifica la conexión

  await sequelize.sync({ force: false })
    .catch((err: any) => console.log(`❌ Error conectando a PostgreSQL: ${err}`));  // Sincroniza modelos con la BD
  console.log("📌 Base de datos sincronizada");

  app.listen(PORT, (err) => {
    if(err) return console.log(`❌ Error iniciando el servidor: ${err}`);
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
};

bootstrapServer();
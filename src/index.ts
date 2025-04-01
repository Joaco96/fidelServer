import express from "express";
import { sequelize, testDBConnection } from "./infrastructure/db/sequelize";
import serverConfig from "./config/server.config";
import models from "./infrastructure/db/models";

const app = express();
app.use(express.json());

const PORT = serverConfig.port || 3000;
const bootstrapServer = async () => {
  await testDBConnection();  // Verifica la conexión

  await sequelize.sync({ force: true });  // Sincroniza modelos con la BD
  console.log("📌 Base de datos sincronizada");

  // (async () => {
  //   const tables = Object.keys(sequelize.models);
  //   console.log("📌 Modelos detectados en Sequelize:", tables);
  
  //   for (const table of tables) {
  //     const description = await sequelize.getQueryInterface().describeTable(table);
  //     console.log(`🔎 Estructura de ${table}:`, description);
  //   }
  // })();
  
  // const foreignKeys = await sequelize.getQueryInterface().getForeignKeysForTables(["users"]);
  // console.log(foreignKeys);

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
};

bootstrapServer();
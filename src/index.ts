import express from "express";
import { sequelize, testDBConnection } from "./infrastructure/db/sequelize";
import serverConfig from "./config/server.config";
import routesV1 from "./presentation/routes/V1/index";
import { seedRoles } from "./infrastructure/seeders/seedRoles";

const app = express();
app.use(express.json());
app.use("/api/v1", routesV1);

const PORT = serverConfig.port || 3000;
const bootstrapServer = async () => {
  await testDBConnection();

  await sequelize
    .sync({ alter: true })
    .then(async () => {
      await seedRoles();
    })
    .catch((err: any) =>
      console.log(`❌ Error conectando a PostgreSQL: ${err}`)
    );
  console.log("📌 Base de datos sincronizada");

  app.listen(PORT, (err) => {
    if (err) return console.log(`❌ Error iniciando el servidor: ${err}`);
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
};

bootstrapServer();

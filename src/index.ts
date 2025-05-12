import express from "express";
import { sequelize } from "./infrastructure/db/sequelize";
import serverConfig from "./config/server.config";
import routesV1 from "./presentation/routes/V1/index";
import { seedRoles } from "./infrastructure/seeders/seedRoles";
import swaggerUi from "swagger-ui-express";
import { generateOpenApiDocs } from "./presentation/swagger/swagger";
import { responseFormatter } from "./infrastructure/middlewares/responseFormatter";
import { errorHandler } from "./infrastructure/middlewares/errorHandler";
import "./types/index"
import logger, { responseTimeHeader } from "./infrastructure/logger";
import { seedStores } from "./infrastructure/seeders/seedStores";
import cors from "cors";

const app = express();
app.use(responseTimeHeader);
app.use(logger);
app.use(express.json());
app.use(responseFormatter);
app.use(cors(serverConfig.cors));
app.use("/api/v1", routesV1);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(generateOpenApiDocs()));
app.use(errorHandler);

const PORT = serverConfig.port || 3000;
const bootstrapServer = async () => {
  await sequelize
    .sync({ alter: true })
    .then(async () => {
      await seedRoles();
      await seedStores();
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

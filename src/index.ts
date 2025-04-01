import express from "express";
import { sequelize, testDBConnection } from "./infrastructure/db/sequelize";
import serverConfig from "./config/server.config";
import { Points } from "./domain/entities/Points";
import { randomUUID } from "crypto";
import { User } from "./domain/entities/User";
import { PointsModel } from "./infrastructure/db/models/PointsModel";
import { UsersModel } from "./infrastructure/db/models/UsersModel";
import { Rewards } from "./domain/entities/Rewards";
import { Stock } from "./domain/entities/Stock";
import { RewardsModel } from "./infrastructure/db/models/RewardsModel";
import { StocksModel } from "./infrastructure/db/models/StocksModel";

const app = express();
app.use(express.json());

const PORT = serverConfig.port || 3000;
const bootstrapServer = async () => {
  await testDBConnection();  // Verifica la conexión

  await sequelize.sync({ alter: true })
    .then(async () => {
      // const UUID = randomUUID();
      // const newUser = new User(UUID, userUUID, "santi", "aasdada@htoma.com", "adafafafafafaf", 600, new Date(), new Date());
      // const user = await UsersModel.create({...newUser})
      // const newPoint = new Points(randomUUID(), UUID, 4500, new Date(), new Date());
      // const point = await PointsModel.create({...newPoint})
      // const newReward = new Rewards(UUID, "isadora", "viaje a cancun", 500, 10, new Date(), new Date());
      // const newStock = new Stock(randomUUID(), UUID, 5, new Date(), new Date());
      // const newStock2 = new Stock(randomUUID(), UUID, -7, new Date(), new Date());
      // await RewardsModel.create({...newReward})
      // await StocksModel.create({...newStock})
      // await StocksModel.create({...newStock2})
    })
    .catch((err: any) => console.log(`❌ Error conectando a PostgreSQL: ${err}`));  // Sincroniza modelos con la BD
  console.log("📌 Base de datos sincronizada");

  app.listen(PORT, (err) => {
    if(err) return console.log(`❌ Error iniciando el servidor: ${err}`);
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
};

bootstrapServer();
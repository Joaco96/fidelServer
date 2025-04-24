import { Request, Response } from "express";
import { SequelizeUnitOfWork } from "../../infrastructure/transactions/SequelizeUnitOfWork";
import { sequelize } from "../../infrastructure/db/sequelize";
import { RedemptionRepositorySequelize } from "../../infrastructure/repositories/RedemptionRepositorySequelize";
import { CreateRedemption } from "../../application/use-cases/Redemptions/CreateRedemption";
import { UserRepositorySequelize } from "../../infrastructure/repositories/UserRepositorySequelize";
import { PointRepositorySequelize } from "../../infrastructure/repositories/PointRepositorySequelize";
import { StockRepositorySequelize } from "../../infrastructure/repositories/StockRepositorySequelize";
import { RewardRepositorySequelize } from "../../infrastructure/repositories/RewardRepositorySequelize";

const unitOfWork = new SequelizeUnitOfWork(sequelize);
const redemptionRepository = new RedemptionRepositorySequelize();
const userRepository = new UserRepositorySequelize();
const pointRepository = new PointRepositorySequelize();
const stockRepository = new StockRepositorySequelize();
const rewardRepository = new RewardRepositorySequelize();
const createRedemption = new CreateRedemption(
  redemptionRepository, 
  pointRepository, 
  stockRepository, 
  userRepository, 
  rewardRepository, 
  unitOfWork
);

export class RedemptionController {
  static async create(req: Request, res: Response) {
    const createdRedemption = await createRedemption.execute(req.body);
    res.status(201).sendResponse({
      message: "Canje realizado con éxito",
      id: createdRedemption.id,
    });
  }

}

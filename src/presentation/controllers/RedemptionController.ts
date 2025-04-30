import { Request, Response } from "express";
import { SequelizeUnitOfWork } from "../../infrastructure/transactions/SequelizeUnitOfWork";
import { sequelize } from "../../infrastructure/db/sequelize";
import { RedemptionRepositorySequelize } from "../../infrastructure/repositories/RedemptionRepositorySequelize";
import { CreateRedemption } from "../../application/use-cases/Redemptions/CreateRedemption";
import { UserRepositorySequelize } from "../../infrastructure/repositories/UserRepositorySequelize";
import { PointRepositorySequelize } from "../../infrastructure/repositories/PointRepositorySequelize";
import { StockRepositorySequelize } from "../../infrastructure/repositories/StockRepositorySequelize";
import { RewardRepositorySequelize } from "../../infrastructure/repositories/RewardRepositorySequelize";
import { CreateStock } from "../../application/use-cases/Stock/CreateStock";
import { GetRedemptions } from "../../application/use-cases/Redemptions/GetRedemptions";

const unitOfWork = new SequelizeUnitOfWork(sequelize);
const redemptionRepository = new RedemptionRepositorySequelize();
const userRepository = new UserRepositorySequelize();
const pointRepository = new PointRepositorySequelize();
const rewardRepository = new RewardRepositorySequelize();
const stockRepository = new StockRepositorySequelize();
const createStock = new CreateStock(stockRepository, rewardRepository, unitOfWork);
const createRedemption = new CreateRedemption(
  redemptionRepository, 
  pointRepository, 
  userRepository, 
  rewardRepository, 
  unitOfWork,
  createStock
);
const getAllRedemptions = new GetRedemptions(redemptionRepository, unitOfWork);

export class RedemptionController {
  static async create(req: Request, res: Response) {
    const createdRedemption = await createRedemption.execute(req.body);
    res.status(201).sendResponse({
      message: "Canje realizado con éxito",
      id: createdRedemption.id,
    });
  }

  static async getAll(req: Request, res: Response) {
      const redemptions = await getAllRedemptions.execute(req.query);
      res.status(200).sendResponse(redemptions);
    }
}

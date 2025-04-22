import { Request, Response } from "express";
import { sequelize } from "../../infrastructure/db/sequelize";
import { CreateStock } from "../../application/use-cases/Stock/CreateStock";
import { RewardRepositorySequelize } from "../../infrastructure/repositories/RewardRepositorySequelize";
import { StockRepositorySequelize } from "../../infrastructure/repositories/StockRepositorySequelize";
import { SequelizeUnitOfWork } from "../../infrastructure/transactions/SequelizeUnitOfWork";

const stockRepository = new StockRepositorySequelize();
const rewardRepository = new RewardRepositorySequelize();
const unitOfWork = new SequelizeUnitOfWork(sequelize);
const createStock = new CreateStock(stockRepository, rewardRepository, unitOfWork);

export class StockController {
  static async create(req: Request, res: Response) {
    const createdStock = await createStock.execute(req.body);
    res
      .status(201)
      .sendResponse({ message: "Movimiento de stock creado con éxito", id: createdStock.id });
  }
}

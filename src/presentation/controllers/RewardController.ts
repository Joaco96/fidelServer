import { Request, Response } from "express";
import { SequelizeUnitOfWork } from "../../infrastructure/transactions/SequelizeUnitOfWork";
import { sequelize } from "../../infrastructure/db/sequelize";
import { CreateReward } from "../../application/use-cases/Rewards/CreateReward";
import { RewardRepositorySequelize } from "../../infrastructure/repositories/RewardRepositorySequelize";

const unitOfWork = new SequelizeUnitOfWork(sequelize);
const rewardRepository = new RewardRepositorySequelize();
const createReward = new CreateReward(rewardRepository, unitOfWork);

export class RewardController {
  static async create(req: Request, res: Response) {
    const createdReward = await createReward.execute(req.body);
    res
      .status(201)
      .sendResponse({ message: "Beneficio creado con éxito", id: createdReward.id });
  }
}

import { Request, Response } from "express";
import { SequelizeUnitOfWork } from "../../infrastructure/transactions/SequelizeUnitOfWork";
import { sequelize } from "../../infrastructure/db/sequelize";
import { CreateReward } from "../../application/use-cases/Rewards/CreateReward";
import { RewardRepositorySequelize } from "../../infrastructure/repositories/RewardRepositorySequelize";
import { UpdateReward } from "../../application/use-cases/Rewards/UpdateRewards";
import { GetRewards } from "../../application/use-cases/Rewards/GetRewards";
import { DeleteReward } from "../../application/use-cases/Rewards/DeleteReward";

const unitOfWork = new SequelizeUnitOfWork(sequelize);
const rewardRepository = new RewardRepositorySequelize();
const createReward = new CreateReward(rewardRepository, unitOfWork);
const updateReward = new UpdateReward(rewardRepository, unitOfWork);
const getAllRewards = new GetRewards(rewardRepository, unitOfWork);
const deleteReward = new DeleteReward(rewardRepository, unitOfWork);

export class RewardController {
  static async create(req: Request, res: Response) {
    const createdReward = await createReward.execute(req.body);
    res.status(201).sendResponse({
      message: "Beneficio creado con éxito",
      id: createdReward.id,
    });
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const updatedReward = await updateReward.execute(id, req.body);
    res.status(200).sendResponse(updatedReward);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    await deleteReward.execute(id);
    res.status(200).sendResponse([]);
  }

  static async getAll(req: Request, res: Response) {
    const rewards = await getAllRewards.execute(req.query);
    res.status(200).sendResponse(rewards);
  }
}

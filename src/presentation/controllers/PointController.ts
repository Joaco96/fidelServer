import { Request, Response } from "express";
import { PointRepositorySequelize } from "../../infrastructure/repositories/PointRepositorySequelize";
import { SequelizeUnitOfWork } from "../../infrastructure/transactions/SequelizeUnitOfWork";
import { sequelize } from "../../infrastructure/db/sequelize";
import { GetPointsHistory } from "../../application/use-cases/Points/GetPointsHistory";
import { UserRepositorySequelize } from "../../infrastructure/repositories/UserRepositorySequelize";

const pointRepository = new PointRepositorySequelize();
const userRepository = new UserRepositorySequelize();
const unitOfWork = new SequelizeUnitOfWork(sequelize);
const getPointsHistory = new GetPointsHistory(pointRepository, userRepository, unitOfWork);

export class PointController {
  static async getHistoryByUser(req: Request, res: Response) {
    const pointsHistory = await getPointsHistory.execute(req.params.user_id);
    res
      .status(200)
      .sendResponse(pointsHistory);
  }
}
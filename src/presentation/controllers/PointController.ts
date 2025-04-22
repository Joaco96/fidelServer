import { Request, Response } from "express";
import { PointRepositorySequelize } from "../../infrastructure/repositories/PointRepositorySequelize";
import { SequelizeUnitOfWork } from "../../infrastructure/transactions/SequelizeUnitOfWork";
import { sequelize } from "../../infrastructure/db/sequelize";
import { GetPointsHistory } from "../../application/use-cases/Points/GetPointsHistory";

const pointRepository = new PointRepositorySequelize();
const unitOfWork = new SequelizeUnitOfWork(sequelize);
const getPointsHistory = new GetPointsHistory(pointRepository, unitOfWork);

export class PointController {
  static async getHistoryByUser(req: Request, res: Response) {
    const pointsHistory = await getPointsHistory.execute(req.query);
    res
      .status(200)
      .sendResponse(pointsHistory);
  }
}
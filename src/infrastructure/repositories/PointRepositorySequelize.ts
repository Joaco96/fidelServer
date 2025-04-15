import { Transaction } from "sequelize";
import { Points } from "../../domain/entities/Points";
import { PointRepository } from "../../domain/repositories/pointRepository";
import { PointsModel } from "../db/models/PointsModel";
import { PointsMapper } from "../mappers/PointsMapper";

export class PointRepositorySequelize implements PointRepository {
  async save(points: Points, transaction?: Transaction): Promise<Points> {
    try {
      const createdPoint = await PointsModel.create(
        PointsMapper.toPersistence(points), { transaction }
      );

      return PointsMapper.toDomain(createdPoint);
    } catch (error) {
      console.error("Error al guardar la transaccion:", error);
      throw new Error("No se pudo guardar la transaccion");
    }
  }
}

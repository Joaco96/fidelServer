import { Points } from "../../domain/entities/Points";
import { isMapperClass } from "../../domain/mapper";
import { PointsModel } from "../db/models/PointsModel";

export class PointsMapper{
  static toDomain(pointsModel: PointsModel): Points {
    const { id, user_id, amount, createdAt, updatedAt } = pointsModel.get();
    
    return {
      id,
      user_id,
      amount,
      created_at: createdAt,
      updated_at: updatedAt
    } as Points;
  }

  static toPersistence(point: Points): Partial<PointsModel> {
    return {
      id: point.id,
      user_id: point.user_id,
      amount: point.amount,
    };
  }
}

isMapperClass<Points, PointsModel>(PointsMapper);
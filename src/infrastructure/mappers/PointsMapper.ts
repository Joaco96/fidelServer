import { Points } from "../../domain/entities/Points";
import { isMapperClass } from "../../domain/mapper";
import {PointsModel} from "../db/models";

export class PointsMapper {
  static toDomain(pointsModel: PointsModel): Points {
    const { id, user_id, amount, createdAt, updatedAt } = pointsModel.get() as PointsModel;

    return {
      id,
      user_id,
      amount,
      createdAt,
      updatedAt,
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

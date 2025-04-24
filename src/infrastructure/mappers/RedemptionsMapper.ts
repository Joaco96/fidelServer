import { Redemptions } from "../../domain/entities/Redemptions";
import { isMapperClass } from "../../domain/mapper";
import { PointsModel, RedemptionsModel, StocksModel } from "../db/models";

export class RedemptionsMapper {
  static toDomain(redemptionsModel: RedemptionsModel): Redemptions {
    const pointsMovement = redemptionsModel.get("point") as PointsModel;
    const stockMovement = redemptionsModel.get("stock") as StocksModel;
    const redemption = redemptionsModel.get() as RedemptionsModel;

    console.log(pointsMovement)
    console.log(stockMovement)

    return new Redemptions(
      pointsMovement.user_id,
      stockMovement.reward_id,
      stockMovement.quantity,
      redemption.createdAt,
      redemption.updatedAt
    );
  }

  static toPersistence(redemption: Redemptions): Partial<RedemptionsModel> {
    return {
      point_id: redemption.point_id,
      stock_id: redemption.stock_id,
      is_delivered: redemption.is_delivered,
      createdAt: redemption.createdAt,
      updatedAt: redemption.updatedAt
    };
  }
}

isMapperClass<Redemptions, RedemptionsModel>(RedemptionsMapper);
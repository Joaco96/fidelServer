import { Redemptions } from "../../domain/entities/Redemptions";
import { isMapperClass } from "../../domain/mapper";
import { PointsModel, RedemptionsModel, StocksModel } from "../db/models";

export class RedemptionsMapper {
  static toDomain(redemptionsModel: RedemptionsModel): Redemptions {
    const pointsMovement = redemptionsModel.get("point") as PointsModel;
    const stockMovement = redemptionsModel.get("stock") as StocksModel;
    const redemption = redemptionsModel.get() as RedemptionsModel;

    return {
      id: redemption.id,
      user_id: pointsMovement.user_id,
      reward_id: stockMovement.reward_id,
      quantity: stockMovement.quantity,
      createdAt: redemption.createdAt,
      updatedAt: redemption.updatedAt,
      is_delivered: redemption.is_delivered,
      qr_code: redemption.qr_code,
     } as Redemptions;
  }

  static toPersistence(redemption: Redemptions): Partial<RedemptionsModel> {
    return {
      id: redemption.id,
      point_id: redemption.point_id,
      stock_id: redemption.stock_id,
      is_delivered: redemption.is_delivered,
      qr_code: redemption.qr_code,
      createdAt: redemption.createdAt,
      updatedAt: redemption.updatedAt
    };
  }
}

isMapperClass<Redemptions, RedemptionsModel>(RedemptionsMapper);
import { Rewards } from "../../domain/entities/Rewards";
import { isMapperClass } from "../../domain/mapper";
import { RewardsModel } from "../db/models/RewardsModel";

export class RewardMapper{
  static toDomain(pointsModel: RewardsModel): Rewards{
    const { id, name, description, points_cost, stock_balance } = pointsModel.get();
    
    return {
    id,
    name,
    description,
    points_cost,
    stock_balance
    } as Rewards;
  }

  static toPersistence(reward: Rewards): Partial<RewardsModel> {
    return {
      id: reward.id,
      name: reward.name,
      description: reward.description,
      points_cost: reward.points_cost,
      stock_balance: reward.stock_balance,
    };
  }
}

isMapperClass<Rewards, RewardsModel>(RewardMapper);
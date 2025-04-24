import { Rewards } from "../../domain/entities/Rewards";
import { isMapperClass } from "../../domain/mapper";
import { RewardsModel } from "../db/models";

export class RewardMapper {
  static toDomain(rewardsModel: RewardsModel): Rewards {
    const {
      id,
      name,
      description,
      points_cost,
      stock_balance,
      createdAt,
      updatedAt,
    } = rewardsModel.get() as RewardsModel;

    return {
      id,
      name,
      description,
      points_cost,
      stock_balance,
      createdAt,
      updatedAt,
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

import { Transaction } from "sequelize";
import { RewardRepository } from "../../domain/repositories/rewardRepository";
import { Rewards } from "../../domain/entities/Rewards";
import { RewardsModel } from "../db/models/RewardsModel";
import { RewardMapper } from "../mappers/RewardMapper";

export class RewardRepositorySequelize implements RewardRepository {
  async save(points: Rewards, transaction?: Transaction): Promise<Rewards> {
    try {
      const createdPoint = await RewardsModel.create(
        RewardMapper.toPersistence(points),
        { transaction }
      );

      return RewardMapper.toDomain(createdPoint);
    } catch (error) {
      console.error("Error al guardar el beneficio:", error);
      throw new Error("No se pudo guardar el beneficio");
    }
  }

  async findBy<T>(
    key: string,
    value: T,
    transaction?: Transaction
  ): Promise<Rewards | null> {
    try {
      const foundRewardByKey = await RewardsModel.findOne({
        where: { [key]: value },
        transaction,
      });

      return foundRewardByKey ? RewardMapper.toDomain(foundRewardByKey) : null;
    } catch (error) {
      console.error("Error al buscar el beneficio:", error);
      throw new Error("No se pudo encontrar el beneficio");
    }
  }
}

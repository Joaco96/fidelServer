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
  ): Promise<Array<Rewards>> {
    try {
      const foundRewardByKey = await RewardsModel.findAll({
        where: { [key]: value },
        transaction,
      });
      console.log(foundRewardByKey)
      return foundRewardByKey.length ? foundRewardByKey.map((fr) => RewardMapper.toDomain(fr)) : [];
    } catch (error) {
      console.error("Error al buscar el beneficio:", error);
      throw new Error("No se pudo encontrar el beneficio");
    }
  }

  async update(
    id: string,
    data: Partial<Rewards>,
    tx: Transaction
  ): Promise<Rewards> {
    try {
      const updatedData  = await RewardsModel.update(data, { where: { id }, transaction: tx, returning: true });
      console.log(updatedData)
      return RewardMapper.toDomain(updatedData[1][0]);
    } catch (error) {
      console.error("Error al actualizar el beneficio", error);
      throw new Error("No se pudo actualizar el beneficio");
    }
  }
}

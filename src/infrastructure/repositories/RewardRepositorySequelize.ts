import { Transaction } from "sequelize";
import { RewardRepository } from "../../domain/repositories/rewardRepository";
import { Rewards } from "../../domain/entities/Rewards";
import { RewardMapper } from "../mappers/RewardMapper";
import { RewardsModel } from "../db/models";

export class RewardRepositorySequelize implements RewardRepository {
  async save(points: Rewards, transaction?: Transaction): Promise<Rewards> {
    try {
      const createdReward = await RewardsModel.create(
        RewardMapper.toPersistence(points),
        { transaction }
      );

      return RewardMapper.toDomain(createdReward);
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

      return foundRewardByKey.length
        ? foundRewardByKey.map((fr) => RewardMapper.toDomain(fr))
        : [];
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
      const updatedData = await RewardsModel.update(data, {
        where: { id },
        transaction: tx,
        returning: true,
      });

      return RewardMapper.toDomain(updatedData[1][0]);
    } catch (error) {
      console.error("Error al actualizar el beneficio", error);
      throw new Error("No se pudo actualizar el beneficio");
    }
  }

  async delete(id: string, tx: Transaction): Promise<void> {
    try {
      await RewardsModel.destroy({ where: { id }, transaction: tx });
    } catch (error) {
      console.error("Error al eliminar el beneficio", error);
      throw new Error("No se pudo eliminar el beneficio");
    }
  }

  async findAll(
    transaction?: Transaction,
    filters: Partial<Rewards> = {}
  ): Promise<Array<Rewards>> {
    try {
      const foundRewards = await RewardsModel.findAll({
        where: filters,
        transaction,
      });

      return foundRewards.length
        ? foundRewards.map((fr) => RewardMapper.toDomain(fr))
        : [];
    } catch (error) {
      console.error("Error al buscar los beneficios con filtros:", error);
      throw new Error("No se pudieron encontrar los beneficios");
    }
  }
}

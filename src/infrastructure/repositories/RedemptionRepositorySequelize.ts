import { Transaction } from "sequelize";
import { Redemptions } from "../../domain/entities/Redemptions";
import { RedemptionRepository } from "../../domain/repositories/redemptionRepository";
import { RedemptionsMapper } from "../mappers/RedemptionsMapper";
import { PointsModel, RedemptionsModel, StocksModel } from "../db/models";

export class RedemptionRepositorySequelize implements RedemptionRepository {
  async save(
    redemption: Redemptions,
    transaction?: Transaction
  ): Promise<Redemptions> {
    try {
      const createdRedemption = await RedemptionsModel.create(
        RedemptionsMapper.toPersistence(redemption),
        { transaction }
      );
      const completeRedemption = await RedemptionsModel.findByPk(
        createdRedemption.id,
        {
          transaction,
          include: [
            { model: PointsModel, as: "point" },
            { model: StocksModel, as: "stock" },
          ],
        }
      );

      if (!completeRedemption)
        throw new Error("No se pudo obtener el canje completo");

      return RedemptionsMapper.toDomain(completeRedemption);
    } catch (error) {
      console.error("Error al guardar el canje:", error);
      throw new Error("No se pudo guardar el canje");
    }
  }

  async findAll(
    transaction?: Transaction,
    filters: Partial<Redemptions> = {}
  ): Promise<Array<Redemptions>> {
    try {
      const includeOptions: any[] = [];

      if (filters.user_id) {
        includeOptions.push({
          model: PointsModel,
          as: "point",
          where: { user_id: filters.user_id },
          required: true, // Realiza un INNER JOIN
        });
      } else {
        includeOptions.push({
          model: PointsModel,
          as: "point",
        });
      }

      if (filters.reward_id) {
        includeOptions.push({
          model: StocksModel,
          as: "stock",
          where: { reward_id: filters.reward_id },
          required: true, // Realiza un INNER JOIN
        });
      } else {
        includeOptions.push({
          model: StocksModel,
          as: "stock",
        });
      }

      const foundRedemptions = await RedemptionsModel.findAll({
        include: includeOptions,
        transaction,
      });

      return foundRedemptions.length
        ? foundRedemptions.map((fr) => RedemptionsMapper.toDomain(fr))
        : [];
    } catch (error) {
      console.error("Error al buscar los canjes con filtros:", error);
      throw new Error("No se pudieron encontrar los canjes");
    }
  }
}

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import { UUID } from "crypto";

export class StocksModel extends Model {
  declare id: UUID;
  declare reward_id: UUID;
  declare quantity: number;
}

StocksModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    reward_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Stocks" }
);

StocksModel.afterCreate(async (stock, options) => {
  try {
    await sequelize.models.Rewards.increment(
      { stock_balance: stock.quantity },
      { where: { id: stock.reward_id }, transaction: options.transaction }
    );
  } catch (error) {
    console.error("Error incrementando Balance de stock", error);
    throw new Error("Error incrementando Balance de stock"); // ¡esto hace rollback de la transaction!
  }
});

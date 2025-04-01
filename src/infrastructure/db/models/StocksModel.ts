import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";

export class StocksModel extends Model {
  quantity: number | undefined;
  reward_id: unknown;
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
  await sequelize.models.Rewards.increment(
    { stock_balance: stock.quantity },
    { where: { id: stock.reward_id }, transaction: options.transaction }
  );
});

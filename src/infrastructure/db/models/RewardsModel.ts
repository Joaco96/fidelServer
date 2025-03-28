import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import { RedemptionsModel } from "./RedemptionsModel";
import { StockModel } from "./StockModel";

export class RewardsModel extends Model {}

RewardsModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    points_cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock_balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, modelName: "Rewards" }
);

RewardsModel.hasMany(RedemptionsModel, { foreignKey: "reward_id"});
RedemptionsModel.belongsTo(RewardsModel, { foreignKey: "reward_id"});

RewardsModel.hasMany(StockModel, { foreignKey: "stock_id"});
StockModel.belongsTo(RewardsModel, { foreignKey: "stock_id"});
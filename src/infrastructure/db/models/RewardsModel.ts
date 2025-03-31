import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";

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
  },
  { sequelize, modelName: "Rewards" }
);

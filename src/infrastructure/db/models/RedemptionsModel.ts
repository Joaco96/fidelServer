import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";

export class RedemptionsModel extends Model {}

RedemptionsModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    reward_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    points_used: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, modelName: "Redemptions" }
);

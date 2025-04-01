import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import { UUID } from "crypto";

export class RedemptionsModel extends Model {
  declare id: UUID;
  declare user_id: UUID;
  declare reward_id: UUID;
  declare points_used: number;
}

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
      type: DataTypes.UUID,
      allowNull: false,
    },
    points_used: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Redemptions" }
);

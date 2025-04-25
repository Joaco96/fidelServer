import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import { UUID } from "crypto";

export class RedemptionsModel extends Model {
  declare id: UUID;
  declare point_id: UUID;
  declare stock_id: UUID;
  declare is_delivered: boolean;
  declare qr_code: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

RedemptionsModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    point_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    stock_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    is_delivered: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    qr_code: {
      type: DataTypes.TEXT,
    }
  },
  { sequelize, modelName: "Redemptions" }
);

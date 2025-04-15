import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import { UUID } from "crypto";

export class TicketsModel extends Model {
  declare id: string;
  declare user_id: UUID;
  declare store_id: UUID;
  declare amount_spent: number;
  declare points_earned: number;
}

TicketsModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    store_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    amount_spent: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    points_earned: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Tickets" }
);

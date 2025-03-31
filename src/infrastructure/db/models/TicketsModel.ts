import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";

export class TicketsModel extends Model {}

TicketsModel.init(
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

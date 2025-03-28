import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import { TicketsModel } from "./TicketsModel";

export class StoresModel extends Model {}

StoresModel.init(
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
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Stores" }
);

StoresModel.hasMany(TicketsModel, { foreignKey: "stores_id"});
TicketsModel.belongsTo(StoresModel, { foreignKey: "stores_id"});
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";

export class RoleModel extends Model {}

RoleModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },  
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Role" }
);


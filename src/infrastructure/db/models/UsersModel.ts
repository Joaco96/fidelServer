import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import { RoleIds } from "../../../domain/entities/Role";
import { UUID } from "crypto";

export class UsersModel extends Model {
  declare id: UUID;
  declare role_id: RoleIds;
  declare name: string;
  declare email: string;
  declare password: string;
  declare points_balance: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

UsersModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    points_balance: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  { sequelize, modelName: "Users" }
);

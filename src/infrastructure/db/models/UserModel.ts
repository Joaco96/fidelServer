import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import { RedemptionsModel } from "./RedemptionsModel";
import { PointsModel } from "./PointsModel";
import { TicketsModel } from "./TicketsModel";

export class UserModel extends Model {}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    // Verificar si el id de auth0 es un uuid o un string
    auth0_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, modelName: "User" }
);

UserModel.hasMany(RedemptionsModel, { foreignKey: "user_id"});
RedemptionsModel.belongsTo(UserModel, { foreignKey: "user_id"});

UserModel.hasMany(PointsModel, { foreignKey: "user_id"});
PointsModel.belongsTo(UserModel, { foreignKey: "user_id"});

UserModel.hasMany(TicketsModel, { foreignKey: "user_id"});
TicketsModel.belongsTo(UserModel, { foreignKey: "user_id"});

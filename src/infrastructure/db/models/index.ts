import { UsersModel } from "./UsersModel";
import { RedemptionsModel } from "./RedemptionsModel";
import { PointsModel } from "./PointsModel";
import { TicketsModel } from "./TicketsModel";
import { RewardsModel } from "./RewardsModel";
import { StoresModel } from "./StoresModel";
import { StocksModel } from "./StocksModel";
import { RoleModel } from "./RoleModel";

// Definir las relaciones entre los modelos
PointsModel.hasMany(RedemptionsModel, { foreignKey: "point_id"});
RedemptionsModel.belongsTo(PointsModel, { foreignKey: "point_id", as: "point"});

UsersModel.hasMany(PointsModel, { foreignKey: "user_id"});
PointsModel.belongsTo(UsersModel, { foreignKey: "user_id", as: "user"});

UsersModel.hasMany(TicketsModel, { foreignKey: "user_id"});
TicketsModel.belongsTo(UsersModel, { foreignKey: "user_id", as: "user"});

StocksModel.hasMany(RedemptionsModel, { foreignKey: "stock_id"});
RedemptionsModel.belongsTo(StocksModel, { foreignKey: "stock_id", as: "stock"});

RewardsModel.hasMany(StocksModel, { foreignKey: "reward_id" });
StocksModel.belongsTo(RewardsModel, { foreignKey: "reward_id", as: "reward" });

StoresModel.hasMany(TicketsModel, { foreignKey: "store_id"});
TicketsModel.belongsTo(StoresModel, { foreignKey: "store_id", as: "store"});

RoleModel.hasMany(UsersModel, { foreignKey: "role_id"});
UsersModel.belongsTo(RoleModel, { foreignKey: "role_id", as: "role" });

// Exportar individualmente para uso con desestructuración
export {
  UsersModel,
  RedemptionsModel,
  PointsModel,
  TicketsModel,
  RewardsModel,
  StoresModel,
  StocksModel,
  RoleModel,
};
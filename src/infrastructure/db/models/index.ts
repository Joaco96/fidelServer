import { UsersModel } from "./UsersModel";
import { RedemptionsModel } from "./RedemptionsModel";
import { PointsModel } from "./PointsModel";
import { TicketsModel } from "./TicketsModel";
import { RewardsModel } from "./RewardsModel";
import { StoresModel } from "./StoresModel";
import { StocksModel } from "./StocksModel";
import { RoleModel } from "./RoleModel";

// Registrar los modelos en Sequelize
const models = {
  UsersModel,
  RedemptionsModel,
  PointsModel,
  TicketsModel,
  RewardsModel,
  StoresModel,
  StocksModel,
  RoleModel,
};

// Definir las relaciones entre los modelos
models.PointsModel.hasMany(models.RedemptionsModel, { foreignKey: "point_id"});
models.RedemptionsModel.belongsTo(models.PointsModel, { foreignKey: "point_id", as: "point"});

models.UsersModel.hasMany(models.PointsModel, { foreignKey: "user_id"});
models.PointsModel.belongsTo(models.UsersModel, { foreignKey: "user_id"});

models.UsersModel.hasMany(models.TicketsModel, { foreignKey: "user_id"});
models.TicketsModel.belongsTo(models.UsersModel, { foreignKey: "user_id"});

models.StocksModel.hasMany(models.RedemptionsModel, { foreignKey: "stock_id"});
models.RedemptionsModel.belongsTo(models.StocksModel, { foreignKey: "stock_id", as: "stock"});

models.RewardsModel.hasMany(models.StocksModel, { foreignKey: "reward_id" });
models.StocksModel.belongsTo(models.RewardsModel, { foreignKey: "reward_id" });

models.StoresModel.hasMany(models.TicketsModel, { foreignKey: "store_id"});
models.TicketsModel.belongsTo(models.StoresModel, { foreignKey: "store_id"});

models.RoleModel.hasMany(models.UsersModel, { foreignKey: "role_id"});
models.UsersModel.belongsTo(models.RoleModel, { foreignKey: "role_id" });

// Exportar modelos
export default models;
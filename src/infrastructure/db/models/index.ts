import { UsersModel } from "./UsersModel";
import { RedemptionsModel } from "./RedemptionsModel";
import { PointsModel } from "./PointsModel";
import { TicketsModel } from "./TicketsModel";
import { RewardsModel } from "./RewardsModel";
import { StoresModel } from "./StoresModel";
import { StocksModel } from "./StocksModel";

// Registrar los modelos en Sequelize
const models = {
  UsersModel,
  RedemptionsModel,
  PointsModel,
  TicketsModel,
  RewardsModel,
  StoresModel,
  StocksModel,
};

UsersModel.hasMany(RedemptionsModel, { foreignKey: "user_id"});
RedemptionsModel.belongsTo(UsersModel, { foreignKey: "user_id"});

UsersModel.hasMany(PointsModel, { foreignKey: "user_id"});
PointsModel.belongsTo(UsersModel, { foreignKey: "user_id"});

UsersModel.hasMany(TicketsModel, { foreignKey: "user_id"});
TicketsModel.belongsTo(UsersModel, { foreignKey: "user_id"});

RewardsModel.hasMany(RedemptionsModel, { foreignKey: "reward_id"});
RedemptionsModel.belongsTo(RewardsModel, { foreignKey: "reward_id"});

RewardsModel.hasMany(StocksModel, { foreignKey: "reward_id" });
StocksModel.belongsTo(RewardsModel, { foreignKey: "reward_id" });

StoresModel.hasMany(TicketsModel, { foreignKey: "store_id"});
TicketsModel.belongsTo(StoresModel, { foreignKey: "store_id"});

// Exportar modelos
export default models;
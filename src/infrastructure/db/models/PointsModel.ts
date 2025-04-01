import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import { UUID } from "crypto";

export class PointsModel extends Model {
  amount: number | undefined;
  user_id: UUID | undefined;
}

PointsModel.init(
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
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Points" }
);

PointsModel.afterCreate(async (point, options) => {
  await sequelize.models.Users.increment(
    { points_balance: point.amount },
    { where: { id: point.user_id }, transaction: options.transaction }
  );
});
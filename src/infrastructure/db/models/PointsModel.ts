import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import { UUID } from "crypto";

export class PointsModel extends Model {
  declare id: UUID;
  declare user_id: UUID;
  declare amount: number;
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
  try {
    await sequelize.models.Users.increment(
      { points_balance: point.amount },
      { where: { id: point.user_id }, transaction: options.transaction }
    );
  } catch (error) {
    console.error("Error incrementando Balance de puntos", error);
    throw new Error("Error incrementando Balance de puntos"); // ¡esto hace rollback de la transaction!
  }
});
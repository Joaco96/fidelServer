import { InferAttributes } from "sequelize";
import { User } from "../../domain/entities/User";
import { UsersModel } from "../db/models/UsersModel";

export class UserMapper {
  // Convierte un modelo de Sequelize a una entidad de dominio
  static toDomain(userModel: UsersModel): User {
    const { id, name, email, password, points_balance, role_id, auth0_id } = userModel.get();
    return new User(id, auth0_id,role_id, name, email, password, points_balance);
  }
  // Convierte una entidad de dominio a un objeto compatible con Sequelize
  static toPersistence(user: User): Partial<InferAttributes<UsersModel>> {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      points_balance: user.points_balance,
      role_id: user.role_id,
      auth0_id: user.auth0_id
    };
  }
}

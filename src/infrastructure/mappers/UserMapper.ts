import { User } from "../../domain/entities/User";
import { isMapperClass } from "../../domain/mapper";
import { UsersModel } from "../db/models";

export class UserMapper {
  static toDomain(userModel: UsersModel): User {
    const {
      id,
      role_id,
      name,
      dni,
      email,
      password,
      points_balance,
      createdAt,
      updatedAt,
    } = userModel.get() as UsersModel;
    return {
      id,
      role_id,
      name,
      dni,
      email,
      password,
      points_balance,
      createdAt,
      updatedAt,
    } as User;
  }

  static toPersistence(user: User): Partial<UsersModel> {
    return {
      id: user.id,
      role_id: user.role_id,
      dni: user.dni,
      name: user.name,
      email: user.email,
      password: user.password,
      points_balance: user.points_balance,
    };
  }
}

isMapperClass<User, UsersModel>(UserMapper);

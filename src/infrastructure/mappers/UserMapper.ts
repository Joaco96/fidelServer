import { User } from "../../domain/entities/User";
import { UsersModel } from "../db/models/UsersModel";

export class UserMapper {

  static toDomain(userModel: UsersModel): User {
    const { id, role_id, name, email, password, points_balance } = userModel.get();
    return new User(id, role_id, name, email, password, points_balance);
  }
  
  static toPersistence(user: User): Partial<UsersModel> {
    return {
      id: user.id,
      role_id: user.role_id,
      name: user.name,
      email: user.email,
      password: user.password,
      points_balance: user.points_balance,
    };
  }
}

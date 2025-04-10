import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/userRepository";
import { UsersModel } from "../db/models/UsersModel";
import { UserMapper } from "../mappers/UserMapper";

export class UserRepositorySequelize implements UserRepository {
  async save(user: User): Promise<User> {
    try {
      const createdUser = await UsersModel.create(UserMapper.toPersistence(user));
      
      return UserMapper.toDomain(createdUser);
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
      throw new Error("No se pudo guardar el usuario");
    }
  }
  async findByEmail(email: string): Promise<User | null> {
    try {
      const userModel = await UsersModel.findOne({ where: { email } });
  
      if (!userModel) return null;
  
      return UserMapper.toDomain(userModel);
    } catch (error) {
      console.error("Error al buscar por email:", error);
      throw new Error("No se pudo encontrar al usuario por email");
    }
  }
}

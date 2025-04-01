import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/userRepository";
import { UsersModel } from "../db/models/UsersModel";
import { UserMapper } from "../mappers/UserMapper";

export class UserRepositorySequelize implements UserRepository {
  async save(user: User): Promise<User> {
    try {
      const createdUser = await UsersModel.create({ ...user });
      return UserMapper.toDomain(createdUser); // Devuelve la entidad creada
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
      throw new Error("No se pudo guardar el usuario"); // Manejo de error
    }
  }
}

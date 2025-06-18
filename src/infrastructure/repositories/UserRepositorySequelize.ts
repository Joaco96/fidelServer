import { Transaction } from "sequelize";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/userRepository";
import { UserMapper } from "../mappers/UserMapper";
import { UsersModel } from "../db/models";

export class UserRepositorySequelize implements UserRepository {
  async save(user: User, transaction: Transaction): Promise<User> {
    try {
      const createdUser = await UsersModel.create(
        UserMapper.toPersistence(user),
        { transaction }
      );

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

  async findById(id: string): Promise<User | null> {
    try {
      const userModel = await UsersModel.findOne({ where: { id } });

      return userModel ? UserMapper.toDomain(userModel) : null;
    } catch (error) {
      console.error("Error al buscar por id:", error);
      throw new Error("No se pudo encontrar al usuario por id");
    }
  }

  async findByDni(dni: string): Promise<User | null> {
    try {
      const userModel = await UsersModel.findOne({ where: { dni } });

      return userModel ? UserMapper.toDomain(userModel) : null;
    } catch (error) {
      console.error("Error al buscar por dni:", error);
      throw new Error("No se pudo encontrar al usuario por dni");
    }
  }

  async delete(id: string, tx: Transaction): Promise<void> {
    try {
      await UsersModel.destroy({ where: { id }, transaction: tx });
    } catch (error) {
      console.error("Error al eliminar el usuario", error);
      throw new Error("No se pudo eliminar el usuario");
    }
  }

  async findAll(
    transaction?: Transaction,
    filters: Partial<User> = {}
  ): Promise<Array<User>> {
    try {
      const foundUsers = await UsersModel.findAll({
        where: filters,
        transaction,
        attributes: { exclude: ["password"] },
      });

      return foundUsers.length
        ? foundUsers.map((fr) => UserMapper.toDomain(fr))
        : [];
    } catch (error) {
      console.error("Error al buscar los usuarios con filtros:", error);
      throw new Error("No se pudieron encontrar los usuarios");
    }
  }

  async update(
    id: string,
    data: Partial<User>,
    tx: Transaction
  ): Promise<User> {
    try {
      const [, [updatedData]] = await UsersModel.update(data, {
        where: { id },
        transaction: tx,
        returning: true,
      });
      
      const safeUpdatedData = updatedData.get({plain: true});
      delete safeUpdatedData.password;

      return UserMapper.toDomain(updatedData);
    } catch (error) {
      console.error("Error al actualizar el usuario", error);
      throw new Error("No se pudo actualizar el usuario");
    }
  }
}

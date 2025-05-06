import { Transaction } from "sequelize";
import { StoresModel } from "../db/models";
import { StoreRepository } from "../../domain/repositories/storeRepository";
import { Stores } from "../../domain/entities/Stores";
import { StoresMapper } from "../mappers/StoresMappers";

export class StoreRepositorySequelize implements StoreRepository {
  async save(points: Stores, transaction?: Transaction): Promise<Stores> {
    try {
      const createdStore= await StoresModel.create(
        StoresMapper.toPersistence(points),
        { transaction }
      );

      return StoresMapper.toDomain(createdStore);
    } catch (error) {
      console.error("Error al guardar el store:", error);
      throw new Error("No se pudo guardar el store");
    }
  }

  async findBy<T>(
    key: string,
    value: T,
    transaction?: Transaction
  ): Promise<Array<Stores>> {
    try {
      const foundStoreByKey = await StoresModel.findAll({
        where: { [key]: value },
        transaction,
      });

      return foundStoreByKey.length ? foundStoreByKey.map((fr) => StoresMapper.toDomain(fr)) : [];
    } catch (error) {
      console.error("Error al buscar el store:", error);
      throw new Error("No se pudo encontrar el store");
    }
  }

  async update(
    id: string,
    data: Partial<Stores>,
    tx: Transaction
  ): Promise<Stores> {
    try {
      const updatedData  = await StoresModel.update(data, { where: { id }, transaction: tx, returning: true });

      return StoresMapper.toDomain(updatedData[1][0]);
    } catch (error) {
      console.error("Error al actualizar el store", error);
      throw new Error("No se pudo actualizar el store");
    }
  }

  async delete(
    id: string,
    tx: Transaction
  ): Promise<void> {
    try {
      await StoresModel.destroy({ where: { id }, transaction: tx });
    } catch (error) {
      console.error("Error al eliminar el store", error);
      throw new Error("No se pudo eliminar el store");
    }
  }

  async findAll(
    transaction?: Transaction,
    filters: Partial<Stores> = {}
  ): Promise<Array<Stores>> {
    try {
      const foundStores = await StoresModel.findAll({
        where: filters,
        transaction,
      });
  
      return foundStores.length
        ? foundStores.map((fr) => StoresMapper.toDomain(fr))
        : [];
    } catch (error) {
      console.error("Error al buscar los stores con filtros:", error);
      throw new Error("No se pudieron encontrar los stores");
    }
  }
}

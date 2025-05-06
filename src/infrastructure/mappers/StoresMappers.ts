import { Stores } from "../../domain/entities/Stores";
import { isMapperClass } from "../../domain/mapper";
import { StoresModel } from "../db/models";

export class StoresMapper {
  static toDomain(storeModel: StoresModel): Stores {
    const {
      id,
      name,
      location,
      contact,
      createdAt,
      updatedAt,
    } = storeModel.get() as StoresModel;

    return {
      id,
      name,
      location,
      contact,
      createdAt,
      updatedAt,
    } as Stores;
  }

  static toPersistence(store: Stores): Partial<StoresModel> {
    return {
      id: store.id,
      name: store.name,
      location: store.location,
      contact: store.contact,
    };
  }
}

isMapperClass<Stores, StoresModel>(StoresMapper);

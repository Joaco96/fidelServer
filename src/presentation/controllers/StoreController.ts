import { Request, Response } from "express";
import { SequelizeUnitOfWork } from "../../infrastructure/transactions/SequelizeUnitOfWork";
import { sequelize } from "../../infrastructure/db/sequelize";
import { StoreRepositorySequelize } from "../../infrastructure/repositories/StoreRepositorySequelize";
import { CreateStore } from "../../application/use-cases/Stores/CreateStore";
import { UpdateStore } from "../../application/use-cases/Stores/UpdateStore";
import { GetStores } from "../../application/use-cases/Stores/GetStores";

const unitOfWork = new SequelizeUnitOfWork(sequelize);
const storeRepository = new StoreRepositorySequelize();
const createStore = new CreateStore(storeRepository, unitOfWork);
const updateStore = new UpdateStore(storeRepository, unitOfWork);
const getAllStores = new GetStores(storeRepository, unitOfWork);

export class StoreController {
  static async create(req: Request, res: Response) {
    const createdStore = await createStore.execute(req.body);
    res.status(201).sendResponse({
      message: "Store creado con éxito",
      id: createdStore.id,
    });
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const updatedStore = await updateStore.execute(id, req.body);
    res.status(200).sendResponse(updatedStore);
  }

  static async getAll(req: Request, res: Response) {
    const stores = await getAllStores.execute(req.query);
    res.status(200).sendResponse(stores);
  }
}

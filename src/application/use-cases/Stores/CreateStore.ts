import { Stores } from "../../../domain/entities/Stores";
import { StoreRepository } from "../../../domain/repositories/storeRepository";
import { UnitOfWork } from "../../../domain/transaction";

export class CreateStore<T> {
  constructor(
    private storeRepository: StoreRepository,
    private uow: UnitOfWork<T>
  ) {}

  async execute(store: Stores): Promise<Stores> {
    return await this.uow.runInTransaction(async (transaction) => {
      const foundStore = await this.storeRepository.findBy(
        "name",
        store.name,
        transaction
      );
      if (foundStore.length) throw new Error("El nombre del store ya existe");

      const newStore = new Stores(
        store.name,
        store.location,
        store.contact,
      );

      return await this.storeRepository.save(newStore, transaction);
    });
  }
}
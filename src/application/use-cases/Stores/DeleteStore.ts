import { StoreRepository } from "../../../domain/repositories/storeRepository";
import { UnitOfWork } from "../../../domain/transaction";

export class DeleteStore<T> {
  constructor(
    private storeRepository: StoreRepository,
    private uow: UnitOfWork<T>
  ) {}

  async execute(id: string): Promise<void> {
    return await this.uow.runInTransaction(async (transaction) => {
      const foundStore = await this.storeRepository.findBy(
        "id",
        id,
        transaction
      );
      if (!foundStore.length) throw new Error("Store inexistente");
      return await this.storeRepository.delete(id, transaction);
    });
  }
}
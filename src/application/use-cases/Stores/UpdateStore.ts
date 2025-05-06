import { Stores } from "../../../domain/entities/Stores";
import { StoreRepository } from "../../../domain/repositories/storeRepository";
import { UnitOfWork } from "../../../domain/transaction";

export class UpdateStore<T> {
  constructor(
    private storeRepository: StoreRepository,
    private uow: UnitOfWork<T>
  ) {}

  async execute(id: string, data: Partial<Stores>): Promise<Stores> {
    return await this.uow.runInTransaction(async (transaction) => {
      const foundReward = await this.storeRepository.findBy(
        "id",
        id,
        transaction
      );
      if (!foundReward.length) throw new Error("Store inexistente");
      return await this.storeRepository.update(id, data, transaction);
    });
  }
}
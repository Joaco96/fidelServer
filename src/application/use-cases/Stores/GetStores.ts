import { Stores } from "../../../domain/entities/Stores";
import { StoreRepository } from "../../../domain/repositories/storeRepository";
import { UnitOfWork } from "../../../domain/transaction";

export class GetStores<T> {
  constructor(
    private storeRepository: StoreRepository,
    private uow: UnitOfWork<T>
  ) {}

  async execute(filters: Partial<Stores>): Promise<Stores[]> {
    return await this.uow.runInTransaction(async (transaction) => {
      return await this.storeRepository.findAll(transaction, filters);
    });
  }
}
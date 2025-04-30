import { Redemptions } from "../../../domain/entities/Redemptions";
import { RedemptionRepository } from "../../../domain/repositories/redemptionRepository";
import { UnitOfWork } from "../../../domain/transaction";

export class GetRedemptions<T> {
  constructor(
    private redemptionRepository: RedemptionRepository,
    private uow: UnitOfWork<T>
  ) {}

  async execute(filters: Partial<Redemptions>): Promise<Redemptions[]> {
    return await this.uow.runInTransaction(async (transaction) => {
      return await this.redemptionRepository.findAll(transaction, filters);
    });
  }
}

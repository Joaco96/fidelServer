import { Rewards } from "../../../domain/entities/Rewards";
import { RewardRepository } from "../../../domain/repositories/rewardRepository";
import { UnitOfWork } from "../../../domain/transaction";

export class GetRewards<T> {
  constructor(
    private rewardRepository: RewardRepository,
    private uow: UnitOfWork<T>
  ) {}

  async execute(filters: Partial<Rewards>): Promise<Rewards[]> {
    return await this.uow.runInTransaction(async (transaction) => {
      return await this.rewardRepository.findAll(transaction, filters);
    });
  }
}

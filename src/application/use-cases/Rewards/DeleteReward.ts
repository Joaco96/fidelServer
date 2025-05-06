import { RewardRepository } from "../../../domain/repositories/rewardRepository";
import { UnitOfWork } from "../../../domain/transaction";

export class DeleteReward<T> {
  constructor(
    private rewardRepository: RewardRepository,
    private uow: UnitOfWork<T>
  ) {}

  async execute(id: string): Promise<void> {
    return await this.uow.runInTransaction(async (transaction) => {
      const foundReward = await this.rewardRepository.findBy(
        "id",
        id,
        transaction
      );
      if (!foundReward.length) throw new Error("Beneficio inexistente");
      return await this.rewardRepository.delete(id, transaction);
    });
  }
}
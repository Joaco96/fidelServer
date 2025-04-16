import { Rewards } from "../../../domain/entities/Rewards";
import { RewardRepository } from "../../../domain/repositories/rewardRepository";
import { UnitOfWork } from "../../../domain/transaction";

export class UpdateReward<T> {
  constructor(
    private rewardRepository: RewardRepository,
    private uow: UnitOfWork<T>
  ) {}

  async execute(id: string, data: Partial<Rewards>): Promise<Rewards> {
    return await this.uow.runInTransaction(async (transaction) => {
      const foundReward = await this.rewardRepository.findBy(
        "id",
        id,
        transaction
      );
      if (!foundReward.length) throw new Error("Beneficio inexistente");
      return await this.rewardRepository.update(id, data, transaction);
    });
  }
}

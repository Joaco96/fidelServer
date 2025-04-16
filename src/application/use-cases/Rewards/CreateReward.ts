import { Rewards } from "../../../domain/entities/Rewards";
import { RewardRepository } from "../../../domain/repositories/rewardRepository";
import { UnitOfWork } from "../../../domain/transaction";

export class CreateReward<T> {
  constructor(
    private userRepository: RewardRepository,
    private uow: UnitOfWork<T>
  ) {}

  async execute(reward: Rewards): Promise<Rewards> {
    return await this.uow.runInTransaction(async (transaction) => {
      const foundReward = await this.userRepository.findBy(
        "name",
        reward.name,
        transaction
      );
      if (foundReward.length) throw new Error("El nombre del beneficio ya existe");

      const newReward = new Rewards(
        reward.name,
        reward.description,
        reward.points_cost,
        reward.stock_balance
      );

      return await this.userRepository.save(newReward, transaction);
    });
  }
}

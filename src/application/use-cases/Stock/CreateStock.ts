import { Stock } from "../../../domain/entities/Stock";
import { StockRepository } from "../../../domain/repositories/stockRepository";
import { RewardRepository } from "../../../domain/repositories/rewardRepository";
import { UnitOfWork } from "../../../domain/transaction";

export class CreateStock<T> {
  constructor(
    private stockRepository: StockRepository,
    private rewardRepository: RewardRepository,
    private uow: UnitOfWork<T>
  ) {}

  async execute(stock: Stock): Promise<Stock> {
    return await this.uow.runInTransaction(async (transaction) => {
      const foundRewards = await this.rewardRepository.findBy(
        "id",
        stock.reward_id,
        transaction
      );
      const foundReward = foundRewards[0];
      if (!foundReward) throw new Error("Beneficio inexistente");
      if (stock.quantity < 0 && ((foundReward.stock_balance + stock.quantity) < 0)) throw new Error("Balance del beneficio elegido con stock insuficiente");

      const newStock = new Stock(
        stock.reward_id,
        stock.quantity
      );

      return await this.stockRepository.save(newStock, transaction);
    });
  }
}

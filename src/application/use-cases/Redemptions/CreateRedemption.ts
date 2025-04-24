import { Points } from "../../../domain/entities/Points";
import { Redemptions } from "../../../domain/entities/Redemptions";
import { Stock } from "../../../domain/entities/Stock";
import { PointRepository } from "../../../domain/repositories/pointRepository";
import { RedemptionRepository } from "../../../domain/repositories/redemptionRepository";
import { RewardRepository } from "../../../domain/repositories/rewardRepository";
import { StockRepository } from "../../../domain/repositories/stockRepository";
import { UserRepository } from "../../../domain/repositories/userRepository";
import { UnitOfWork } from "../../../domain/transaction";

export class CreateRedemption<T> {
  constructor(
    private redemptionRepository: RedemptionRepository,
    private pointRepository: PointRepository,
    private stockRepository: StockRepository,
    private userRepository: UserRepository,
    private rewardRepository: RewardRepository,
    private uow: UnitOfWork<T>
  ) {}

  async execute(redemption: Redemptions): Promise<Redemptions> {
    return await this.uow.runInTransaction(async (transaction) => {
      const [foundUser, foundReward] = await Promise.all([
        this.userRepository.findById(redemption.user_id, transaction),
        this.rewardRepository.findBy("id", redemption.reward_id, transaction),
      ]);
      
      if (!foundReward.length) throw new Error("Beneficio inexistente");
      if (foundReward[0].stock_balance < redemption.quantity) throw new Error("No hay stock suficiente del beneficio elegido");

      const pointsUsed = redemption.quantity * foundReward[0].points_cost;

      if (!foundUser) throw new Error("Usuario no existe");
      if (foundUser.points_balance < pointsUsed) throw new Error("El usuario no posee puntos suficientes");

      const newPoint = new Points(
        redemption.user_id,
        pointsUsed * (-1)
      );
      const newStock = new Stock(
        foundReward[0].id,
        redemption.quantity * (-1)
      );

      const newRedemption = new Redemptions(
        foundUser.id, 
        foundReward[0].id, 
        redemption.quantity,
        undefined, 
        undefined,
        false,
        newPoint.id,
        newStock.id
      );

      await this.pointRepository.save(newPoint, transaction);
      await this.stockRepository.save(newStock, transaction);
      return await this.redemptionRepository.save(newRedemption, transaction);
    });
  }
}
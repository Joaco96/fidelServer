import { Redemptions } from "../../../domain/entities/Redemptions";
import { RedemptionRepository } from "../../../domain/repositories/redemptionRepository";
import { UnitOfWork } from "../../../domain/transaction";

export class UpdateRedemptionStatus<T> {
  constructor(
    private redemptionRepository: RedemptionRepository,
    private uow: UnitOfWork<T>
  ) {}

  async execute(id: string, data: Partial<Redemptions>): Promise<Redemptions> {
    return await this.uow.runInTransaction(async (transaction) => {
      const foundRedemption = await this.redemptionRepository.findBy(
        "id",
        id,
        transaction
      );

      if (!foundRedemption.length) throw new Error("Canje inexistente");
      if (foundRedemption[0].is_delivered) throw new Error("Beneficio ya entregado")
      return await this.redemptionRepository.update(id, data, transaction);
    });
  }
}

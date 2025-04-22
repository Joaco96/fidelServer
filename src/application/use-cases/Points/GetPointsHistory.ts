import { Points } from "../../../domain/entities/Points";
import { PointRepository } from "../../../domain/repositories/pointRepository";
import { UnitOfWork } from "../../../domain/transaction";

export class GetPointsHistory<T> {
  constructor(
    private pointRepository: PointRepository,
    private uow: UnitOfWork<T>
  ) {}

  async execute(filters: Partial<Points>): Promise<Array<Points>> {
    return await this.uow.runInTransaction(async (transaction) => {
      return await this.pointRepository.findAll(transaction, filters);
    });
  }
}

import { Points } from "../../../domain/entities/Points";
import { PointRepository } from "../../../domain/repositories/pointRepository";
import { UserRepository } from "../../../domain/repositories/userRepository";
import { UnitOfWork } from "../../../domain/transaction";

export class GetPointsHistory<T> {
  constructor(
    private pointRepository: PointRepository,
    private userRepository: UserRepository,
    private uow: UnitOfWork<T>
  ) {}

  async execute(userId: string): Promise<Array<Points>> {
    return await this.uow.runInTransaction(async (transaction) => {
      const foundUser = await this.userRepository.findById(userId, transaction);
      if(!foundUser) throw new Error("Usuario no existe");
      
      return await this.pointRepository.findAllByUserId(userId, transaction);
    });
  }
}

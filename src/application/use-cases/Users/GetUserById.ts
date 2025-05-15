import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/repositories/userRepository";
import { UnitOfWork } from "../../../domain/transaction";

export class GetUserById<T> {
  constructor(
    private userRepository: UserRepository,
    private uow: UnitOfWork<T>
  ) {}

  async execute(id: string): Promise<Pick<User, "points_balance"> | null> {
    return await this.uow.runInTransaction(async (transaction) => {
      return await this.userRepository.findById(id, transaction);
    });
  }
}
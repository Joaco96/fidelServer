import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/repositories/userRepository";
import { UnitOfWork } from "../../../domain/transaction";

export class GetUsers<T> {
  constructor(
    private userRepository: UserRepository,
    private uow: UnitOfWork<T>
  ) {}

  async execute(filters: Partial<User>): Promise<User[]> {
    return await this.uow.runInTransaction(async (transaction) => {
      return await this.userRepository.findAll(transaction, filters);
    });
  }
}
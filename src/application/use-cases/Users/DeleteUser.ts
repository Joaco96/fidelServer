import { UserRepository } from "../../../domain/repositories/userRepository";
import { UnitOfWork } from "../../../domain/transaction";

export class DeleteUser<T> {
  constructor(
    private userRepository: UserRepository,
    private uow: UnitOfWork<T>
  ) {}

  async execute(id: string): Promise<void> {
    return await this.uow.runInTransaction(async (transaction) => {
      const foundUser = await this.userRepository.findById(
        id,
        transaction
      );
      if (!foundUser) throw new Error("Usuario inexistente");
      return await this.userRepository.delete(id, transaction);
    });
  }
}
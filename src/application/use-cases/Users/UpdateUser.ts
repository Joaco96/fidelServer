import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/repositories/userRepository";
import { hashPassword } from "../../../domain/services/cryptoService";
import { UnitOfWork } from "../../../domain/transaction";

export class UpdateUser<T> {
  constructor(
    private userRepository: UserRepository,
    private uow: UnitOfWork<T>
  ) {}

  async execute(id: string, data: Partial<User>): Promise<User> {
    return await this.uow.runInTransaction(async (transaction) => {
      const foundUser = await this.userRepository.findById(
        id,
        transaction
      );
      if (!foundUser) throw new Error("Usuario inexistente");
      if (data.password) {
        const hashedPassword = await hashPassword(data.password);
        data.password = hashedPassword;
      } 
      return await this.userRepository.update(id, data, transaction);
    });
  }
}

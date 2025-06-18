import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/repositories/userRepository";
import { hashPassword } from "../../../domain/services/cryptoService";
import { UnitOfWork } from "../../../domain/transaction";

export class CreateUser<T> {
  constructor(
    private userRepository: UserRepository,
    private uow: UnitOfWork<T>
  ) {}

  async execute(user: User): Promise<User> {
    return await this.uow.runInTransaction(async (transaction) => {
      const foundUserByEmail = await this.userRepository.findByEmail(
        user.email,
        transaction
      );
      const foundUserByDni = await this.userRepository.findByDni(
        user.dni,
        transaction
      );
      
      if (foundUserByEmail) throw new Error("El email ya esta en uso");
      if (foundUserByDni) throw new Error("Dni ya registrado");

      const hashedPassword = await hashPassword(user.password);

      const newUser = new User(user.name, user.dni, user.email, hashedPassword);

      return await this.userRepository.save(newUser, transaction);
    });
  }
}

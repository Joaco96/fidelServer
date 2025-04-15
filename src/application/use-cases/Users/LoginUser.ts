import { UserRepository } from "../../../domain/repositories/userRepository";
import { comparePasswords } from "../../../domain/services/cryptoService";
import { generateToken } from "../../../domain/services/jwtService";
import { UnitOfWork } from "../../../domain/transaction";

export class LoginUser<T> {
  constructor(
    private userRepository: UserRepository,
    private uow: UnitOfWork<T>
  ) {}

  async execute(email: string, password: string): Promise<string> {
    return await this.uow.runInTransaction(async (transaction) => {
      const user = await this.userRepository.findByEmail(email, transaction);
      if (!user) throw new Error("Usuario no encontrado");

      const isMatch = await comparePasswords(password, user.password);
      if (!isMatch) throw new Error("Contraseña incorrecta");

      return generateToken({
        userId: user.id,
        role: user.role_id,
        name: user.name,
        email: user.email,
        pointsBalance: user.points_balance,
      });
    });
  }
}

import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/repositories/userRepository";
import { hashPassword } from "../../../domain/services/cryptoService";

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(user: User): Promise<User> {
    const foundUser = await this.userRepository.findByEmail(user.email);
    if (foundUser) throw new Error("El email ya esta en uso");

    const hashedPassword = await hashPassword(user.password);

    const newUser = new User(
      user.name,
      user.email,
      hashedPassword,
    );

    return await this.userRepository.save(newUser);
  }
}

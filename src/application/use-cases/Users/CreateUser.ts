import { randomUUID } from "crypto";
import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/repositories/userRepository";
import { RoleIds } from "../../../domain/entities/Role";
import { hashPassword } from "../../../domain/services/cryptoService";
import { UserSchema } from "../../schemas/UserSchema";

const DEFAULT_POINTS_BALANCE = 0;

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(user: User): Promise<User> {
    const validatedData = UserSchema.pick({ password: true }).safeParse({password: user.password});
    if (!validatedData.success) {
      throw new Error("Error de validación: " + validatedData.error.errors.map(e => e.message).join(", "));
    }

    const hashedPassword = await hashPassword(user.password);

    const newUser = new User(
      randomUUID(),
      RoleIds.USER,
      user.name,
      user.email,
      hashedPassword,
      DEFAULT_POINTS_BALANCE
    );

    return await this.userRepository.save(newUser);
  }
}

import { randomUUID } from "crypto";
import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/repositories/userRepository";
import { RoleIds } from "../../../domain/entities/Role";

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(user: User): Promise<User> {
    const newUser = new User(
      randomUUID(),
      randomUUID(),
      RoleIds.USER,
      user.name,
      user.email,
      user.password,
      0
    );
    return await this.userRepository.save(newUser);
  }
}

import { UserRepository } from "../../../domain/repositories/userRepository";
import { comparePasswords } from "../../../domain/services/cryptoService";
import { generateToken } from "../../../domain/services/jwtService";

export class LoginUser {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error("Usuario no encontrado");

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) throw new Error("Contraseña incorrecta");

    return generateToken({ userId: user.id, role: user.role_id, name: user.name, email: user.email, pointsBalance: user.points_balance });
  }
}

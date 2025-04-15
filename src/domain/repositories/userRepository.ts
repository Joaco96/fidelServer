import { User } from "../entities/User";

export interface UserRepository<TTx = unknown>  {
  findById(id: string, transaction?: TTx): Promise<User | null>;
  findByEmail(email: string, transaction?: TTx): Promise<User | null>;
  save(user: User, transaction?: TTx): Promise<User>;
}

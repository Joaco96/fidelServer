import { User } from "../entities/User";

export interface UserRepository<TTx = unknown> {
  findById(id: string, transaction: TTx): Promise<User | null>;
  findByEmail(email: string, transaction: TTx): Promise<User | null>;
  findByDni(dni: string, transaction: TTx): Promise<User | null>;
  findAll(transaction: TTx, filters?: Partial<User>): Promise<Array<User>>;
  save(user: User, transaction: TTx): Promise<User>;
  update(id: string, data: Partial<User>, transaction: TTx): Promise<User>;
  delete(id: string, transaction: TTx): Promise<void>;
}

import { Stores } from "../entities/Stores";

export interface StoreRepository<T = unknown> {
  findAll(transaction: T, filters?: Partial<Stores>): Promise<Array<Stores>>;
  findBy<K>(key: string, value: K, transaction: T): Promise<Array<Stores>>;
  save(reward: Stores, transaction: T): Promise<Stores>;
  update(id: string, data: Partial<Stores>, transaction: T): Promise<Stores>;
  delete(id: string, transaction: T): Promise<void>;
}
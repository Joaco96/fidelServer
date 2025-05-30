import { Rewards } from "../entities/Rewards";

export interface RewardRepository<TTx = unknown> {
  findAll(transaction: TTx, filters?: Partial<Rewards>): Promise<Array<Rewards>>;
  findBy<T>(key: string, value: T, transaction: TTx): Promise<Array<Rewards>>;
  save(reward: Rewards, transaction: TTx): Promise<Rewards>;
  update(id: string, data: Partial<Rewards>, transaction: TTx): Promise<Rewards>;
  delete(id: string, transaction: TTx): Promise<void>;
}

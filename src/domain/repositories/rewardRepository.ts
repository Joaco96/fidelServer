import { Rewards } from "../entities/Rewards";

export interface RewardRepository<TTx = unknown> {
  findBy<T>(key: string, value: T, transaction: TTx): Promise<Rewards | null>;
  save(point: Rewards, transaction: TTx): Promise<Rewards>;
}

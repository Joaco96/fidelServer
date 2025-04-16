import { Rewards } from "../entities/Rewards";

export interface RewardRepository<TTx = unknown> {
  findBy<T>(key: string, value: T, transaction: TTx): Promise<Array<Rewards>>;
  save(point: Rewards, transaction: TTx): Promise<Rewards>;
}

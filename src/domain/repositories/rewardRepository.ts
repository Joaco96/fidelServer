import { Rewards } from "../entities/Rewards";

export interface RewardRepository<TTx = unknown>  {
//   findByUserId(userId: string, transaction: TTx): Promise<Array<Rewards>>;
  save(point: Rewards, transaction: TTx): Promise<Rewards>;
}

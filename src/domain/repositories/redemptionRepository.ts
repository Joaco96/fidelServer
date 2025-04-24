import { Redemptions } from "../entities/Redemptions";

export interface RedemptionRepository<TTx = unknown> {
  findAll(transaction: TTx, filters?: Partial<Redemptions>): Promise<Array<Redemptions>>;
  // findBy<T>(key: string, value: T, transaction: TTx): Promise<Array<Rewards>>;
  save(reward: Redemptions, transaction: TTx): Promise<Redemptions>;
  // update(id: string, data: Partial<Rewards>, transaction: TTx): Promise<Rewards>;
}

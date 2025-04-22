import { Stock } from "../entities/Stock";

export interface StockRepository<TTx = unknown> {
//   findAll(transaction: TTx): Promise<Array<Stocks>>;
//   findBy<T>(key: string, value: T, transaction: TTx): Promise<Array<Stocks>>;
  save(reward: Stock, transaction: TTx): Promise<Stock>;
//   update(id: string, data: Partial<Stocks>, transaction: TTx): Promise<Stocks>;
}

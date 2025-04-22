import { Points } from "../entities/Points";

export interface PointRepository<TTx = unknown>  {
  findAll(transaction: TTx, filters?: Partial<Points>): Promise<Array<Points>>;
  save(point: Points, transaction: TTx): Promise<Points>;
}

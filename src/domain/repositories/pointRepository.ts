import { Points } from "../entities/Points";

export interface PointRepository<TTx = unknown>  {
  findByUserId(userId: string, transaction: TTx): Promise<Array<Points>>;
  save(point: Points, transaction: TTx): Promise<Points>;
}

import { Points } from "../entities/Points";

export interface PointRepository<TTx = unknown>  {
  findAllByUserId(userId: string, transaction: TTx): Promise<Array<Points>>;
  save(point: Points, transaction: TTx): Promise<Points>;
}

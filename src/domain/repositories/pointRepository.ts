import { Points } from "../entities/Points";

export interface PointRepository<TTx = unknown>  {
  // findById(id: string, transaction?: TTx): Promise<Points | null>;
  save(point: Points, transaction?: TTx): Promise<Points>;
}

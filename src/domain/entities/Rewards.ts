import { UUID } from "crypto";

export class Rewards {
  constructor(
    public id: UUID,
    public name: string,
    public description: string,
    public points_cost: number,
    public stock_balance: number,
  ) {}
}

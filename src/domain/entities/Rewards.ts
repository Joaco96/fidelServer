import { randomUUID, UUID } from "crypto";

export class Rewards {
  public readonly id: UUID;

  constructor(
    public name: string,
    public description: string,
    public points_cost: number,
    public stock_balance: number,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {
    this.id = randomUUID();
  }
}

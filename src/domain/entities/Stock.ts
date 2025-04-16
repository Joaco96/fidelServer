import { randomUUID, UUID } from "crypto";

export class Stock {
  public readonly id: UUID;

  constructor(
    public reward_id: UUID,
    public quantity: number,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {
    this.id = randomUUID();
  }
}

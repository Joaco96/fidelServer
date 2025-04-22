import { randomUUID, UUID } from "crypto";

export class Redemptions {
  public readonly id: UUID;

  constructor(
    public user_id: UUID,
    public reward_id: UUID,
    public points_used: number,
    public is_delivered: boolean,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {
    this.id = randomUUID();
  }
}

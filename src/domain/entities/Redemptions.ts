import { randomUUID, UUID } from "crypto";

export class Redemptions {
  public readonly id: UUID;
  public readonly is_delivered: boolean;

  constructor(
    public user_id: UUID,
    public reward_id: UUID,
    public points_used: number,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {
    this.id = randomUUID();
    this.is_delivered = false;
  }
}

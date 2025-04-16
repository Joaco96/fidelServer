import { randomUUID, UUID } from "crypto";

export class Points {
  public readonly id: UUID;

  constructor(
    public user_id: UUID,
    public amount: number,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {
    this.id = randomUUID();
  }
}

import { randomUUID, UUID } from "crypto";
import { Rewards } from "./Rewards";

export class Redemptions {
  public readonly id: UUID;
  public reward?: Rewards;
  public qr_code?: string

  constructor(
    public user_id: UUID,
    public reward_id: UUID,
    public quantity: number,
    public createdAt?: Date,
    public updatedAt?: Date,
    public is_delivered?: boolean,
    public point_id?: UUID,
    public stock_id?: UUID,
  ) {
    this.id = randomUUID();
    this.is_delivered = is_delivered ?? false;
  }
}

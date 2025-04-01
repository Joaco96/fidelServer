import { UUID } from "crypto";

export class Redemptions {
  constructor(
    public id: UUID,
    public user_id: UUID,
    public reward_id: UUID,
    public points_used: number,
  ) {}
}

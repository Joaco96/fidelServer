import { UUID } from "crypto";

export class Tickets {
  constructor(
    public id: UUID,
    public user_id: UUID,
    public store_id: UUID,
    public amount_spent: number,
    public points_earned: number,
    public created_at: Date,
    public updated_at: Date,
  ) {}
}

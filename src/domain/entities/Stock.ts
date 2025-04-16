import { UUID } from "crypto";

export class Stock {
  constructor(
    public id: UUID,
    public reward_id: UUID,
    public quantity: number,
    public created_at?: Date,
    public updated_at?: Date
  ) {}
}

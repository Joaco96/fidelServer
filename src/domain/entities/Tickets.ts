import { UUID } from "crypto";
import { Stores } from "./Stores";

export class Tickets {
  public points_earned: number;
  public store?: Stores;

  constructor(
    public id: string,
    public user_id: UUID,
    public store_id: UUID,
    public amount_spent: number,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {
    this.points_earned = this.calculatePoints(amount_spent);
  }

  private calculatePoints(amountSpent: number): number {
    return Math.floor(amountSpent / 10);
  }
}

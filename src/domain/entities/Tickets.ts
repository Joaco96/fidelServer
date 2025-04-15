import { UUID } from "crypto";

export class Tickets {
  public points_earned: number;

  constructor(
    public id: string,
    public user_id: UUID,
    public store_id: UUID,
    public amount_spent: number
  ) {
    this.points_earned = this.calculatePoints(amount_spent);
  }

  private calculatePoints(amountSpent: number): number {
    return Math.floor(amountSpent / 10);
  }
}

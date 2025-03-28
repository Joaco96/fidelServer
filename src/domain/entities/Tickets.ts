export class Tickets {
  constructor(
    public id: string,
    public user_id: string,
    public store_id: string,
    public amount_spent: number,
    public points_earned: number,
    public created_at: Date = new Date()
  ) {}
}

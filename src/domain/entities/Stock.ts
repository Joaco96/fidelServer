export class Stock {
  constructor(
    public id: string,
    public reward_id: string,
    public quantity: number,
    public type: string,
    public created_at: Date = new Date()
  ) {}
}

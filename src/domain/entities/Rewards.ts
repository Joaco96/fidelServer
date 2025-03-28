export class Rewards {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public points_cost: number,
    public stock_balance: number,
    public created_at: Date = new Date()
  ) {}
}

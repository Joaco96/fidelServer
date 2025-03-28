export class Redemptions {
  constructor(
    public id: string,
    public user_id: string,
    public reward_id: string,
    public points_used: number,
    public created_at: Date = new Date()
  ) {}
}

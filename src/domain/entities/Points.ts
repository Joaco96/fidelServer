export class Points {
  constructor(
    public id: string,
    public user_id: string,
    public amount: number,
    public created_at: Date = new Date()
  ) {}
}

import { UUID } from "crypto";

export class Points {
  constructor(
    public id: UUID,
    public user_id: string,
    public amount: number,
    public created_at: Date = new Date()
  ) {}
}

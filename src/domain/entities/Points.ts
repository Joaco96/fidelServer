import { UUID } from "crypto";

export class Points {
  constructor(
    public id: UUID,
    public user_id: UUID,
    public amount: number,
  ) {}
}

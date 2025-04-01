import { UUID } from "crypto";

export class Stores {
  constructor(
    public id: UUID,
    public name: string,
    public location: string,
    public contact: string,
    public created_at: Date,
    public updated_at: Date,
  ) {}
}

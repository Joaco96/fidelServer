import { randomUUID, UUID } from "crypto";

export class Stores {
  public readonly id: UUID;

  constructor(
    public name: string,
    public location: string,
    public contact: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {
    this.id = randomUUID();
  }
}

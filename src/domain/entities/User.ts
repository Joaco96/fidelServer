import { UUID } from "crypto";

export class User {
  constructor(
    public id: UUID,
    public auth0_id: string,
    public name: string,
    public email: string,
    public password: string,
    public points_balance: number,
    public created_at: Date,
    public updated_at: Date,
  ) {}

  validateEmail(): boolean {
    return /\S+@\S+\.\S+/.test(this.email);
  }
}

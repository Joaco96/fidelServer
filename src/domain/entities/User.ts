export class User {
  constructor(
    public id: string,
    public auth0_id: string,
    public name: string,
    public email: string,
    public password: string,
    public points_balance: number,
    public created_at: Date = new Date()
  ) {}

  validateEmail(): boolean {
    return /\S+@\S+\.\S+/.test(this.email);
  }
}

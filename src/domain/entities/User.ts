import { randomUUID, UUID } from "crypto";
import { RoleIds } from "./Role";

const DEFAULT_POINTS_BALANCE = 0;

export class User {
  public readonly id: UUID;
  public readonly points_balance: number;

  constructor(
    public name: string,
    public dni: string,
    public email: string,
    public password: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public role_id?: RoleIds,
  ) {
    this.id = randomUUID();
    this.role_id = role_id ?? RoleIds.USER;
    this.points_balance = DEFAULT_POINTS_BALANCE;
  }
}

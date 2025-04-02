import { UUID } from "crypto";
import { RoleIds } from "./Role";
import { UserSchema } from "../../application/schemas/UserSchema";

export class User {
  constructor(
    public id: UUID,
    public auth0_id: string,
    public role_id: RoleIds,
    public name: string,
    public email: string,
    public password: string,
    public points_balance: number,
  ) {
    const validatedData = UserSchema.safeParse({id, auth0_id, role_id, name, email, password, points_balance});
    if (!validatedData.success) {
      throw new Error("Invalid user data: " + validatedData.error.errors.map(e => e.message).join(", "));
    }
    this.id = validatedData.data.id as UUID;
    this.auth0_id = validatedData.data.auth0_id;
    this.role_id = validatedData.data.role_id;
    this.name = validatedData.data.name;
    this.email = validatedData.data.email;
    this.password = validatedData.data.password;
    this.points_balance = validatedData.data.points_balance;
  }
}

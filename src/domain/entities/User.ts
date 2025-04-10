import { UUID } from "crypto";
import { RoleIds } from "./Role";
import { UserSchema } from "../../application/schemas/UserSchema";

export class User {
  constructor(
    public id: UUID,
    public role_id: RoleIds,
    public name: string,
    public email: string,
    public password: string,
    public points_balance: number,
  ) {
    const validatedData = UserSchema.omit({ password: true }).safeParse({id, role_id, name, email, password, points_balance});
    if (!validatedData.success) {
      throw new Error("Error de validación: " + validatedData.error.errors.map(e => e.message).join(", "));
    }
    this.id = validatedData.data.id as UUID;
    this.role_id = validatedData.data.role_id;
    this.name = validatedData.data.name;
    this.email = validatedData.data.email;
    this.password = this.password;
    this.points_balance = validatedData.data.points_balance;
  }
}

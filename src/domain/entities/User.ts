import { UUID } from "crypto";
import { RoleIds } from "./Role";
import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const UserSchema = z.object({
  name: z.string().min(1, "El nombre no puede estar vacío").openapi({ type: "string" }),
  email: z.string().email("Email inválido").openapi({ type: "string" }),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres").openapi({ type: "string" }),
});

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
    const validatedData = UserSchema.safeParse({name, email, password});
    if (!validatedData.success) {
      throw new Error("Invalid user data: " + validatedData.error.errors.map(e => e.message).join(", "));
    }
    this.name = validatedData.data.name;
    this.email = validatedData.data.email;
    this.password = validatedData.data.password;
  }
}

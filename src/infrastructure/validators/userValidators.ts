import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const UserSchema = z.object({
  id: z
    .string()
    .uuid()
    .openapi({ example: "550e8400-e29b-41d4-a716-446655440000" }),
  role_id: z.number().openapi({ example: 0 }),
  name: z
    .string()
    .min(1, "El nombre no puede estar vacío")
    .openapi({ type: "string" }),
  email: z
    .string()
    .email("Email inválido")
    .openapi({ example: "email@email.com" }),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .openapi({ type: "string" }),
  points_balance: z.number().openapi({ example: 0 }),
});

export const CreateUserSchema = UserSchema.omit({
  id: true,
  role_id: true,
  points_balance: true,
});
export const CreateUserResponseSchema = z.object({
  message: z.string(),
  id: UserSchema.shape.id,
});

export const LoginUserSchema = UserSchema.omit({
  id: true,
  role_id: true,
  points_balance: true,
  name: true,
});
export const LoginUserResponseSchema = z.object({
  message: z.string(),
  token: z.string(),
});

export const GetUserSchema = UserSchema.omit({ password: true });
export const GetUsersListSchema = z.array(GetUserSchema);
export const GetUserParamsSchema = z.object({ id: UserSchema.shape.id });

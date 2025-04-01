import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { UserSchema } from "../../../domain/entities/User";

const USER_CONTROLLER_TAG = ["Users"];

export const userRegistry: RouteConfig = {
  method: "post",
  path: `/api/v1/users`,
  tags: USER_CONTROLLER_TAG,
  description: "Alta de usuario",
  summary: "Crea un nuevo usuario",
  request: {
    body: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Usuario creado exitosamente",
    },
  },
}
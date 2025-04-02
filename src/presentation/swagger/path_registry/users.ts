import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { GetUserSchema, CreateUserSchema, GetUserParamsSchema, GetUsersListSchema } from "../../../application/schemas/UserSchema";

const USER_CONTROLLER_TAG = ["Users"];

export const userRegistry: RouteConfig[] = [
  {
    method: "get",
    path: `/api/v1/users/:id`,
    tags: USER_CONTROLLER_TAG,
    summary: "Obtiene un usuario por id",
    request: {
      params: GetUserParamsSchema,
    },
    responses: {
      200: {
        description: "Usuario obtenido exitosamente",
        content: {
          "application/json": {
            schema: GetUserSchema,
          },
        },
      },
    },
  },
  {
    method: "get",
    path: `/api/v1/users`,
    tags: USER_CONTROLLER_TAG,
    summary: "Obtiene una lista de usuarios",
    responses: {
      200: {
        description: "Lista de Usuarios obtenidos exitosamente",
        content: {
          "application/json": {
            schema: GetUsersListSchema,
          },
        },
      },
    },
  },
  {
    method: "post",
    path: `/api/v1/users`,
    tags: USER_CONTROLLER_TAG,
    summary: "Crea un nuevo usuario",
    request: {
      body: {
        content: {
          "application/json": {
            schema: CreateUserSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: "Usuario creado exitosamente",
      },
    },
  },
];

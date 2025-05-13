import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import {
  CreateUserSchema,
  LoginUserSchema,
  CreateUserResponseSchema,
  LoginUserResponseSchema,
  UsersFiltersSchema,
  GetUserSchema,
  DeleteUserParamsSchema,
  UpdateUserSchema,
  UpdateUserParamsSchema,
  UpdateUserRoleSchema,
} from "../../../infrastructure/validators/userValidators";
import {
  errorApiSchema,
  makeApiResponseSchema,
} from "../schemas/apiResponseSchema";
import { z } from "zod";

const USER_CONTROLLER_TAG = ["Users"];

export const userRegistry: RouteConfig[] = [
  {
    method: "get",
    path: `/api/v1/users`,
    tags: USER_CONTROLLER_TAG,
    summary: "Obtiene lista de usuarios filtrados",
    security: [{ bearerAuth: [] }], // Para que se vea el candado en swagger y poder autenticar
    request: {
      query: UsersFiltersSchema,
    },
    responses: {
      200: {
        description: "Usuarios obtenidos exitosamente",
        content: {
          "application/json": {
            schema: makeApiResponseSchema(GetUserSchema),
          },
        },
      },
      400: {
        description: "Error interno del servidor",
        content: {
          "application/json": {
            schema: errorApiSchema,
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
    // security: [{ bearerAuth: [] }], // Para que se vea el candado en swagger y poder autenticar
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
        content: {
          "application/json": {
            schema: makeApiResponseSchema(CreateUserResponseSchema),
          },
        },
      },
      400: {
        description: "Error de validación",
        content: {
          "application/json": {
            schema: errorApiSchema,
          },
        },
      },
    },
  },
  {
    method: "post",
    path: `/api/v1/users/login`,
    tags: USER_CONTROLLER_TAG,
    summary: "Loguea un usuario",
    request: {
      body: {
        content: {
          "application/json": {
            schema: LoginUserSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Usuario logueado exitosamente",
        content: {
          "application/json": {
            schema: makeApiResponseSchema(LoginUserResponseSchema),
          },
        },
      },
      400: {
        description: "Error de validación",
        content: {
          "application/json": {
            schema: errorApiSchema,
          },
        },
      },
    },
  },
  {
    method: "patch",
    path: `/api/v1/users/{id}`,
    tags: USER_CONTROLLER_TAG,
    summary: "Actualiza la información de un usuario",
    security: [{ bearerAuth: [] }],
    request: {
      body: {
        content: {
          "application/json": {
            schema: UpdateUserSchema,
          },
        },
      },
      params: UpdateUserParamsSchema,
    },
    responses: {
      200: {
        description: "Usuario actualizado exitosamente",
        content: {
          "application/json": {
            schema: makeApiResponseSchema(GetUserSchema),
          },
        },
      },
      400: {
        description: "Error de validación",
        content: {
          "application/json": {
            schema: errorApiSchema,
          },
        },
      },
    },
  },
  {
    method: "patch",
    path: `/api/v1/users/assign-role/{id}`,
    tags: USER_CONTROLLER_TAG,
    summary: "Actualiza el rol de un usuario",
    security: [{ bearerAuth: [] }],
    request: {
      body: {
        content: {
          "application/json": {
            schema: UpdateUserRoleSchema,
          },
        },
      },
      params: UpdateUserParamsSchema,
    },
    responses: {
      200: {
        description: "Rol de usuario actualizado exitosamente",
        content: {
          "application/json": {
            schema: makeApiResponseSchema(GetUserSchema),
          },
        },
      },
      400: {
        description: "Error de validación",
        content: {
          "application/json": {
            schema: errorApiSchema,
          },
        },
      },
    },
  },
  {
    method: "delete",
    path: `/api/v1/users/{id}`,
    tags: USER_CONTROLLER_TAG,
    summary: "Elimina un usuario",
    security: [{ bearerAuth: [] }],
    request: {
      params: DeleteUserParamsSchema,
    },
    responses: {
      204: {
        description: "Usuario eliminado exitosamente",
        content: {
          "application/json": {
            schema: makeApiResponseSchema(z.tuple([])),
          },
        },
      },
      500: {
        description: "No encontramos al usuario requerido",
        content: {
          "application/json": {
            schema: errorApiSchema,
          },
        },
      },
    },
  },
];

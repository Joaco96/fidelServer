import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { CreateUserSchema, LoginUserSchema, CreateUserResponseSchema, LoginUserResponseSchema } from "../../../infrastructure/validators/userValidators";
import { errorApiSchema, makeApiResponseSchema } from "../schemas/apiResponseSchema";

const USER_CONTROLLER_TAG = ["Users"];

export const userRegistry: RouteConfig[] = [
  {
    method: "post",
    path: `/api/v1/users`,
    tags: USER_CONTROLLER_TAG,
    summary: "Crea un nuevo usuario",
    security: [{ bearerAuth: [] }], // Para que se vea el candado en swagger y poder autenticar
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
          'application/json': {
            schema: makeApiResponseSchema(CreateUserResponseSchema),
          },
        },
      },
      400: {
        description: 'Error de validación',
        content: {
          'application/json': {
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
    summary: "Logea un usuario",
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
          'application/json': {
            schema: makeApiResponseSchema(LoginUserResponseSchema),
          },
        },
      },
      400: {
        description: 'Error de validación',
        content: {
          'application/json': {
            schema: errorApiSchema,
          },
        },
      },
    },
  },
];

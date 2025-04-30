import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import {
  errorApiSchema,
  makeApiResponseSchema,
} from "../schemas/apiResponseSchema";
import {
  CreateRewardResponseSchema,
  CreateRewardSchema,
  RewardFiltersSchema,
  RewardSchema,
  UpdateRewardParamsSchema,
  UpdateRewardSchema,
} from "../../../infrastructure/validators/rewardsValidators";

const REWARD_CONTROLLER_TAG = ["Rewards"];

export const rewardsRegistry: RouteConfig[] = [
  {
    method: "get",
    path: `/api/v1/rewards`,
    tags: REWARD_CONTROLLER_TAG,
    summary: "Obtiene lista de beneficios filtrados",
    security: [{ bearerAuth: [] }], // Para que se vea el candado en swagger y poder autenticar
    request: {
      query: RewardFiltersSchema,
    },
    responses: {
      201: {
        description: "Beneficios obtenidos exitosamente",
        content: {
          "application/json": {
            schema: makeApiResponseSchema(RewardSchema),
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
    path: `/api/v1/rewards`,
    tags: REWARD_CONTROLLER_TAG,
    summary: "Crea un nuevo beneficio",
    security: [{ bearerAuth: [] }], // Para que se vea el candado en swagger y poder autenticar
    request: {
      body: {
        content: {
          "application/json": {
            schema: CreateRewardSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: "Beneficio creado exitosamente",
        content: {
          "application/json": {
            schema: makeApiResponseSchema(CreateRewardResponseSchema),
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
    path: `/api/v1/rewards/{id}`,
    tags: REWARD_CONTROLLER_TAG,
    summary: "Actualiza un beneficio",
    security: [{ bearerAuth: [] }],
    request: {
      body: {
        content: {
          "application/json": {
            schema: UpdateRewardSchema,
          },
        },
      },
      params: UpdateRewardParamsSchema,
    },
    responses: {
      200: {
        description: "Beneficio actualizado exitosamente",
        content: {
          "application/json": {
            schema: makeApiResponseSchema(RewardSchema),
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
];

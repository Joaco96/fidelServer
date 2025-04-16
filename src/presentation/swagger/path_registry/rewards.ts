import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { errorApiSchema, makeApiResponseSchema } from "../schemas/apiResponseSchema";
import { CreateRewardResponseSchema, CreateRewardSchema } from "../../../infrastructure/validators/rewardsValidators";

const REWARD_CONTROLLER_TAG = ["Rewards"];

export const rewardsRegistry: RouteConfig[] = [
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
          'application/json': {
            schema: makeApiResponseSchema(CreateRewardResponseSchema),
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

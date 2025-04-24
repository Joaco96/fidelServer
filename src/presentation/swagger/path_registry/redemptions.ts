import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import {
  errorApiSchema,
  makeApiResponseSchema,
} from "../schemas/apiResponseSchema";
import { CreateRedemptionSchema, CreateRedemtionResponseSchema } from "../../../infrastructure/validators/redemptionsValidators";

const REDEMPTIONS_CONTROLLER_TAG = ["Redemptions"];

export const redemptionsRegistry: RouteConfig[] = [
  {
    method: "post",
    path: `/api/v1/redemptions`,
    tags: REDEMPTIONS_CONTROLLER_TAG,
    summary: "Realiza un nuevo canje",
    security: [{ bearerAuth: [] }], // Para que se vea el candado en swagger y poder autenticar
    request: {
      body: {
        content: {
          "application/json": {
            schema: CreateRedemptionSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: "Canje realizado exitosamente",
        content: {
          "application/json": {
            schema: makeApiResponseSchema(CreateRedemtionResponseSchema),
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

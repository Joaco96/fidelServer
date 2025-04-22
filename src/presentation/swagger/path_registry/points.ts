import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import {
  errorApiSchema,
  makeApiResponseSchema,
} from "../schemas/apiResponseSchema";
import {
  GetPointHistoryFiltersSchema,
  GetPointHistorySchema,
} from "../../../infrastructure/validators/pointsValidators";

const POINT_CONTROLLER_TAG = ["Points"];

export const pointRegistry: RouteConfig[] = [
  {
    method: "get",
    path: `/api/v1/points`,
    tags: POINT_CONTROLLER_TAG,
    summary: "Obtiene lista de movimiento de puntos filtrados",
    security: [{ bearerAuth: [] }], // Para que se vea el candado en swagger y poder autenticar
    request: {
      query: GetPointHistoryFiltersSchema,
    },
    responses: {
      200: {
        description: "Lista de movimiento de puntos obtenida exitosamente",
        content: {
          "application/json": {
            schema: makeApiResponseSchema(GetPointHistorySchema),
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

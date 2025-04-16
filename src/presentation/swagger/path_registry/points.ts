import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { errorApiSchema, makeApiResponseSchema } from "../schemas/apiResponseSchema";
import { GetPointHistoryParamsSchema, GetPointHistorySchema } from "../../../infrastructure/validators/pointsValidators";

const POINT_CONTROLLER_TAG = ["Points"];

export const pointRegistry: RouteConfig[] = [
  {
    method: "get",
    path: `/api/v1/points/history/{user_id}`,
    tags: POINT_CONTROLLER_TAG,
    summary: "Obtiene lista de movimiento de puntos por usuario",
    security: [{ bearerAuth: [] }], // Para que se vea el candado en swagger y poder autenticar
    request: {
      params: GetPointHistoryParamsSchema,
    },
    responses: {
      200: {
        description: "Lista de movimiento de puntos obtenida exitosamente",
        content: {
          'application/json': {
            schema: makeApiResponseSchema(GetPointHistorySchema),
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
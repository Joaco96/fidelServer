import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { errorApiSchema, makeApiResponseSchema } from "../schemas/apiResponseSchema";
import { CreateStockResponseSchema, CreateStockSchema } from "../../../infrastructure/validators/stockValidators";

const STOCK_CONTROLLER_TAG = ["Stock"];

export const stockRegistry: RouteConfig[] = [
  {
    method: "post",
    path: `/api/v1/stock`,
    tags: STOCK_CONTROLLER_TAG,
    summary: "Crea un nuevo movimiento de stock",
    security: [{ bearerAuth: [] }], // Para que se vea el candado en swagger y poder autenticar
    request: {
      body: {
        content: {
          "application/json": {
            schema: CreateStockSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: "Movimiento de stock creado exitosamente",
        content: {
          'application/json': {
            schema: makeApiResponseSchema(CreateStockResponseSchema),
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

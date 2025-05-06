import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import {
  errorApiSchema,
  makeApiResponseSchema,
} from "../schemas/apiResponseSchema";
import {
  CreateStoreResponseSchema,
  CreateStoreSchema,
  StoreFiltersSchema,
  StoreSchema,
  UpdateStoreParamsSchema,
  UpdateStoreSchema,
} from "../../../infrastructure/validators/storesValidators";

const STORE_CONTROLLER_TAG = ["Stores"];

export const storesRegistry: RouteConfig[] = [
  {
    method: "get",
    path: `/api/v1/stores`,
    tags: STORE_CONTROLLER_TAG,
    summary: "Obtiene lista de stores filtrados",
    security: [{ bearerAuth: [] }], // Para que se vea el candado en swagger y poder autenticar
    request: {
      query: StoreFiltersSchema,
    },
    responses: {
      201: {
        description: "Stores obtenidos exitosamente",
        content: {
          "application/json": {
            schema: makeApiResponseSchema(StoreSchema),
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
    path: `/api/v1/stores`,
    tags: STORE_CONTROLLER_TAG,
    summary: "Crea un nuevo store",
    security: [{ bearerAuth: [] }], // Para que se vea el candado en swagger y poder autenticar
    request: {
      body: {
        content: {
          "application/json": {
            schema: CreateStoreSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: "Store creado exitosamente",
        content: {
          "application/json": {
            schema: makeApiResponseSchema(CreateStoreResponseSchema),
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
    path: `/api/v1/stores/{id}`,
    tags: STORE_CONTROLLER_TAG,
    summary: "Actualiza un store",
    security: [{ bearerAuth: [] }],
    request: {
      body: {
        content: {
          "application/json": {
            schema: UpdateStoreSchema,
          },
        },
      },
      params: UpdateStoreParamsSchema,
    },
    responses: {
      200: {
        description: "Store actualizado exitosamente",
        content: {
          "application/json": {
            schema: makeApiResponseSchema(StoreSchema),
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

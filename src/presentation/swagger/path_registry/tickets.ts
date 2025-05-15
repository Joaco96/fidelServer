import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import {
  errorApiSchema,
  makeApiResponseSchema,
} from "../schemas/apiResponseSchema";
import {
  CreateTicketResponseSchema,
  CreateTicketSchema,
  GetFilteredTicketsSchema,
  GetTicketsResponseSchema,
} from "../../../infrastructure/validators/ticketsValidators";

const TICKET_CONTROLLER_TAG = ["Tickets"];

export const ticketRegistry: RouteConfig[] = [
  {
    method: "get",
    path: `/api/v1/tickets`,
    tags: TICKET_CONTROLLER_TAG,
    summary: "Obtiene lista de tickets filtrados",
    security: [{ bearerAuth: [] }], // Para que se vea el candado en swagger y poder autenticar
    request: {
      query: GetFilteredTicketsSchema,
    },
    responses: {
      200: {
        description: "Tickets obtenidos exitosamente",
        content: {
          "application/json": {
            schema: makeApiResponseSchema(GetTicketsResponseSchema),
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
    path: `/api/v1/tickets`,
    tags: TICKET_CONTROLLER_TAG,
    summary: "Crea un nuevo ticket",
    security: [{ bearerAuth: [] }], // Para que se vea el candado en swagger y poder autenticar
    request: {
      body: {
        content: {
          "application/json": {
            schema: CreateTicketSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: "Ticket creado exitosamente",
        content: {
          "application/json": {
            schema: makeApiResponseSchema(CreateTicketResponseSchema),
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

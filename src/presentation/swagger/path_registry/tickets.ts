import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { errorApiSchema, makeApiResponseSchema } from "../schemas/apiResponseSchema";
import { CreateTicketResponseSchema, CreateTicketSchema } from "../../../infrastructure/validators/ticketsValidators";

const TICKET_CONTROLLER_TAG = ["Tickets"];

export const ticketRegistry: RouteConfig[] = [
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
          'application/json': {
            schema: makeApiResponseSchema(CreateTicketResponseSchema),
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

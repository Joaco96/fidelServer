import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const TicketSchema = z.object({
  id: z.string().openapi({ example: "88877654333" }),
  user_id: z
    .string()
    .uuid()
    .openapi({ example: "550e8400-e29b-41d4-a716-446655440000" }),
  store_id: z
    .string()
    .uuid()
    .openapi({ example: "550e8400-e29b-41d4-a716-446655440000" }),
  amount_spent: z.number().openapi({ example: 0 }),
  points_earned: z.number().openapi({ example: 0 }),
});

export const CreateTicketSchema = TicketSchema.omit({ points_earned: true });
export const CreateTicketResponseSchema = z.object({
  message: z.string(),
  points_earned: TicketSchema.shape.points_earned,
});

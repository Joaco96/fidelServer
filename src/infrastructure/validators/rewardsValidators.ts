import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const RewardSchema = z.object({
  id: z.string().uuid().openapi({ example: "550e8400-e29b-41d4-a716-446655440000" }),
  name: z.string().openapi({ example: "string" }),
  description: z.string().openapi({ example: "string" }),
  points_cost: z.number().openapi({ example: 0 }),
  stock_balance: z.number().openapi({ example: 0 }),
});

export const CreateRewardSchema = RewardSchema.omit({ id: true });
export const CreateRewardResponseSchema = z.object({ message: z.string(), id: RewardSchema.shape.id });

export const UpdateRewardSchema = RewardSchema.omit({ id: true, stock_balance: true });
export const UpdateRewardParamsSchema = RewardSchema.pick({ id: true });
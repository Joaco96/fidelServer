import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { createFilterSchemaFromBase } from "../../utils/filters/createFilterSchemaFromBase";

extendZodWithOpenApi(z);

export const RewardSchema = z.object({
  id: z
    .string()
    .uuid()
    .openapi({ example: "550e8400-e29b-41d4-a716-446655440000" }),
  name: z.string().openapi({ example: "string" }),
  description: z.string().openapi({ example: "string" }),
  points_cost: z.number().openapi({ example: 0 }),
  stock_balance: z.number().openapi({ example: 0 }),
  created_at: z.date().openapi({ example: "2025-04-15T21:16:10.095Z" }),
  updated_at: z.date().openapi({ example: "2025-04-15T21:16:10.095Z" }),
});

export const CreateRewardSchema = RewardSchema.omit({ id: true, created_at: true, updated_at: true });
export const CreateRewardResponseSchema = z.object({
  message: z.string(),
  id: RewardSchema.shape.id,
});

export const UpdateRewardSchema = RewardSchema.omit({
  id: true,
  stock_balance: true,
  created_at: true, 
  updated_at: true
}).partial();
export const UpdateRewardParamsSchema = RewardSchema.pick({ id: true });
export const DeleteRewardParamsSchema = RewardSchema.pick({ id: true });

export const RewardFiltersSchema = createFilterSchemaFromBase(RewardSchema);

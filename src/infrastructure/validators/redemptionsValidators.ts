import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { RewardSchema } from "./rewardsValidators";
import { createFilterSchemaFromBase } from "../../utils/filters/createFilterSchemaFromBase";

extendZodWithOpenApi(z);

export const RedemptionSchema = z.object({
  id: z
    .string()
    .uuid()
    .openapi({ example: "550e8400-e29b-41d4-a716-446655440000" }),
  user_id: z
    .string()
    .uuid()
    .openapi({ example: "550e8400-e29b-41d4-a716-446655440000" }),
  reward_id: z
    .string()
    .uuid()
    .openapi({ example: "550e8400-e29b-41d4-a716-446655440000" }),
  quantity: z.number().openapi({ example: 0 }),
  created_at: z.date().openapi({ example: "2025-04-15T21:16:10.095Z" }),
  updated_at: z.date().openapi({ example: "2025-04-15T21:16:10.095Z" }),
});

export const GetRedemptionSchema = z.array(RedemptionSchema.extend({
  reward: RewardSchema
}));

export const CreateRedemptionSchema = RedemptionSchema.omit({ id: true, created_at: true, updated_at: true });
export const CreateRedemtionResponseSchema = z.object({
  message: z.string(),
  id: RedemptionSchema.shape.id,
});

export const RedemptionFiltersSchema = createFilterSchemaFromBase(RedemptionSchema);
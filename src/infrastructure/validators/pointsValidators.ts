import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { createFilterSchemaFromBase } from "../../utils/filters/createFilterSchemaFromBase";

extendZodWithOpenApi(z);

export const PointSchema = z.object({
  id: z
    .string()
    .uuid()
    .openapi({ example: "550e8400-e29b-41d4-a716-446655440000" }),
  user_id: z
    .string()
    .uuid()
    .openapi({ example: "550e8400-e29b-41d4-a716-446655440000" }),
  amount: z.number().openapi({ example: 0 }),
  created_at: z.date().openapi({ example: "2025-04-15T21:16:10.095Z" }),
  updated_at: z.date().openapi({ example: "2025-04-15T21:16:10.095Z" }),
});

export const GetPointHistorySchema = z.array(PointSchema);
export const GetPointHistoryParamsSchema = z.object({
  user_id: PointSchema.shape.user_id,
});

export const GetPointHistoryFiltersSchema = createFilterSchemaFromBase(PointSchema);
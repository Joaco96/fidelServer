import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { createFilterSchemaFromBase } from "../../utils/filters/createFilterSchemaFromBase";

extendZodWithOpenApi(z);

export const StoreSchema = z.object({
  id: z
    .string()
    .uuid()
    .openapi({ example: "550e8400-e29b-41d4-a716-446655440000" }),
  name: z.string().openapi({ example: "string" }),
  location: z.string().openapi({ example: "string" }),
  contact: z.string().openapi({ example: "string" }),
  created_at: z.date().openapi({ example: "2025-04-15T21:16:10.095Z" }),
  updated_at: z.date().openapi({ example: "2025-04-15T21:16:10.095Z" }),
});

export const CreateStoreSchema = StoreSchema.omit({ id: true, created_at: true, updated_at: true });
export const CreateStoreResponseSchema = z.object({
  message: z.string(),
  id: StoreSchema.shape.id,
});

export const UpdateStoreSchema = StoreSchema.omit({
  id: true,
  created_at: true, 
  updated_at: true
}).partial();
export const UpdateStoreParamsSchema = StoreSchema.pick({ id: true });

export const StoreFiltersSchema = createFilterSchemaFromBase(StoreSchema);

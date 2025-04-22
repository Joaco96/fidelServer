import { z, ZodTypeAny, ZodObject } from "zod";

export function createFilterSchemaFromBase<T extends ZodObject<any>>(
  baseSchema: T
) {
  const baseShape = baseSchema.shape;

  const newShape: Record<string, ZodTypeAny> = {};

  for (const [key, value] of Object.entries(baseShape)) {
    if (value instanceof z.ZodNumber) {
      newShape[key] = z.coerce.number().optional();
    } else if (value instanceof z.ZodBoolean) {
      newShape[key] = z.coerce.boolean().optional();
    } else if (value instanceof z.ZodDate) {
        newShape[key] = z.coerce.date().optional();
    } else {
      newShape[key] = (value as any).optional(); // Otros se mantienen pero opcionales
    }
  }

  return z.object(newShape);
}
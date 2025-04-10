import { z } from 'zod';

const errorSchema =
  z.object({
    message: z.string(),
  })

export const errorApiSchema =
  z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.null(),
    error: errorSchema,
    statusCode: z.number(),
  });

export const makeApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    data: dataSchema,
    error: z.null(),
    statusCode: z.number(),
  });
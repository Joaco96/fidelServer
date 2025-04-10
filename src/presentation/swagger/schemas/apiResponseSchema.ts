import { z } from 'zod';
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

const errorSchema =
  z.union([
    z.string(),
    z.object({
      message: z.string().optional(),
    }).catchall(z.union([z.string(), z.array(z.string())]))
  ])

export const errorApiSchema =
  z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.null(),
    error: errorSchema,
    statusCode: z.number(),
  }).openapi({
    example: {
      success: false,
      message: "Error de validación",
      data: null,
      error: {
        email: ["El email es obligatorio"],
      },
      statusCode: 400,
    }
  });

export const makeApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) => {
  const schema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: dataSchema,
    error: z.null(),
    statusCode: z.number(),
  });

  // @ts-ignore
  return schema.openapi({
    example: {
      success: true,
      message: "Solicitud exitosa",
      data: {
        message: "Operación realizada correctamente",
        token: "2f34335g353.f343f433f34f3f34f.f3434f34f4thrjjtyj5",
      } as any,
      error: null,
      statusCode: 200,
    }
  });
};
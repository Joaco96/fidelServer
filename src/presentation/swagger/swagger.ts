import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { userRegistry } from "./path_registry/users";
import { CreateUserSchema, LoginUserSchema } from "../../infrastructure/validators/userValidators";
import { errorApiSchema, makeApiResponseSchema } from "./schemas/apiResponseSchema";
import { z } from "zod";


export function generateOpenApiDocs() {
  const registry = new OpenAPIRegistry();

  registry.registerComponent("securitySchemes", "Bearer Authentication", {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
  });

  // Registrar rutas
  userRegistry.forEach(r => registry.registerPath(r));
  
  // Registrar esquemas
  registry.register("ApiSuccessResponse", makeApiResponseSchema(z.union([z.object({}), z.array(z.object({}))])));
  registry.register("ApiErrorResponse", errorApiSchema);
  registry.register("CreateUser", CreateUserSchema);
  registry.register("LoginUser", LoginUserSchema);

  // Definir la documentación OpenAPI
  const generator = new OpenApiGeneratorV3(registry.definitions);
  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      title: "API de Fidelizacion de Usuarios",
      version: "1.0.0",
      description: "Documentación de la API con Zod y OpenAPI",
    },
  });
}
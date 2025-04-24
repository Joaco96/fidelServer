import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { userRegistry } from "./path_registry/users";
import { errorApiSchema, makeApiResponseSchema } from "./schemas/apiResponseSchema";
import { z } from "zod";
import { ticketRegistry } from "./path_registry/tickets";
import { pointRegistry } from "./path_registry/points";
import { rewardsRegistry } from "./path_registry/rewards";
import { stockRegistry } from "./path_registry/stocks";
import { redemptionsRegistry } from "./path_registry/redemptions";


export function generateOpenApiDocs() {
  const registry = new OpenAPIRegistry();

  registry.registerComponent("securitySchemes", "bearerAuth", {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
  });

  // Registrar rutas
  userRegistry.forEach(r => registry.registerPath(r));
  ticketRegistry.forEach(r => registry.registerPath(r));
  pointRegistry.forEach(r => registry.registerPath(r));
  rewardsRegistry.forEach(r => registry.registerPath(r));
  stockRegistry.forEach(r => registry.registerPath(r));
  redemptionsRegistry.forEach(r => registry.registerPath(r));
  
  // Registrar esquemas
  registry.register("ApiSuccessResponse", makeApiResponseSchema(z.union([z.object({}), z.array(z.object({}))])));
  registry.register("ApiErrorResponse", errorApiSchema);

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
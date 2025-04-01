import { UserSchema } from "../../domain/entities/User";
import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { userRegistry } from "./path_registry/users";


export function generateOpenApiDocs() {
  const registry = new OpenAPIRegistry();

  // Registrar rutas
  registry.registerPath(userRegistry);
  
  // Registrar esquemas
  registry.register("User", UserSchema);

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
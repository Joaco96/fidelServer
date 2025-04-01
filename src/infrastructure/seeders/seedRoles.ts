import { Role, RoleIds } from "../../domain/entities/Role";
import { RoleModel } from "../db/models/RoleModel"; // Ajusta el path si es necesario

export async function seedRoles() {
  try {
    const roles = [
        new Role(RoleIds.USER, "Usuario"), 
        new Role(RoleIds.EMPLOYEE, "Empleado"),
        new Role(RoleIds.ADMIN, "Administrador"),
    ];
    const existingRoles = await RoleModel.findAll();

    if (existingRoles.length === roles.length) {
      console.log("⚠️ Los roles ya están en la BD, no se insertarán nuevamente.");
      return;
    }

    await RoleModel.bulkCreate(roles.map(role => ({
      id: role.id,
      name: role.name,
    })));
    console.log("✅ Roles insertados correctamente.");
  } catch (error) {
    console.error("❌ Error insertando roles:", error);
  }
}
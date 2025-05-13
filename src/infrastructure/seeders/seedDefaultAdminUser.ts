import { RoleIds } from "../../domain/entities/Role";
import { User } from "../../domain/entities/User";
import { hashPassword } from "../../domain/services/cryptoService";
import { UsersModel } from "../db/models";

export async function seedDefaultAdminUser() {
  try {
    const users = [
      new User(
        "joaquin cortes",
        "23445678",
        "joaco@email.com",
        "12345678",
        undefined,
        undefined,
        RoleIds.ADMIN
      ),
    ];

    const existingUsers = await UsersModel.findAll();

    const usersToCreate = users.filter(
      (user) =>
        !existingUsers.some((existingUser) => existingUser.email === user.email)
    );

    if (usersToCreate.length === 0) {
      console.log(
        "⚠️ Los usuarios ya están en la BD, no se insertarán nuevamente."
      );
      return;
    }

    const usersData = await Promise.all(
      usersToCreate.map(async (user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        dni: user.dni,
        password: await hashPassword(user.password),
        role_id: user.role_id,
      }))
    );

    await UsersModel.bulkCreate(usersData);
    console.log("✅ Usuario admin creado correctamente.");
  } catch (error) {
    console.error("❌ Error insertando usuario:", error);
  }
}

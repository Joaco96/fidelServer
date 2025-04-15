import { Stores } from "../../domain/entities/Stores";
import { StoresModel } from "../db/models/StoresModel"; // Ajusta el path si es necesario

export async function seedStores() {
  try {
    const stores = [
      new Stores("d31638da-abde-4082-92eb-6bbdf4f17d37", "Tienda modelo", "Quilmes", "1544455665"),
    ];

    const existingStores = await StoresModel.findAll();

    const storesToCreate = stores.filter(store => !existingStores.some(existingStore => existingStore.id === store.id))

    if (storesToCreate.length === 0) {
      console.log(
        "⚠️ Las tiendas ya están en la BD, no se insertarán nuevamente."
      );
      return;
    }

    await StoresModel.bulkCreate(
      storesToCreate.map((stores) => ({
        id: stores.id,
        name: stores.name,
        location: stores.location,
        contact: stores.contact,
      }))
    );
    console.log("✅ Tienda modelo creada correctamente.");
  } catch (error) {
    console.error("❌ Error insertando tienda:", error);
  }
}

import { Stores } from "../../domain/entities/Stores";
import { StoresModel } from "../db/models";

export async function seedStores() {
  try {
    const stores = [
      new Stores("Tienda modelo", "Quilmes", "1544455665"),
    ];

    const existingStores = await StoresModel.findAll();

    const storesToCreate = stores.filter(store => !existingStores.some(existingStore => existingStore.name === store.name));

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

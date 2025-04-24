import { Transaction } from "sequelize";
import { StockRepository } from "../../domain/repositories/stockRepository";
import { Stock } from "../../domain/entities/Stock";
import { StockMapper } from "../mappers/StockMapper";
import { StocksModel } from "../db/models";

export class StockRepositorySequelize implements StockRepository {
  async save(stock: Stock, transaction?: Transaction): Promise<Stock> {
    try {
      const createdStock = await StocksModel.create(
        StockMapper.toPersistence(stock),
        { transaction }
      );

      return StockMapper.toDomain(createdStock);
    } catch (error) {
      console.error("Error al guardar el movimiento de stock:", error);
      throw new Error("No se pudo guardar el movimiento de stock");
    }
  }
}

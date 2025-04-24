import { Stock } from "../../domain/entities/Stock";
import { isMapperClass } from "../../domain/mapper";
import { StocksModel } from "../db/models";

export class StockMapper {
  static toDomain(stocksModel: StocksModel): Stock {
    const {
      id,
      reward_id,
      quantity,
      createdAt,
      updatedAt,
    } = stocksModel.get() as StocksModel;

    return {
      id,
      reward_id,
      quantity,
      createdAt,
      updatedAt,
    } as Stock;
  }

  static toPersistence(stock: Stock): Partial<StocksModel> {
    return {
      id: stock.id,
      reward_id: stock.reward_id,
      quantity: stock.quantity,
    };
  }
}

isMapperClass<Stock, StocksModel>(StockMapper);
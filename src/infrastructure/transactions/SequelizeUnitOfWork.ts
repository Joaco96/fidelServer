import { Sequelize, Transaction } from "sequelize";
import { UnitOfWork } from "../../domain/transaction";

export class SequelizeUnitOfWork implements UnitOfWork<Transaction> {
  constructor(private readonly sequelize: Sequelize) {}

  async runInTransaction<T>(operation: (transaction: Transaction) => Promise<T>): Promise<T> {
    return await this.sequelize.transaction(async (t) => {
      return await operation(t);
    });
  }
}


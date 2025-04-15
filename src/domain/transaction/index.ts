export interface UnitOfWork<TTx = unknown> {
  runInTransaction<T>(operation: (transaction: TTx) => Promise<T>): Promise<T>;
}

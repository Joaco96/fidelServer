interface StaticMapper<T,K> {
  toDomain(model: K): T;
  toPersistence(entity: T): Partial<K>;
}

type MapperClass<T, K> = {
  new (...args: any[]): any;
} & StaticMapper<T, K>;

export function isMapperClass<T, K>(
  mapper: MapperClass<T, K>
): MapperClass<T, K> {
  return mapper;
}
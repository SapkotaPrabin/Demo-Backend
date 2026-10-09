import { General } from '../business/interfaces/core.interface';

export abstract class IGenericRepository<T> {
  abstract get(id: number): Promise<T>;
  abstract create(item: T): Promise<T>;
  abstract update(id: number, item: T): Promise<T>;
  abstract getAll(page?: number, limit?: number): Promise<T[]>;
  abstract softDelete(id: string | number): Promise<T>;
  abstract delete(id: number): Promise<void>;
  abstract findBy(filter: General): Promise<T[]>;
  abstract findOneBy(filter: General): Promise<T>;
}

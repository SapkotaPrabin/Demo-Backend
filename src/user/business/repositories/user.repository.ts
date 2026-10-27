import { IGenericRepository } from 'core/core/infrastructure/core.repository';
import { User } from '../entities/user.entity';

export abstract class IUserRepository extends IGenericRepository<User> {
  abstract getUserList(roleCode: string, query?: { page?: number; limit?: number }): Promise<[User[], number]>;
}

import { Injectable } from '@nestjs/common';
import { User as UserEntity } from '../../frameworks/entities/user.entity';
import { User } from '../business/entities/user.entity';
import { General } from 'core/core/business/interfaces/core.interface';
import { IUserRepository } from '../business/repositories/user.repository';
import { DemoDataService } from 'src/frameworks/demo.dataservice';

@Injectable()
export class UserRepository extends IUserRepository {
  constructor(private readonly userDataService: DemoDataService) {
    super();
  }

  async get(_id: number): Promise<User> {
    return this.userDataService.findOne(UserEntity, { where: { userId: _id || 0 } });
  }

  async create(newAddress: User) {
    await this.userDataService.save(UserEntity, newAddress);
    return newAddress;
  }

  async getAll(): Promise<User[]> {
    return this.userDataService.find(UserEntity, { where: {} });
  }

  async update(id: number, item: User): Promise<User> {
    return null;
  }

  async delete(id: number): Promise<void> {}

  async softDelete(id: string): Promise<User> {
    return new Promise((resolve, _reject) => {
      //   resolve(this.User);
    });
  }

  async findBy(filter: General): Promise<User[]> {
    return this.userDataService.find(UserEntity, { where: filter });
  }

  async findOneBy(filter: General): Promise<User> {
    const user = await this.userDataService.findOne(UserEntity, { where: filter });
    return user ? new User(user) : null;
  }
}

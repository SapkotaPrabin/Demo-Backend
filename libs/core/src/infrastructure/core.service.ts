import { Injectable } from '@nestjs/common';
import { General } from '../business/interfaces/core.interface';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class CoreService {
  protected appDataSource: DataSource;

  public async find(entity: any, filter: General) {
    const queryRunner = this.appDataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const response: any = await queryRunner.manager.find(entity, filter);
      return response;
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async findOne(entity: any, filter: General) {
    const queryRunner = this.appDataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const response: any = await queryRunner.manager.findOne(entity, filter);
      return response;
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async findAndCount(entity: any, filter: General) {
    const queryRunner = this.appDataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const response: any = await queryRunner.manager.findAndCount(entity, filter);
      return response;
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async save(entity: any, data: any) {
    const queryRunner = this.appDataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const response: any = await queryRunner.manager.save(entity, data);
      return response;
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async update(entity: any, id: number, data: any) {
    const queryRunner = this.appDataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const response: any = await queryRunner.manager.update(entity, id, data);
      return response;
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async remove(entity: any, id: number) {
    const queryRunner = this.appDataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const response: any = await queryRunner.manager.delete(entity, id);
      return response;
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async runQuery(query: string, parameters?: any[]) {
    const queryRunner = this.appDataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const response: any = await queryRunner.query(query, parameters);
      return response;
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async getColumnsValue(entity: any, columns: string[]) {
    const queryRunner = this.appDataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const query = `SELECT ${columns.join(', ')} FROM ${entity};`;
      const response: any = await queryRunner.query(query);
      return response;
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async paginatedResult<T>(queryBuilder: any, page: number, limit: number): Promise<[T[], number]> {
    if (!page || page == 0 || !limit) {
      const data = await queryBuilder.getMany();
      const count = data.length;
      return [data, count];
    }
    const take = limit || 10;
    const skip = (page - 1) * take;
    const [data, count] = await queryBuilder.clone().take(take).skip(skip).getManyAndCount();
    return [data, count];
  }
}

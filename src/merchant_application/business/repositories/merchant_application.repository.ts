import { IGenericRepository } from 'core/core/infrastructure/core.repository';
import { MerchantApplication } from '../entities/merchant_application.entity';
import { General } from 'core/core/business/interfaces/core.interface';

export abstract class IMerchantApplicationRepository extends IGenericRepository<MerchantApplication> {
  abstract getApplicationList(filter: any, query?: { page?: number; limit?: number; status?: string }): Promise<[MerchantApplication[], number]>;
}

import { IGenericRepository } from 'core/core/infrastructure/core.repository';
import { MerchantApplication } from '../entities/merchant_application.entity';

export abstract class IMerchantApplicationRepository extends IGenericRepository<MerchantApplication> {}

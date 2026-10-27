import { Injectable } from '@nestjs/common';
import { General } from 'core/core/business/interfaces/core.interface';
import { DemoDataService } from 'src/frameworks/demo.dataservice';
import { IMerchantApplicationRepository } from '../business/repositories/merchant_application.repository';
import { MerchantApplication } from '../business/entities/merchant_application.entity';
import { MerchantApplication as MerchantApplicationEntity } from 'src/frameworks/entities/merchant_application.entity';

@Injectable()
export class MerchantApplicationRepository extends IMerchantApplicationRepository {
  constructor(private readonly userDataService: DemoDataService) {
    super();
  }

  async get(_id: number): Promise<MerchantApplication> {
    return this.userDataService.findOne(MerchantApplicationEntity, { where: { applicationId: _id || 0 } });
  }

  async create(newAddress: MerchantApplication) {
    await this.userDataService.save(MerchantApplicationEntity, newAddress);
    return newAddress;
  }

  async getAll(): Promise<MerchantApplication[]> {
    return this.userDataService.find(MerchantApplicationEntity, { where: {} });
  }

  async update(id: number, item: MerchantApplication): Promise<MerchantApplication> {
    return null;
  }

  async delete(id: number): Promise<void> {}

  async softDelete(id: string): Promise<MerchantApplication> {
    return new Promise((resolve, _reject) => {
      //   resolve(this.MerchantApplication);
    });
  }

  async findBy(filter: General): Promise<MerchantApplication[]> {
    return this.userDataService.find(MerchantApplicationEntity, { where: filter });
  }

  async findOneBy(filter: General): Promise<MerchantApplication> {
    const application = await this.userDataService.findOne(MerchantApplicationEntity, { where: filter });
    return application;
  }
}

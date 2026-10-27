import { Injectable } from '@nestjs/common';
import { General } from 'core/core/business/interfaces/core.interface';
import { DemoDataService } from 'src/frameworks/demo.dataservice';
import { IMerchantApplicationRepository } from '../business/repositories/merchant_application.repository';
import { MerchantApplication } from '../business/entities/merchant_application.entity';
import { MerchantApplication as MerchantApplicationEntity } from 'src/frameworks/entities/merchant_application.entity';
import { DataSource } from 'typeorm';
import { roleCodes } from 'libs/utils/constants.utils';

@Injectable()
export class MerchantApplicationRepository extends IMerchantApplicationRepository {
  constructor(
    private readonly userDataService: DemoDataService,
    private readonly dataSource: DataSource,
  ) {
    super();
  }

  async get(_id: number): Promise<MerchantApplication> {
    return this.userDataService.findOne(MerchantApplicationEntity, {
      where: { applicationId: _id || 0 },
      relations: { assignedReviewer: true },
    });
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

  async getApplicationList(filter: { role: string; userId: number }, query?: { page?: number; limit?: number; status?: string }): Promise<[MerchantApplication[], number]> {
    const { page, limit, status } = query;
    const { role, userId } = filter;
    const queryBuilder = this.dataSource.createQueryBuilder().from(MerchantApplicationEntity, 'ma').leftJoin('ma.createdBy', 'cb').leftJoin('ma.assignedReviewer', 'ar').select(['ma', 'cb', 'ar']);

    switch (role) {
      case roleCodes.REVIEWER:
        queryBuilder.where('ar.userId = :reviewerId', { reviewerId: userId });
        break;
      case roleCodes.SALES:
        queryBuilder.where('cb.userId = :createdBy', { createdBy: userId });
        break;
      default:
        break;
    }

    if (!!status) {
      queryBuilder.andWhere('ma.applicationStatus ILIKE :status', { status: status });
    }

    queryBuilder.orderBy('ma.createdAt', 'DESC');
    return await this.userDataService.paginatedResult<MerchantApplication>(queryBuilder, page, limit);
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseData } from 'libs/utils/response.utils';
import type { ResponseType } from 'libs/utils/response.utils';
import { IUserRepository } from 'src/user/business/repositories/user.repository';
import { CreateApplicationDto } from 'src/user/business/dtos/application.dto';
import { ApplicationStatus } from 'src/user/utils/constants.utils';
import { MerchantApplicationFactory } from 'src/user/business/factories/application.factory';
import { IMerchantApplicationRepository } from 'src/user/business/repositories/merchant_application.repository';
import { roleCodes } from 'libs/utils/constants.utils';

@Injectable()
export class ApplicationUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly merchantApplicationRepository: IMerchantApplicationRepository,
  ) {}

  async create(user: any, input: CreateApplicationDto): Promise<ResponseType> {
    try {
      const application = await new MerchantApplicationFactory().create(input);
      if (application.assignedReviewerId) {
        const reviewer = await this.userRepository.get(application.assignedReviewerId);
        if (!reviewer) {
          throw new HttpException({ ...ResponseData('Data not found', null, false, { assignedReviewerId: 'Assigned user not found' }) }, HttpStatus.NOT_FOUND);
        }
        const reviewerRole = reviewer.role?.find((role) => role.roleCode === roleCodes.REVIEWER);
        if (!reviewerRole) {
          throw new HttpException({ ...ResponseData('Data not valid', null, false, { assignedReviewerId: 'Assigned user is not a reviewer' }) }, HttpStatus.BAD_REQUEST);
        }
        application.assignedReviewer = reviewer;
      }
      const creator = await this.userRepository.get(user?.userId);
      application.createdBy = creator;
      application.applicationStatus = ApplicationStatus.SUBMITTED;
      const savedApplication = await this.merchantApplicationRepository.create(application);
      return ResponseData('Application created successfully', savedApplication, true, null);
    } catch (error) {
      console.log('Error while create application', error);
      throw error;
    }
  }
}

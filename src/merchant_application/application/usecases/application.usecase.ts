import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseData } from 'libs/utils/response.utils';
import type { ResponseType } from 'libs/utils/response.utils';
import { IUserRepository } from 'src/user/business/repositories/user.repository';
import { ApplicationStatus, RiskDecision, roleCodes } from 'libs/utils/constants.utils';
import { IMerchantApplicationRepository } from 'src/merchant_application/business/repositories/merchant_application.repository';
import { CreateApplicationDto, UpdateApplicationDto } from 'src/merchant_application/business/dtos/application.dto';
import { MerchantApplicationFactory } from 'src/merchant_application/business/factories/application.factory';
import { isAdmin } from 'libs/utils/helper.utils';

@Injectable()
export class ApplicationUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly merchantApplicationRepository: IMerchantApplicationRepository,
  ) {}

  async create(user: any, input: CreateApplicationDto): Promise<ResponseType> {
    try {
      const application = await new MerchantApplicationFactory().create(input);
      if (!!application?.assignedReviewerId) {
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
      let creator = null;
      if (input?.salesUserId) {
        creator = await this.userRepository.get(input?.salesUserId);
        if (!creator) {
          throw new HttpException({ ...ResponseData('Data not found', null, false, { salesUserId: 'Sales user not found' }) }, HttpStatus.NOT_FOUND);
        }
        const salesRole = creator.role?.find((role) => role.roleCode === roleCodes.SALES);
        if (!salesRole) {
          throw new HttpException({ ...ResponseData('Data not valid', null, false, { salesUserId: 'Given sales user is not a sales user in system' }) }, HttpStatus.BAD_REQUEST);
        }
      } else {
        creator = await this.userRepository.get(user?.userId);
      }

      application.createdBy = creator;
      application.applicationStatus = input.applicationStatus;
      application.riskStatus = input.riskStatus;
      const savedApplication = await this.merchantApplicationRepository.create(application);
      return ResponseData('Application created successfully', savedApplication, true, null);
    } catch (error) {
      console.log('Error while create application', error);
      throw error;
    }
  }

  async getApplicationList(user: any, query?: { page?: number; limit?: number; status?: string }): Promise<ResponseType> {
    try {
      const userRoleCode = user?.role?.[0]?.roleCode;
      const [applications, count] = await this.merchantApplicationRepository.getApplicationList({ role: userRoleCode, userId: user?.userId }, query);
      return ResponseData('Application list fetched successfully', { applications, count }, true, null);
    } catch (error) {
      console.log('Error while fetching application list', error);
      throw error;
    }
  }

  async update(user: any, applicationId: number, input: UpdateApplicationDto): Promise<ResponseType> {
    try {
      const currentApplication = await this.merchantApplicationRepository.get(applicationId);
      if (!currentApplication) {
        throw new HttpException({ ...ResponseData('Data not found', null, false, { applicationId: 'Merchant application not found' }) }, HttpStatus.NOT_FOUND);
      }
      const application = await new MerchantApplicationFactory().create(input);
      Object.assign(currentApplication, application);
      if (!!application?.assignedReviewerId) {
        const reviewer = await this.userRepository.get(application.assignedReviewerId);
        if (!reviewer) {
          throw new HttpException({ ...ResponseData('Data not found', null, false, { assignedReviewerId: 'Assigned user not found' }) }, HttpStatus.NOT_FOUND);
        }
        const reviewerRole = reviewer.role?.find((role) => role.roleCode === roleCodes.REVIEWER);
        if (!reviewerRole) {
          throw new HttpException({ ...ResponseData('Data not valid', null, false, { assignedReviewerId: 'Assigned user is not a reviewer' }) }, HttpStatus.BAD_REQUEST);
        }
        currentApplication.assignedReviewer = reviewer;
      }
      let creator = null;
      if (input?.salesUserId) {
        creator = await this.userRepository.get(input?.salesUserId);
        if (!creator) {
          throw new HttpException({ ...ResponseData('Data not found', null, false, { salesUserId: 'Sales user not found' }) }, HttpStatus.NOT_FOUND);
        }
        const salesRole = creator.role?.find((role) => role.roleCode === roleCodes.SALES);
        if (!salesRole) {
          throw new HttpException({ ...ResponseData('Data not valid', null, false, { salesUserId: 'Given sales user is not a sales user in system' }) }, HttpStatus.BAD_REQUEST);
        }
      } else {
        creator = await this.userRepository.get(user?.userId);
      }

      currentApplication.createdBy = creator;
      currentApplication.applicationStatus = ApplicationStatus.SUBMITTED;
      const savedApplication = await this.merchantApplicationRepository.create(currentApplication);
      return ResponseData('Application updated successfully', savedApplication, true, null);
    } catch (error) {
      console.log('Error while update application', error);
      throw error;
    }
  }

  async updateRiskDecision(user: any, applicationId: number, input: { status: string }): Promise<ResponseType> {
    try {
      const { status } = input;
      const currentApplication = await this.merchantApplicationRepository.get(applicationId);
      if (!currentApplication) {
        throw new HttpException({ ...ResponseData('Data not found', null, false, { applicationId: 'Merchant application not found' }) }, HttpStatus.NOT_FOUND);
      }
      const isAssignedReviewer = user?.role?.some((role) => role.roleCode === roleCodes.REVIEWER)
        && currentApplication.assignedReviewer?.userId === user?.userId;
      if (!isAssignedReviewer) {
        throw new ForbiddenException('Only the assigned reviewer may record a risk decision');
      }
      if (!status) {
        throw new HttpException({ ...ResponseData('Data not found', null, false, { status: 'Status must be mandatory' }) }, HttpStatus.NOT_FOUND);
      } else if (!['accepted', 'rejected']?.includes(status)) {
        throw new HttpException({ ...ResponseData('Data not found', null, false, { status: 'Status value not valid' }) }, HttpStatus.BAD_REQUEST);
      }
      switch (status) {
        case 'accepted':
          currentApplication.riskDecision = RiskDecision.APPROVE;
          break;
        case 'rejected':
          currentApplication.riskDecision = RiskDecision.REJECT;
          break;
        default:
          throw new HttpException({ ...ResponseData('Data not found', null, false, { status: 'Status value not valid' }) }, HttpStatus.BAD_REQUEST);
      }
      await this.merchantApplicationRepository.create(currentApplication);
      return ResponseData('Risk decision updated successfully', currentApplication, true, null);
    } catch (error) {
      console.log('Error while update risk decision', error);
      throw error;
    }
  }
}

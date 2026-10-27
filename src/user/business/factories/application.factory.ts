import { HttpException, HttpStatus } from '@nestjs/common';
import { ResponseData } from 'libs/utils/response.utils';
import { CreateApplicationDto } from '../dtos/application.dto';
import { MerchantApplication } from '../entities/merchant_application.entity';
import { validateEmail, validateNumber } from 'libs/utils/validate.utils';

export class MerchantApplicationFactory {
  async create(applicationDTO: CreateApplicationDto) {
    const isValid = this.validateCreate(applicationDTO);

    if (isValid) {
      const application = new MerchantApplication(applicationDTO);
      return application;
    }
  }

  private validateCreate(applicationDTO: CreateApplicationDto): boolean | object {
    let errors: any = {};

    if (!applicationDTO?.businessName) {
      errors.businessName = `Missing business name`;
    }

    if (!applicationDTO?.legalBusinessName) {
      errors.legalBusinessName = `Missing legal business name`;
    }

    if (!applicationDTO?.businessType) {
      errors.businessType = `Missing business type`;
    }

    if (!applicationDTO?.ownerFirstName) {
      errors.ownerFirstName = `Missing owner first name`;
    }

    if (!applicationDTO?.ownerLastName) {
      errors.ownerLastName = `Missing owner last name`;
    }

    if (!applicationDTO?.ownerEmail) {
      errors.ownerEmail = `Missing owner email`;
    } else if (!validateEmail(applicationDTO?.ownerEmail)) {
      errors.ownerEmail = `Invalid owner email address`;
    }

    if (!applicationDTO?.ownerContactNumber) {
      errors.ownerContactNumber = `Missing owner contact number`;
    } else if (!validateNumber(applicationDTO?.ownerContactNumber)) {
      errors.ownerContactNumber = `Invalid owner contact number`;
    }

    if (!applicationDTO?.requestedMonthlyVolume) {
      errors.requestedMonthlyVolume = `Missing requested monthly volume`;
    } else if (isNaN(Number(applicationDTO?.requestedMonthlyVolume))) {
      errors.requestedMonthlyVolume = `Invalid requested monthly volume`;
    }

    if (!applicationDTO?.averageTransactionAmount) {
      errors.averageTransactionAmount = `Missing average transaction amount`;
    } else if (isNaN(Number(applicationDTO?.averageTransactionAmount))) {
      errors.averageTransactionAmount = `Invalid average transaction amount`;
    }

    if (!applicationDTO?.assignedReviewerId) {
      errors.assignedReviewerId = `Missing assigned reviewer id`;
    } else if (isNaN(Number(applicationDTO?.assignedReviewerId))) {
      errors.assignedReviewerId = `Invalid assigned reviewer id`;
    }

    if (Object.keys(errors).length > 0) {
      throw new HttpException({ ...ResponseData('Data not valid', null, false, errors) }, HttpStatus.OK);
    }

    return true;
  }
}

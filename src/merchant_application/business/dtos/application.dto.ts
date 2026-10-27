import { ApplicationStatus, RiskStatus } from 'libs/utils/constants.utils';

export class CreateApplicationDto {
  businessName: string;
  legalBusinessName: string;
  businessType: string;
  ownerFirstName: string;
  ownerLastName: string;
  ownerEmail: string;
  ownerContactNumber: string;
  requestedMonthlyVolume: number | string;
  averageTransactionAmount: number | string;
  assignedReviewerId?: number;
  salesUserId?: number;
  applicationStatus: ApplicationStatus;
  riskStatus: RiskStatus;
}

export class UpdateApplicationDto {
  businessName?: string;
  legalBusinessName?: string;
  businessType?: string;
  ownerFirstName?: string;
  ownerLastName?: string;
  ownerEmail?: string;
  ownerContactNumber?: string;
  requestedMonthlyVolume?: number | string;
  averageTransactionAmount?: number | string;
  assignedReviewerId?: number;
  salesUserId?: number;
  applicationStatus: ApplicationStatus;
  riskStatus: RiskStatus;
}

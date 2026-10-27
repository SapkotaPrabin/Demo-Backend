import { ApplicationStatus, RiskStatus } from 'src/user/utils/constants.utils';
import { User } from './user.entity';

export class MerchantApplication {
  applicationId?: number;
  businessName: string;
  legalBusinessName: string;
  businessType: string;
  ownerFirstName: string;
  ownerLastName: string;
  ownerEmail: string;
  ownerContactNumber: string;
  requestedMonthlyVolume: number;
  averageTransactionAmount: number;
  applicationStatus: ApplicationStatus;
  riskStatus: RiskStatus;
  assignedReviewer?: User;
  assignedReviewerId?: number;
  createdBy: User;

  constructor(dto: any) {
    if (dto.applicationId) {
      this.applicationId = dto.applicationId;
    }
    this.businessName = dto.businessName;
    this.legalBusinessName = dto.legalBusinessName;
    this.businessType = dto.businessType;
    this.ownerFirstName = dto.ownerFirstName;
    this.ownerLastName = dto.ownerLastName;
    this.ownerEmail = dto.ownerEmail;
    this.ownerContactNumber = dto.ownerContactNumber;
    this.requestedMonthlyVolume = dto.requestedMonthlyVolume;
    this.averageTransactionAmount = dto.averageTransactionAmount;
    this.applicationStatus = dto.applicationStatus;
    this.riskStatus = dto.riskStatus;
    this.assignedReviewer = dto.assignedReviewer;
    if (dto.assignedReviewerId) {
      this.assignedReviewerId = dto.assignedReviewerId;
    }
    this.createdBy = dto.createdBy;
  }
}

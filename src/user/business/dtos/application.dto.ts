import { ApplicationStatus } from "src/user/utils/constants.utils";

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
  applicationStatus?: ApplicationStatus;
  assignedReviewerId?: number;
}

export class AssignReviewerDto {
  reviewerId: number;
}

export class ApplicationDecisionDto {
  decision: 'APPROVE' | 'REJECT' | 'REQUEST_INFO';
  notes?: string;
}

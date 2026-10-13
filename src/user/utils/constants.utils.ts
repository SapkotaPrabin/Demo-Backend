export enum ApplicationStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
  WITHDRAWN = 'WITHDRAWN',
}

export enum RiskStatus {
  PENDING = 'PENDING',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  PROHIBITED = 'PROHIBITED',
}

export const hashTypes = {
  TQMS: 'TQMS',
  LODBOD_WEBSITE: 'LODBOD_WEBSITE',
};

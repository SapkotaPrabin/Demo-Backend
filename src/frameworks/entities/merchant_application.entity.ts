import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ApplicationStatus, RiskStatus } from 'libs/utils/constants.utils';

@Entity({ name: 'merchant_application' })
export class MerchantApplication {
  @PrimaryGeneratedColumn({ name: 'application_id' })
  applicationId: number;

  @Column({ name: 'business_name', length: 255, nullable: false })
  businessName: string;

  @Column({ name: 'legal_business_name', length: 255, nullable: false })
  legalBusinessName: string;

  @Column({ name: 'business_type', length: 100, nullable: false })
  businessType: string;

  @Column({ name: 'owner_first_name', length: 100, nullable: false })
  ownerFirstName: string;

  @Column({ name: 'owner_last_name', length: 100, nullable: false })
  ownerLastName: string;

  @Column({ name: 'owner_email', length: 255, nullable: false })
  ownerEmail: string;

  @Column({ name: 'owner_contact_number', length: 50, nullable: false })
  ownerContactNumber: string;

  @Column({ name: 'requested_monthly_volume', type: 'numeric', precision: 14, scale: 2, nullable: false })
  requestedMonthlyVolume: string;

  @Column({
    name: 'average_transaction_amount',
    type: 'numeric',
    precision: 12,
    scale: 2,
    nullable: false
  })
  averageTransactionAmount: string;

  @Column({
    name: 'application_status',
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.DRAFT,
  })
  applicationStatus: ApplicationStatus;

  @Column({
    name: 'risk_status',
    type: 'enum',
    enum: RiskStatus,
    default: RiskStatus.PENDING,
  })
  riskStatus: RiskStatus;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'created_by_user_id', referencedColumnName: 'userId' })
  createdBy: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assigned_reviewer_user_id', referencedColumnName: 'userId' })
  assignedReviewer: User | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

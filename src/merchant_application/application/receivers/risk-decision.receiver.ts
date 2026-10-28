import { Injectable, Logger } from '@nestjs/common';
import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { RiskDecision } from 'libs/utils/constants.utils';
import { MerchantApplicationRepository } from 'src/merchant_application/repositories/merchant_application.repository';
import { LoggerService } from '../services/logger.service';
import { Queues, UpdateRiskDecisionJob } from 'core/core';

@Injectable()
@Processor(Queues.RISK_DECISION_QUEUE)
export class RiskDecisionReceiver extends WorkerHost {
  private readonly logger = new Logger(RiskDecisionReceiver.name);

  constructor(
    private readonly merchantApplicationRepository: MerchantApplicationRepository,
    private readonly loggerService: LoggerService,
  ) {
    super();
  }

  async process(job: Job<UpdateRiskDecisionJob>): Promise<void> {
    if (job.name !== Queues.UPDATE_RISK_DECISION_JOB) {
      throw new Error(`Unsupported risk decision job: ${job.name}`);
    }

    const { applicationId, actorUserId, decision } = job.data;
    const application = await this.merchantApplicationRepository.get(applicationId);
    if (!application) {
      throw new Error(`Merchant application ${applicationId} was not found`);
    }

    application.riskDecision = decision === 'APPROVE' ? RiskDecision.APPROVE : RiskDecision.REJECT;
    await this.merchantApplicationRepository.create(application);
    await this.loggerService.addLog({
      action: 'UPDATE',
      actorUserId,
      targetType: 'risk_decision',
      targetId: applicationId,
      details: { decision },
    });
    this.logger.log(`Updated risk decision for application ${applicationId}`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job<UpdateRiskDecisionJob> | undefined, error: Error): void {
    this.logger.error(`Risk decision job ${job?.id ?? 'unknown'} failed: ${error.message}`);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';
import { Queues, UpdateRiskDecisionJob } from '../constants/bull-mq.constants';

@Injectable()
export class RiskDecisionProducer {
  constructor(@InjectQueue(Queues.RISK_DECISION_QUEUE) private readonly queue: Queue<UpdateRiskDecisionJob>) {}

  produce(data: UpdateRiskDecisionJob): Promise<Job<UpdateRiskDecisionJob>> {
    return this.queue.add(Queues.UPDATE_RISK_DECISION_JOB, data);
  }
}
